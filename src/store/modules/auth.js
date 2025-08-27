import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/utils/api.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const login = async (credentials) => {
    try {
      loading.value = true
      const response = await api.post('/auth/login', credentials)
      
      if (response.data.success) {
        token.value = response.data.data.token
        user.value = response.data.data.user
        localStorage.setItem('token', token.value)
        api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login gagal'
      }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  const getProfile = async () => {
    try {
      if (!token.value) return
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      const response = await api.get('/auth/profile')
      
      if (response.data.success) {
        user.value = response.data.data.user
      } else {
        logout()
      }
    } catch (error) {
      console.error('Get profile error:', error)
      logout()
    }
  }

  const changePassword = async (passwordData) => {
    try {
      loading.value = true
      const response = await api.put('/auth/change-password', passwordData)
      return { 
        success: response.data.success, 
        message: response.data.message 
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Gagal mengubah password'
      }
    } finally {
      loading.value = false
    }
  }

  // Initialize auth state
  if (token.value) {
    getProfile()
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    getProfile,
    changePassword
  }
})
