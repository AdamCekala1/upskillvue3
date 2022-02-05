<script setup lang="ts">
import CreateForm from '@/components/CreateForm.vue';
import { useQuestions, Question, SearchParams } from '@/composables/useQuestions';

const sendQuestion = (body: SearchParams) => {
  console.log('x sendQuestion x', body);
  const httpValue = useQuestions('post', null, body);
  console.log('httpValue', httpValue);
}
</script>

<template>
  <h1>This is an create view page</h1>
  <CreateForm @form-submit="sendQuestion"/>
</template>

