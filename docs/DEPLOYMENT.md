# Deployment Guide

## Vercel Deployment

### Prerequisites
1. Vercel account
2. GitHub repository
3. Neon PostgreSQL database
4. Vercel Blob storage setup

### Step 1: Database Setup (Neon)

1. Create a Neon account at https://neon.tech
2. Create a new project
3. Copy the connection string
4. Run migrations manually in Neon SQL Editor:

```sql
-- Run each migration file in order:
-- 001_create_users.sql
-- 002_create_applications.sql  
-- 003_create_orders.sql
-- initial_data.sql (seed data)
```

### Step 2: Vercel Blob Setup

1. Go to Vercel dashboard
2. Navigate to Storage tab
3. Create a new Blob store
4. Copy the `BLOB_READ_WRITE_TOKEN`

### Step 3: Environment Variables

Set these in Vercel dashboard (Settings > Environment Variables):

```env
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxx
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
NODE_ENV=production
PORT=3000
WHATSAPP_NUMBER=6285401426305
```

### Step 4: Deploy to Vercel

#### Option A: GitHub Integration
1. Connect repository to Vercel
2. Import project
3. Configure build settings (auto-detected)
4. Deploy

#### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Step 5: Verify Deployment

1. Check frontend loads correctly
2. Test API endpoints: `/api/health`
3. Verify database connection
4. Test file upload functionality
5. Check admin login works

## Build Configuration

The project uses the config in `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json", 
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify DATABASE_URL is correct
   - Check if database is accessible
   - Ensure SSL mode is enabled

2. **File Upload Not Working**
   - Verify BLOB_READ_WRITE_TOKEN
   - Check Vercel Blob permissions
   - Ensure file size limits

3. **Frontend 404 Errors**
   - Check route configuration in vercel.json
   - Verify build output in dist/

4. **API Endpoints Not Found**
   - Ensure server/index.js is the entry point
   - Check API routes configuration
   - Verify middleware setup

### Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Optimize images
   - Use CDN for static assets
   - Implement lazy loading

2. **Backend** 
   - Database query optimization
   - Response caching
   - Compression middleware
   - Connection pooling

### Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] CORS configured correctly
- [ ] Helmet.js security headers
- [ ] Input validation on all endpoints
- [ ] SQL injection protection
- [ ] File upload restrictions
- [ ] Rate limiting (recommended)
- [ ] HTTPS enforcement

### Monitoring

1. **Vercel Analytics**
   - Enable Web Analytics
   - Monitor Core Web Vitals
   - Track page views

2. **Error Monitoring**
   - Check Vercel Function logs
   - Monitor database connections
   - Track API response times

3. **Custom Monitoring**
   - Implement health checks
   - Add custom metrics
   - Set up alerts

## Manual Deployment Steps

If automatic deployment fails:

1. Build locally:
```bash
npm run build
```

2. Test production build:
```bash
npm run preview
```

3. Deploy manually:
```bash
vercel --prod
```

## Domain Configuration

1. Add custom domain in Vercel dashboard
2. Configure DNS records
3. Enable automatic HTTPS
4. Update CORS origins if needed

## Rollback Process

1. Go to Vercel dashboard
2. Select previous deployment
3. Click "Promote to Production"
4. Verify rollback successful

## Environment-Specific Notes

### Development
- Use local PostgreSQL or Neon dev branch
- File uploads to dev Blob storage
- Debug mode enabled

### Staging
- Separate database instance
- Test data only
- Full feature testing

### Production
- Production database
- Real customer data
- Performance monitoring
- Backup strategies
