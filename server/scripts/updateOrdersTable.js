import pool from '../database/connection.js';
import fs from 'fs';

async function updateOrdersTable() {
  try {
    console.log('Updating orders table with variant information...');
    
    // Read and execute the migration
    const migration = fs.readFileSync('./database/migrations/007_update_orders_with_variants.sql', 'utf8');
    await pool.query(migration);
    console.log('Orders table updated successfully with variant support');
    
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating orders table:', error);
    process.exit(1);
  }
}

updateOrdersTable();
