// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'PhilHealth Online Services',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'PhilHealth Online Services - Your Partner in Health' },
        { name: 'theme-color', content: '#007A3D' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts'
  },

  typescript: {
    strict: true,
    typeCheck: false  // Disable runtime type checking to avoid vue-tsc dependency
  },

  // Accessibility features
  experimental: {
    payloadExtraction: false
  },

  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
