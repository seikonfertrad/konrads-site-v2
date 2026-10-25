/* The crypto, the vault merge, and the bundle build, against a small fixture curriculum. */
import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { deriveKeys, seal, open, sealJson, openJson } from "../../../src/learn/crypto.js";
import { emptyVault, merge, sameVault } from "../../../src/learn/vault.js";
import { build } from "../build.mjs";

const PASS = "correct horse battery staple";

describe("crypto", () => {
  let keys;
  before(async () => (keys = await deriveKeys(PASS)));

  test("keys are deterministic per passphrase and differ between passphrases", async () => {
    const again = await deriveKeys(PASS);
    assert.equal(again.syncId, keys.syncId);
    assert.equal(again.syncToken, keys.syncToken);
    assert.match(keys.syncId, /^[0-9a-f]{32}$/);
    assert.match(keys.syncToken, /^[A-Za-z0-9_-]{43}$/);
    const other = await deriveKeys(PASS + "!");
    assert.notEqual(other.syncId, keys.syncId);
  });

  test("a sealed value opens with the right key and purpose only", async () => {
    const env = await seal(keys.content, "asset:1", new TextEncoder().encode("hello"));
    assert.equal(new TextDecoder().decode(await open(keys.content, "asset:1", env)), "hello");
    await assert.rejects(open(keys.content, "asset:2", env), "purpose is bound");
    await assert.rejects(open(keys.vault, "asset:1", env), "the vault key is a different key");
    const tampered = { ...env, ct: env.ct.slice(0, -4) + (env.ct.endsWith("AAAA") ? "BBBB" : "AAAA") };
    await assert.rejects(open(keys.content, "asset:1", tampered));
  });

  test("JSON round-trips, gzipped or not, and the CryptoKeys can't be exported", async () => {
    const value = { a: [1, 2, 3], s: "ü".repeat(1000) };
    assert.deepEqual(await openJson(keys.vault, "vault", await sealJson(keys.vault, "vault", value)), value);
    const gz = await sealJson(keys.vault, "vault", value, { gzip: true });
    assert.equal(gz.gz, true);
    assert.deepEqual(await openJson(keys.vault, "vault", gz), value);
    assert.equal(keys.content.extractable, false);
    assert.equal(keys.vault.extractable, false);
  });
});

describe("vault merge", () => {
  test("newest entry wins, per key, and tombstones merge like edits", () => {
    const a = emptyVault();
    const b = emptyVault();
    a.checks.x = { on: true, t: 1 };
    b.checks.x = { on: false, t: 2 };
    a.checks.y = { on: true, t: 5 };
    b.notes.l = { text: "b", t: 3 };
    a.sessions.s = { lesson: "l", min: 5, t: 1 };
    b.sessions.s = { del: 1, t: 4 };
    const m = merge(a, b);
    assert.deepEqual(m.checks, { x: { on: false, t: 2 }, y: { on: true, t: 5 } });
    assert.equal(m.notes.l.text, "b");
    assert.equal(m.sessions.s.del, 1);
    assert.ok(sameVault(merge(a, b), merge(b, a)), "merge is order-independent");
    assert.ok(sameVault(merge(m, m), m), "and idempotent");
  });
});

describe("build", () => {
  let src;
  let out;
  let tmp;

  const units = [
    {
      id: "u1",
      title: "Unit one",
      summary: "s",
      lessons: [
        { id: "a", title: "Assignment", file: "curriculum/w/assignment.md", check: "steps", hours: 2 },
        { id: "r", title: "Readings", file: "curriculum/w/readings.md", check: "links", hours: 1 }
      ]
    }
  ];

  before(async () => {
    tmp = await mkdtemp(path.join(tmpdir(), "learn-test-"));
    src = path.join(tmp, "src");
    out = path.join(tmp, "out");
    await mkdir(path.join(src, "curriculum/w"), { recursive: true });
    await writeFile(
      path.join(src, "curriculum/w/assignment.md"),
      [
        "# Tic Tac Toe",
        "## Overview",
        "- not a step",
        "## Steps (Morning)",
        "- Fork the repo",
        "  - a hint, not a step",
        "- Run `bun test`",
        "- [ ] a task item",
        "## Diagram",
        "![diagram](./diagram.png)",
        "",
        'See [the readings](readings.md#tuesday), [above](#overview) and [the code](./example/main.ts).',
        "",
        "<script>alert('x')</script><img src=x onerror=alert(1)>",
        "",
        "```ts",
        "const secretPhrase: string = 'zebra-unicorn';",
        "```"
      ].join("\n")
    );
    await writeFile(path.join(src, "curriculum/w/readings.md"), "## Tuesday\n\n- [Speed matters](https://example.com/speed)\n- plain item\n");
    await writeFile(path.join(src, "curriculum/w/diagram.png"), Buffer.from("89504e470d0a1a0a00000000", "hex"));
  });
  after(() => rm(tmp, { recursive: true, force: true }));

  test("without a passphrase it writes nothing", async () => {
    const res = await build({ passphrase: "", src, out, units, log: () => {} });
    assert.equal(res, null);
    await assert.rejects(readdir(out));
  });

  test("a short passphrase is refused", async () => {
    await assert.rejects(build({ passphrase: "short", src, out, units, log: () => {} }), /at least 12/);
  });

  test("renders, marks checkboxes and sections, rewrites links, sanitizes, and encrypts", async () => {
    await build({ passphrase: PASS, src, out, units, log: () => {} });
    const raw = await readFile(path.join(out, "bundle.json"), "utf8");
    assert.doesNotMatch(raw, /Tic Tac Toe|zebra-unicorn|Fork the repo/, "no plaintext on disk");
    const files = await readdir(path.join(out, "a"));
    assert.equal(files.length, 1);

    const keys = await deriveKeys(PASS);
    const bundle = await openJson(keys.content, "content", JSON.parse(raw));
    const [a, r] = bundle.units[0].lessons;

    assert.equal(a.checks.length, 3, "two steps + the task item; not the overview bullet or the hint");
    assert.deepEqual(a.sections.map((s) => s.title), ["Overview", "Steps (Morning)", "Diagram"]);
    assert.match(a.html, /<h2 id="steps-morning" data-sec="a#steps-morning">/);
    assert.doesNotMatch(a.html, /<script|onerror/);
    assert.match(a.html, /href="#\/l\/r\/tuesday"/);
    assert.match(a.html, /href="#\/l\/a\/overview"/);
    assert.match(a.html, /href="https:\/\/github\.com\/fractal-nyc\/bootcamp-monorepo\/blob\/[0-9a-f]{40}\/curriculum\/w\/example\/main\.ts"/);
    assert.match(a.html, /<img[^>]*data-asset="0"/);
    assert.match(a.html, /class="shiki"/);
    assert.equal(r.checks.length, 1, "only the item with a link");
    assert.match(r.html, /target="_blank" rel="noopener noreferrer"/);

    const asset = JSON.parse(await readFile(path.join(out, bundle.assets["0"].file), "utf8"));
    const png = await open(keys.content, "asset:0", asset);
    assert.equal(Buffer.from(png).toString("hex"), "89504e470d0a1a0a00000000");

    /* Checkbox ids come from the text, so a rebuild keeps your ticks attached. */
    await build({ passphrase: PASS, src, out, units, log: () => {} });
    const again = await openJson(keys.content, "content", JSON.parse(await readFile(path.join(out, "bundle.json"), "utf8")));
    assert.deepEqual(again.units[0].lessons[0].checks, a.checks);
  });
});
