<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/admin" class="flex items-center">
              <img class="h-6 sm:h-8 w-auto" src="https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/logo.png" alt="ZalPay Premium" />
              <span class="ml-2 sm:ml-3 text-lg sm:text-xl font-semibold text-gray-900 hidden sm:block">Admin Dashboard</span>
              <span class="ml-2 text-sm font-semibold text-gray-900 sm:hidden">Admin</span>
            </router-link>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-4">
            <router-link
              to="/admin/apps"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Aplikasi
            </router-link>
            <Button
              @click="showChangePasswordModal = true"
              variant="outline"
              size="sm"
            >
              <i class='bx bx-key mr-1'></i>
              Ganti Password
            </Button>
            
            <Button
              @click="openQRISModal"
              variant="outline" 
              size="sm"
              class="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            >
              <i class='bx bx-qr mr-1'></i>
              Update QRIS
            </Button>
            
            <Button
              @click="handleLogout"
              variant="outline"
              size="sm"
            >
              Logout
            </Button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 p-2"
            >
              <i class='bx bx-menu text-xl' v-if="!mobileMenuOpen"></i>
              <i class='bx bx-x text-xl' v-else></i>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div v-show="mobileMenuOpen" class="md:hidden border-t border-gray-200 py-4">
          <div class="flex flex-col space-y-2">
            <router-link
              to="/admin/apps"
              @click="mobileMenuOpen = false"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium block"
            >
              <i class='bx bx-package mr-2'></i>
              Kelola Aplikasi
            </router-link>
            <button
              @click="showChangePasswordModal = true; mobileMenuOpen = false"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium text-left flex items-center"
            >
              <i class='bx bx-key mr-2'></i>
              Ganti Password
            </button>
            <button
              @click="openQRISModal; mobileMenuOpen = false"
              class="text-green-700 hover:text-green-900 px-3 py-2 text-sm font-medium text-left flex items-center"
            >
              <i class='bx bx-qr mr-2'></i>
              Update QRIS
            </button>
            <button
              @click="handleLogout; mobileMenuOpen = false"
              class="text-red-700 hover:text-red-900 px-3 py-2 text-sm font-medium text-left flex items-center"
            >
              <i class='bx bx-log-out mr-2'></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div class="py-4 sm:py-6">
        <!-- Dashboard Header -->
        <div class="mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p class="mt-2 text-sm sm:text-base text-gray-600">Selamat datang di dashboard admin ZalPay Premium</p>
        </div>

        <!-- Statistics Cards -->
        <div v-if="loading" class="flex justify-center py-12">
          <Loading />
        </div>

        <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <!-- Total Revenue -->
          <div class="bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-6 col-span-2 lg:col-span-1">
            <div class="flex flex-col sm:flex-row items-start sm:items-center">
              <div class="p-2 sm:p-3 rounded-full bg-green-100 text-green-600 mb-2 sm:mb-0">
                <i class='bx bx-money text-lg sm:text-xl lg:text-2xl'></i>
              </div>
              <div class="sm:ml-4 w-full">
                <p class="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Pendapatan</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {{ formatCurrency(statistics.totalRevenue) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Total Orders -->
          <div class="bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center">
              <div class="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600 mb-2 sm:mb-0">
                <i class='bx bx-shopping-bag text-lg sm:text-xl lg:text-2xl'></i>
              </div>
              <div class="sm:ml-4 w-full">
                <p class="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Pesanan</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  {{ statistics.totalOrders }}
                </p>
              </div>
            </div>
          </div>

          <!-- Success Orders -->
          <div class="bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center">
              <div class="p-2 sm:p-3 rounded-full bg-emerald-100 text-emerald-600 mb-2 sm:mb-0">
                <i class='bx bx-check-circle text-lg sm:text-xl lg:text-2xl'></i>
              </div>
              <div class="sm:ml-4 w-full">
                <p class="text-xs sm:text-sm font-medium text-gray-600 truncate">Berhasil</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  {{ statistics.successOrders }}
                </p>
              </div>
            </div>
          </div>

          <!-- Pending Orders -->
          <div class="bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center">
              <div class="p-2 sm:p-3 rounded-full bg-yellow-100 text-yellow-600 mb-2 sm:mb-0">
                <i class='bx bx-clock text-lg sm:text-xl lg:text-2xl'></i>
              </div>
              <div class="sm:ml-4 w-full">
                <p class="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  {{ statistics.pendingOrders }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sales Overview -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <!-- Revenue Summary -->
          <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Ringkasan Pendapatan</h3>
            <div class="space-y-2 sm:space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm sm:text-base text-gray-600">Total Pendapatan:</span>
                <span class="text-sm sm:text-base font-semibold truncate ml-2">{{ formatCurrency(statistics.totalRevenue) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm sm:text-base text-gray-600">Rata-rata per Pesanan:</span>
                <span class="text-sm sm:text-base font-semibold truncate ml-2">
                  {{ statistics.totalOrders > 0 ? formatCurrency(statistics.totalRevenue / statistics.totalOrders) : 'Rp 0' }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm sm:text-base text-gray-600">Tingkat Keberhasilan:</span>
                <span class="text-sm sm:text-base font-semibold text-green-600">
                  {{ statistics.totalOrders > 0 ? Math.round((statistics.successOrders / statistics.totalOrders) * 100) : 0 }}%
                </span>
              </div>
            </div>
          </div>

          <!-- Popular Apps -->
          <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Aplikasi Terpopuler</h3>
            <div class="space-y-3 sm:space-y-4">
              <div 
                v-for="(app, index) in popularApps" 
                :key="app.id"
                class="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg"
              >
                <div class="flex items-center min-w-0 flex-1">
                  <div class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                    {{ index + 1 }}
                  </div>
                  <div class="ml-2 sm:ml-3 min-w-0 flex-1">
                    <p class="text-xs sm:text-sm font-medium text-gray-900 truncate">{{ app.name }}</p>
                    <p class="text-xs text-gray-600 truncate">{{ app.category }}</p>
                  </div>
                </div>
                <div class="text-right flex-shrink-0 ml-2">
                  <p class="text-xs sm:text-sm font-bold text-gray-900">{{ app.sales }} terjual</p>
                  <p class="text-xs text-gray-600 truncate">{{ formatCurrency(app.revenue) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Change Password Modal -->
    <Modal v-model="showChangePasswordModal" title="Ganti Password">
      <form @submit.prevent="handleChangePassword" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Password Lama
          </label>
          <Input
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="Masukkan password lama"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Password Baru
          </label>
          <Input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="Masukkan password baru"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Konfirmasi Password Baru
          </label>
          <Input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="Konfirmasi password baru"
            required
          />
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            @click="showChangePasswordModal = false"
          >
            Batal
          </Button>
          <Button type="submit" :loading="changingPassword">
            Ganti Password
          </Button>
        </div>
      </form>
    </Modal>

    <!-- QRIS Modal -->
    <Modal v-model="showQRISModal" title="Update QRIS">
      <div class="space-y-6">
        <!-- Current QRIS -->
        <div v-if="currentQRIS">
          <h3 class="text-sm font-medium text-gray-700 mb-2">QRIS Saat Ini:</h3>
          <div class="border rounded-lg p-4">
            <img :src="currentQRIS" alt="Current QRIS" class="max-w-full h-auto max-h-48 mx-auto">
            <p class="text-sm text-gray-500 text-center mt-2">{{ currentQRIS }}</p>
          </div>
        </div>

        <!-- Available QRIS Files -->
        <div v-if="availableQRIS.length > 0">
          <h3 class="text-sm font-medium text-gray-700 mb-2">Pilih QRIS yang Tersedia:</h3>
          <div class="grid grid-cols-2 gap-3">
            <div 
              v-for="qris in availableQRIS" 
              :key="qris.url"
              @click="selectQRIS(qris.url)"
              class="border rounded-lg p-2 cursor-pointer hover:border-blue-500 transition-colors"
              :class="{ 'border-blue-500 bg-blue-50': currentQRIS === qris.url }"
            >
              <img :src="qris.url" :alt="qris.filename" class="w-full h-24 object-cover rounded">
              <p class="text-xs text-center mt-1">{{ qris.filename }}</p>
            </div>
          </div>
        </div>

        <!-- Upload New QRIS -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Upload QRIS Baru:</h3>
          <form @submit.prevent="handleUploadQRIS" class="space-y-4">
            <div>
              <input
                type="file"
                accept="image/*"
                @change="handleQRISFileChange"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button type="submit" :loading="updatingQRIS" :disabled="!qrisFile">
              Upload QRIS Baru
            </Button>
          </form>
        </div>

        <div class="flex justify-end space-x-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            @click="showQRISModal = false"
          >
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth.js'
import { useAppsStore } from '@/store/modules/apps.js'
import { useQRISStore } from '@/store/modules/qris.js'
import { useApi } from '@/composables/useApi.js'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Loading from '@/components/common/Loading.vue'
import Modal from '@/components/common/Modal.vue'

export default {
  name: 'AdminDashboard',
  components: {
    Button,
    Input,
    Loading,
    Modal
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const appsStore = useAppsStore()
    const qrisStore = useQRISStore()
    const { post, put } = useApi()

    const loading = ref(true)
    const mobileMenuOpen = ref(false)
    const showChangePasswordModal = ref(false)
    const showQRISModal = ref(false)
    const changingPassword = ref(false)
    const updatingQRIS = ref(false)

    const statistics = reactive({
      totalRevenue: 0,
      totalOrders: 0,
      successOrders: 0,
      pendingOrders: 0
    })

    const popularApps = ref([])

    const passwordForm = reactive({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const qrisFile = ref(null)
    const currentQRIS = ref('')
    const availableQRIS = ref([])

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    }

    const formatDate = (dateString) => {
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(dateString))
    }

    const loadStatistics = async () => {
      try {
        // Load apps
        await appsStore.fetchApps()
        
        // Simple statistics without orders
        const apps = appsStore.apps
        statistics.totalOrders = 0
        statistics.totalRevenue = 0
        statistics.successOrders = 0
        statistics.pendingOrders = 0
        
        // Popular apps simulation
        popularApps.value = apps.slice(0, 5).map(app => ({
          name: app.name,
          sales: 0,
          revenue: 0,
          category: app.category || 'Premium App'
        }))
          
      } catch (error) {
        console.error('Error loading statistics:', error)
      }
    }

    const loadMonthlyRevenue = async () => {
      // Simple implementation without chart
      console.log('Loading revenue data...')
    }

    const handleChangePassword = async () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        alert('Password baru dan konfirmasi password tidak sama')
        return
      }

      if (passwordForm.newPassword.length < 6) {
        alert('Password baru minimal 6 karakter')
        return
      }

      try {
        changingPassword.value = true
        
        const response = await put('/auth/change-password', {
          currentPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword
        })

        if (response.success) {
          alert('Password berhasil diganti')
          showChangePasswordModal.value = false
          Object.assign(passwordForm, {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
          })
        } else {
          alert(response.error || 'Gagal mengganti password')
        }
      } catch (error) {
        console.error('Error changing password:', error)
        alert('Terjadi kesalahan saat mengganti password')
      } finally {
        changingPassword.value = false
      }
    }

    const handleQRISFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        qrisFile.value = file
      }
    }

    const loadQRISData = async () => {
      try {
        // Load current QRIS
        const currentResponse = await post('/api/admin/current-qris', {}, { method: 'GET' })
        if (currentResponse.success) {
          currentQRIS.value = currentResponse.data.qris_url
        }

        // Load available QRIS files
        const listResponse = await post('/api/admin/qris-list', {}, { method: 'GET' })
        if (listResponse.success) {
          availableQRIS.value = listResponse.data.qris_files
        }
      } catch (error) {
        console.error('Error loading QRIS data:', error)
      }
    }

    const selectQRIS = async (qrisUrl) => {
      try {
        updatingQRIS.value = true
        
        const result = await post('/api/admin/set-qris', { qris_url: qrisUrl })
        
        if (result.success) {
          currentQRIS.value = qrisUrl
          alert('QRIS berhasil diatur!')
        } else {
          alert(result.message || 'Gagal mengatur QRIS')
        }
      } catch (error) {
        console.error('Error setting QRIS:', error)
        alert('Terjadi kesalahan saat mengatur QRIS')
      } finally {
        updatingQRIS.value = false
      }
    }

    const handleUploadQRIS = async () => {
      if (!qrisFile.value) {
        alert('Pilih file QRIS terlebih dahulu')
        return
      }

      try {
        updatingQRIS.value = true
        
        const formData = new FormData()
        formData.append('qris', qrisFile.value)

        console.log('Uploading QRIS file:', qrisFile.value.name, 'Size:', qrisFile.value.size)

        const result = await post('/api/admin/upload-qris', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        console.log('QRIS upload result:', result)
        
        if (result.success) {
          alert('QRIS berhasil diupload!')
          console.log('QRIS uploaded to:', result.data.qris_url)
          
          // Reload QRIS data
          await loadQRISData()
          
          qrisFile.value = null
          
          // Reset file input
          const fileInput = document.querySelector('input[type="file"]')
          if (fileInput) fileInput.value = ''
        } else {
          alert(result.message || 'Gagal mengupload QRIS')
        }
      } catch (error) {
        console.error('Error uploading QRIS:', error)
        alert('Terjadi kesalahan saat mengupload QRIS: ' + error.message)
      } finally {
        updatingQRIS.value = false
      }
    }

    const openQRISModal = async () => {
      showQRISModal.value = true
      await loadQRISData()
    }

    const handleLogout = async () => {
      await authStore.logout()
      router.push('/admin/login')
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const loadDashboardData = async () => {
      loading.value = true
      try {
        await loadStatistics()
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadDashboardData()
    })

    return {
      loading,
      mobileMenuOpen,
      showChangePasswordModal,
      showQRISModal,
      changingPassword,
      updatingQRIS,
      statistics,
      popularApps,
      passwordForm,
      qrisFile,
      currentQRIS,
      availableQRIS,
      formatCurrency,
      formatDate,
      loadMonthlyRevenue,
      handleChangePassword,
      handleQRISFileChange,
      handleUploadQRIS,
      selectQRIS,
      openQRISModal,
      handleLogout,
      toggleMobileMenu
    }
  }
}
</script>