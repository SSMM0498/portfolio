<template>
  <section id="section-projects" aria-labelledby="section-projects-title">
    <h2 id="section-projects-title" class="section-title" tabindex="-1">{{ t('projects.title') }}</h2>
    <p class="section-subtitle">{{ t('projects.subtitle') }}</p>
    <app-carousel name="projects" class="services">
      <!-- Focusable, so the description shown on hover is also shown on keyboard focus -->
      <div class="glass-card" v-for="project in featuredProjects" :key="project.id" tabindex="0" role="group"
        :aria-labelledby="`project-${project.id}`">
        <div class="glass-info">
          <span class="work-category">{{ t(`projects.${project.id}.context`) }}</span>
          <p class="glass-desc">{{ t(`projects.${project.id}.description`) }}</p>
          <ul v-if="project.tags.length" class="glass-tags">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
          <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer">
            {{ t('projects.view') }} →<span class="visually-hidden"> ({{ t('controls.newTab') }})</span>
          </a>
        </div>
        <h3 :id="`project-${project.id}`">{{ t(`projects.${project.id}.title`) }}</h3>
      </div>
    </app-carousel>
  </section>
</template>
<script setup lang="ts">
import projects from '~/utils/projects'

const { t } = useI18n()
const featuredProjects = projects.filter(project => project.featured)
</script>
