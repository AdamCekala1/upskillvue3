<script setup lang="ts">
    import { useLoaderStore } from '@/stores/loader';
    import { computed } from 'vue';

    const loader= useLoaderStore();
    const isloading = computed(() => loader.isLoading);
</script>

<template>
<div class="loader" v-if="isloading">
    loading ... 
</div>
</template>

<style>
.loader {
    position: fixed;
    background: red;
    width: 100vw;
    height: 100vh;
    opacity: 0.1;
    top: 0;
    left: 0;
}
</style>