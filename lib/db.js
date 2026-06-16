import { Pool } from "pg";

if (!global.pgPool) {
  global.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

const pool = global.pgPool;

export default pool;