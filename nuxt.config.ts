import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Electromovilidad en Chile - Autos eléctricos, carga residencial y más | AutoVolt',
      meta: [
        { name: 'description', content: 'Descubre todo sobre autos eléctricos e híbridos en Chile: modelos, comparadores, simulador de ahorros y soluciones de carga residencial. Tu camino hacia la electromovilidad empieza aquí.' },
        { property: 'og:title', content: 'Electromovilidad en Chile - Autos eléctricos, carga residencial y más | AutoVolt' },
        { property: 'og:description', content: 'Encuentra el auto eléctrico ideal según tipo de carrocería, con simuladores y comparadores de AutoVolt.' },
        { property: 'og:image', content: 'https://storage.googleapis.com/mediamvp/Main%20Banner%20Skoda%20png.png' },
        { property: 'og:url', content: 'https://auto-volt.cl/' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'canonical', href: 'https://auto-volt.cl/' },
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