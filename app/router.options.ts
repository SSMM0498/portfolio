import type { RouterConfig } from '@nuxt/schema'

export default {
  // The page never scrolls: the URL hash only selects the visible section (see pages/index.vue)
  scrollBehavior: () => false,
} satisfies RouterConfig
