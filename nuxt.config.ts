// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'vue3-carousel-nuxt', '@pinia/nuxt'],
  experimental: { appManifest: false },
  googleFonts: {
    families: {
      'Luxurious+Script': true,
      'Noto+Serif': { wght: [300, 400, 700] },
      'Antic+Didone': true,
    },
    display: 'swap'
  },

  hooks: {
    'pages:extend'(pages) {
      const indexRouteIndex = pages.findIndex(page => page.path === '/');
      if (indexRouteIndex !== -1) {
        pages.splice(indexRouteIndex, 1);
      }
      pages.push({
        name: 'index',
        path: '/',
        file: '~/pages/site/index.vue'
      });
    }
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_URL,
    }
  },

  // Configuration du mode couleur
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '', // Important pour @nuxt/ui
    forcedLight: true // Force le mode clair
  },
})