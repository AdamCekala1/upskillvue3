<script setup lang="ts">
import CreateForm from '@/components/CreateForm.vue';
import { useQuestions } from '@/composables/questions/useQuestions';
import { SearchParams } from '@/composables/questions/questions.interface';
import { ref, Ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let someT = ref('title');
const sendQuestion = (body: SearchParams) => {
  const {status} = useQuestions('post', null, body, null,       'Question created!', ':(((((');
  watch(status, (code) => {
    if(code === 201) {
      router.push({path: '/'});
    }
  })
}
</script>

<template>
  <h1>This is an create view page</h1>
  <h1 @click="someT = someT + '1'">xxxxx</h1>
  <CreateForm :title="someT" @form-submit="sendQuestion"/>
</template>

