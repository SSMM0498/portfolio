// Public origin of the site, e.g. https://example.com. Canonical, hreflang, og:image,
// JSON-LD and sitemap URLs are absolute only when it is set at build time.
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '')

// PostHog loads its extensions from, and sends events to, *.posthog.com, or to its own
// host when it is proxied through another domain.
const posthogOrigin = process.env.NUXT_PUBLIC_POSTHOG_HOST ? new URL(process.env.NUXT_PUBLIC_POSTHOG_HOST).origin : ''
const posthogSources = posthogOrigin && !posthogOrigin.endsWith('.posthog.com')
  ? `https://*.posthog.com ${posthogOrigin}`
  : 'https://*.posthog.com'

// The prerendered pages are hydrated by inline scripts, hence 'unsafe-inline'.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${posthogSources}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${posthogSources}`,
  "font-src 'self' data:",
  `connect-src 'self' ${posthogSources}`,
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

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
    baseUrl: siteUrl,
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
    '/sitemap.xml': { prerender: true },
    '/robots.txt': { prerender: true },
  },
  // Only in production: the dev server relies on inline scripts and websockets for HMR,
  // and is also opened over plain http from other devices on the network.
  $production: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': contentSecurityPolicy,
          'Strict-Transport-Security': 'max-age=31536000',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },
  // Each key can be overridden at runtime with NUXT_<KEY>, e.g. NUXT_MAIL_HOST.
  runtimeConfig: {
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    CONTACT_MAIL: process.env.CONTACT_MAIL,
    public: {
      siteUrl,
      posthog: {
        publicKey: process.env.NUXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
        host: process.env.NUXT_PUBLIC_POSTHOG_HOST,
      },
    },
  },
})
