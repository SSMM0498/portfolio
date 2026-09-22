<template>
  <section id="#MyServices">
    <h1>{{ t('expertise.title') }}</h1>
    <h2>{{ t('expertise.subtitle') }}</h2>
    <div class="services">
      <div class="glass-card" v-for="id in expertise" :key="id">
        <div class="glass-info">
          <p class="glass-desc">{{ t(`expertise.${id}.description`) }}</p>
        </div>
        <h2>{{ t(`expertise.${id}.title`) }}</h2>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import expertise from '~/utils/expertise'

const { t } = useI18n()
</script>
