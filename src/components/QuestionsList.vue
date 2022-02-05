<script setup lang="ts">
import { Question } from '@/composables/useQuestions';
import { defineProps } from 'vue';
defineProps<{
  questions: Question[],
}>()
</script>

<template>
    <div v-if="questions.length">
            <div v-for="question in questions" :key="question.id">
                {{question}}
            </div>
    </div>
    <h1 v-else>Oh no 😢</h1>
</template>
