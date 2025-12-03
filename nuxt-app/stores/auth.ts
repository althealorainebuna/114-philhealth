import { defineStore } from 'pinia'

export interface User {
  id: string
  memberId: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  sex: 'Male' | 'Female'
}

export interface LoginCredentials {
  memberIdOrUsername: string
  password: string
  captcha: string
  rememberMe?: boolean
}

export interface RegisterData {
  philhealthId: string
  lastName: string
  firstName: string
  dateOfBirth: string
  sex: 'Male' | 'Female'
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    fullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
    hasError: (state) => !!state.error
  },

  actions: {
    /**
     * Login user with credentials
     */
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        // Mock API call - replace with actual API
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Validate CAPTCHA (mock validation)
        if (!credentials.captcha || credentials.captcha.length < 3) {
          throw new Error('Please complete the CAPTCHA verification')
        }

        // Mock validation
        if (credentials.memberIdOrUsername === 'demo' && credentials.password === 'password123') {
          // Mock successful login
          this.user = {
            id: '1',
            memberId: '12-345678901-2',
            firstName: 'Juan',
            lastName: 'Dela Cruz',
            email: 'juan.delacruz@example.com',
            dateOfBirth: '1990-01-15',
            sex: 'Male'
          }
          this.token = 'mock-jwt-token-' + Date.now()

          // Store in localStorage if remember me
          if (credentials.rememberMe) {
            localStorage.setItem('philhealth_token', this.token)
            localStorage.setItem('philhealth_user', JSON.stringify(this.user))
          }

          return { success: true }
        } else {
          throw new Error('Invalid member ID/username or password')
        }
      } catch (err: any) {
        this.error = err.message || 'Login failed. Please try again.'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    /**
     * Register new member
     */
    async register(data: RegisterData) {
      this.loading = true
      this.error = null

      try {
        // Mock API call - replace with actual API
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Validate PhilHealth ID format (XX-XXXXXXXXX-X)
        const philhealthIdRegex = /^\d{2}-\d{9}-\d{1}$/
        if (!philhealthIdRegex.test(data.philhealthId)) {
          throw new Error('Invalid PhilHealth ID format. Use XX-XXXXXXXXX-X')
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email)) {
          throw new Error('Invalid email address')
        }

        // Validate password strength
        if (data.password.length < 8) {
          throw new Error('Password must be at least 8 characters long')
        }

        // Mock successful registration
        this.user = {
          id: '2',
          memberId: data.philhealthId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          sex: data.sex
        }
        this.token = 'mock-jwt-token-' + Date.now()

        // Store in localStorage
        localStorage.setItem('philhealth_token', this.token)
        localStorage.setItem('philhealth_user', JSON.stringify(this.user))

        return { success: true }
      } catch (err: any) {
        this.error = err.message || 'Registration failed. Please try again.'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    /**
     * Logout user
     */
    logout() {
      this.user = null
      this.token = null
      this.error = null
      
      // Clear localStorage
      localStorage.removeItem('philhealth_token')
      localStorage.removeItem('philhealth_user')

      // Redirect to home
      navigateTo('/')
    },

    /**
     * Restore session from localStorage
     */
    restoreSession() {
      const token = localStorage.getItem('philhealth_token')
      const userJson = localStorage.getItem('philhealth_user')

      if (token && userJson) {
        try {
          this.token = token
          this.user = JSON.parse(userJson)
        } catch (err) {
          console.error('Failed to restore session:', err)
          this.logout()
        }
      }
    },

    /**
     * Clear error message
     */
    clearError() {
      this.error = null
    }
  }
})
