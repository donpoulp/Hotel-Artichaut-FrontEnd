// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'vue3-carousel-nuxt', '@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-auth-utils'],
  css: ['@/assets/css/main.css', '@/assets/css/leaflet.css'],
  experimental: { appManifest: false },
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
      baseURL: process.env.API_URL,
    }
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },
})