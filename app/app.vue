<script lang="ts" setup>
const { t } = useI18n()
const localeHead = useLocaleHead()

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
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
