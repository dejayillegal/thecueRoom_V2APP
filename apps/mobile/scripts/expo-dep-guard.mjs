import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const ROOT = process.cwd();
const isCI = process.argv.includes('--ci');

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  if (res.status !== 0) {
    console.error(`\n[guard] Command failed: ${cmd} ${args.join(' ')}`);
    process.exit(res.status ?? 1);
  }
}
function checkContains(file, needles) {
  const p = path.join(ROOT, file);
  if (!existsSync(p)) { console.error(`[guard] Missing file: ${file}`); process.exit(1); }
  const s = readFileSync(p, 'utf8');
  for (const n of needles) {
    if (!s.includes(n)) { console.error(`[guard] ${file} missing required snippet: ${n}`); process.exit(1); }
  }
  return s;
}

const doctor = (() => {
  const tryCmd = (cmd, args) => spawnSync(cmd, args, { stdio: 'pipe' });
  const a = tryCmd('npx', ['expo-doctor', '--version']);
  if (a.status === 0) return ['expo-doctor'];      // npx expo-doctor exists
  return ['expo', 'doctor'];                       // fallback (classic)
})();

console.log('\n[guard] Expo dependency alignment — start');
run('npx', doctor);
run('npx', ['expo', 'install', '--fix']); // align all managed deps
run('npx', ['expo', 'install', 'react-native-screens', 'react-native-safe-area-context']); // re-pin

checkContains('babel.config.js', ['babel-preset-expo','react-native-reanimated/plugin']);
checkContains('metro.config.js', ['expo/metro-config','getDefaultConfig','FORBIDDEN','disableHierarchicalLookup']);
checkContains('jest.config.js', ["preset: 'jest-expo'"]);
checkContains('jest.setup.ts', [
  'NativeAnimatedHelper',
  'react-native-reanimated',
  'react-native-gesture-handler/jestSetup',
  'react-native-screens',
  'react-native-safe-area-context',
  'PlatformConstants',
]);

if (os.platform() === 'darwin') run('npx', ['pod-install']);

console.log('[guard] Expo dependency alignment — OK');

