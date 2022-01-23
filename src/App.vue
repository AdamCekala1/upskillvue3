<script setup lang="ts">
import Header from '@/components/Header.vue'
import Loader from '@/components/Loader.vue'
</script>

<template>
  <Header/>
  <Loader/>
  <router-view />
</template>

