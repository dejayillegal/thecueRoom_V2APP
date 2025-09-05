#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import config from './repo-audit.config.mjs';

const fixMode = process.argv.includes('--fix');

async function fileExists(p, dir = false) {
  try {
    const stat = await fs.stat(p);
    return dir ? stat.isDirectory() : stat.isFile();
  } catch {
    return false;
  }
}

async function applyFix(check, filePath, exists, content) {
  if (!check.fix) return;
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const fix = check.fix;
  if (fix.type === 'write') {
    await fs.writeFile(filePath, fix.content);
  } else if (fix.type === 'appendLines') {
    const lines = exists ? content.split(/\r?\n/) : [];
    const toAdd = fix.lines.filter((l) => !lines.includes(l));
    if (toAdd.length) {
      const nl = content && !content.endsWith('\n') ? '\n' : '';
      await fs.writeFile(filePath, (content || '') + nl + toAdd.join('\n') + '\n');
    }
  }
}

async function run() {
  const results = [];
  for (const check of config) {
    const filePath = path.join(process.cwd(), check.file);
    const exists = await fileExists(filePath, check.dir);
    let content = null;
    if (exists && !check.dir) {
      if (check.json) {
        try {
          content = JSON.parse(await fs.readFile(filePath, 'utf8'));
        } catch {
          content = null;
        }
      } else {
        content = await fs.readFile(filePath, 'utf8');
      }
    }

    let ok = true;
    if (check.mustExist && !exists) ok = false;
    if (ok && check.validate) {
      try {
        ok = await check.validate(content);
      } catch {
        ok = false;
      }
    }

    if (!ok && fixMode) {
      await applyFix(check, filePath, exists, content);
      const reExists = await fileExists(filePath, check.dir);
      if (reExists && !check.dir) {
        if (check.json) {
          content = JSON.parse(await fs.readFile(filePath, 'utf8'));
        } else {
          content = await fs.readFile(filePath, 'utf8');
        }
      }
      if (check.mustExist && !reExists) {
        ok = false;
      } else if (check.validate) {
        ok = await check.validate(content);
      } else {
        ok = reExists;
      }
    }

    results.push({
      description: check.description || check.file,
      ok,
      remediation: ok ? '' : check.remediation || (check.fix ? 'Run with --fix or apply manually' : 'Manual fix required')
    });
  }

  console.table(results.map((r) => ({ Check: r.description, Status: r.ok ? 'PASS' : 'FAIL', Remediation: r.remediation })));
  const failed = results.filter((r) => !r.ok).length;
  if (failed > 0) {
    process.exit(1);
  }
}

run();
