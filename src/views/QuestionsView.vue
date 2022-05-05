<script setup lang="ts">
import QuestionsList from '@/components/QuestionsList.vue';
import QuestionsFilters from '@/components/QuestionsFilters.vue';
import { useQuestions2 } from '@/composables/questions/useQuestions';
import {useQuestions} from "@/composables/useQuestions";
import {watch} from "vue";

const { questions, updateQuestions, urlSearchParams } = useQuestions();

watch(urlSearchParams, () => {
  const {getQuestions} = useQuestions2();
  const newQuestions = getQuestions(urlSearchParams);

  // todo: check watch
  watch(newQuestions, () => {

    updateQuestions(newQuestions.value);
  })
}, {immediate: true})
</script>

<template>
     <QuestionsFilters/>
     <QuestionsList :questions="questions"/>
</template>
