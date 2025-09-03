#!/usr/bin/env bash
set -e

npm run dev --prefix apps/web &
WEB_PID=$!

npm run start --prefix apps/mobile &
MOBILE_PID=$!

wait $WEB_PID $MOBILE_PID
