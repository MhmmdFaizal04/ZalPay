import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from '@/utils/constants.js'
import { formatCurrency, formatDate } from '@/utils/helpers.js'

export function useWhatsapp() {
  const generateOrderMessage = (order) => {
    const customerInfo = typeof order.customer_info === 'string' 
      ? JSON.parse(order.customer_info) 
      : order.customer_info

    const orderDate = new Date()
    const orderTime = orderDate.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })

    const message = `
*══════════════════════════*
*🛒 STRUK PEMBELIAN DIGITAL*
*══════════════════════════*
*ZALPAY PREMIUM STORE*

� *Tanggal:* ${formatDate(order.created_at || new Date())}
⏰ *Waktu:* ${orderTime}
🆔 *Order ID:* ${order.order_id}

*┌─────────────────────────┐*
*│        DETAIL PESANAN        │*
*└─────────────────────────┘*

📱 *Aplikasi:* ${order.app_name || order.name}
🔧 *Varian:* ${order.variant}
📦 *Quantity:* ${order.quantity} pcs
💵 *Harga Satuan:* ${formatCurrency(order.total_price / order.quantity)}
*💰 TOTAL BAYAR: ${formatCurrency(order.total_price)}*

*┌─────────────────────────┐*
*│        DATA CUSTOMER     │*
*└─────────────────────────┘*

👤 *Nama:* ${customerInfo.name}
📧 *Email:* ${customerInfo.email}
📞 *No. HP:* ${customerInfo.phone}

*┌─────────────────────────┐*
*│      INFO PEMBAYARAN     │*
*└─────────────────────────┘*

� *Metode:* QRIS (Scan & Pay)
🔄 *Status:* Menunggu Konfirmasi
⚡ *Instruksi:*
1. Scan QRIS yang ditampilkan
2. Bayar sesuai nominal
3. Screenshot bukti pembayaran
4. Kirim bukti ke nomor ini

*┌─────────────────────────┐*
*│        PENTING!          │*
*└─────────────────────────┘*

⚠️ Silakan kirim bukti pembayaran untuk konfirmasi pesanan Anda.
⚠️ Pesanan akan diproses setelah pembayaran dikonfirmasi.
⚠️ Simpan struk ini sebagai bukti pembelian.

*══════════════════════════*
*Terima kasih telah berbelanja!*
*🙏 ZALPAY PREMIUM STORE 🙏*
*══════════════════════════*
`.trim()

    return encodeURIComponent(message)
  }

  const sendToWhatsapp = (order) => {
    const message = generateOrderMessage(order)
    const url = `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}?text=${message}`
    window.open(url, '_blank')
  }

  const generateReceiptMessage = (order) => {
    return generateOrderMessage(order)
  }

  return {
    sendToWhatsapp,
    generateReceiptMessage,
    generateOrderMessage
  }
}
