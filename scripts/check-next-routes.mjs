import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const appDir = path.join(root, 'apps', 'web', 'app');

if (!fs.existsSync(appDir)) {
  console.log('[routes-check] apps/web/app not found — skipping');
  process.exit(0);
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

// normalize route key by stripping route groups "(...)" from segments
function normalizeRouteKey(p) {
  const rel = path.relative(appDir, p).replace(/\\/g, '/');
  // only consider page.tsx(/ts)?
  if (!/\/page\.tsx?$/.test(rel)) return null;
  const segments = rel.split('/').slice(0, -1);
  const cleaned = segments
    .map((s) => (s.startsWith('(') && s.endsWith(')') ? '' : s))
    .filter(Boolean)
    .join('/');
  return '/' + cleaned;
}

const byKey = new Map();
for (const file of walk(appDir)) {
  const key = normalizeRouteKey(file);
  if (!key) continue;
  if (!byKey.has(key)) byKey.set(key, []);
  byKey.get(key).push(file);
}

let dupes = [];
for (const [key, files] of byKey) {
  if (files.length > 1) dupes.push({ key, files });
}

if (dupes.length) {
  console.error('Duplicate Next.js pages that resolve to the same route:');
  for (const d of dupes) {
    console.error(`  ${d.key}`);
    d.files.forEach((f) => console.error(`    - ${path.relative(root, f)}`));
  }
  process.exit(1);
} else {
  console.log('[routes-check] OK — no duplicate pages');
}
