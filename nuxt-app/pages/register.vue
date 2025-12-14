<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
    <div class="container max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-6 sm:mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl shadow-lg mb-3 sm:mb-4">
          <svg class="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
          </svg>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-neutral-900 mb-2">Create Account</h1>
        <p class="text-sm sm:text-base text-neutral-600">Register your PhilHealth member account</p>
      </div>

      <!-- Registration Form Card -->
      <main id="main-content" tabindex="-1">
        <form
          class="card p-6 sm:p-8 space-y-5 sm:space-y-6"
          @submit.prevent="handleSubmit"
        >
          <!-- Success Message -->
          <div
            v-if="registrationSuccess"
            role="alert"
            aria-live="polite"
            class="bg-green-50 border-2 border-success text-green-900 px-4 py-3 rounded-lg flex items-start gap-3"
          >
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <div class="flex-1">
              <strong class="block mb-1">Registration Successful!</strong>
              <p class="text-sm">Your account has been created. Redirecting to login...</p>
            </div>
          </div>

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

          <!-- PhilHealth ID -->
          <div>
            <label for="philhealth-id" class="label label-required">
              PhilHealth Identification Number
            </label>
            <input
              id="philhealth-id"
              v-model="form.philhealthId"
              type="text"
              placeholder="XX-XXXXXXXXX-X"
              maxlength="14"
              required
              :class="{ 'input-error': errors.philhealthId }"
              class="input"
              :aria-invalid="!!errors.philhealthId"
              :aria-describedby="errors.philhealthId ? 'philhealth-id-error' : 'philhealth-id-hint'"
              @input="formatPhilHealthId"
            />
            <p id="philhealth-id-hint" class="mt-1 text-sm text-neutral-600">
              Format: XX-XXXXXXXXX-X (e.g., 12-345678901-2)
            </p>
            <p
              v-if="errors.philhealthId"
              id="philhealth-id-error"
              class="mt-1 text-sm text-error"
              role="alert"
            >
              {{ errors.philhealthId }}
            </p>
          </div>

          <!-- Name Fields -->
          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Last Name -->
            <div>
              <label for="last-name" class="label label-required">
                Last Name
              </label>
              <input
                id="last-name"
                v-model="form.lastName"
                type="text"
                required
                autocomplete="family-name"
                :class="{ 'input-error': errors.lastName }"
                class="input"
                :aria-invalid="!!errors.lastName"
                :aria-describedby="errors.lastName ? 'last-name-error' : undefined"
              />
              <p
                v-if="errors.lastName"
                id="last-name-error"
                class="mt-1 text-sm text-error"
                role="alert"
              >
                {{ errors.lastName }}
              </p>
            </div>

            <!-- First Name -->
            <div>
              <label for="first-name" class="label label-required">
                First Name
              </label>
              <input
                id="first-name"
                v-model="form.firstName"
                type="text"
                required
                autocomplete="given-name"
                :class="{ 'input-error': errors.firstName }"
                class="input"
                :aria-invalid="!!errors.firstName"
                :aria-describedby="errors.firstName ? 'first-name-error' : undefined"
              />
              <p
                v-if="errors.firstName"
                id="first-name-error"
                class="mt-1 text-sm text-error"
                role="alert"
              >
                {{ errors.firstName }}
              </p>
            </div>
          </div>

          <!-- Date of Birth & Sex -->
          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Date of Birth -->
            <div>
              <label for="date-of-birth" class="label label-required">
                Date of Birth
              </label>
              <input
                id="date-of-birth"
                v-model="form.dateOfBirth"
                type="date"
                required
                autocomplete="bday"
                :max="maxDate"
                :class="{ 'input-error': errors.dateOfBirth }"
                class="input"
                :aria-invalid="!!errors.dateOfBirth"
                :aria-describedby="errors.dateOfBirth ? 'date-of-birth-error' : 'date-of-birth-hint'"
              />
              <p id="date-of-birth-hint" class="mt-1 text-sm text-neutral-600">
                You must be at least 18 years old
              </p>
              <p
                v-if="errors.dateOfBirth"
                id="date-of-birth-error"
                class="mt-1 text-sm text-error"
                role="alert"
              >
                {{ errors.dateOfBirth }}
              </p>
            </div>

            <!-- Sex -->
            <div>
              <fieldset>
                <legend class="label label-required mb-3">Sex</legend>
                <div class="flex gap-4">
                  <div class="flex items-center">
                    <input
                      id="sex-male"
                      v-model="form.sex"
                      type="radio"
                      value="Male"
                      required
                      class="w-5 h-5 text-primary border-neutral-300 focus:ring-4 focus:ring-primary/30"
                    />
                    <label for="sex-male" class="ml-2 text-sm font-medium text-neutral-700">
                      Male
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="sex-female"
                      v-model="form.sex"
                      type="radio"
                      value="Female"
                      required
                      class="w-5 h-5 text-primary border-neutral-300 focus:ring-4 focus:ring-primary/30"
                    />
                    <label for="sex-female" class="ml-2 text-sm font-medium text-neutral-700">
                      Female
                    </label>
                  </div>
                </div>
              </fieldset>
              <p
                v-if="errors.sex"
                id="sex-error"
                class="mt-1 text-sm text-error"
                role="alert"
              >
                {{ errors.sex }}
              </p>
            </div>
          </div>

          <!-- Email Address -->
          <div>
            <label for="email" class="label label-required">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              :class="{ 'input-error': errors.email }"
              class="input"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'email-error' : 'email-hint'"
            />
            <p id="email-hint" class="mt-1 text-sm text-neutral-600">
              We'll use this for account verification and notifications
            </p>
            <p
              v-if="errors.email"
              id="email-error"
              class="mt-1 text-sm text-error"
              role="alert"
            >
              {{ errors.email }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="label label-required">
              Create Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="new-password"
                :class="{ 'input-error': errors.password }"
                class="input pr-12"
                :aria-invalid="!!errors.password"
                :aria-describedby="errors.password ? 'password-error' : 'password-hint'"
                @input="checkPasswordStrength"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neutral-600 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
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

            <!-- Password Strength Indicator -->
            <div
              v-if="form.password"
              class="mt-2"
              role="status"
              aria-live="polite"
              :aria-label="`Password strength: ${passwordStrength.label}`"
            >
              <div class="flex gap-1 mb-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  class="h-1.5 flex-1 rounded-full transition-colors"
                  :class="i <= passwordStrength.level ? passwordStrength.color : 'bg-neutral-200'"
                />
              </div>
              <p class="text-sm font-medium" :class="passwordStrength.textColor">
                {{ passwordStrength.label }}
              </p>
            </div>

            <p id="password-hint" class="mt-1 text-sm text-neutral-600">
              Must be at least 8 characters with uppercase, lowercase, number, and special character
            </p>
            <p
              v-if="errors.password"
              id="password-error"
              class="mt-1 text-sm text-error"
              role="alert"
            >
              {{ errors.password }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="authStore.loading || registrationSuccess"
          >
            <svg
              v-if="authStore.loading"
              class="animate-spin w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <span>{{ authStore.loading ? 'Creating Account...' : 'Create Account' }}</span>
          </button>

          <!-- Login Link -->
          <div class="text-center pt-4 border-t border-neutral-200">
            <p class="text-sm text-neutral-600">
              Already have an account?
              <NuxtLink
                to="/login"
                class="text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1"
              >
                Log In
              </NuxtLink>
            </p>
          </div>
        </form>
      </main>
    </div>

    <AccessibilityMenu />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  philhealthId: '',
  lastName: '',
  firstName: '',
  dateOfBirth: '',
  sex: '' as 'Male' | 'Female' | '',
  email: '',
  password: ''
})

const errors = reactive({
  philhealthId: '',
  lastName: '',
  firstName: '',
  dateOfBirth: '',
  sex: '',
  email: '',
  password: ''
})

const showPassword = ref(false)
const registrationSuccess = ref(false)
const passwordStrength = ref({
  level: 0,
  label: '',
  color: '',
  textColor: ''
})

// Max date (18 years ago)
const maxDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 18)
  return date.toISOString().split('T')[0]
})

// Format PhilHealth ID
const formatPhilHealthId = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/[^0-9]/g, '')
  
  if (value.length > 2) {
    value = value.substring(0, 2) + '-' + value.substring(2)
  }
  if (value.length > 12) {
    value = value.substring(0, 12) + '-' + value.substring(12)
  }
  if (value.length > 14) {
    value = value.substring(0, 14)
  }
  
  form.philhealthId = value
}

// Check password strength
const checkPasswordStrength = () => {
  const password = form.password
  let strength = 0

  if (password.length >= 8) strength++
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
  if (password.match(/[0-9]/)) strength++
  if (password.match(/[^a-zA-Z0-9]/)) strength++

  const levels = [
    { level: 0, label: 'Weak', color: 'bg-error', textColor: 'text-error' },
    { level: 1, label: 'Fair', color: 'bg-orange-500', textColor: 'text-orange-700' },
    { level: 2, label: 'Good', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    { level: 3, label: 'Strong', color: 'bg-success', textColor: 'text-success' },
    { level: 4, label: 'Very Strong', color: 'bg-success', textColor: 'text-success' }
  ]

  passwordStrength.value = levels[strength]
}

// Validate form
const validateForm = (): boolean => {
  let isValid = true

  // Clear errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // PhilHealth ID
  const philhealthIdRegex = /^\d{2}-\d{9}-\d{1}$/
  if (!form.philhealthId) {
    errors.philhealthId = 'PhilHealth ID is required'
    isValid = false
  } else if (!philhealthIdRegex.test(form.philhealthId)) {
    errors.philhealthId = 'Invalid format. Use XX-XXXXXXXXX-X'
    isValid = false
  }

  // Last Name
  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }

  // First Name
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }

  // Date of Birth
  if (!form.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required'
    isValid = false
  } else {
    const birthDate = new Date(form.dateOfBirth)
    const age = (new Date().getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    if (age < 18) {
      errors.dateOfBirth = 'You must be at least 18 years old'
      isValid = false
    }
  }

  // Sex
  if (!form.sex) {
    errors.sex = 'Please select your sex'
    isValid = false
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Invalid email address'
    isValid = false
  }

  // Password
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  } else if (passwordStrength.value.level < 2) {
    errors.password = 'Password is too weak. Please use a stronger password'
    isValid = false
  }

  return isValid
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    const { announceToScreenReader } = useAccessibility()
    announceToScreenReader('Please fix the errors in the form')
    
    // Focus first error
    const firstError = Object.keys(errors).find(key => errors[key as keyof typeof errors])
    if (firstError) {
      const element = document.getElementById(firstError.replace(/([A-Z])/g, '-$1').toLowerCase())
      element?.focus()
    }
    return
  }

  authStore.clearError()

  const result = await authStore.register({
    philhealthId: form.philhealthId,
    lastName: form.lastName,
    firstName: form.firstName,
    dateOfBirth: form.dateOfBirth,
    sex: form.sex as 'Male' | 'Female',
    email: form.email,
    password: form.password
  })

  if (result.success) {
    registrationSuccess.value = true
    const { announceToScreenReader } = useAccessibility()
    announceToScreenReader('Registration successful! Redirecting to login...')

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
}

// SEO
useHead({
  title: 'Create Account - PhilHealth',
  meta: [
    { name: 'description', content: 'Register for a PhilHealth member account to access online services.' }
  ]
})

// Set layout to blank (no header/footer)
definePageMeta({
  layout: 'blank'
})
</script>
