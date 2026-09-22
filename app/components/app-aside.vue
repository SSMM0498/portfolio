<template>
  <aside class="socials">
    <a v-for="social in links" :key="social.name" :href="social.url" :aria-label="social.name" target="_blank"
      rel="noopener">
      <UIcon :name="social.icon" />
      <span>{{ social.name }}</span>
    </a>
  </aside>
</template>
<script setup lang="ts">
import socials from '~/utils/socials'

const links = socials.filter(social => social.url)
</script>
<style scoped lang="css">
.socials {
  position: fixed;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%) translateX(-100%);
  z-index: 5;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  transition: transform 0.5s ease-in-out;
}

.socials.active {
  transform: translateY(-50%) translateX(0);
}

.socials > a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: auto;
  min-width: 2rem;
  font-size: 1.5rem;
  color: currentColor;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.socials a > span {
  font-size: 1rem;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-0.5rem);
  transition: all 0.3s ease;
}

.socials a:hover {
  color: var(--main);
}

.socials a:hover > span {
  opacity: 1;
  transform: translateX(0);
}

/* Tablet styles */
@media only screen and (max-width: 768px) {
  .socials {
    left: 0.5rem;
    gap: 1.25rem;
    padding: 0.75rem;
  }

  .socials > a {
    font-size: 1.35rem;
  }

  .socials a > span {
    font-size: 0.9rem;
  }
}

/* Mobile styles */
@media only screen and (max-width: 650px) {
  .socials {
    top: auto;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%) translateY(150%);
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    background-color: var(--field);
    backdrop-filter: blur(10px);
    transition: transform 0.5s ease-in-out;
  }

  .socials.active {
    transform: translateX(-50%) translateY(0);
  }

  .socials > a {
    font-size: 1.5rem;
    min-width: auto;
  }

  .socials a > span {
    display: none;
  }
}

/* Small mobile optimization */
@media only screen and (max-width: 400px) {
  .socials {
    gap: 1rem;
    padding: 0.5rem 1rem;
  }

  .socials > a {
    font-size: 1.25rem;
  }
}
</style>
