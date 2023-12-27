<template>
    <aside class="socials">
        <a href="#" class="fab fa-github">
            <span>github</span>
        </a>
        <a href="#" class="fab fa-twitter">
            <span>twitter</span>
        </a>
        <a href="https://www.linkedin.com/in/ssmm0498/" class="fab fa-linkedin">
            <span>linkedin</span>
        </a>
        <a href="#" class="fab fa-codepen">
            <span>codepen</span>
        </a>
        <a href="#" class="fab fa-dribbble">
            <span>dribbble</span>
        </a>
    </aside>
</template>
<style scoped lang="css">
.socials {
    position: fixed;
    left: -50%;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    transition: left 0.5s ease-in-out;
}

.socials.active {
    left: 75px;
}

.socials > a {
    display: flex;
    width: 150px;
    font-size: 17.5px;
    align-items: flex-start;
    margin-bottom: 25px;
    overflow: hidden;
    cursor: pointer;
}

.socials a > span {
    transform: translateX(-150%);
    transition: transform 0.5s ease-in-out;
}

.socials a:hover > span {
    transform: translateX(5%);
}
</style>
