# ZalPay Premium

Platform penjualan aplikasi premium dengan teknologi modern dan keamanan tingkat tinggi.

## 🚀 Tech Stack

- **Frontend**: Vue.js 3 + Composition API
- **Backend**: Node.js + Express.js
- **Database**: Neon PostgreSQL
- **Storage**: Vercel Blob
- **Styling**: Tailwind CSS
- **Icons**: Boxicons
- **Authentication**: JWT
- **Deployment**: Vercel

## 📁 Struktur Folder

```
zalpay-premium/
├── public/                 # Static assets
│   ├── images/            # Gambar aplikasi dan assets
│   └── robots.txt         # SEO robots file
├── src/                   # Source code frontend
│   ├── components/        # Vue components
│   ├── views/            # Page components
│   ├── store/            # Pinia store
│   ├── router/           # Vue router
│   ├── composables/      # Reusable composition functions
│   └── utils/            # Utility functions
├── server/               # Backend source code
│   ├── controllers/      # Route handlers
│   ├── models/          # Database models
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   └── database/        # Database config & migrations
└── docs/                # Documentation
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)
- Vercel account (for Blob storage)

### Installation

1. Clone repository
```bash
git clone <repository-url>
cd zalpay-premium
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Setup database
```bash
# Run migrations manually or via your database client
# Execute files in server/database/migrations/ in order
# Then run server/database/seeds/initial_data.sql
```

5. Start development servers
```bash
# Frontend (Vite dev server)
npm run dev

# Backend (in separate terminal)
npm run server:dev
```

## 🚀 Deployment

### Vercel Deployment

1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

```env
JWT_SECRET=your_jwt_secret
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
DATABASE_URL=your_neon_postgresql_url
NODE_ENV=production
PORT=3000
WHATSAPP_NUMBER=6285401426305
```

## 📱 Features

### Customer Features
- ✅ Browse aplikasi premium
- ✅ Real-time status ketersediaan
- ✅ Checkout dengan QRIS
- ✅ WhatsApp integration
- ✅ Receipt generation
- ✅ Responsive design

### Admin Features
- ✅ JWT Authentication
- ✅ CRUD aplikasi
- ✅ Manajemen orders
- ✅ Upload gambar ke Vercel Blob
- ✅ Dashboard analytics
- ✅ Toggle status ketersediaan

## 🔐 Security

- JWT authentication untuk admin
- CORS protection
- Helmet.js security headers
- Input validation
- SQL injection protection
- XSS protection

## 📊 Database Schema

### Tables
- `users` - Admin users
- `applications` - Aplikasi yang dijual
- `orders` - Data pesanan customer

## 🎨 Design System

- **Colors**: Hitam-putih minimal design
- **Typography**: Inter font family
- **Animations**: Vue 3 transitions
- **Icons**: Boxicons library
- **Layout**: Responsive Tailwind CSS

## 📞 WhatsApp Integration

Format pesan otomatis:
```
*STRUK PEMBELIAN ZALPAY PREMIUM*

📋 Detail Pesanan:
• Order ID: ZP1234567890
• Aplikasi: Spotify Premium
• Varian: Individual
• Total: Rp 18.000

👤 Data Customer:
• Nama: John Doe
• Email: john@email.com
• Telepon: 08123456789

Terima kasih telah berbelanja!
```

## 🛡️ Error Handling

- Comprehensive error boundaries
- API error responses
- Loading states
- Form validation
- Image fallbacks

## 📈 Performance

- Code splitting
- Lazy loading routes
- Optimized images
- Minimal dependencies
- Fast API responses

## 🧪 API Documentation

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/change-password` - Change password

### Applications
- `GET /api/apps` - Get all apps
- `GET /api/apps/slug/:slug` - Get app by slug
- `POST /api/apps` - Create app (admin)
- `PUT /api/apps/:id` - Update app (admin)
- `DELETE /api/apps/:id` - Delete app (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/order-id/:orderId` - Get order by ID
- `PUT /api/orders/:id/status` - Update status (admin)

## 📝 License

Private project - All rights reserved

## 👥 Support

- WhatsApp: +62 854-0142-6305
- Email: support@zalpay.com
