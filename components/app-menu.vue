<template>
    <div class="menu" :class="{ active: state.isMenuActive }">
        <button
            class="nav-tgl"
            type="button"
            aria-label="toggle menu"
            @click.prevent="toggle"
        >
            <span aria-hidden="true"></span>
        </button>
        <nav class="nav">
            <ul>
                <li>
                    <a href="" @click.prevent="(evt) => handleNavigation(0)"
                        >Home</a
                    >
                </li>
                <li>
                    <a href="" @click.prevent="(evt) => handleNavigation(1)"
                        >About Me</a
                    >
                </li>
                <li>
                    <a href="" @click.prevent="(evt) => handleNavigation(2)"
                        >My Services</a
                    >
                </li>
                <li>
                    <a href="" @click.prevent="(evt) => handleNavigation(3)"
                        >My Works</a
                    >
                </li>
                <li>
                    <a href="" @click.prevent="(evt) => handleNavigation(4)"
                        >Contact Me</a
                    >
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup lang="ts">
import useSectionCurrent from '~/composables/useSectionCurrent'

const { state, goToSection, toggle } = useSectionCurrent()

const handleNavigation = (index: number) => {
    toggle()
    setTimeout(() => goToSection(index), 750)
}
</script>
<style scoped lang="css">
.menu,
.nav {
    position: fixed;
    top: -100vh;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    transition: top 0.5s ease-in-out;
}

.nav ul {
    position: relative;
    top: -100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    list-style-type: none;
    transition: top 0.5s ease-in-out 0.25s;
}

.nav li {
    z-index: 2;
    font-size: 5rem;
    color: var(--second);
    margin-bottom: 1.75rem;
}

.nav li a {
    color: var(--second);
    font-weight: 550;
    transition: letter-spacing 0.75s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.nav li a:hover {
    letter-spacing: 1rem;
}

.nav-tgl {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: fixed;
    z-index: 100;
    left: 50px;
    top: 30px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    padding: 0;
    background: var(--second);
    box-shadow: 0 0.25rem 1.25rem rgb(250 250 250 / 25%);
    line-height: 0.6;
    text-align: center;
}

.nav-tgl > span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 2px;
    width: 25px;
    border-radius: 1px;
    background: var(--prime);
    vertical-align: middle;
}

.nav-tgl > span::before,
.nav-tgl > span::after {
    display: inline-block;
    position: absolute;
    content: '';
    height: 2px;
    border-radius: 1px;
    background: var(--prime);
    transition: all 200ms;
}

.nav-tgl > span::before {
    top: -7px;
    width: 15px;
}

.nav-tgl > span::after {
    top: 7px;
    width: 20px;
}

.nav-tgl:focus {
    outline: none;
}

.nav-tgl:hover > span::after,
.nav-tgl:hover > span::before {
    width: 25px;
}

.nav::before {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    content: '';
    width: 100vw;
    height: 100vh;
    transition: all 0.75s ease-in-out;
    clip-path: circle(20px at 70px 50px);
    z-index: -1;
    visibility: hidden;
    background-color: var(--red);
}

.menu.active,
.menu.active .nav {
    top: 0;
}

.menu.active .nav::before {
    visibility: visible;
    clip-path: circle(100%);
    filter: blur(5rem);
    background: var(--prime-t);
}

.menu.active .nav ul {
    top: 0;
}

.menu.active .nav-tgl > span {
    height: 0;
}

.menu.active .nav-tgl > span::after,
.menu.active .nav-tgl > span::before {
    top: 0;
    width: 25px;
}

.menu.active .nav-tgl > span::after {
    transform: rotate(-45deg);
}

.menu.active .nav-tgl > span::before {
    transform: rotate(45deg);
}
</style>
