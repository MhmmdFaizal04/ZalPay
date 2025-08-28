import pool from '../database/connection.js';

export const AppVariant = {
  async findByAppId(appId) {
    const query = 'SELECT * FROM app_variants WHERE app_id = $1 ORDER BY price ASC';
    const result = await pool.query(query, [appId]);
    return result.rows;
  },

  async findById(id) {
    const query = `
      SELECT v.*, a.name as app_name, a.slug as app_slug
      FROM app_variants v
      JOIN applications a ON v.app_id = a.id
      WHERE v.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async create(variantData) {
    const { app_id, name, price } = variantData;
    const query = `
      INSERT INTO app_variants (app_id, name, price)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [app_id, name, price]);
    return result.rows[0];
  },

  async update(id, variantData) {
    const { name, price } = variantData;
    const query = `
      UPDATE app_variants 
      SET name = $1, price = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await pool.query(query, [name, price, id]);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM app_variants WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};
