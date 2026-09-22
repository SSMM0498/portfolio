<template>
  <img class="avatar-light" src="~/assets/img/avatar_white.webp" alt="" />
  <img class="avatar-dark" src="~/assets/img/avatar_black.webp" alt="" />
</template>

<style scoped>
img {
  position: absolute;
  bottom: 0;
  /* 80% of the screen height, but never wider than the screen (image ratio 1792×2390 → 133vw) */
  height: min(80dvh, 133vw);
  width: auto;
}

.avatar-light {
  display: block;
}

.avatar-dark {
  display: none;
}

/* Light mode: show black avatar, hide white */
:global(html.light .avatar-light) {
  display: block;
}

:global(html.light .avatar-dark) {
  display: none;
}

/* Dark mode: show white avatar, hide black */
:global(html.dark .avatar-light) {
  display: none;
}

:global(html.dark .avatar-dark) {
  display: block;
}
</style>
