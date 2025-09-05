import fs from 'node:fs';
import path from 'node:path';
import { checks } from './repo-audit.config.mjs';

function read(p){ return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null; }
function testAll(txt, regexes){ for (const {re,flags} of regexes){ if(!(new RegExp(re,flags)).test(txt)) return false; } return true; }
function jsonCheck(txt, j){
  try {
    const pkg = JSON.parse(txt);
    const all = { ...(pkg.dependencies||{}), ...(pkg.devDependencies||{}) };
    if (j.disallowDeps) for (const bad of j.disallowDeps) if (all[bad]) return `disallowed:${bad}`;
    if (j.requireScripts) for (const s of j.requireScripts) if (!pkg.scripts || !pkg.scripts[s]) return `missingScript:${s}`;
    return null;
  } catch { return 'invalidJSON'; }
}

let failed = 0;
for (const c of checks){
  const abs = path.resolve(process.cwd(), c.path);
  const txt = read(abs);
  if (c.mustExist && !txt){ console.error(`FAIL: ${c.path} missing`); failed++; continue; }
  if (txt && c.regexes && !testAll(txt, c.regexes)){ console.error(`FAIL: ${c.path} missing required snippet`); failed++; continue; }
  if (txt && c.json){ const err = jsonCheck(txt, c.json); if (err){ console.error(`FAIL: ${c.path} ${err}`); failed++; continue; } }
  console.log(`PASS: ${c.path}`);
}
if (failed){ console.error(`\nAudit failed with ${failed} issue(s).`); process.exit(1); }
console.log('\nAudit PASS ✅');

