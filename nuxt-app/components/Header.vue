<template>
  <header class="fixed top-0 inset-x-0 z-50 bg-white shadow-md" role="banner">
    <!-- Utility Strip Navigation -->
    <div class="hidden md:block bg-gray-100 border-b border-gray-200">
      <div class="container mx-auto px-4">
        <nav
          class="utility-nav flex justify-end gap-6 py-2 text-sm"
          aria-label="Utility navigation"
        >
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded px-1 transition-colors"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded px-1 transition-colors"
          >
            Contact Us
          </NuxtLink>
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded px-1 transition-colors"
          >
            Disclaimer
          </NuxtLink>
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded px-1 transition-colors"
          >
            Privacy Notice
          </NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Main Header Bar -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-4 gap-6">
          <!-- Logo and Branding -->
          <NuxtLink
            to="/"
            class="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded"
            aria-label="PhilHealth Home"
          >
            <img
              src="https://philhealth.open.gov.ph/_next/image?url=%2Fimages%2Fphilhealth%20logo.png&w=3840&q=75"
              alt="PhilHealth Logo"
              width="50"
              height="50"
              class="w-[50px] h-[50px] object-contain"
            />
            <div>
              <div class="text-2xl font-black text-primary-600" style="font-family: 'Arial Black', sans-serif; letter-spacing: -0.5px;">PhilHealth</div>
              <div class="text-xs text-gray-500 italic">Your Partner in Health</div>
            </div>
          </NuxtLink>

          <!-- Modern Search Bar -->
          <div class="flex-1 max-w-2xl">
            <form @submit.prevent="handleSearch">
              <label for="header-search" class="sr-only">
                Search PhilHealth services
              </label>
              <div class="relative group">
                <!-- Unified Search Input -->
                <input
                  id="header-search"
                  v-model="searchQuery"
                  type="search"
                  placeholder="Search services..."
                  class="w-full h-12 pl-5 pr-14 bg-white rounded-full border border-gray-200 text-base text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 ease-in-out
                         hover:border-gray-300 hover:shadow-md
                         focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/20 focus:shadow-lg"
                  @keyup.enter="handleSearch"
                />
                
                <!-- Search Button Icon -->
                <button
                  type="submit"
                  class="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-9 h-9 bg-primary-600 text-white rounded-full flex items-center justify-center transition-all duration-200 ease-in-out
                         hover:bg-primary-700 hover:scale-110 hover:shadow-md
                         focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2
                         active:scale-95"
                  aria-label="Search"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <!-- User Icon Button -->
          <NuxtLink
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-all hover:scale-110"
            aria-label="Login to PhilHealth Portal"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </NuxtLink>

          <!-- User Menu (when logged in) -->
          <div v-else class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-all hover:scale-110"
              :aria-expanded="userMenuOpen"
              aria-haspopup="true"
              :aria-label="`User menu for ${authStore.user?.name}`"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <Transition name="dropdown">
              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                role="menu"
              >
                <div class="px-4 py-2 border-b border-gray-200">
                  <p class="text-sm font-semibold text-gray-900">{{ authStore.user?.name }}</p>
                  <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                </div>
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Primary Navigation -->
    <nav
      class="bg-primary-600 text-white"
      aria-label="Primary navigation"
    >
      <div class="container mx-auto px-4">
        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden w-full flex items-center justify-between py-3 text-white font-semibold focus:outline-none"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-nav-menu"
        >
          <span>Menu</span>
          <svg
            class="w-6 h-6 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Desktop Navigation -->
        <ul class="hidden md:flex justify-between flex-wrap w-full">
          <li class="flex-1 text-center">
            <NuxtLink
              to="/"
              class="inline-block py-3 px-2 sm:px-6 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm"
              :class="{ 'bg-primary-700': isActive('/about') }"
            >
              ABOUT US
            </NuxtLink>
          </li>
          <li class="flex-1 text-center">
            <NuxtLink
              to=""
              class="inline-block py-3 px-2 sm:px-6 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm"
              :class="{ 'bg-primary-700': isActive('/members') }"
            >
              MEMBERS
            </NuxtLink>
          </li>
          <li class="flex-1 text-center">
            <NuxtLink
              to=""
              class="inline-block py-3 px-2 sm:px-6 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm"
              :class="{ 'bg-primary-700': isActive('/partners') }"
            >
              PARTNERS
            </NuxtLink>
          </li>
          <li class="flex-1 text-center">
            <NuxtLink
              to="/"
              class="inline-block py-3 px-2 sm:px-6 hover:bg-amber-500 focus:outline-none focus:bg-amber-500 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm"
              :class="{ 'bg-amber-500': isActive('/') && route.path === '/' }"
            >
              ONLINE SERVICES
            </NuxtLink>
          </li>
          <li class="flex-1 text-center">
            <NuxtLink
              to=""
              class="inline-block py-3 px-2 sm:px-6 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm"
              :class="{ 'bg-primary-700': isActive('/downloads') }"
            >
              DOWNLOADS
            </NuxtLink>
          </li>
          <li class="flex-1 text-center">
            <NuxtLink
              to=""
              class="inline-block py-3 px-2 sm:px-6 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm"
              :class="{ 'bg-primary-700': isActive('/transparency') }"
            >
              TRANSPARENCY
            </NuxtLink>
          </li>
        </ul>

        <!-- Mobile Navigation Menu -->
        <Transition name="slide-down">
          <ul
            v-if="mobileMenuOpen"
            id="mobile-nav-menu"
            class="md:hidden flex flex-col space-y-1 pb-3"
          >
            <li>
              <NuxtLink
                to="/about"
                class="block py-3 px-4 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm min-h-[44px] flex items-center"
                :class="{ 'bg-primary-700': isActive('/about') }"
                @click="mobileMenuOpen = false"
              >
                ABOUT US
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/members"
                class="block py-3 px-4 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm min-h-[44px] flex items-center"
                :class="{ 'bg-primary-700': isActive('/members') }"
                @click="mobileMenuOpen = false"
              >
                MEMBERS
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/partners"
                class="block py-3 px-4 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm min-h-[44px] flex items-center"
                :class="{ 'bg-primary-700': isActive('/partners') }"
                @click="mobileMenuOpen = false"
              >
                PARTNERS
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/"
                class="block py-3 px-4 hover:bg-amber-500 focus:outline-none focus:bg-amber-500 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm min-h-[44px] flex items-center"
                :class="{ 'bg-amber-500': isActive('/') && route.path === '/' }"
                @click="mobileMenuOpen = false"
              >
                ONLINE SERVICES
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/downloads"
                class="block py-3 px-4 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm min-h-[44px] flex items-center"
                :class="{ 'bg-primary-700': isActive('/downloads') }"
                @click="mobileMenuOpen = false"
              >
                DOWNLOADS
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/transparency"
                class="block py-3 px-4 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-inset focus:ring-white transition-colors font-semibold text-sm min-h-[44px] flex items-center"
                :class="{ 'bg-primary-700': isActive('/transparency') }"
                @click="mobileMenuOpen = false"
              >
                TRANSPARENCY
              </NuxtLink>
            </li>
            
            <!-- Mobile Utility Links -->
            <li class="border-t border-primary-500 pt-2 mt-2">
              <NuxtLink
                to="/"
                class="block py-2 px-4 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 transition-colors text-xs"
                @click="mobileMenuOpen = false"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="block py-2 px-4 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 transition-colors text-xs"
                @click="mobileMenuOpen = false"
              >
                Contact Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/disclaimer"
                class="block py-2 px-4 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 transition-colors text-xs"
                @click="mobileMenuOpen = false"
              >
                Disclaimer
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/privacy"
                class="block py-2 px-4 hover:bg-primary-700 focus:outline-none focus:bg-primary-700 transition-colors text-xs"
                @click="mobileMenuOpen = false"
              >
                Privacy Notice
              </NuxtLink>
            </li>
          </ul>
        </Transition>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const searchQuery = ref('')
const userMenuOpen = ref(false)
const mobileMenuOpen = ref(false)

// Watch for search query changes - clear results when empty
watch(searchQuery, (newValue) => {
  if (!newValue || newValue.trim() === '') {
    // Clear search results by removing query parameter
    if (route.query.search) {
      router.push({ path: route.path, query: {} })
    }
  }
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/',
      query: { search: searchQuery.value }
    })
  }
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const handleLogout = () => {
  authStore.logout()
  userMenuOpen.value = false
  router.push('/')
}

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// Close user menu when clicking outside
if (process.client) {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('[aria-haspopup="true"]') && !target.closest('[role="menu"]')) {
      userMenuOpen.value = false
    }
  })
}
</script>

<style scoped>
/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Mobile menu slide-down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-in-out;
  transform-origin: top;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: scaleY(1);
  max-height: 1000px;
}
</style>
