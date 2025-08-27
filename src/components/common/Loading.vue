<template>
  <div v-if="loading" class="flex items-center justify-center p-8">
    <div class="flex flex-col items-center space-y-4">
      <!-- Spinner -->
      <div class="relative">
        <div class="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
        <div class="absolute top-0 left-0 w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      <!-- Text -->
      <p v-if="text" class="text-gray-600 text-sm">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: 'Memuat...'
  }
})
</script>
