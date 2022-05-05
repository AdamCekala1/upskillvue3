<script setup lang="ts">
import { reactive, watch } from 'vue';
import QuestionsTypeSelect from '@/components/QuestionsTypeSelect.vue';
import {useQuestions} from "@/composables/useQuestions";

const { urlSearchParams, updateParams } = useQuestions();

const filtersForm = reactive(urlSearchParams);

watch(filtersForm, () => {
  updateParams(filtersForm);
})

</script>

<template>
    title: {{urlSearchParams.title}}
    type: {{urlSearchParams.type}}
    <br/>

    <input placeholder="Search title" v-model="filtersForm.title"/>
    <QuestionsTypeSelect v-model="filtersForm.type"/>
</template>
