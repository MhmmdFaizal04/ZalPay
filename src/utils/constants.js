// App configuration
export const APP_NAME = 'ZalPay Premium'
export const APP_DESCRIPTION = 'Platform penjualan aplikasi premium terpercaya'
export const APP_VERSION = '1.0.0'

// WhatsApp configuration
export const WHATSAPP_NUMBER = '62895401426305'
export const WHATSAPP_BASE_URL = 'https://wa.me'

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
