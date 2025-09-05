#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import checks from './repo-audit.config.mjs';

const cwd = process.cwd();
const fix = process.argv.includes('--fix');
const results = [];

for (const check of checks) {
  const filePath = path.join(cwd, check.path);
  let exists = false;
  let content = '';
  let json = null;

  try {
    await fs.access(filePath);
    exists = true;
    try {
      content = await fs.readFile(filePath, 'utf8');
      if (filePath.endsWith('.json')) {
        json = JSON.parse(content);
      }
    } catch {
      // ignore read/parse errors
    }
  } catch {
    exists = false;
  }

  let res = await check.validate({ exists, content, json, path: filePath });
  if (!res.pass && fix && check.fix) {
    const newContent = await check.fix({ exists, content, json, path: filePath });
    if (typeof newContent === 'string') {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, newContent);
      try {
        const updated = await fs.readFile(filePath, 'utf8');
        content = updated;
        exists = true;
        if (filePath.endsWith('.json')) json = JSON.parse(updated);
      } catch {}
      res = await check.validate({ exists, content, json, path: filePath });
    }
  }

  results.push({ Check: check.description, Status: res.pass ? 'PASS' : 'FAIL', Details: res.message || '' });
}

console.table(results);
const allPass = results.every((r) => r.Status === 'PASS');
process.exit(allPass ? 0 : 1);
