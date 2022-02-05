<script setup lang="ts">
import { QuestionType } from '@/composables/useQuestions';

defineProps<{modelValue: QuestionType | null}>();
const emit = defineEmits<{(e: 'update:modelValue', params: QuestionType): void;}>()
</script>

<template>
    <select name="type" v-model="modelValue"  @input="emit('update:modelValue', $event.target.value)">
        <option value="">--Reset--</option>
        <option :value="QuestionType.JUNIOR">{{QuestionType.JUNIOR}}</option>
        <option :value="QuestionType.MIDDLE">{{QuestionType.MIDDLE}}</option>
        <option :value="QuestionType.SENIOR">{{QuestionType.SENIOR}}</option>
    </select>
</template>