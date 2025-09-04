# TheCueRoom v2

A social playground for cues, built with a Vite/React web app, Expo mobile app, and Node/Express + Drizzle backend.

## Brand
- Colors: `#0B0B0B`, `#111111`, `#D1FF3D`, `#873BBF`
- Fonts: Inter, Source Code Pro

## Architecture
```
+------------+      +---------------+
| Web (Vite) |      | Mobile (Expo) |
+------------+      +---------------+
        \              /
         \            /
     +----------------------+
     | Backend API (Node)   |
     | Express + Drizzle    |
     +----------------------+
              |
              v
        Supabase DB
```

## Web
```bash
cd apps/web
npm i
npm run build
npm test
```

## Mobile

```bash
cd apps/mobile
npm i
npm run align
npm test
npx expo start -c
```

### Acceptance

- `npm run align` passes locally.
- `npm test` runs jest-expo without “Object.defineProperty called on non-object”.
- Metro throws if Node builtins are imported.

## Documentation
- [Docs Overview](docs/README.md)
- [Requirements](docs/REQUIREMENTS.md)
- [Design](docs/DESIGN.md)
- [UI/UX Flow](docs/UI_UX_FLOW.md)
- [Developer Guide](docs/DEVELOPER_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Agents](docs/AGENTS.md)
- [Upgrade V1 to V2](docs/UPGRADE_V1_TO_V2.md)

## Task Checklist
- [ ] Install dependencies (`./scripts/local-setup.sh`)
- [ ] Run development servers (`./scripts/dev.sh`)
- [ ] Review requirements and design docs
- [ ] Implement features with tests
- [ ] Ensure CI passes
- [ ] Deploy web, mobile, and backend
