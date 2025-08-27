# Deployment Guide - Vercel

## Environment Configuration Fixed

### Problem Solved
The `NODE_ENV=production is not supported in .env` error has been resolved by:

1. **Removed NODE_ENV from .env file**
2. **Updated vite.config.js** to handle environment detection
3. **Updated vercel.json** to set NODE_ENV properly
4. **Updated server/index.js** to handle Vercel environment

## Quick Deployment Steps

### 1. Local Environment (.env)
```env
# JWT
JWT_SECRET=your_jwt_secret

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_blob_token

# Database
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# App Config
PORT=3000
WHATSAPP_NUMBER=6285401426305

# DO NOT SET NODE_ENV HERE - Let Vite handle it automatically
```

### 2. Test Build Locally
```bash
# This should now work without NODE_ENV errors
npm run build

# Test the build
npm run preview
```

### 3. Vercel Environment Variables
In Vercel Dashboard, set these environment variables:

```
JWT_SECRET=your_production_jwt_secret
BLOB_READ_WRITE_TOKEN=your_production_blob_token
DATABASE_URL=your_production_database_url
PORT=3000
WHATSAPP_NUMBER=6285401426305
```

**Important**: Do NOT set NODE_ENV in Vercel - it's handled automatically.

### 4. Database Setup
Run database setup before deploying:
```bash
npm run db:setup
```

This will create tables and seed initial data including:
- Admin user: `admin@zalpay.com` / `password`
- 13 sample applications
- Proper database schema

### 5. Deploy to Vercel
```bash
# Option 1: GitHub integration (recommended)
# Just push to GitHub and Vercel will auto-deploy

# Option 2: CLI deployment
npm i -g vercel
vercel --prod
```

## Files Modified for Vercel Compatibility

### 1. `.env` (Removed NODE_ENV)
```env
# Removed: NODE_ENV=production
# This caused the Vite build error
```

### 2. `vite.config.js` (Updated)
```javascript
export default defineConfig(({ command, mode }) => {
  return {
    // ... config
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    // ...
  }
})
```

### 3. `vercel.json` (Enhanced)
```json
{
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "server/index.js": {
      "maxDuration": 30
    }
  }
}
```

### 4. `server/index.js` (Vercel-optimized)
```javascript
const NODE_ENV = process.env.NODE_ENV || process.env.VERCEL_ENV || 'development';

// Vercel-specific handling
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
```

### 5. `package.json` (Added Vercel build script)
```json
{
  "scripts": {
    "vercel-build": "vite build"
  }
}
```

## Verification Steps

After deployment, verify:

1. **Frontend**: Visit your Vercel URL
2. **API Health**: `https://your-app.vercel.app/api/health`
3. **Admin Login**: Use `admin@zalpay.com` / `password`
4. **Database**: Check if apps are loaded in catalog
5. **File Upload**: Test admin app management

## Default Admin Access

```
Email: admin@zalpay.com
Password: password
```

**⚠️ Change this password immediately after first login!**

## Sample Applications Included

The database is seeded with 13 sample applications:
- Spotify Premium
- Netflix, Prime Video
- Canva Pro, Canva Lifetime
- VPN services
- Video editing apps
- And more...

## Common Issues & Solutions

### Build Error: NODE_ENV not supported
**Fixed** ✅ - Removed from .env, handled by Vite automatically

### API Routes Not Found
- Check vercel.json routes configuration
- Ensure `/api/*` paths are properly routed

### Database Connection Issues
- Verify DATABASE_URL in Vercel environment variables
- Check SSL mode requirement: `?sslmode=require`

### Admin Login Not Working
- Run `npm run db:setup` to create admin user
- Check JWT_SECRET is set in production

## Production Checklist

- [ ] Remove NODE_ENV from .env
- [ ] Set all environment variables in Vercel dashboard
- [ ] Run database setup/migration
- [ ] Test build locally with `npm run build`
- [ ] Deploy to Vercel
- [ ] Verify all functionality works
- [ ] Change default admin password
- [ ] Add real application images
- [ ] Test order flow end-to-end

Your ZalPay Premium app is now ready for production deployment on Vercel! 🚀
