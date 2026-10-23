type State = {
    currentSection: number
    isMenuActive: boolean
}

// In display order. Each id is the URL hash of its section (#about...) and its menu label (menu.<id>).
export const SECTION_IDS = ['home', 'about', 'expertise', 'projects', 'contact']
export const LAST_SECTION = SECTION_IDS.length - 1

export default function useSectionCurrent() {
    // useState rather than module scope, so server requests never share it
    const state = useState<State>('section-current', () => ({
        currentSection: 0,
        isMenuActive: false,
    })).value

    const goToSection = (pageIndex: number) => {
        state.currentSection = Math.min(Math.max(pageIndex, 0), LAST_SECTION)
    }

    const increment = () => {
        goToSection(state.currentSection + 1)
    }

    const decrement = () => {
        goToSection(state.currentSection - 1)
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
