<template>
  <section id="section-about" aria-labelledby="section-about-title">
    <h2 id="section-about-title" class="section-title" tabindex="-1">{{ t('about.title') }}</h2>
    <p class="section-subtitle">
      <span class="bio">{{ t('about.bio') }}</span>
      <span class="bio-short">{{ t('about.bioShort') }}</span>
    </p>
    <app-carousel name="about" :duration="70" class="skill">
      <!-- Focusable, so the description shown on hover is also shown on keyboard focus -->
      <div class="tech-card" v-for="tech in techList" :key="tech.id" tabindex="0" role="group" :aria-label="tech.name">
        <div class="tech-back"></div>
        <img v-if="tech.logo" :src="useAssets(`techs/${tech.logo}`)" :alt="tech.name" loading="lazy" decoding="async" />
        <span v-else class="logo-text" :style="{ '--tech-color': tech.color }">{{ tech.name }}</span>
        <p class="description">{{ t(`tech.${tech.id}`) }}</p>
      </div>
    </app-carousel>
  </section>
</template>
<script setup lang="ts">
import techList from '~/utils/techList'

const { t } = useI18n()
</script>
<style scoped lang="css">
.bio-short {
  display: none;
}

/* Mobile: short bio only */
@media only screen and (max-width: 650px) {
  .bio {
    display: none;
  }

  .bio-short {
    display: inline;
  }
}
</style>
