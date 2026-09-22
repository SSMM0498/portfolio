<template>
  <div class="controls">
    <UColorModeButton color="neutral" variant="solid" size="lg" class="ctrl-btn">
      <template #fallback>
        <div class="ctrl-btn" />
      </template>
    </UColorModeButton>
    <UButton :to="switchLocalePath(otherLocale)" :label="otherLocale.toUpperCase()"
      :aria-label="t('controls.switchLanguage')" color="neutral" variant="solid" size="lg" class="ctrl-btn" />
  </div>
</template>
<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const otherLocale = computed(() => (locale.value === 'en' ? 'fr' : 'en'))
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

@media only screen and (max-width: 768px) {
  .controls {
    bottom: 1rem;
    right: 1rem;
  }

  .controls :deep(.ctrl-btn) {
    width: 48px;
    height: 48px;
  }
}
</style>
