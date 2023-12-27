<script lang="ts" setup>
useHead({
  title: "Portfolio | SSaliou0498",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    { hid: "description", name: "description", content: "" },
    { name: "format-detection", content: "telephone=no" },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ],
});
</script>
<template>
  <Html>

  <Body>
    <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
    <NuxtPage />
  </Body>

  </Html>
</template>
