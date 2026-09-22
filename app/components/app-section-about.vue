<template>
  <section id="#AboutMe">
    <h1>{{ t('about.title') }}</h1>
    <h2>
      <span class="bio">{{ t('about.bio') }}</span>
      <span class="bio-short">{{ t('about.bioShort') }}</span>
    </h2>
    <div class="skill">
      <div class="tech-card" v-for="tech in techList" :key="tech.id">
        <div class="tech-back"></div>
        <img v-if="tech.logo" :src="useAssets(`techs/${tech.logo}`)" :alt="tech.name" />
        <span v-else class="logo-text" :style="{ '--tech-color': tech.color }">{{ tech.name }}</span>
        <p class="description">{{ t(`tech.${tech.id}`) }}</p>
      </div>
    </div>
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
