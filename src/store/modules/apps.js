import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/utils/api.js'

export const useAppsStore = defineStore('apps', () => {
  const apps = ref([])
  const currentApp = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchApps = async () => {
    try {
      loading.value = true
      error.value = null
      console.log('Fetching apps from API...')
      const response = await api.get('/apps')
      console.log('API Response:', response.data)
      
      if (response.data.success) {
        apps.value = response.data.data.apps
        console.log('Apps loaded:', apps.value.length)
      } else {
        error.value = response.data.message
        console.error('API Error:', response.data.message)
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat aplikasi'
      console.error('Fetch apps error:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchAppBySlug = async (slug) => {
    try {
      loading.value = true
      error.value = null
      console.log('Fetching app by slug:', slug)
      const response = await api.get(`/apps/slug/${slug}`)
      console.log('API Response for app by slug:', response.data)
      
      if (response.data.success) {
        currentApp.value = response.data.data.app
        console.log('App data received:', response.data.data.app)
        console.log('Available status:', response.data.data.app.available)
        return response.data.data.app
      } else {
        error.value = response.data.message
        return null
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Aplikasi tidak ditemukan'
      console.error('Fetch app by slug error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchAppById = async (id) => {
    try {
      loading.value = true
      error.value = null
      const response = await api.get(`/apps/id/${id}`)
      
      if (response.data.success) {
        currentApp.value = response.data.data.app
        return response.data.data.app
      } else {
        error.value = response.data.message
        return null
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Aplikasi tidak ditemukan'
      console.error('Fetch app by id error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createApp = async (appData) => {
    try {
      loading.value = true
      const formData = new FormData()
      
      // Add all fields to FormData
      Object.keys(appData).forEach(key => {
        if (key === 'variants' || key === 'features') {
          formData.append(key, JSON.stringify(appData[key]))
        } else if (key === 'image') {
          if (appData[key]) {
            formData.append('image', appData[key])
          }
        } else {
          formData.append(key, appData[key])
        }
      })

      console.log('Creating app with data:', appData)

      const response = await api.post('/apps', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      console.log('Create app response:', response.data)
      
      if (response.data.success) {
        await fetchApps() // Refresh apps list
        return { success: true, message: response.data.message }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (err) {
      console.error('Create app error:', err)
      return { 
        success: false, 
        message: err.response?.data?.message || 'Gagal membuat aplikasi'
      }
    } finally {
      loading.value = false
    }
  }

  const updateApp = async (id, appData) => {
    try {
      loading.value = true
      const formData = new FormData()
      
      // Add all fields to FormData
      Object.keys(appData).forEach(key => {
        if (key === 'variants' || key === 'features') {
          formData.append(key, JSON.stringify(appData[key]))
        } else if (key === 'image') {
          if (appData[key]) {
            formData.append('image', appData[key])
          }
        } else {
          formData.append(key, appData[key])
        }
      })

      console.log('Updating app with data:', appData)

      const response = await api.put(`/apps/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      console.log('Update app response:', response.data)
      
      if (response.data.success) {
        await fetchApps() // Refresh apps list
        return { success: true, message: response.data.message }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (err) {
      console.error('Update app error:', err)
      return { 
        success: false, 
        message: err.response?.data?.message || 'Gagal mengupdate aplikasi'
      }
    } finally {
      loading.value = false
    }
  }

  const deleteApp = async (id) => {
    try {
      loading.value = true
      const response = await api.delete(`/apps/${id}`)
      
      if (response.data.success) {
        await fetchApps() // Refresh apps list
        return { success: true, message: response.data.message }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Gagal menghapus aplikasi'
      }
    } finally {
      loading.value = false
    }
  }

  const toggleAvailability = async (id, available) => {
    try {
      const response = await api.patch(`/apps/${id}/availability`, { available })
      
      if (response.data.success) {
        await fetchApps() // Refresh apps list
        return { success: true, message: response.data.message }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Gagal mengubah status ketersediaan'
      }
    }
  }

  return {
    apps,
    currentApp,
    loading,
    error,
    fetchApps,
    fetchAppBySlug,
    fetchAppById,
    createApp,
    updateApp,
    deleteApp,
    toggleAvailability
  }
})
