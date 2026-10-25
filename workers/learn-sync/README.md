# learn-sync

Optional progress sync for [konrads.link/learn](https://konrads.link/learn/): a Cloudflare Worker with one D1
table. Without it, /learn keeps your progress encrypted in the browser and you move it between devices with
encrypted backup files (Settings → Backup).

## What it stores

One row per vault: an id, a SHA-256 of a bearer token, a revision number and an encrypted blob. The browser
derives the id, the token and the encryption key from your passphrase (see `src/learn/crypto.js`), so the
Worker never sees a key, can't read your progress, and can't tie a vault to you.

- The first write to an id claims it; after that the token must match (403 otherwise).
- Writes name the revision they're based on. A stale write gets 409 and the current copy, and the app merges.
- At most `MAX_VAULTS` (3) vaults exist, so nobody else can use it as free storage.
- Only `ALLOWED_ORIGINS` can call it.

## Test

    npm install
    npm test        # endpoints and the app's real sync client, against wrangler dev with a throwaway local D1

## Deploy (first time)

    npx wrangler login
    npx wrangler d1 create learn-sync                 # put the database_id into wrangler.toml
    npx wrangler d1 migrations apply learn-sync --remote
    npx wrangler deploy                               # prints the workers.dev URL

Then either paste that URL into /learn → Settings → Sync on each device, or set it as `DEFAULT_SYNC_URL` in
`src/learn/app.js` and push the site. The page's Content-Security-Policy allows `https://*.workers.dev`; if you
put the Worker on a custom domain, add it to `connect-src` in `src/pages/learn/index.astro`.
