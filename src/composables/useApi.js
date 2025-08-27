import { ref } from 'vue'
import { api } from '@/utils/api.js'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const execute = async (request) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await request()
      data.value = response.data
      
      return {
        success: true,
        data: response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Something went wrong'
      return {
        success: false,
        error: error.value
      }
    } finally {
      loading.value = false
    }
  }

  const get = (url, config = {}) => {
    return execute(() => api.get(url, config))
  }

  const post = (url, data, config = {}) => {
    return execute(() => api.post(url, data, config))
  }

  const put = (url, data, config = {}) => {
    return execute(() => api.put(url, data, config))
  }

  const patch = (url, data, config = {}) => {
    return execute(() => api.patch(url, data, config))
  }

  const del = (url, config = {}) => {
    return execute(() => api.delete(url, config))
  }

  const reset = () => {
    loading.value = false
    error.value = null
    data.value = null
  }

  return {
    loading,
    error,
    data,
    get,
    post,
    put,
    patch,
    del,
    reset
  }
}
