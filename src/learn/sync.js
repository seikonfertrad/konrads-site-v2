/* Optional sync through the learn-sync Worker (workers/learn-sync). The Worker stores one
   encrypted blob per vault id with a revision number; it never sees a key.

   A sync pulls the remote copy, merges it into the local one, and pushes the result if it adds
   anything. A push names the revision it was based on, so if another device pushed in between
   the Worker answers 409 with its copy and we merge again. */

import { merge, sameVault, seal, unseal } from "./vault.js";

export async function syncOnce(base, keys, local) {
  const url = `${base.replace(/\/+$/, "")}/v1/vault/${keys.syncId}`;
  const headers = { authorization: `Bearer ${keys.syncToken}` };

  let res = await fetch(url, { headers, cache: "no-store" });
  let rev = 0;
  let merged = local;
  for (let attempt = 0; attempt < 4; attempt++) {
    if (res.status === 200) {
      const body = await res.json();
      rev = body.rev;
      const remote = await unseal(keys, body.blob);
      merged = merge(merged, remote);
      if (sameVault(merged, remote)) return { vault: merged, rev, pushed: false };
    } else if (res.status !== 404) {
      throw new Error(await reason(res));
    }

    res = await fetch(url, {
      method: "PUT",
      headers: { ...headers, "content-type": "application/json" },
      body: JSON.stringify({ rev, blob: await seal(keys, merged) })
    });
    if (res.status === 200) return { vault: merged, rev: (await res.json()).rev, pushed: true };
    if (res.status !== 409) throw new Error(await reason(res));
    /* 409 carries the newer remote copy in the same shape as a GET; loop to merge it. */
    res = new Response(await res.text(), { status: 200 });
  }
  throw new Error("sync kept conflicting; try again");
}

export async function deleteRemote(base, keys) {
  await fetch(`${base.replace(/\/+$/, "")}/v1/vault/${keys.syncId}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${keys.syncToken}` }
  });
}

async function reason(res) {
  let detail = "";
  try {
    detail = (await res.json()).error || "";
  } catch {}
  const known = {
    forbidden: "the sync server rejected this passphrase for that vault",
    origin: "the sync server doesn't allow this site; check ALLOWED_ORIGINS",
    full: "the sync server has no room for another vault (MAX_VAULTS)",
    "too-large": "your data is larger than the sync server accepts"
  };
  return known[detail] || `sync failed (${res.status}${detail ? ": " + detail : ""})`;
}
