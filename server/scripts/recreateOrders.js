import pool from '../database/connection.js';

async function recreateOrdersTable() {
  try {
    console.log('Starting orders table recreation...');
    
    // Drop the orders table if it exists
    await pool.query('DROP TABLE IF EXISTS orders CASCADE');
    console.log('Dropped existing orders table');
    
    // Create new orders table without status column
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(50) UNIQUE NOT NULL,
        app_id INTEGER REFERENCES applications(id),
        variant VARCHAR(100),
        quantity INTEGER DEFAULT 1,
        total_price DECIMAL(10,2),
        customer_info JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await pool.query(createTableSQL);
    console.log('Created new orders table without status column');
    
    console.log('Orders table recreation completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error recreating orders table:', error);
    process.exit(1);
  }
}

recreateOrdersTable();
