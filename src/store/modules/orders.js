import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/utils/api.js'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])
  const currentOrder = ref(null)
  const stats = ref({})
  const loading = ref(false)
  const error = ref(null)

  const createOrder = async (orderData) => {
    try {
      loading.value = true
      error.value = null
      const response = await api.post('/orders', orderData)
      
      if (response.data.success) {
        currentOrder.value = response.data.data.order
        return { 
          success: true, 
          message: response.data.message,
          order: response.data.data.order
        }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal membuat pesanan'
      error.value = message
      return { success: false, message }
    } finally {
      loading.value = false
    }
  }

  const fetchOrders = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await api.get('/orders')
      
      if (response.data.success) {
        orders.value = response.data.data.orders
      } else {
        error.value = response.data.message
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat pesanan'
      console.error('Fetch orders error:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchOrderByOrderId = async (orderId) => {
    try {
      loading.value = true
      error.value = null
      const response = await api.get(`/orders/order-id/${orderId}`)
      
      if (response.data.success) {
        currentOrder.value = response.data.data.order
        return response.data.data.order
      } else {
        error.value = response.data.message
        return null
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Pesanan tidak ditemukan'
      console.error('Fetch order by order id error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteOrder = async (id) => {
    try {
      const response = await api.delete(`/orders/${id}`)
      
      if (response.data.success) {
        await fetchOrders() // Refresh orders list
        return { success: true, message: response.data.message }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Gagal menghapus pesanan'
      }
    }
  }

  const fetchOrderStats = async () => {
    try {
      const response = await api.get('/orders/stats')
      
      if (response.data.success) {
        stats.value = response.data.data.stats
      }
    } catch (err) {
      console.error('Fetch order stats error:', err)
    }
  }

  return {
    orders,
    currentOrder,
    stats,
    loading,
    error,
    createOrder,
    fetchOrders,
    fetchOrderByOrderId,
    deleteOrder,
    fetchOrderStats
  }
})
