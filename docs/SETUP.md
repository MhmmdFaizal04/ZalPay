# Setup Guide

## Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- PostgreSQL database (Neon recommended)
- Vercel account (for Blob storage)
- Git

## Local Development Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd zalpay-premium
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create `.env` file in root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# JWT Secret (generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters

# Vercel Blob Token (get from Vercel dashboard)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxx

# Database URL (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# App Configuration
NODE_ENV=development
PORT=3000
WHATSAPP_NUMBER=6285401426305
```

### 4. Database Setup

#### Option A: Use Neon (Recommended)

1. Sign up at https://neon.tech
2. Create a new project
3. Copy the connection string
4. Run migrations manually in Neon console

#### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create database: `createdb zalpay_premium`
3. Update DATABASE_URL in `.env`

#### Run Migrations

Execute these SQL files in order:

```sql
-- 1. Create users table
-- Copy content from server/database/migrations/001_create_users.sql

-- 2. Create applications table  
-- Copy content from server/database/migrations/002_create_applications.sql

-- 3. Create orders table
-- Copy content from server/database/migrations/003_create_orders.sql

-- 4. Insert initial data
-- Copy content from server/database/seeds/initial_data.sql
```

### 5. Vercel Blob Setup

1. Go to Vercel dashboard
2. Create new Blob store
3. Copy the read/write token
4. Add to `.env` file

### 6. Start Development Servers

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server:dev
```

### 7. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Health: http://localhost:3000/api/health

## Project Structure Overview

```
zalpay-premium/
├── public/                    # Static assets
│   ├── images/
│   │   ├── apps/             # App icons/images
│   │   ├── qris/             # QRIS payment images
│   │   └── logo/             # Brand logos
│   └── robots.txt
├── src/                      # Frontend source
│   ├── assets/css/           # Stylesheets
│   ├── components/           # Vue components
│   │   ├── common/           # Shared components
│   │   ├── ui/               # UI components
│   │   └── layout/           # Layout components
│   ├── views/                # Page components
│   │   └── admin/            # Admin pages
│   ├── router/               # Vue Router config
│   ├── store/                # Pinia store
│   │   └── modules/          # Store modules
│   ├── composables/          # Composition functions
│   ├── utils/                # Utility functions
│   └── main.js              # App entry point
├── server/                   # Backend source
│   ├── controllers/          # Route handlers
│   ├── models/              # Database models
│   ├── middleware/          # Express middleware
│   ├── routes/              # API routes
│   ├── utils/               # Server utilities
│   ├── config/              # Configuration
│   ├── database/            # DB config & migrations
│   └── index.js             # Server entry point
└── docs/                    # Documentation
```

## Default Admin Account

After running the seed data:

- Username: `admin`
- Email: `admin@zalpay.com` 
- Password: `password` (hash included in seed)

**Important:** Change the default password after first login!

## Initial Data

The seed file includes sample applications:
- Spotify Premium
- Canva Pro
- Netflix Premium
- And more...

## Development Commands

```bash
# Start frontend dev server
npm run dev

# Start backend dev server
npm run server:dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start production server
npm run server
```

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT tokens | `abc123...` (32+ chars) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob access token | `vercel_blob_rw_...` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NODE_ENV` | Environment mode | `development/production` |
| `PORT` | Server port | `3000` |
| `WHATSAPP_NUMBER` | WhatsApp contact number | `6285401426305` |

## Testing

### Frontend Testing
```bash
# Component testing (if implemented)
npm run test

# E2E testing (if implemented)  
npm run test:e2e
```

### Backend Testing
```bash
# API testing (if implemented)
npm run test:api

# Manual API testing
curl http://localhost:3000/api/health
```

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Apps catalog displays
- [ ] App details and checkout work
- [ ] Admin login functional
- [ ] CRUD operations work
- [ ] File upload works
- [ ] WhatsApp integration works
- [ ] QRIS display works

## Common Issues & Solutions

### Issue: Database Connection Failed
**Solution:** 
- Check DATABASE_URL format
- Ensure database server is running
- Verify network connectivity

### Issue: Blob Upload Not Working
**Solution:**
- Verify BLOB_READ_WRITE_TOKEN
- Check Vercel Blob permissions
- Ensure file size < 5MB

### Issue: Frontend Build Errors
**Solution:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors
- Verify import paths

### Issue: API CORS Errors
**Solution:**
- Check CORS configuration in server/index.js
- Verify frontend URL in CORS origins
- Clear browser cache

## Development Workflow

1. **Feature Development**
   - Create feature branch
   - Implement changes
   - Test locally
   - Submit pull request

2. **Database Changes**
   - Create migration file
   - Test migration locally
   - Update documentation
   - Deploy carefully

3. **Deployment**
   - Test in staging environment
   - Deploy to production
   - Monitor for issues
   - Rollback if needed

## Performance Tips

- Use Vue DevTools for debugging
- Monitor network requests
- Optimize images before upload
- Use lazy loading for large lists
- Implement proper error boundaries

## Security Notes

- Never commit `.env` file
- Use strong JWT secrets
- Validate all user inputs
- Sanitize file uploads
- Implement rate limiting in production
- Use HTTPS in production
- Regular security audits

## Getting Help

- Check documentation in `/docs` folder
- Review error logs in console
- Use Vue DevTools for frontend debugging
- Check network tab for API issues
- Contact support via WhatsApp

## Next Steps

After setup:
1. Customize branding and colors
2. Add more applications
3. Configure payment gateway
4. Set up monitoring
5. Implement analytics
6. Add more features as needed
