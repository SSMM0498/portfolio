<template>
  <div class="body" :class="{ hide: state.currentSection > 0 }">
    <app-menu />
    <app-controls />
    <i18n-t keypath="hero.message" tag="p" class="message" scope="global">
      <template #data><span>{{ t('hero.data') }}</span></template>
      <template #intel><span>{{ t('hero.intel') }}</span></template>
    </i18n-t>
    <!-- While the menu is open, Tab stays in it -->
    <main :inert="state.isMenuActive">
      <div class="circle1" :class="{ right: isUpperHome }"></div>
      <div class="circle2" :class="{ left: isUpperHome }"></div>
      <div :class="{ full: state.currentSection > 0, glass: true }"></div>
      <app-aside v-bind="sectionAttrs(LAST_SECTION)" />
      <app-section-hero v-bind="sectionAttrs(0)" />
      <app-section-about v-bind="sectionAttrs(1)" />
      <app-section-service v-bind="sectionAttrs(2)" />
      <app-section-work v-bind="sectionAttrs(3)" />
      <app-section-contact v-bind="sectionAttrs(4)" />
    </main>
    <div class="bottom-nav" :inert="state.isMenuActive">
      <button v-show="activeCarousel" class="carousel-btn prev" :disabled="!activeCarousel?.canPrev.value"
        :aria-label="t('controls.carouselPrev')" @click="activeCarousel?.scrollPage(-1)"></button>
      <button class="scroll-down" v-show="state.currentSection < LAST_SECTION" :aria-label="t('controls.nextSection')"
        @click="increment"><i></i></button>
      <button v-show="activeCarousel" class="carousel-btn next" :disabled="!activeCarousel?.canNext.value"
        :aria-label="t('controls.carouselNext')" @click="activeCarousel?.scrollPage(1)"></button>
    </div>
  </div>
</template>
<script setup lang="ts">
const scrollSensitivitySetting = 5
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { state, goToSection, decrement, increment } = useSectionCurrent()
const isUpperHome = ref(false)
let ticking = false

// Carousel shown in each section, in section order (matches the `name` of each app-carousel)
const sectionCarousels = [null, 'about', 'expertise', 'projects', null]
const carousels = useCarousels()
const activeCarousel = computed(() => {
  const name = sectionCarousels[state.currentSection]
  return name ? carousels.get(name) : undefined
})

// The hidden sections stay in the page: inert keeps them out of Tab and screen readers
const sectionAttrs = (index: number) => ({
  class: { active: state.currentSection === index },
  inert: state.currentSection !== index,
})

const slideDurationTimeout = (slideDuration: number) => {
  setTimeout(function () {
    ticking = false
  }, slideDuration)
}

// One section up or down, at most once per slide
const changeSection = (direction: 1 | -1) => {
  if (ticking || state.isMenuActive) return
  if (direction > 0 ? state.currentSection >= LAST_SECTION : state.currentSection <= 0) return
  ticking = true
  if (direction > 0) increment()
  else decrement()
  slideDurationTimeout(1000)
}

watch(state, () => {
  setTimeout(() => {
    isUpperHome.value = state.currentSection > 0
  }, 750)
})

// The URL hash names the visible section (none for the first), so each section can be linked to
const sectionFromHash = (hash: string) => Math.max(SECTION_IDS.indexOf(hash.slice(1)), 0)

watch(() => route.hash, hash => goToSection(sectionFromHash(hash)))

watch(() => state.currentSection, (index) => {
  const hash = index > 0 ? `#${SECTION_IDS[index]}` : ''
  if (route.hash !== hash) router.replace({ hash })
  // Focus follows, so keyboard and screen reader users carry on from the new section
  document.getElementById(`section-${SECTION_IDS[index]}-title`)?.focus({ preventScroll: true })
}, { flush: 'post' })

const handleKeydown = (evt: KeyboardEvent) => {
  if (evt.defaultPrevented || evt.altKey || evt.ctrlKey || evt.metaKey || state.isMenuActive) return
  const target = evt.target as Element
  // Keys keep their usual meaning while typing in the form
  if (target.closest('input, textarea, select, [contenteditable="true"]')) return

  switch (evt.key) {
    case 'ArrowDown':
    case 'PageDown':
      changeSection(1)
      break
    case 'ArrowUp':
    case 'PageUp':
      changeSection(-1)
      break
    case ' ':
      // Space presses the focused link or button
      if (target.closest('a, button')) return
      changeSection(evt.shiftKey ? -1 : 1)
      break
    case 'Home':
      goToSection(0)
      break
    case 'End':
      goToSection(LAST_SECTION)
      break
    case 'ArrowLeft':
    case 'ArrowRight':
      // Inside a carousel, the browser already scrolls it
      if (!activeCarousel.value || target.closest('.carousel-track')) return
      activeCarousel.value.scrollPage(evt.key === 'ArrowLeft' ? -1 : 1)
      break
    default:
      return
  }
  evt.preventDefault()
}

const handleScroll = (evt: Event) => {
  // Horizontal scrolling (trackpad, shift + wheel) belongs to the carousels
  if (Math.abs((evt as WheelEvent).deltaX) > Math.abs((evt as WheelEvent).deltaY)) return

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

  if (delta <= -scrollSensitivitySetting) changeSection(1)
  else if (delta >= scrollSensitivitySetting) changeSection(-1)
}

let startX: number = 0
let startY: number = 0
// Inside a carousel, a swipe is only a section change once it has clearly gone vertical
let startedInCarousel = false
let swipeAxis: 'x' | 'y' | null = null

const handleTouchMove = (evt: TouchEvent) => {
  if (!evt.touches || evt.touches.length === 0) return

  const touchDeltaX = evt.touches[0]!.clientX - startX
  const touchDeltaY = evt.touches[0]!.clientY - startY
  if (startedInCarousel) {
    if (!swipeAxis && Math.hypot(touchDeltaX, touchDeltaY) > 10) {
      swipeAxis = Math.abs(touchDeltaX) > Math.abs(touchDeltaY) ? 'x' : 'y'
    }
    if (swipeAxis !== 'y') return
  }
  if (touchDeltaY <= -scrollSensitivitySetting) changeSection(1)
  else if (touchDeltaY >= scrollSensitivitySetting) changeSection(-1)
}

const handleTouchStart = (evt: TouchEvent) => {
  if (!evt.touches || evt.touches.length === 0) return
  startX = evt.touches[0]!.clientX
  startY = evt.touches[0]!.clientY
  startedInCarousel = !!(evt.target as Element | null)?.closest?.('.carousel-track')
  swipeAxis = null
}

onMounted(() => {
  goToSection(sectionFromHash(route.hash))
  window.addEventListener('wheel', handleScroll, false)
  window.addEventListener('touchmove', handleTouchMove, false)
  window.addEventListener('touchstart', handleTouchStart, false)
  window.addEventListener('keydown', handleKeydown, false)
})

// The page is remounted when the locale changes (/ ↔ /fr)
onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleScroll, false)
  window.removeEventListener('touchmove', handleTouchMove, false)
  window.removeEventListener('touchstart', handleTouchStart, false)
  window.removeEventListener('keydown', handleKeydown, false)
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

/* Scroll down button, framed by the carousel buttons */
.bottom-nav {
  position: absolute;
  bottom: 5%;
  z-index: 25;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.scroll-down {
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: opacity .25s ease-in-out;
}

.carousel-btn {
  position: relative;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-color: transparent;
  border: 2px solid var(--second);
  border-radius: 50%;
  transition: opacity .25s ease-in-out, transform .25s ease-in-out;
}

.carousel-btn::before {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 10px;
  height: 10px;
  content: "";
  border: solid var(--second);
  border-width: 0 0 2px 2px;
}

.carousel-btn.prev::before {
  transform: translateX(2px) rotate(45deg);
}

.carousel-btn.next::before {
  transform: translateX(-2px) rotate(-135deg);
}

.carousel-btn:hover:not(:disabled) {
  transform: scale(1.1);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: default;
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
  /* Narrower, to leave room for the theme and language buttons on the same row */
  .bottom-nav {
    gap: 1rem;
  }

  .scroll-down i,
  .carousel-btn {
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
