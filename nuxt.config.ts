// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,

  // typescripts
  typescript: {
      strict: true,
      typeCheck: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/main.css'],

  modules: [
      '@vueuse/nuxt',
      '@unocss/nuxt',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // experimental features
  experimental: {
      reactivityTransform: false,
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
