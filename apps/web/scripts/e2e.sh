#!/usr/bin/env bash
set -euo pipefail

export NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-http://localhost}
export NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-anon}
export NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-http://127.0.0.1:3000}

npm run build
npx playwright install --with-deps
playwright test "$@"
