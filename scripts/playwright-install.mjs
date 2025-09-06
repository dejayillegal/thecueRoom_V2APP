#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import os from 'node:os';

function run(cmd, args, cwd) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const platform = os.platform();
// Always install browsers in apps/web; CI already installs with deps
const cwd = 'apps/web';

if (platform === 'linux') {
  // Installs browsers + system deps (headless CI parity)
  run('npx', ['playwright', 'install', '--with-deps'], cwd);
} else {
  // macOS/Windows don’t need apt; standard install is enough
  run('npx', ['playwright', 'install'], cwd);
}

console.log('[playwright-install] OK');
