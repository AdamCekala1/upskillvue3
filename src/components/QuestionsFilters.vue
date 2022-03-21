<script setup lang="ts">
import { SearchParams } from '@/composables/questions/questions.interface';
import { reactive, watch, defineProps, toRefs } from 'vue';
import QuestionsTypeSelect from '@/components/QuestionsTypeSelect.vue';

const emit = defineEmits<{(e: 'paramsChange', params: SearchParams): void;}>()

const props = withDefaults(defineProps<{title: string, type: any}>(), {title: '', type: null});
const filtersForm = reactive({title: props.title, type: props.type} as SearchParams);

watch(filtersForm, () => {
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
