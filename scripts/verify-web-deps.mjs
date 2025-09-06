#!/usr/bin/env node
import { createRequire } from 'module';
import path from 'node:path';
import process from 'node:process';

const req = createRequire(path.resolve('apps/web/package.json'));
function mustResolve(mod) {
  try {
    req.resolve(mod);
    console.log(`[deps] OK: ${mod}`);
  } catch (e) {
    console.error(`[deps] MISSING: ${mod}`);
    process.exit(1);
  }
}
mustResolve('zod');
