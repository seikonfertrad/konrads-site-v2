import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { startWorker, resetState, d1 } from "./harness.mjs";
import { deriveKeys } from "../../../src/learn/crypto.js";
import { emptyVault, seal, unseal } from "../../../src/learn/vault.js";
import { syncOnce, deleteRemote } from "../../../src/learn/sync.js";

const ORIGIN = "https://konrads.link";
const id = () => randomBytes(16).toString("hex");
const token = () => randomBytes(32).toString("base64url");
const blob = (n = 1) => ({ v: 1, iv: "aXYtaXYtaXYt", ct: "Y3Q" + n });

function call(base, method, vaultId, tok, body, { origin = ORIGIN } = {}) {
  const headers = {};
  if (origin) headers.origin = origin;
  if (tok) headers.authorization = "Bearer " + tok;
  if (body !== undefined) headers["content-type"] = "application/json";
  return fetch(`${base}/v1/vault/${vaultId}`, { method, headers, body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body) });
}

describe("learn-sync", () => {
  let worker;

  before(async () => {
    await resetState();
    worker = await startWorker({ port: 8788, vars: { MAX_VAULTS: "3" } });
  });
  after(() => worker && worker.stop());

  test("a preflight from konrads.link is granted, others are not", async () => {
    let res = await fetch(`${worker.base}/v1/vault/${id()}`, { method: "OPTIONS", headers: { origin: ORIGIN } });
    assert.equal(res.status, 204);
    assert.equal(res.headers.get("access-control-allow-origin"), ORIGIN);
    assert.match(res.headers.get("access-control-allow-headers"), /authorization/);
    res = await fetch(`${worker.base}/v1/vault/${id()}`, { method: "OPTIONS", headers: { origin: "https://evil.example" } });
    assert.equal(res.headers.get("access-control-allow-origin"), null);
  });

  test("requests from other origins, or with no origin, are refused", async () => {
    assert.equal((await call(worker.base, "GET", id(), token(), undefined, { origin: "https://evil.example" })).status, 403);
    assert.equal((await call(worker.base, "GET", id(), token(), undefined, { origin: null })).status, 403);
  });

  test("malformed ids and tokens are rejected", async () => {
    assert.equal((await call(worker.base, "GET", "nothex", token())).status, 400);
    assert.equal((await call(worker.base, "GET", id(), "short")).status, 400);
    assert.equal((await call(worker.base, "GET", id(), null)).status, 400);
  });

  test("claim, read, update with the right rev, and conflict on a stale rev", async () => {
    const v = id();
    const t = token();
    assert.equal((await call(worker.base, "GET", v, t)).status, 404);

    let res = await call(worker.base, "PUT", v, t, { rev: 0, blob: blob(1) });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { rev: 1 });

    res = await call(worker.base, "GET", v, t);
    assert.deepEqual(await res.json(), { rev: 1, blob: blob(1) });
    assert.equal(res.headers.get("cache-control"), "no-store");

    res = await call(worker.base, "PUT", v, t, { rev: 1, blob: blob(2) });
    assert.deepEqual(await res.json(), { rev: 2 });

    res = await call(worker.base, "PUT", v, t, { rev: 1, blob: blob(3) });
    assert.equal(res.status, 409);
    assert.deepEqual(await res.json(), { rev: 2, blob: blob(2) });

    res = await call(worker.base, "PUT", v, t, { rev: 0, blob: blob(4) });
    assert.equal(res.status, 409, "re-claiming an existing vault is a conflict, not an overwrite");
  });

  test("another token can neither read, write nor delete a claimed vault", async () => {
    const v = id();
    const t = token();
    await call(worker.base, "PUT", v, t, { rev: 0, blob: blob() });
    const other = token();
    assert.equal((await call(worker.base, "GET", v, other)).status, 403);
    assert.equal((await call(worker.base, "PUT", v, other, { rev: 1, blob: blob(9) })).status, 403);
    assert.equal((await call(worker.base, "DELETE", v, other)).status, 403);
    assert.equal((await (await call(worker.base, "GET", v, t)).json()).rev, 1);
  });

  test("the token is stored only as a hash", async () => {
    const v = id();
    const t = token();
    await call(worker.base, "PUT", v, t, { rev: 0, blob: blob() });
    const [row] = await d1(`SELECT token_hash FROM vaults WHERE id = '${v}'`);
    assert.match(row.token_hash, /^[0-9a-f]{64}$/);
    assert.notEqual(row.token_hash, t);
  });

  test("bad bodies are rejected", async () => {
    const v = id();
    const t = token();
    assert.equal((await call(worker.base, "PUT", v, t, "{nope")).status, 400);
    assert.equal((await call(worker.base, "PUT", v, t, { rev: "0", blob: blob() })).status, 400);
    assert.equal((await call(worker.base, "PUT", v, t, { rev: 0, blob: { iv: 1 } })).status, 400);
    assert.equal((await call(worker.base, "PUT", v, t, { rev: 0, blob: { ...blob(), ct: "x".repeat(950 * 1024) } })).status, 413);
  });

  test("delete removes the vault", async () => {
    const v = id();
    const t = token();
    await call(worker.base, "PUT", v, t, { rev: 0, blob: blob() });
    assert.equal((await call(worker.base, "DELETE", v, t)).status, 204);
    assert.equal((await call(worker.base, "GET", v, t)).status, 404);
  });

  test("MAX_VAULTS caps how many vaults can be claimed", async () => {
    await d1("DELETE FROM vaults");
    for (let i = 0; i < 3; i++) assert.equal((await call(worker.base, "PUT", id(), token(), { rev: 0, blob: blob() })).status, 200);
    const res = await call(worker.base, "PUT", id(), token(), { rev: 0, blob: blob() });
    assert.equal(res.status, 507);
    assert.deepEqual(await res.json(), { error: "full" });
    await d1("DELETE FROM vaults");
  });

  test("the app's sync client merges edits from two devices", async () => {
    await d1("DELETE FROM vaults");
    const realFetch = globalThis.fetch;
    globalThis.fetch = (url, init = {}) => realFetch(url, { ...init, headers: { ...(init.headers || {}), origin: ORIGIN } });
    try {
      const keys = await deriveKeys("correct horse battery staple");
      const laptop = emptyVault();
      laptop.checks["w1-simple-game:aaaa"] = { on: true, t: 100 };
      laptop.notes["w1-simple-game"] = { text: "from the laptop", t: 100 };
      let r = await syncOnce(worker.base, keys, laptop);
      assert.equal(r.pushed, true);

      const phone = emptyVault();
      phone.checks["w1-simple-game:bbbb"] = { on: true, t: 200 };
      phone.notes["w1-simple-game"] = { text: "newer, from the phone", t: 200 };
      r = await syncOnce(worker.base, keys, phone);
      assert.equal(r.vault.checks["w1-simple-game:aaaa"].on, true);
      assert.equal(r.vault.checks["w1-simple-game:bbbb"].on, true);
      assert.equal(r.vault.notes["w1-simple-game"].text, "newer, from the phone");

      r = await syncOnce(worker.base, keys, laptop);
      assert.equal(r.pushed, false, "nothing new to push");
      assert.equal(r.vault.notes["w1-simple-game"].text, "newer, from the phone");

      /* What the server holds is ciphertext that only these keys open. */
      const [row] = await d1("SELECT blob FROM vaults");
      assert.doesNotMatch(row.blob, /phone|laptop|simple-game/);
      assert.equal((await unseal(keys, JSON.parse(row.blob))).checks["w1-simple-game:bbbb"].on, true);
      const otherKeys = await deriveKeys("a different passphrase entirely");
      await assert.rejects(unseal(otherKeys, JSON.parse(row.blob)));

      /* A stale push (rev behind) comes back as 409 and the client merges and retries. */
      await realFetch(`${worker.base}/v1/vault/${keys.syncId}`, {
        method: "PUT",
        headers: { origin: ORIGIN, authorization: "Bearer " + keys.syncToken, "content-type": "application/json" },
        body: JSON.stringify({ rev: 2, blob: await seal(keys, { ...r.vault, journal: { "2026-10-25": { text: "sneaky", t: 300 } } }) })
      });
      const tablet = emptyVault();
      tablet.secs["w1-simple-game#overview"] = { on: true, t: 400 };
      r = await syncOnce(worker.base, keys, tablet);
      assert.equal(r.vault.journal["2026-10-25"].text, "sneaky");
      assert.equal(r.vault.secs["w1-simple-game#overview"].on, true);

      await deleteRemote(worker.base, keys);
      assert.equal((await d1("SELECT COUNT(*) AS n FROM vaults"))[0].n, 0);
    } finally {
      globalThis.fetch = realFetch;
    }
  });
});
