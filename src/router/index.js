import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth.js'

// Lazy load components
const Home = () => import('@/views/Home.vue')
const Apps = () => import('@/views/Apps.vue')
const Checkout = () => import('@/views/Checkout.vue')
const AdminLogin = () => import('@/views/admin/Login.vue')
const AdminDashboard = () => import('@/views/admin/Dashboard.vue')
const AdminAppManagement = () => import('@/views/admin/AppManagement.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'ZalPay Premium - Platform Aplikasi Premium Terpercaya'
    }
  },
  {
    path: '/apps',
    name: 'Apps',
    component: Apps,
    meta: {
      title: 'Katalog Aplikasi - ZalPay Premium'
    }
  },
  {
    path: '/checkout/:slug',
    name: 'Checkout',
    component: Checkout,
    meta: {
      title: 'Checkout - ZalPay Premium'
    }
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: {
      title: 'Admin Login - ZalPay Premium',
      guest: true
    }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      title: 'Dashboard Admin - ZalPay Premium',
      requiresAuth: true
    }
  },
  {
    path: '/admin/apps',
    name: 'AdminAppManagement',
    component: AdminAppManagement,
    meta: {
      title: 'Manajemen Aplikasi - ZalPay Premium',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title
  document.title = to.meta.title || 'ZalPay Premium'
  
  // Check if route requires auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next('/admin/login')
      return
    }
  }
  
  // Check if route is for guests only
  if (to.matched.some(record => record.meta.guest)) {
    if (authStore.isAuthenticated) {
      next('/admin')
      return
    }
  }
  
  next()
})

export default router
