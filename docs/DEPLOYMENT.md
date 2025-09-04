# Deployment

## Supabase DB + Edge Functions
```bash
cd functions
supabase login
supabase link --project-ref <PROJECT_REF>
supabase functions deploy --no-verify-jwt
supabase db connect < ../supabase/sql/rls_policies.sql
cd ..
```

## Web → Vercel
```bash
cd apps/web
npm i
npm run build
npm test
vercel deploy --prod
cd ../..
```

## Mobile → Expo Application Services (EAS)
```bash
cd apps/mobile
npm i
npm run align
npm test
eas build --profile production --platform all
eas submit --profile production --platform ios
eas submit --profile production --platform android
cd ../..
```
