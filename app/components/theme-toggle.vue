<template>
  <div class="theme-tgl">
    <UColorModeButton color="neutral" variant="soft" size="xl" class="rounded-full" />
  </div>
</template>

<style scoped lang="css">
.theme-tgl {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
}

@media only screen and (max-width: 1024px) {
  .theme-tgl {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}

@media only screen and (max-width: 768px) {
  .theme-tgl {
    bottom: 1rem;
    right: 1rem;
  }
}

@media only screen and (max-width: 480px) {
  .theme-tgl {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
