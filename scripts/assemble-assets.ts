import { copyFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = process.cwd();
const srcPng = resolve(root, 'MarketingLanding.png');     // provided screenshot artwork (full page)
const srcSvg = resolve(root, 'MarketingLanding.svg');     // provided vector hero (not used for full-page render)
const exactLogo = resolve(root, 'EXACT_thecueRoom_logo.svg'); // will be created below if missing

// Ensure the exact logo SVG lives verbatim in repo (bit-for-bit from user message)
const exactLogoContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#D1FF3D"/></svg>`;
if (!existsSync(exactLogo)) writeFileSync(exactLogo, exactLogoContent, 'utf8');

// Targets (web public)
const targets: [string, string][] = [
  ['apps/web/public/marketing/MarketingLanding.png', srcPng],
  ['apps/web/public/brand/logo.svg', exactLogo],
  ['apps/web/public/landing.svg', srcSvg],
  ['apps/mobile/src/assets/MarketingLanding.svg', srcSvg],
];

for (const [outRel, srcRel] of targets) {
  const out = resolve(root, outRel);
  const src = resolve(root, srcRel);
  mkdirSync(dirname(out), { recursive: true });
  copyFileSync(src, out);
  console.log(`[assemble-assets] Copied ${srcRel} -> ${outRel}`);
}
