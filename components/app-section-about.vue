<template>
  <section id="#AboutUs">
    <h1>Nos Compétences</h1>
    <h2>
      Découvrez les technologies et outils que nous maîtrisons pour créer des solutions digitales performantes et modernes pour votre activité.
    </h2>
    <div class="skill">
      <div v-for="(tech, key) in techList" :key="key" class="tech-card">
        <div class="tech-back"></div>
        <img :src="useAssets(`techs/${tech.logo}`)" alt="Technology" />
        <p class="description">
          {{ tech.description }}
        </p>
        <div class="title c1">{{ tech.name }}</div>
        <div class="title c2">{{ tech.xp }}</div>
        <div class="title c3">{{ tech.level }}%</div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import useAssets from '~/composables/useAssets';
import techList from '~/utils/techList'
</script>