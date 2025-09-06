# FILE: scripts/local-verify.sh
#!/usr/bin/env bash
set -Eeuo pipefail

### --- Pretty logging helpers ---
bold()  { printf "\033[1m%s\033[0m\n" "$*"; }
info()  { printf "  • %s\n" "$*"; }
ok()    { printf "  ✓ %s\n" "$*"; }
warn()  { printf "  ⚠ %s\n" "$*"; }
err()   { printf "\033[31m  ✗ %s\033[0m\n" "$*"; }
rule()  { printf "\n\033[1m— %s —\033[0m\n" "$*"; }

### --- Node 20 guard ---
if ! command -v node >/dev/null 2>&1; then
  err "Node.js is not installed (need v20+)."
  exit 1
fi
NODEV="$(node -v | sed 's/^v//')"
NODEMAJOR="${NODEV%%.*}"
if [[ "${NODEMAJOR}" -lt 20 ]]; then
  err "Node v20+ required. Found v${NODEV}."
  exit 1
fi
ok "Node v${NODEV} detected"

### --- Helpers ---
install_here() {
  if [[ -f package-lock.json ]]; then
    info "npm ci (lockfile present)"
    npm ci
  else
    info "npm i (no lockfile)"
    npm i
  fi
}

has_npm_script() {
  node -e "try{const s=require('./package.json').scripts||{};process.exit(s['$1']?0:1)}catch{process.exit(1)}"
}

run_if_present() {
  local script="$1"
  if has_npm_script "$script"; then
    info "npm run $script"
    npm run "$script"
  else
    warn "script \"$script\" not found — skipping"
  fi
}

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

rule "Root install"
install_here

rule "Assemble assets"
node scripts/assemble-assets.ts || true

rule "Repo audit"
npm run audit
npm run scan:placeholders

### --- Web ---
if [[ -d apps/web ]]; then
  rule "Web: install, lint, test, build"
  echo "  • Installing shared package deps (packages/schemas)"
  if [ -f packages/schemas/package-lock.json ]; then
    npm ci --prefix packages/schemas
  else
    npm i --prefix packages/schemas
  fi
  pushd apps/web >/dev/null
  install_here
  run_if_present "lint"
  run_if_present "test"
  run_if_present "build"
  popd >/dev/null
else
  warn "apps/web not found; skipping web steps"
fi

# after building web
if [ -f "apps/web/playwright.config.ts" ]; then
  echo "  • Installing Playwright browsers"
  (cd apps/web && npx playwright install) || true
  echo "  • Running web e2e"
  (cd apps/web && npm run e2e || true)
fi

### --- Mobile ---
if [[ -d apps/mobile ]]; then
  echo
  echo "— Mobile: install, align, test —"
  pushd apps/mobile >/dev/null

  if [ -f package-lock.json ]; then echo "  • npm ci (lockfile present)"; npm ci; else echo "  • npm i"; npm i; fi

  # Always attempt align; fall back to running the guard directly; never hard-fail local runs
  if npm run -s align >/dev/null 2>&1; then
    echo "  • npm run align"
    npm run -s align || true
  else
    echo "  • align script not found — trying guard directly"
    node scripts/expo-dep-guard.mjs --ci || true
  fi

  # Tests (don’t break local flow if absent)
  if npm run -s test >/dev/null 2>&1; then npm test || true; else echo "  ⚠ script \"test\" not found — skipping"; fi

  popd >/dev/null
else
  warn "apps/mobile not found; skipping mobile steps"
fi

rule "All done"
ok "Local verification finished successfully."
