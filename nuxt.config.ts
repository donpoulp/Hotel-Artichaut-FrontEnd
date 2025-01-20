// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'vue3-carousel-nuxt', '@pinia/nuxt'],
  googleFonts: {
    families: {
      'Luxurious+Script': true,
      'Noto+Serif': { wght: [300, 400, 700], }, // Ajoute Noto Serif avec deux variantes (normal et bold)
      'Antic+Didone': true,
    },
    display: 'swap', // Pour charger la police avant le contenu

  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      apiBaseUrl: process.env.API_URL,
    }
  },

  colorMode: {
    preference: 'light'
  },
}})