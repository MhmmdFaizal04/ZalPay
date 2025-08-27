<template>
  <Modal v-model="isOpen" title="Pembayaran QRIS" size="lg">
    <div class="text-center space-y-6">
      <!-- Order Info -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="font-semibold text-gray-900 mb-2">{{ orderInfo.appName }}</h3>
        <p class="text-sm text-gray-600 mb-2">Order ID: {{ orderInfo.orderId }}</p>
        <p class="text-sm text-gray-600 mb-2">Varian: {{ orderInfo.variant }}</p>
        <div class="text-2xl font-bold text-blue-600">
          Rp {{ formatCurrency(orderInfo.totalAmount) }}
        </div>
      </div>

      <!-- QRIS Code -->
      <div class="flex justify-center">
        <div class="bg-white p-4 rounded-lg border-2 border-gray-200 max-w-xs">
          <img 
            :src="qrisImage" 
            alt="QRIS Code" 
            class="w-full h-auto"
            @error="handleQRISError"
          />
        </div>
      </div>

      <!-- Instructions -->
      <div class="bg-blue-50 rounded-lg p-4 text-left">
        <h4 class="font-semibold text-blue-900 mb-3 flex items-center">
          <i class='bx bx-info-circle mr-2'></i>
          Langkah-langkah Pembayaran:
        </h4>
        <ol class="text-sm text-blue-800 space-y-2 list-decimal list-inside">
          <li><strong>Buka aplikasi</strong> mobile banking atau e-wallet Anda (Dana, OVO, GoPay, dll)</li>
          <li><strong>Pilih menu "Scan QR"</strong> atau "QRIS" di aplikasi</li>
          <li><strong>Scan kode QR</strong> yang ditampilkan di atas</li>
          <li><strong>Masukkan nominal pembayaran:</strong> Rp {{ formatCurrency(orderInfo.totalAmount) }}</li>
          <li><strong>Konfirmasi pembayaran</strong> di aplikasi Anda</li>
          <li><strong>Screenshot bukti</strong> pembayaran yang berhasil</li>
          <li><strong>Klik tombol WhatsApp</strong> di bawah untuk kirim bukti pembayaran</li>
        </ol>
        
        <div class="mt-3 p-3 bg-blue-100 rounded-md">
          <p class="text-xs text-blue-700">
            <i class='bx bx-check-circle mr-1'></i>
            <strong>Tips:</strong> Pastikan nominal yang dibayar sesuai dengan yang tertera. Pembayaran akan diverifikasi dalam 1-5 menit setelah bukti diterima.
          </p>
        </div>
      </div>

      <!-- Amount Input Reminder -->
      <div class="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
        <div class="flex items-start">
          <i class='bx bx-error text-yellow-600 text-2xl mr-3 mt-1'></i>
          <div class="text-left flex-1">
            <p class="text-base font-bold text-yellow-800 mb-1">Pastikan Nominal Pembayaran</p>
            <div class="bg-yellow-100 rounded-md p-3 mb-2">
              <p class="text-lg font-bold text-yellow-900 text-center">
                Rp {{ formatCurrency(orderInfo.totalAmount) }}
              </p>
            </div>
            <p class="text-sm text-yellow-700">
              Transfer dengan nominal yang <strong>TEPAT</strong>. Jika berbeda, pesanan akan ditolak dan harus mengulang pembayaran.
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          @click="sendToWhatsApp"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          <i class='bx bxl-whatsapp mr-2'></i>
          Kirim Bukti via WhatsApp
        </Button>
        <Button
          @click="closeModal"
          variant="outline"
          class="flex-1"
        >
          Tutup
        </Button>
      </div>

      <!-- Contact Info -->
      <div class="bg-gray-50 rounded-lg p-3 border-t">
        <div class="text-center">
          <p class="text-sm font-medium text-gray-700 mb-1">
            <i class='bx bx-support mr-1'></i>
            Butuh Bantuan?
          </p>
          <p class="text-xs text-gray-600">
            Customer Service tersedia 24/7 melalui WhatsApp untuk membantu proses pembayaran Anda
          </p>
          <p class="text-xs text-blue-600 font-medium mt-1">
            <i class='bx bxl-whatsapp mr-1'></i>
            Respon dalam 1-5 menit
          </p>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Modal from '@/components/common/Modal.vue'
import Button from '@/components/ui/Button.vue'
import { useQRIS } from '@/composables/useQRIS.js'
import { WHATSAPP_NUMBER } from '@/utils/constants.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  orderInfo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const { qrisImage, fetchCurrentQRIS } = useQRIS()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID').format(amount)
}

const handleQRISError = (event) => {
  event.target.src = '/images/qris/default-qris.png'
}

const sendToWhatsApp = () => {
  const orderDate = new Date()
  const orderTime = orderDate.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  const message = encodeURIComponent(
    `=================================
KONFIRMASI PEMBAYARAN
=================================
ZALPAY PREMIUM STORE

Tanggal: ${orderDate.toLocaleDateString('id-ID')}
Waktu: ${orderTime}
Order ID: ${props.orderInfo.orderId}

---------------------------------
DETAIL PESANAN
---------------------------------

Aplikasi: ${props.orderInfo.appName}
Varian: ${props.orderInfo.variant}
TOTAL BAYAR: Rp ${formatCurrency(props.orderInfo.totalAmount)}

---------------------------------
KONFIRMASI BAYAR
---------------------------------

Saya sudah melakukan pembayaran QRIS
Nominal: Rp ${formatCurrency(props.orderInfo.totalAmount)}
Bukti pembayaran akan saya kirim

---------------------------------
PERMINTAAN
---------------------------------

Mohon segera diproses setelah menerima bukti pembayaran
Link download aplikasi kirim ke email yang terdaftar

=================================
Terima kasih!
ZALPAY PREMIUM STORE
=================================`
  )
  
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
}

const closeModal = () => {
  isOpen.value = false
}

// Load QRIS when component is mounted
onMounted(() => {
  fetchCurrentQRIS()
})
</script>
