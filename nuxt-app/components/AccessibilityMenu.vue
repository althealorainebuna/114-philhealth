<template>
  <div class="fixed bottom-6 right-6 z-50 no-print">
    <!-- Floating Menu Button -->
    <button
      type="button"
      class="w-14 h-14 bg-accent text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
      :aria-label="isMenuOpen ? 'Close accessibility options' : 'Open accessibility options'"
      :aria-expanded="isMenuOpen"
      aria-controls="accessibility-menu"
      @click="toggleMenu"
    >
      <svg class="w-7 h-7 mx-auto" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="5" r="2" fill="currentColor"/>
        <path d="M12 7v4M8 9h8M8 13l4 8M16 13l-4 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition name="fade-slide">
      <div
        v-if="isMenuOpen"
        id="accessibility-menu"
        class="absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl border-4 border-neutral-900 p-4 w-64"
        style="background-color: white !important; color: black !important;"
        role="menu"
        aria-label="Accessibility options"
      >
        <h3 class="text-lg font-bold mb-4 pb-2 border-b-2 border-primary" style="color: black !important;">
          Accessibility Options
        </h3>

        <!-- High Contrast -->
        <button
          type="button"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 border-2 border-transparent hover:border-gray-300"
          style="color: black !important;"
          role="menuitem"
          :aria-pressed="isHighContrast"
          @click="toggleHighContrast"
        >
          <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="color: black !important;">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.3"/>
            <path d="M12 2 A10 10 0 0 1 12 22 Z" fill="currentColor"/>
          </svg>
          <span class="flex-1 text-left font-semibold">High Contrast</span>
          <span
            class="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
            :class="isHighContrast ? 'bg-primary border-primary' : 'border-gray-600 bg-white'"
            :style="isHighContrast ? 'background-color: #007a3d !important; border-color: #007a3d !important;' : 'background-color: white !important; border-color: black !important;'"
          >
            <svg v-if="isHighContrast" class="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="color: white !important;">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </span>
        </button>

        <!-- Text Size -->
        <button
          type="button"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 border-2 border-transparent hover:border-gray-300"
          style="color: black !important;"
          role="menuitem"
          aria-label="Cycle text size"
          @click="cycleTextSize"
        >
          <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="color: black !important;">
            <text x="4" y="18" font-size="14" fill="currentColor" font-weight="bold">A+</text>
          </svg>
          <span class="flex-1 text-left font-semibold">Text Size</span>
          <span class="text-sm font-medium" style="color: black !important;">{{ textSizeLabel }}</span>
        </button>

        <!-- Voice Navigation -->
        <button
          type="button"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 border-2 border-transparent hover:border-gray-300"
          style="color: black !important;"
          :class="{ 'opacity-50 cursor-not-allowed': !voiceSupported }"
          :disabled="!voiceSupported"
          role="menuitem"
          :aria-pressed="isVoiceActive"
          :title="voiceSupported ? 'Toggle voice commands' : 'Voice navigation not supported in this browser'"
          @click="toggleVoiceNavigation"
        >
          <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="color: black !important;">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="currentColor"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="currentColor"/>
          </svg>
          <span class="flex-1 text-left font-semibold">Voice Nav</span>
          <span
            class="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
            :class="isVoiceActive ? 'bg-primary border-primary' : 'border-gray-600 bg-white'"
            :style="isVoiceActive ? 'background-color: #007a3d !important; border-color: #007a3d !important;' : 'background-color: white !important; border-color: black !important;'"
          >
            <svg v-if="isVoiceActive" class="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="color: white !important;">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </span>
        </button>

        <!-- Help Text -->
        <div class="mt-4 pt-3 border-t-2 border-gray-300">
          <p class="text-xs leading-relaxed" style="color: black !important;">
            <strong>Keyboard shortcuts:</strong><br>
            <kbd class="px-1 py-0.5 bg-gray-200 rounded text-xs border border-gray-400" style="color: black !important;">/</kbd> Focus search<br>
            <kbd class="px-1 py-0.5 bg-gray-200 rounded text-xs border border-gray-400" style="color: black !important;">Alt+1-5</kbd> Navigate sections
          </p>
        </div>
      </div>
    </Transition>

    <!-- Voice Status Indicator -->
    <Transition name="fade">
      <div
        v-if="isVoiceActive && voiceStatus"
        class="absolute bottom-20 right-0 mb-2 bg-accent text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span class="text-lg animate-pulse" aria-hidden="true">🎤</span>
        <span class="text-sm font-semibold">{{ voiceStatus }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const {
  isHighContrast,
  textSizeLabel,
  isVoiceActive,
  voiceStatus,
  voiceSupported,
  toggleHighContrast,
  cycleTextSize,
  toggleVoiceNavigation
} = useAccessibility()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Close menu when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (isMenuOpen.value && !target.closest('.fixed.bottom-6.right-6')) {
      isMenuOpen.value = false
    }
  }

  document.addEventListener('click', handleClickOutside)

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

kbd {
  font-family: 'Courier New', monospace;
  font-weight: 600;
}
</style>
