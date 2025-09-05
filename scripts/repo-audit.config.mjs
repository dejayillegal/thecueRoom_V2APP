// Configuration for repo auditor checks
export const functionNames = ['ingestNews', 'recommendGigs', 'moderationHook', 'verifyArtist'];
export const docsFiles = [
  'README.md',
  'REQUIREMENTS.md',
  'DESIGN.md',
  'UI_UX_FLOW.md',
  'DEVELOPER_GUIDE.md',
  'DEPLOYMENT.md',
  'AGENTS.md',
  'UPGRADE_V1_TO_V2.md'
];

export default [
  // Root hygiene
  {
    id: 'nvmrc-version',
    path: '.nvmrc',
    type: 'regex',
    pattern: /^20\s*$/m,
    fix: '20\n'
  },
  {
    id: 'editorconfig-exists',
    path: '.editorconfig',
    type: 'exists',
    fix: `root = true\n\n[*]\nindent_style = space\nindent_size = 2\n`
  },
  {
    id: 'gitignore-entries',
    path: '.gitignore',
    type: 'includes',
    lines: ['node_modules', '.next', '.expo', '.DS_Store', 'coverage', 'dist']
  },
  {
    id: 'ci-workflow',
    path: '.github/workflows/ci.yml',
    type: 'exists',
    fix: '# CI workflow placeholder\n'
  },

  // Web app checks
  {
    id: 'web-package-next',
    path: 'apps/web/package.json',
    type: 'json',
    property: ['dependencies', 'next'],
    pattern: '^\\^15',
    fixValue: '^15.0.0'
  },
  {
    id: 'web-package-react',
    path: 'apps/web/package.json',
    type: 'json',
    property: ['dependencies', 'react'],
    pattern: '^18',
    fixValue: '18.2.0'
  },
  { id: 'web-script-dev', path: 'apps/web/package.json', type: 'json', property: ['scripts', 'dev'], fixValue: 'next dev' },
  { id: 'web-script-build', path: 'apps/web/package.json', type: 'json', property: ['scripts', 'build'], fixValue: 'next build' },
  { id: 'web-script-start', path: 'apps/web/package.json', type: 'json', property: ['scripts', 'start'], fixValue: 'next start' },
  { id: 'web-script-lint', path: 'apps/web/package.json', type: 'json', property: ['scripts', 'lint'], fixValue: 'next lint' },
  { id: 'web-script-test', path: 'apps/web/package.json', type: 'json', property: ['scripts', 'test'], fixValue: 'vitest' },
  { id: 'web-script-e2e', path: 'apps/web/package.json', type: 'json', property: ['scripts', 'e2e'], fixValue: 'playwright test' },
  {
    id: 'web-next-config-esm',
    path: 'apps/web/next.config.mjs',
    type: 'regex',
    pattern: /export default/,
    fix: 'export default {}\n'
  },
  {
    id: 'web-next-config-no-experimental',
    path: 'apps/web/next.config.mjs',
    type: 'notRegex',
    pattern: /experimental/
  },
  {
    id: 'web-tailwind-colors',
    path: 'apps/web/tailwind.config.ts',
    type: 'regex',
    pattern: /0B0B0B|111111|D1FF3D|873BBF/
  },
  {
    id: 'web-tailwind-fonts',
    path: 'apps/web/tailwind.config.ts',
    type: 'regex',
    pattern: /Inter|Source Code Pro/
  },
  { id: 'web-layout-font', path: 'apps/web/app/layout.tsx', type: 'regex', pattern: /next\/?font/ },
  { id: 'web-layout-html', path: 'apps/web/app/layout.tsx', type: 'regex', pattern: /<html className="dark"/ },
  { id: 'web-layout-body', path: 'apps/web/app/layout.tsx', type: 'regex', pattern: /bg-\[#0B0B0B\].*text-white/ },
  { id: 'web-globals-tailwind-base', path: 'apps/web/app/globals.css', type: 'regex', pattern: /@tailwind base/ },
  { id: 'web-globals-focus-ring', path: 'apps/web/app/globals.css', type: 'regex', pattern: /focus:ring/ },
  { id: 'web-globals-brand-vars', path: 'apps/web/app/globals.css', type: 'regex', pattern: /--color-brand/ },
  { id: 'web-logo-svg', path: 'apps/web/components/Logo.tsx', type: 'regex', pattern: /id="blinkPath"/ },
  { id: 'web-logo-keyframes', path: 'apps/web/components/Logo.tsx', type: 'regex', pattern: /@keyframes/ },
  { id: 'web-vitest-config', path: 'apps/web/vitest.config.ts', type: 'exists', fix: "import { defineConfig } from 'vitest/config';\nexport default defineConfig({});\n" },
  { id: 'web-smoke-test', path: 'apps/web/__tests__/smoke.test.tsx', type: 'exists', fix: "import { render } from '@testing-library/react';\nimport RootLayout from '../app/layout';\nimport Logo from '../components/Logo';\ntest('smoke', () => { render(<RootLayout><Logo /></RootLayout>); });\n" },
  { id: 'web-landing-svg', path: 'apps/web/public/landing.svg', type: 'exists' },

  // Mobile app
  { id: 'mobile-babel-preset', path: 'apps/mobile/babel.config.js', type: 'regex', pattern: /babel-preset-expo/ },
  { id: 'mobile-babel-reanimated', path: 'apps/mobile/babel.config.js', type: 'regex', pattern: /react-native-reanimated\/plugin[^]*$/ },
  { id: 'mobile-metro-expo-config', path: 'apps/mobile/metro.config.js', type: 'regex', pattern: /expo\/metro-config/ },
  { id: 'mobile-metro-disable-hierarchical', path: 'apps/mobile/metro.config.js', type: 'regex', pattern: /disableHierarchicalLookup/ },
  { id: 'mobile-index-register', path: 'apps/mobile/index.js', type: 'regex', pattern: /registerRootComponent|AppRegistry/ },
  { id: 'mobile-app-gesture-import', path: 'apps/mobile/App.tsx', type: 'regex', pattern: /import 'react-native-gesture-handler'/ },
  { id: 'mobile-app-gesture-wrapper', path: 'apps/mobile/App.tsx', type: 'regex', pattern: /GestureHandlerRootView/ },
  { id: 'mobile-jest-config', path: 'apps/mobile/jest.config.js', type: 'regex', pattern: /preset:\s*'jest-expo'/ },
  { id: 'mobile-jest-setup-platform', path: 'apps/mobile/jest.setup.ts', type: 'regex', pattern: /PlatformConstants/ },
  { id: 'mobile-jest-setup-native', path: 'apps/mobile/jest.setup.ts', type: 'regex', pattern: /NativeAnimatedHelper/ },
  { id: 'mobile-jest-setup-reanimated', path: 'apps/mobile/jest.setup.ts', type: 'regex', pattern: /react-native-reanimated/ },
  { id: 'mobile-jest-setup-rngh', path: 'apps/mobile/jest.setup.ts', type: 'regex', pattern: /RNGH jestSetup/ },
  { id: 'mobile-jest-setup-screens', path: 'apps/mobile/jest.setup.ts', type: 'regex', pattern: /react-native-screens/ },
  { id: 'mobile-jest-setup-safe-area', path: 'apps/mobile/jest.setup.ts', type: 'regex', pattern: /react-native-safe-area-context/ },
  { id: 'mobile-expo-dep-guard', path: 'apps/mobile/scripts/expo-dep-guard.mjs', type: 'exists', fix: "#!/usr/bin/env node\nconsole.log('expo dependency guard');\n" },
  { id: 'mobile-no-types-react-native', path: 'apps/mobile/package.json', type: 'jsonNot', property: ['devDependencies', '@types/react-native'] },

  // Shared and backend
  { id: 'schemas-exports', path: 'packages/schemas/src/index.ts', type: 'regex', pattern: /export.*z/ },
  { id: 'db-drizzle-config', path: 'packages/db/drizzle.config.ts', type: 'exists', fix: 'export default {};\n' },
  { id: 'db-schema', path: 'packages/db/src/schema.ts', type: 'exists', fix: 'export const schema = {};\n' },
  { id: 'db-migrations', path: 'packages/db/migrations', type: 'dir' },
  { id: 'supabase-rls', path: 'supabase/sql/rls_policies.sql', type: 'exists', fix: '-- RLS policies\n' },
  ...functionNames.flatMap(name => ([
    { id: `func-${name}-deno`, path: `functions/${name}/deno.json`, type: 'exists', fix: '{\n  "imports": {}\n}\n' },
    { id: `func-${name}-index`, path: `functions/${name}/index.ts`, type: 'exists', fix: `export function ${name}(){}\n` }
  ])),

  // Docs
  ...docsFiles.map(f => ({
    id: `docs-${f}`,
    path: `docs/${f}`,
    type: 'exists',
    fix: `# ${f.replace(/\.md$/, '')}\n`
  })),

  // Assets assembler
  {
    id: 'assemble-assets-script',
    path: 'scripts/assemble-assets.ts',
    type: 'exists',
    fix: "import fs from 'fs';\nconsole.log('assemble assets');\n"
  }
];
