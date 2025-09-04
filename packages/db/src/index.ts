import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

declare const process: { env: { DRIZZLE_DATABASE_URL?: string } };

const pool = new Pool({ connectionString: process.env.DRIZZLE_DATABASE_URL });
export const db = drizzle(pool, { schema });
export { schema };
