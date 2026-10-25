/* Builds the encrypted curriculum bundle for konrads.link/learn.

     LEARN_PASSPHRASE=… node tools/learn/build.mjs [--src <checkout of bootcamp-monorepo>]

   Without --src it fetches SOURCE.commit from GitHub (sparse: curriculum/ only). It renders every
   lesson in manifest.mjs to HTML, encrypts the lot with a key derived from LEARN_PASSPHRASE, and
   writes public/learn/data/ (gitignored):

     bundle.json      the lessons, sealed and gzipped
     a/<name>.bin     each image the lessons use, sealed separately so it loads on demand

   No plaintext lands in public/, so nothing readable reaches dist/ or GitHub Pages. With no
   passphrase set it writes nothing and exits cleanly; the page then says it isn't set up yet. */

import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { visitParents } from "unist-util-visit-parents";
import { toString } from "hast-util-to-string";
import GithubSlugger from "github-slugger";
import { createHighlighter } from "shiki";

import { deriveKeys, seal, sealJson, sha256hex } from "../../src/learn/crypto.js";
import { SOURCE, UNITS } from "./manifest.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const OUT = path.join(ROOT, "public/learn/data");
const MIN_PASSPHRASE = 12;

const STEP_HEADING =
  /step|instruction|what you need|to ?do|task|deliverable|artifact|steel thread|go deeper|exercise|activit|requirement|checklist|goal|pre-work|part \d|morning|afternoon|level|build|feature|pitch|present|practice|projects?$|before you start/i;

const IMAGE_TYPES = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml", ".webp": "image/webp" };

export async function build({ passphrase, src, out = OUT, units: unitList = UNITS, log = console.log }) {
  if (!passphrase) {
    log("learn: LEARN_PASSPHRASE is not set; skipping the encrypted bundle (/learn will say it isn't set up).");
    await rm(out, { recursive: true, force: true });
    return null;
  }
  if (passphrase.length < MIN_PASSPHRASE) {
    throw new Error(`learn: LEARN_PASSPHRASE must be at least ${MIN_PASSPHRASE} characters; use four or more random words.`);
  }

  const cleanup = [];
  if (!src) {
    src = await fetchSource();
    cleanup.push(src);
  }

  try {
    const keys = await deriveKeys(passphrase);
    const lessonFiles = new Map(); // repo path → lesson id, for rewriting links between lessons
    for (const u of unitList) for (const l of u.lessons) if (l.file) lessonFiles.set(l.file, l.id);

    const highlighter = await createHighlighter({ themes: ["github-light"], langs: [] });
    const assets = new Map(); // repo path → { name, type, bytes }

    const units = [];
    for (const unit of unitList) {
      const lessons = [];
      for (const lesson of unit.lessons) {
        const md = await lessonMarkdown(lesson, src);
        const rendered = await render(md, { lesson, src, lessonFiles, assets, highlighter });
        lessons.push({
          id: lesson.id,
          title: lesson.title,
          hours: lesson.hours,
          optional: lesson.optional || undefined,
          source: lesson.file || (lesson.files && lesson.files[0][0]) || undefined,
          ...rendered
        });
      }
      units.push({ id: unit.id, title: unit.title, summary: unit.summary, solo: unit.solo, track: unit.track || "path", lessons });
    }

    await rm(out, { recursive: true, force: true });
    await mkdir(path.join(out, "a"), { recursive: true });

    const assetIndex = {};
    for (const [repoPath, a] of assets) {
      const envelope = await seal(keys.content, "asset:" + a.key, a.bytes);
      const body = JSON.stringify(envelope);
      const name = (await sha256hex(new TextEncoder().encode(body))).slice(0, 20);
      await writeFile(path.join(out, "a", name + ".bin"), body);
      assetIndex[a.key] = { file: "a/" + name + ".bin", type: a.type, path: repoPath };
    }

    const bundle = { v: 1, builtAt: new Date().toISOString(), source: SOURCE, units, assets: assetIndex };
    const sealed = await sealJson(keys.content, "content", bundle, { gzip: true });
    await writeFile(path.join(out, "bundle.json"), JSON.stringify(sealed));

    const count = units.reduce((n, u) => n + u.lessons.length, 0);
    log(`learn: encrypted ${count} lessons and ${assets.size} images into public/learn/data/`);
    return bundle;
  } finally {
    for (const dir of cleanup) await rm(dir, { recursive: true, force: true });
  }
}

async function fetchSource() {
  const dir = await mkdtemp(path.join(tmpdir(), "learn-src-"));
  const git = (...args) => execFileSync("git", args, { cwd: dir, stdio: ["ignore", "ignore", "inherit"] });
  git("init", "-q");
  git("remote", "add", "origin", `https://github.com/${SOURCE.repo}.git`);
  git("sparse-checkout", "set", "curriculum");
  git("fetch", "-q", "--depth", "1", "--filter=blob:none", "origin", SOURCE.commit);
  git("checkout", "-q", "FETCH_HEAD");
  return dir;
}

async function lessonMarkdown(lesson, src) {
  if (lesson.app) return readFile(fileURLToPath(new URL(`./${lesson.app}.md`, import.meta.url)), "utf8");
  if (lesson.file) return readFile(path.join(src, lesson.file), "utf8");
  const parts = [];
  for (const [file, title] of lesson.files) parts.push(`## ${title}\n\n` + (await readFile(path.join(src, file), "utf8")));
  return parts.join("\n\n");
}

/* Sanitizing comes before our own changes, so the attributes we add (ids, data-*) survive and
   nothing in the source markdown can smuggle in scripts or event handlers. */
const schema = {
  ...defaultSchema,
  clobberPrefix: "",
  attributes: { ...defaultSchema.attributes, code: [...(defaultSchema.attributes.code || []), ["className", /^language-./]] }
};

async function render(md, ctx) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(md);
  let hast = await unified().use(remarkRehype, { allowDangerousHtml: true }).run(tree);
  hast = await unified().use(rehypeRaw).use(rehypeSanitize, schema).run(hast);
  const meta = await transform(hast, ctx);
  const html = unified().use(rehypeStringify).stringify(hast);
  return { html, ...meta };
}

async function transform(tree, { lesson, src, lessonFiles, assets, highlighter }) {
  const slugger = new GithubSlugger();
  const mode = lesson.check || "sections";
  const baseDir = lesson.file ? path.posix.dirname(lesson.file) : lesson.files ? path.posix.dirname(lesson.files[0][0]) : "";
  const ids = new Set();
  const uniq = (base) => {
    let id = base;
    for (let i = 2; ids.has(id); i++) id = base + "-" + i;
    ids.add(id);
    return id;
  };

  let hasH2 = false;
  visitParents(tree, "element", (n) => {
    if (n.tagName === "h2") hasH2 = true;
  });
  const sectionTag = hasH2 ? "h2" : "h3";

  const sections = [];
  const checks = [];
  let heading = "";
  const images = [];
  const codeBlocks = [];

  visitParents(tree, "element", (node, ancestors) => {
    const tag = node.tagName;

    if (/^h[1-6]$/.test(tag)) {
      const text = toString(node).trim();
      node.properties.id = slugger.slug(text);
      if (tag !== "h1") heading = text;
      if (tag === sectionTag && text) {
        const id = uniq(`${lesson.id}#${node.properties.id}`);
        node.properties.dataSec = id;
        sections.push({ id, title: text, anchor: node.properties.id });
      }
      return;
    }

    if (tag === "li") {
      const topLevel = !ancestors.some((a) => a.tagName === "li");
      const ownText = textWithoutSublists(node);
      const hasLink = ownLinks(node).length > 0;
      const wanted =
        (mode === "steps" && topLevel && STEP_HEADING.test(heading)) ||
        (mode === "steps-all" && topLevel) ||
        (mode === "links" && hasLink);
      /* GFM task items ("- [ ] …") always count, whatever the mode. */
      const task = node.children.some(isTaskBox) || node.children.some((c) => c.tagName === "p" && c.children.some(isTaskBox));
      if ((wanted || task) && ownText) {
        stripTaskBoxes(node);
        const id = uniq(`${lesson.id}:${createHash("sha256").update(norm(ownText)).digest("hex").slice(0, 8)}`);
        node.properties.className = [...(node.properties.className || []), "chk"];
        node.children.unshift({
          type: "element",
          tagName: "input",
          properties: { type: "checkbox", className: ["chk-box"], dataCheck: id, ariaLabel: "done" },
          children: []
        });
        checks.push(id);
      }
      return;
    }

    if (tag === "a") rewriteLink(node, { lesson, baseDir, lessonFiles });
    if (tag === "img") images.push(node);
    if (tag === "pre" && node.children[0] && node.children[0].tagName === "code") codeBlocks.push(node);
  });

  for (const img of images) await rewriteImage(img, { src, baseDir, assets });
  for (const pre of codeBlocks) await highlight(pre, highlighter);

  return { sections, checks };
}

const isTaskBox = (c) => c.type === "element" && c.tagName === "input" && c.properties.type === "checkbox";

function stripTaskBoxes(li) {
  li.children = li.children.filter((c) => !isTaskBox(c));
  for (const c of li.children) if (c.tagName === "p") c.children = c.children.filter((x) => !isTaskBox(x));
}

function textWithoutSublists(li) {
  const shallow = { ...li, children: li.children.filter((c) => c.tagName !== "ul" && c.tagName !== "ol") };
  return toString(shallow).replace(/\s+/g, " ").trim();
}

function ownLinks(li) {
  const out = [];
  const walk = (n) => {
    for (const c of n.children || []) {
      if (c.tagName === "ul" || c.tagName === "ol") continue;
      if (c.tagName === "a") out.push(c);
      walk(c);
    }
  };
  walk(li);
  return out;
}

const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 240);

function rewriteLink(a, { lesson, baseDir, lessonFiles }) {
  const href = String(a.properties.href || "");
  if (!href) return;
  if (/^(https?:|mailto:)/i.test(href)) {
    a.properties.target = "_blank";
    a.properties.rel = ["noopener", "noreferrer"];
    return;
  }
  if (href.startsWith("#")) {
    a.properties.href = `#/l/${lesson.id}/${href.slice(1)}`;
    return;
  }
  const [rel, hash = ""] = href.split("#");
  const repoPath = path.posix.normalize(path.posix.join(baseDir, decodeURI(rel)));
  const target = lessonFiles.get(repoPath);
  if (target) {
    a.properties.href = `#/l/${target}` + (hash ? "/" + hash : "");
    return;
  }
  a.properties.href = `https://github.com/${SOURCE.repo}/blob/${SOURCE.commit}/${encodeURI(repoPath)}` + (hash ? "#" + hash : "");
  a.properties.target = "_blank";
  a.properties.rel = ["noopener", "noreferrer"];
}

async function rewriteImage(img, { src, baseDir, assets }) {
  const s = String(img.properties.src || "");
  if (!s || /^(https?:|data:)/i.test(s)) return;
  const repoPath = path.posix.normalize(path.posix.join(baseDir, decodeURI(s.split("#")[0])));
  const type = IMAGE_TYPES[path.posix.extname(repoPath).toLowerCase()];
  let bytes;
  try {
    bytes = type && (await readFile(path.join(src, repoPath)));
  } catch {}
  if (!bytes) {
    img.properties.src = `https://raw.githubusercontent.com/${SOURCE.repo}/${SOURCE.commit}/${encodeURI(repoPath)}`;
    return;
  }
  if (!assets.has(repoPath)) assets.set(repoPath, { key: String(assets.size), type, bytes: new Uint8Array(bytes) });
  delete img.properties.src;
  img.properties.dataAsset = assets.get(repoPath).key;
  img.properties.loading = "lazy";
}

async function highlight(pre, highlighter) {
  const code = pre.children[0];
  const cls = (code.properties.className || []).find((c) => String(c).startsWith("language-"));
  const lang = cls ? String(cls).slice(9).toLowerCase() : "";
  if (!lang) return;
  try {
    await highlighter.loadLanguage(lang);
  } catch {
    return; // unknown language: leave it plain
  }
  const out = highlighter.codeToHast(toString(code).replace(/\n$/, ""), { lang, theme: "github-light" });
  const shikiPre = out.children[0];
  pre.properties = { ...shikiPre.properties, className: ["shiki"] };
  pre.children = shikiPre.children;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const i = process.argv.indexOf("--src");
  build({ passphrase: process.env.LEARN_PASSPHRASE, src: i > 0 ? process.argv[i + 1] : process.env.LEARN_SRC }).catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
