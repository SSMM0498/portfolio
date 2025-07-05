<template>
  <section id="#Team">
    <h1>Notre Équipe</h1>
    <h2>
      Nous sommes 5 passionnés à votre service pour digitaliser votre activité. Une équipe complète qui transforme vos idées en outils concrets pour booster votre business.
    </h2>
    <div class="team-info">
      <div class="team-member">
        <div class="member-icon">👨‍💻</div>
        <h3>2 Développeurs Fullstack</h3>
        <p>Spécialisés dans la création d'applications web et mobiles performantes avec les dernières technologies</p>
        <div class="skills">
          <span class="skill-tag">Vue.js</span>
          <span class="skill-tag">React</span>
          <span class="skill-tag">Node.js</span>
          <span class="skill-tag">Flutter</span>
        </div>
      </div>
      <div class="team-member">
        <div class="member-icon">🎨</div>
        <h3>2 Designers UI/UX</h3>
        <p>Experts en création de logos, maquettes et identités visuelles modernes qui marquent les esprits</p>
        <div class="skills">
          <span class="skill-tag">Figma</span>
          <span class="skill-tag">Adobe Suite</span>
          <span class="skill-tag">Branding</span>
          <span class="skill-tag">UI/UX</span>
        </div>
      </div>
      <div class="team-member">
        <div class="member-icon">📈</div>
        <h3>1 Lead Sales</h3>
        <p>Votre guide personnel pour vous accompagner tout au long du projet et répondre à toutes vos questions</p>
        <div class="skills">
          <span class="skill-tag">Conseil</span>
          <span class="skill-tag">Suivi projet</span>
          <span class="skill-tag">Formation</span>
          <span class="skill-tag">Support</span>
        </div>
      </div>
    </div>
    
    <div class="team-values">
      <h3>Nos Valeurs</h3>
      <div class="values-grid">
        <div class="value-item">
          <div class="value-icon">🤝</div>
          <h4>Collaboration</h4>
          <p>Nous travaillons main dans la main avec vous pour comprendre vos besoins</p>
        </div>
        <div class="value-item">
          <div class="value-icon">⚡</div>
          <h4>Efficacité</h4>
          <p>Des solutions rapides et performantes pour faire grandir votre business</p>
        </div>
        <div class="value-item">
          <div class="value-icon">💡</div>
          <h4>Innovation</h4>
          <p>Nous utilisons les dernières technologies pour vous donner un avantage concurrentiel</p>
        </div>
        <div class="value-item">
          <div class="value-icon">🎯</div>
          <h4>Résultats</h4>
          <p>Votre succès est notre priorité, nous nous engageons sur les résultats</p>
        </div>
      </div>
    </div>
  </section>
</template>

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
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.member-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.team-member:nth-child(2) .member-icon {
  animation-delay: 1s;
}

.team-member:nth-child(3) .member-icon {
  animation-delay: 2s;
}

.team-member h3 {
  color: var(--second);
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.team-member p {
  color: var(--second);
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.1);
  color: var(--second);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.team-values {
  margin: 4rem 100px 2rem;
  text-align: center;
}

.team-values h3 {
  color: var(--second);
  font-size: 2.5rem;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 0.25s ease-in-out 0.5s, opacity 0.25s ease-in-out 0.5s;
}

section.active .team-values h3 {
  opacity: 1;
  transform: translateY(0);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.value-item {
  background: rgba(255, 255, 255, 0.03);
  padding: 2rem 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.value-item:hover {
  transform: scale(1.05);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.value-item h4 {
  color: var(--second);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.value-item p {
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
  
  .team-values {
    margin: 4rem 0 2rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .team-member {
    padding: 1.5rem 1rem;
  }
  
  .member-icon {
    font-size: 3rem;
  }
}
</style>