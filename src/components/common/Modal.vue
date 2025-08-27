<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="closeModal"
    ></div>
    
    <!-- Modal Container -->
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <!-- Modal -->
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg sm:max-w-2xl">
        <!-- Header -->
        <div v-if="title" class="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 bg-gray-50">
          <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          <button 
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
          >
            <i class='bx bx-x text-xl'></i>
          </button>
        </div>
        
        <!-- Body - Scrollable -->
        <div class="max-h-[60vh] sm:max-h-[70vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          <slot></slot>
        </div>
        
        <!-- Footer -->
        <div v-if="$slots.footer" class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 px-4 py-3 sm:px-6 sm:py-4 border-t border-gray-200 bg-gray-50">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}

// Prevent body scroll when modal is open
import { watch } from 'vue'

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
