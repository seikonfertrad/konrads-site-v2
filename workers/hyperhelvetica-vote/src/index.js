/* Vote endpoint for konrads.link/Hyperhelvetica.

     POST /vote       { token, design: A-D, colour: red|white }   200 counted, 409 already voted
     GET  /results    ?token=…                                     the tally, for a browser that has voted
                                                                   (for anyone once VOTING_OPEN is "false")

   One vote per browser token, and at most NETWORK_DAILY_CAP votes per network per UTC day.
   A network is a salted SHA-256 of CF-Connecting-IP; the IP itself is never stored. */

const DESIGNS = ["A", "B", "C", "D"];
const COLOURS = ["red", "white"];
const TOKEN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_BODY = 1024;

export default {
  async fetch(request, env) {
    const allowed = allowedOrigin(request.headers.get("origin"), env);
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return preflight(allowed);

    try {
      if (url.pathname === "/vote") {
        if (request.method !== "POST") return json({ error: "method" }, 405, allowed);
        return await castVote(request, env, allowed);
      }
      if (url.pathname === "/results") {
        if (request.method !== "GET") return json({ error: "method" }, 405, allowed);
        return await readResults(url, env, allowed);
      }
      return json({ error: "not-found" }, 404, allowed);
    } catch (err) {
      console.error("hyperhelvetica-vote", err && err.stack ? err.stack : err);
      return json({ error: "server" }, 500, allowed);
    }
  }
};

const isOpen = (env) => env.VOTING_OPEN !== "false";

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
    headers["access-control-allow-methods"] = "GET, POST, OPTIONS";
    headers["access-control-allow-headers"] = "content-type";
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

async function castVote(request, env, allowed) {
  /* CORS only stops browsers reading the reply; checking Origin stops other sites casting votes. */
  if (!allowed) return json({ error: "origin" }, 403, null);
  if (!isOpen(env)) return json({ error: "closed" }, 403, allowed);

  if (Number(request.headers.get("content-length") || 0) > MAX_BODY) return json({ error: "too-large" }, 413, allowed);
  const text = await request.text();
  if (text.length > MAX_BODY) return json({ error: "too-large" }, 413, allowed);

  const ballot = parseBallot(text);
  if (!ballot) return json({ error: "bad-ballot" }, 400, allowed);

  const existing = await findVote(env, ballot.token);
  if (existing) return alreadyVoted(env, existing, allowed);

  if (!env.IP_SALT) throw new Error("IP_SALT secret is not set");
  const network = await sha256(env.IP_SALT + "|" + (request.headers.get("cf-connecting-ip") || "unknown"));
  const now = new Date().toISOString();
  const cap = Number(env.NETWORK_DAILY_CAP) || 10;

  /* The cap check and the insert are one statement, so two votes racing from the same
     network cannot both slip under the limit. */
  let result;
  try {
    result = await env.DB.prepare(
      `INSERT INTO votes (token, design, colour, ip_hash, day, created_at)
       SELECT ?1, ?2, ?3, ?4, ?5, ?6
       WHERE (SELECT COUNT(*) FROM votes WHERE ip_hash = ?4 AND day = ?5) < ?7`
    ).bind(ballot.token, ballot.design, ballot.colour, network, now.slice(0, 10), now, cap).run();
  } catch (err) {
    /* Same token inserted between our lookup and this insert. */
    if (/UNIQUE|PRIMARY KEY/i.test(String(err && err.message))) {
      return alreadyVoted(env, await findVote(env, ballot.token), allowed);
    }
    throw err;
  }
  if (!result.meta || result.meta.changes !== 1) return json({ error: "network-cap" }, 429, allowed);

  return json(
    { status: "counted", yourVote: { design: ballot.design, colour: ballot.colour }, tally: await tally(env) },
    200,
    allowed
  );
}

function parseBallot(text) {
  let b;
  try {
    b = JSON.parse(text);
  } catch {
    return null;
  }
  if (!b || typeof b !== "object" || Array.isArray(b)) return null;
  if (typeof b.token !== "string" || !TOKEN.test(b.token)) return null;
  if (!DESIGNS.includes(b.design) || !COLOURS.includes(b.colour)) return null;
  return { token: b.token.toLowerCase(), design: b.design, colour: b.colour };
}

async function findVote(env, token) {
  const row = await env.DB.prepare("SELECT design, colour FROM votes WHERE token = ?1").bind(token).first();
  return row ? { design: row.design, colour: row.colour } : null;
}

async function alreadyVoted(env, yourVote, allowed) {
  return json({ status: "already-voted", yourVote, tally: await tally(env) }, 409, allowed);
}

async function readResults(url, env, allowed) {
  const token = url.searchParams.get("token");
  const yourVote = token && TOKEN.test(token) ? await findVote(env, token.toLowerCase()) : null;
  if (!yourVote && isOpen(env)) return json({ error: "vote-first" }, 403, allowed);
  return json({ yourVote, tally: await tally(env) }, 200, allowed);
}

async function tally(env) {
  const { results } = await env.DB.prepare(
    "SELECT design, colour, COUNT(*) AS n FROM votes GROUP BY design, colour"
  ).all();
  const out = { open: isOpen(env), total: 0, designs: {}, colours: {}, cells: {} };
  for (const c of COLOURS) out.colours[c] = 0;
  for (const d of DESIGNS) {
    out.designs[d] = 0;
    out.cells[d] = {};
    for (const c of COLOURS) out.cells[d][c] = 0;
  }
  for (const { design, colour, n } of results) {
    if (!out.cells[design] || !(colour in out.colours)) continue;
    out.cells[design][colour] = n;
    out.designs[design] += n;
    out.colours[colour] += n;
    out.total += n;
  }
  return out;
}

async function sha256(text) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
