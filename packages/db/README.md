# @thecueroom/db

Drizzle ORM schema and migrations for TheCueRoom.

## Migrations

```bash
# generate a new migration
npx drizzle-kit generate:pg --config=packages/db/drizzle.config.ts

# push schema to Supabase
DRIZZLE_DATABASE_URL="postgres://user:pass@host:5432/db" npx drizzle-kit push:pg --config=packages/db/drizzle.config.ts
psql "$DRIZZLE_DATABASE_URL" -f supabase/sql/rls_policies.sql
```


## Ranking View

```bash
# apply ranking view
psql "$DRIZZLE_DATABASE_URL" -f packages/db/src/ranking.sql
```

This creates the `post_scores` view used to order the community feed. Re-run the
command after migrations to keep the view up to date.
