<template>
  <div ref="root" class="carousel" @pointerenter="handlePointerEnter" @pointerleave="handlePointerLeave">
    <div ref="track" class="carousel-track" @scroll.passive="update" @touchstart.passive="handleTouchStart"
      @touchend="handleTouchEnd" @touchcancel="handleTouchEnd">
      <slot />
    </div>
    <div class="carousel-edge prev" :class="{ visible: canPrev }" aria-hidden="true"
      @mouseenter="setEdgeDirection(-1)" @mouseleave="setEdgeDirection(0)" />
    <div class="carousel-edge next" :class="{ visible: canNext }" aria-hidden="true"
      @mouseenter="setEdgeDirection(1)" @mouseleave="setEdgeDirection(0)" />
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  // Seconds for the auto scroll to cross the whole carousel once
  duration?: number
}>(), { duration: 20 })

// Hovering an edge scrolls this fraction of the visible width per second
const EDGE_SPEED = 0.6
// The page buttons scroll this fraction of the visible width
const PAGE_RATIO = 0.8
// The auto scroll waits at each end, and after the user scrolled by hand
const END_PAUSE_MS = 5000
const IDLE_MS = 3000

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const canPrev = ref(false)
const canNext = ref(false)
const carousels = useCarousels()

// Only read by the animation loop, so they don't need to be reactive
let edgeDirection: -1 | 0 | 1 = 0
let isHovered = false
let isTouching = false
let reducedMotion = false
let position = 0
let autoDirection: 1 | -1 = 1
let holdUntil = 0
let interactedAt = -Infinity
let frame = 0
let lastFrame = 0

const update = () => {
  const el = track.value
  if (!el) return
  canPrev.value = el.scrollLeft > 1
  canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

const setEdgeDirection = (direction: -1 | 0 | 1) => {
  edgeDirection = direction
}

const handlePointerEnter = (evt: PointerEvent) => {
  // Touch has no hover: a tap must not pause the auto scroll for good
  isHovered = evt.pointerType !== 'touch'
}

const handlePointerLeave = () => {
  isHovered = false
}

const handleTouchStart = () => {
  isTouching = true
}

const handleTouchEnd = () => {
  isTouching = false
  interactedAt = performance.now()
}

const step = (now: number) => {
  const el = track.value
  if (!el) {
    frame = 0
    return
  }
  const seconds = Math.min(now - lastFrame, 100) / 1000
  lastFrame = now
  const max = el.scrollWidth - el.clientWidth

  // Scrolled by hand (swipe, trackpad, buttons): follow it and let the auto scroll wait
  if (Math.abs(el.scrollLeft - position) > 2) {
    position = el.scrollLeft
    interactedAt = now
  }

  if (edgeDirection) {
    position = Math.min(Math.max(position + edgeDirection * el.clientWidth * EDGE_SPEED * seconds, 0), max)
    el.scrollLeft = position
  } else if (!isHovered && !isTouching && !reducedMotion && max > 0
    && now - interactedAt > IDLE_MS && now > holdUntil) {
    // Back and forth, with a pause at each end
    position += autoDirection * (max / props.duration) * seconds
    if (position <= 0 || position >= max) {
      position = Math.min(Math.max(position, 0), max)
      autoDirection = autoDirection > 0 ? -1 : 1
      holdUntil = now + END_PAUSE_MS
    }
    el.scrollLeft = position
  }

  frame = requestAnimationFrame(step)
}

const start = () => {
  if (frame) return
  lastFrame = performance.now()
  frame = requestAnimationFrame(step)
}

const stop = () => {
  cancelAnimationFrame(frame)
  frame = 0
}

const scrollPage = (direction: 1 | -1) => {
  const el = track.value
  if (!el) return
  interactedAt = performance.now()
  el.scrollBy({ left: direction * el.clientWidth * PAGE_RATIO, behavior: 'smooth' })
}

let resizeObserver: ResizeObserver | null = null
let visibilityObserver: IntersectionObserver | null = null

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  update()
  carousels.set(props.name, { scrollPage, canPrev, canNext })

  resizeObserver = new ResizeObserver(update)
  if (track.value) resizeObserver.observe(track.value)

  // Only animate while the section is on screen
  visibilityObserver = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()))
  if (root.value) visibilityObserver.observe(root.value)
})

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  visibilityObserver?.disconnect()
  carousels.delete(props.name)
})
</script>
<style scoped>
.carousel {
  position: relative;
  isolation: isolate;
  /* Full bleed: the cards scroll from one screen edge to the other, whatever the section padding and scale */
  width: calc(100vw / var(--section-scale, 1));
  margin-left: calc(50% - 50vw / var(--section-scale, 1));
  height: 100%;
  min-height: 0;
}

.carousel-track {
  display: flex;
  align-items: flex-start;
  height: 100%;
  padding: 25px 2rem;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

/* Hover zones on both sides, lit with a soft glow of the theme color */
.carousel-edge {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 5;
  width: clamp(3rem, 8vw, 7rem);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}

.carousel-edge.prev {
  left: 0;
  background: radial-gradient(farthest-side at 0 50%, color-mix(in srgb, var(--main) 35%, transparent), transparent);
}

.carousel-edge.next {
  right: 0;
  background: radial-gradient(farthest-side at 100% 50%, color-mix(in srgb, var(--main) 35%, transparent), transparent);
}

.carousel-edge.visible {
  opacity: 0.35;
  pointer-events: auto;
}

.carousel-edge.visible:hover {
  opacity: 1;
}

/* No hover on touch screens: swipe and the page buttons take over */
@media (hover: none) {
  .carousel-edge {
    display: none;
  }
}
</style>
