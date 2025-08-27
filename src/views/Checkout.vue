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
            
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Kategori</h3>
                <span class="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {{ app.category }}
                </span>
              </div>
              
              <div v-if="app.features && app.features.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2">Fitur</h3>
                <ul class="list-disc list-inside text-gray-600 space-y-1">
                  <li v-for="feature in app.features" :key="feature">
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Order Form -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">
              Detail Pemesanan
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Variant Selection -->
              <div v-if="app.variants && app.variants.length > 0">
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
                    v-for="variant in app.variants"
                    :key="variant"
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
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>

              <!-- Price Summary -->
              <div v-if="form.variant" class="bg-gray-50 rounded-lg p-4">
                <div class="flex justify-between items-center text-lg font-semibold">
                  <span>Total Pembayaran:</span>
                  <span class="text-blue-600">
                    Rp {{ formatPrice(app.price) }}
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
              >
                <span v-if="!app.available">Tidak Tersedia</span>
                <span v-else-if="submitting">Memproses Pesanan...</span>
                <span v-else>Buat Pesanan</span>
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
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppsStore } from '@/store/modules/apps.js'
import { useOrdersStore } from '@/store/modules/orders.js'
import { useWhatsapp } from '@/composables/useWhatsapp.js'
import MainLayout from '@/components/layout/MainLayout.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import Loading from '@/components/common/Loading.vue'
import QRISModal from '@/components/ui/QRISModal.vue'

export default {
  name: 'Checkout',
  components: {
    MainLayout,
    Input,
    Button,
    StatusBadge,
    Loading,
    QRISModal
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const appsStore = useAppsStore()
    const ordersStore = useOrdersStore()
    const { openWhatsApp: openWhatsAppComposable } = useWhatsapp()

    const loading = ref(true)
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

    const fetchApp = async () => {
      try {
        loading.value = true
        app.value = await appsStore.fetchAppBySlug(route.params.slug)
        console.log('App data in checkout:', app.value)
        console.log('App available status:', app.value?.available)
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
          variant: form.variant,
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
            totalAmount: app.value.price,
            customerName: form.customer_name,
            customerEmail: form.customer_email,
            customerPhone: form.customer_phone
          }
          
          // Show QRIS modal instead of success modal
          showQRISModal.value = true
          
          // Reset form
          Object.assign(form, {
            variant: '',
            customer_name: '',
            customer_email: '',
            customer_phone: ''
          })
        } else {
          alert(result.message || 'Terjadi kesalahan saat membuat pesanan.')
        }
      } catch (error) {
        console.error('Error creating order:', error)
        alert('Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.')
      } finally {
        submitting.value = false
      }
    }

    const openWhatsApp = () => {
      if (orderResult.value) {
        const message = `Halo, saya ingin melakukan pembayaran untuk order ${orderResult.value.order_id}`
        openWhatsAppComposable(message)
      }
    }

    const goToHome = () => {
      showQRISModal.value = false
      router.push('/')
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
      handleSubmit,
      openWhatsApp,
      goToHome,
      formatPrice,
      handleImageError
    }
  }
}
</script>
