<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3">
          <img 
            src="https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/logo.png" 
            alt="ZalPay Premium" 
            class="w-8 h-8 object-contain"
          />
          <span class="text-xl font-bold text-gray-900">{{ APP_NAME }}</span>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'text-gray-900 font-semibold': $route.name === 'Home' }"
          >
            Beranda
          </router-link>
          <router-link 
            to="/apps" 
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'text-gray-900 font-semibold': $route.name === 'Apps' }"
          >
            Katalog Aplikasi
          </router-link>
        </nav>

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
            to="/" 
            @click="mobileMenuOpen = false"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'text-gray-900 font-semibold': $route.name === 'Home' }"
          >
            Beranda
          </router-link>
          <router-link 
            to="/apps" 
            @click="mobileMenuOpen = false"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'text-gray-900 font-semibold': $route.name === 'Apps' }"
          >
            Katalog Aplikasi
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { APP_NAME } from '@/utils/constants.js'

const mobileMenuOpen = ref(false)
</script>
