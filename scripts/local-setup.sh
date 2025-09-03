#!/usr/bin/env bash
set -e

if ! node -v | grep -q '^v20'; then
  echo "Node 20 is required."
  exit 1
fi

echo "Installing web dependencies..."
npm install --prefix apps/web

echo "Installing mobile dependencies..."
npm install --prefix apps/mobile

for dir in apps/web apps/mobile functions; do
  if [ -f "$dir/.env.example" ] && [ ! -f "$dir/.env" ]; then
    cp "$dir/.env.example" "$dir/.env"
    echo "Created $dir/.env from template."
  fi
done

echo "Setup complete. Run ./scripts/dev.sh to start developing."
