<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  })
})
</script>

<template>
  <router-view></router-view>
</template>

<style>
/* Global styles if needed, mostly already in style.css */
</style>
