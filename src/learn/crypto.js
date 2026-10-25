/* Encryption for konrads.link/learn, shared by the build script (Node 22) and the browser.

   One passphrase unlocks everything. PBKDF2-SHA256 (600k iterations, OWASP 2023) stretches it
   once; HKDF then splits that into independent keys:

     content     AES-256-GCM key for the curriculum bundle and its images (built in CI)
     vault       AES-256-GCM key for your progress, notes and journal (browser only)
     sync-id     where the encrypted vault lives on the sync Worker (public-ish, 128 bits)
     sync-token  bearer token for the sync Worker; it only ever sees ciphertext

   Every envelope binds a purpose string as AES-GCM additional data, so a ciphertext made for
   one slot (an image, the vault) cannot be swapped into another. */

const subtle = globalThis.crypto.subtle;
const te = new TextEncoder();
const td = new TextDecoder();

export const KDF_ITERATIONS = 600_000;
/* A fixed, site-specific salt. There is one user, so a per-user salt buys nothing; what matters
   is that no precomputed table exists for this exact string. Changing it changes every key. */
export const SITE_SALT = "konrads.link/learn v1 9c4e1f7a2b6d8e03";

export async function deriveKeys(passphrase) {
  const base = await subtle.importKey("raw", te.encode(passphrase.normalize("NFC")), "PBKDF2", false, ["deriveBits"]);
  const bits = await subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: te.encode(SITE_SALT), iterations: KDF_ITERATIONS },
    base,
    256
  );
  const root = await subtle.importKey("raw", bits, "HKDF", false, ["deriveKey", "deriveBits"]);
  const hkdf = (info) => ({ name: "HKDF", hash: "SHA-256", salt: new Uint8Array(0), info: te.encode(info) });
  const aes = (info) =>
    subtle.deriveKey(hkdf(info), root, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);

  return {
    content: await aes("learn/content"),
    vault: await aes("learn/vault"),
    syncId: hex(new Uint8Array(await subtle.deriveBits(hkdf("learn/sync-id"), root, 128))),
    syncToken: b64url(new Uint8Array(await subtle.deriveBits(hkdf("learn/sync-token"), root, 256)))
  };
}

/* bytes in, { v, iv, ct } out (base64). */
export async function seal(key, purpose, bytes) {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const ct = await subtle.encrypt({ name: "AES-GCM", iv, additionalData: te.encode(purpose) }, key, bytes);
  return { v: 1, iv: b64(iv), ct: b64(new Uint8Array(ct)) };
}

/* Throws on a wrong key or tampered data (AES-GCM authenticates). */
export async function open(key, purpose, envelope) {
  if (!envelope || envelope.v !== 1) throw new Error("unknown envelope version");
  const pt = await subtle.decrypt(
    { name: "AES-GCM", iv: unb64(envelope.iv), additionalData: te.encode(purpose) },
    key,
    unb64(envelope.ct)
  );
  return new Uint8Array(pt);
}

export async function sealJson(key, purpose, value, { gzip = false } = {}) {
  let bytes = te.encode(JSON.stringify(value));
  if (gzip) bytes = await pipe(bytes, new CompressionStream("gzip"));
  return { ...(await seal(key, purpose, bytes)), gz: gzip || undefined };
}

export async function openJson(key, purpose, envelope) {
  let bytes = await open(key, purpose, envelope);
  if (envelope.gz) bytes = await pipe(bytes, new DecompressionStream("gzip"));
  return JSON.parse(td.decode(bytes));
}

async function pipe(bytes, stream) {
  const out = new Response(new Blob([bytes]).stream().pipeThrough(stream));
  return new Uint8Array(await out.arrayBuffer());
}

export async function sha256hex(bytes) {
  return hex(new Uint8Array(await subtle.digest("SHA-256", bytes)));
}

const hex = (u8) => Array.from(u8, (b) => b.toString(16).padStart(2, "0")).join("");

function b64(u8) {
  let s = "";
  for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode(...u8.subarray(i, i + 0x8000));
  return btoa(s);
}

function unb64(s) {
  const bin = atob(s);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8;
}

const b64url = (u8) => b64(u8).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
