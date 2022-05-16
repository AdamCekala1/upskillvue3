<script setup lang="ts">
import QuestionsList from '@/components/QuestionsList.vue';
import QuestionsFilters from '@/components/QuestionsFilters.vue';
import {useQuestions} from "@/composables/useQuestions";
import {computed} from "vue";
import {useMyFetch} from "@/composables/useMyFetch";

const { urlSearchParams } = useQuestions();

const url = computed(() => {
  let searchParams = '';

  const filteredParams: any = {};
  Object.keys(urlSearchParams).forEach((key) => {
    if (urlSearchParams[key]) {
      filteredParams[key + '_like'] = urlSearchParams[key];
    }
  });
  searchParams = `?${new URLSearchParams(filteredParams).toString()}`;

  return `questions${searchParams}`;
});

const { data: questions } = useMyFetch(url, { refetch: true }).get().json();
</script>

<template>
     <QuestionsFilters/>
     <QuestionsList :questions="questions"/>
</template>
