/* Your progress, notes and journal: one JSON document, kept encrypted in localStorage and,
   if sync is on, on the sync Worker.

   The document is a set of maps (checks, secs, status, …) whose entries each carry `t`, the time
   they last changed. Two copies merge entry by entry, newest wins, so edits made offline on two
   devices combine instead of one overwriting the other. Deleting writes a tombstone ({ del: 1 })
   rather than dropping the key, so the deletion merges too. */

import { sealJson, openJson } from "./crypto.js";

export const MAPS = ["checks", "secs", "status", "notes", "links", "sessions", "journal", "meta"];
const STORE = "learn.vault.v1";

export function emptyVault() {
  const v = { v: 1 };
  for (const m of MAPS) v[m] = {};
  return v;
}

export function merge(a, b) {
  const out = emptyVault();
  for (const m of MAPS) {
    const x = (a && a[m]) || {};
    const y = (b && b[m]) || {};
    for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) {
      const p = x[k];
      const q = y[k];
      out[m][k] = !q || (p && (p.t || 0) >= (q.t || 0)) ? p : q;
    }
  }
  return out;
}

export function sameVault(a, b) {
  return JSON.stringify(canon(a)) === JSON.stringify(canon(b));
}

function canon(v) {
  const out = {};
  for (const m of MAPS) {
    const src = (v && v[m]) || {};
    out[m] = Object.keys(src).sort().map((k) => [k, src[k]]);
  }
  return out;
}

export const seal = (keys, vault) => sealJson(keys.vault, "vault", vault, { gzip: true });
export const unseal = async (keys, envelope) => normalize(await openJson(keys.vault, "vault", envelope));

function normalize(v) {
  const out = emptyVault();
  for (const m of MAPS) if (v && v[m] && typeof v[m] === "object") out[m] = v[m];
  return out;
}

/* localStorage holds only the sealed envelope; it can throw (private mode, blocked storage). */
export function readStored() {
  try {
    const raw = localStorage.getItem(STORE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeStored(envelope) {
  try {
    localStorage.setItem(STORE, JSON.stringify(envelope));
    return true;
  } catch {
    return false;
  }
}

export function clearStored() {
  try {
    localStorage.removeItem(STORE);
  } catch {}
}

/* "Remember this device": the derived keys go into IndexedDB as non-extractable CryptoKeys, so
   even code running on this page can use them but never read them out. The passphrase itself
   is never stored. */
const DB = "learn";
const KEYSTORE = "keys";

function idb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(KEYSTORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx(mode, fn) {
  const db = await idb();
  try {
    return await new Promise((resolve, reject) => {
      const t = db.transaction(KEYSTORE, mode);
      const req = fn(t.objectStore(KEYSTORE));
      t.oncomplete = () => resolve(req && req.result);
      t.onerror = () => reject(t.error);
    });
  } finally {
    db.close();
  }
}

export const rememberKeys = (keys) => tx("readwrite", (s) => s.put(keys, "k")).catch(() => {});
export const recallKeys = () => tx("readonly", (s) => s.get("k")).catch(() => null);
export const forgetKeys = () => tx("readwrite", (s) => s.delete("k")).catch(() => {});
