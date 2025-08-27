<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <img src="https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/logo.png" alt="ZalPay" class="h-8 w-auto mr-3">
            <h1 class="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
          </div>
          <div class="flex items-center space-x-4">
            <Button 
              variant="secondary" 
              size="sm"
              @click="showChangePasswordModal = true"
            >
              Ubah Password
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              @click="showQRISModal = true"
            >
              Update QRIS
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              @click="handleLogout"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Aplikasi</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalApps }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Pesanan</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalOrders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Pendapatan</p>
              <p class="text-2xl font-bold text-gray-900">Rp {{ formatPrice(stats.totalRevenue) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- QRIS Section -->
      <div class="bg-white rounded-lg shadow mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">QRIS Aktif</h2>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-center">
            <img 
              :src="currentQRIS" 
              alt="QRIS Code" 
              class="w-64 h-64 object-contain border rounded-lg"
              @error="handleQRISError"
            >
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Pesanan Terbaru</h2>
        </div>
        <div class="overflow-x-auto">
          <Loading v-if="loadingOrders" class="p-8" />
          <div v-else-if="recentOrders.length === 0" class="p-8 text-center text-gray-500">
            Belum ada pesanan
          </div>
          <table v-else class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Pesanan
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pelanggan
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aplikasi
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in recentOrders" :key="order.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ getCustomerName(order) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.app_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Rp {{ formatPrice(order.total_amount) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Selesai
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <Modal v-if="showChangePasswordModal" @close="closePasswordModal">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Ubah Password</h3>
        <form @submit.prevent="handleChangePassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password Saat Ini
            </label>
            <Input
              type="password"
              v-model="passwordForm.currentPassword"
              placeholder="Masukkan password saat ini"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password Baru
            </label>
            <Input
              type="password"
              v-model="passwordForm.newPassword"
              placeholder="Masukkan password baru"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password Baru
            </label>
            <Input
              type="password"
              v-model="passwordForm.confirmPassword"
              placeholder="Konfirmasi password baru"
              required
            />
          </div>
          <div v-if="passwordError" class="text-red-600 text-sm">
            {{ passwordError }}
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              @click="closePasswordModal"
              :disabled="changingPassword"
            >
              Batal
            </Button>
            <Button
              type="submit"
              :loading="changingPassword"
            >
              Ubah Password
            </Button>
          </div>
        </form>
      </div>
    </Modal>

    <!-- Update QRIS Modal -->
    <Modal v-if="showQRISModal" @close="closeQRISModal">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Update QRIS</h3>
        <form @submit.prevent="handleQRISUpload" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              File QRIS
            </label>
            <input
              ref="qrisFileInput"
              type="file"
              accept="image/*"
              @change="handleQRISFileChange"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
          <div v-if="qrisPreview" class="flex justify-center">
            <img :src="qrisPreview" alt="Preview" class="w-32 h-32 object-contain border rounded">
          </div>
          <div v-if="qrisError" class="text-red-600 text-sm">
            {{ qrisError }}
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              @click="closeQRISModal"
              :disabled="uploadingQRIS"
            >
              Batal
            </Button>
            <Button
              type="submit"
              :loading="uploadingQRIS"
            >
              Upload QRIS
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth.js'
import { useAppsStore } from '@/store/modules/apps.js'
import { useOrdersStore } from '@/store/modules/orders.js'
import { useQRIS } from '@/composables/useQRIS.js'
import { useApi } from '@/composables/useApi.js'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import Loading from '@/components/common/Loading.vue'
import Modal from '@/components/common/Modal.vue'

export default {
  name: 'AdminDashboard',
  components: {
    Button,
    Input,
    StatusBadge,
    Loading,
    Modal
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const appsStore = useAppsStore()
    const ordersStore = useOrdersStore()
    const { qrisImage, updateQRISImage, fetchCurrentQRIS } = useQRIS()
    const { post } = useApi()

    const loadingOrders = ref(true)
    const showChangePasswordModal = ref(false)
    const showQRISModal = ref(false)
    const changingPassword = ref(false)
    const uploadingQRIS = ref(false)
    const passwordError = ref('')
    const qrisError = ref('')
    const qrisFile = ref(null)
    const qrisPreview = ref('')
    const currentQRIS = ref('/images/qris/default-qris.png')
    const qrisFileInput = ref(null)
    
    const stats = ref({
      totalApps: 0,
      totalOrders: 0,
      totalRevenue: 0
    })
    const recentOrders = ref([])

    const passwordForm = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const loadDashboardData = async () => {
      try {
        // Load apps
        await appsStore.fetchApps()
        stats.value.totalApps = appsStore.apps.length

        // Load orders
        await ordersStore.fetchOrders()
        const orders = ordersStore.orders
        stats.value.totalOrders = orders.length
        stats.value.totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0)
        
        // Get recent orders (last 10)
        recentOrders.value = orders.slice(0, 10)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        loadingOrders.value = false
      }
    }

    const handleChangePassword = async () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        passwordError.value = 'Password baru dan konfirmasi password tidak sama'
        return
      }

      if (passwordForm.newPassword.length < 6) {
        passwordError.value = 'Password minimal 6 karakter'
        return
      }

      try {
        changingPassword.value = true
        passwordError.value = ''

        const response = await post('/api/auth/change-password', {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })

        if (response.success) {
          alert('Password berhasil diubah!')
          closePasswordModal()
        } else {
          passwordError.value = response.message || 'Gagal mengubah password'
        }
      } catch (error) {
        console.error('Error changing password:', error)
        passwordError.value = 'Terjadi kesalahan saat mengubah password'
      } finally {
        changingPassword.value = false
      }
    }

    const closePasswordModal = () => {
      showChangePasswordModal.value = false
      passwordError.value = ''
      Object.assign(passwordForm, {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }

    // QRIS Functions
    const handleQRISFileChange = (event) => {
      const file = event.target.files[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        qrisError.value = 'File harus berupa gambar'
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        qrisError.value = 'Ukuran file maksimal 5MB'
        return
      }

      qrisFile.value = file
      qrisError.value = ''

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        qrisPreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }

    const handleQRISUpload = async () => {
      if (!qrisFile.value) {
        qrisError.value = 'Pilih file QRIS terlebih dahulu'
        return
      }

      try {
        uploadingQRIS.value = true
        qrisError.value = ''

        const formData = new FormData()
        formData.append('qris', qrisFile.value)

        const response = await post('/api/admin/upload-qris', formData, {
          'Content-Type': 'multipart/form-data'
        })

        if (response.success) {
          // Update current QRIS display
          currentQRIS.value = response.data.qris_url
          updateQRISImage(response.data.qris_url)
          
          alert('QRIS berhasil diupdate!')
          closeQRISModal()
        } else {
          qrisError.value = response.message || 'Gagal mengupload QRIS'
        }
      } catch (error) {
        console.error('Error uploading QRIS:', error)
        qrisError.value = 'Terjadi kesalahan saat mengupload QRIS'
      } finally {
        uploadingQRIS.value = false
      }
    }

    const closeQRISModal = () => {
      showQRISModal.value = false
      qrisError.value = ''
      qrisFile.value = null
      qrisPreview.value = ''
      
      // Reset file input
      if (qrisFileInput.value) {
        qrisFileInput.value.value = ''
      }
    }

    const handleQRISError = (event) => {
      event.target.src = '/images/qris/default-qris.png'
    }

    const handleLogout = async () => {
      await authStore.logout()
      router.push('/admin/login')
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID').format(price)
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getCustomerName = (order) => {
      if (order.customer_info) {
        try {
          const customerInfo = typeof order.customer_info === 'string' 
            ? JSON.parse(order.customer_info) 
            : order.customer_info
          return customerInfo.name || 'N/A'
        } catch (e) {
          return 'N/A'
        }
      }
      return order.customer_name || 'N/A'
    }

    onMounted(() => {
      loadDashboardData()
      fetchCurrentQRIS().then(() => {
        currentQRIS.value = qrisImage.value
      })
    })

    return {
      stats,
      recentOrders,
      loadingOrders,
      showChangePasswordModal,
      showQRISModal,
      changingPassword,
      uploadingQRIS,
      passwordError,
      qrisError,
      qrisFile,
      qrisPreview,
      currentQRIS,
      qrisFileInput,
      passwordForm,
      handleLogout,
      handleChangePassword,
      closePasswordModal,
      handleQRISFileChange,
      handleQRISUpload,
      closeQRISModal,
      handleQRISError,
      formatPrice,
      formatDate,
      getCustomerName
    }
  }
}
</script>
