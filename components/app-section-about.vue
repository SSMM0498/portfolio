<template>
  <section id="#AboutMe">
    <h1>About Me</h1>
    <h2>
      I'm an AI Enthusiast 🧠, FullStack🌟 Engineer, and passionate about Python 🐍, Golang ⚓, VueJS👽, ReactJS🚀, Typescript❤️, Node🍀, ExpressJS🤖, NestJS🧩 and NuxtJS 💚. With a 100% backend start, I love the Golang philosophy, but I prefer using the NodeJS stack for its simplicity and efficiency. My passion for drawing has inspired me to add frontend as a new string to my bow to bring beautiful designs to life with VueJS.
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
