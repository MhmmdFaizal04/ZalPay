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
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting database setup...');
    console.log('📊 Database URL:', process.env.DATABASE_URL ? 'Connected' : 'Not configured');
    
    // Read and execute migration files
    const migrationFiles = [
      '001_create_users.sql',
      '002_create_applications.sql', 
      '003_create_orders.sql',
      '004_create_settings.sql'
    ];
    
    for (const file of migrationFiles) {
      const filePath = path.join(__dirname, 'migrations', file);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Migration file not found: ${file}`);
        continue;
      }
      
      const sql = fs.readFileSync(filePath, 'utf8');
      
      console.log(`📝 Running migration: ${file}`);
      await client.query(sql);
      console.log(`✅ Migration ${file} completed`);
    }
    
    // Run seeds
    const seedPath = path.join(__dirname, 'seeds', 'initial_data.sql');
    
    if (!fs.existsSync(seedPath)) {
      console.log(`⚠️  Seed file not found: initial_data.sql`);
    } else {
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      
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
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations()
    .then(() => {
      console.log('✨ Database setup finished successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database setup failed:', error.message);
      process.exit(1);
    });
}

export default runMigrations;
