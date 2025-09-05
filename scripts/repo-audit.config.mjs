export const checks = [
  { path: '.nvmrc', mustExist: true },
  { path: '.editorconfig', mustExist: true },
  { path: '.gitignore', mustExist: true },
  { path: '.github/workflows/ci.yml', mustExist: true },

  // Web basics
  { path: 'apps/web/package.json', mustExist: true, json: { requireScripts: ['lint','test','build'] } },
  { path: 'apps/web/app/layout.tsx', mustExist: true, regexes: [
      { re: "from\\s+['\"]next/font/google['\"]", flags: "m", why: "fonts via next/font" },
      { re: "<html[^>]*className=[\"']dark[\"']", flags: "m", why: "dark class on <html>" }
  ]},
  { path: 'apps/web/app/globals.css', mustExist: true, regexes: [
      { re: "--bg:\\s*#0B0B0B", flags: "i" },
      { re: "--lime:\\s*#D1FF3D", flags: "i" },
      { re: "--purple:\\s*#873BBF", flags: "i" }
  ]},
  { path: 'apps/web/public/landing.svg', mustExist: true },

  // Mobile basics
  { path: 'apps/mobile/package.json', mustExist: true, json: { requireScripts: ['align'] } },
  { path: 'apps/mobile/scripts/expo-dep-guard.mjs', mustExist: true }
];

export default { checks };
