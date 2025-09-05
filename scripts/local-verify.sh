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
  # Greps npm's script list for an exact script name
  npm run 2>/dev/null | sed -n 's/^  *\([^ ]\+\) .*/\1/p' | grep -qx "$1"
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

# Optional: assemble landing assets if script exists
if [[ -f scripts/assemble-assets.mjs ]]; then
  info "Syncing MarketingLanding.svg"
  node scripts/assemble-assets.mjs || warn "assemble-assets.mjs returned non-zero (continuing)"
fi

rule "Repo audit"
if has_npm_script "audit"; then
  npm run audit
else
  warn "No root audit script; skipping"
fi

### --- Web ---
if [[ -d apps/web ]]; then
  rule "Web: install, lint, test, build"
  pushd apps/web >/dev/null
  install_here
  run_if_present "lint"
  run_if_present "test"
  run_if_present "build"
  popd >/dev/null
else
  warn "apps/web not found; skipping web steps"
fi

### --- Mobile ---
if [[ -d apps/mobile ]]; then
  rule "Mobile: install, align, test"
  pushd apps/mobile >/dev/null
  install_here
  if has_npm_script "align"; then
    info "npm run align"
    npm run align
  else
    warn "No mobile align script; skipping"
  fi
  run_if_present "test"
  popd >/dev/null
else
  warn "apps/mobile not found; skipping mobile steps"
fi

rule "All done"
ok "Local verification finished successfully."

