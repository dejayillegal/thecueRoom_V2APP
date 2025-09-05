# Web Setup

## Prerequisites
- Node.js 20
- npm or pnpm

## Install and run
```bash
cd apps/web
cp .env.example .env.local
npm install
npm run dev
```

### Environment variables
| key | description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public anon key |
| `NEXT_TELEMETRY_DISABLED` | disable Next.js telemetry |

## Commands
```bash
npm run build
npm test
npm run e2e
```
