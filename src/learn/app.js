/* konrads.link/learn — the app. Everything below runs in the browser after unlocking; the
   curriculum and your data only exist decrypted in this page's memory. */

import { deriveKeys, open, openJson } from "./crypto.js";
import {
  emptyVault, merge, seal, unseal, readStored, writeStored, clearStored,
  rememberKeys, recallKeys, forgetKeys
} from "./vault.js";
import { syncOnce, deleteRemote } from "./sync.js";

/* The learn-sync Worker's address, printed by `wrangler deploy`. Empty means sync is off unless
   you paste an address in Settings (kept in this browser only). */
const DEFAULT_SYNC_URL = "";
const SYNC_URL_KEY = "learn.syncUrl";
const BUNDLE_URL = "/learn/data/bundle.json";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const now = () => Date.now();
const today = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

let encryptedBundle = null;
let bundle = null;
let keys = null;
let vault = null;
let remembered = false;
let lessons = new Map(); // id → { ...lesson, unit }
let pathOrder = []; // required path lessons in order
const assetUrls = new Map();

/* ---------- boot and unlock ---------- */

async function boot() {
  wireLockScreen();
  wireChrome();
  try {
    const res = await fetch(BUNDLE_URL, { cache: "no-cache" });
    if (res.status === 404) return showLock("missing");
    if (!res.ok) throw new Error(String(res.status));
    encryptedBundle = await res.json();
  } catch {
    return showLock("offline");
  }
  const saved = await recallKeys();
  if (saved && saved.content) {
    remembered = true;
    if (await tryKeys(saved)) return;
    await forgetKeys();
    remembered = false;
  }
  showLock();
}

function showLock(problem) {
  $("#app").hidden = true;
  $("#lock").hidden = false;
  $("#lock-form").hidden = !!problem;
  $("#lock-missing").hidden = problem !== "missing";
  $("#lock-offline").hidden = problem !== "offline";
  $("#lock-migrate").hidden = true;
  if (!problem) setTimeout(() => $("#pass").focus(), 0);
}

function wireLockScreen() {
  $("#lock-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const pass = $("#pass").value;
    if (!pass) return;
    const btn = $("#unlock-btn");
    btn.disabled = true;
    lockMsg("Deriving key…");
    try {
      const k = await deriveKeys(pass);
      remembered = $("#remember").checked;
      const ok = await tryKeys(k);
      if (!ok) lockMsg("That passphrase doesn't open this. Check for typos and try again.", true);
      else {
        $("#pass").value = "";
        if (remembered) await rememberKeys(k);
      }
    } finally {
      btn.disabled = false;
    }
  });

  $("#lock-migrate").addEventListener("submit", async (e) => {
    e.preventDefault();
    const old = await deriveKeys($("#old-pass").value);
    let v;
    try {
      v = await unseal(old, readStored());
    } catch {
      $("#migrate-msg").textContent = "That isn't the old passphrase either.";
      return;
    }
    $("#old-pass").value = "";
    /* Fold in anything only the sync server had under the old passphrase, re-encrypt under the
       new one, and once that's safely pushed, delete the old copy. */
    if (syncUrl()) {
      try {
        v = (await syncOnce(syncUrl(), old, v)).vault;
      } catch {}
    }
    vault = v;
    await persistNow();
    startApp();
    toast("Your progress now uses the new passphrase.");
    if (syncUrl()) {
      await runSync();
      if (syncState.status === "ok") await deleteRemote(syncUrl(), old).catch(() => {});
    }
  });
  $("#migrate-fresh").addEventListener("click", async () => {
    if (!confirm("Start with empty progress? The old encrypted data in this browser will be replaced.")) return;
    vault = emptyVault();
    await persistNow();
    startApp();
  });
}

function lockMsg(text, bad = false) {
  const m = $("#lock-msg");
  m.textContent = text;
  m.classList.toggle("bad", bad);
}

async function tryKeys(k) {
  try {
    bundle = await openJson(k.content, "content", encryptedBundle);
  } catch {
    return false;
  }
  keys = k;
  indexBundle();
  const stored = readStored();
  if (!stored) {
    vault = emptyVault();
    startApp();
    return true;
  }
  try {
    vault = await unseal(keys, stored);
  } catch {
    /* The bundle opened but the saved progress didn't: the passphrase was changed. */
    $("#lock-form").hidden = true;
    $("#lock-migrate").hidden = false;
    setTimeout(() => $("#old-pass").focus(), 0);
    return true;
  }
  startApp();
  return true;
}

function indexBundle() {
  lessons = new Map();
  pathOrder = [];
  for (const unit of bundle.units) {
    for (const l of unit.lessons) {
      const entry = { ...l, unit };
      lessons.set(l.id, entry);
      if (unit.track === "path" && !l.optional) pathOrder.push(entry);
    }
  }
}

function startApp() {
  $("#lock").hidden = true;
  $("#app").hidden = false;
  lockMsg("");
  route();
  tickTimer();
  scheduleSync(500);
}

async function lock() {
  await persistNow();
  await forgetKeys();
  keys = bundle = vault = null;
  remembered = false;
  for (const url of assetUrls.values()) URL.revokeObjectURL(url);
  assetUrls.clear();
  $("#view").innerHTML = "";
  showLock();
}

/* ---------- persistence ---------- */

let saveTimer = null;
let saving = Promise.resolve();

function change(fn) {
  fn(vault, now());
  clearTimeout(saveTimer);
  saveTimer = setTimeout(persistNow, 250);
  scheduleSync(4000);
}

function persistNow() {
  clearTimeout(saveTimer);
  if (!vault || !keys) return saving;
  const snapshot = vault;
  saving = saving.then(async () => {
    const ok = writeStored(await seal(keys, snapshot));
    if (!ok) toast("Couldn't save in this browser (storage blocked or full). Export a backup from Settings.", true);
  });
  return saving;
}

const syncUrl = () => {
  try {
    return localStorage.getItem(SYNC_URL_KEY) || DEFAULT_SYNC_URL;
  } catch {
    return DEFAULT_SYNC_URL;
  }
};

let syncTimer = null;
let syncState = { status: "off", at: 0, error: "" };

function scheduleSync(ms) {
  clearTimeout(syncTimer);
  if (!syncUrl()) return setSync({ status: "off" });
  syncTimer = setTimeout(runSync, ms);
}

async function runSync() {
  if (!keys || !vault || !syncUrl() || !navigator.onLine) return;
  setSync({ status: "syncing" });
  try {
    await saving;
    const before = vault;
    const { vault: merged } = await syncOnce(syncUrl(), keys, vault);
    /* Keep anything typed while the request was in flight. */
    vault = merge(merged, vault === before ? merged : vault);
    await persistNow();
    setSync({ status: "ok", at: now(), error: "" });
    if (!document.activeElement || !document.activeElement.matches("textarea, input")) rerenderSoft();
  } catch (err) {
    setSync({ status: "error", error: err.message || String(err) });
  }
}

function setSync(s) {
  syncState = { ...syncState, ...s };
  const dot = $("#sync-dot");
  if (dot) {
    dot.dataset.state = syncState.status;
    dot.title = { off: "Sync is off", syncing: "Syncing…", ok: "Synced", error: "Sync failed: " + syncState.error }[syncState.status];
  }
  if (location.hash.startsWith("#/settings")) renderSyncStatus();
}

/* ---------- derived progress ---------- */

const on = (map, id) => !!(vault[map][id] && vault[map][id].on);

function stats(l) {
  const total = l.checks.length + l.sections.length;
  const done = l.checks.filter((id) => on("checks", id)).length + l.sections.filter((s) => on("secs", s.id)).length;
  const explicit = vault.status[l.id] && !vault.status[l.id].del ? vault.status[l.id].s : null;
  const status = explicit || (total && done === total ? "done" : done ? "doing" : "todo");
  const frac = status === "done" ? 1 : total ? done / total : 0;
  return { total, done, status, frac };
}

function unitStats(unit, includeOptional = false) {
  const ls = unit.lessons.filter((l) => includeOptional || !l.optional);
  const hours = ls.reduce((h, l) => h + l.hours, 0) || 1;
  const doneHours = ls.reduce((h, l) => h + l.hours * stats(l).frac, 0);
  return { frac: doneHours / hours, done: ls.filter((l) => stats(l).status === "done").length, count: ls.length };
}

function nextSection(l) {
  return l.sections.find((s) => !on("secs", s.id)) || null;
}

function remainingMinutes(l) {
  return Math.max(5, Math.round(l.hours * 60 * (1 - stats(l).frac)));
}

const currentLesson = () => pathOrder.find((l) => stats(l).status !== "done") || null;

function minutesLogged(filter = () => true) {
  return Object.values(vault.sessions).filter((s) => !s.del && filter(s)).reduce((m, s) => m + (s.min || 0), 0);
}

function activeDays() {
  const days = new Set();
  for (const s of Object.values(vault.sessions)) if (!s.del && s.start) days.add(today(new Date(s.start)));
  for (const [d, j] of Object.entries(vault.journal)) if (!j.del && j.text) days.add(d);
  for (const m of ["checks", "secs"]) for (const c of Object.values(vault[m])) if (c.on && c.t) days.add(today(new Date(c.t)));
  return days;
}

function streak() {
  const days = activeDays();
  let n = 0;
  const d = new Date();
  if (!days.has(today(d))) d.setDate(d.getDate() - 1); // a streak survives until today ends
  while (days.has(today(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

const fmtMin = (m) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? " " + (m % 60) + " min" : ""}`);
const fmtHours = (h) => (h < 1 ? `${Math.round(h * 60)} min` : `${+h.toFixed(1)} h`);

/* ---------- routing ---------- */

function route() {
  if (!bundle || !vault) return;
  const parts = location.hash.replace(/^#\/?/, "").split("/");
  const view = parts[0] || "today";
  $$("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.view === (view === "l" ? lessonTrack(parts[1]) : view)));
  window.scrollTo(0, 0);
  if (view === "l" && lessons.has(parts[1])) return renderLesson(lessons.get(parts[1]), decodeURIComponent(parts.slice(2).join("/")));
  if (view === "path") return renderTrack("path");
  if (view === "practice") return renderTrack("practice");
  if (view === "journal") return renderJournal();
  if (view === "settings") return renderSettings();
  renderToday();
}

const lessonTrack = (id) => (lessons.has(id) && lessons.get(id).unit.track === "practice" ? "practice" : "path");

/* Re-render after a sync without losing the reader's place. */
function rerenderSoft() {
  const y = window.scrollY;
  route();
  window.scrollTo(0, y);
}

/* ---------- Today ---------- */

let budget = 60;

function renderToday() {
  const cur = currentLesson();
  const last = vault.meta.last && lessons.get(vault.meta.last.lesson);
  const reqDone = pathOrder.filter((l) => stats(l).status === "done").length;
  const pathHours = pathOrder.reduce((h, l) => h + l.hours, 0);
  const pathDone = pathOrder.reduce((h, l) => h + l.hours * stats(l).frac, 0);
  const week = minutesLogged((s) => s.start > now() - 7 * 864e5);
  const j = vault.journal[today()];

  $("#view").innerHTML = `
    <section class="hero">
      <p class="eyebrow">${esc(greeting())}</p>
      <h1>${cur ? "You're on " + esc(cur.unit.title.replace(/:.*/, "")) : "You finished the path"}</h1>
      <div class="bar big"><span style="width:${(100 * pathDone) / pathHours}%"></span></div>
      <p class="muted">${reqDone} of ${pathOrder.length} core lessons done · ${Math.round((100 * pathDone) / pathHours)}% of the path by estimated time</p>
      <div class="stats">
        <div><b>${streak()}</b><span>day streak</span></div>
        <div><b>${fmtMin(week)}</b><span>this week</span></div>
        <div><b>${fmtMin(minutesLogged())}</b><span>all time</span></div>
      </div>
    </section>

    ${last && last.id !== (cur && cur.id) && stats(last).status !== "done" ? continueCard(last, "Continue where you left off") : ""}
    ${cur ? continueCard(cur, last && last.id === cur.id ? "Continue where you left off" : "Up next") : ""}

    <section class="card">
      <h2>How much time do you have?</h2>
      <div class="chips" role="group" aria-label="Time available">
        ${[[25, "25 min"], [60, "1 hour"], [120, "2 hours"], [240, "Half a day"]].map(([m, label]) => `<button class="chip${m === budget ? " on" : ""}" data-budget="${m}">${label}</button>`).join("")}
      </div>
      <ul class="suggest">${suggestions(budget).map(suggestionItem).join("") || "<li>Nothing left to suggest. You've done it all.</li>"}</ul>
    </section>

    <section class="card">
      <h2>Today's note</h2>
      <p class="muted small">The bootcamp's end-of-day post: wins, blockers, links to what you shipped.</p>
      <textarea id="eod" rows="4" placeholder="Wins:&#10;Blockers:&#10;Links:">${esc(j && !j.del ? j.text : "")}</textarea>
    </section>
  `;

  $$(".chip[data-budget]").forEach((b) => b.addEventListener("click", () => { budget = +b.dataset.budget; renderToday(); }));
  bindText($("#eod"), (text, t) => (vault.journal[today()] = { text, t }));
}

function greeting() {
  const h = new Date().getHours();
  return h < 5 ? "Late night" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function continueCard(l, label) {
  const st = stats(l);
  const sec = nextSection(l);
  return `
    <a class="card continue" href="#/l/${l.id}${sec ? "/" + encodeURIComponent(sec.anchor) : ""}">
      <p class="eyebrow">${esc(label)}</p>
      <h2>${esc(l.title)}</h2>
      <p class="muted">${esc(l.unit.title)}${sec ? " · next: " + esc(sec.title) : ""} · about ${fmtMin(remainingMinutes(l))} left</p>
      <div class="bar"><span style="width:${100 * st.frac}%"></span></div>
    </a>`;
}

function suggestions(minutes) {
  const out = [];
  const cur = currentLesson();
  if (cur) {
    const left = remainingMinutes(cur);
    const sec = nextSection(cur);
    if (left <= minutes * 1.25 || !sec) out.push({ l: cur, what: left <= minutes * 1.25 ? "Finish this lesson" : "Keep going", est: Math.min(left, minutes) });
    else out.push({ l: cur, anchor: sec.anchor, what: `Next section: ${sec.title}`, est: Math.round((cur.hours * 60) / cur.sections.length) });

    if (left < minutes * 0.75) {
      const after = pathOrder[pathOrder.indexOf(cur) + 1];
      if (after && stats(after).status !== "done") out.push({ l: after, what: "Then start the next lesson", est: Math.min(remainingMinutes(after), minutes - left) });
    }
  }
  if (minutes <= 60) {
    const reading = nextReading();
    if (reading) out.push({ l: reading.l, check: reading.id, what: `Read: ${reading.text}`, est: 20 });
    const scales = bundle.units.find((u) => u.id === "scales");
    const scale = scales && scales.lessons.find((l) => l.id !== "scales-intro" && stats(l).status !== "done");
    if (scale) out.push({ l: lessons.get(scale.id), what: "Practice a scale", est: Math.min(45, remainingMinutes(scale)) });
  }
  return out.slice(0, 4);
}

/* The first unread item in the readings of the current or an earlier week. */
function nextReading() {
  const cur = currentLesson();
  const units = bundle.units.filter((u) => u.track === "path");
  const upto = cur ? units.indexOf(cur.unit) : units.length - 1;
  for (const unit of units.slice(0, upto + 1)) {
    for (const l of unit.lessons) {
      if (!/readings/.test(l.id) || l.optional) continue;
      const id = l.checks.find((c) => !on("checks", c));
      if (id) return { l: lessons.get(l.id), id, text: checkText(l, id) };
    }
  }
  return null;
}

function checkText(l, id) {
  const tpl = document.createElement("template");
  tpl.innerHTML = l.html;
  const box = tpl.content.querySelector(`[data-check="${CSS.escape(id)}"]`);
  const li = box && box.closest("li");
  if (!li) return "next reading";
  const copy = li.cloneNode(true);
  $$("ul,ol", copy).forEach((n) => n.remove());
  const text = copy.textContent.replace(/\s+/g, " ").trim();
  return text.length > 90 ? text.slice(0, 88) + "…" : text;
}

function suggestionItem(s) {
  const href = `#/l/${s.l.id}${s.anchor ? "/" + encodeURIComponent(s.anchor) : s.check ? "/@" + encodeURIComponent(s.check) : ""}`;
  return `<li><a href="${href}"><b>${esc(s.what)}</b><span class="muted">${esc(s.l.title)} · ~${fmtMin(s.est)}</span></a></li>`;
}

/* ---------- Path / Practice ---------- */

function renderTrack(track) {
  const units = bundle.units.filter((u) => u.track === track);
  const cur = currentLesson();
  $("#view").innerHTML = `
    <h1 class="page-title">${track === "path" ? "The path" : "Practice"}</h1>
    <p class="muted">${track === "path" ? "Ten weeks of bootcamp, in order. Optional lessons are extras you can skip." : "Drills and readings to dip into whenever you have a gap."}</p>
    ${units.map((u) => {
      const us = unitStats(u);
      const openUnit = cur && cur.unit.id === u.id;
      return `
      <details class="unit card" ${openUnit || track === "practice" ? "open" : ""}>
        <summary>
          <div class="unit-head">
            <h2>${esc(u.title)}</h2>
            <span class="muted small">${us.done}/${us.count} done</span>
          </div>
          <div class="bar"><span style="width:${100 * us.frac}%"></span></div>
          <p class="muted small">${esc(u.summary)}</p>
        </summary>
        ${u.solo ? `<p class="solo"><b>Doing this alone:</b> ${esc(u.solo)}</p>` : ""}
        <ol class="lessons">
          ${u.lessons.map((l) => {
            const st = stats(l);
            return `<li class="${st.status}${l.optional ? " optional" : ""}">
              <a href="#/l/${l.id}">
                <span class="dot" aria-hidden="true"></span>
                <span class="lt">${esc(l.title)}${l.optional ? ' <em class="tag">optional</em>' : ""}</span>
                <span class="muted small">${st.status === "doing" ? Math.round(st.frac * 100) + "% · " : ""}${fmtHours(l.hours)}</span>
              </a></li>`;
          }).join("")}
        </ol>
      </details>`;
    }).join("")}`;
}

/* ---------- Lesson ---------- */

function renderLesson(l, anchor) {
  if (!vault.meta.last || vault.meta.last.lesson !== l.id) change((v, t) => (v.meta.last = { lesson: l.id, t }));
  const st = stats(l);
  const all = bundle.units.flatMap((u) => u.lessons);
  const i = all.findIndex((x) => x.id === l.id);
  const prev = all[i - 1];
  const next = all[i + 1];
  const note = vault.notes[l.id];
  const link = vault.links[l.id];
  const timer = activeTimer();
  const src = l.source ? `https://github.com/${bundle.source.repo}/blob/${bundle.source.commit}/${l.source}` : "";

  $("#view").innerHTML = `
    <nav class="crumbs"><a href="#/${l.unit.track}">${esc(l.unit.title)}</a></nav>
    <header class="lesson-head">
      <h1>${esc(l.title)}</h1>
      <div class="lesson-meta">
        <select id="status" aria-label="Status">
          ${[["todo", "To do"], ["doing", "In progress"], ["done", "Done"]].map(([v, n]) => `<option value="${v}"${st.status === v ? " selected" : ""}>${n}</option>`).join("")}
        </select>
        <span class="muted small" id="lesson-progress"></span>
        <span class="muted small">~${fmtHours(l.hours)}</span>
        <button id="session-btn" class="btn ${timer && timer.lesson === l.id ? "stop" : ""}">${timer && timer.lesson === l.id ? "Stop session" : "Start session"}</button>
        ${l.sections.length ? `<button id="jump-btn" class="btn ghost">Jump to where I left off</button>` : ""}
      </div>
      <div class="bar"><span id="lesson-bar"></span></div>
    </header>
    <div class="lesson-layout">
      <article class="prose" id="lesson-body">${l.html}</article>
      <aside class="lesson-side">
        <div class="card">
          <h3>Your notes</h3>
          <textarea id="lesson-notes" rows="8" placeholder="What you learned, what confused you, questions for later…">${esc(note && !note.del ? note.text : "")}</textarea>
          <h3>Your repo or PR</h3>
          <input id="lesson-link" type="url" placeholder="https://github.com/…" value="${esc(link && !link.del ? link.url : "")}">
          ${link && link.url && !link.del ? `<p class="small"><a href="${esc(safeUrl(link.url))}" target="_blank" rel="noopener noreferrer">Open ↗</a></p>` : ""}
          <p class="muted small">Time on this lesson: ${fmtMin(minutesLogged((s) => s.lesson === l.id))}</p>
          ${src ? `<p class="small"><a href="${esc(src)}" target="_blank" rel="noopener noreferrer">Original on GitHub ↗</a></p>` : ""}
        </div>
      </aside>
    </div>
    <nav class="pager">
      ${prev ? `<a href="#/l/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}
      ${next ? `<a href="#/l/${next.id}">${esc(next.title)} →</a>` : "<span></span>"}
    </nav>`;

  const body = $("#lesson-body");
  wireChecks(l, body);
  wireSections(l, body);
  loadImages(body);
  updateLessonProgress(l);

  $("#status").addEventListener("change", (e) => {
    change((v, t) => (v.status[l.id] = { s: e.target.value, t }));
    updateLessonProgress(l);
  });
  $("#session-btn").addEventListener("click", () => {
    const tm = activeTimer();
    if (tm && tm.lesson === l.id) return stopTimer();
    if (tm) return toast("A session is already running on another lesson. Stop it first (top bar).", true);
    startTimer(l.id);
    renderLesson(l);
  });
  if ($("#jump-btn")) $("#jump-btn").addEventListener("click", () => {
    const sec = nextSection(l);
    if (sec) scrollToId(sec.anchor);
    else toast("Every section is done.");
  });
  bindText($("#lesson-notes"), (text, t) => (vault.notes[l.id] = { text, t }));
  bindText($("#lesson-link"), (url, t) => (vault.links[l.id] = { url: url.trim(), t }));

  if (anchor && anchor.startsWith("@")) {
    const box = body.querySelector(`[data-check="${CSS.escape(anchor.slice(1))}"]`);
    if (box) setTimeout(() => { box.closest("li").scrollIntoView({ block: "center" }); box.closest("li").classList.add("flash"); }, 0);
  } else if (anchor) setTimeout(() => scrollToId(anchor), 0);
}

const safeUrl = (u) => (/^https?:\/\//i.test(u) ? u : "#");

function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const wrap = target.closest(".sec-body");
  if (wrap) wrap.classList.add("show");
  target.scrollIntoView({ block: "start" });
}

function wireChecks(l, body) {
  for (const box of $$("input[data-check]", body)) {
    box.checked = on("checks", box.dataset.check);
    box.closest("li").classList.toggle("checked", box.checked);
    box.addEventListener("change", () => {
      const id = box.dataset.check;
      change((v, t) => (v.checks[id] = { on: box.checked, t }));
      box.closest("li").classList.toggle("checked", box.checked);
      afterTick(l);
    });
  }
}

/* Each section heading gets a ✓ toggle; a done section folds away so long tutorials show
   only what's left. */
function wireSections(l, body) {
  const heads = $$("[data-sec]", body);
  for (const h of heads) {
    const wrap = document.createElement("div");
    wrap.className = "sec-body";
    let n = h.nextSibling;
    while (n && !(n.nodeType === 1 && (n.hasAttribute("data-sec") || /^H[1-6]$/.test(n.tagName) && n.tagName <= h.tagName))) {
      const next = n.nextSibling;
      wrap.appendChild(n);
      n = next;
    }
    h.after(wrap);

    const btn = document.createElement("button");
    btn.className = "sec-toggle";
    btn.type = "button";
    const peek = document.createElement("button");
    peek.className = "sec-peek";
    peek.type = "button";
    peek.textContent = "show";
    peek.addEventListener("click", () => {
      wrap.classList.toggle("show");
      peek.textContent = wrap.classList.contains("show") ? "hide" : "show";
    });
    const paint = () => {
      const done = on("secs", h.dataset.sec);
      h.classList.toggle("sec-done", done);
      wrap.classList.toggle("done", done);
      btn.setAttribute("aria-pressed", String(done));
      btn.title = done ? "Section done (click to undo)" : "Mark section done";
      btn.textContent = done ? "✓ done" : "✓";
    };
    btn.addEventListener("click", () => {
      const id = h.dataset.sec;
      change((v, t) => (v.secs[id] = { on: !on("secs", id), t }));
      wrap.classList.remove("show");
      peek.textContent = "show";
      paint();
      afterTick(l);
    });
    h.prepend(btn);
    h.append(peek);
    paint();
  }
}

function afterTick(l) {
  const { total, done } = stats(l);
  const s = vault.status[l.id];
  const explicit = s && !s.del ? s.s : null;
  if (total && done === total && explicit !== "done") {
    change((v, t) => (v.status[l.id] = { s: "done", t }));
    toast(`Lesson complete: ${l.title}`);
  } else if (done < total && explicit === "done") change((v, t) => (v.status[l.id] = { s: "doing", t }));
  else if (done && (!explicit || explicit === "todo")) change((v, t) => (v.status[l.id] = { s: "doing", t }));
  updateLessonProgress(l);
}

function updateLessonProgress(l) {
  const st = stats(l);
  if ($("#lesson-bar")) $("#lesson-bar").style.width = 100 * st.frac + "%";
  if ($("#lesson-progress")) $("#lesson-progress").textContent = st.total ? `${st.done}/${st.total} ticked` : "";
  if ($("#status")) $("#status").value = st.status;
}

async function loadImages(root) {
  for (const img of $$("img[data-asset]", root)) {
    const key = img.dataset.asset;
    const meta = bundle.assets[key];
    if (!meta) continue;
    try {
      if (!assetUrls.has(key)) {
        const env = await (await fetch("/learn/data/" + meta.file)).json();
        const bytes = await open(keys.content, "asset:" + key, env);
        assetUrls.set(key, URL.createObjectURL(new Blob([bytes], { type: meta.type })));
      }
      img.src = assetUrls.get(key);
    } catch {
      img.alt = (img.alt || "image") + " (couldn't load)";
    }
  }
}

/* ---------- sessions (timer) ---------- */

const activeTimer = () => {
  const tm = vault && vault.meta.timer;
  return tm && !tm.del ? tm : null;
};

function startTimer(lesson) {
  change((v, t) => (v.meta.timer = { lesson, start: t, t }));
  tickTimer();
}

function stopTimer() {
  const tm = activeTimer();
  if (!tm) return;
  const dlg = $("#stop-dialog");
  const mins = Math.max(1, Math.round((now() - tm.start) / 60000));
  $("#stop-min").value = mins;
  $("#stop-note").value = "";
  $("#stop-lesson").textContent = (lessons.get(tm.lesson) || { title: tm.lesson }).title;
  $("#stop-long").hidden = mins < 240;
  dlg.showModal();
}

function wireChrome() {
  window.addEventListener("hashchange", route);
  $("#lock-btn").addEventListener("click", lock);
  $("#timer-pill").addEventListener("click", stopTimer);

  $("#stop-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const tm = activeTimer();
    if (e.submitter && e.submitter.value === "discard") {
      change((v, t) => (v.meta.timer = { del: 1, t }));
    } else if (e.submitter && e.submitter.value === "save" && tm) {
      const min = Math.max(1, Math.min(24 * 60, Math.round(+$("#stop-min").value || 1)));
      const note = $("#stop-note").value.trim();
      const id = tm.start.toString(36) + Math.random().toString(36).slice(2, 6);
      change((v, t) => {
        v.sessions[id] = { lesson: tm.lesson, start: tm.start, min, note, t };
        v.meta.timer = { del: 1, t };
      });
      toast(`Logged ${fmtMin(min)}.`);
    }
    $("#stop-dialog").close();
    tickTimer();
    rerenderSoft();
  });

  /* Auto-lock after inactivity, unless this device is remembered. */
  let lastActive = now();
  for (const ev of ["pointerdown", "keydown", "scroll", "touchstart"]) addEventListener(ev, () => (lastActive = now()), { passive: true });
  setInterval(() => {
    if (!keys || remembered) return;
    const p = vault && vault.meta.prefs;
    const limit = ((p && p.autoLock) || 30) * 60000;
    if (limit > 0 && now() - lastActive > limit && !$("#stop-dialog").open) lock();
  }, 30000);

  setInterval(tickTimer, 1000);
  setInterval(() => document.visibilityState === "visible" && scheduleSync(0), 120000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") persistNow();
    else scheduleSync(0);
  });
  addEventListener("online", () => scheduleSync(0));
  addEventListener("pagehide", () => persistNow());
}

function tickTimer() {
  const pill = $("#timer-pill");
  const tm = activeTimer();
  pill.hidden = !tm;
  if (!tm) return;
  const s = Math.floor((now() - tm.start) / 1000);
  const hh = Math.floor(s / 3600);
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  pill.textContent = `● ${hh ? hh + ":" : ""}${mm}:${ss}  stop`;
  pill.title = "Session on " + (lessons.get(tm.lesson) || { title: tm.lesson }).title;
}

/* ---------- Journal ---------- */

function renderJournal() {
  const days = new Map();
  const add = (d) => days.get(d) || days.set(d, { sessions: [], note: null }).get(d);
  for (const [id, s] of Object.entries(vault.sessions)) if (!s.del) add(today(new Date(s.start))).sessions.push({ id, ...s });
  for (const [d, j] of Object.entries(vault.journal)) if (!j.del && j.text) add(d).note = j.text;
  const sorted = [...days.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));

  $("#view").innerHTML = `
    <h1 class="page-title">Journal</h1>
    <p class="muted">Every session and end-of-day note. ${fmtMin(minutesLogged())} logged over ${activeDays().size} active days.</p>
    <form id="manual" class="card manual">
      <h2>Log time by hand</h2>
      <div class="row">
        <select id="m-lesson" aria-label="Lesson">${bundle.units.map((u) => `<optgroup label="${esc(u.title)}">${u.lessons.map((l) => `<option value="${l.id}"${vault.meta.last && vault.meta.last.lesson === l.id ? " selected" : ""}>${esc(l.title)}</option>`).join("")}</optgroup>`).join("")}</select>
        <input id="m-date" type="date" value="${today()}" aria-label="Date">
        <input id="m-min" type="number" min="1" max="1440" value="30" aria-label="Minutes"> <span class="muted small">min</span>
      </div>
      <input id="m-note" type="text" placeholder="What you did (optional)">
      <button class="btn">Add</button>
    </form>
    ${sorted.length ? sorted.map(([d, e]) => `
      <section class="card day">
        <h2>${esc(new Date(d + "T12:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }))}
          <span class="muted small">${fmtMin(e.sessions.reduce((m, s) => m + s.min, 0))}</span></h2>
        ${e.note ? `<p class="eod">${esc(e.note)}</p>` : ""}
        <ul class="sessions">${e.sessions.sort((a, b) => a.start - b.start).map((s) => `
          <li><a href="#/l/${esc(s.lesson)}">${esc((lessons.get(s.lesson) || { title: s.lesson }).title)}</a>
            <span class="muted small">${fmtMin(s.min)}</span>
            <button class="link-btn small" data-del="${esc(s.id)}">remove</button>
            ${s.note ? `<div>${esc(s.note)}</div>` : ""}</li>`).join("")}</ul>
      </section>`).join("") : `<p class="card muted">Nothing yet. Start a session from any lesson, or write today's note on the Today page.</p>`}`;

  $("#manual").addEventListener("submit", (e) => {
    e.preventDefault();
    const start = new Date($("#m-date").value + "T12:00").getTime() || now();
    const min = Math.max(1, Math.min(1440, Math.round(+$("#m-min").value || 0)));
    const id = start.toString(36) + Math.random().toString(36).slice(2, 6);
    change((v, t) => (v.sessions[id] = { lesson: $("#m-lesson").value, start, min, note: $("#m-note").value.trim(), t }));
    renderJournal();
  });
  $$("[data-del]").forEach((b) => b.addEventListener("click", () => {
    if (!confirm("Remove this session?")) return;
    change((v, t) => (v.sessions[b.dataset.del] = { del: 1, t }));
    renderJournal();
  }));
}

/* ---------- Settings ---------- */

function renderSettings() {
  const p = vault.meta.prefs || {};
  $("#view").innerHTML = `
    <h1 class="page-title">Settings</h1>

    <section class="card">
      <h2>Get help from Claude</h2>
      <p class="muted">Copies a plain-text summary of where you are (current lesson, unchecked steps, your notes and recent journal) so you can paste it into a chat with Claude. It's decrypted, so paste it only where you'd paste your notes.</p>
      <button id="copy-claude" class="btn">Copy progress for Claude</button>
    </section>

    <section class="card">
      <h2>Sync between devices</h2>
      <p id="sync-status" class="muted"></p>
      <label class="field">Sync server
        <input id="sync-url" type="url" placeholder="https://learn-sync.<you>.workers.dev" value="${esc(syncUrl())}">
      </label>
      <p class="muted small">The learn-sync Worker stores only ciphertext. Leave empty to keep everything in this browser. The address is saved in this browser only.</p>
      <div class="row"><button id="sync-save" class="btn">Save and sync now</button></div>
    </section>

    <section class="card">
      <h2>Backup</h2>
      <p class="muted">An encrypted file with all your progress. Importing merges it with what's here, so nothing is lost.</p>
      <div class="row">
        <button id="export" class="btn">Export encrypted backup</button>
        <label class="btn ghost">Import backup<input id="import" type="file" accept="application/json,.json" hidden></label>
      </div>
    </section>

    <section class="card">
      <h2>Security</h2>
      <label class="field">Lock automatically after
        <select id="autolock">${[[15, "15 minutes"], [30, "30 minutes"], [60, "1 hour"], [240, "4 hours"]].map(([m, n]) => `<option value="${m}"${(p.autoLock || 30) === m ? " selected" : ""}>${n}</option>`).join("")}</select>
      </label>
      <p class="muted small">${remembered ? "This device is remembered, so it won't auto-lock. Lock to forget it." : "Applies when this device isn't remembered."}</p>
      <div class="row"><button id="lock2" class="btn">Lock now${remembered ? " and forget this device" : ""}</button></div>
      <details class="small">
        <summary>Changing the passphrase</summary>
        <p>The passphrase lives in the <code>LEARN_PASSPHRASE</code> secret of the site's GitHub repo. Change it there and redeploy. The next time you unlock with the new passphrase, the app asks for the old one once and re-encrypts your progress.${syncUrl() ? " Your synced copy then moves to a new, unlinkable spot on the sync server and the old one is deleted." : ""}</p>
      </details>
    </section>

    <section class="card danger">
      <h2>Reset</h2>
      <p class="muted">Erase all progress, notes and journal on this device${syncUrl() ? " and the sync server" : ""}.</p>
      <button id="reset" class="btn warn">Erase everything</button>
    </section>

    <p class="muted small about">Curriculum: <a href="https://github.com/${esc(bundle.source.repo)}/tree/${esc(bundle.source.commit)}/curriculum" target="_blank" rel="noopener noreferrer">${esc(bundle.source.repo)}</a> at ${esc(bundle.source.commit.slice(0, 7))} · bundle built ${esc(new Date(bundle.builtAt).toLocaleString())}</p>`;

  renderSyncStatus();
  $("#copy-claude").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(summaryForClaude());
      toast("Copied. Paste it into Claude.");
    } catch {
      const w = window.open("", "_blank");
      if (w) w.document.body.innerText = summaryForClaude();
    }
  });
  $("#sync-save").addEventListener("click", async () => {
    const url = $("#sync-url").value.trim().replace(/\/+$/, "");
    if (url && !/^https:\/\//.test(url) && !/^http:\/\/(localhost|127\.0\.0\.1)/.test(url)) return toast("The sync address must start with https://", true);
    try {
      if (url) localStorage.setItem(SYNC_URL_KEY, url);
      else localStorage.removeItem(SYNC_URL_KEY);
    } catch {}
    scheduleSync(0);
  });
  $("#export").addEventListener("click", exportBackup);
  $("#import").addEventListener("change", (e) => importBackup(e.target.files[0]));
  $("#autolock").addEventListener("change", (e) => change((v, t) => (v.meta.prefs = { ...(v.meta.prefs || {}), autoLock: +e.target.value, t })));
  $("#lock2").addEventListener("click", lock);
  $("#reset").addEventListener("click", async () => {
    if (prompt('Type "erase" to delete all your progress.') !== "erase") return;
    if (syncUrl()) await deleteRemote(syncUrl(), keys).catch(() => {});
    vault = emptyVault();
    clearStored();
    await persistNow();
    toast("Erased.");
    location.hash = "#/";
  });
}

function renderSyncStatus() {
  const el = $("#sync-status");
  if (!el) return;
  el.textContent = {
    off: "Sync is off. Your progress lives in this browser.",
    syncing: "Syncing…",
    ok: `Synced ${new Date(syncState.at).toLocaleTimeString()}.`,
    error: `Sync failed: ${syncState.error}. Your progress is still saved in this browser.`
  }[syncState.status];
}

async function exportBackup() {
  await persistNow();
  const file = { kind: "konrads-learn-backup", v: 1, exportedAt: new Date().toISOString(), vault: readStored() || (await seal(keys, vault)) };
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(file)], { type: "application/json" }));
  a.download = `learn-backup-${today()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

async function importBackup(f) {
  if (!f) return;
  try {
    const file = JSON.parse(await f.text());
    if (file.kind !== "konrads-learn-backup") throw new Error("not a backup file");
    const incoming = await unseal(keys, file.vault);
    vault = merge(vault, incoming);
    await persistNow();
    scheduleSync(0);
    toast("Backup merged in.");
  } catch (err) {
    toast(/backup file/.test(err.message) ? "That isn't a backup file from this app." : "Couldn't open that backup; it was made with a different passphrase.", true);
  }
}

function summaryForClaude() {
  const cur = currentLesson();
  const last = vault.meta.last && lessons.get(vault.meta.last.lesson);
  const focus = last && stats(last).status !== "done" ? last : cur;
  const src = (l) => (l.source ? `https://github.com/${bundle.source.repo}/blob/${bundle.source.commit}/${l.source}` : "");
  const lines = [];
  lines.push("# My progress through the Fractal Bootcamp curriculum (self-paced, solo)");
  lines.push(`Curriculum: https://github.com/${bundle.source.repo}/tree/${bundle.source.commit}/curriculum`);
  const done = pathOrder.filter((l) => stats(l).status === "done");
  lines.push(`Core lessons done: ${done.length}/${pathOrder.length}. Time logged: ${fmtMin(minutesLogged())} over ${activeDays().size} days. Streak: ${streak()} days.`);
  if (focus) {
    const st = stats(focus);
    lines.push("", `## Current lesson: ${focus.unit.title} › ${focus.title}`);
    lines.push(`Status: ${st.status}, ${Math.round(st.frac * 100)}% ticked. Source: ${src(focus)}`);
    const sec = nextSection(focus);
    if (sec) lines.push(`Next section: ${sec.title}`);
    const open = focus.checks.filter((c) => !on("checks", c));
    if (open.length) {
      lines.push("Steps not yet done:");
      for (const c of open.slice(0, 15)) lines.push(`- ${checkText(focus, c)}`);
    }
    const n = vault.notes[focus.id];
    if (n && !n.del && n.text) lines.push("", "My notes on it:", n.text);
    const lk = vault.links[focus.id];
    if (lk && !lk.del && lk.url) lines.push(`My repo/PR: ${lk.url}`);
  }
  if (done.length) lines.push("", "## Done", ...done.map((l) => `- ${l.unit.title} › ${l.title}`));
  const recent = [];
  for (const [d, j] of Object.entries(vault.journal)) if (!j.del && j.text) recent.push([d, "Note: " + j.text]);
  for (const s of Object.values(vault.sessions)) if (!s.del) recent.push([today(new Date(s.start)), `${fmtMin(s.min)} on ${(lessons.get(s.lesson) || { title: s.lesson }).title}${s.note ? ": " + s.note : ""}`]);
  recent.sort((a, b) => (a[0] < b[0] ? 1 : -1));
  if (recent.length) lines.push("", "## Recent journal", ...recent.slice(0, 10).map(([d, t]) => `- ${d}: ${t.replace(/\n+/g, " / ")}`));
  lines.push("", "Please help me with my next step. Explain, but let me write the code myself.");
  return lines.join("\n");
}

/* ---------- small helpers ---------- */

function bindText(el, set) {
  el.addEventListener("input", () => change((v, t) => set(el.value, t)));
}

let toastTimer = null;
function toast(text, bad = false) {
  const t = $("#toast");
  t.textContent = text;
  t.classList.toggle("bad", bad);
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.hidden = true), 3500);
}

boot();
