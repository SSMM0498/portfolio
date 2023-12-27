<template>
    <p class="tech-wall">
        <span
            v-for="(tech, key) in giantList"
            :key="key"
            class="tech"
            :class="{ active: key === current }"
            :style="{ '--tech-color': tech.color }"
        >
            {{ tech.name }}
        </span>
    </p>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import techList from '~/utils/techList'

const giantList = [
    ...techList,
    ...techList,
    ...techList,
    ...techList,
    ...techList,
    ...techList,
    ...techList,
].sort(() => Math.random() - 0.5)

const current = ref(0)
onMounted(() => {
    setInterval(() => {
        current.value = Math.floor(Math.random() * 168)
    }, 3000)
})
</script>
<style>
.tech-wall {
    position: absolute;
    top: 0%;
    width: 100%;
    height: 100%;
    word-break: break-all;
    text-transform: lowercase;
    z-index: 0;
    color: white;
}

span.tech {
    font-size: 2.5rem;
    opacity: 0.02;
}

span.tech::before {
    content: '#';
}

span.tech.active,
span.tech:hover {
    color: var(--tech-color);
    cursor: pointer;
    opacity: 1;
}
</style>
