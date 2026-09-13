import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { startWorker, resetState, d1 } from "./harness.mjs";

const ORIGIN = "https://konrads.link";
const CAP = 10;
const OTHER_NETWORK = "203.0.113.7";

const ballot = (design = "A", colour = "red") => ({ token: randomUUID(), design, colour });

function vote(base, body, { origin = ORIGIN, ip } = {}) {
  const headers = { "content-type": "application/json" };
  if (origin) headers.origin = origin;
  if (ip) headers["cf-connecting-ip"] = ip;
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  return fetch(base + "/vote", { method: "POST", headers, body: payload });
}

function results(base, token) {
  const url = new URL(base + "/results");
  if (token) url.searchParams.set("token", token);
  return fetch(url, { headers: { origin: ORIGIN } });
}

const empty = () => ({ red: 0, white: 0 });

describe("while voting is open", () => {
  let worker;
  let first;

  before(async () => {
    await resetState();
    worker = await startWorker({ port: 8787 });
  });
  after(() => worker && worker.stop());

  test("a preflight from konrads.link is granted", async () => {
    const res = await fetch(worker.base + "/vote", {
      method: "OPTIONS",
      headers: { origin: ORIGIN, "access-control-request-method": "POST", "access-control-request-headers": "content-type" }
    });
    assert.equal(res.status, 204);
    assert.equal(res.headers.get("access-control-allow-origin"), ORIGIN);
    assert.match(res.headers.get("access-control-allow-methods") || "", /POST/);
  });

  test("a preflight from another site gets no CORS grant", async () => {
    const res = await fetch(worker.base + "/vote", {
      method: "OPTIONS",
      headers: { origin: "https://evil.example", "access-control-request-method": "POST" }
    });
    assert.equal(res.headers.get("access-control-allow-origin"), null);
  });

  test("results are hidden from a browser that has not voted", async () => {
    const none = await results(worker.base);
    assert.equal(none.status, 403);
    assert.equal((await none.json()).error, "vote-first");
    assert.equal((await results(worker.base, randomUUID())).status, 403);
  });

  test("a vote sent from another site is refused", async () => {
    const res = await vote(worker.base, ballot(), { origin: "https://evil.example" });
    assert.equal(res.status, 403);
    assert.equal((await res.json()).error, "origin");
  });

  test("a vote with no Origin header is refused", async () => {
    const res = await vote(worker.base, ballot(), { origin: null });
    assert.equal(res.status, 403);
  });

  test("malformed ballots are rejected", async () => {
    const bad = [
      "not json",
      { ...ballot(), design: "E" },
      { ...ballot(), colour: "blue" },
      { ...ballot(), token: "abc" },
      { design: "A", colour: "red" },
      ["A", "red"]
    ];
    for (const body of bad) {
      const res = await vote(worker.base, body);
      assert.equal(res.status, 400, `expected 400 for ${JSON.stringify(body)}`);
    }
  });

  test("an oversized body is rejected", async () => {
    const res = await vote(worker.base, { ...ballot(), pad: "x".repeat(4096) });
    assert.equal(res.status, 413);
  });

  test("unknown routes and wrong methods are rejected", async () => {
    assert.equal((await fetch(worker.base + "/nope", { headers: { origin: ORIGIN } })).status, 404);
    assert.equal((await fetch(worker.base + "/vote", { headers: { origin: ORIGIN } })).status, 405);
  });

  test("a valid vote is counted and returns the tally", async () => {
    first = ballot("A", "red");
    const res = await vote(worker.base, first);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("access-control-allow-origin"), ORIGIN);
    assert.equal(res.headers.get("cache-control"), "no-store");
    const body = await res.json();
    assert.equal(body.status, "counted");
    assert.deepEqual(body.yourVote, { design: "A", colour: "red" });
    assert.deepEqual(body.tally, {
      open: true,
      total: 1,
      designs: { A: 1, B: 0, C: 0, D: 0 },
      colours: { red: 1, white: 0 },
      cells: { A: { red: 1, white: 0 }, B: empty(), C: empty(), D: empty() }
    });
  });

  test("a second vote from the same browser is not counted", async () => {
    const res = await vote(worker.base, { ...first, design: "D", colour: "white" });
    assert.equal(res.status, 409);
    const body = await res.json();
    assert.equal(body.status, "already-voted");
    assert.deepEqual(body.yourVote, { design: "A", colour: "red" });
    assert.equal(body.tally.total, 1);
  });

  test("a browser that voted can read the results", async () => {
    const res = await results(worker.base, first.token);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.deepEqual(body.yourVote, { design: "A", colour: "red" });
    assert.equal(body.tally.total, 1);
  });

  test("one network is capped per day", async () => {
    for (let i = 1; i < CAP; i++) {
      const res = await vote(worker.base, ballot("BCD"[i % 3], i % 2 ? "white" : "red"));
      assert.equal(res.status, 200, `vote ${i + 1} of ${CAP}`);
    }
    const over = await vote(worker.base, ballot("B", "red"));
    assert.equal(over.status, 429);
    assert.equal((await over.json()).error, "network-cap");
    const check = await (await results(worker.base, first.token)).json();
    assert.equal(check.tally.total, CAP);
  });

  test("the cap is per network, not global", async () => {
    const res = await vote(worker.base, ballot("C", "white"), { ip: OTHER_NETWORK });
    assert.equal(res.status, 200);
    assert.equal((await res.json()).tally.total, CAP + 1);
  });
});

describe("once voting is closed", () => {
  let worker;

  before(async () => {
    worker = await startWorker({ port: 8788, vars: { VOTING_OPEN: "false" } });
  });
  after(() => worker && worker.stop());

  test("results are public", async () => {
    const res = await results(worker.base);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.tally.open, false);
    assert.equal(body.tally.total, CAP + 1);
    assert.equal(body.yourVote, null);
  });

  test("new votes are refused and change nothing", async () => {
    const res = await vote(worker.base, ballot("B", "white"), { ip: "198.51.100.4" });
    assert.equal(res.status, 403);
    assert.equal((await res.json()).error, "closed");
    const check = await (await results(worker.base)).json();
    assert.equal(check.tally.total, CAP + 1);
  });
});

describe("storage", () => {
  test("keeps a salted hash of the IP, never the IP or its plain hash", async () => {
    const rows = await d1("SELECT ip_hash FROM votes");
    assert.equal(rows.length, CAP + 1);
    const plain = ["127.0.0.1", "::1", OTHER_NETWORK].map((ip) => createHash("sha256").update(ip).digest("hex"));
    for (const { ip_hash } of rows) {
      assert.match(ip_hash, /^[0-9a-f]{64}$/);
      assert.ok(!plain.includes(ip_hash), "ip_hash is an unsalted SHA-256");
    }
  });
});
