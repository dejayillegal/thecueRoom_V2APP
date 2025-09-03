# Upgrade V1 to V2

| V1                             | V2                                             |
|--------------------------------|------------------------------------------------|
| Next.js web app                | Vite + React + Tailwind                       |
| React Native CLI mobile        | Expo with EAS                                 |
| Firebase backend               | Node/Express + Drizzle + Supabase             |
| JavaScript everywhere          | Strict TypeScript                             |
| Manual deployment scripts      | GitHub Actions + Vercel/EAS/Supabase workflows|

## Migration Steps
1. Replace Next.js pages with Vite routes.
2. Migrate Firebase auth/data to Supabase.
3. Convert JS files to `.ts`/`.tsx` with strict settings.
4. Configure CI pipeline in `.github/workflows/ci.yml`.
