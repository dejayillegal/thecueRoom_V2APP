# Visual baselines

`MarketingLanding.reference.png` stores the reference snapshot for the marketing landing page test located at `apps/web/e2e/landing.spec.ts`.

## Update the baseline

Run the Playwright test with the `--update-snapshots` flag after intentional UI changes:

```bash
cd apps/web
npm run e2e -- --update-snapshots
```
