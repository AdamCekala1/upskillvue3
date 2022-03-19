<script setup lang="ts">
import { Question } from '@/composables/questions/questions.interface';
import { defineProps, ref } from 'vue';
import { useRouter, isNavigationFailure } from 'vue-router'

defineProps<{
  questions: Question[],
}>()
const router = useRouter();
const loadQuestionError = ref('');
const openEditView = async(question: Question) => {
  const navigationStatus = await router.push({path: `/${question.id}/edit`});

  if (isNavigationFailure(navigationStatus)) {
    // show a small notification to the user
    loadQuestionError.value = `can not load: ${question.id}`;
  } else {
    loadQuestionError.value = '';
  }
}

</script>

<template>
    <h1>{{loadQuestionError}}</h1>
    <div v-if="questions.length">
        <div>fake record</div><button @click="openEditView({id: 'fake'})">Edit</button>
        <div v-for="question in questions" :key="question.id">
            <div>{{question}}</div><button @click="openEditView(question)">Edit</button>
        </div>
    </div>
    <h1 v-else>Oh no 😢</h1>
</template>
