<template>
  <MainLayout>
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Katalog Aplikasi Premium
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Temukan berbagai aplikasi premium berkualitas dengan harga terjangkau
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <Loading />
      </div>

      <!-- Apps Grid -->
      <div v-else-if="apps.length > 0" class="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        <AppCard
          v-for="app in apps"
          :key="app.id"
          :app="app"
          @checkout="handleCheckout"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <i class='bx bx-package text-6xl'></i>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">
          Belum Ada Aplikasi
        </h3>
        <p class="text-gray-600">
          Aplikasi akan segera tersedia. Silakan cek kembali nanti.
        </p>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppsStore } from '@/store/modules/apps.js'
import MainLayout from '@/components/layout/MainLayout.vue'
import AppCard from '@/components/ui/AppCard.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'Apps',
  components: {
    MainLayout,
    AppCard,
    Loading
  },
  setup() {
    const router = useRouter()
    const appsStore = useAppsStore()

    const apps = computed(() => appsStore.apps)
    const loading = computed(() => appsStore.loading)

    const fetchApps = async () => {
      await appsStore.fetchApps()
    }

    const handleCheckout = (app) => {
      router.push(`/checkout/${app.slug}`)
    }

    onMounted(() => {
      fetchApps()
    })

    return {
      loading,
      apps,
      handleCheckout
    }
  }
}
</script>
