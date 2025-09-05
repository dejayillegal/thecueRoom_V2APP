/* exact regex checks */
export const checks = [
  { path: '.nvmrc', mustExist: true, regexes: [{ re: '^\\s*20(\\.\\d+)?\\s*$', flags: 'm' }] },
  { path: '.editorconfig', mustExist: true, regexes: [{ re: '^root\\s*=\\s*true', flags: 'm' }] },
  { path: '.gitignore', mustExist: true, regexes: [
    { re: '^node_modules\\/?$', flags: 'm' },
    { re: '^\\.next\\/?$', flags: 'm' },
    { re: '^\\.expo\\/?$', flags: 'm' },
    { re: '^\\.DS_Store\\/?$', flags: 'm' },
    { re: '^coverage\\/?$', flags: 'm' },
    { re: '^dist\\/?$', flags: 'm' },
  ]},
  { path: '.github/workflows/ci.yml', mustExist: true, regexes: [
    { re: 'actions/setup-node@v4', flags: 'm' },
    { re: 'node-version:\\s*20\\b', flags: 'm' },
  ]},

  // Web brand + landing
  { path: 'apps/web/app/layout.tsx', mustExist: true, regexes: [
    { re: "from\\s+['\"]next/font/google['\"]", flags: 'm' },
    { re: '<html[^>]*className=[\'\"][^\'\"]*\\bdark\\b', flags: 'm' },
  ]},
  { path: 'apps/web/app/globals.css', mustExist: true, regexes: [
    { re: '--bg:\\s*#0B0B0B\\b', flags: 'i' },
    { re: '--surface:\\s*#111111\\b', flags: 'i' },
    { re: '--lime:\\s*#D1FF3D\\b', flags: 'i' },
    { re: '--purple:\\s*#873BBF\\b', flags: 'i' },
  ]},
  { path: 'apps/web/components/Logo.tsx', mustExist: true, regexes: [
    { re: 'dangerouslySetInnerHTML', flags: 'm' },
    { re: 'id=[\'\"]blinkPath[\'\"]', flags: 'm' },
    { re: '@keyframes\\s+blink', flags: 'm' },
    { re: 'prefers-reduced-motion:\\s*reduce', flags: 'mi' },
  ]},
  { path: 'apps/web/public/landing.svg', mustExist: true, regexes: [
    { re: '^<svg\\b', flags: 'm' }, { re: 'viewBox=', flags: 'm' },
  ]},

  // Mobile: Metro/Babel/Jest wiring
  { path: 'apps/mobile/metro.config.js', mustExist: true, regexes: [
    { re: 'expo/metro-config', flags: 'm' },
    { re: 'getDefaultConfig\\(', flags: 'm' },
    { re: 'FORBIDDEN', flags: 'm' },
    { re: 'disableHierarchicalLookup\\s*=\\s*true', flags: 'm' },
  ]},
  { path: 'apps/mobile/babel.config.js', mustExist: true, regexes: [
    { re: 'babel-preset-expo', flags: 'm' },
    { re: 'react-native-reanimated\\/plugin', flags: 'm' },
  ]},
  { path: 'apps/mobile/jest.config.js', mustExist: true, regexes: [
    { re: "preset:\\s*'jest-expo'", flags: 'm' },
  ]},
  { path: 'apps/mobile/jest.setup.ts', mustExist: true, regexes: [
    { re: 'PlatformConstants', flags: 'm' },
    { re: 'NativeAnimatedHelper', flags: 'm' },
    { re: 'react-native-reanimated', flags: 'm' },
    { re: 'react-native-gesture-handler\\/jestSetup', flags: 'm' },
    { re: 'react-native-screens', flags: 'm' },
    { re: 'react-native-safe-area-context', flags: 'm' },
  ]},
  { path: 'apps/mobile/package.json', mustExist: true, json: {
    disallowDeps: ['@types/react-native'],
    requireScripts: ['doctor','align','test','lint'],
  }},
];

