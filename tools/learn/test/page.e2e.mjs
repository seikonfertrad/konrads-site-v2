/* The /learn page in headless Chromium, against the built site.

     LEARN_PASSPHRASE='correct horse battery staple' npm run learn:build && npm run build
     npm run learn:e2e

   Needs Playwright with Chromium. SHOTS=<dir> keeps screenshots. */
import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

import { deriveKeys } from "../../../src/learn/crypto.js";
import { emptyVault, seal } from "../../../src/learn/vault.js";

/* Playwright isn't a site dependency; install it wherever you run this (npx playwright install chromium). */
const { chromium } = createRequire(import.meta.url)("playwright");
const ROOT = fileURLToPath(new URL("../../..", import.meta.url));
const PASS = process.env.LEARN_PASSPHRASE || "correct horse battery staple";
const PORT = 4329;
const URL_ = `http://127.0.0.1:${PORT}/learn/`;
const SHOTS = process.env.SHOTS;

let server;
let browser;

async function unlock(page, pass = PASS, { remember = false } = {}) {
  await page.fill("#pass", pass);
  if (remember) await page.check("#remember");
  await page.click("#unlock-btn");
}

before(async () => {
  server = spawn(ROOT + "node_modules/.bin/astro", ["preview", "--port", String(PORT), "--host", "127.0.0.1"], { cwd: ROOT, stdio: "ignore" });
  for (let i = 0; i < 80; i++) {
    try {
      if ((await fetch(URL_)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  browser = await chromium.launch();
});
after(async () => {
  if (browser) await browser.close();
  if (server) server.kill();
});

describe("/learn", () => {
  test("serves only ciphertext", async () => {
    const res = await fetch(`http://127.0.0.1:${PORT}/learn/data/bundle.json`);
    assert.equal(res.status, 200, "build the bundle first (see the top of this file)");
    const text = await res.text();
    assert.doesNotMatch(text, /Tic Tac Toe|tic-tac-toe|Fractal/i);
    const html = await (await fetch(URL_)).text();
    assert.match(html, /noindex/);
    assert.match(html, /Content-Security-Policy/);
    assert.doesNotMatch(html, /goatcounter/);
  });

  test("a wrong passphrase is refused; the right one opens the course", async () => {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(URL_);
    await unlock(page, "definitely not the passphrase");
    await page.waitForSelector("#lock-msg.bad", { timeout: 20000 });
    assert.match(await page.textContent("#lock-msg"), /doesn't open/);

    await unlock(page);
    await page.waitForSelector("#app:not([hidden])", { timeout: 20000 });
    assert.match(await page.textContent("#view"), /How much time do you have/);
    if (SHOTS) await page.screenshot({ path: SHOTS + "/today.png", fullPage: true });
    assert.deepEqual(errors, []);
    await page.close();
  });

  test("ticks, notes and sessions persist, encrypted, across reloads", async () => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(URL_ + "#/l/w1-simple-game");
    await unlock(page);
    await page.waitForSelector("#lesson-body input[data-check]", { timeout: 20000 });

    const first = page.locator("#lesson-body input[data-check]").first();
    await first.check();
    await page.locator("#lesson-body .sec-toggle").first().click();
    await page.fill("#lesson-notes", "remember the zebra");
    await page.click("#session-btn");
    await page.click("#timer-pill");
    await page.fill("#stop-min", "25");
    await page.fill("#stop-note", "forked and cloned");
    await page.click("#stop-form button[value=save]");
    await page.waitForTimeout(600);

    const stored = await page.evaluate(() => localStorage.getItem("learn.vault.v1"));
    assert.ok(stored && stored.length > 50);
    assert.doesNotMatch(stored, /zebra|forked|w1-simple-game/);

    await page.reload();
    await unlock(page);
    await page.waitForSelector("#lesson-body input[data-check]", { timeout: 20000 });
    assert.equal(await page.locator("#lesson-body input[data-check]").first().isChecked(), true);
    assert.equal(await page.inputValue("#lesson-notes"), "remember the zebra");
    assert.equal(await page.getAttribute("#lesson-body .sec-toggle >> nth=0", "aria-pressed"), "true");
    assert.match(await page.textContent("#lesson-progress"), /^2\/\d+ ticked$/);

    await page.goto(URL_ + "#/journal");
    assert.match(await page.textContent("#view"), /forked and cloned/);
    assert.match(await page.textContent("#view"), /25 min/);

    await page.goto(URL_ + "#/");
    assert.match(await page.textContent("#view"), /Continue where you left off/);
    await ctx.close();
  });

  test("diagrams decrypt and render", async () => {
    const page = await browser.newPage();
    await page.goto(URL_ + "#/l/w1-styling");
    await unlock(page);
    await page.waitForSelector("#lesson-body img", { timeout: 20000 });
    await page.waitForFunction(() => [...document.querySelectorAll("#lesson-body img")].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 10000 });
    assert.match(await page.getAttribute("#lesson-body img", "src"), /^blob:/);
    await page.close();
  });

  test("remember this device skips the passphrase until you lock", async () => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(URL_);
    await unlock(page, PASS, { remember: true });
    await page.waitForSelector("#app:not([hidden])", { timeout: 20000 });
    await page.reload();
    await page.waitForSelector("#app:not([hidden])", { timeout: 20000 });
    await page.click("#lock-btn");
    await page.waitForSelector("#lock:not([hidden])");
    await page.reload();
    await page.waitForSelector("#lock-form:not([hidden])", { timeout: 20000 });
    assert.equal(await page.isVisible("#app"), false);
    await ctx.close();
  });

  test("after a passphrase change, the old one carries progress over", async () => {
    const old = await deriveKeys("the old passphrase we used to have");
    const v = emptyVault();
    v.notes["w1-demo"] = { text: "written under the old passphrase", t: 1 };
    const envelope = await seal(old, v);

    const ctx = await browser.newContext();
    await ctx.addInitScript((e) => {
      if (!sessionStorage.getItem("seeded")) {
        localStorage.setItem("learn.vault.v1", e);
        sessionStorage.setItem("seeded", "1");
      }
    }, JSON.stringify(envelope));
    const page = await ctx.newPage();
    await page.goto(URL_ + "#/l/w1-demo");
    await unlock(page);
    await page.waitForSelector("#lock-migrate:not([hidden])", { timeout: 20000 });
    await page.fill("#old-pass", "wrong old passphrase");
    await page.click("#lock-migrate button.btn");
    await page.waitForFunction(() => document.querySelector("#migrate-msg").textContent.length > 0, null, { timeout: 20000 });
    await page.fill("#old-pass", "the old passphrase we used to have");
    await page.click("#lock-migrate button.btn");
    await page.waitForSelector("#app:not([hidden])", { timeout: 20000 });
    assert.equal(await page.inputValue("#lesson-notes"), "written under the old passphrase");

    await page.reload();
    await unlock(page);
    await page.waitForSelector("#lesson-notes", { timeout: 20000 });
    assert.equal(await page.inputValue("#lesson-notes"), "written under the old passphrase", "now stored under the new passphrase");
    await ctx.close();
  });

  test("works on a phone-sized screen without sideways scrolling", async () => {
    const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
    for (const route of ["#/", "#/path", "#/l/w6-local", "#/journal", "#/settings"]) {
      await page.goto(URL_ + route);
      if (await page.isVisible("#lock-form")) {
        await unlock(page);
        await page.waitForSelector("#app:not([hidden])", { timeout: 20000 });
      }
      await page.waitForTimeout(200);
      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.ok(width <= 375, `${route} is ${width}px wide`);
      if (SHOTS) await page.screenshot({ path: `${SHOTS}/phone-${route.replace(/\W+/g, "_")}.png`, fullPage: true });
    }
    await page.close();
  });
});
