import pool from '../database/connection.js';

class Settings {
  static async getSetting(key) {
    try {
      const query = 'SELECT setting_value FROM settings WHERE setting_key = $1';
      const result = await pool.query(query, [key]);
      return result.rows.length > 0 ? result.rows[0].setting_value : null;
    } catch (error) {
      console.error('Error getting setting:', error);
      throw error;
    }
  }

  static async setSetting(key, value) {
    try {
      const query = `
        INSERT INTO settings (setting_key, setting_value, updated_at)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        ON CONFLICT (setting_key) 
        DO UPDATE SET 
          setting_value = EXCLUDED.setting_value,
          updated_at = CURRENT_TIMESTAMP
      `;
      await pool.query(query, [key, value]);
      return true;
    } catch (error) {
      console.error('Error setting value:', error);
      throw error;
    }
  }

  static async getCurrentQRIS() {
    try {
      return await this.getSetting('current_qris_url');
    } catch (error) {
      console.error('Error getting current QRIS:', error);
      return '/images/qris/default-qris.png';
    }
  }

  static async setCurrentQRIS(url) {
    try {
      return await this.setSetting('current_qris_url', url);
    } catch (error) {
      console.error('Error setting current QRIS:', error);
      throw error;
    }
  }

  static async getAllSettings() {
    try {
      const query = 'SELECT setting_key, setting_value FROM settings';
      const result = await pool.query(query);
      
      const settings = {};
      result.rows.forEach(row => {
        settings[row.setting_key] = row.setting_value;
      });
      
      return settings;
    } catch (error) {
      console.error('Error getting all settings:', error);
      throw error;
    }
  }
}

export default Settings;
