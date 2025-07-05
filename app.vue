<script lang="ts" setup>
useHead({
  title: "Tontine Dev & Design | Digitaliser votre activité",
  htmlAttrs: {
    lang: "fr",
  },
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    { 
      hid: "description", 
      name: "description", 
      content: "Rejoignez notre tontine et obtenez votre logo, site web et application mobile en payant petit à petit. Une équipe de 5 experts à votre service." 
    },
    { name: "format-detection", content: "telephone=no" },
    {
      name: "keywords",
      content: "tontine, développement web, application mobile, logo, design, Sénégal, digitalisation, startup"
    }
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