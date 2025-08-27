import pool from '../database/connection.js';

export const User = {
  async create(userData) {
    const { username, email, password, role = 'admin' } = userData;
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role, created_at
    `;
    const result = await pool.query(query, [username, email, password, role]);
    return result.rows[0];
  },

  async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async updatePassword(id, newPassword) {
    const query = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING id, username, email, role';
    const result = await pool.query(query, [newPassword, id]);
    return result.rows[0];
  }
};
