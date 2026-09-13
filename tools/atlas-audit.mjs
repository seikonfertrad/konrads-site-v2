#!/usr/bin/env node
// Audit the two atlas ontologies (East–West + Lightcone) and the cross-map between them.
// Usage: node tools/atlas-audit.mjs
// Exits non-zero if any ERROR-level finding exists (dangling references, malformed edges).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const window = {};
for (const f of ["public/atlas/data/atlas.js", "public/atlas/data/lightcone.js"]) {
  new Function("window", readFileSync(join(root, f), "utf8"))(window);
}
const ATLAS = window.ATLAS_DATA, LIGHTCONE = window.LIGHTCONE_DATA;

const errors = [], warns = [], infos = [];
const err  = m => errors.push(m);
const warn = m => warns.push(m);
const info = m => infos.push(m);

function index(data) {
  return {
    concepts: new Map(data.concepts.map(c => [c.id, c])),
    thinkers: new Map(data.thinkers.map(t => [t.id, t])),
    traditions: new Map(data.traditions.map(t => [t.id, t])),
  };
}
const maps = { atlas: { data: ATLAS, ...index(ATLAS) }, lightcone: { data: LIGHTCONE, ...index(LIGHTCONE) } };
const other = name => (name === "atlas" ? "lightcone" : "atlas");

// ── Per-map structural checks ───────────────────────────────────────────────
for (const [name, m] of Object.entries(maps)) {
  const { data, concepts, thinkers, traditions } = m;
  const otherConcepts = maps[other(name)].concepts;

  // duplicate ids
  for (const [label, list] of [["concept", data.concepts], ["thinker", data.thinkers], ["tradition", data.traditions]]) {
    const seen = new Set();
    for (const x of list) {
      if (seen.has(x.id)) err(`[${name}] duplicate ${label} id "${x.id}"`);
      seen.add(x.id);
    }
  }

  // concepts: tradition, coined_by, key_thinkers, counterparts
  for (const c of data.concepts) {
    if (!traditions.has(c.tradition)) err(`[${name}] concept "${c.id}" has unknown tradition "${c.tradition}"`);
    if (c.coined_by && !thinkers.has(c.coined_by)) err(`[${name}] concept "${c.id}" coined_by unknown thinker "${c.coined_by}"`);
    for (const t of c.key_thinkers || []) {
      if (!thinkers.has(t)) err(`[${name}] concept "${c.id}" key_thinker "${t}" unknown`);
    }
    for (const cp of c.counterparts || []) {
      if (!concepts.has(cp) && !otherConcepts.has(cp)) err(`[${name}] concept "${c.id}" counterpart "${cp}" not found in either map`);
    }
  }

  // thinkers: tradition, central_concepts
  for (const t of data.thinkers) {
    if (!traditions.has(t.tradition)) err(`[${name}] thinker "${t.id}" has unknown tradition "${t.tradition}"`);
    for (const c of t.central_concepts || []) {
      if (!concepts.has(c)) err(`[${name}] thinker "${t.id}" central_concept "${c}" unknown`);
    }
  }

  // disputes: thinker/concept refs
  for (const d of data.disputes) {
    for (const p of d.positions) {
      for (const t of p.thinkers || []) if (!thinkers.has(t)) err(`[${name}] dispute "${d.id}" references unknown thinker "${t}"`);
      for (const c of p.concepts || []) if (!concepts.has(c)) err(`[${name}] dispute "${d.id}" references unknown concept "${c}"`);
    }
  }

  // edges: endpoint existence + kind/type sanity
  const ccTypes = new Set(["ecart", "parallel", "pair", "kinship", "lineage"]);
  const tcTypes = new Set(["coined", "central", "advanced", "critiqued"]);
  const ttTypes = new Set(["influence", "critique", "dispute"]);
  const pairSeen = new Map(); // unordered concept pair -> [edges]
  for (const e of data.edges) {
    const resolves = id => concepts.has(id) || (e.cross_map && otherConcepts.has(id));
    if (e.kind === "cc") {
      if (!ccTypes.has(e.type)) warn(`[${name}] cc edge ${e.source}→${e.target} has unusual type "${e.type}"`);
      if (!resolves(e.source)) err(`[${name}] cc edge source "${e.source}" (→${e.target}) not found${e.cross_map ? " in either map" : ""}`);
      if (!resolves(e.target)) err(`[${name}] cc edge target "${e.target}" (${e.source}→) not found${e.cross_map ? " in either map" : ""}`);
      const key = [e.source, e.target].sort().join("↔");
      if (!pairSeen.has(key)) pairSeen.set(key, []);
      pairSeen.get(key).push(e);
    } else if (e.kind === "tc") {
      if (!tcTypes.has(e.type)) warn(`[${name}] tc edge ${e.source}→${e.target} has unusual type "${e.type}"`);
      if (!thinkers.has(e.source)) err(`[${name}] tc edge source thinker "${e.source}" unknown`);
      if (!concepts.has(e.target)) err(`[${name}] tc edge target concept "${e.target}" unknown`);
    } else if (e.kind === "tt") {
      if (!ttTypes.has(e.type)) warn(`[${name}] tt edge ${e.source}→${e.target} has unusual type "${e.type}"`);
      if (!thinkers.has(e.source)) err(`[${name}] tt edge source thinker "${e.source}" unknown`);
      if (!thinkers.has(e.target)) err(`[${name}] tt edge target thinker "${e.target}" unknown`);
    } else {
      err(`[${name}] edge ${e.source}→${e.target} has unknown kind "${e.kind}"`);
    }
  }
  for (const [key, list] of pairSeen) {
    if (list.length > 1) warn(`[${name}] ${list.length} cc edges between ${key}: types [${list.map(e => e.type).join(", ")}]`);
  }

  // thinker central_concepts should be backed by a tc edge (they drive the "worked by" views)
  const tcByThinker = new Map();
  for (const e of data.edges) {
    if (e.kind !== "tc") continue;
    if (!tcByThinker.has(e.source)) tcByThinker.set(e.source, new Set());
    tcByThinker.get(e.source).add(e.target);
  }
  for (const t of data.thinkers) {
    for (const c of t.central_concepts || []) {
      if (!(tcByThinker.get(t.id) || new Set()).has(c)) {
        warn(`[${name}] thinker "${t.id}" lists central_concept "${c}" but has no tc edge to it`);
      }
    }
  }

  // concept key_thinkers without a tc edge (info: the UI now unions these, but list them)
  const tcByConcept = new Map();
  for (const e of data.edges) {
    if (e.kind !== "tc") continue;
    if (!tcByConcept.has(e.target)) tcByConcept.set(e.target, new Set());
    tcByConcept.get(e.target).add(e.source);
  }
  for (const c of data.concepts) {
    const missing = (c.key_thinkers || []).filter(t => !(tcByConcept.get(c.id) || new Set()).has(t));
    if (missing.length) info(`[${name}] concept "${c.id}" key_thinkers without tc edge: ${missing.join(", ")}`);
  }

  // counterpart symmetry within the map
  for (const c of data.concepts) {
    for (const cp of c.counterparts || []) {
      const target = concepts.get(cp);
      if (target && !(target.counterparts || []).includes(c.id)) {
        info(`[${name}] counterpart asymmetry: "${c.id}" lists "${cp}" but not vice versa`);
      }
    }
  }
}

// ── Cross-map checks ────────────────────────────────────────────────────────
const crossEdges = LIGHTCONE.edges.filter(e => e.cross_map);
const lcIds = maps.lightcone.concepts, atIds = maps.atlas.concepts;
let lcFirst = 0, atFirst = 0;
for (const e of crossEdges) {
  const sLc = lcIds.has(e.source), sAt = atIds.has(e.source);
  const tLc = lcIds.has(e.target), tAt = atIds.has(e.target);
  if (sLc && tAt) lcFirst++;
  else if (sAt && tLc) atFirst++;
  else err(`[cross] edge ${e.source}→${e.target} does not connect the two maps (source in lc:${sLc}/at:${sAt}, target in lc:${tLc}/at:${tAt})`);
}
info(`[cross] ${crossEdges.length} cross-map edges (${lcFirst} lightcone→atlas, ${atFirst} atlas→lightcone)`);

// misplaced cross-map edges: both endpoints in one map but flagged cross_map
for (const e of LIGHTCONE.edges) {
  if (e.cross_map && lcIds.has(e.source) && lcIds.has(e.target)) warn(`[cross] edge ${e.source}→${e.target} flagged cross_map but both ends are lightcone concepts`);
}
// atlas edges never carry cross_map (they'd be invisible to the cross page); flag any that reference lightcone ids
for (const e of ATLAS.edges) {
  if (e.kind === "cc" && (!atIds.has(e.source) || !atIds.has(e.target))) {
    err(`[atlas] cc edge ${e.source}→${e.target} references a non-atlas concept (cross-map edges belong in lightcone.js)`);
  }
}

// duplicate cross-map pairs
const crossPairs = new Map();
for (const e of crossEdges) {
  const key = [e.source, e.target].sort().join("↔");
  if (!crossPairs.has(key)) crossPairs.set(key, []);
  crossPairs.get(key).push(e);
}
for (const [key, list] of crossPairs) {
  if (list.length > 1) warn(`[cross] ${list.length} cross-map edges between ${key}: types [${list.map(e => e.type).join(", ")}]`);
}

// coverage: the "residue" — concepts unmapped across the écart
const crossTouched = new Set();
for (const e of crossEdges) { crossTouched.add(e.source); crossTouched.add(e.target); }
const counterpartTouched = new Set();
for (const [name, m] of Object.entries(maps)) {
  for (const c of m.data.concepts) {
    for (const cp of c.counterparts || []) {
      if (maps[other(name)].concepts.has(cp)) { counterpartTouched.add(c.id); counterpartTouched.add(cp); }
    }
  }
}
const residueLc = LIGHTCONE.concepts.filter(c => !crossTouched.has(c.id) && !counterpartTouched.has(c.id)).map(c => c.id);
const residueAt = ATLAS.concepts.filter(c => !crossTouched.has(c.id) && !counterpartTouched.has(c.id)).map(c => c.id);
info(`[cross] lightcone concepts with no cross-map relation (${residueLc.length}): ${residueLc.join(", ") || "—"}`);
info(`[cross] atlas concepts with no cross-map relation (${residueAt.length}): ${residueAt.join(", ") || "—"}`);

// ── Report ──────────────────────────────────────────────────────────────────
const show = (label, list) => { if (list.length) { console.log(`\n${label} (${list.length})`); for (const m of list) console.log("  " + m); } };
console.log(`atlas: ${ATLAS.concepts.length} concepts, ${ATLAS.thinkers.length} thinkers, ${ATLAS.edges.length} edges, ${ATLAS.disputes.length} disputes`);
console.log(`lightcone: ${LIGHTCONE.concepts.length} concepts, ${LIGHTCONE.thinkers.length} thinkers, ${LIGHTCONE.edges.length} edges, ${LIGHTCONE.disputes.length} disputes`);
show("ERRORS", errors);
show("WARNINGS", warns);
show("INFO", infos);
if (!errors.length && !warns.length) console.log("\nNo errors or warnings.");
process.exit(errors.length ? 1 : 0);
