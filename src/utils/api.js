import axios from 'axios'

const baseURL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:3000/api' 
  : '/api'

export const api = axios.create({
  baseURL,
  timeout: 30000, // Increased timeout for serverless functions
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.baseURL)
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data, error.config?.url)
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      
      // Redirect based on current path
      const currentPath = window.location.pathname
      if (currentPath.startsWith('/admin')) {
        window.location.href = '/admin/login'
      } else {
        window.location.href = '/auth'
      }
    }
    return Promise.reject(error)
  }
)
