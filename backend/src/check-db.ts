import pool from './db';

async function runSanityCheck() {
  console.log("Starting Database Sanity Check...");
  
  try {
    // 1. Check Connection
    const timeResult = await pool.query('SELECT NOW()');
    console.log("Connection: Success!");

    // 2. Check Table Columns & Types
    const colResult = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'media_items'
    `);

    console.log("Current Database Schema:");
    console.table(colResult.rows);

    // 3. Validation Logic Check
    const expectedColumns = [
      'title', 'media_type', 'tracking_status', 
      'current_progress', 'total_episodes', 'rating'
    ];
    
    const dbColumns = colResult.rows.map(r => r.column_name);
    const missing = expectedColumns.filter(c => !dbColumns.includes(c));

    if (missing.length > 0) {
      console.error(`MISSING COLUMNS: ${missing.join(', ')}`);
      console.log("Check your schema.sql and ensure you ran the migrations!");
    } else {
      console.log("All required columns are present.");
    }

  } catch (err) {
    console.error("Sanity Check Failed:", err);
  } finally {
    await pool.end();
  }
}

runSanityCheck();