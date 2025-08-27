<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <i class='bx bx-mobile-alt text-white text-xl'></i>
            </div>
            <span class="text-xl font-bold text-gray-900">{{ APP_NAME }}</span>
          </div>
          <p class="text-gray-600 mb-6 max-w-md">
            Platform terpercaya untuk mendapatkan berbagai aplikasi premium dengan harga terjangkau. 
            Kami menyediakan akses ke aplikasi streaming, editing, VPN, dan banyak lagi.
          </p>
          <div class="flex space-x-4">
            <a 
              :href="`https://wa.me/${WHATSAPP_NUMBER}`" 
              target="_blank"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <i class='bx bxl-whatsapp text-2xl'></i>
            </a>
            <a 
              href="#" 
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <i class='bx bxl-telegram text-2xl'></i>
            </a>
            <a 
              href="#" 
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <i class='bx bxl-instagram text-2xl'></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Link Cepat
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Beranda
              </router-link>
            </li>
            <li>
              <router-link to="/apps" class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Katalog Aplikasi
              </router-link>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Cara Pembelian
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Kontak
          </h3>
          <ul class="space-y-2">
            <li class="flex items-center text-gray-600">
              <i class='bx bxl-whatsapp mr-2'></i>
              <span>{{ formattedWhatsappNumber }}</span>
            </li>
            <li class="flex items-center text-gray-600">
              <i class='bx bx-envelope mr-2'></i>
              <span>support@zalpay.com</span>
            </li>
            <li class="flex items-center text-gray-600">
              <i class='bx bx-time mr-2'></i>
              <span>24/7 Online</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 text-sm">
          © {{ currentYear }} {{ APP_NAME }}. All rights reserved.
        </p>
        <div class="mt-4 md:mt-0 flex space-x-6">
          <a href="#" class="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" class="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { APP_NAME, WHATSAPP_NUMBER } from '@/utils/constants.js'

const currentYear = new Date().getFullYear()

const formattedWhatsappNumber = computed(() => {
  const number = WHATSAPP_NUMBER.replace('62', '0')
  return number.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
})
</script>
