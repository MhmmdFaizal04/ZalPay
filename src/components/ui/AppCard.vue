<template>
  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden card-hover">
    <!-- Image -->
    <div class="aspect-square relative overflow-hidden bg-gray-100">
      <img 
        :src="app.image_path || '/images/apps/default.png'" 
        :alt="app.name"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <!-- Status badge -->
      <div class="absolute top-2 right-2 sm:top-3 sm:right-3">
        <StatusBadge :available="app.available" />
      </div>
    </div>

    <!-- Content -->
    <div class="p-3 sm:p-4">
      <h3 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base truncate">{{ app.name }}</h3>
      
      <p v-if="app.description" class="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
        {{ app.description }}
      </p>

      <!-- Variants -->
      <div v-if="variants.length > 0" class="mb-2 sm:mb-3">
        <div class="flex flex-wrap gap-1">
          <span 
            v-for="variant in variants.slice(0, 2)" 
            :key="variant.name || variant"
            class="text-xs bg-gray-100 text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded"
          >
            {{ getVariantDisplay(variant) }}
          </span>
          <span 
            v-if="variants.length > 2" 
            class="text-xs bg-gray-100 text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded"
          >
            +{{ variants.length - 2 }}
          </span>
        </div>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <span class="text-sm sm:text-lg font-bold text-gray-900">
          {{ priceDisplay }}
        </span>
      </div>

      <!-- Button -->
      <Button 
        :disabled="!app.available"
        :variant="app.available ? 'primary' : 'secondary'"
        :size="'sm'"
        class="w-full text-xs sm:text-sm"
        @click="handleBuyClick"
      >
        <i class='bx bx-cart mr-1 sm:mr-2 text-xs sm:text-sm'></i>
        <span class="hidden sm:inline">{{ app.available ? 'Beli Sekarang' : 'Tidak Tersedia' }}</span>
        <span class="sm:hidden">{{ app.available ? 'Beli' : 'N/A' }}</span>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatCurrency } from '@/utils/helpers.js'
import Button from '@/components/ui/Button.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'

const props = defineProps({
  app: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const variants = computed(() => {
  if (!props.app.variants) return []
  
  try {
    return typeof props.app.variants === 'string' 
      ? JSON.parse(props.app.variants) 
      : props.app.variants
  } catch {
    return []
  }
})

const priceDisplay = computed(() => {
  // If variants have prices, show price range
  if (variants.value.length > 0 && variants.value[0].price) {
    const prices = variants.value.map(v => parseFloat(v.price))
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    
    if (minPrice === maxPrice) {
      return formatCurrency(minPrice)
    } else {
      return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
    }
  }
  
  // Fallback to app.price
  return formatCurrency(props.app.price || 0)
})

const getVariantDisplay = (variant) => {
  // Handle both old format (string) and new format (object)
  if (typeof variant === 'string') {
    return variant
  }
  return variant.name || variant
}

const handleBuyClick = () => {
  if (props.app.available) {
    router.push(`/checkout/${props.app.slug}`)
  }
}

const handleImageError = (event) => {
  event.target.src = '/images/apps/default.png'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
