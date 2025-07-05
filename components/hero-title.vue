<template>
  <div class="content" :class="{ switch: isSwitching }">
    <h1 ref="title" :style="{ '--dot-top-position': dotTopPosition }" class="title">{{ titles[current] }}</h1>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const titles = ['ınnovative', 'productıve', 'creatıve']

const current = ref(0)
const isSwitching = ref(false)
const title = ref<HTMLElement | null>(null)

const switchTitle = () => {
  isSwitching.value = true
  setTimeout(() => {
    current.value = (current.value + 1) % 3
    isSwitching.value = false
  }, 350)
}

const dotLeftPosition = computed(() => {
  if (current.value === 0) {
    return '0.25%'
  }
  if (current.value === 1) {
    return '73.7%'
  } else {
    return '64.25%'
  }
});

const dotTopPosition = computed(() => {
  if (title.value === null) {
    return '-90%'
  } else {
    const titleRect = title.value.getBoundingClientRect().height / 2
    return '-' + titleRect + 'px'
  }
});

onMounted(() =>
  setInterval(() => {
    switchTitle()
  }, 7000)
)
</script>
<style scoped>
.content {
  position: absolute;
  bottom: 5%;
  transition: bottom 0.5s ease-in-out;
  z-index: 2;
}

.title {
  position: relative;
  display: flex;

  /* margin-top: 5rem; */
  margin-bottom: 0;
  font-size: 18vw;
  color: var(--second);
  transform: translateY(0);
  animation: float 3.5s ease-in-out infinite;
  transition: opacity 0.75s ease-in, transform 0.5s ease-in-out;
}

.title::after {
  position: absolute;
  content: '.';
  top: v-bind('dotTopPosition');
  left: v-bind('dotLeftPosition');
  text-shadow: 0 0 0.15em var(--luminescence);
  animation: rainbow 5s ease-in-out infinite, float 3.7s ease-in-out infinite;
}

.content.switch {
  bottom: -50%;
}

.content.switch .title {
  opacity: 0;
}

.content.switch .title::after {
  opacity: 0;
}
</style>