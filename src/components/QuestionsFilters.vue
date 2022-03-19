<script setup lang="ts">
import { SearchParams } from '@/composables/questions/questions.interface';
import { reactive, watch } from 'vue';
import QuestionsTypeSelect from '@/components/QuestionsTypeSelect.vue';

const emit = defineEmits<{(e: 'paramsChange', params: SearchParams): void;}>()

const filtersForm = reactive({title: '', type: null} as SearchParams);


watch(filtersForm, () => {
    console.log('changed!', filtersForm);
    emit('paramsChange', filtersForm);
})

</script>

<template>
    title: {{filtersForm.title}}
    type: {{filtersForm.type}}
    <br/>

    <input placeholder="Search title" v-model="filtersForm.title"/>
    <QuestionsTypeSelect v-model="filtersForm.type"/>
</template>
