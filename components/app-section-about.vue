<template>
  <section id="#AboutUs">
    <h1>Notre Équipe</h1>
    <h2>
      Nous sommes 5 passionnés à votre service pour digitaliser votre activité. Une équipe complète qui transforme vos idées en outils concrets pour booster votre business.
    </h2>
    <div class="team-info">
      <div class="team-member">
        <div class="member-icon">👨‍💻</div>
        <h3>2 Développeurs Fullstack</h3>
        <p>Spécialisés dans la création d'applications web et mobiles performantes</p>
      </div>
      <div class="team-member">
        <div class="member-icon">🎨</div>
        <h3>2 Designers UI/UX</h3>
        <p>Experts en création de logos, maquettes et identités visuelles modernes</p>
      </div>
      <div class="team-member">
        <div class="member-icon">📈</div>
        <h3>1 Lead Sales</h3>
        <p>Votre guide personnel pour vous accompagner tout au long du projet</p>
      </div>
    </div>
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
<style scoped>
.team-info {
  display: flex;
  justify-content: space-between;
  margin: 2rem 100px;
  gap: 2rem;
}

.team-member {
  flex: 1;
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.member-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.team-member h3 {
  color: var(--second);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.team-member p {
  color: var(--second);
  opacity: 0.8;
  font-size: 0.9rem;
  line-height: 1.4;
}

@media only screen and (max-width: 650px) {
  .team-info {
    flex-direction: column;
    margin: 2rem 0;
  }
}
</style>