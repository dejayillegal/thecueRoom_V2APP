# Deployment

## Supabase Database & Edge Functions
```bash
cd functions
supabase login
supabase link --project-ref <PROJECT_REF>
deno fmt --check
deno test
supabase functions deploy --no-verify-jwt
cd ..
DRIZZLE_DATABASE_URL="postgres://user:pass@host:5432/db" npx drizzle-kit push:pg --config=packages/db/drizzle.config.ts
psql "$DRIZZLE_DATABASE_URL" -f supabase/sql/rls_policies.sql
```

## Web (Vercel)
```bash
cd apps/web
npm ci
npm run build
npm test
vercel env pull .env
vercel env push
vercel deploy --prod
cd ../..
```

## Mobile (EAS)
```bash
cd apps/mobile
npm ci
npm run align
npm test
eas build --profile production --platform all
eas submit --profile production --platform ios
eas submit --profile production --platform android
cd ../..
```
