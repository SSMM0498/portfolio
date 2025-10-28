<template>
  <section id="#AboutMe">
    <h1>About Me</h1>
    <h2>
      I'm an AI enthusiast 🧠 and a fullstack engineer 🔧. I started 💯% in backend ⚙️ and I love Golang 🐹, but I
      prefer Node.js ⚡ for its simplicity. My passion for drawing 🎨 led me to the frontend with Vue.js 🌟 to bring my
      designs to life.
    </h2>
    <div class="skill">
      <div class="tech-card" v-for="(tech, key) in techList" :key="key">
        <div class="tech-back"></div>
        <img :src="useAssets(`techs/${tech.logo}`)" alt="Item Top Tab" />
        <p class="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dicta, temporibus.
        </p>
      </div>
    </div>
  </section>
</template>