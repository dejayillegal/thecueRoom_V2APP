import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = process.cwd();
const src = resolve(root, 'MarketingLanding.svg');
const targets = [
  'apps/web/public/landing.svg',
  'apps/mobile/src/assets/MarketingLanding.svg',
];

if (!existsSync(src)) {
  console.log('[assemble-assets] MarketingLanding.svg not found at repo root, skipping.');
  process.exit(0);
}

for (const rel of targets) {
  const out = resolve(root, rel);
  mkdirSync(dirname(out), { recursive: true });
  copyFileSync(src, out);
  console.log(`[assemble-assets] Copied to ${rel}`);
}
