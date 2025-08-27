<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    class="inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 btn-hover-effect disabled:opacity-50 disabled:cursor-not-allowed"
    @click="$emit('click', $event)"
  >
    <i v-if="loading" class='bx bx-loader-alt animate-spin mr-2'></i>
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success', 'warning'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  const classes = []

  // Variant classes
  const variantClasses = {
    primary: 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900',
    secondary: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    danger: 'bg-red-600 border-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 border-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    warning: 'bg-yellow-600 border-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500'
  }

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  classes.push(variantClasses[props.variant])
  classes.push(sizeClasses[props.size])

  if (props.block) {
    classes.push('w-full')
  }

  return classes.join(' ')
})
</script>
