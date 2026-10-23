<template>
  <section id="section-home" class="banner" aria-labelledby="section-home-title">
    <!-- The visible title is decorative: the page heading names who the site is about -->
    <h1 id="section-home-title" class="visually-hidden" tabindex="-1">{{ t('meta.title') }}</h1>
    <tech-wall />
    <hero-title />
    <main-img />
  </section>
</template>
<script setup lang="ts">
const { t } = useI18n()
</script>
