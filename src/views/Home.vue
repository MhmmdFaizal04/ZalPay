<template>
  <MainLayout>
    <!-- Hero Section -->
    <section class="bg-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span class="block">Platform Aplikasi</span>
            <span class="block">Premium Terpercaya</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Dapatkan akses ke berbagai aplikasi premium dengan harga terjangkau. 
            Spotify Premium, Canva Pro, VPN, dan masih banyak lagi tersedia di sini.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" @click="$router.push('/apps')">
              <i class='bx bx-mobile-alt mr-2'></i>
              Lihat Katalog
            </Button>
            <Button variant="secondary" size="lg" @click="scrollToFeatures">
              <i class='bx bx-info-circle mr-2'></i>
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section ref="featuresSection" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih ZalPay Premium?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan layanan terbaik dengan harga yang kompetitif dan dukungan 24/7
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 card-hover">
            <div class="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class='bx bx-shield-check text-white text-2xl'></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">100% Aman & Terpercaya</h3>
            <p class="text-gray-600">
              Semua transaksi dilindungi dengan sistem keamanan tingkat tinggi. 
              Garansi uang kembali jika tidak sesuai.
            </p>
          </div>

          <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 card-hover">
            <div class="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class='bx bx-money text-white text-2xl'></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Harga Terjangkau</h3>
            <p class="text-gray-600">
              Dapatkan aplikasi premium dengan harga jauh lebih murah dibanding berlangganan langsung.
            </p>
          </div>

          <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 card-hover">
            <div class="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class='bx bx-support text-white text-2xl'></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Support 24/7</h3>
            <p class="text-gray-600">
              Tim customer service kami siap membantu Anda kapan saja melalui WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Apps Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Aplikasi Terpopuler
          </h2>
          <p class="text-lg text-gray-600">
            Beberapa aplikasi yang paling banyak dibeli oleh customer kami
          </p>
        </div>

        <div v-if="loading" class="flex justify-center">
          <Loading text="Memuat aplikasi populer..." />
        </div>

        <div v-else class="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12">
          <AppCard 
            v-for="app in popularApps" 
            :key="app.id" 
            :app="app"
            class="transform hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div class="text-center">
          <Button size="lg" @click="$router.push('/apps')">
            <i class='bx bx-grid-alt mr-2'></i>
            Lihat Semua Aplikasi
          </Button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Siap Mulai Berbelanja?
        </h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Jangan lewatkan kesempatan mendapatkan aplikasi premium dengan harga terbaik.
          Bergabunglah dengan ribuan customer yang sudah puas!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" @click="$router.push('/apps')">
            <i class='bx bx-cart mr-2'></i>
            Mulai Belanja
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            @click="contactWhatsApp"
          >
            <i class='bx bxl-whatsapp mr-2'></i>
            Hubungi Kami
          </Button>
        </div>
        
        <!-- Admin Login Button (Discrete) -->
        <div class="mt-12 pt-8 border-t border-gray-700">
          <button
            @click="$router.push('/admin/login')"
            class="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200 flex items-center justify-center mx-auto"
            title="Admin Access"
          >
            <i class='bx bx-user-circle mr-2'></i>
            Admin Login
          </button>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import AppCard from '@/components/ui/AppCard.vue'
import Button from '@/components/ui/Button.vue'
import Loading from '@/components/common/Loading.vue'
import { useAppsStore } from '@/store/modules/apps.js'
import { WHATSAPP_NUMBER } from '@/utils/constants.js'

const appsStore = useAppsStore()
const featuresSection = ref(null)

const loading = ref(true)
const popularApps = ref([])

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const contactWhatsApp = () => {
  const message = encodeURIComponent('Halo, saya tertarik dengan aplikasi premium di ZalPay. Bisakah Anda membantu saya?')
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
}

onMounted(async () => {
  try {
    await appsStore.fetchApps()
    // Get first 6 available apps as popular apps (works well with 3-column mobile layout)
    popularApps.value = appsStore.apps
      .filter(app => app.available)
      .slice(0, 6)
  } catch (error) {
    console.error('Error loading popular apps:', error)
  } finally {
    loading.value = false
  }
})
</script>
