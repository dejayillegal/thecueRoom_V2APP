# Testing & E2E

## Quick commands
```bash
# audit + route checks
npm run audit
npm run scan:placeholders
node scripts/check-next-routes.mjs

# web unit + e2e
cd apps/web
npm test
npm run build
npm run e2e         # requires browsers (installed automatically via local-verify)
cd ../..

# mobile unit
cd apps/mobile
npm test
cd ../..
```

## Local Playwright setup

macOS/Windows: npx playwright install (done automatically by ./scripts/local-verify.sh).

Linux: npx playwright install --with-deps to install system libraries.

If Playwright complains about missing dependencies, re-run:

node scripts/playwright-install.mjs

## CI behavior

CI uses npx playwright install --with-deps before running E2E.

Web E2E asserts no console.error on pages and checks key routes (/, /feed, /meme-studio, /playlists, /gig-radar).

## Mobile notes

Jest uses jest-expo with mocks for Reanimated, RNGH, Screens, Safe Area, and Expo ESM modules.

We soft-suppress the noisy “not wrapped in act” warning from async query polling; real errors still fail tests.

## Quick local

```bash
npm i
npm run audit || true

# Web — SSR build & tests
cd apps/web && npm i && npm run build && npm test && cd ../..

# Web — static preview (GH Pages parity)
./scripts/deploy-local-web.sh  # serves http://localhost:4173/<basePath>

# Mobile
cd apps/mobile && npm i && npm run align && npm test && cd ../..
```
