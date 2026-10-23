<script lang="ts" setup>
import { en, fr } from "@nuxt/ui/locale";
import site from "~/utils/site";
import socials from "~/utils/socials";

const { t, locale } = useI18n()
const localeHead = useLocaleHead()
const localePath = useLocalePath()
const colorMode = useColorMode()
const { siteUrl } = useRuntimeConfig().public

// Labels of the Nuxt UI components (e.g. the color mode button)
const uiLocale = computed(() => (locale.value === "fr" ? fr : en))
// Relative when NUXT_PUBLIC_SITE_URL is not set, e.g. in development
const ogImage = computed(() => `${siteUrl}/og/${locale.value}.jpg`)

useHead(() => ({
  htmlAttrs: {
    lang: localeHead.value.htmlAttrs.lang,
  },
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    { name: "format-detection", content: "telephone=no" },
    ...localeHead.value.meta,
  ],
  link: [
    // .ico is the fallback for browsers without SVG favicon support
    { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
    {
      // The key lets the client replace the SSR tag when the stored theme differs
      key: "favicon-svg",
      rel: "icon",
      type: "image/svg+xml",
      href: colorMode.value === "light" ? "/favicon-light.svg" : "/favicon-dark.svg",
    },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
    ...localeHead.value.link,
  ],
  script: [
    {
      // Lets search engines show who the site is about
      key: "ld-person",
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        jobTitle: t("meta.jobTitle"),
        description: t("meta.description"),
        url: `${siteUrl}${localePath("/")}`,
        image: ogImage.value,
        knowsAbout: site.knowsAbout,
        sameAs: socials.filter(social => social.url).map(social => social.url),
      },
    },
  ],
}));

useSeoMeta({
  title: () => t("meta.title"),
  description: () => t("meta.description"),
  themeColor: () => (colorMode.value === "light" ? "#ffffff" : "#000000"),
  ogTitle: () => t("meta.title"),
  ogDescription: () => t("meta.description"),
  ogType: "website",
  ogSiteName: site.name,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: "image/jpeg",
  ogImageAlt: () => t("meta.title"),
  twitterCard: "summary_large_image",
});
</script>
<template>
  <UApp :locale="uiLocale">
    <NuxtPage />
  </UApp>
</template>
