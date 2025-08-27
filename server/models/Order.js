import pool from '../database/connection.js';

export const Order = {
  async create(orderData) {
    const { order_id, app_id, variant, quantity, total_price, customer_info, status = 'pending' } = orderData;
    const query = `
      INSERT INTO orders (order_id, app_id, variant, quantity, total_price, customer_info, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await pool.query(query, [order_id, app_id, variant, quantity, total_price, JSON.stringify(customer_info), status]);
    return result.rows[0];
  },

  async findAll() {
    const query = `
      SELECT o.*, a.name as app_name, a.image_path as app_image
      FROM orders o
      LEFT JOIN applications a ON o.app_id = a.id
      ORDER BY o.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async findById(id) {
    const query = `
      SELECT o.*, a.name as app_name, a.image_path as app_image
      FROM orders o
      LEFT JOIN applications a ON o.app_id = a.id
      WHERE o.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async findByOrderId(order_id) {
    const query = `
      SELECT o.*, a.name as app_name, a.image_path as app_image
      FROM orders o
      LEFT JOIN applications a ON o.app_id = a.id
      WHERE o.order_id = $1
    `;
    const result = await pool.query(query, [order_id]);
    return result.rows[0];
  },

  async updateStatus(id, status) {
    const query = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM orders WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total_orders,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
        COALESCE(SUM(CASE WHEN status = 'completed' THEN total_price ELSE 0 END), 0) as total_revenue
      FROM orders
    `;
    const result = await pool.query(query);
    return result.rows[0];
  }
};
