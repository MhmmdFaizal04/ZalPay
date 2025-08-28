import pool from '../database/connection.js';

async function testOrderStats() {
  try {
    console.log('Testing order stats...');
    
    // Test basic orders query
    const ordersResult = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5');
    console.log('Recent orders:', ordersResult.rows);
    
    // Test stats query
    const statsQuery = `
      SELECT 
        COUNT(*) as total_orders,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
        COALESCE(SUM(CASE WHEN status = 'completed' THEN total_price ELSE 0 END), 0) as total_revenue
      FROM orders
    `;
    const statsResult = await pool.query(statsQuery);
    console.log('Stats result:', statsResult.rows[0]);
    
    // Test orders with app names
    const ordersWithAppsQuery = `
      SELECT o.*, a.name as app_name, a.image_path as app_image
      FROM orders o
      LEFT JOIN applications a ON o.app_id = a.id
      ORDER BY o.created_at DESC
      LIMIT 5
    `;
    const ordersWithAppsResult = await pool.query(ordersWithAppsQuery);
    console.log('Orders with app names:', ordersWithAppsResult.rows);
    
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

testOrderStats();
