/* Encrypted progress sync for konrads.link/learn.

     GET    /v1/vault/:id   → 200 { rev, blob } | 404 nothing stored yet
     PUT    /v1/vault/:id   { rev, blob } → 200 { rev } | 409 { rev, blob } someone wrote first
     DELETE /v1/vault/:id   → 204

   Every request carries `Authorization: Bearer <token>`. The browser derives both the id and the
   token from the passphrase, so the Worker can't read anything and can't link a vault to a person.
   The first PUT to an id claims it with that token's hash; after that the token must match.
   `blob` is opaque ciphertext. A PUT must name the rev it was based on, so two devices can't
   silently overwrite each other: the loser gets 409 and the current copy to merge. */

const ID = /^[0-9a-f]{32}$/;
const TOKEN = /^[A-Za-z0-9_-]{43}$/;
const MAX_BODY = 900 * 1024;

export default {
  async fetch(request, env) {
    const allowed = allowedOrigin(request.headers.get("origin"), env);
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return preflight(allowed);

    try {
      const m = url.pathname.match(/^\/v1\/vault\/([^/]+)$/);
      if (!m) return json({ error: "not-found" }, 404, allowed);
      /* CORS only stops browsers reading replies; checking Origin keeps other sites out entirely. */
      if (!allowed) return json({ error: "origin" }, 403, null);

      const id = m[1];
      const token = (request.headers.get("authorization") || "").replace(/^Bearer /, "");
      if (!ID.test(id) || !TOKEN.test(token)) return json({ error: "bad-request" }, 400, allowed);

      const row = await env.DB.prepare("SELECT token_hash, rev, blob FROM vaults WHERE id = ?1").bind(id).first();
      const tokenHash = await sha256(token);
      if (row && !(await sameHash(row.token_hash, tokenHash))) return json({ error: "forbidden" }, 403, allowed);

      if (request.method === "GET") {
        if (!row) return json({ error: "empty" }, 404, allowed);
        return json({ rev: row.rev, blob: JSON.parse(row.blob) }, 200, allowed);
      }
      if (request.method === "PUT") return await put(request, env, allowed, id, tokenHash, row);
      if (request.method === "DELETE") {
        if (row) await env.DB.prepare("DELETE FROM vaults WHERE id = ?1").bind(id).run();
        return new Response(null, { status: 204, headers: corsHeaders(allowed) });
      }
      return json({ error: "method" }, 405, allowed);
    } catch (err) {
      console.error("learn-sync", err && err.stack ? err.stack : err);
      return json({ error: "server" }, 500, allowed);
    }
  }
};

async function put(request, env, allowed, id, tokenHash, row) {
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY) return json({ error: "too-large" }, 413, allowed);
  const text = await request.text();
  if (text.length > MAX_BODY) return json({ error: "too-large" }, 413, allowed);

  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: "bad-request" }, 400, allowed);
  }
  const blob = body && body.blob;
  if (!Number.isInteger(body && body.rev) || !blob || typeof blob.iv !== "string" || typeof blob.ct !== "string") {
    return json({ error: "bad-request" }, 400, allowed);
  }
  const now = new Date().toISOString();
  const blobText = JSON.stringify(blob);

  if (!row) {
    if (body.rev !== 0) return json({ error: "empty" }, 404, allowed);
    const max = Number(env.MAX_VAULTS) || 3;
    /* The cap check and the insert are one statement, so racing claims can't exceed it. */
    let result;
    try {
      result = await env.DB.prepare(
        `INSERT INTO vaults (id, token_hash, rev, blob, updated_at)
         SELECT ?1, ?2, 1, ?3, ?4 WHERE (SELECT COUNT(*) FROM vaults) < ?5`
      ).bind(id, tokenHash, blobText, now, max).run();
    } catch (err) {
      if (/UNIQUE|PRIMARY KEY/i.test(String(err && err.message))) return conflict(env, allowed, id);
      throw err;
    }
    if (!result.meta || result.meta.changes !== 1) return json({ error: "full" }, 507, allowed);
    return json({ rev: 1 }, 200, allowed);
  }

  const result = await env.DB.prepare(
    "UPDATE vaults SET rev = rev + 1, blob = ?1, updated_at = ?2 WHERE id = ?3 AND rev = ?4 AND token_hash = ?5"
  ).bind(blobText, now, id, body.rev, tokenHash).run();
  if (!result.meta || result.meta.changes !== 1) return conflict(env, allowed, id);
  return json({ rev: body.rev + 1 }, 200, allowed);
}

async function conflict(env, allowed, id) {
  const row = await env.DB.prepare("SELECT rev, blob FROM vaults WHERE id = ?1").bind(id).first();
  if (!row) return json({ error: "empty" }, 404, allowed);
  return json({ rev: row.rev, blob: JSON.parse(row.blob) }, 409, allowed);
}

function allowedOrigin(origin, env) {
  if (!origin) return null;
  const list = String(env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  return list.includes(origin) ? origin : null;
}

function corsHeaders(allowed) {
  return allowed ? { "access-control-allow-origin": allowed, vary: "Origin" } : { vary: "Origin" };
}

function preflight(allowed) {
  const headers = corsHeaders(allowed);
  if (allowed) {
    headers["access-control-allow-methods"] = "GET, PUT, DELETE, OPTIONS";
    headers["access-control-allow-headers"] = "authorization, content-type";
    headers["access-control-max-age"] = "86400";
  }
  return new Response(null, { status: 204, headers });
}

function json(body, status, allowed) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...corsHeaders(allowed) }
  });
}

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

/* Compare hashes in constant time. */
async function sameHash(a, b) {
  if (typeof a !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
