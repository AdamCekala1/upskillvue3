<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import Loader from '@/components/Loader.vue'
</script>

<template>
  <TheHeader/>
  <Loader/>
  <router-view />
</template>

