import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/utils/api.js'

export const useQRISStore = defineStore('qris', () => {
  const currentQRIS = ref('https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/qris.jpg') // Default QRIS
  const loading = ref(false)
  const error = ref(null)

  const fetchCurrentQRIS = async () => {
    try {
      loading.value = true
      error.value = null
      console.log('Fetching current QRIS from API...')
      const response = await api.get('/api/admin/current-qris')
      console.log('API Response:', response.data)
      
      if (response.data.success) {
        currentQRIS.value = response.data.data.qris_url
        console.log('Current QRIS loaded:', currentQRIS.value)
        return response.data.data.qris_url
      } else {
        // Fallback to default if API fails
        currentQRIS.value = 'https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/qris.jpg'
        console.log('Using default QRIS')
        return currentQRIS.value
      }
    } catch (err) {
      // Fallback to default if error
      currentQRIS.value = 'https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/qris.jpg'
      console.log('Error fetching QRIS, using default:', err.message)
      return currentQRIS.value
    } finally {
      loading.value = false
    }
  }

  const updateQRIS = async (qrisFile) => {
    try {
      loading.value = true
      error.value = null
      
      const formData = new FormData()
      formData.append('qris', qrisFile)

      console.log('Uploading QRIS with file:', qrisFile.name, 'Size:', qrisFile.size)

      const response = await api.post('/api/admin/upload-qris', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      console.log('Update QRIS response:', response.data)
      
      if (response.data.success) {
        currentQRIS.value = response.data.data.qris_url
        return { success: true, message: response.data.message, qris_url: response.data.data.qris_url }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (err) {
      console.error('Update QRIS error:', err)
      return { 
        success: false, 
        message: err.response?.data?.message || 'Gagal mengupdate QRIS'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    currentQRIS,
    loading,
    error,
    fetchCurrentQRIS,
    updateQRIS
  }
})
