<script lang="ts" setup>
const { t } = useI18n()
const localeHead = useLocaleHead()
const colorMode = useColorMode()

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
    ...localeHead.value.link,
  ],
}));

useSeoMeta({
  title: () => t("meta.title"),
  description: () => t("meta.description"),
  ogTitle: () => t("meta.title"),
  ogDescription: () => t("meta.description"),
  ogType: "website",
});
</script>
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
