<template>
  <div>
    <SkipLink />
    <AccessibilityMenu />
    <Header v-if="showShell" />
    <NuxtPage />
    <Footer v-if="showShell" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const route = useRoute()

// Show header/footer unless the page sets layout: 'blank'
const showShell = computed(() => {
  return !(route.meta && (route.meta as any).layout === 'blank')
})

// Restore session on app mount
onMounted(() => {
  authStore.restoreSession()
})
</script>
