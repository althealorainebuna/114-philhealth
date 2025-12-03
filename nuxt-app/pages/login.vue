<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-6 sm:mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl shadow-lg mb-3 sm:mb-4">
          <svg class="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
          </svg>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-neutral-900 mb-2">Member Login</h1>
        <p class="text-sm sm:text-base text-neutral-600">Access your PhilHealth account</p>
      </div>

      <!-- Login Form Card -->
      <main id="main-content" tabindex="-1">
        <form
          class="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 space-y-5 sm:space-y-6"
          @submit.prevent="handleSubmit"
        >
          <!-- Error Alert -->
          <div
            v-if="authStore.error"
            role="alert"
            aria-live="assertive"
            class="bg-red-50 border-2 border-error text-error px-4 py-3 rounded-lg flex items-start gap-3"
          >
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span class="flex-1">{{ authStore.error }}</span>
          </div>

          <!-- Member ID -->
          <div>
            <label for="member-id" class="block text-sm font-semibold text-gray-800 mb-2">
              Member ID
            </label>
            <input
              id="member-id"
              v-model="form.memberIdOrUsername"
              type="text"
              autocomplete="username"
              required
              placeholder="Enter your member ID"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
              :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.memberIdOrUsername }"
              :aria-invalid="!!errors.memberIdOrUsername"
              :aria-describedby="errors.memberIdOrUsername ? 'member-id-error' : undefined"
            />
            <p
              v-if="errors.memberIdOrUsername"
              id="member-id-error"
              class="mt-1 text-sm text-error"
              role="alert"
            >
              {{ errors.memberIdOrUsername }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <NuxtLink
                to="/forgot-password"
                class="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:underline"
              >
                Forgot your password?
              </NuxtLink>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="Enter your password"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.password }"
                :aria-invalid="!!errors.password"
                :aria-describedby="errors.password ? 'password-error' : undefined"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                @click="showPassword = !showPassword"
              >
                <svg v-if="showPassword" class="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                </svg>
                <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <p
              v-if="errors.password"
              id="password-error"
              class="mt-1 text-sm text-error"
              role="alert"
            >
              {{ errors.password }}
            </p>
          </div>

          <!-- CAPTCHA -->
          <div>
            <label for="captcha" class="block text-sm font-semibold text-gray-800 mb-2">
              Security Verification
            </label>
            <div class="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-3 flex items-center justify-between">
              <div class="select-none">
                <span class="text-2xl font-mono tracking-wider text-gray-700 line-through" style="text-decoration-style: wavy;">
                  {{ captchaCode }}
                </span>
              </div>
              <button
                type="button"
                class="p-2 text-primary-600 hover:bg-primary-50 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                aria-label="Generate new CAPTCHA code"
                @click="generateCaptcha"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <input
              id="captcha"
              v-model="form.captcha"
              type="text"
              required
              autocomplete="off"
              placeholder="Enter the code above"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
              :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.captcha }"
              :aria-invalid="!!errors.captcha"
              :aria-describedby="errors.captcha ? 'captcha-error' : undefined"
            />
            <p
              v-if="errors.captcha"
              id="captcha-error"
              class="mt-1 text-sm text-error"
              role="alert"
            >
              {{ errors.captcha }}
            </p>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              type="checkbox"
              class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-600"
            />
            <label for="remember-me" class="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-primary-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="authStore.loading"
          >
            <span v-if="authStore.loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>

          <!-- Create Account Button -->
          <NuxtLink
            to="/register"
            class="block w-full text-center bg-white border-2 border-primary-600 text-primary-600 font-semibold py-3.5 px-6 rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-4 focus:ring-primary-600/30"
          >
            Create new account
          </NuxtLink>
        </form>
      </main>
    </div>

    <AccessibilityMenu />
  </div>
</template>

<script setup lang="ts">
// Prevent site shell (header/footer) from rendering on this page
definePageMeta({ layout: 'blank' })

import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  memberIdOrUsername: '',
  password: '',
  captcha: '',
  rememberMe: false
})

const errors = reactive({
  memberIdOrUsername: '',
  password: '',
  captcha: ''
})

const showPassword = ref(false)
const captchaCode = ref('')

// Generate random CAPTCHA
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaCode.value = code
}

// Validate form
const validateForm = (): boolean => {
  let isValid = true
  
  // Clear previous errors
  errors.memberIdOrUsername = ''
  errors.password = ''
  errors.captcha = ''

  // Member ID validation
  if (!form.memberIdOrUsername.trim()) {
    errors.memberIdOrUsername = 'Member ID or Username is required'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  // CAPTCHA validation
  if (!form.captcha.trim()) {
    errors.captcha = 'Please complete the CAPTCHA verification'
    isValid = false
  } else if (form.captcha.length < 3) {
    errors.captcha = 'CAPTCHA must be at least 3 characters'
    isValid = false
  }

  return isValid
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    const { announceToScreenReader } = useAccessibility()
    announceToScreenReader('Please fix the errors in the form')
    return
  }

  authStore.clearError()

  const result = await authStore.login({
    memberIdOrUsername: form.memberIdOrUsername,
    password: form.password,
    captcha: form.captcha,
    rememberMe: form.rememberMe
  })

  if (result.success) {
    const { announceToScreenReader } = useAccessibility()
    announceToScreenReader('Login successful. Redirecting...')
    
    // Redirect to services page
    setTimeout(() => {
      router.push('/')
    }, 500)
  } else {
    // Regenerate CAPTCHA on error
    generateCaptcha()
    form.captcha = ''
  }
}

// Initialize CAPTCHA
onMounted(() => {
  generateCaptcha()
})

// SEO
useHead({
  title: 'Login - PhilHealth',
  meta: [
    { name: 'description', content: 'Log in to your PhilHealth member account to access online services.' }
  ]
})
</script>
