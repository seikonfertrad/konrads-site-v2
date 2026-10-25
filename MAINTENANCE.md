# Maintenance notes

## Open dependency advisories (as of 2026-10-25)

`npm audit fix` was applied on 2026-10-25. What remains needs breaking upgrades.

### Site (root `package.json`) — 5 advisories (1 critical, 3 high, 1 low)

All of them clear with the **Astro 5 → 7** major upgrade (`astro@7.4.1` at the time):

- `astro` (critical): remote allowlist bypass, XSS in `define:vars`, server island parameter issues
- `sharp` (high): inherited libvips/libheif CVEs
- `zod`, `zod-to-ts` (high): memory exhaustion validating oversized collections
- `esbuild` (low): dev-server file read, Windows only

The site is static on GitHub Pages, so most of these only touch the build or dev
server, not visitors. Still worth doing: read the Astro 6 and 7 upgrade guides,
then check `npm run build` and `npm run atlas:audit`, and click through the pages.

### Vote worker (`workers/hyperhelvetica-vote`) — 3 advisories (1 high, 2 moderate)

All in `undici` via `wrangler` → `miniflare`. These are dev dependencies used to
run and deploy the worker locally; they don't ship in the deployed Worker. The fix
is a breaking `wrangler` update (`npm audit fix --force`).

### Worker tests

8 of 16 tests in `npm test` failed in a cloud sandbox both before and after the
2026-10-25 lockfile update. Those tests start `wrangler dev`, so the sandbox may
be the cause. Run them locally to confirm before the `wrangler` upgrade.

## PHP (CVE-2026-109618 / CVE-2026-109619, "PHP2Shell")

Not applicable: there's no PHP in this repo or its hosting (GitHub Pages and a
Cloudflare Worker).
