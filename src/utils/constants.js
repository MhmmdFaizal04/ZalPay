// App configuration
export const APP_NAME = 'ZalPay Premium'
export const APP_DESCRIPTION = 'Platform penjualan aplikasi premium terpercaya'
export const APP_VERSION = '1.0.0'

// WhatsApp configuration
export const WHATSAPP_NUMBER = '62895401426305'
export const WHATSAPP_BASE_URL = 'https://wa.me'

// Order status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Menunggu Pembayaran',
  [ORDER_STATUS.PROCESSING]: 'Sedang Diproses',
  [ORDER_STATUS.COMPLETED]: 'Selesai',
  [ORDER_STATUS.CANCELLED]: 'Dibatalkan'
}

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [ORDER_STATUS.PROCESSING]: 'bg-blue-100 text-blue-800 border-blue-200',
  [ORDER_STATUS.COMPLETED]: 'bg-green-100 text-green-800 border-green-200',
  [ORDER_STATUS.CANCELLED]: 'bg-red-100 text-red-800 border-red-200'
}

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  APPS: {
    BASE: '/apps',
    BY_ID: (id) => `/apps/id/${id}`,
    BY_SLUG: (slug) => `/apps/slug/${slug}`,
    TOGGLE_AVAILABILITY: (id) => `/apps/${id}/availability`
  },
  ORDERS: {
    BASE: '/orders',
    BY_ORDER_ID: (orderId) => `/orders/order-id/${orderId}`,
    UPDATE_STATUS: (id) => `/orders/${id}/status`,
    STATS: '/orders/stats'
  }
}

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
}

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
}
