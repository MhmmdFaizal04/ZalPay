<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img class="mx-auto h-12 w-auto" src="https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/logo.png" alt="ZalPay Premium" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Masuk ke dashboard admin ZalPay Premium
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="Masukkan email admin"
              required
              class="mt-1"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              placeholder="Masukkan password"
              required
              class="mt-1"
            />
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
          <div class="text-sm text-red-800">
            {{ error }}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            :loading="loading"
            :disabled="loading"
            class="w-full"
          >
            <span v-if="loading">Memproses...</span>
            <span v-else>Masuk</span>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth.js'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

export default {
  name: 'AdminLogin',
  components: {
    Input,
    Button
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const loading = ref(false)
    const error = ref('')
    
    const form = reactive({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        loading.value = true
        error.value = ''
        
        const result = await authStore.login({
          username: form.email, // Backend mengharapkan username, bukan email
          password: form.password
        })
        
        if (result.success) {
          router.push('/admin')
        } else {
          error.value = result.message || 'Login gagal'
        }
      } catch (err) {
        error.value = err.message || 'Login gagal. Periksa email dan password Anda.'
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      error,
      handleLogin
    }
  }
}
</script>
