<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { Ref, watch } from 'vue';

import CreateForm from '@/components/CreateForm.vue';
import { useQuestions2 } from '@/composables/questions/useQuestions';
import { Question, SearchParams } from '@/composables/questions/questions.interface';

const router = useRouter();
const route = useRoute()
const {getQuestion, updateQuestion} = useQuestions2();
const question: Ref<Question> = getQuestion(route.params.id as string) as Ref<Question>;

const sendQuestion = (body: SearchParams) => {
  const data = updateQuestion({...question.value, ...body})
  watch(data, (value) => {
    if(value) {
      router.push({path: '/'});
    }
  })
}

</script>

<template>
  <div v-if="question && question.id">
    <h1>This is an edit view page: {{question}}</h1>
    <CreateForm title="Edit question" :question="question" @form-submit="sendQuestion"/>
  </div>
</template>

