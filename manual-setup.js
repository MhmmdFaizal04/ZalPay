import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function runDatabaseSetup() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting database setup...');
    
    // Check connection
    const testResult = await client.query('SELECT NOW()');
    console.log('✅ Database connected at:', testResult.rows[0].now);
    
    // Run migrations
    const migrationFiles = [
      'server/database/migrations/001_create_users.sql',
      'server/database/migrations/002_create_applications.sql', 
      'server/database/migrations/003_create_orders.sql'
    ];
    
    for (const file of migrationFiles) {
      if (!fs.existsSync(file)) {
        console.log(`❌ Migration file not found: ${file}`);
        continue;
      }
      
      const sql = fs.readFileSync(file, 'utf8');
      console.log(`📝 Running migration: ${path.basename(file)}`);
      
      await client.query(sql);
      console.log(`✅ Migration ${path.basename(file)} completed`);
    }
    
    // Run seeds
    const seedFile = 'server/database/seeds/initial_data.sql';
    if (!fs.existsSync(seedFile)) {
      console.log(`❌ Seed file not found: ${seedFile}`);
    } else {
      const seedSql = fs.readFileSync(seedFile, 'utf8');
      console.log('🌱 Seeding initial data...');
      
      await client.query(seedSql);
      console.log('✅ Initial data seeded successfully');
      
      // Verify data
      const appsResult = await client.query('SELECT COUNT(*) FROM applications');
      const usersResult = await client.query('SELECT COUNT(*) FROM users');
      
      console.log(`📊 Database statistics:`);
      console.log(`   - Applications: ${appsResult.rows[0].count}`);
      console.log(`   - Users: ${usersResult.rows[0].count}`);
    }
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    if (error.code) {
      console.error('   Error code:', error.code);
    }
    console.error('   Stack:', error.stack);
  } finally {
    client.release();
    await pool.end();
  }
}

runDatabaseSetup();
