// East ↔ West Atlas — graph rendering
// Two node types (concepts, thinkers); three edge kinds (cc, tc, tt).

(function () {
  const data = window.GRAPH_DATA;
  if (!data) { console.error("data file did not load (no window.GRAPH_DATA)"); return; }

  // Index everything
  const conceptById  = Object.fromEntries(data.concepts.map(c => [c.id, c]));
  const thinkerById  = Object.fromEntries(data.thinkers.map(t => [t.id, t]));
  const traditionById = Object.fromEntries(data.traditions.map(t => [t.id, t]));
  const disputeById  = Object.fromEntries(data.disputes.map(d => [d.id, d]));

  // The other atlas, when its data file is loaded on this page: lets the panel
  // resolve cross-map counterparts and edges instead of silently dropping them.
  const currentMapId = window.GRAPH_MAP_ID === "lightcone" ? "lightcone" : "atlas";
  const otherMapId   = currentMapId === "lightcone" ? "atlas" : "lightcone";
  const otherData    = otherMapId === "atlas" ? window.ATLAS_DATA : window.LIGHTCONE_DATA;
  const otherConceptById = otherData ? Object.fromEntries(otherData.concepts.map(c => [c.id, c])) : {};

  // Tradition palette: each tradition has its own color
  function nodeColor(node) {
    const trad = node.tradition;
    return (traditionById[trad] && traditionById[trad].color) || "#666";
  }

  // Build node list (typed) + edge list
  // We give each node an internal id with a kind-prefix so concept "shi" and thinker "shi" never collide.
  function nid(kind, id) { return `${kind}:${id}`; }

  const nodes = [
    ...data.concepts.map(c => ({ ...c, _kind: "concept", _nid: nid("c", c.id) })),
    ...data.thinkers.map(t => ({ ...t, _kind: "thinker", _nid: nid("t", t.id) }))
  ];
  const nodeByNid = Object.fromEntries(nodes.map(n => [n._nid, n]));

  // Build node-id index up-front so we can drop edges with missing endpoints
  const _nidSet = new Set(nodes.map(n => n._nid));
  const links = data.edges.map(e => {
    let s, t;
    if (e.kind === "cc") { s = nid("c", e.source); t = nid("c", e.target); }
    else if (e.kind === "tc") { s = nid("t", e.source); t = nid("c", e.target); }
    else if (e.kind === "tt") { s = nid("t", e.source); t = nid("t", e.target); }
    return { source: s, target: t, kind: e.kind, type: e.type, note: e.note, basis: e.basis, cross: !!e.cross_map };
  }).filter(l => _nidSet.has(l.source) && _nidSet.has(l.target));

  // SVG setup
  const svg = d3.select("#graph");
  const root = svg.append("g");
  const zoom = d3.zoom().scaleExtent([0.3, 3]).on("zoom", e => root.attr("transform", e.transform));
  svg.call(zoom);

  // Force simulation
  const sim = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d._nid).distance(d => {
      if (d.kind === "tt") return 100;
      if (d.kind === "tc") return 70;
      // cc edges
      if (d.type === "pair" || d.type === "kinship") return 80;
      if (d.type === "lineage") return 90;
      if (d.type === "parallel") return 130;
      return 160; // ecart
    }).strength(d => {
      if (d.kind === "tc") return 0.35;
      if (d.kind === "tt") return 0.20;
      return d.type === "ecart" ? 0.7 : 0.4;
    }))
    .force("charge", d3.forceManyBody().strength(d => d._kind === "thinker" ? -480 : -300))
    .force("center", d3.forceCenter().x(0).y(0))
    .force("collide", d3.forceCollide(d => d._kind === "thinker" ? 50 : 32))
    // Spread by tradition along the X axis using each tradition's xPos field (data-driven)
    .force("x", d3.forceX(d => {
      const t = traditionById[d.tradition];
      const xPos = (t && typeof t.xPos === "number") ? t.xPos : 0;
      return xPos * 280;
    }).strength(0.16))
    .force("y", d3.forceY(d => {
      const t = traditionById[d.tradition];
      const yPos = (t && typeof t.yPos === "number") ? t.yPos : 0;
      return yPos * 160;
    }).strength(0.05));

  // Edges
  const linkSel = root.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", d => `link link-${d.kind} link-${d.kind}-${d.type}${d.basis ? ` link-basis-${d.basis}` : ""}`);

  // Nodes
  const nodeSel = root.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes, d => d._nid)
    .join("g")
    .attr("class", d => `node node-${d._kind}`)
    .call(d3.drag()
      .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag",  (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on("end",   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }))
    .on("click", (e, d) => { showNode(d); highlightNeighborhood(d._nid); e.stopPropagation(); });

  // Concept nodes: circles + character glyph
  const conceptNodes = nodeSel.filter(d => d._kind === "concept");
  conceptNodes.append("circle")
    .attr("r", 16)
    .attr("fill", d => nodeColor(d))
    .attr("fill-opacity", 0.18)
    .attr("stroke", d => nodeColor(d))
    .attr("stroke-width", 1.6);
  conceptNodes.append("text")
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .attr("class", "node-label-concept")
    .text(d => d.term);

  // Thinker nodes: rounded rect with name
  const thinkerNodes = nodeSel.filter(d => d._kind === "thinker");
  thinkerNodes.append("rect")
    .attr("rx", 6).attr("ry", 6)
    .attr("x", -56).attr("y", -14)
    .attr("width", 112).attr("height", 28)
    .attr("fill", d => nodeColor(d))
    .attr("fill-opacity", 0.18)
    .attr("stroke", d => nodeColor(d))
    .attr("stroke-width", 1.4);
  thinkerNodes.append("text")
    .attr("dy", 4)
    .attr("text-anchor", "middle")
    .attr("class", "node-label-thinker")
    .text(d => {
      // Short label
      const n = d.name;
      if (n.length <= 22) return n;
      // Drop parenthetical part
      const cut = n.indexOf(" (");
      return (cut > 0 ? n.slice(0, cut) : n).slice(0, 22);
    });

  nodeSel.append("title").text(d =>
    d._kind === "concept"
      ? `${d.term} — ${d.english}`
      : `${d.name} (${d.dates})`);

  sim.on("tick", () => {
    linkSel
      .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    nodeSel.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  function viewport() {
    const el = document.getElementById("graph");
    return { w: el.clientWidth, h: el.clientHeight };
  }
  function resize() {
    const { w, h } = viewport();
    svg.attr("viewBox", [-w/2, -h/2, w, h]);
    sim.alpha(0.3).restart();
  }
  window.addEventListener("resize", resize);
  resize();
  // The layout spreads ~700px wide; on a phone start zoomed out so the whole graph is in view
  if (viewport().w < 700) svg.call(zoom.transform, d3.zoomIdentity.scale(0.55));

  // ─── Small-screen chrome: collapsible overlays and a bottom-sheet panel ─────
  // The toggles always exist; CSS shows them only under the mobile breakpoint.
  function addToggle(el, label) {
    if (!el) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "overlay-toggle";
    btn.textContent = label;
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", () => {
      const open = el.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    el.prepend(btn);
  }
  addToggle(document.querySelector(".controls"), "Filters");
  addToggle(document.querySelector(".legend"), "Key");

  // ─── Filter state ────────────────────────────────────────────
  const state = {
    showConcepts: true,
    showThinkers: true,
    showThinkerLinks: false,
    tradition: "all",
    edgeTypes: new Set(["ecart","parallel","pair","kinship","lineage"]),
    query: ""
  };

  function nodeVisible(n) {
    if (n._kind === "concept" && !state.showConcepts) return false;
    if (n._kind === "thinker" && !state.showThinkers) return false;
    if (state.tradition.startsWith("origin:")) {
      if (n._originMap !== state.tradition.slice("origin:".length)) return false;
    } else if (state.tradition !== "all" && n.tradition !== state.tradition) return false;
    if (state.query) {
      const hay = (n._kind === "concept"
        ? `${n.term} ${n.transliteration||""} ${n.english||""} ${n.gloss||""}`
        : `${n.name} ${(n.central_concepts||[]).join(" ")} ${(n.contribution||"")}`
      ).toLowerCase();
      if (!hay.includes(state.query)) return false;
    }
    return true;
  }
  function linkVisible(l) {
    if (l.kind === "cc" && !state.edgeTypes.has(l.type)) return false;
    if (l.kind === "tc" && !state.showThinkers) return false;
    if (l.kind === "tt" && !state.showThinkerLinks) return false;
    const sNid = typeof l.source === "object" ? l.source._nid : l.source;
    const tNid = typeof l.target === "object" ? l.target._nid : l.target;
    return nodeVisible(nodeByNid[sNid]) && nodeVisible(nodeByNid[tNid]);
  }

  function applyFilters() {
    nodeSel.style("display", d => nodeVisible(d) ? null : "none");
    linkSel.style("display", d => linkVisible(d) ? null : "none");
  }

  // Wire filter chips
  document.querySelectorAll("#filter-show .chip").forEach(btn => {
    btn.addEventListener("click", () => {
      const what = btn.dataset.show;
      btn.classList.toggle("active");
      const on = btn.classList.contains("active");
      if (what === "concepts") state.showConcepts = on;
      if (what === "thinkers") state.showThinkers = on;
      if (what === "tt") state.showThinkerLinks = on;
      applyFilters();
    });
  });
  document.querySelectorAll("#filter-tradition .chip").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#filter-tradition .chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.tradition = btn.dataset.tradition;
      applyFilters();
    });
  });
  document.querySelectorAll("#filter-edges .chip").forEach(btn => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.edge;
      if (state.edgeTypes.has(t)) { state.edgeTypes.delete(t); btn.classList.remove("active"); }
      else { state.edgeTypes.add(t); btn.classList.add("active"); }
      applyFilters();
    });
  });
  document.getElementById("search").addEventListener("input", e => {
    state.query = e.target.value.trim().toLowerCase();
    applyFilters();
  });

  // ─── Highlight neighborhood ──────────────────────────────────
  function highlightNeighborhood(nidVal) {
    const neighbors = new Set([nidVal]);
    links.forEach(l => {
      const sN = typeof l.source === "object" ? l.source._nid : l.source;
      const tN = typeof l.target === "object" ? l.target._nid : l.target;
      if (sN === nidVal) neighbors.add(tN);
      if (tN === nidVal) neighbors.add(sN);
    });
    nodeSel.style("opacity", d => neighbors.has(d._nid) ? 1 : 0.18);
    linkSel.style("opacity", l => {
      const sN = typeof l.source === "object" ? l.source._nid : l.source;
      const tN = typeof l.target === "object" ? l.target._nid : l.target;
      return (sN === nidVal || tN === nidVal) ? 0.95 : 0.04;
    });
  }
  svg.on("click", () => {
    nodeSel.style("opacity", 1);
    linkSel.style("opacity", null);
    panel.classList.remove("open");
  });

  // ─── Side panel ──────────────────────────────────────────────
  const panel = document.getElementById("panel");

  // Bottom-sheet handle for small screens: re-mounted after every panel render
  function mountSheet(label, open) {
    let handle = panel.querySelector(".sheet-handle");
    if (!handle) {
      handle = document.createElement("div");
      handle.className = "sheet-handle";
      handle.innerHTML = `<span class="sheet-label"></span><span class="sheet-chevron">▲</span>`;
      handle.addEventListener("click", () => panel.classList.toggle("open"));
    }
    handle.querySelector(".sheet-label").textContent = label;
    panel.prepend(handle);
    if (open) { panel.classList.add("open"); panel.scrollTop = 0; }
  }
  mountSheet("Tap a node to read about it", false);

  function tradLabel(id) { return (traditionById[id] && traditionById[id].name) || id; }
  function disputeHref(id) { return `disputes.html${window.GRAPH_MAP_ID === "lightcone" ? "?map=lightcone" : ""}#${id}`; }

  function showNode(d) {
    if (d._kind === "concept") return showConcept(d);
    if (d._kind === "thinker") return showThinker(d);
  }

  function showConcept(c) {
    // Find counterparts (linked) and thinkers who worked it.
    // A counterpart may live in the other atlas: link to its concept page there.
    const counterparts = (c.counterparts || []).map(cid => {
      const cc = conceptById[cid];
      if (cc) return `<a href="#" data-cnid="c:${cc.id}">${cc.term}</a>`;
      const oc = otherConceptById[cid];
      if (oc) return `<a href="concepts/concept.html?map=${otherMapId}&id=${oc.id}" title="cross-map · ${oc.english || ""}">${oc.term}<sup style="opacity:0.6">×</sup></a>`;
      return "";
    }).filter(Boolean).join("");

    // Cross-map edges touching this concept. They are stored in the lightcone
    // data file, so on the East–West map they must be read from otherData;
    // on the lightcone map they already render as graph edges.
    const crossLinks = (currentMapId === "atlas" && otherData ? otherData.edges : [])
      .filter(e => e.cross_map && (e.source === c.id || e.target === c.id))
      .map(e => {
        const oc = otherConceptById[e.source === c.id ? e.target : e.source];
        if (!oc) return "";
        return `<a href="concepts/concept.html?map=${otherMapId}&id=${oc.id}" title="${e.type}: ${e.note || ""}">${oc.term}<sup style="opacity:0.6">${e.type[0]}</sup></a>`;
      }).filter(Boolean).join("");

    // Thinkers who worked this concept (tc edges, plus key_thinkers without one)
    const tcEdges = data.edges.filter(e => e.kind === "tc" && e.target === c.id);
    const edgeThinkerIds = new Set(tcEdges.map(e => e.source));
    const linkedThinkers = tcEdges
      .map(e => {
        const t = thinkerById[e.source];
        if (!t) return "";
        const role = e.type;
        return `<a href="#" data-cnid="t:${t.id}" title="${role}">${t.name.split(" (")[0]}<sup style="opacity:0.6">${role[0]}</sup></a>`;
      })
      .concat((c.key_thinkers || []).filter(tid => !edgeThinkerIds.has(tid)).map(tid => {
        const t = thinkerById[tid];
        return t ? `<a href="#" data-cnid="t:${t.id}" title="key thinker">${t.name.split(" (")[0]}<sup style="opacity:0.6">k</sup></a>` : "";
      }))
      .filter(Boolean).join(" · ");

    // Disputes the concept figures in
    const inDisputes = data.disputes.filter(d => d.positions.some(p => (p.concepts || []).includes(c.id)))
      .map(d => `<a href="${disputeHref(d.id)}">${d.name}</a>`).join("; ");

    panel.innerHTML = `
      <p class="term">${c.term}</p>
      <p class="term-en"><em>${c.transliteration || ""}</em> &middot; ${c.english || ""}</p>
      <p class="meta">${tradLabel(c.tradition)} &middot; ${c.domain}</p>
      ${c.coined_by ? `<p class="meta" style="margin-top:2px">coined by <a href="thinker.html?map=${c._originMap || window.GRAPH_MAP_ID || "atlas"}&id=${c.coined_by}">${(thinkerById[c.coined_by]||{}).name||c.coined_by}</a></p>` : ""}

      <p class="gloss">${c.gloss || ""}</p>

      ${c.ecart ? `<div class="ecart-block">
        <div class="label">Écart</div>${c.ecart}
      </div>` : ""}

      ${c.us_china ? `<div class="ecart-block" style="background:#eef2f1;border-left-color:#2c4a52;">
        <div class="label" style="color:#2c4a52;">US–China application</div>${c.us_china}
      </div>` : ""}

      ${counterparts ? `<div class="related"><span class="label">Counterparts</span>${counterparts}</div>` : ""}
      ${crossLinks ? `<div class="related"><span class="label">Across the maps</span>${crossLinks}</div>` : ""}
      ${linkedThinkers ? `<div class="related"><span class="label">Worked by</span>${linkedThinkers}</div>` : ""}
      ${inDisputes ? `<div class="related"><span class="label">In disputes</span>${inDisputes}</div>` : ""}

      <a class="openpage" href="concepts/concept.html?map=${c._originMap || window.GRAPH_MAP_ID || "atlas"}&id=${c.id}">Open concept page →</a>
    `;
    wirePanelLinks();
    mountSheet(`${c.term} · ${c.english || c.transliteration || ""}`, true);
  }

  function showThinker(t) {
    // Their concepts (with role)
    const tcEdges = data.edges.filter(e => e.kind === "tc" && e.source === t.id);
    const conceptsByRole = { coined: [], central: [], advanced: [], critiqued: [] };
    tcEdges.forEach(e => {
      const c = conceptById[e.target];
      if (c) (conceptsByRole[e.type] || conceptsByRole.advanced).push(c);
    });
    function row(label, list) {
      if (!list.length) return "";
      return `<div class="related"><span class="label">${label}</span>${
        list.map(c => `<a href="#" data-cnid="c:${c.id}">${c.term}</a>`).join(" · ")
      }</div>`;
    }

    // Influence/critique edges
    const ttEdges = data.edges.filter(e => e.kind === "tt" && (e.source === t.id || e.target === t.id));
    const ttList = ttEdges.map(e => {
      const otherId = e.source === t.id ? e.target : e.source;
      const other = thinkerById[otherId];
      if (!other) return "";
      const dir = e.source === t.id ? "→" : "←";
      const verb = e.type;
      return `<a href="#" data-cnid="t:${other.id}">${other.name.split(" (")[0]}</a> <span style="color:var(--muted);font-size:13px">(${verb} ${dir})</span>`;
    }).filter(Boolean).join(" · ");

    // Disputes the thinker is positioned in
    const inDisputes = data.disputes.filter(d => d.positions.some(p => (p.thinkers || []).includes(t.id)))
      .map(d => `<a href="${disputeHref(d.id)}">${d.name}</a>`).join("; ");

    const works = (t.key_works || []).map(w => `<li>${w}</li>`).join("");

    panel.innerHTML = `
      <p class="term" style="font-size:28px;line-height:1.15;">${t.name}</p>
      <p class="term-en">${t.dates || ""} &middot; ${t.nationality || ""}</p>
      <p class="meta">${tradLabel(t.tradition)}</p>

      <p class="gloss">${t.contribution || ""}</p>

      ${row("Coined", conceptsByRole.coined)}
      ${row("Central", conceptsByRole.central)}
      ${row("Advanced", conceptsByRole.advanced)}
      ${row("Critiqued", conceptsByRole.critiqued)}
      ${ttList ? `<div class="related"><span class="label">In dialogue with</span>${ttList}</div>` : ""}
      ${inDisputes ? `<div class="related"><span class="label">In disputes</span>${inDisputes}</div>` : ""}

      ${works ? `<div class="related" style="margin-top:14px"><span class="label">Key works</span><ul class="sources-list" style="margin-top:6px">${works}</ul></div>` : ""}

      <a class="openpage" href="thinker.html?map=${t._originMap || window.GRAPH_MAP_ID || "atlas"}&id=${t.id}">Open thinker page →</a>
    `;
    wirePanelLinks();
    mountSheet(t.name.split(" (")[0], true);
  }

  function wirePanelLinks() {
    panel.querySelectorAll("a[data-cnid]").forEach(a => {
      a.addEventListener("click", ev => {
        ev.preventDefault();
        const target = a.dataset.cnid;
        const node = nodeByNid[target];
        if (node) { showNode(node); highlightNeighborhood(target); }
      });
    });
  }

  // Initial filter pass so the DOM matches the chip state on load
  applyFilters();

  // Open a node by URL hash, e.g. #c:shi or #t:jullien
  if (location.hash && location.hash.length > 1) {
    const target = location.hash.slice(1);
    const node = nodeByNid[target];
    if (node) { showNode(node); highlightNeighborhood(target); }
  }
})();
