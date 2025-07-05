import 'server-only';

import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

// Create MySQL connection pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  connectionLimit: 10
});

// Drizzle client (can be used if you decide to define schemas later)
export const db = drizzle(pool);
