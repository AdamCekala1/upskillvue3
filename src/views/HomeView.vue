<script setup lang="ts">
import QuestionsList from '@/components/QuestionsList.vue';
import Filters from '@/components/Filters.vue';

import { useQuestions, Question, SearchParams } from '@/services/questions';
import { ref, Ref } from 'vue';

const params: Ref<SearchParams> = ref<SearchParams>({title: '', type: null});
const updateParams = (newValue: Partial<SearchParams>) =>{
     params.value = newValue;
};

const httpValue = useQuestions(params);
const questions: Ref<Question[]> = httpValue.questions;
</script>

<template>
     <Filters @params-change="updateParams"/>
     <QuestionsList v-bind:questions="questions"/>
</template>
