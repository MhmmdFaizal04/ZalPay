<template>
  <span :class="badgeClasses" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border">
    <i :class="iconClass" class="mr-1"></i>
    {{ displayText }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // For availability status (boolean)
  available: {
    type: Boolean,
    default: null
  },
  // For order status (string)
  status: {
    type: String,
    default: null
  }
})

const displayText = computed(() => {
  // If available prop is provided (app availability)
  if (props.available !== null) {
    return props.available ? 'Tersedia' : 'Habis'
  }
  
  // If status prop is provided (order status)
  if (props.status) {
    switch (props.status) {
      case 'pending':
        return 'Menunggu'
      case 'processing':
        return 'Diproses'
      case 'completed':
        return 'Selesai'
      case 'cancelled':
        return 'Dibatalkan'
      default:
        return props.status
    }
  }
  
  return 'Unknown'
})

const badgeClasses = computed(() => {
  // For app availability
  if (props.available !== null) {
    return props.available 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200'
  }
  
  // For order status
  switch (props.status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
})

const iconClass = computed(() => {
  // For app availability
  if (props.available !== null) {
    return props.available ? 'bx bx-check-circle' : 'bx bx-x-circle'
  }
  
  // For order status
  switch (props.status) {
    case 'pending':
      return 'bx bx-time-five'
    case 'processing':
      return 'bx bx-loader-alt bx-spin'
    case 'completed':
      return 'bx bx-check-circle'
    case 'cancelled':
      return 'bx bx-x-circle'
    default:
      return 'bx bx-question-mark'
  }
})
</script>
