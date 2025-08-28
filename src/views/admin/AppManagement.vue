<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/admin" class="flex items-center">
              <img class="h-8 w-auto" src="https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/logo.png" alt="ZalPay Premium" />
              <span class="ml-3 text-xl font-semibold text-gray-900">Admin Dashboard</span>
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4">
            <router-link
              to="/admin"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </router-link>
            <Button
              @click="handleLogout"
              variant="outline"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
      <div class="py-4 sm:py-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Manajemen Aplikasi</h1>
            <p class="mt-2 text-sm sm:text-base text-gray-600">Kelola aplikasi yang tersedia di platform</p>
          </div>
          <Button @click="openCreateModal" class="w-full sm:w-auto">
            <i class='bx bx-plus mr-2'></i>
            Tambah Aplikasi
          </Button>
        </div>

        <!-- Apps Grid -->
        <div v-if="loading" class="flex justify-center py-12">
          <Loading />
        </div>

        <div v-else-if="apps.length === 0" class="text-center py-12">
          <i class='bx bx-package text-6xl text-gray-400 mb-4'></i>
          <h3 class="text-xl font-medium text-gray-900 mb-2">
            Belum Ada Aplikasi
          </h3>
          <p class="text-gray-600 mb-4">
            Mulai dengan menambahkan aplikasi pertama Anda
          </p>
          <Button @click="openCreateModal">
            Tambah Aplikasi
          </Button>
        </div>

        <div v-else class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          <div
            v-for="app in apps"
            :key="app.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div class="aspect-square bg-gray-100">
              <img
                :src="app.image_path"
                :alt="app.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              >
            </div>
            
            <div class="p-2 sm:p-3 lg:p-4">
              <div class="mb-2">
                <h3 class="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 line-clamp-2 mb-1">
                  {{ app.name }}
                </h3>
                <div class="flex items-center justify-between">
                  <StatusBadge :available="app.available" />
                  <span class="text-xs text-gray-500 truncate ml-1">
                    {{ app.category }}
                  </span>
                </div>
              </div>
              
              <p class="text-gray-600 text-xs lg:text-sm mb-2 line-clamp-2 hidden md:block">
                {{ app.description }}
              </p>
              
              <!-- Price Range -->
              <div class="mb-2 text-xs text-center" v-if="app.variants && app.variants.length > 0">
                <span class="text-blue-600 font-semibold">
                  {{ formatPriceRange(app.variants) }}
                </span>
                <span class="text-gray-500 ml-1">({{ app.variants.length }} varian)</span>
              </div>
              
              <div class="flex justify-center space-x-1">
                <button
                  @click="editApp(app)"
                  class="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                  title="Edit"
                >
                  <i class='bx bx-edit text-sm lg:text-base'></i>
                </button>
                <button
                  @click="toggleAvailability(app)"
                  class="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50 transition-colors"
                  :title="app.available ? 'Nonaktifkan' : 'Aktifkan'"
                >
                  <i :class="app.available ? 'bx bx-toggle-right' : 'bx bx-toggle-left'" class="text-sm lg:text-base"></i>
                </button>
                <button
                  @click="deleteApp(app)"
                  class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                  title="Hapus"
                >
                  <i class='bx bx-trash text-sm lg:text-base'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <Modal v-model="showCreateModal" :title="editingApp ? 'Edit Aplikasi' : 'Tambah Aplikasi Baru'">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nama Aplikasi
          </label>
          <Input
            v-model="form.name"
            type="text"
            placeholder="Masukkan nama aplikasi"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan deskripsi aplikasi"
            required
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Varian Aplikasi
          </label>
          <div class="space-y-3">
            <div v-for="(variant, index) in form.variants" :key="index" class="flex gap-2 items-end">
              <div class="flex-1">
                <label class="block text-xs text-gray-600 mb-1">Nama Varian</label>
                <Input
                  v-model="variant.name"
                  type="text"
                  placeholder="Nama varian (contoh: Pro 30D 1PCS)"
                  required
                />
              </div>
              <div class="w-32">
                <label class="block text-xs text-gray-600 mb-1">Harga (Rp)</label>
                <Input
                  v-model="variant.price"
                  type="number"
                  placeholder="25000"
                  min="0"
                  required
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                @click="removeVariant(index)"
                v-if="form.variants.length > 1"
                class="mb-0"
              >
                <i class='bx bx-trash'></i>
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              @click="addVariant"
            >
              <i class='bx bx-plus mr-1'></i>
              Tambah Varian
            </Button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Fitur Aplikasi
          </label>
          <div class="space-y-2">
            <div v-for="(feature, index) in form.features" :key="index" class="flex gap-2">
              <Input
                v-model="form.features[index]"
                type="text"
                placeholder="Fitur aplikasi"
                class="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                @click="removeFeature(index)"
                v-if="form.features.length > 1"
              >
                <i class='bx bx-trash'></i>
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              @click="addFeature"
            >
              <i class='bx bx-plus mr-1'></i>
              Tambah Fitur
            </Button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            v-model="form.category"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Pilih kategori...</option>
            <option value="Music">Music</option>
            <option value="Video">Video</option>
            <option value="Productivity">Productivity</option>
            <option value="Gaming">Gaming</option>
            <option value="Security">Security</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Gambar
          </label>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div class="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            @click="closeModal"
          >
            Batal
          </Button>
          <Button
            type="submit"
            :loading="submitting"
            :disabled="submitting"
          >
            <span v-if="submitting">{{ editingApp ? 'Mengupdate...' : 'Menyimpan...' }}</span>
            <span v-else>{{ editingApp ? 'Update' : 'Simpan' }}</span>
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth.js'
import { useAppsStore } from '@/store/modules/apps.js'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import Loading from '@/components/common/Loading.vue'
import Modal from '@/components/common/Modal.vue'

export default {
  name: 'AdminAppManagement',
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

    const loading = computed(() => appsStore.loading)
    const apps = computed(() => appsStore.apps)
    const submitting = ref(false)
    const showCreateModal = ref(false)
    const editingApp = ref(null)

    const form = reactive({
      name: '',
      description: '',
      category: '',
      variants: [{ name: '', price: '' }],
      features: [''],
      image: null
    })

    const loadApps = async () => {
      await appsStore.fetchApps()
    }

    const addVariant = () => {
      form.variants.push({ name: '', price: '' })
    }

    const removeVariant = (index) => {
      form.variants.splice(index, 1)
    }

    const addFeature = () => {
      form.features.push('')
    }

    const removeFeature = (index) => {
      form.features.splice(index, 1)
    }

    const generateSlug = (name) => {
      return name.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')
    }

    const handleSubmit = async () => {
      try {
        submitting.value = true
        
        // Filter out empty variants and features
        const cleanVariants = form.variants.filter(v => v.name.trim() && v.price)
        const cleanFeatures = form.features.filter(f => f.trim())
        
        // Convert price to number for each variant
        const processedVariants = cleanVariants.map(v => ({
          name: v.name.trim(),
          price: parseFloat(v.price)
        }))
        
        const formData = {
          name: form.name,
          slug: generateSlug(form.name),
          description: form.description,
          category: form.category,
          variants: processedVariants,
          features: cleanFeatures,
          available: true
        }

        if (form.image) {
          formData.image = form.image
        }
        
        let result
        if (editingApp.value) {
          result = await appsStore.updateApp(editingApp.value.id, formData)
        } else {
          result = await appsStore.createApp(formData)
        }
        
        if (result.success) {
          await loadApps()
          closeModal()
          alert(result.message || 'Aplikasi berhasil disimpan')
        } else {
          alert(result.message || 'Terjadi kesalahan')
        }
      } catch (error) {
        console.error('Error saving app:', error)
        alert('Terjadi kesalahan saat menyimpan aplikasi')
      } finally {
        submitting.value = false
      }
    }

    const editApp = (app) => {
      // First reset editing state
      editingApp.value = null
      
      // Then set the editing app
      editingApp.value = app
      
      // Populate form with app data
      Object.assign(form, {
        name: app.name,
        description: app.description,
        category: app.category,
        variants: app.variants && app.variants.length > 0 ? 
                  app.variants.map(v => ({ name: v.name, price: v.price.toString() })) : 
                  [{ name: '', price: '' }],
        features: Array.isArray(app.features) ? [...app.features] : 
                  typeof app.features === 'string' ? JSON.parse(app.features || '[""]') : [''],
        image: null
      })
      
      // Clear file input
      if (document.querySelector('input[type="file"]')) {
        document.querySelector('input[type="file"]').value = ''
      }
      
      showCreateModal.value = true
    }

    const toggleAvailability = async (app) => {
      try {
        const result = await appsStore.updateApp(app.id, {
          available: !app.available
        })
        
        if (result.success) {
          await loadApps()
          alert(`Aplikasi "${app.name}" berhasil ${!app.available ? 'diaktifkan' : 'dinonaktifkan'}`)
        } else {
          alert(result.message || 'Gagal mengubah status aplikasi')
        }
      } catch (error) {
        console.error('Error toggling availability:', error)
        alert('Terjadi kesalahan saat mengubah status aplikasi')
      }
    }

    const deleteApp = async (app) => {
      if (!confirm(`Yakin ingin menghapus aplikasi "${app.name}"?\n\nPerhatian: Aplikasi yang memiliki pesanan tidak dapat dihapus.`)) return
      
      try {
        const result = await appsStore.deleteApp(app.id)
        
        if (result.success) {
          await loadApps()
          alert(`Aplikasi "${app.name}" berhasil dihapus`)
        } else {
          // Show more informative error message
          if (result.message.includes('pesanan yang menggunakan')) {
            alert(`Tidak dapat menghapus "${app.name}":\n\n${result.message}\n\nTip: Gunakan tombol toggle untuk menonaktifkan aplikasi ini sebagai gantinya.`)
          } else {
            alert(result.message || 'Gagal menghapus aplikasi')
          }
        }
      } catch (error) {
        console.error('Error deleting app:', error)
        alert('Terjadi kesalahan saat menghapus aplikasi')
      }
    }

    const closeModal = () => {
      showCreateModal.value = false
      editingApp.value = null
      Object.assign(form, {
        name: '',
        description: '',
        category: '',
        variants: [{ name: '', price: '' }],
        features: [''],
        image: null
      })
      // Clear file input
      if (document.querySelector('input[type="file"]')) {
        document.querySelector('input[type="file"]').value = ''
      }
    }

    const openCreateModal = () => {
      // Reset state first
      editingApp.value = null
      Object.assign(form, {
        name: '',
        description: '',
        category: '',
        variants: [{ name: '', price: '' }],
        features: [''],
        image: null
      })
      // Clear file input
      if (document.querySelector('input[type="file"]')) {
        document.querySelector('input[type="file"]').value = ''
      }
      showCreateModal.value = true
    }

    const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        form.image = file
      }
    }

    const handleLogout = async () => {
      await authStore.logout()
      router.push('/admin/login')
    }

    const handleImageError = (event) => {
      event.target.src = '/images/placeholder-app.png'
    }

    const formatPriceRange = (variants) => {
      if (!variants || variants.length === 0) return 'Rp 0'
      
      const prices = variants.map(v => parseFloat(v.price)).sort((a, b) => a - b)
      const minPrice = prices[0]
      const maxPrice = prices[prices.length - 1]
      
      if (minPrice === maxPrice) {
        return `Rp ${new Intl.NumberFormat('id-ID').format(minPrice)}`
      } else {
        return `Rp ${new Intl.NumberFormat('id-ID').format(minPrice)} - ${new Intl.NumberFormat('id-ID').format(maxPrice)}`
      }
    }

    onMounted(() => {
      loadApps()
    })

    return {
      loading,
      submitting,
      showCreateModal,
      editingApp,
      apps,
      form,
      loadApps,
      addVariant,
      removeVariant,
      addFeature,
      removeFeature,
      handleSubmit,
      editApp,
      toggleAvailability,
      deleteApp,
      openCreateModal,
      closeModal,
      handleFileChange,
      handleLogout,
      handleImageError,
      formatPriceRange
    }
  }
}
</script>
