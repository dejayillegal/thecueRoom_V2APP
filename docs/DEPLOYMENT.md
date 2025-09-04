# Deployment

## Web → Vercel
```bash
cd apps/web
vercel --prod
```

## Mobile → Expo Application Services (EAS)
```bash
cd apps/mobile
eas build --profile production --platform all
eas submit --platform ios
eas submit --platform android
```

## Backend → Supabase
```bash
cd functions
supabase login
supabase link --project-ref <PROJECT_REF>
supabase functions deploy --no-verify-jwt
cd ..
supabase db connect < supabase/sql/rls_policies.sql
```
