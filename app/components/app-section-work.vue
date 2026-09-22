<template>
  <section id="#MyWorks">
    <h1>{{ t('projects.title') }}</h1>
    <h2>{{ t('projects.subtitle') }}</h2>
    <div class="services">
      <div class="glass-card" v-for="project in featuredProjects" :key="project.id">
        <div class="glass-info">
          <span class="work-category">{{ t(`projects.${project.id}.context`) }}</span>
          <p class="glass-desc">{{ t(`projects.${project.id}.description`) }}</p>
          <ul v-if="project.tags.length" class="glass-tags">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
          <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">{{ t('projects.view') }} →</a>
        </div>
        <h2>{{ t(`projects.${project.id}.title`) }}</h2>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import projects from '~/utils/projects'

const { t } = useI18n()
const featuredProjects = projects.filter(project => project.featured)
</script>
