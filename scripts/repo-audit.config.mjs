export default [
  // Root hygiene
  {
    description: '.nvmrc contains "20"',
    file: '.nvmrc',
    validate: (content) => /20/.test(content),
    fix: { type: 'write', content: '20\n' }
  },
  {
    description: '.editorconfig exists',
    file: '.editorconfig',
    mustExist: true,
    fix: {
      type: 'write',
      content: `root = true\n\n[*]\ncharset = utf-8\nindent_style = space\nindent_size = 2\nend_of_line = lf\ninsert_final_newline = true\ntrim_trailing_whitespace = true\n`
    }
  },
  {
    description: '.gitignore includes required entries',
    file: '.gitignore',
    validate: (content) => ['node_modules/', '.next/', '.expo/', '.DS_Store', 'coverage/', 'dist/'].every((l) => content.includes(l)),
    fix: { type: 'appendLines', lines: ['node_modules/', '.next/', '.expo/', '.DS_Store', 'coverage/', 'dist/'] }
  },
  {
    description: 'CI workflow present',
    file: '.github/workflows/ci.yml',
    mustExist: true,
    fix: {
      type: 'write',
      content: `name: CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm test\n`
    }
  },

  // Web app
  {
    description: 'Web package.json has Next ^15, React 18 and scripts',
    file: 'apps/web/package.json',
    json: true,
    validate: (json) => {
      const deps = json.dependencies || {}; 
      const scripts = json.scripts || {}; 
      return (
        /^\^15/.test(deps.next || '') &&
        /^18/.test(deps.react || '') &&
        /^18/.test(deps['react-dom'] || '') &&
        ['dev', 'build', 'start', 'lint', 'test', 'e2e'].every((s) => s in scripts)
      );
    }
  },
  {
    description: 'next.config.mjs exports ESM',
    file: 'apps/web/next.config.mjs',
    validate: (content) => /export default/.test(content)
  },
  {
    description: 'tailwind.config.ts defines brand colors and fonts',
    file: 'apps/web/tailwind.config.ts',
    validate: (content) => /0B0B0B/.test(content) && /111111/.test(content) && /D1FF3D/.test(content) && /873BBF/.test(content) && /Inter/.test(content) && /Source Code Pro/.test(content)
  },
  {
    description: 'app/layout.tsx uses fonts and dark html with body styles',
    file: 'apps/web/app/layout.tsx',
    validate: (content) => /next\/font/.test(content) && /Inter/.test(content) && /Source_Code_Pro/.test(content) && /<html className="dark"/.test(content) && /bg-\[#0B0B0B\]/.test(content) && /text-white/.test(content)
  },
  {
    description: 'app/globals.css includes Tailwind base and brand vars',
    file: 'apps/web/app/globals.css',
    validate: (content) => /@tailwind base/.test(content) && /--background: #0B0B0B/.test(content) && /ring-2/.test(content)
  },
  {
    description: 'Logo contains blinking SVG',
    file: 'apps/web/components/Logo.tsx',
    validate: (content) => /id="blinkPath"/.test(content) && /@keyframes blink/.test(content)
  },
  { description: 'vitest config present', file: 'apps/web/vitest.config.ts', mustExist: true },
  {
    description: 'smoke test renders RootLayout and Logo',
    file: 'apps/web/__tests__/smoke.spec.tsx',
    validate: (content) => /RootLayout/.test(content) && /Logo/.test(content)
  },
  { description: 'landing.svg exists', file: 'apps/web/public/landing.svg', mustExist: true },

  // Mobile app
  {
    description: 'babel.config.js uses expo preset and reanimated plugin last',
    file: 'apps/mobile/babel.config.js',
    validate: (content) => /babel-preset-expo/.test(content) && /['"]react-native-reanimated\/plugin['"]\]/.test(content)
  },
  {
    description: 'metro.config.js guards Node builtins and disables hierarchical lookup',
    file: 'apps/mobile/metro.config.js',
    validate: (content) => /expo\/metro-config/.test(content) && /disableHierarchicalLookup/.test(content) && /FORBIDDEN/.test(content)
  },
  {
    description: 'index.js registers root component',
    file: 'apps/mobile/index.js',
    validate: (content) => /registerRootComponent/.test(content)
  },
  {
    description: 'App.tsx imports gesture handler first and wraps with GestureHandlerRootView',
    file: 'apps/mobile/App.tsx',
    validate: (content) => content.trimStart().startsWith("import 'react-native-gesture-handler';") && /GestureHandlerRootView/.test(content)
  },
  {
    description: 'jest.config.js uses jest-expo preset',
    file: 'apps/mobile/jest.config.js',
    validate: (content) => /preset: 'jest-expo'/.test(content)
  },
  {
    description: 'jest.setup.ts mocks required modules',
    file: 'apps/mobile/jest.setup.ts',
    validate: (content) => /PlatformConstants/.test(content) && /NativeAnimatedHelper/.test(content) && /react-native-reanimated/.test(content) && /gesture-handler\/jestSetup/.test(content) && /react-native-screens/.test(content) && /react-native-safe-area-context/.test(content)
  },
  { description: 'expo-dep-guard script exists', file: 'apps/mobile/scripts/expo-dep-guard.mjs', mustExist: true },
  {
    description: 'mobile package.json lacks @types/react-native',
    file: 'apps/mobile/package.json',
    json: true,
    validate: (json) => {
      const deps = { ...json.dependencies, ...json.devDependencies };
      return !('@types/react-native' in deps);
    }
  },

  // Shared & backend
  {
    description: 'schemas package exports zod schemas',
    file: 'packages/schemas/src/index.ts',
    validate: (content) => /zod/.test(content) && /export const/.test(content)
  },
  { description: 'drizzle.config.ts exists', file: 'packages/db/drizzle.config.ts', mustExist: true },
  { description: 'schema.ts exists', file: 'packages/db/src/schema.ts', mustExist: true },
  { description: 'migrations directory exists', file: 'packages/db/migrations', dir: true, mustExist: true },
  { description: 'rls_policies.sql exists', file: 'supabase/sql/rls_policies.sql', mustExist: true },
  { description: 'ingestNews deno.json', file: 'functions/ingestNews/deno.json', mustExist: true },
  { description: 'ingestNews index.ts', file: 'functions/ingestNews/index.ts', mustExist: true },
  { description: 'recommendGigs deno.json', file: 'functions/recommendGigs/deno.json', mustExist: true },
  { description: 'recommendGigs index.ts', file: 'functions/recommendGigs/index.ts', mustExist: true },
  { description: 'moderationHook deno.json', file: 'functions/moderationHook/deno.json', mustExist: true },
  { description: 'moderationHook index.ts', file: 'functions/moderationHook/index.ts', mustExist: true },
  { description: 'verifyArtist deno.json', file: 'functions/verifyArtist/deno.json', mustExist: true },
  { description: 'verifyArtist index.ts', file: 'functions/verifyArtist/index.ts', mustExist: true },

  // Docs
  { description: 'docs/README.md exists', file: 'docs/README.md', mustExist: true },
  { description: 'docs/REQUIREMENTS.md exists', file: 'docs/REQUIREMENTS.md', mustExist: true },
  { description: 'docs/DESIGN.md exists', file: 'docs/DESIGN.md', mustExist: true },
  { description: 'docs/UI_UX_FLOW.md exists', file: 'docs/UI_UX_FLOW.md', mustExist: true },
  { description: 'docs/DEVELOPER_GUIDE.md exists', file: 'docs/DEVELOPER_GUIDE.md', mustExist: true },
  { description: 'docs/DEPLOYMENT.md exists', file: 'docs/DEPLOYMENT.md', mustExist: true },
  { description: 'docs/AGENTS.md exists', file: 'docs/AGENTS.md', mustExist: true },
  { description: 'docs/UPGRADE_V1_TO_V2.md exists', file: 'docs/UPGRADE_V1_TO_V2.md', mustExist: true },

  // Assets assembler
  {
    description: 'assemble-assets.ts exists',
    file: 'scripts/assemble-assets.ts',
    mustExist: true,
    fix: {
      type: 'write',
      content: `import { readFile } from 'fs/promises';\nimport { createHash } from 'crypto';\nimport path from 'path';\n\nasync function verify() {\n  const svgPath = path.join(process.cwd(), 'apps/web/public/landing.svg');\n  const data = await readFile(svgPath);\n  const hash = createHash('sha256').update(data).digest('hex');\n  console.log('landing.svg sha256:', hash);\n}\n\nverify().catch((err) => {\n  console.error(err);\n  process.exit(1);\n});\n`
    }
  }
];
