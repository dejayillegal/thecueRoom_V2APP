import { readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

async function main() {
  const pkgPath = path.join(ROOT, 'package.json');
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));

  pkg.devDependencies = pkg.devDependencies ?? {};
  delete pkg.devDependencies['@types/react-native'];
  pkg.devDependencies['jest-expo'] = '~50.0.4';
  pkg.devDependencies['typescript'] = '^5.3.0';
  pkg.devDependencies['@types/react'] = '~18.2.45';

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

  await new Promise((resolve, reject) => {
    const child = spawn('npx', ['expo', 'install', '--fix'], {
      cwd: ROOT,
      stdio: 'inherit'
    });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error('expo install --fix failed'));
    });
  });
}

main().catch((err) => {
  console.error('[fix-expo-versions]', err);
  process.exit(1);
});
