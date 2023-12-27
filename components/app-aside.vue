<template>
  <aside class="socials">
    <a href="https://github.com/ssmm0498" class=" i-fa-github">
      <span>Github</span>
    </a>
    <a href="https://codepen.io/ssmm0498-the-typescripter" class=" i-fa-codepen">
      <span>CodePen</span>
    </a>
    <a href="https://www.linkedin.com/in/ssmm0498/" class=" i-fa-linkedin">
      <span>LinkedIN</span>
    </a>
    <a href="https://dribbble.com/ssmm0498" class=" i-fa-dribbble">
      <span>Dribbble</span>
    </a>
  </aside>
</template>
<style scoped lang="css">
.socials {
  position: fixed;
  left: -60%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  transition: left 0.5s ease-in-out;
}

.socials.active {
  left: 0px;
}

.socials>a {
  display: flex;
  width: 150px;
  font-size: 17.5px;
  align-items: flex-start;
  margin-bottom: 25px;
  /* overflow: hidden; */
  cursor: pointer;
}

.socials a>span {
  transform: translateX(-150%);
  transition: transform 0.5s ease-in-out;
}

.socials a:hover>span {
  transform: translateX(5%);
}


@media only screen and (max-width: 650px) {
  .socials {
    position: fixed;
    left: auto;
    right: 1rem;
    bottom: -60%;
    z-index: 5;
    flex-direction: row;
    justify-content: flex-start;
    transition: bottom 0.5s ease-in-out;
  }

  .socials.active {
    left: auto;
    bottom: 1rem;
  }

  .socials a {
    width: auto;
  }

  .socials a>span {
    opacity: 0;
  }
}
</style>
