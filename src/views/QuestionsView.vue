<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useUrlSearchParams  } from '@vueuse/core'

import QuestionsList from '@/components/QuestionsList.vue';
import QuestionsFilters from '@/components/QuestionsFilters.vue';
import { useQuestions2 } from '@/composables/questions/useQuestions';
import { SearchParams } from '@/composables/questions/questions.interface';

const urlSearchParams = useUrlSearchParams('history', {removeFalsyValues: true, removeNullishValues: true});
let questions = reactive({value: {}});

const updateParams = (newValue: Partial<SearchParams>) => {
  urlSearchParams.title = newValue.title;
  urlSearchParams.type = newValue.type;
};

watch(urlSearchParams, () => {
  const {getQuestions} = useQuestions2();
  const newQuestions = getQuestions(urlSearchParams);

  watch(newQuestions, () => {
    questions.value = newQuestions;
  });
}, {immediate: true})
</script>

<template>
     <QuestionsFilters :title="urlSearchParams.title" :type="urlSearchParams.type" @params-change="updateParams"/>
     <QuestionsList :questions="questions.value"/>
</template>
