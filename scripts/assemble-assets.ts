import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const src = resolve('MarketingLanding.svg');
const targets = [
  'apps/web/public/landing.svg',
  'apps/mobile/src/assets/MarketingLanding.svg',
];

for (const rel of targets) {
  const out = resolve(rel);
  mkdirSync(dirname(out), { recursive: true });
  copyFileSync(src, out);
  console.log(`[assemble-assets] Copied to ${rel}`);
}
