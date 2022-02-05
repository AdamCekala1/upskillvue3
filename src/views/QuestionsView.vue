<script setup lang="ts">
import QuestionsList from '@/components/QuestionsList.vue';
import QuestionsFilters from '@/components/QuestionsFilters.vue';

import { useQuestions, Question, SearchParams } from '@/composables/useQuestions';
import { reactive, Ref, watch } from 'vue';

const params = reactive<SearchParams>({title: '', type: null});
const updateParams = (newValue: Partial<SearchParams>) => {
     params.title = newValue.title;
};

const httpValue = useQuestions(params);
const questions: Ref<Question[]> = httpValue.questions;
</script>

<template>
     <QuestionsFilters @params-change="updateParams"/>
     <QuestionsList :questions="questions"/>
</template>
