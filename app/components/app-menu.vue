<template>
  <div class="menu" :class="{ active: state.isMenuActive }">
    <div class="menu-btn">
      <button class="nav-tgl" type="button" aria-label="toggle menu" @click.prevent="toggle">
        <span aria-hidden="true"></span>
      </button>
        <div v-if="!state.isMenuActive" class="logo">ssmm0498</div>
    </div>
    <nav class="nav">
      <ul>
        <li>
          <a href="#Home" @click.prevent="() => handleNavigation(0)">Home</a>
        </li>
        <li>
          <a href="#AboutMe" @click.prevent="() => handleNavigation(1)">About Me</a>
        </li>
        <li>
          <a href="#MyServices" @click.prevent="() => handleNavigation(2)">My Services</a>
        </li>
        <li>
          <a href="#MyWorks" @click.prevent="() => handleNavigation(3)">My Works</a>
        </li>
        <li>
          <a href="#ContactMe" @click.prevent="() => handleNavigation(4)">Contact Me</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
const { state, goToSection, toggle } = useSectionCurrent()

const handleNavigation = (index: number) => {
  toggle()
  setTimeout(() => goToSection(index), 750)
}
</script>
<style scoped lang="css">
.logo {
  margin-left: 1rem;
  font-family: Poppins, sans-serif;
  font-size: 1.5rem;
  z-index: 3;
  transition: transform 0.125s ease-in-out;
}

@media only screen and (max-width: 834px) {
  .logo {
    font-size: 2.5rem;
  }
}

.hide .logo {
  transform: translate(-50%, -200%);
}

.menu,
.nav {
  position: fixed;
  top: -100dvh;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  transition: top 0.5s ease-in-out;
}

.nav ul {
  position: relative;
  top: -100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  list-style-type: none;
  transition: top 0.5s ease-in-out 0.25s;
}

.nav li {
  z-index: 2;
  font-size: clamp(2.5rem, 7vw, 5rem);
  color: var(--second);
  margin-bottom: 1.75rem;
}

.nav li a {
  color: var(--second);
  font-weight: 550;
  text-decoration: none;
  transition: letter-spacing 0.75s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.nav li a:hover {
  letter-spacing: 1rem;
}

.nav li a:active {
  opacity: 0.7;
}

.menu-btn {
  position: fixed;
  top: 30px;
  left: var(--menu, 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.nav-tgl {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  padding: 0;
  background: var(--second);
  box-shadow: 0 0.25rem 1.25rem rgb(250 250 250 / 25%);
  line-height: 0.6;
  text-align: center;
  transition: all 0.3s ease;
}

.nav-tgl>span {
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

.nav-tgl>span::before,
.nav-tgl>span::after {
  display: inline-block;
  position: absolute;
  content: '';
  height: 2px;
  border-radius: 1px;
  background: var(--prime);
  transition: all 200ms;
}

.nav-tgl>span::before {
  top: -7px;
  width: 15px;
}

.nav-tgl>span::after {
  top: 7px;
  width: 20px;
}

.nav-tgl:focus {
  outline: none;
}

.nav-tgl:hover>span::after,
.nav-tgl:hover>span::before {
  width: 25px;
}

.nav::before {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  content: '';
  width: 100vw;
  height: 100dvh;
  transition: all 0.75s ease-in-out;
  clip-path: circle(20px at calc(var(--menu, 2rem) + 20px) 50px);
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
  filter: blur(1.25rem);
  background: var(--prime-t);
}

.menu.active .nav ul {
  top: 0;
}

.menu.active .nav-tgl>span {
  height: 0;
}

.menu.active .nav-tgl>span::after,
.menu.active .nav-tgl>span::before {
  top: 0;
  width: 25px;
}

.menu.active .nav-tgl>span::after {
  transform: rotate(-45deg);
}

.menu.active .nav-tgl>span::before {
  transform: rotate(45deg);
}

/* Tablet and below */
@media only screen and (max-width: 1024px) {
  .nav li {
    font-size: clamp(2rem, 6vw, 3.5rem);
    margin-bottom: 1.5rem;
  }

  .nav li a:hover {
    letter-spacing: 0.5rem;
  }

  .nav-tgl {
    left: var(--menu, 1.5rem);
    top: 20px;
  }

  .nav::before {
    clip-path: circle(22px at calc(var(--menu, 1.5rem) + 22px) 42px);
  }
}

/* Mobile landscape and below */
@media only screen and (max-width: 768px) {
  .nav-tgl {
    width: 20px;
    height: 20px;
  }

  .nav li {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    margin-bottom: 1.25rem;
  }

  .nav li a:hover {
    letter-spacing: 0.3rem;
  }

  .nav-tgl {
    left: var(--menu, 1rem);
    top: 15px;
    width: 48px;
    height: 48px;
  }

  .nav-tgl>span {
    width: 22px;
  }

  .nav-tgl>span::before {
    width: 14px;
  }

  .nav-tgl>span::after {
    width: 18px;
  }

  .nav-tgl:hover>span::after,
  .nav-tgl:hover>span::before {
    width: 22px;
  }

  .menu.active .nav-tgl>span::after,
  .menu.active .nav-tgl>span::before {
    width: 22px;
  }

  .nav::before {
    clip-path: circle(24px at calc(var(--menu, 1rem) + 24px) 39px);
  }
}

/* Mobile portrait */
@media only screen and (max-width: 480px) {
  .nav ul {
    padding: 0 1rem;
    width: 100%;
  }

  .nav li {
    font-size: clamp(1.5rem, 8vw, 2rem);
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
  }

  .nav li a {
    display: block;
    padding: 0.5rem;
  }

  .nav li a:hover {
    letter-spacing: 0.15rem;
  }

  .nav-tgl {
    left: 1rem;
    top: 1rem;
  }

  .nav::before {
    clip-path: circle(25px at calc(1rem + 25px) 41px);
  }
}

/* Small mobile devices */
@media only screen and (max-width: 360px) {
  .nav li {
    font-size: clamp(1.25rem, 7vw, 1.75rem);
    margin-bottom: 0.75rem;
  }

  .nav li a:hover {
    letter-spacing: 0.1rem;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .nav li a {
    padding: 0.75rem 1rem;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-tgl:hover>span::after,
  .nav-tgl:hover>span::before {
    width: inherit;
  }

  .nav li a:hover {
    letter-spacing: normal;
  }

  .nav li a:active {
    transform: scale(0.95);
  }
}
</style>
