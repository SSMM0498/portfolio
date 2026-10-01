export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // @nuxt/fonts is pulled in by @nuxt/ui, but it only reads the `fonts` key below
  // when it is a registered module, so it is listed explicitly.
  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxtjs/i18n'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
    ],
  },
  ssr: true,
  css: ['~/assets/styles/main.css'],
  // Montserrat and Poppins are only ever used upright, in the weights declared
  // across app/assets/styles, and the site is English/French only. Left to its
  // defaults @nuxt/fonts ships every weight in both styles across 7 subsets
  // (cyrillic, greek, vietnamese...): 82 faces, 2 MB.
  fonts: {
    defaults: {
      subsets: ['latin', 'latin-ext'],
    },
    families: [
      { name: 'Montserrat', provider: 'google', weights: [400, 600, 700, 800, 900], styles: ['normal'], subsets: ['latin', 'latin-ext'] },
      { name: 'Poppins', provider: 'google', weights: [400, 600, 700, 800, 900], styles: ['normal'], subsets: ['latin', 'latin-ext'] },
    ],
  },
  // The pages are static; only /api/contact needs a server.
  routeRules: {
    '/': { prerender: true },
    '/fr': { prerender: true },
  },
  runtimeConfig: {
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    CONTACT_MAIL: process.env.CONTACT_MAIL,
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  },
})
