<script setup lang="ts">
import { QuestionType } from '@/services/questions';
import { ref, watch } from 'vue';

const emit = defineEmits(['paramsChange'])

const title = ref('');
const type = ref(null);

watch([title, type], () => {
    console.log('changed!');
    emit('paramsChange', {title: title.value, type: type.value});
})

</script>

<template>
    title: {{title}}
    type: {{type}}

    <input placeholder="Basic usage" v-model="title"/>
    <select name="type" v-model="type">
        <option value="">--Reset--</option>
        <option :value="QuestionType.JUNIOR">{{QuestionType.JUNIOR}}</option>
        <option :value="QuestionType.MIDDLE">{{QuestionType.MIDDLE}}</option>
        <option :value="QuestionType.SENIOR">{{QuestionType.SENIOR}}</option>
    </select>
</template>