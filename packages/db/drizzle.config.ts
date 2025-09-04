export default {
  schema: './packages/db/src/schema.ts',
  out: './packages/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? ''
  }
};
