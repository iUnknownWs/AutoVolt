import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'AutoVolt',
      link: [
        { rel: 'icon', type: 'image/png', href: 'https://storage.googleapis.com/mediamvp/AUTOVOLT%20FAVICON.png' },
      ],
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@nuxt/icon',
    '@nuxt/devtools',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    'vue3-carousel-nuxt',
    'nuxt-snackbar',
    'nuxt-gtag',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
    }
  },
  gtag: {
    id: 'G-DG2686F5C8'
  },
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  },
})