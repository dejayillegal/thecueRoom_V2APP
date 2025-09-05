import fs from 'fs';

const rootChecks = [
  {
    description: '.nvmrc contains "20"',
    path: '.nvmrc',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing .nvmrc' };
      return /20/.test(content)
        ? { pass: true }
        : { pass: false, message: 'Expected version "20"' };
    },
    fix() {
      return '20\n';
    }
  },
  {
    description: '.editorconfig present with indent rules',
    path: '.editorconfig',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing .editorconfig' };
      return /indent_size\s*=\s*(2|4)/.test(content)
        ? { pass: true }
        : { pass: false, message: 'indent_size must be 2 or 4' };
    },
    fix() {
      return `root = true\n\n[*]\ncharset = utf-8\nindent_style = space\nindent_size = 2\nend_of_line = lf\ninsert_final_newline = true\ntrim_trailing_whitespace = true\n`;
    }
  },
  {
    description: '.gitignore includes node_modules, .next, .expo, .DS_Store, coverage, dist',
    path: '.gitignore',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing .gitignore' };
      const required = ['node_modules', '.next', '.expo', '.DS_Store', 'coverage', 'dist'];
      const missing = required.filter((r) => !content.includes(r));
      return missing.length === 0
        ? { pass: true }
        : { pass: false, message: 'Missing: ' + missing.join(', ') };
    },
    fix({ content = '' }) {
      const required = ['node_modules/', '.next/', '.expo/', '.DS_Store', 'coverage/', 'dist/'];
      const lines = content.split(/\r?\n/);
      const missing = required.filter((r) => !lines.some((l) => l.includes(r.replace('/', ''))));
      return missing.length ? content + (content.endsWith('\n') ? '' : '\n') + missing.join('\n') + '\n' : content;
    }
  },
  {
    description: 'CI workflow exists',
    path: '.github/workflows/ci.yml',
    validate({ exists }) {
      return exists ? { pass: true } : { pass: false, message: 'Missing ci.yml' };
    }
  }
];

const webChecks = [
  {
    description: 'Web package.json has Next ^15, React 18 and required scripts',
    path: 'apps/web/package.json',
    validate({ exists, json }) {
      if (!exists) return { pass: false, message: 'Missing package.json' };
      const deps = json.dependencies || {};
      const scripts = json.scripts || {};
      const depOk = deps.next && deps.next.startsWith('15') && deps.react && deps.react.startsWith('18');
      const requiredScripts = ['dev', 'build', 'start', 'lint', 'test', 'e2e'];
      const missingScripts = requiredScripts.filter((s) => !(s in scripts));
      if (!depOk) return { pass: false, message: 'Next ^15 and React 18 required' };
      if (missingScripts.length) return { pass: false, message: 'Missing scripts: ' + missingScripts.join(', ') };
      return { pass: true };
    }
  },
  {
    description: 'next.config.mjs is ESM without legacy experimental flags',
    path: 'apps/web/next.config.mjs',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing next.config.mjs' };
      const esm = content.includes('export default');
      const legacy = content.includes('experimental');
      return esm && !legacy
        ? { pass: true }
        : { pass: false, message: 'Must export default and avoid experimental flags' };
    }
  },
  {
    description: 'tailwind.config.ts extends brand colors and fonts',
    path: 'apps/web/tailwind.config.ts',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing tailwind.config.ts' };
      const colorsOk = (
        content.includes('#0B0B0B') || content.includes('var(--background)')
      ) && (
        content.includes('#111111') || content.includes('var(--surface)')
      ) && content.includes('#D1FF3D') && content.includes('#873BBF');
      const fontsOk = content.includes('Inter') && content.includes('Source Code Pro');
      return colorsOk && fontsOk
        ? { pass: true }
        : { pass: false, message: 'Missing colors or fonts' };
    }
  },
  {
    description: 'app/layout.tsx uses next/font and dark html with body classes',
    path: 'apps/web/app/layout.tsx',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing layout.tsx' };
      const font = content.includes('next/font');
      const htmlDark = content.includes('className="dark"');
      const body = content.includes('text-white') && (content.includes('bg-background') || content.includes('#0B0B0B'));
      return font && htmlDark && body
        ? { pass: true }
        : { pass: false, message: 'Missing font import or classes' };
    }
  },
  {
    description: 'app/globals.css includes Tailwind base, focus ring and brand vars',
    path: 'apps/web/app/globals.css',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing globals.css' };
      const base = content.includes('@tailwind base');
      const ring = content.includes('ring-2');
      const vars = ['--background', '--surface', '--foreground', '--lime', '--purple'].every((v) => content.includes(v));
      return base && ring && vars
        ? { pass: true }
        : { pass: false, message: 'Missing Tailwind base, focus ring or vars' };
    }
  },
  {
    description: 'Logo.tsx contains canonical blinking SVG',
    path: 'apps/web/components/Logo.tsx',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing Logo.tsx' };
      return content.includes('id="blinkPath"') && content.includes('@keyframes blink')
        ? { pass: true }
        : { pass: false, message: 'Missing blink animation' };
    }
  },
  {
    description: 'vitest config exists',
    path: 'apps/web/vitest.config.ts',
    validate({ exists }) {
      return exists ? { pass: true } : { pass: false, message: 'Missing vitest.config.ts' };
    }
  },
  {
    description: 'smoke test renders RootLayout and Logo',
    path: 'apps/web/__tests__/smoke.spec.tsx',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing smoke test' };
      return content.includes('RootLayout') && content.includes('Logo')
        ? { pass: true }
        : { pass: false, message: 'Test must include RootLayout and Logo' };
    }
  },
  {
    description: 'landing.svg exists',
    path: 'apps/web/public/landing.svg',
    validate({ exists }) {
      return exists ? { pass: true } : { pass: false, message: 'Missing landing.svg' };
    }
  }
];

const mobileChecks = [
  {
    description: 'babel.config.js uses babel-preset-expo and reanimated plugin',
    path: 'apps/mobile/babel.config.js',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing babel.config.js' };
      const preset = content.includes('babel-preset-expo');
      const plugin = /plugins:\s*\[[^\]]*'react-native-reanimated\/plugin'[^\]]*\]/s.test(content);
      return preset && plugin
        ? { pass: true }
        : { pass: false, message: 'Missing preset or plugin' };
    }
  },
  {
    description: 'metro.config.js extends expo config with guards',
    path: 'apps/mobile/metro.config.js',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing metro.config.js' };
      const expo = content.includes('expo/metro-config');
      const guard = content.includes('FORBIDDEN');
      const disable = content.includes('disableHierarchicalLookup');
      return expo && guard && disable
        ? { pass: true }
        : { pass: false, message: 'Missing expo config, guard or disableHierarchicalLookup' };
    }
  },
  {
    description: 'index.js registers root component',
    path: 'apps/mobile/index.js',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing index.js' };
      return content.includes('registerRootComponent')
        ? { pass: true }
        : { pass: false, message: 'registerRootComponent required' };
    }
  },
  {
    description: 'App.tsx imports gesture-handler first and wraps with GestureHandlerRootView',
    path: 'apps/mobile/App.tsx',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing App.tsx' };
      const firstImport = content.trimStart().startsWith("import 'react-native-gesture-handler'");
      const wrapper = content.includes('GestureHandlerRootView');
      return firstImport && wrapper
        ? { pass: true }
        : { pass: false, message: 'Gesture handler import/wrapper missing' };
    }
  },
  {
    description: 'jest.config.js uses jest-expo preset',
    path: 'apps/mobile/jest.config.js',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing jest.config.js' };
      return content.includes("preset: 'jest-expo'")
        ? { pass: true }
        : { pass: false, message: 'preset jest-expo required' };
    }
  },
  {
    description: 'jest.setup.ts mocks necessary modules',
    path: 'apps/mobile/jest.setup.ts',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing jest.setup.ts' };
      const pieces = [
        'PlatformConstants',
        'NativeAnimatedHelper',
        'react-native-reanimated',
        'react-native-gesture-handler/jestSetup',
        'react-native-screens',
        'react-native-safe-area-context'
      ];
      const missing = pieces.filter((p) => !content.includes(p));
      return missing.length === 0
        ? { pass: true }
        : { pass: false, message: 'Missing: ' + missing.join(', ') };
    }
  },
  {
    description: 'expo dependency guard script exists',
    path: 'apps/mobile/scripts/expo-dep-guard.mjs',
    validate({ exists }) {
      return exists ? { pass: true } : { pass: false, message: 'Missing expo-dep-guard.mjs' };
    }
  },
  {
    description: 'mobile package.json does not include @types/react-native',
    path: 'apps/mobile/package.json',
    validate({ exists, json }) {
      if (!exists) return { pass: false, message: 'Missing package.json' };
      const deps = json.dependencies || {};
      const devDeps = json.devDependencies || {};
      const hasTypes = '@types/react-native' in deps || '@types/react-native' in devDeps;
      return hasTypes
        ? { pass: false, message: '@types/react-native must be removed' }
        : { pass: true };
    }
  }
];

const sharedChecks = [
  {
    description: 'packages/schemas exports zod schemas',
    path: 'packages/schemas/src/index.ts',
    validate({ exists, content }) {
      if (!exists) return { pass: false, message: 'Missing schemas index.ts' };
      return content.includes("from 'zod'")
        ? { pass: true }
        : { pass: false, message: 'No zod import found' };
    }
  },
  { description: 'drizzle.config.ts exists', path: 'packages/db/drizzle.config.ts', validate({ exists }) { return exists ? { pass: true } : { pass: false, message: 'Missing drizzle.config.ts' }; } },
  { description: 'schema.ts exists', path: 'packages/db/src/schema.ts', validate({ exists }) { return exists ? { pass: true } : { pass: false, message: 'Missing schema.ts' }; } },
  {
    description: 'migrations directory contains files',
    path: 'packages/db/migrations',
    validate({ path }) {
      try {
        const files = fs.readdirSync(path);
        return files.length ? { pass: true } : { pass: false, message: 'No migrations found' };
      } catch {
        return { pass: false, message: 'Missing migrations directory' };
      }
    }
  },
  {
    description: 'supabase RLS policies exist',
    path: 'supabase/sql/rls_policies.sql',
    validate({ exists }) {
      return exists ? { pass: true } : { pass: false, message: 'Missing rls_policies.sql' };
    }
  },
  ...['ingestNews', 'recommendGigs', 'moderationHook', 'verifyArtist'].flatMap((fn) => [
    {
      description: `${fn} function has deno.json`,
      path: `functions/${fn}/deno.json`,
      validate({ exists }) {
        return exists ? { pass: true } : { pass: false, message: 'Missing deno.json' };
      }
    },
    {
      description: `${fn} function has index.ts`,
      path: `functions/${fn}/index.ts`,
      validate({ exists }) {
        return exists ? { pass: true } : { pass: false, message: 'Missing index.ts' };
      }
    }
  ])
];

const docsChecks = [
  'README.md',
  'REQUIREMENTS.md',
  'DESIGN.md',
  'UI_UX_FLOW.md',
  'DEVELOPER_GUIDE.md',
  'DEPLOYMENT.md',
  'AGENTS.md',
  'UPGRADE_V1_TO_V2.md'
].map((file) => ({
  description: `docs/${file} exists`,
  path: `docs/${file}`,
  validate({ exists }) {
    return exists ? { pass: true } : { pass: false, message: 'Missing ' + file };
  }
}));

const assetChecks = [
  {
    description: 'scripts/assemble-assets.ts exists',
    path: 'scripts/assemble-assets.ts',
    validate({ exists }) {
      return exists ? { pass: true } : { pass: false, message: 'Missing assemble-assets.ts' };
    },
    fix() {
      return `// Placeholder asset assembler. Implement SHA-256 verification here.\n`;
    }
  }
];

export default [
  ...rootChecks,
  ...webChecks,
  ...mobileChecks,
  ...sharedChecks,
  ...docsChecks,
  ...assetChecks
];
