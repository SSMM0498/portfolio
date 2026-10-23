<template>
  <main class="error-page">
    <p class="code" aria-hidden="true">{{ error.statusCode }}</p>
    <h1>{{ message }}</h1>
    <button type="button" @click="goHome">{{ t('error.back') }}</button>
  </main>
</template>
<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()
const localeHead = useLocaleHead()

const message = computed(() => t(props.error.statusCode === 404 ? 'error.notFound' : 'error.generic'))

// app.vue is not rendered on errors, so the page sets its own head
useHead({
  htmlAttrs: { lang: () => localeHead.value.htmlAttrs.lang },
})
useSeoMeta({
  title: () => `${props.error.statusCode} · ${message.value}`,
  robots: 'noindex',
})

const goHome = () => clearError({ redirect: localePath('/') })
</script>
<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  height: 100dvh;
  padding: 2rem;
  text-align: center;
}

.code {
  font-family: Poppins, sans-serif;
  font-size: clamp(6rem, 25vw, 14rem);
  font-weight: 900;
  line-height: 1;
  color: var(--main);
}

h1 {
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: 600;
}

/* Same look as the CV link (contact.css) */
button {
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  color: var(--prime);
  background-color: var(--second);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow);
}
</style>
