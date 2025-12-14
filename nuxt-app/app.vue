<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col">
    <SkipLink />
    <AccessibilityMenu />

    <Header v-if="showShell" />

    <!-- Main content pushed down -->
    <main :class="['flex-1', showShell ? 'pt-40' : 'pt-0']">
      <NuxtPage />
    </main>

    <Footer v-if="showShell" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const route = useRoute()

const showShell = computed(() => {
  return !(route.meta && (route.meta as any).layout === 'blank')
})

onMounted(() => {
  authStore.restoreSession()
})
</script>
