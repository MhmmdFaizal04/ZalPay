import { ref } from 'vue'
import { useQRISStore } from '@/store/modules/qris.js'

export function useQRIS() {
  const qrisStore = useQRISStore()

  const updateQRISImage = (newImageUrl) => {
    qrisStore.currentQRIS = newImageUrl
  }

  const getQRISImage = () => {
    return qrisStore.currentQRIS || 'https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/qris.jpg'
  }

  const fetchCurrentQRIS = async () => {
    try {
      await qrisStore.fetchCurrentQRIS()
      console.log('QRIS loaded:', qrisStore.currentQRIS)
    } catch (error) {
      console.error('Error fetching current QRIS:', error)
    }
  }

  return {
    qrisImage: qrisStore.currentQRIS,
    updateQRISImage,
    getQRISImage,
    fetchCurrentQRIS,
    loading: qrisStore.loading
  }
}
