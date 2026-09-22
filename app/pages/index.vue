<template>
  <div class="body" :class="{ hide: state.currentSection > 0 }">
    <app-menu />
    <app-controls />
    <i18n-t keypath="hero.message" tag="p" class="message" scope="global">
      <template #data><span>{{ t('hero.data') }}</span></template>
      <template #intel><span>{{ t('hero.intel') }}</span></template>
    </i18n-t>
    <main>
      <div class="circle1" :class="{ right: isUpperHome }"></div>
      <div class="circle2" :class="{ left: isUpperHome }"></div>
      <div :class="{ full: state.currentSection > 0, glass: true }"></div>
      <app-aside :class="{ active: state.currentSection === 4 }" />
      <app-section-hero :class="{ active: state.currentSection === 0 }" />
      <app-section-about :class="{ active: state.currentSection === 1 }" />
      <app-section-service :class="{ active: state.currentSection === 2 }" />
      <app-section-work :class="{ active: state.currentSection === 3 }" />
      <app-section-contact :class="{ active: state.currentSection === 4 }" />
    </main>
    <button class="scroll-down" v-show="state.currentSection < 4" @click="increment"><i></i></button>
  </div>
</template>
<script setup lang="ts">
const scrollSensitivitySetting = 5
const { t } = useI18n()
const { state, decrement, increment } = useSectionCurrent()
const isUpperHome = ref(false)
let ticking = false

const slideDurationTimeout = (slideDuration: number) => {
  setTimeout(function () {
    ticking = false
  }, slideDuration)
}

watch(state, () => {
  setTimeout(() => {
    isUpperHome.value = state.currentSection > 0
  }, 750)
})

const handleScroll = (evt: Event) => {
  const isFirefox = /Firefox/i.test(navigator.userAgent)
  const isIe =
    /MSIE/i.test(navigator.userAgent) ||
    /Trident.*rv:11\./i.test(navigator.userAgent)
  let delta = 0
  if (isFirefox) {
    delta = (evt as WheelEvent).detail * -120
  } else if (isIe) {
    delta = -(evt as WheelEvent).deltaY
  } else {
    delta = (evt as any).wheelDelta
  }

  if (ticking !== true && !state.isMenuActive) {
    if (delta <= -scrollSensitivitySetting && state.currentSection < 4) {
      ticking = true
      increment()
      slideDurationTimeout(1000)
    }
    if (delta >= scrollSensitivitySetting && state.currentSection > 0) {
      ticking = true
      decrement()
      slideDurationTimeout(1000)
    }
  }
}

let startY: number = 0

const handleTouchMove = (evt: TouchEvent) => {
  if (!evt.touches || evt.touches.length === 0) return

  const touchDeltaY = evt.touches[0]!.clientY - startY
  if (ticking !== true && !state.isMenuActive) {
    if (touchDeltaY <= -scrollSensitivitySetting && state.currentSection < 4) {
      ticking = true
      increment()
      slideDurationTimeout(1000)
    }
    if (touchDeltaY >= scrollSensitivitySetting && state.currentSection > 0) {
      ticking = true
      decrement()
      slideDurationTimeout(1000)
    }
  }
}

const handleTouchStart = (evt: TouchEvent) => {
  if (!evt.touches || evt.touches.length === 0) return
  startY = evt.touches[0]!.clientY
}

onMounted(() => {
  window.addEventListener('wheel', handleScroll, false)
  window.addEventListener('touchmove', handleTouchMove, false)
  window.addEventListener('touchstart', handleTouchStart, false)
})

// The page is remounted when the locale changes (/ ↔ /fr)
onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleScroll, false)
  window.removeEventListener('touchmove', handleTouchMove, false)
  window.removeEventListener('touchstart', handleTouchStart, false)
})
</script>
<style scoped lang="css">
.body {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
}

.scroll-down {
  position: absolute;
  bottom: 5%;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
  z-index: 25;
  transition: opacity .25s ease-in-out;
}

.scroll-down i {
  display: block;
  width: 32px;
  height: 32px;
  opacity: 1;
  border: 2px solid var(--second);
  border-radius: 32px;
  animation: 10s bounce 1.5s infinite;
  transition: transform, height, opacity .2s 5.5s ease-in;
}

@media only screen and (max-width: 768px) {
  .scroll-down {
    bottom: 5%;
  }

  .scroll-down i {
    width: 40px;
    height: 40px;
  }
}

.scroll-down i::before {
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 6px);
  transform: rotate(-45deg);
  display: block;
  width: 12px;
  height: 12px;
  content: "";
  border: 2px solid var(--second);
  border-width: 0 0 2px 2px;
}

.message {
  position: absolute;
  top: 30px;
  font-family: Poppins, sans-serif;
  font-size: 1.5rem;
  z-index: 3;
  transition: transform 0.125s ease-in-out;
}

@media only screen and (max-width: 834px) {
  .message {
    display: none;
  }
}

.message {
  right: 50px;
}

.hide .message {
  transform: translateX(200%);
}

.message span {
  color: var(--main);
}

main .circle1,
main .circle2 {
  position: absolute;
  width: max(35vw, 35dvh);
  height: max(35vw, 35dvh);
  border-radius: 50%;
  background-color: var(--main);
  filter: blur(1px);
  transition: filter 0.75s ease-in-out, transform 0.75s ease-in-out;
}

main .circle1.right {
  filter: blur(2.5px);
  transform: translate(-100px, 100px);
}

main .circle2 {
  width: max(40vw, 40dvh);
  height: max(40vw, 40dvh);
  opacity: 0.5;
  filter: blur(15px);
}

main .circle2.left {
  filter: blur(20px);
  transform: translate(50px, -50px);
}

/* Mobile: one big circle across the full screen width, halo slightly larger */
@media only screen and (max-width: 650px) {
  main .circle1 {
    width: 100vw;
    height: 100vw;
  }

  main .circle2 {
    width: 122vw;
    height: 122vw;
  }

  /* Lower on the hero… */
  main .circle1,
  main .circle2 {
    transform: translateY(35dvh);
  }

  /* Back to the hero: stack at the center first (split classes are removed 750ms later), then move down */
  main .circle1.right,
  main .circle2.left {
    transform: scale(0.6);
  }

  /* …then back to the center, and smaller, as soon as the scroll starts… */
  .hide main .circle1,
  .hide main .circle2 {
    transform: scale(0.6);
  }

  /* …keeping the same split movement as on desktop */
  .hide main .circle1.right {
    transform: translate(-100px, 100px) scale(0.6);
  }

  .hide main .circle2.left {
    transform: translate(50px, -50px) scale(0.6);
  }
}

main.cre .circle2,
main.cre .circle1 {
  background-color: var(--purple);
}

main.eff .circle2,
main.eff .circle1 {
  background-color: var(--orange);
}

.circle1.blob {
  width: 75vmax;
  height: 75vmax;
  border-radius: 50%;
  position: absolute;
  will-change: transform, opacity, background-image;
  animation: 8s linear infinite alternate blob;
}

main .glass {
  position: absolute;
  bottom: 0;
  backdrop-filter: blur(25px);
  background: var(--prime-d);
  width: 100%;
  height: 12.5%;
  border-top: 1px solid var(--main-t);
  transition: all 0.75s ease-in-out;
}

main.cre .glass {
  border-color: var(--purple-t);
}

main.eff .glass {
  border-color: var(--orange-t);
}

main .glass.full {
  border-top-width: .25rem;
  height: 100dvh;
  backdrop-filter: blur(15px);
}
</style>
