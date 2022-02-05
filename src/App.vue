<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheLoader from '@/components/TheLoader.vue'
</script>

<template>
  <TheHeader/>
  <TheLoader/>
  <router-view />
</template>

