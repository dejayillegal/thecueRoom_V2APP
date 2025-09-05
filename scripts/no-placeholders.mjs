#!/usr/bin/env node
import { readdirSync, statSync, readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), '.');
const IGNORED_DIRS = new Set(['node_modules', '.next', 'dist', 'coverage']);
const PATTERN = /\b(TODO|FIXME|PLACEHOLDER|lorem ipsum)\b/i;
const allowFile = path.join('scripts', 'no-placeholders.allow');
let allowPatterns = [];
try {
  const lines = readFileSync(allowFile, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
  allowPatterns = lines.map(globToRegExp);
} catch {
  // no allow file
}

function globToRegExp(glob) {
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.');
  return new RegExp('^' + escaped + '$');
}

function isAllowed(p) {
  return allowPatterns.some((re) => re.test(p));
}

const offenders = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (IGNORED_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    const rel = path.relative(ROOT, full);
    if (isAllowed(rel)) continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(full);
    else if (st.size < 1024 * 1024) {
      const content = readFileSync(full, 'utf8');
      const lines = content.split(/\r?\n/);
      lines.forEach((line, idx) => {
        if (line.match(/placeholder\s*=/i)) return;
        if (PATTERN.test(line)) offenders.push(`${rel}:${idx + 1}: ${line.trim()}`);
      });
    }
  }
}

walk(ROOT);

if (offenders.length) {
  console.error('Placeholder text found:');
  for (const o of offenders) console.error('  ' + o);
  process.exit(1);
}
