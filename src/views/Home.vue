<template>
  <MainLayout>
    <!-- Running Banner Section -->
    <section class="bg-gray-900 text-white py-2 overflow-hidden">
      <div class="whitespace-nowrap animate-marquee">
        <span class="inline-block px-8">
          🎉 Promo Spesial! Diskon hingga 50% untuk semua aplikasi premium
        </span>
        <span class="inline-block px-8">
          ⚡ Pengiriman instan dalam 5 menit setelah pembayaran
        </span>
        <span class="inline-block px-8">
          🔒 Garansi uang kembali 100% jika tidak sesuai
        </span>
        <span class="inline-block px-8">
          📱 Lebih dari 10.000+ customer puas dengan layanan kami
        </span>
        <span class="inline-block px-8">
          💎 Kualitas premium dengan harga terjangkau
        </span>
      </div>
    </section>

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

    <!-- Join Reseller Group Section -->
    <section class="py-16 bg-gradient-to-r from-green-600 to-green-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="mb-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <i class='bx bxl-whatsapp text-green-600 text-3xl'></i>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              Bergabung Dengan Reseller Kami
            </h2>
            <p class="text-lg text-green-100 max-w-2xl mx-auto mb-8">
              Dapatkan komisi menarik dengan menjadi reseller ZalPay Premium. 
              Bergabunglah dengan grup WhatsApp reseller untuk mendapatkan info terbaru dan dukungan eksklusif.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-white">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class='bx bx-money text-2xl'></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Komisi Menarik</h3>
              <p class="text-green-100">Dapatkan komisi hingga 30% dari setiap penjualan</p>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-white">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class='bx bx-support text-2xl'></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Support Penuh</h3>
              <p class="text-green-100">Tim support khusus reseller 24/7</p>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-white">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class='bx bx-trending-up text-2xl'></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Produk Update</h3>
              <p class="text-green-100">Info produk baru dan promo eksklusif</p>
            </div>
          </div>

          <div class="space-y-4">
            <Button 
              size="lg" 
              variant="secondary"
              @click="joinResellerGroup"
              class="bg-white text-green-600 hover:bg-gray-100 border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <i class='bx bxl-whatsapp mr-2 text-xl'></i>
              Join Group Reseller WhatsApp
            </Button>
            
            <p class="text-green-100 text-sm">
              Gratis bergabung • Info lengkap tersedia di grup • Support full time
            </p>
          </div>

          <!-- Additional Info -->
          <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div class="bg-white bg-opacity-10 rounded-lg p-4">
              <div class="text-2xl font-bold text-white">500+</div>
              <div class="text-green-100 text-sm">Reseller Aktif</div>
            </div>
            <div class="bg-white bg-opacity-10 rounded-lg p-4">
              <div class="text-2xl font-bold text-white">30%</div>
              <div class="text-green-100 text-sm">Komisi Maksimal</div>
            </div>
            <div class="bg-white bg-opacity-10 rounded-lg p-4">
              <div class="text-2xl font-bold text-white">24/7</div>
              <div class="text-green-100 text-sm">Support Reseller</div>
            </div>
            <div class="bg-white bg-opacity-10 rounded-lg p-4">
              <div class="text-2xl font-bold text-white">50+</div>
              <div class="text-green-100 text-sm">Produk Tersedia</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Customer Kami?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Ribuan customer telah mempercayai layanan kami
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400 text-lg">
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
              </div>
            </div>
            <p class="text-gray-600 mb-4 italic">
              "Pelayanan sangat cepat dan responsif! Spotify Premium saya aktif dalam 5 menit setelah pembayaran. Recommended banget!"
            </p>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div class="ml-3">
                <h4 class="font-semibold text-gray-900">Ahmad Rizki</h4>
                <p class="text-sm text-gray-500">Spotify Premium Customer</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400 text-lg">
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
              </div>
            </div>
            <p class="text-gray-600 mb-4 italic">
              "Harga sangat terjangkau dibanding berlangganan sendiri. Canva Pro saya sudah berjalan 6 bulan tanpa masalah!"
            </p>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                S
              </div>
              <div class="ml-3">
                <h4 class="font-semibold text-gray-900">Sari Dewi</h4>
                <p class="text-sm text-gray-500">Canva Pro Customer</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400 text-lg">
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
              </div>
            </div>
            <p class="text-gray-600 mb-4 italic">
              "Customer service nya ramah dan helpful banget. Pas ada kendala langsung dibantu sampai selesai. Top!"
            </p>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                B
              </div>
              <div class="ml-3">
                <h4 class="font-semibold text-gray-900">Budi Santoso</h4>
                <p class="text-sm text-gray-500">VPN Premium Customer</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10K+</div>
            <div class="text-gray-600">Customer Puas</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">50+</div>
            <div class="text-gray-600">Aplikasi Premium</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">24/7</div>
            <div class="text-gray-600">Customer Support</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">99%</div>
            <div class="text-gray-600">Success Rate</div>
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

    <!-- Payment Methods Section -->
    <section class="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Metode Pembayaran
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami mendukung berbagai metode pembayaran untuk kemudahan Anda
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Bank Transfer -->
          <div class="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class='bx bx-building-house text-blue-600 text-2xl'></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Bank Transfer</h3>
            <p class="text-gray-600 mb-6">
              Transfer melalui bank lokal Indonesia yang terpercaya
            </p>
            <div class="space-y-3">
              <div class="flex items-center justify-center space-x-4">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-5 bg-red-600 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-bold">BCA</span>
                  </div>
                  <span class="text-sm text-gray-600">BCA</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-bold">BRI</span>
                  </div>
                  <span class="text-sm text-gray-600">BRI</span>
                </div>
              </div>
              <div class="flex items-center justify-center space-x-4">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-5 bg-green-600 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-bold">BJB</span>
                  </div>
                  <span class="text-sm text-gray-600">BJB</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-5 bg-orange-600 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-bold">BNI</span>
                  </div>
                  <span class="text-sm text-gray-600">BNI</span>
                </div>
              </div>
            </div>
          </div>

          <!-- QRIS -->
          <div class="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class='bx bx-qr text-purple-600 text-2xl'></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">QRIS</h3>
            <p class="text-gray-600 mb-6">
              Scan QR code untuk pembayaran instan dan mudah
            </p>
            <div class="bg-purple-50 rounded-lg p-4">
              <div class="flex items-center justify-center space-x-3 mb-2">
                <i class='bx bx-check-circle text-purple-600'></i>
                <span class="text-purple-700 font-medium">Pembayaran Instan</span>
              </div>
              <div class="flex items-center justify-center space-x-3">
                <i class='bx bx-shield-check text-purple-600'></i>
                <span class="text-purple-700 font-medium">Aman & Terpercaya</span>
              </div>
            </div>
          </div>

          <!-- E-Wallet -->
          <div class="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class='bx bx-wallet text-green-600 text-2xl'></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">E-Wallet</h3>
            <p class="text-gray-600 mb-6">
              Bayar dengan dompet digital favorit Anda
            </p>
            <div class="space-y-3">
              <div class="flex items-center justify-center space-x-4">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-5 bg-blue-500 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-bold">GO</span>
                  </div>
                  <span class="text-sm text-gray-600">GoPay</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-bold">OVO</span>
                  </div>
                  <span class="text-sm text-gray-600">OVO</span>
                </div>
              </div>
              <div class="flex items-center justify-center space-x-4">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-bold">DANA</span>
                  </div>
                  <span class="text-sm text-gray-600">DANA</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-5 bg-purple-600 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-bold">SP</span>
                  </div>
                  <span class="text-sm text-gray-600">ShopeePay</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Badge -->
        <div class="mt-16 text-center">
          <div class="inline-flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
            <i class='bx bx-shield-check text-green-500 text-xl'></i>
            <span class="text-gray-700 font-medium">Semua pembayaran dilindungi SSL 256-bit encryption</span>
          </div>
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

const joinResellerGroup = () => {
  window.open('https://chat.whatsapp.com/If8dYATtgWAHhUAfYU8Ggd?mode=ac_t', '_blank')
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

<style scoped>
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
