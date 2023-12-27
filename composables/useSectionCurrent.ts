type State = {
    currentSection: number
    isMenuActive: boolean
}

const state = reactive<State>({
    currentSection: 0,
    isMenuActive: false,
})

export default function useSectionCurrent() {
    const goToSection = (pageIndex: number) => {
        state.currentSection = pageIndex
    }

    const increment = () => {
        state.currentSection++
    }

    const decrement = () => {
        state.currentSection--
    }

    const toggle = () => {
        state.isMenuActive = !state.isMenuActive
    }

    return {
        state,
        goToSection,
        increment,
        decrement,
        toggle,
    }
}
