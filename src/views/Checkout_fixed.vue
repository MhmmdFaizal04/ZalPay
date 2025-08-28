<template>
  <MainLayout>
    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <Loading />
      </div>

      <!-- App Not Found -->
      <div v-else-if="!app" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <i class='bx bx-error-circle text-6xl'></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Aplikasi Tidak Ditemukan
        </h2>
        <p class="text-gray-600 mb-6">
          Aplikasi yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <router-link
          to="/apps"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Kembali ke Katalog
        </router-link>
      </div>

      <!-- Checkout Form -->
      <div v-else class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- App Details -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="aspect-video mb-6 rounded-lg overflow-hidden bg-gray-100">
              <img
                :src="app.image_path"
                :alt="app.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              >
            </div>
            
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ app.name }}
            </h1>
            
            <StatusBadge
              :available="app.available"
              class="mb-4"
            />
            
            <p class="text-gray-600 mb-6">
              {{ app.description }}
            </p>

            <!-- Features -->
            <div v-if="app.features" class="mb-6">
              <h3 class="font-semibold text-gray-900 mb-3">Fitur:</h3>
              <ul class="space-y-2">
                <li 
                  v-for="feature in appFeatures" 
                  :key="feature"
                  class="flex items-center text-sm text-gray-600"
                >
                  <i class='bx bx-check text-green-500 mr-2'></i>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Order Form -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">
              Informasi Pemesanan
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Variant Selection -->
              <div v-if="appVariants.length > 0">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Varian
                </label>
                <select
                  v-model="form.variant"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Pilih varian...</option>
                  <option
                    v-for="(variant, index) in appVariants"
                    :key="index"
                    :value="variant"
                  >
                    {{ variant }}
                  </option>
                </select>
              </div>

              <!-- Customer Info -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <Input
                  v-model="form.customer_name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  v-model="form.customer_email"
                  type="email"
                  placeholder="Masukkan email"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nomor WhatsApp
                </label>
                <Input
                  v-model="form.customer_phone"
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  required
                />
              </div>

              <!-- Price Summary -->
              <div v-if="form.variant" class="bg-gray-50 rounded-lg p-4">
                <div class="flex justify-between items-center text-lg font-semibold">
                  <span>Total Pembayaran:</span>
                  <span class="text-blue-600">
                    Rp {{ formatPrice(app.price || 0) }}
                  </span>
                </div>
                <div class="text-sm text-gray-600 mt-1">
                  Varian: {{ form.variant }}
                </div>
              </div>

              <!-- Submit Button -->
              <Button
                type="submit"
                :disabled="!app.available || submitting"
                :loading="submitting"
                class="w-full"
                size="lg"
              >
                <i class='bx bx-cart mr-2'></i>
                {{ submitting ? 'Memproses...' : 'Lanjutkan ke Pembayaran' }}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- QRIS Payment Modal -->
    <QRISModal 
      v-model="showQRISModal" 
      :orderInfo="qrisOrderInfo"
    />
  </MainLayout>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppsStore } from '@/store/modules/apps.js'
import { useOrdersStore } from '@/store/modules/orders.js'
import MainLayout from '@/components/layout/MainLayout.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Loading from '@/components/common/Loading.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import QRISModal from '@/components/ui/QRISModal.vue'

export default {
  name: 'Checkout',
  components: {
    MainLayout,
    Button,
    Input,
    Loading,
    StatusBadge,
    QRISModal
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const appsStore = useAppsStore()
    const ordersStore = useOrdersStore()

    const loading = ref(false)
    const submitting = ref(false)
    const showQRISModal = ref(false)
    const app = ref(null)
    const orderResult = ref(null)
    const qrisOrderInfo = ref({})

    const form = reactive({
      variant: '',
      customer_name: '',
      customer_email: '',
      customer_phone: ''
    })

    const appVariants = computed(() => {
      if (!app.value || !app.value.variants) return []
      
      try {
        const variants = typeof app.value.variants === 'string' 
          ? JSON.parse(app.value.variants) 
          : app.value.variants
        
        return Array.isArray(variants) ? variants : []
      } catch {
        return []
      }
    })

    const appFeatures = computed(() => {
      if (!app.value || !app.value.features) return []
      
      try {
        const features = typeof app.value.features === 'string' 
          ? JSON.parse(app.value.features) 
          : app.value.features
        
        return Array.isArray(features) ? features : []
      } catch {
        return []
      }
    })

    const fetchApp = async () => {
      try {
        loading.value = true
        app.value = await appsStore.fetchAppBySlug(route.params.slug)
        console.log('App data in checkout:', app.value)
      } catch (error) {
        console.error('Error fetching app:', error)
      } finally {
        loading.value = false
      }
    }

    const handleSubmit = async () => {
      if (!form.variant) return

      try {
        submitting.value = true
        
        const orderData = {
          app_id: app.value.id,
          variant_name: form.variant,
          variant_price: app.value.price,
          quantity: 1,
          customer_info: {
            name: form.customer_name,
            email: form.customer_email,
            phone: form.customer_phone
          }
        }

        console.log('Sending order data:', orderData)
        const result = await ordersStore.createOrder(orderData)
        
        if (result.success) {
          orderResult.value = result.order
          
          // Setup QRIS modal info
          qrisOrderInfo.value = {
            orderId: result.order.order_id,
            appName: app.value.name,
            variant: form.variant,
            totalAmount: app.value.price
          }
          
          // Show QRIS modal
          showQRISModal.value = true
        } else {
          alert('Gagal membuat pesanan: ' + result.message)
        }
      } catch (error) {
        console.error('Error creating order:', error)
        alert('Terjadi kesalahan saat membuat pesanan')
      } finally {
        submitting.value = false
      }
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID').format(price)
    }

    const handleImageError = (event) => {
      event.target.src = '/images/placeholder-app.png'
    }

    onMounted(() => {
      fetchApp()
    })

    return {
      loading,
      submitting,
      showQRISModal,
      app,
      orderResult,
      qrisOrderInfo,
      form,
      appVariants,
      appFeatures,
      handleSubmit,
      formatPrice,
      handleImageError
    }
  }
}
</script>
