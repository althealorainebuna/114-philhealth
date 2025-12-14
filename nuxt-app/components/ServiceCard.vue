<template>
  <article
    :id="`service-${service.id}`"
    class="card card-hover p-6 flex flex-col sm:flex-row gap-6"
    :aria-labelledby="`service-title-${service.id}`"
  >
    <!-- Service Icon -->
    <div
      class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex items-center justify-center text-white font-bold text-sm uppercase tracking-wide shadow"
      :class="getIconColorClass(service.iconColor)"
      aria-hidden="true"
    >
      {{ service.icon }}
    </div>

    <!-- Service Content -->
    <div class="flex-1 flex flex-col gap-3">
      <!-- Title with Tooltip -->
      <div class="flex items-start gap-2">
        <h3
          :id="`service-title-${service.id}`"
          class="text-xl font-bold text-neutral-900 flex-1"
        >
          {{ service.title }}
        </h3>
        
        <button
          v-if="service.tooltip"
          type="button"
          class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
          :aria-label="`More information about ${service.title}`"
          :aria-expanded="isTooltipOpen"
          :aria-controls="`tooltip-${service.id}`"
          @click="toggleTooltip"
        >
          <span class="sr-only">Information</span>
          <svg class="w-full h-full p-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <text x="12" y="16" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">i</text>
          </svg>
        </button>
      </div>

      <!-- Tooltip Content -->
      <div
        v-if="service.tooltip && isTooltipOpen"
        :id="`tooltip-${service.id}`"
        role="tooltip"
        class="bg-white border-2 border-accent rounded-lg p-4 shadow-xl text-sm"
      >
        <div v-if="service.tooltip.what">
          <strong class="text-primary block mb-1">What you can do:</strong>
          <ul class="list-disc list-inside space-y-1 mb-3">
            <li v-for="(item, index) in service.tooltip.what" :key="index">{{ item }}</li>
          </ul>
        </div>
        <p v-if="service.tooltip.need" class="mb-0">
          <strong class="text-primary">What you need:</strong> {{ service.tooltip.need }}
        </p>
        <p v-if="service.tooltip.who" class="mb-0">
          <strong class="text-primary">Who can use:</strong> {{ service.tooltip.who }}
        </p>
      </div>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2">
        <span
          class="badge"
          :class="getDifficultyBadgeClass(service.difficulty)"
          :aria-label="`Difficulty: ${service.difficulty}`"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              v-if="service.difficulty === 'easy'"
              d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
              fill="currentColor"
            />
            <path
              v-else
              d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5z"
              fill="currentColor"
            />
          </svg>
          {{ service.difficulty }}
        </span>

        <span class="badge badge-info" :aria-label="`Estimated time: ${service.estimatedTime}`">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
          </svg>
          {{ service.estimatedTime }}
        </span>
      </div>

      <!-- Links -->
      <div class="flex flex-wrap items-center gap-3">
        <NuxtLink
          v-for="(link, index) in service.links"
          :key="index"
          :to="link.url"
          :external="link.external"
          class="text-primary font-bold underline decoration-2 underline-offset-2 hover:bg-primary-50 px-2 py-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          {{ link.label }}
          <span class="sr-only">{{ link.external ? '(opens in new window)' : '' }}</span>
          <span v-if="link.external" aria-hidden="true" class="ml-1">↗</span>
        </NuxtLink>
      </div>

      <!-- Description -->
      <p class="text-neutral-700 leading-relaxed">
        {{ service.description }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Service } from '~/stores/services'

const props = defineProps<{
  service: Service
}>()

const isTooltipOpen = ref(false)

const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const getIconColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    orange: 'bg-gradient-to-br from-orange-500 to-orange-700',
    green: 'bg-gradient-to-br from-primary-600 to-primary-800',
    teal: 'bg-gradient-to-br from-teal-600 to-teal-800',
    'green-dark': 'bg-gradient-to-br from-green-700 to-green-900',
    blue: 'bg-gradient-to-br from-blue-600 to-blue-800',
    'blue-light': 'bg-gradient-to-br from-blue-500 to-blue-700',
    'blue-medium': 'bg-gradient-to-br from-blue-600 to-blue-900'
  }
  return colorMap[color] || 'bg-gradient-to-br from-neutral-600 to-neutral-800'
}

const getDifficultyBadgeClass = (difficulty: string) => {
  const difficultyMap: Record<string, string> = {
    easy: 'badge-success',
    moderate: 'badge-warning',
    complex: 'text-pink-800 bg-pink-50 border-pink-800'
  }
  return difficultyMap[difficulty] || 'badge-info'
}

// Close tooltip when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (isTooltipOpen.value && !target.closest(`#service-${props.service.id}`)) {
      isTooltipOpen.value = false
    }
  }

  document.addEventListener('click', handleClickOutside)

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>
