<template>
  <div class="controls">
    <UColorModeButton color="neutral" variant="solid" size="lg" class="ctrl-btn">
      <template #fallback>
        <div class="ctrl-btn" />
      </template>
    </UColorModeButton>
    <UButton :to="otherLocalePath" :label="otherLocale.toUpperCase()"
      :aria-label="t('controls.switchLanguage')" color="neutral" variant="solid" size="lg" class="ctrl-btn" />
  </div>
</template>
<script setup lang="ts">
const { locale, t } = useI18n()
const route = useRoute()
const switchLocalePath = useSwitchLocalePath()
const otherLocale = computed(() => (locale.value === 'en' ? 'fr' : 'en'))

// The hash keeps the visible section across languages. The server never receives it,
// so it is only added once hydrated, for the link to match the server-rendered one.
const isHydrated = ref(false)
onMounted(() => {
  isHydrated.value = true
})
const otherLocalePath = computed(() => {
  const path = switchLocalePath(otherLocale.value).split('#')[0]
  return isHydrated.value ? path + route.hash : path
})
</script>
<style scoped lang="css">
.controls {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Same look as the menu button (.nav-tgl in app-menu.vue) */
.controls :deep(.ctrl-btn) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  font-weight: 700;
  color: var(--prime);
  background: var(--second);
  box-shadow: 0 0.25rem 1.25rem rgb(250 250 250 / 25%);
  transition: transform 0.3s ease;
}

.controls :deep(.ctrl-btn:hover) {
  transform: scale(1.08);
}

@media only screen and (max-width: 1024px) {
  .controls {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}

/* One row, level with the scroll and carousel buttons (.bottom-nav in pages/index.vue) and the same size */
@media only screen and (max-width: 768px) {
  .controls {
    flex-direction: row;
    bottom: 5%;
    right: 1rem;
  }

  .controls :deep(.ctrl-btn) {
    width: 40px;
    height: 40px;
  }
}

@media only screen and (max-width: 374px) {
  .controls {
    right: 0.5rem;
  }
}
</style>
