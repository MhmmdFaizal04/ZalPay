import pool from '../database/connection.js';

export const Application = {
  async findAll() {
    const query = `
      SELECT a.*, 
             json_agg(
               json_build_object(
                 'id', v.id,
                 'name', v.name,
                 'price', v.price
               ) ORDER BY v.price ASC
             ) as variants
      FROM applications a
      LEFT JOIN app_variants v ON a.id = v.app_id
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows.map(row => ({
      ...row,
      variants: row.variants.filter(v => v.id !== null)
    }));
  },

  async findById(id) {
    const query = `
      SELECT a.*, 
             json_agg(
               json_build_object(
                 'id', v.id,
                 'name', v.name,
                 'price', v.price
               ) ORDER BY v.price ASC
             ) as variants
      FROM applications a
      LEFT JOIN app_variants v ON a.id = v.app_id
      WHERE a.id = $1
      GROUP BY a.id
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return null;
    
    const app = result.rows[0];
    return {
      ...app,
      variants: app.variants.filter(v => v.id !== null)
    };
  },

  async findBySlug(slug) {
    const query = `
      SELECT a.*, 
             json_agg(
               json_build_object(
                 'id', v.id,
                 'name', v.name,
                 'price', v.price
               ) ORDER BY v.price ASC
             ) as variants
      FROM applications a
      LEFT JOIN app_variants v ON a.id = v.app_id
      WHERE a.slug = $1
      GROUP BY a.id
    `;
    const result = await pool.query(query, [slug]);
    if (result.rows.length === 0) return null;
    
    const app = result.rows[0];
    return {
      ...app,
      variants: app.variants.filter(v => v.id !== null)
    };
  },

  async create(appData) {
    const { name, slug, variants, features, category, available = true, image_path, description } = appData;
    
    // Start transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Insert application
      const appQuery = `
        INSERT INTO applications (name, slug, category, available, image_path, description, features)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const appResult = await client.query(appQuery, [
        name, slug, category, available, image_path, description, JSON.stringify(features)
      ]);
      
      const app = appResult.rows[0];
      
      // Insert variants
      if (variants && variants.length > 0) {
        for (const variant of variants) {
          await client.query(
            'INSERT INTO app_variants (app_id, name, price) VALUES ($1, $2, $3)',
            [app.id, variant.name, variant.price]
          );
        }
      }
      
      await client.query('COMMIT');
      
      // Return app with variants
      return await this.findById(app.id);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async update(id, appData) {
    const { name, slug, variants, features, category, available, image_path, description } = appData;
    
    // Start transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Update application
      const appQuery = `
        UPDATE applications 
        SET name = $1, slug = $2, category = $3, available = $4, image_path = $5, 
            description = $6, features = $7, updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
      `;
      const appResult = await client.query(appQuery, [
        name, slug, category, available, image_path, description, 
        JSON.stringify(features), id
      ]);
      
      // Update variants if provided
      if (variants) {
        // Delete existing variants
        await client.query('DELETE FROM app_variants WHERE app_id = $1', [id]);
        
        // Insert new variants
        for (const variant of variants) {
          await client.query(
            'INSERT INTO app_variants (app_id, name, price) VALUES ($1, $2, $3)',
            [id, variant.name, variant.price]
          );
        }
      }
      
      await client.query('COMMIT');
      
      // Return updated app with variants
      return await this.findById(id);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async delete(id) {
    // Delete application (variants will be deleted automatically due to CASCADE)
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
