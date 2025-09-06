#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "— Building static export for local preview —"
export STATIC_EXPORT=1
export NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH:-/thecueRoom_V2APP}
(
  cd apps/web
  npm i
  npm run build:static
  echo "— Starting static preview on http://localhost:4173${NEXT_PUBLIC_BASE_PATH} —"
  npm run preview:static
)
