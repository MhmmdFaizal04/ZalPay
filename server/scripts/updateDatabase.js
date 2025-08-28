import pool from '../database/connection.js';
import fs from 'fs';

async function updateDatabaseStructure() {
  try {
    console.log('Starting database structure update...');
    
    // Create applications table first
    console.log('Creating applications table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        category VARCHAR(100),
        available BOOLEAN DEFAULT true,
        image_path TEXT,
        features JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create app_variants table
    console.log('Creating app_variants table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS app_variants (
        id SERIAL PRIMARY KEY,
        app_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Add index
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_app_variants_app_id ON app_variants(app_id);
    `);
    
    // Clear existing data
    console.log('Clearing existing data...');
    await pool.query('DELETE FROM app_variants WHERE 1=1');
    await pool.query('DELETE FROM applications WHERE 1=1');
    
    // Insert applications data
    const applications = [
      {
        name: "Alight Motion",
        slug: "alight-motion", 
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756271625096-alight%20motion-TBvhzEIyFkgXNI8WztFT2RkKH4HCN0.jpg",
        description: "Video editing app dengan fitur profesional",
        category: "Video",
        features: ["Professional video editing","Animation tools","Effects library","No watermark"],
        variants: [
          {name: "Pro 12B 1PCS", price: 25000},
          {name: "Pro 12B 5PCS", price: 100000}
        ]
      },
      {
        name: "Apple Music",
        slug: "apple-music",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295223446-apple%20music-gcA6sZ9PBNWqkZBMKWPsJTloewFH2d.png",
        description: "Streaming musik dari Apple dengan kualitas lossless",
        category: "Music", 
        features: ["High-quality audio","Offline downloads","Exclusive content","Cross-device sync"],
        variants: [
          {name: "Famhead 1PCS", price: 20000},
          {name: "Basic Appmus", price: 15000},
          {name: "Famhead 5PCS", price: 80000}
        ]
      },
      {
        name: "Canva Lifetime",
        slug: "canva-lifetime",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295246711-canva-xLVwHSp4ByAgCCB3LVcML03GPzkC53.png", 
        description: "Akses seumur hidup ke Canva Pro",
        category: "Productivity",
        features: ["Unlimited designs","Premium templates","Brand kit","Team collaboration"],
        variants: [
          {name: "Member Edu", price: 150000},
          {name: "Head Garansi", price: 200000},
          {name: "Head Nogar", price: 180000}
        ]
      },
      {
        name: "Canva Pro",
        slug: "canva-pro",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295263701-canva-bBaKDhgZkIC2RdL7oZGN0S5y9JJJhn.png",
        description: "Design tools profesional dari Canva", 
        category: "Productivity",
        features: ["Premium templates","Background remover","Brand kit","Magic resize"],
        variants: [
          {name: "Pro 30D 1PCS", price: 35000},
          {name: "Pro 30D 5PCS", price: 150000},
          {name: "Pro 60D 1PCS", price: 60000},
          {name: "Pro 60D 5PCS", price: 250000}
        ]
      },
      {
        name: "CapCut Basic",
        slug: "capcut-basic",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295281814-capcut-4mh4BoPrKqXuzjXzuaKf2Cc4okE59q.jpg",
        description: "Video editor mobile yang mudah digunakan",
        category: "Video",
        features: ["Easy video editing","Basic effects","Music library","Export in HD"],
        variants: [
          {name: "Region SG", price: 15000},
          {name: "Region ES", price: 18000}
        ]
      },
      {
        name: "CapCut Pro", 
        slug: "capcut-pro",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295203309-capcut-eZlfP73veREsceloonTUncRT5Ct9G6.jpg",
        description: "CapCut dengan fitur premium lengkap",
        category: "Video",
        features: ["Advanced editing","Premium effects","4K export","No watermark"],
        variants: [
          {name: "Pro 30D 1PCS", price: 30000},
          {name: "Pro 30D 5PCS", price: 125000},
          {name: "Pro 7D 1PCS", price: 12000},
          {name: "Pro 7D 5PCS", price: 50000},
          {name: "Pro 6 Bulan", price: 150000}
        ]
      },
      {
        name: "Prime Video",
        slug: "prime-video", 
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295300180-prime%20video-W5BGcs4XJPtjJgOXOPWhkyf7os14Xq.jpg",
        description: "Streaming video dari Amazon Prime",
        category: "Video",
        features: ["HD/4K streaming","Original content","Download for offline","Multiple profiles"],
        variants: [
          {name: "Premium 1PCS", price: 25000}
        ]
      },
      {
        name: "Scribd",
        slug: "scribd",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295317058-scribd-lEh9EmR57BqlueBLUAGdiLJGON4Fte.jpg",
        description: "Unlimited access ke ebooks dan audiobooks", 
        category: "Education",
        features: ["Unlimited reading","Audiobooks","Magazines","Documents"],
        variants: [
          {name: "Premium 30D", price: 20000}
        ]
      },
      {
        name: "Spotify Premium",
        slug: "spotify-premium",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295338564-spotify-aN7JwToHULsb7hmbfMzS4mJnFRakYv.png",
        description: "Streaming musik tanpa iklan dengan kualitas tinggi",
        category: "Music",
        features: ["Ad-free music","Offline downloads","High-quality audio","Unlimited skips"],
        variants: [
          {name: "Prem 1PCS", price: 18000},
          {name: "Link Student", price: 15000},
          {name: "Prem 5PCS", price: 75000},
          {name: "Prem 10PCS", price: 140000}
        ]
      },
      {
        name: "VPN Express",
        slug: "vpn-express",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295355234-express-8hRcWIxiBubTPWkfhSCYYUYzl41mVs.png",
        description: "VPN cepat dan aman untuk browsing",
        category: "Security", 
        features: ["Fast connection","Global servers","No logs policy","24/7 support"],
        variants: [
          {name: "Premium 1PCS", price: 40000},
          {name: "Premium 5PCS", price: 180000}
        ]
      },
      {
        name: "VPN HMA",
        slug: "vpn-hma",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295371138-hma-vIQFZM6kmLS3oy1Ghr9Tuk0z7hdasb.jpg",
        description: "Hide My Ass VPN dengan server global",
        category: "Security",
        features: ["Global server network","IP protection","Streaming support","Easy to use"],
        variants: [
          {name: "Premium 1PCS", price: 35000},
          {name: "Premium 5PCS", price: 150000}
        ]
      },
      {
        name: "VPN Surfshark", 
        slug: "vpn-surfshark",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295390106-surfshark-OYyZRslgh3SHxXhjgP656fKYlvjl3S.jpg",
        description: "VPN unlimited devices dengan fitur lengkap",
        category: "Security",
        features: ["Unlimited devices","CleanWeb","MultiHop","Bypasser"],
        variants: [
          {name: "Redeem 60D", price: 30000},
          {name: "Premium 60D", price: 35000},
          {name: "Premium 365D", price: 300000}
        ]
      },
      {
        name: "Viu",
        slug: "viu",
        image_path: "https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/apps/1756295410928-viu-X3yS7b09arJDfJ5qpOPCwP8eRd5s7B.jpg",
        description: "Streaming drama Asia dan konten premium",
        category: "Video",
        features: ["Asian dramas","Exclusive content","HD streaming","Offline viewing"],
        variants: [
          {name: "Premium 12B 1PCS", price: 15000},
          {name: "Premium 12B 50PCS", price: 600000}
        ]
      }
    ];

    console.log('Inserting applications and variants...');
    
    for (const app of applications) {
      // Insert application
      const appResult = await pool.query(`
        INSERT INTO applications (name, slug, image_path, description, category, features, available)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `, [
        app.name,
        app.slug, 
        app.image_path,
        app.description,
        app.category,
        JSON.stringify(app.features),
        true
      ]);
      
      const appId = appResult.rows[0].id;
      console.log(`Inserted app: ${app.name} (ID: ${appId})`);
      
      // Insert variants for this application
      for (const variant of app.variants) {
        await pool.query(`
          INSERT INTO app_variants (app_id, name, price)
          VALUES ($1, $2, $3)
        `, [appId, variant.name, variant.price]);
        
        console.log(`  - Inserted variant: ${variant.name} (${variant.price})`);
      }
    }
    
    console.log('Database update completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating database:', error);
    process.exit(1);
  }
}

updateDatabaseStructure();
