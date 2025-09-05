# Supabase Setup

1. Create a project at [supabase.com](https://supabase.com) and note your Project URL and anon key.
2. Apply RLS policies:
```bash
psql "$SUPABASE_DB" < supabase/sql/rls_policies.sql
```
3. Create buckets `media` and `memes` and enable public read.

### Environment variables
| key | description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_URL` | project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `EXPO_PUBLIC_SUPABASE_KEY` | anon key |
