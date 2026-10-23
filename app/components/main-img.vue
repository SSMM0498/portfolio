<template>
  <div class="avatar avatar-dark"></div>
  <div class="avatar avatar-light"></div>
</template>

<style scoped>
/* These are backgrounds rather than <img> on purpose: a hidden <img> is still
   downloaded, so both avatars used to be fetched on every visit. A background-image
   on a display:none element is never fetched, so each visitor downloads only theirs. */
.avatar {
  position: absolute;
  bottom: 0;
  /* 80% of the screen height, but never wider than the screen (image ratio 1200×1600) */
  height: min(80dvh, 133vw);
  width: auto;
  aspect-ratio: 1200 / 1600;
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: contain;
}

/* The dark avatar is shown unless the theme is light. html.light is set before the
   first paint, from the system theme or a stored choice, so only one avatar is fetched. */
.avatar-dark {
  display: block;
  background-image: url("~/assets/img/avatar_black.webp");
}

.avatar-light {
  display: none;
  background-image: url("~/assets/img/avatar_white.webp");
}

:global(html.light .avatar-dark) {
  display: none;
}

:global(html.light .avatar-light) {
  display: block;
}
</style>
