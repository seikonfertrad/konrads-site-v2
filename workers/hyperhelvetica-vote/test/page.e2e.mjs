/* End-to-end: the static vote page from konrads-site-v2/public, served locally, talking to
   the Worker under wrangler dev. The page picks http://127.0.0.1:8787 as its API when it
   is loaded from localhost. Run after `node publish-vote.mjs` in hyperhelvetica/flag.
   Set SHOTS=<dir> to keep screenshots. */
import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { readdirSync, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { startWorker, resetState } from "./harness.mjs";

const PUBLIC = fileURLToPath(new URL("../../../public/", import.meta.url));
const SITE = "http://localhost:4321";
const PAGE = SITE + "/Hyperhelvetica/";
/* The same local server under a hostname that is not localhost, so the page takes its production API. */
const PUBLIC_PAGE = "http://konrads.test:4321/Hyperhelvetica/";
const API = "http://127.0.0.1:8787";
const SHOTS = process.env.SHOTS ? process.env.SHOTS.replace(/\/?$/, "/") : null;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css",
  ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json"
};

function findChromium() {
  const cache = homedir() + "/Library/Caches/ms-playwright/";
  for (const d of readdirSync(cache).filter((d) => d.startsWith("chromium_headless_shell-")).sort().reverse()) {
    const bin = `${cache}${d}/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
    if (existsSync(bin)) return bin;
  }
  throw new Error("no Playwright headless shell under " + cache);
}

function serve(root, port) {
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, SITE).pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = normalize(join(root, path));
    if (!file.startsWith(root)) return res.writeHead(403).end();
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" }).end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

const visibleVoteButtons = (page) => page.locator("#ballot button.vote:visible").count();

/* A loaded image can still be undecoded when the capture runs (the page uses
   decoding="async"), which leaves a blank card in the screenshot. Decode everything first. */
async function shoot(page, name) {
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 10000 });
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
  await page.screenshot({ path: SHOTS + name, fullPage: true });
}
const cors = { "access-control-allow-origin": SITE };

describe("vote page", () => {
  let worker, server, browser;
  const errors = [];

  before(async () => {
    await resetState();
    worker = await startWorker({ port: 8787 });
    server = await serve(PUBLIC, 4321);
    browser = await chromium.launch({
      executablePath: findChromium(),
      args: ["--host-resolver-rules=MAP konrads.test 127.0.0.1"]
    });
  });
  after(async () => {
    await browser?.close();
    server?.close();
    await worker?.stop();
  });

  async function open(context, url = PAGE) {
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(`${url}: ${e}`));
    page.on("console", (m) => {
      /* Refused or aborted requests log "Failed to load resource"; the mocked error tests cause those on purpose. */
      if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(`${url}: ${m.text()}`);
    });
    await page.goto(url);
    return page;
  }

  test("a new visitor sees four designs, every image loaded, and no results", async () => {
    const ctx = await browser.newContext();
    const page = await open(ctx);
    await page.waitForFunction(() => {
      const imgs = [...document.querySelectorAll("#ballot .card img")];
      return imgs.length === 4 && imgs.every((i) => i.complete && i.naturalWidth > 0);
    }, null, { timeout: 10000 });
    const ids = await page.$$eval("#ballot .card", (cs) => cs.map((c) => c.dataset.design).sort().join(""));
    assert.equal(ids, "ABCD");
    assert.equal(await page.isHidden("#results"), true);
    assert.equal(await visibleVoteButtons(page), 4);
    if (SHOTS) await shoot(page, "desktop-ballot.png");
    await ctx.close();
  });

  test("the card order varies between visits", async () => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const orders = new Set();
    for (let i = 0; i < 8; i++) {
      await page.goto(PAGE);
      orders.add(await page.$$eval("#ballot .card", (cs) => cs.map((c) => c.dataset.design).join("")));
    }
    assert.ok(orders.size > 1, `same order on 8 loads: ${[...orders]}`);
    await ctx.close();
  });

  test("the colour switch swaps the image and the tool link", async () => {
    const ctx = await browser.newContext();
    const page = await open(ctx);
    const card = page.locator('#ballot .card[data-design="C"]');
    assert.match(await card.locator("img").getAttribute("src"), /cards\/C-red\.webp$/);
    assert.equal(await card.locator('[data-colour="red"]').getAttribute("aria-pressed"), "true");
    await card.locator('[data-colour="white"]').click();
    assert.match(await card.locator("img").getAttribute("src"), /cards\/C-white\.webp$/);
    assert.equal(await card.locator('[data-colour="white"]').getAttribute("aria-pressed"), "true");
    assert.equal(await card.locator('[data-colour="red"]').getAttribute("aria-pressed"), "false");
    const link = card.locator("a.open-tool");
    const href = await link.getAttribute("href");
    assert.match(href, /^tool\/#a=5&.*inv=white$/);
    assert.doesNotMatch(href, /advanced/);
    assert.equal(await link.getAttribute("target"), "_blank");
    assert.match(await link.getAttribute("rel"), /noopener/);
    await ctx.close();
  });

  test("voting counts the design and colour on screen, then shows results", async () => {
    const ctx = await browser.newContext();
    const page = await open(ctx);
    const card = page.locator('#ballot .card[data-design="B"]');
    await card.locator('[data-colour="white"]').click();
    await card.locator("button.vote").click();
    await page.waitForSelector("#results:not([hidden])");
    assert.match(await page.textContent("#your-vote"), /\bB\b.*\bwhite\b/i);
    assert.match(await page.textContent("#total"), /\b1 vote\b/);
    assert.equal(await page.getAttribute('#results [data-result="B"]', "data-count"), "1");
    assert.equal(await page.getAttribute('#results [data-result="A"]', "data-count"), "0");
    assert.equal(await page.getAttribute('#results [data-colour-result="white"]', "data-count"), "1");
    assert.equal(await visibleVoteButtons(page), 0);
    assert.ok(await page.isVisible("#design-own"));
    assert.equal(await page.getAttribute("#design-own", "href"), "tool/");
    if (SHOTS) await shoot(page, "desktop-results.png");

    const token = await page.evaluate(() => localStorage.getItem("hhflag.token"));
    const res = await fetch(`${API}/results?token=${token}`, { headers: { origin: SITE } });
    assert.deepEqual((await res.json()).yourVote, { design: "B", colour: "white" });

    await page.reload();
    await page.waitForSelector("#results:not([hidden])");
    assert.equal(await visibleVoteButtons(page), 0);
    assert.match(await page.textContent("#your-vote"), /\bB\b.*\bwhite\b/i);
    await ctx.close();
  });

  test("another browser gets a fresh ballot and its vote adds up", async () => {
    const ctx = await browser.newContext();
    const page = await open(ctx);
    assert.equal(await page.isHidden("#results"), true);
    await page.locator('#ballot .card[data-design="D"] button.vote').click();
    await page.waitForSelector("#results:not([hidden])");
    assert.match(await page.textContent("#total"), /\b2 votes\b/);
    assert.match(await page.textContent("#your-vote"), /\bD\b.*\bred\b/i);
    await ctx.close();
  });

  for (const [name, reply, message] of [
    ["the network cap", { status: 429, body: { error: "network-cap" } }, /limit/i],
    ["an unreachable server", null, /couldn.t reach/i]
  ]) {
    test(`${name} leaves the ballot usable, with a message`, async () => {
      const ctx = await browser.newContext();
      const page = await open(ctx);
      await page.route(`${API}/vote`, (route) =>
        reply
          ? route.fulfill({ status: reply.status, contentType: "application/json", headers: cors, body: JSON.stringify(reply.body) })
          : route.abort()
      );
      await page.locator('#ballot .card[data-design="A"] button.vote').click();
      await page.waitForFunction(() => document.querySelector("#status").textContent.trim().length > 0);
      assert.match(await page.textContent("#status"), message);
      assert.equal(await page.isHidden("#results"), true);
      assert.equal(await page.locator("#ballot button.vote:enabled").count(), 4);
      await ctx.close();
    });
  }

  test("a closed vote shows the final results instead", async () => {
    const ctx = await browser.newContext();
    const page = await open(ctx);
    const cell = (red) => ({ red, white: 0 });
    const tally = {
      open: false, total: 3, designs: { A: 2, B: 1, C: 0, D: 0 }, colours: { red: 3, white: 0 },
      cells: { A: cell(2), B: cell(1), C: cell(0), D: cell(0) }
    };
    await page.route(`${API}/vote`, (r) =>
      r.fulfill({ status: 403, contentType: "application/json", headers: cors, body: JSON.stringify({ error: "closed" }) }));
    await page.route(`${API}/results*`, (r) =>
      r.fulfill({ status: 200, contentType: "application/json", headers: cors, body: JSON.stringify({ yourVote: null, tally }) }));
    await page.locator('#ballot .card[data-design="A"] button.vote').click();
    await page.waitForSelector("#results:not([hidden])");
    assert.match(await page.textContent("#status"), /closed/i);
    assert.match(await page.textContent("#total"), /\b3 votes\b/);
    assert.equal(await page.isHidden("#your-vote"), true);
    await ctx.close();
  });

  test("fits a 400px phone screen in one column without sideways scrolling", async () => {
    const ctx = await browser.newContext({ viewport: { width: 400, height: 860 }, deviceScaleFactor: 2 });
    const page = await open(ctx);
    const m = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
      cols: getComputedStyle(document.querySelector("#ballot")).gridTemplateColumns.split(" ").length
    }));
    assert.ok(m.scroll <= m.client, `scrollWidth ${m.scroll} > clientWidth ${m.client}`);
    assert.equal(m.cols, 1);
    if (SHOTS) await shoot(page, "phone.png");
    await ctx.close();
  });

  test("nothing from the address bar executes, on the vote page or the tool", async () => {
    const payload = `"><img src=x onerror="window.__pwned=1">`;
    const ctx = await browser.newContext();
    for (const url of [
      `${PAGE}?q=${encodeURIComponent(payload)}#${payload}`,
      `${PAGE}tool/#${payload}`,
      `${PAGE}tool/?advanced=1#a=5&${payload}`,
      `${PAGE}tool/?advanced=1&x=${encodeURIComponent(payload)}#${payload}`
    ]) {
      const page = await open(ctx, url);
      await page.waitForTimeout(500);
      assert.equal(await page.evaluate(() => window.__pwned), undefined, url);
      await page.close();
    }
    await ctx.close();
  });

  test("the published tool opens on the simplified panel, named Hyperhelvetica", async () => {
    const ctx = await browser.newContext();
    const page = await open(ctx, PAGE + "tool/");
    await page.waitForSelector("#flag svg");
    assert.equal(await page.isHidden("#mode"), true);
    assert.equal(await page.locator("#controls .row").count(), 14);
    assert.match(await page.textContent("h1"), /Hyperhelvetica/);
    assert.match(await page.title(), /Hyperhelvetica/);
    assert.equal(await page.getAttribute('a[href="hyperhelvetica-flag-tool.html"]', "download"), "");
    assert.equal((await page.request.get(PAGE + "tool/hyperhelvetica-flag-tool.html")).status(), 200);
    await ctx.close();
  });

  test("until DEPLOYED_API is set, a public visitor sees the designs but no vote buttons", async () => {
    const html = await readFile(PUBLIC + "Hyperhelvetica/index.html", "utf8");
    const deployed = /DEPLOYED_API = "https:\/\/[^"]+"/.test(html);
    const ctx = await browser.newContext();
    const page = await open(ctx, PUBLIC_PAGE);
    await page.waitForSelector("#ballot .card");
    assert.equal(await page.locator("#ballot .card").count(), 4);
    if (deployed) {
      assert.equal(await visibleVoteButtons(page), 4);
    } else {
      assert.equal(await visibleVoteButtons(page), 0);
      assert.match(await page.textContent("#intro"), /opens soon/i);
      assert.equal(await page.isHidden("#results"), true);
    }
    await ctx.close();
  });

  test("no uncaught errors or console errors on any page", () => {
    assert.deepEqual(errors, []);
  });
});
