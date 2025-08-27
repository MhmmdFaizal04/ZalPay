import { ref, computed } from 'vue'
import { useAuthStore } from '@/store/modules/auth.js'

export function useAuth() {
  const authStore = useAuthStore()
  const loginForm = ref({
    username: '',
    password: ''
  })
  const isSubmitting = ref(false)

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const loading = computed(() => authStore.loading)

  const login = async () => {
    if (isSubmitting.value) return

    isSubmitting.value = true
    try {
      const result = await authStore.login(loginForm.value)
      return result
    } finally {
      isSubmitting.value = false
    }
  }

  const logout = async () => {
    authStore.logout()
  }

  const resetLoginForm = () => {
    loginForm.value = {
      username: '',
      password: ''
    }
  }

  return {
    loginForm,
    isSubmitting,
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    resetLoginForm
  }
}
