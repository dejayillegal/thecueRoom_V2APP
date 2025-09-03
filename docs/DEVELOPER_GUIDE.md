# Developer Guide

## Local Setup
```bash
chmod +x scripts/*.sh

./scripts/local-setup.sh
./scripts/dev.sh
```

## Code Style
- Use **Inter** for UI and **Source Code Pro** for code snippets.
- Run ESLint and Prettier before committing.
```bash
npm run lint --prefix apps/web
npm run lint --prefix apps/mobile
```

## Testing
```bash
npm test --prefix apps/web
npm test --prefix apps/mobile
```

## Hermes & Metro Troubleshooting
- Clear caches when the React Native bundler misbehaves:
```bash
watchman watch-del-all
rm -rf $TMPDIR/metro*
npm start --prefix apps/mobile -- --reset-cache
```
- Ensure `node --version` returns v20.
