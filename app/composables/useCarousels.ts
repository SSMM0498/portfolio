import type { Ref } from 'vue'

export type CarouselControls = {
    scrollPage: (direction: 1 | -1) => void
    canPrev: Readonly<Ref<boolean>>
    canNext: Readonly<Ref<boolean>>
}

// Carousels register themselves by name when mounted, so the page buttons can drive the visible one.
// Only filled on the client (onMounted), so it is never shared between SSR requests.
const carousels = shallowReactive(new Map<string, CarouselControls>())

export default function useCarousels() {
    return carousels
}
