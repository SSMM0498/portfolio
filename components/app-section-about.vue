<template>
  <section id="#AboutMe">
    <h1>About Me</h1>
    <h2>
      I design solutions for the future that make sense today. Today, I'm
      a fullstack engineer. With a 100% backend start, I love the .NET
      philosophy for this but still prefer using the NodeJS stack for its
      speed and efficiency. However, my passion for drawing get me to add
      the frontend as a new string to my bow to bring beautiful designs to
      life with VueJS.
    </h2>
    <div class="skill">
      <div v-for="(tech, key) in techList" :key="key" class="tech-card">
        <div class="tech-back"></div>
        <img :src="useAssets(`techs/${tech.logo}`)" alt="Item Top Tab" />
        <p class="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dicta, temporibus.
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
