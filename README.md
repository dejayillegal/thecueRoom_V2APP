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
- [ ] Make scripts executable (`chmod +x scripts/*.sh`)
- [ ] Install dependencies (`./scripts/local-setup.sh`)
- [ ] Run development servers (`./scripts/dev.sh`)
- [ ] Review requirements and design docs
- [ ] Implement features with tests
- [ ] Ensure CI passes
- [ ] Deploy web, mobile, and backend
