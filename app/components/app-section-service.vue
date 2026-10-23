<template>
  <section id="section-expertise" aria-labelledby="section-expertise-title">
    <h2 id="section-expertise-title" class="section-title" tabindex="-1">{{ t('expertise.title') }}</h2>
    <p class="section-subtitle">{{ t('expertise.subtitle') }}</p>
    <app-carousel name="expertise" class="services">
      <!-- Focusable, so the description shown on hover is also shown on keyboard focus -->
      <div class="glass-card" v-for="id in expertise" :key="id" tabindex="0" role="group"
        :aria-labelledby="`expertise-${id}`">
        <div class="glass-info">
          <p class="glass-desc">{{ t(`expertise.${id}.description`) }}</p>
        </div>
        <h3 :id="`expertise-${id}`">{{ t(`expertise.${id}.title`) }}</h3>
      </div>
    </app-carousel>
  </section>
</template>
<script setup lang="ts">
import expertise from '~/utils/expertise'

const { t } = useI18n()
</script>
