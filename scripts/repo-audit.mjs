import fs from 'node:fs';
import path from 'node:path';
import { checks } from './repo-audit.config.mjs';

const results = [];
let failed = 0;

function read(p) { return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null; }

for (const c of checks) {
  const abs = path.resolve(process.cwd(), c.path);
  const txt = read(abs);

  if (c.mustExist && !txt) {
    results.push([c.path, 'FAIL', 'Missing file']); failed++; continue;
  }

  if (txt && c.regexes) {
    for (const { re, flags } of c.regexes) {
      const rx = new RegExp(re, flags);
      if (!rx.test(txt)) { results.push([c.path, 'FAIL', `Missing snippet /${re}/${flags||''}`]); failed++; break; }
    }
    if (results.at(-1)?.[0] !== c.path) results.push([c.path, 'PASS', '']);
  } else if (txt && c.json) {
    try {
      const j = JSON.parse(txt);
      if (c.json.requireScripts) {
        for (const s of c.json.requireScripts) {
          if (!j.scripts || !j.scripts[s]) { results.push([c.path, 'FAIL', `Missing script "${s}"`]); failed++; }
        }
        if (!results.some(r => r[0] === c.path && r[1] === 'FAIL')) results.push([c.path, 'PASS', '']);
      } else results.push([c.path, 'PASS', '']);
    } catch {
      results.push([c.path, 'FAIL', 'Invalid JSON']); failed++;
    }
  } else if (c.mustExist) {
    results.push([c.path, 'PASS', '']);
  }
}

const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);
console.log('┌─────────┬───────────────────────────────────────────────┬────────┬──────────────────────────┐');
console.log('│ Index   │ Check                                         │ Status │ Note                     │');
console.log('├─────────┼───────────────────────────────────────────────┼────────┼──────────────────────────┤');
results.forEach((r, i) => {
  console.log(`│ ${pad(String(i),7)} │ ${pad(r[0], 45)} │ ${pad(r[1],6)} │ ${pad(r[2], 24)} │`);
});
console.log('└─────────┴───────────────────────────────────────────────┴────────┴──────────────────────────┘');

if (failed) process.exit(1);
console.log('Audit PASS ✅');
