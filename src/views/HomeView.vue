<script setup lang="ts">
import TheQuestionsList from '@/components/TheQuestionsList.vue';
import TheQuestionsFilters from '@/components/TheQuestionsFilters.vue';

import { useQuestions, Question, SearchParams } from '@/composables/useQuestions';
import { ref, Ref } from 'vue';

const params: Ref<SearchParams> = ref<SearchParams>();
const updateParams = (newValue: Partial<SearchParams>) => {
     console.log('update params -> ', newValue);
     params.value = newValue;
};

const httpValue = useQuestions(params);
const questions: Ref<Question[]> = httpValue.questions;
</script>

<template>
     <TheQuestionsFilters @params-change="updateParams"/>
     <TheQuestionsList v-model:questions="questions"/>
</template>
