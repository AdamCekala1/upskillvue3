<script setup lang="ts">
import QuestionsList from '@/components/QuestionsList.vue';
import QuestionsFilters from '@/components/QuestionsFilters.vue';
import { useQuestions } from '@/composables/questions/useQuestions';
import { Question, SearchParams } from '@/composables/questions/questions.interface';
import { reactive, Ref } from 'vue';

const params = reactive<SearchParams>({title: '', type: null});
const updateParams = (newValue: Partial<SearchParams>) => {
     params.title = newValue.title;
     params.type = newValue.type;
};

const httpValue = useQuestions('get', params);
const questions: Ref<Question[]> = httpValue.questions;
</script>

<template>
     <QuestionsFilters @params-change="updateParams"/>
     <QuestionsList :questions="questions"/>
</template>
