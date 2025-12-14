<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Quick Navigation -->
    <nav
      class="sticky top-0 z-40 bg-gradient-to-r from-neutral-50 to-primary-50 border-b border-neutral-200 shadow-sm overflow-x-auto"
      aria-label="Jump to service category"
    >
      <div class="container">
        <div class="py-3 sm:py-4 flex items-center gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap">
          <p class="font-semibold text-neutral-700 text-sm sm:text-base flex-shrink-0 mr-1 sm:mr-2">Jump to:</p>
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            class="px-3 sm:px-4 py-2 rounded-full font-medium text-xs sm:text-sm transition-all min-h-[44px] min-w-[44px] flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 sm:focus-visible:ring-4 focus-visible:ring-primary/30 whitespace-nowrap"
            :class="
              selectedCategory === category.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary-50'
            "
            @click="scrollToCategory(category.id)"
          >
            {{ category.label }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Banner -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-12 lg:py-16">
      <div class="container">
        <div class="bg-white rounded-2xl shadow-xl border-2 border-primary-200 p-8 lg:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl lg:text-5xl font-black text-primary mb-2">
              My PhilHealth
            </h1>
            <h2 class="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
              PORTAL
            </h2>
            <p class="text-xl text-neutral-600 italic font-medium">
              easy. fast. hassle-free.
            </p>
          </div>
          <div class="flex justify-center">
            <div class="w-full max-w-md aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
              <svg class="w-24 h-24 text-primary" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-12" tabindex="-1">
      <div class="container">

        <!-- Services by Category -->
        <div v-if="!searchQuery" class="space-y-16">
          <section
            v-for="category in categories"
            :id="category.id"
            :key="category.id"
            :aria-labelledby="`heading-${category.id}`"
            class="scroll-mt-24"
          >
            <h2
              :id="`heading-${category.id}`"
              class="text-3xl font-black text-neutral-900 mb-6 pb-3 border-b-4 border-primary"
            >
              {{ category.label }}
            </h2>

            <div
              v-if="servicesByCategory(category.id).length > 0"
              class="grid gap-6 lg:grid-cols-2"
            >
              <ServiceCard
                v-for="service in servicesByCategory(category.id)"
                :key="service.id"
                :service="service"
              />
            </div>

            <div v-else class="text-center py-12">
              <p class="text-neutral-600 text-lg">No services available in this category.</p>
            </div>
          </section>
        </div>

        <!-- Search Results -->
        <div v-else>
          <h2 class="text-2xl font-bold text-neutral-900 mb-6">
            Search Results
            <span class="text-neutral-600 font-normal text-lg">
              ({{ filteredServices.length }} {{ filteredServices.length === 1 ? 'service' : 'services' }} found)
            </span>
          </h2>

          <div v-if="filteredServices.length > 0" class="grid gap-6 lg:grid-cols-2">
            <ServiceCard
              v-for="service in filteredServices"
              :key="service.id"
              :service="service"
            />
          </div>

          <div v-else class="text-center py-16">
            <svg class="w-20 h-20 mx-auto text-neutral-300 mb-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2"/>
            </svg>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">No services found</h3>
            <p class="text-neutral-600 mb-4">
              Try adjusting your search terms or
              <button
                type="button"
                class="text-primary font-semibold underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                @click="clearFilters"
              >
                clear filters
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Scroll to Top Button -->
    <Transition name="fade">
      <button
        v-if="showScrollTop"
        type="button"
        class="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 no-print z-40"
        aria-label="Scroll to top"
        @click="scrollToTop"
      >
        <svg class="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4l-8 8h16z" fill="currentColor"/>
          <path d="M12 8v12" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </Transition>

    <!-- Accessibility Menu -->
    <AccessibilityMenu />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useServicesStore } from '~/stores/services'

const servicesStore = useServicesStore()
const { filteredServices, categories } = storeToRefs(servicesStore)
const { servicesByCategory, setSearchQuery, setSelectedCategory, clearFilters } = servicesStore
const route = useRoute()

const searchQuery = computed({
  get: () => servicesStore.searchQuery,
  set: (value) => setSearchQuery(value)
})

const selectedCategory = computed({
  get: () => servicesStore.selectedCategory,
  set: (value) => setSelectedCategory(value)
})

const showScrollTop = ref(false)

// Initialize accessibility with voice commands
const { initVoiceNavigation, scrollToSection } = useAccessibility()

// Watch for search query from URL (from header search)
watch(() => route.query.search, (newSearch) => {
  if (newSearch && typeof newSearch === 'string') {
    searchQuery.value = newSearch
  } else {
    // Clear search when query parameter is removed
    searchQuery.value = ''
  }
}, { immediate: true })

onMounted(() => {
  // Voice commands for service categories
  initVoiceNavigation([
    {
      command: 'membership',
      action: () => scrollToCategory('membership'),
      description: 'Navigate to Membership section'
    },
    {
      command: 'contribution',
      action: () => scrollToCategory('contribution'),
      description: 'Navigate to Contribution section'
    },
    {
      command: 'collection',
      action: () => scrollToCategory('collection'),
      description: 'Navigate to Collection section'
    },
    {
      command: 'accreditation',
      action: () => scrollToCategory('accreditation'),
      description: 'Navigate to Accreditation section'
    },
    {
      command: 'benefits',
      action: () => scrollToCategory('benefits'),
      description: 'Navigate to Benefits section'
    },
    {
      command: 'search',
      action: () => {
        document.getElementById('header-search')?.focus()
      },
      description: 'Focus search box'
    },
    {
      command: 'top',
      action: scrollToTop,
      description: 'Scroll to top'
    },
    {
      command: 'help',
      action: () => {
        alert('Available voice commands: membership, contribution, collection, accreditation, benefits, search, top')
      },
      description: 'Show help'
    }
  ])

  // Scroll detection for "scroll to top" button
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToCategory = (categoryId: string) => {
  selectedCategory.value = categoryId as any
  scrollToSection(`#${categoryId}`, `Navigating to ${categoryId}`)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const { announceToScreenReader } = useAccessibility()
  announceToScreenReader('Scrolling to top of page')
}

// Keyboard shortcuts
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    // Ignore if typing in input
    if ((e.target as HTMLElement).matches('input, textarea, select')) {
      return
    }

    switch (e.key) {
      case '/':
        e.preventDefault()
        document.getElementById('header-search')?.focus()
        break
      case 'h':
      case 'H':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          scrollToTop()
        }
        break
      case '1':
        if (e.altKey) {
          e.preventDefault()
          scrollToCategory('membership')
        }
        break
      case '2':
        if (e.altKey) {
          e.preventDefault()
          scrollToCategory('contribution')
        }
        break
      case '3':
        if (e.altKey) {
          e.preventDefault()
          scrollToCategory('collection')
        }
        break
      case '4':
        if (e.altKey) {
          e.preventDefault()
          scrollToCategory('accreditation')
        }
        break
      case '5':
        if (e.altKey) {
          e.preventDefault()
          scrollToCategory('benefits')
        }
        break
    }
  }

  document.addEventListener('keydown', handleKeydown)

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})

// SEO
useHead({
  title: 'Online Services - PhilHealth',
  meta: [
    { name: 'description', content: 'Access PhilHealth online services including member portal, contribution management, accreditation, and benefits information.' }
  ]
})
</script>
