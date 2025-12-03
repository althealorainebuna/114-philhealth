<template>
  <a
    href="#main-content"
    class="skip-link"
    @click.prevent="skipToMain"
  >
    Skip to main content
  </a>
</template>

<script setup lang="ts">
const skipToMain = () => {
  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    mainContent.setAttribute('tabindex', '-1')
    mainContent.focus()
    mainContent.scrollIntoView({ behavior: 'smooth' })
    
    // Announce to screen readers
    const { announceToScreenReader } = useAccessibility()
    announceToScreenReader('Skipped to main content')
  }
}
</script>
