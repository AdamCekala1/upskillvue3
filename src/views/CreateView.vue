<script setup lang="ts">
import CreateForm from '@/components/CreateForm.vue';
import { useQuestions2 } from '@/composables/questions/useQuestions';
import { SearchParams } from '@/composables/questions/questions.interface';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const sendQuestion = (body: SearchParams) => {
  const {createQuestion} = useQuestions2();
  const data = createQuestion(body);

  watch(data, (value) => {
    if(value) {
      router.push({path: '/'});
    }
  })
}
</script>

<template>
  <h1>This is an create view page</h1>
  <CreateForm @form-submit="sendQuestion"/>
</template>

