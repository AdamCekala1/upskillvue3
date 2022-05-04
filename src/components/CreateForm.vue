<script setup lang="ts">
import * as yup from 'yup';
import { onBeforeMount, toRefs, watch } from 'vue';
import { useForm, useField } from 'vee-validate';

import { SearchParams } from '@/composables/questions/questions.interface';
import QuestionsTypeSelect from '@/components/QuestionsTypeSelect.vue';

const props = withDefaults(defineProps<{title: string, question: SearchParams}>(), {title: 'Create question'})
const { title } = toRefs(props);
const emit = defineEmits<{(e: 'formSubmit', params: SearchParams): void;}>();

watch(title, () => {
  console.log('changed');
})

const { handleSubmit } = useForm<SearchParams>({
  validationSchema: yup.object().shape({
    title: yup
        .string()
        .required().min(10),
    type: yup
        .string()
        .nullable()
        .required(),
  })
});
const {
  value: titleValue,
  errorMessage: titleErrorMessage,
  handleChange: titleHandleChange,
  handleBlur: titleHandleBlur,
  setValue: titleSetValue,
} = useField('title', null, {
  initialValue: ''
})
const {
  value: typeValue,
  errorMessage: typeErrorMessage,
  handleChange: typeHandleChange,
  handleBlur: typeHandleBlur,
  setValue: typeSetValue,
} = useField('type', null, {
  initialValue: null
})

const onSubmit = handleSubmit((values) => {
  console.log('values', values);
  emit('formSubmit', values);
})

onBeforeMount(() => {
  if(props.question) {
    typeSetValue(props.question.type);
    titleSetValue(props.question.title);
  }
});

</script>

<template>
  <h1>{{title}}</h1>
  <form @submit="onSubmit">
    <input
        placeholder="Add title"
        :value="titleValue"
        @blur="titleHandleBlur"
        @input="titleHandleChange"/>
    <br/>
    <p>{{titleErrorMessage}}</p>
    <br/>
    <QuestionsTypeSelect name="type" @blur="typeHandleBlur" v-model="typeValue"/>
    <br/>
    <p>{{typeErrorMessage}}</p>
    <br/>
    <button type="submit" >Submit</button>
  </form>
</template>
