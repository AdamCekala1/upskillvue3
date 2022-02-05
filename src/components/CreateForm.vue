<script setup lang="ts">
import { reactive } from 'vue';
import { SearchParams } from '@/composables/useQuestions';
import QuestionsTypeSelect from '@/components/QuestionsTypeSelect.vue';

const form = reactive({title: '', type: null} as SearchParams);
const emit = defineEmits<{(e: 'formSubmit', params: SearchParams): void;}>()
const submitform = () => {
    console.log('submitform', form)
    emit('formSubmit', form);
}
</script>

<template>
<h1>Create question</h1>
<br/>
<input placeholder="Add title" v-model="form.title"/>
<br/>
<QuestionsTypeSelect v-model="form.type"/>
<br/>
<button @click="submitform">Submit</button>
</template>