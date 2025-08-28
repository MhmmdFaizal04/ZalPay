import pool from '../database/connection.js';
import { User } from '../models/User.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '../../.env') });

console.log('Environment check:');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL preview:', process.env.DATABASE_URL?.substring(0, 50) + '...');

async function checkDatabase() {
  try {
    console.log('Checking database connection...');
    
    // Test connection
    const client = await pool.connect();
    console.log('✓ Database connected successfully');
    client.release();
    
    // Check if users table exists and has data
    const usersQuery = 'SELECT COUNT(*) as count FROM users';
    const usersResult = await pool.query(usersQuery);
    console.log(`Users in database: ${usersResult.rows[0].count}`);
    
    // Check all users
    const allUsersQuery = 'SELECT id, username, email, role, created_at FROM users';
    const allUsersResult = await pool.query(allUsersQuery);
    console.log('All users:');
    allUsersResult.rows.forEach(user => {
      console.log(`- ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Role: ${user.role}`);
    });
    
    // Test User.findById
    if (allUsersResult.rows.length > 0) {
      const testUserId = allUsersResult.rows[0].id;
      console.log(`\nTesting User.findById(${testUserId}):`);
      const testUser = await User.findById(testUserId);
      console.log('Result:', {
        id: testUser?.id,
        username: testUser?.username,
        hasPassword: !!testUser?.password,
        passwordLength: testUser?.password?.length
      });
    }
    
  } catch (error) {
    console.error('Database check failed:', error);
  } finally {
    process.exit(0);
  }
}

checkDatabase();
