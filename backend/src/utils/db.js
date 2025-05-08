// backend/src/utils/db.js

import pkg from 'pg';
const { Pool } = pkg;
console.log('PG URL utilisée:', process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default pool;