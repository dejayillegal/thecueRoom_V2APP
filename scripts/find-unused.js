#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const exts = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.svg', '.png', '.jpg', '.jpeg', '.gif'];

async function readAllFiles() {
  return await glob('**/*.{ts,tsx,js,jsx,css,scss,svg,png,jpg,jpeg,gif}', {
    cwd: root,
    ignore: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.git/**',
      '**/out/**'
    ],
    dot: true,
  });
}

function findReferences(files) {
  const content = files.map(f => {
    try {
      return fs.readFileSync(path.join(root, f), 'utf8');
    } catch {
      return '';
    }
  }).join('\n');
  
  return (needle) => content.includes(needle);
}

async function main() {
  try {
    const files = await readAllFiles();
    const isReferenced = findReferences(files);
    const candidates = files.filter(f => exts.includes(path.extname(f)));

    const unused = candidates.filter(f => {
      // Never treat canonical logo as unused
      if (f.endsWith('apps/web/public/logo.svg') || f.endsWith('EXACT_thecueRoom_logo.svg')) {
        return false;
      }
      
      // Skip test files and config files
      if (f.includes('.test.') || f.includes('.spec.') || f.includes('config.')) {
        return false;
      }
      
      const base = path.basename(f);
      const nameWithoutExt = path.basename(f, path.extname(f));
      
      // Check if file is referenced by name or import
      return !isReferenced(base) && !isReferenced(nameWithoutExt);
    });

    if (unused.length) {
      console.log('UNUSED FILES:');
      unused.forEach(f => console.log(' -', f));
      console.log(`\nFound ${unused.length} potentially unused files.`);
      console.log('Please review manually before deleting.');
      process.exitCode = 1;
    } else {
      console.log('✅ No obviously unused files found.');
    }
  } catch (error) {
    console.error('Error finding unused files:', error);
    process.exitCode = 1;
  }
}

main();
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const WHITELIST = [
  'logo.svg',
  'EXACT_thecueRoom_logo.svg',
  'MarketingLanding.svg',
  'MarketingLanding.png',
  '.replit',
  'replit.nix',
  'README.md',
  'package.json',
  'pnpm-lock.yaml',
  'tsconfig.json',
  '.gitignore',
  '.env.example',
  'next-env.d.ts'
];

function findUnusedFiles() {
  const allFiles = glob.sync('**/*', {
    ignore: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'out/**',
      '.git/**',
      'coverage/**'
    ]
  });

  const referencedFiles = new Set();
  
  // Add whitelisted files
  WHITELIST.forEach(file => referencedFiles.add(file));

  // Scan for file references in code
  allFiles.forEach(file => {
    if (fs.statSync(file).isFile()) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Look for imports, requires, and asset references
      const matches = content.match(/(?:import|require|from|src=|href=)["']([^"']+)["']/g);
      if (matches) {
        matches.forEach(match => {
          const filePath = match.match(/["']([^"']+)["']/)?.[1];
          if (filePath && !filePath.startsWith('http')) {
            referencedFiles.add(path.basename(filePath));
          }
        });
      }
    }
  });

  const unusedFiles = allFiles.filter(file => {
    const basename = path.basename(file);
    return fs.statSync(file).isFile() && 
           !referencedFiles.has(basename) && 
           !referencedFiles.has(file);
  });

  if (unusedFiles.length > 0) {
    console.error('Unused files found:');
    unusedFiles.forEach(file => console.error(`  ${file}`));
    process.exit(1);
  } else {
    console.log('No unused files found.');
  }
}

findUnusedFiles();
