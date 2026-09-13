#!/usr/bin/env node
// Audit the two atlas ontologies (East–West + Lightcone), the axes layer, and the cross-map between them.
// Usage: node tools/atlas-audit.mjs   (npm run atlas:audit)
// Exits non-zero on any ERROR-level finding.
//
// What is enforced for the cross-map:
//   - every cross edge carries a `basis` (textual | structural | speculative)
//   - a `kinship` cross edge carries a `lineage` label; any other cc cross edge carries an `axis`
//   - both concepts of an axis-bearing edge are positioned on that axis, and the edge type is the
//     one the poles imply: opposite poles → ecart, same pole → parallel
//   - a concept with no relation across the gap must state `no_counterpart`; a concept that has
//     one must not (the reason would be stale)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const window = {};
for (const f of ["public/atlas/data/atlas.js", "public/atlas/data/lightcone.js", "public/atlas/data/axes.js"]) {
  new Function("window", readFileSync(join(root, f), "utf8"))(window);
}
const ATLAS = window.ATLAS_DATA, LIGHTCONE = window.LIGHTCONE_DATA, AXES = window.ATLAS_AXES;

const errors = [], warns = [], infos = [];
const err  = m => errors.push(m);
const warn = m => warns.push(m);
const info = m => infos.push(m);

function index(data) {
  return {
    concepts: new Map(data.concepts.map(c => [c.id, c])),
    thinkers: new Map(data.thinkers.map(t => [t.id, t])),
    traditions: new Map(data.traditions.map(t => [t.id, t])),
    disputes: new Map(data.disputes.map(d => [d.id, d])),
  };
}
const maps = { atlas: { data: ATLAS, ...index(ATLAS) }, lightcone: { data: LIGHTCONE, ...index(LIGHTCONE) } };
const other = name => (name === "atlas" ? "lightcone" : "atlas");
const anyConcept = id => maps.atlas.concepts.get(id) || maps.lightcone.concepts.get(id);
const mapOfConcept = id => maps.atlas.concepts.has(id) ? "atlas" : maps.lightcone.concepts.has(id) ? "lightcone" : null;

// ── Per-map structural checks ───────────────────────────────────────────────
for (const [name, m] of Object.entries(maps)) {
  const { data, concepts, thinkers, traditions, disputes } = m;
  const otherConcepts = maps[other(name)].concepts;

  for (const [label, list] of [["concept", data.concepts], ["thinker", data.thinkers], ["tradition", data.traditions], ["dispute", data.disputes]]) {
    const seen = new Set();
    for (const x of list) {
      if (seen.has(x.id)) err(`[${name}] duplicate ${label} id "${x.id}"`);
      seen.add(x.id);
    }
  }
  for (const c of data.concepts) {
    if (!traditions.has(c.tradition)) err(`[${name}] concept "${c.id}" has unknown tradition "${c.tradition}"`);
    if (c.coined_by && !thinkers.has(c.coined_by)) err(`[${name}] concept "${c.id}" coined_by unknown thinker "${c.coined_by}"`);
    for (const t of c.key_thinkers || []) if (!thinkers.has(t)) err(`[${name}] concept "${c.id}" key_thinker "${t}" unknown`);
    for (const cp of c.counterparts || []) {
      if (!concepts.has(cp) && !otherConcepts.has(cp)) err(`[${name}] concept "${c.id}" counterpart "${cp}" not found in either map`);
    }
  }
  for (const t of data.thinkers) {
    if (!traditions.has(t.tradition)) err(`[${name}] thinker "${t.id}" has unknown tradition "${t.tradition}"`);
    for (const c of t.central_concepts || []) if (!concepts.has(c)) err(`[${name}] thinker "${t.id}" central_concept "${c}" unknown`);
  }
  for (const d of data.disputes) {
    for (const p of d.positions) {
      for (const t of p.thinkers || []) if (!thinkers.has(t)) err(`[${name}] dispute "${d.id}" references unknown thinker "${t}"`);
      for (const c of p.concepts || []) if (!concepts.has(c)) err(`[${name}] dispute "${d.id}" references unknown concept "${c}"`);
    }
  }

  const ccTypes = new Set(["ecart", "parallel", "pair", "kinship", "lineage"]);
  const tcTypes = new Set(["coined", "central", "advanced", "critiqued"]);
  const ttTypes = new Set(["influence", "critique", "dispute"]);
  const pairSeen = new Map();
  for (const e of data.edges) {
    const cross = !!e.cross_map;
    if (e.kind === "cc") {
      if (!ccTypes.has(e.type)) warn(`[${name}] cc edge ${e.source}→${e.target} has unusual type "${e.type}"`);
      const ok = id => concepts.has(id) || (cross && otherConcepts.has(id));
      if (!ok(e.source)) err(`[${name}] cc edge source "${e.source}" (→${e.target}) not found${cross ? " in either map" : ""}`);
      if (!ok(e.target)) err(`[${name}] cc edge target "${e.target}" (${e.source}→) not found${cross ? " in either map" : ""}`);
      const key = [e.source, e.target].sort().join("↔");
      if (!pairSeen.has(key)) pairSeen.set(key, []);
      pairSeen.get(key).push(e);
    } else if (e.kind === "tc") {
      if (!tcTypes.has(e.type)) warn(`[${name}] tc edge ${e.source}→${e.target} has unusual type "${e.type}"`);
      if (!thinkers.has(e.source)) err(`[${name}] tc edge source thinker "${e.source}" unknown`);
      if (!concepts.has(e.target)) err(`[${name}] tc edge target concept "${e.target}" unknown`);
    } else if (e.kind === "tt") {
      if (!ttTypes.has(e.type)) warn(`[${name}] tt edge ${e.source}→${e.target} has unusual type "${e.type}"`);
      const ok = id => thinkers.has(id) || (cross && maps[other(name)].thinkers.has(id));
      if (!ok(e.source)) err(`[${name}] tt edge source thinker "${e.source}" unknown`);
      if (!ok(e.target)) err(`[${name}] tt edge target thinker "${e.target}" unknown`);
      if (cross && !e.basis) err(`[${name}] cross-map tt edge ${e.source}→${e.target} has no basis`);
    } else if (e.kind === "dd") {
      if (!cross) err(`[${name}] dd edge ${e.source}→${e.target} must be cross_map (disputes are mapped only across the gap)`);
      const ok = id => disputes.has(id) || maps[other(name)].disputes.has(id);
      if (!ok(e.source)) err(`[${name}] dd edge source dispute "${e.source}" unknown`);
      if (!ok(e.target)) err(`[${name}] dd edge target dispute "${e.target}" unknown`);
      if (!e.basis) err(`[${name}] dd edge ${e.source}→${e.target} has no basis`);
    } else {
      err(`[${name}] edge ${e.source}→${e.target} has unknown kind "${e.kind}"`);
    }
  }
  for (const [key, list] of pairSeen) {
    if (list.length > 1) warn(`[${name}] ${list.length} cc edges between ${key}: types [${list.map(e => e.type).join(", ")}]`);
  }

  const tcByThinker = new Map();
  for (const e of data.edges) {
    if (e.kind !== "tc") continue;
    if (!tcByThinker.has(e.source)) tcByThinker.set(e.source, new Set());
    tcByThinker.get(e.source).add(e.target);
  }
  for (const t of data.thinkers) {
    for (const c of t.central_concepts || []) {
      if (!(tcByThinker.get(t.id) || new Set()).has(c)) warn(`[${name}] thinker "${t.id}" lists central_concept "${c}" but has no tc edge to it`);
    }
  }
  for (const c of data.concepts) {
    for (const cp of c.counterparts || []) {
      const target = concepts.get(cp);
      if (target && !(target.counterparts || []).includes(c.id)) info(`[${name}] counterpart asymmetry: "${c.id}" lists "${cp}" but not vice versa`);
    }
  }
}

// ── Axes ────────────────────────────────────────────────────────────────────
const axisById = new Map();
const poleOf = new Map(); // `${axis}:${concept}` -> "A" | "B"
for (const ax of AXES.axes) {
  if (axisById.has(ax.id)) err(`[axes] duplicate axis id "${ax.id}"`);
  axisById.set(ax.id, ax);
  for (const [side, pole] of [["A", ax.poleA], ["B", ax.poleB]]) {
    for (const cid of pole.concepts) {
      if (!anyConcept(cid)) err(`[axes] axis "${ax.id}" pole ${pole.id} lists unknown concept "${cid}"`);
      const key = `${ax.id}:${cid}`;
      if (poleOf.has(key) && poleOf.get(key) !== side) err(`[axes] concept "${cid}" sits on both poles of axis "${ax.id}"`);
      poleOf.set(key, side);
    }
  }
}
for (const f of AXES.figures || []) {
  for (const cid of f.concepts || []) if (!anyConcept(cid)) err(`[axes] figure "${f.figure}" lists unknown concept "${cid}"`);
}

// ── Cross-map checks ────────────────────────────────────────────────────────
const bases = new Set(["textual", "structural", "speculative"]);
const crossCC = LIGHTCONE.edges.filter(e => e.cross_map && e.kind === "cc");
let lcFirst = 0, atFirst = 0;
const byBasis = { textual: 0, structural: 0, speculative: 0 };
for (const e of crossCC) {
  const sMap = mapOfConcept(e.source), tMap = mapOfConcept(e.target);
  if (!sMap || !tMap) continue; // reported above
  if (sMap === tMap) { err(`[cross] edge ${e.source}→${e.target} flagged cross_map but both ends are ${sMap} concepts`); continue; }
  if (sMap === "lightcone") lcFirst++; else atFirst++;

  if (!bases.has(e.basis)) err(`[cross] edge ${e.source}↔${e.target} has no valid basis (got "${e.basis}")`);
  else byBasis[e.basis]++;
  if (!e.from_lc || !e.from_at) warn(`[cross] edge ${e.source}↔${e.target} lacks a two-sided reading (from_lc / from_at)`);

  if (e.type === "kinship") {
    if (!e.lineage) err(`[cross] kinship edge ${e.source}↔${e.target} must name its shared lineage`);
    continue;
  }
  if (!e.axis) { err(`[cross] edge ${e.source}↔${e.target} (${e.type}) has no axis`); continue; }
  if (!axisById.has(e.axis)) { err(`[cross] edge ${e.source}↔${e.target} cites unknown axis "${e.axis}"`); continue; }
  const ps = poleOf.get(`${e.axis}:${e.source}`), pt = poleOf.get(`${e.axis}:${e.target}`);
  if (!ps) err(`[cross] "${e.source}" is not positioned on axis "${e.axis}" (edge to ${e.target})`);
  if (!pt) err(`[cross] "${e.target}" is not positioned on axis "${e.axis}" (edge from ${e.source})`);
  if (ps && pt) {
    const expected = ps === pt ? "parallel" : "ecart";
    if (e.type !== expected) err(`[cross] edge ${e.source}↔${e.target} is typed "${e.type}" but axis "${e.axis}" puts them on ${ps === pt ? "the same pole" : "opposite poles"} (expected "${expected}")`);
  }
}
info(`[cross] ${crossCC.length} concept edges (${lcFirst} lightcone→atlas, ${atFirst} atlas→lightcone); basis: ${byBasis.textual} textual, ${byBasis.structural} structural, ${byBasis.speculative} speculative`);
const crossDD = LIGHTCONE.edges.filter(e => e.cross_map && e.kind === "dd");
const crossTT = LIGHTCONE.edges.filter(e => e.cross_map && e.kind === "tt");
info(`[cross] ${crossDD.length} dispute edges, ${crossTT.length} thinker edges across the gap`);

for (const e of ATLAS.edges) {
  if (e.cross_map) err(`[atlas] edge ${e.source}→${e.target} is flagged cross_map; cross-map edges belong in lightcone.js`);
  if (e.kind === "cc" && (!maps.atlas.concepts.has(e.source) || !maps.atlas.concepts.has(e.target))) {
    err(`[atlas] cc edge ${e.source}→${e.target} references a non-atlas concept`);
  }
}
const crossPairs = new Map();
for (const e of crossCC) {
  const key = [e.source, e.target].sort().join("↔");
  if (!crossPairs.has(key)) crossPairs.set(key, []);
  crossPairs.get(key).push(e);
}
for (const [key, list] of crossPairs) {
  if (list.length > 1) warn(`[cross] ${list.length} cross-map edges between ${key}: types [${list.map(e => e.type).join(", ")}]`);
}

// ── Residue: unmapped concepts must say why; mapped ones must not ───────────
const touched = new Set();
for (const e of crossCC) { touched.add(e.source); touched.add(e.target); }
for (const [name, m] of Object.entries(maps)) {
  for (const c of m.data.concepts) {
    for (const cp of c.counterparts || []) if (maps[other(name)].concepts.has(cp)) { touched.add(c.id); touched.add(cp); }
  }
}
const residue = { atlas: [], lightcone: [] };
for (const [name, m] of Object.entries(maps)) {
  for (const c of m.data.concepts) {
    if (!touched.has(c.id)) {
      residue[name].push(c.id);
      if (!c.no_counterpart) warn(`[${name}] concept "${c.id}" has no relation across the gap and no no_counterpart reason`);
    } else if (c.no_counterpart) {
      warn(`[${name}] concept "${c.id}" states no_counterpart but has a cross-map relation — stale reason`);
    }
  }
}
info(`[cross] residue — lightcone (${residue.lightcone.length}): ${residue.lightcone.join(", ") || "—"}`);
info(`[cross] residue — atlas (${residue.atlas.length}): ${residue.atlas.join(", ") || "—"}`);

// axis coverage: concepts positioned on no axis (info only — many internal concepts need none)
const positioned = new Set([...poleOf.keys()].map(k => k.split(":")[1]));
const unpositioned = [...touched].filter(id => !positioned.has(id));
if (unpositioned.length) info(`[axes] cross-mapped concepts on no axis: ${unpositioned.join(", ")}`);

// ── Report ──────────────────────────────────────────────────────────────────
const show = (label, list) => { if (list.length) { console.log(`\n${label} (${list.length})`); for (const m of list) console.log("  " + m); } };
console.log(`atlas: ${ATLAS.concepts.length} concepts, ${ATLAS.thinkers.length} thinkers, ${ATLAS.edges.length} edges, ${ATLAS.disputes.length} disputes`);
console.log(`lightcone: ${LIGHTCONE.concepts.length} concepts, ${LIGHTCONE.thinkers.length} thinkers, ${LIGHTCONE.edges.length} edges, ${LIGHTCONE.disputes.length} disputes`);
console.log(`axes: ${AXES.axes.length}, positions: ${poleOf.size}, figures: ${(AXES.figures || []).length}`);
show("ERRORS", errors);
show("WARNINGS", warns);
show("INFO", infos.filter(m => !m.includes("counterpart asymmetry")));
const asym = infos.filter(m => m.includes("counterpart asymmetry"));
if (asym.length) console.log(`\n(${asym.length} within-map counterpart asymmetries — directional by design; shown in the UI as "listed as a counterpart by")`);
if (!errors.length && !warns.length) console.log("\nNo errors or warnings.");
process.exit(errors.length ? 1 : 0);
