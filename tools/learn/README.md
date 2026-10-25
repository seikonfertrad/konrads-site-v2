# /learn

A private, encrypted, self-paced copy of the [Fractal Bootcamp curriculum](https://github.com/fractal-nyc/bootcamp-monorepo/tree/main/curriculum)
at [konrads.link/learn](https://konrads.link/learn/).

| Piece | Where |
| --- | --- |
| The path: which files, in what order, with time estimates and solo notes | `tools/learn/manifest.mjs` |
| Fetch, render, encrypt → `public/learn/data/` (gitignored) | `tools/learn/build.mjs` |
| The page shell and styles | `src/pages/learn/index.astro` |
| The app, the vault (progress) and sync | `src/learn/app.js`, `vault.js`, `sync.js` |
| Encryption, shared by build and browser | `src/learn/crypto.js` |
| Optional sync Worker | `workers/learn-sync/` |

## Setup

1. Pick a passphrase of four or more random words (12+ characters; the build refuses shorter ones).
2. GitHub → this repo → Settings → Secrets and variables → Actions → New repository secret:
   `LEARN_PASSPHRASE` = your passphrase.
3. Re-run the deploy (Actions → Deploy to GitHub Pages → Run workflow), or push anything to `main`.

Until the secret exists, /learn shows "isn't set up yet" and the rest of the site deploys as normal.

## Security model

- The curriculum is fetched at build time from a pinned commit and encrypted with AES-256-GCM under a key
  derived from the passphrase (PBKDF2-SHA256, 600,000 iterations, then HKDF). Only ciphertext reaches
  GitHub Pages. Images are encrypted separately and decrypted on demand.
- Your progress, notes and journal are encrypted with a second key from the same passphrase, saved in
  localStorage on every change and, if sync is on, sent to the Worker only as ciphertext.
- The passphrase never leaves the browser and is never stored. "Remember this device" stores
  non-extractable CryptoKeys in IndexedDB. Otherwise the page locks after 30 minutes idle.
- The page loads no analytics or third-party scripts, has a strict Content-Security-Policy, sends no
  referrer, and is excluded from search engines and the sitemap.
- The encrypted bundle is public, so someone could try to guess the passphrase offline. That's why it
  needs to be long: four random words resist that; a short or common phrase doesn't.
- Forget the passphrase and the data is gone. Export a backup from Settings now and then.

## Changing the passphrase

Update the secret and redeploy. On the next unlock the app asks for the old passphrase once, re-encrypts your
progress and, if sync is on, moves the synced copy to the new id and deletes the old one.

## Updating the curriculum

Bump `SOURCE.commit` in `manifest.mjs` and add or move lessons there. Checkbox ids are hashes of each item's
text, so ticks survive a rebuild unless that item's wording changed.

## Local development and tests

    npm run learn:test                                          # crypto, merge, build against a fixture
    LEARN_PASSPHRASE='correct horse battery staple' npm run learn:build   # add -- --src <checkout> to skip the fetch
    npm run build && npm run learn:e2e                          # the page in headless Chromium (needs Playwright)
