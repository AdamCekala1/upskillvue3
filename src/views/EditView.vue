<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { Ref, watch } from 'vue';
import { notification } from 'ant-design-vue';

import CreateForm from '@/components/CreateForm.vue';
import { useQuestions } from '@/composables/questions/useQuestions';
import { Question, SearchParams } from '@/composables/questions/questions.interface';

const router = useRouter();
const route = useRoute()
const httpValue = useQuestions('get', null, null as any, route.params.id as string);
const question: Ref<Question> = httpValue.questions as Ref<Question>;
const error: Ref<string> = httpValue.error;

const sendQuestion = (body: SearchParams) => {
  const httpValue = useQuestions(
      'put',
      null,
      {...question.value, ...body},
      question.value?.id as string,
      'Question updated!',
      ':('
  );
  const status: Ref<number> = httpValue.status;
  watch(status, (code) => {
    if(code === 200) {
      router.push({path: '/'});
    }
  })
}

</script>

<template>
  <h1 v-if="error">{{error}}</h1>
  <div v-else-if="question.id">
    <h1>This is an edit view page: {{question}}</h1>
    <CreateForm title="Edit question" :question="question" @form-submit="sendQuestion"/>
  </div>
</template>

