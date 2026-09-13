/* Hyperhelvetica flag generator.
   Shared by hyperswitzerland-nested.html (design tool) and contact-sheet.html (candidate grid).
   Classic script, no ES modules, so both pages work over file:// with no server.

   Every parameter added after the first version defaults to the value that was
   hardcoded before it, so a flag saved from an earlier version still renders identically. */
(function (global) {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var RED = "#DA291C", WHITE = "#FFFFFF";
  var S = 960;

  /* Discrete marks are stamped once per step along an arm. Line and wave replace the
     stamps with a single tapering ribbon that follows the same centreline, so an arm
     keeps its length and decay whichever mark it is drawn with. */
  var MARKS = ["cross", "square", "circle", "diamond", "triangle", "bar", "line", "wave"];
  function isRibbon(mark) { return mark === "line" || mark === "wave"; }

  var usesWave = function (p) { return p.mk === "wave" || p.mki === "wave"; };

  var FIELDS = [
    { key: "a",   group: "Outer field", label: "Arms",            type: "int",   min: 3,    max: 200,  step: 1,     def: 32 },
    { key: "mk",  group: "Outer field", label: "Mark",            type: "enum",  values: MARKS, def: "cross", advanced: true },
    { key: "w",   group: "Outer field", label: "Spiral",          type: "int",   min: -540, max: 540,  step: 5,     def: 55,    unit: "°" },
    { key: "q",   group: "Outer field", label: "Hyperbole",       type: "float", min: 0.55, max: 0.96, step: 0.01,  def: 0.92,  dp: 2 },
    { key: "os",  group: "Outer field", label: "Start offset",    type: "int",   min: 0,    max: 200,  step: 2,     def: 48,    unit: "px" },
    { key: "om",  group: "Outer field", label: "Max size",        type: "float", min: 0.3,  max: 2,    step: 0.05,  def: 1,     dp: 2, unit: "×" },

    { key: "ai",  group: "Inner field", label: "Arms",            type: "int",   min: 3,    max: 200,  step: 1,     def: 8 },
    { key: "mki", group: "Inner field", label: "Mark",            type: "enum",  values: MARKS, def: "cross", advanced: true },
    { key: "b",   group: "Inner field", label: "Boundary",        type: "enum",  values: ["cross", "circle", "square", "diamond", "petal"], def: "cross", advanced: true },
    { key: "wi",  group: "Inner field", label: "Spiral",          type: "int",   min: -540, max: 540,  step: 5,     def: 55,    unit: "°" },
    { key: "qi",  group: "Inner field", label: "Hyperbole",       type: "float", min: 0.55, max: 0.96, step: 0.01,  def: 0.92,  dp: 2 },
    { key: "is",  group: "Inner field", label: "Size",            type: "float", min: 0.2,  max: 2,    step: 0.05,  def: 1,     dp: 2, unit: "×" },
    { key: "im",  group: "Inner field", label: "Max size",        type: "int",   min: 6,    max: 120,  step: 1,     def: 46,    unit: "px" },
    { key: "ir",  group: "Inner field", label: "Start",           type: "float", min: 0.05, max: 0.8,  step: 0.01,  def: 0.34,  dp: 2 },

    { key: "wa",  group: "Wave",        label: "Amplitude",       type: "float", min: 0,    max: 3,    step: 0.05,  def: 0.9,   dp: 2, unit: "×", showIf: usesWave, advanced: true },
    { key: "wf",  group: "Wave",        label: "Cycles",          type: "float", min: 0.5,  max: 16,   step: 0.5,   def: 4,     dp: 1, showIf: usesWave, advanced: true },

    { key: "cs",  group: "Geometry",    label: "Cross size",      type: "float", min: 0.3,  max: 0.9,  step: 0.005, def: 0.625, dp: 3, unit: "×" },
    { key: "ct",  group: "Geometry",    label: "Cross thickness", type: "float", min: 0.06, max: 0.33, step: 0.005, def: 1 / 6, dp: 3, advanced: true },
    { key: "mt",  group: "Geometry",    label: "Mark thickness",  type: "float", min: 0.06, max: 0.9,  step: 0.01,  def: 1 / 3, dp: 2, advanced: true },
    { key: "ph",  group: "Geometry",    label: "Rotation",        type: "int",   min: 0,    max: 359,  step: 1,     def: 0,     unit: "°" },
    { key: "rot", group: "Geometry",    label: "Mark alignment",  type: "enum",  values: ["path", "fixed"], def: "path", advanced: true },
    { key: "inv", group: "Geometry",    label: "Colours",         type: "enum",  values: ["red", "white"], def: "red" }
  ];

  var BY_KEY = {}, DEFAULTS = {};
  FIELDS.forEach(function (f) { BY_KEY[f.key] = f; DEFAULTS[f.key] = f.def; });

  var GROUPS = FIELDS.reduce(function (acc, f) {
    if (acc.indexOf(f.group) < 0) acc.push(f.group);
    return acc;
  }, []);

  var uid = 0;

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function coerce(f, v) {
    if (f.type === "enum") return f.values.indexOf(String(v)) >= 0 ? String(v) : f.def;
    if (f.type === "int") {
      var n = parseInt(v, 10);
      return isNaN(n) ? f.def : clamp(n, f.min, f.max);
    }
    var x = parseFloat(v);
    return isNaN(x) ? f.def : clamp(x, f.min, f.max);
  }

  function normalize(raw) {
    var p = {};
    FIELDS.forEach(function (f) {
      var given = raw && raw[f.key] !== undefined && raw[f.key] !== null && raw[f.key] !== "";
      p[f.key] = given ? coerce(f, raw[f.key]) : f.def;
    });
    return p;
  }

  function isDefault(key, value) {
    var f = BY_KEY[key];
    if (f.type === "enum" || f.type === "int") return value === f.def;
    return Math.abs(value - f.def) < 1e-9;
  }

  function visible(f, p) { return !f.showIf || f.showIf(p); }

  /* The panel shows the simplified set by default. Advanced parameters stay in the
     engine and are still honoured from a URL; they are only absent from the controls,
     and reappear in the standalone build or with ?advanced=1. */
  function panelFields(includeAdvanced) {
    return FIELDS.filter(function (f) { return includeAdvanced || !f.advanced; });
  }

  /* Compact: only fields that differ from default, in fixed field order, and only ones
     that currently do anything. Same flag always yields the same string, so links and
     filenames are stable. */
  function encode(raw) {
    var p = normalize(raw);
    return FIELDS.filter(function (f) { return visible(f, p) && !isDefault(f.key, p[f.key]); })
      .map(function (f) { return f.key + "=" + p[f.key]; }).join("&");
  }

  function encodeAll(raw) {
    var p = normalize(raw);
    return FIELDS.map(function (f) { return f.key + "=" + p[f.key]; }).join("&");
  }

  function decode(str) {
    var out = {};
    String(str || "").replace(/^[#?]+/, "").split("&").forEach(function (kv) {
      if (!kv) return;
      var i = kv.indexOf("=");
      if (i < 0) return;
      out[decodeURIComponent(kv.slice(0, i))] = decodeURIComponent(kv.slice(i + 1));
    });
    return normalize(out);
  }

  function slug(raw) {
    var s = encode(raw).replace(/[=&]/g, function (c) { return c === "=" ? "" : "-"; }).replace(/\./g, "p");
    return s || "default";
  }

  function format(key, value) {
    var f = BY_KEY[key];
    if (!f) return String(value);
    if (f.type === "enum") return String(value);
    var s = f.type === "float" ? Number(value).toFixed(f.dp) : String(value);
    return s + (f.unit || "");
  }

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var a in attrs) e.setAttribute(a, attrs[a]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function rect(p, x, y, w, h, fill) {
    el("rect", { x: x, y: y, width: w, height: h, fill: fill, "shape-rendering": "crispEdges" }, p);
  }

  function geom(p) {
    var C = S * p.cs;
    return { S: S, C: C, HALF: S / 2, R: S / 2 - 6, ARM: C / 2, TH: C * p.ct };
  }

  function drawMark(parent, cx, cy, s, rotDeg, fill, thick, mark) {
    var g = el("g", {
      transform: "translate(" + cx.toFixed(2) + " " + cy.toFixed(2) + ") rotate(" + rotDeg.toFixed(1) + ")",
      fill: fill
    }, parent);
    var t = s * thick, h = s / 2;
    if (mark === "square") {
      el("rect", { x: -h, y: -h, width: s, height: s }, g);
    } else if (mark === "circle") {
      el("circle", { cx: 0, cy: 0, r: h }, g);
    } else if (mark === "diamond") {
      el("polygon", { points: [0, -h, h, 0, 0, h, -h, 0].join(" ") }, g);
    } else if (mark === "triangle") {
      el("polygon", { points: [h, 0, -h, h, -h, -h].join(" ") }, g);
    } else if (mark === "bar") {
      el("rect", { x: -h, y: -t / 2, width: s, height: t }, g);
    } else {
      el("rect", { x: -h, y: -t / 2, width: s, height: t }, g);
      el("rect", { x: -t / 2, y: -h, width: t, height: s }, g);
    }
    return g;
  }

  function normalAt(arr, i) {
    var a = arr[Math.max(0, i - 1)], b = arr[Math.min(arr.length - 1, i + 1)];
    var dx = b.x - a.x, dy = b.y - a.y;
    var L = Math.hypot(dx, dy) || 1;
    return { x: -dy / L, y: dx / L };
  }

  /* One tapering polygon per arm: the centreline offset by half the local mark size
     on each side, out and back. Width decays exactly as the stamped marks would have. */
  function ribbon(target, samples, fill, thick, waved, amp, cycles) {
    if (samples.length < 2) return;
    var line = samples.map(function (m) { return { x: m.x, y: m.y, s: m.s }; });
    if (waved) {
      var span = line.length - 1;
      line = line.map(function (m, i) {
        var n = normalAt(samples, i);
        var off = amp * m.s * Math.sin(2 * Math.PI * cycles * (i / span));
        return { x: m.x + n.x * off, y: m.y + n.y * off, s: m.s };
      });
    }
    var left = [], right = [];
    for (var i = 0; i < line.length; i++) {
      var n = normalAt(line, i);
      var hw = Math.max(line[i].s * thick / 2, 0.35);
      left.push((line[i].x + n.x * hw).toFixed(2) + "," + (line[i].y + n.y * hw).toFixed(2));
      right.push((line[i].x - n.x * hw).toFixed(2) + "," + (line[i].y - n.y * hw).toFixed(2));
    }
    el("polygon", { points: left.concat(right.reverse()).join(" "), fill: fill }, target);
  }

  /* tailDecay only shrinks the final mark of an arm. The original tool always passed
     the OUTER hyperbole here, inner arms included; kept as-is so old sets render the same. */
  function drawArm(target, pts, cap, fill, scale, tailDecay, p, mark) {
    var samples = [];
    for (var n = 0; n < pts.length; n++) {
      var pt = pts[n];
      var nb = pts[n + 1] || pts[n - 1];
      if (!nb) break;
      var gapd = Math.hypot(nb.x - pt.x, nb.y - pt.y);
      var s = Math.min(scale * Math.min(0.85 * gapd * (pts[n + 1] ? 1 : tailDecay), 1.3 * pt.dn), cap);
      if (s < 1.4) break;
      var rotDeg = 0;
      if (p.rot === "path") {
        var dir = pts[n + 1] ? pts[n + 1] : pt;
        var prev = pts[n - 1] || pt;
        rotDeg = Math.atan2(dir.y - prev.y, dir.x - prev.x) * 180 / Math.PI;
      }
      samples.push({ x: pt.x, y: pt.y, s: s, rot: rotDeg });
    }
    if (isRibbon(mark)) {
      ribbon(target, samples, fill, p.mt, mark === "wave", p.wa, p.wf);
      return;
    }
    samples.forEach(function (m) { drawMark(target, m.x, m.y, m.s, m.rot, fill, p.mt, mark); });
  }

  function crossExit(c, s, g) {
    var ac = Math.abs(c), as = Math.abs(s);
    var bar = function (hw, hh) { return Math.min(hw / (ac || 1e-9), hh / (as || 1e-9)); };
    return Math.max(bar(g.ARM, g.TH), bar(g.TH, g.ARM));
  }

  function innerBoundary(c, s, bound, g) {
    var ac = Math.abs(c), as = Math.abs(s);
    if (bound === "circle") return g.ARM;
    if (bound === "square") return g.ARM / Math.max(ac, as);
    if (bound === "diamond") return g.ARM / (ac + as);
    if (bound === "petal") {
      var th = Math.atan2(s, c);
      return g.TH + (g.ARM - g.TH) * Math.pow((Math.cos(4 * th) + 1) / 2, 0.8);
    }
    return crossExit(c, s, g);
  }

  function drawOuterArms(svg, p, g, mark) {
    var W = p.w * Math.PI / 180;
    var PH = p.ph * Math.PI / 180;
    var rStart = g.ARM + p.os;
    var d0 = g.R - rStart;
    if (d0 <= 0) return;
    var armCap = p.om * 0.85 * (2 * Math.PI * rStart / p.a);
    for (var i = 0; i < p.a; i++) {
      var th0 = (2 * Math.PI * i) / p.a + Math.PI / p.a + PH;
      var pts = [];
      for (var n = 0; n < 90; n++) {
        var dn = d0 * Math.pow(p.q, n);
        if (dn < 1) break;
        var t = g.R - dn;
        var th = th0 + W * (1 - Math.pow(p.q, n));
        pts.push({ x: g.HALF + Math.cos(th) * t, y: g.HALF + Math.sin(th) * t, dn: dn });
      }
      drawArm(svg, pts, armCap, mark, 1, p.q, p, p.mk);
    }
  }

  function drawInnerArms(svg, p, g, clipId, field) {
    var grp = el("g", { "clip-path": "url(#" + clipId + ")" }, svg);
    var W = p.wi * Math.PI / 180;
    var PH = p.ph * Math.PI / 180;
    for (var i = 0; i < p.ai; i++) {
      var th0 = (2 * Math.PI * i) / p.ai + Math.PI / p.ai + PH;
      var pts = [];
      for (var n = 0; n < 90; n++) {
        var rem = (1 - p.ir) * Math.pow(p.qi, n);
        if (rem < 0.004) break;
        var rho = 1 - rem;
        var th = th0 + W * (1 - Math.pow(p.qi, n));
        var B = innerBoundary(Math.cos(th), Math.sin(th), p.b, g);
        pts.push({ x: g.HALF + Math.cos(th) * rho * B, y: g.HALF + Math.sin(th) * rho * B, dn: rem * B });
      }
      drawArm(grp, pts, p.im, field, p.is, p.q, p, p.mki);
    }
  }

  function build(raw) {
    var p = normalize(raw);
    var g = geom(p);
    var field = p.inv === "white" ? WHITE : RED;
    var mark = p.inv === "white" ? RED : WHITE;
    var clipId = "crossclip-" + (++uid);

    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("xmlns", NS);
    svg.setAttribute("viewBox", "0 0 " + S + " " + S);
    svg.setAttribute("width", "100%");

    /* Parameters travel inside the file, so an orphaned SVG still says what made it. */
    svg.appendChild(document.createComment(" Hyperhelvetica flag | " + encodeAll(p) + " "));
    el("title", {}, svg).textContent = "Hyperhelvetica flag";
    el("desc", {}, svg).textContent = "Parameters: " + encodeAll(p);
    el("metadata", {}, svg).textContent = JSON.stringify(p);

    rect(svg, 0, 0, S, S, field);
    drawOuterArms(svg, p, g, mark);
    rect(svg, g.HALF - g.ARM, g.HALF - g.TH, 2 * g.ARM, 2 * g.TH, mark);
    rect(svg, g.HALF - g.TH, g.HALF - g.ARM, 2 * g.TH, 2 * g.ARM, mark);

    var defs = el("defs", {}, svg);
    var clip = el("clipPath", { id: clipId }, defs);
    el("rect", { x: g.HALF - g.ARM, y: g.HALF - g.TH, width: 2 * g.ARM, height: 2 * g.TH }, clip);
    el("rect", { x: g.HALF - g.TH, y: g.HALF - g.ARM, width: 2 * g.TH, height: 2 * g.ARM }, clip);

    drawInnerArms(svg, p, g, clipId, field);
    return svg;
  }

  /* Standalone file: explicit pixel size instead of width="100%". */
  function serialize(raw) {
    var svg = build(raw);
    svg.setAttribute("width", S);
    svg.setAttribute("height", S);
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(svg);
  }

  function random(includeAdvanced) {
    var p = {};
    FIELDS.forEach(function (f) {
      if (f.advanced && !includeAdvanced) {
        p[f.key] = f.def;
      } else if (f.type === "enum") {
        p[f.key] = f.values[Math.floor(Math.random() * f.values.length)];
      } else {
        var steps = Math.round((f.max - f.min) / f.step);
        var u = Math.random();
        /* Arm counts run to 200. A uniform draw would put most shuffles in the dense
           end, where every flag resolves to the same ring; bias toward fewer arms so a
           shuffle actually varies. The whole range stays reachable. */
        if (f.key === "a" || f.key === "ai") u = u * u;
        var v = f.min + Math.round(u * steps) * f.step;
        p[f.key] = f.type === "int" ? Math.round(v) : parseFloat(v.toFixed(f.dp));
      }
    });
    p.inv = "red";          // stay Swiss by default; inverting is an explicit choice
    p.cs = DEFAULTS.cs;     // keep the cross itself recognisable
    p.ct = DEFAULTS.ct;
    if (p.mt < 0.12) p.mt = 0.12;
    return normalize(p);
  }

  global.HHFlag = {
    FIELDS: FIELDS, GROUPS: GROUPS, DEFAULTS: DEFAULTS, MARKS: MARKS, SIZE: S, RED: RED,
    normalize: normalize, encode: encode, encodeAll: encodeAll, decode: decode,
    slug: slug, format: format, isDefault: isDefault, visible: visible,
    panelFields: panelFields,
    build: build, serialize: serialize, random: random
  };
})(window);
