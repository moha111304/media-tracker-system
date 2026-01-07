import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create the Pool using the URL from your .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// A helper function to run queries
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;