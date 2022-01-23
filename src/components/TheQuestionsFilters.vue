<script setup lang="ts">
import { QuestionType, SearchParams } from '@/composables/useQuestions';
import { reactive, watch } from 'vue';

const emit = defineEmits<{(e: 'paramsChange', params: SearchParams): void;}>()

const filtersForm = reactive({title: '', type: null});


watch(filtersForm, () => {
    console.log('changed!', filtersForm);
    emit('paramsChange', filtersForm);
})

</script>

<template>
    title: {{filtersForm.title}}
    type: {{filtersForm.type}}

    <input placeholder="Basic usage" v-model="filtersForm.title"/>
    <select name="type" v-model="filtersForm.type">
        <option value="">--Reset--</option>
        <option :value="QuestionType.JUNIOR">{{QuestionType.JUNIOR}}</option>
        <option :value="QuestionType.MIDDLE">{{QuestionType.MIDDLE}}</option>
        <option :value="QuestionType.SENIOR">{{QuestionType.SENIOR}}</option>
    </select>
</template>
