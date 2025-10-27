<template>
  <section id="#AboutMe">
    <h1>About Me</h1>
    <h2>
      I'm an AI enthusiast 🧠 and fullstack engineer 🔧. Started 100% backend ⚙️ loving Golang 🐹, but prefer Node.js ⚡ for its simplicity. My passion for drawing 🎨 led me to frontend with Vue.js 🌟 to bring designs to life.
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
