import pool from '../database/connection.js';

export const Application = {
  async findAll() {
    const query = `
      SELECT * FROM applications 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async findById(id) {
    const query = 'SELECT * FROM applications WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async findBySlug(slug) {
    const query = 'SELECT * FROM applications WHERE slug = $1';
    const result = await pool.query(query, [slug]);
    return result.rows[0];
  },

  async create(appData) {
    const { name, slug, price, variants, features, category, available = true, image_path, description } = appData;
    const query = `
      INSERT INTO applications (name, slug, price, variants, features, category, available, image_path, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const result = await pool.query(query, [
      name, 
      slug, 
      price, 
      JSON.stringify(variants), 
      JSON.stringify(features),
      category,
      available, 
      image_path, 
      description
    ]);
    return result.rows[0];
  },

  async update(id, appData) {
    const { name, slug, price, variants, features, category, available, image_path, description } = appData;
    const query = `
      UPDATE applications 
      SET name = $1, slug = $2, price = $3, variants = $4, features = $5, category = $6, 
          available = $7, image_path = $8, description = $9, updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING *
    `;
    const result = await pool.query(query, [
      name, 
      slug, 
      price, 
      JSON.stringify(variants), 
      JSON.stringify(features),
      category,
      available, 
      image_path, 
      description, 
      id
    ]);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM applications WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async checkHasOrders(id) {
    const query = 'SELECT COUNT(*) as count FROM orders WHERE app_id = $1';
    const result = await pool.query(query, [id]);
    return parseInt(result.rows[0].count) > 0;
  },

  async updateAvailability(id, available) {
    const query = 'UPDATE applications SET available = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [available, id]);
    return result.rows[0];
  }
};
