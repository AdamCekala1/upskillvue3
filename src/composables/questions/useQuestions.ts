import { reactive, Ref, ref, watch } from 'vue'
import { useHttp } from '@/composables/useHttp';
import { Method } from 'axios';
import { Question, SearchParams } from '@/composables/questions/questions.interface';
import { notification } from 'ant-design-vue';

// const questions = ref<Question[]>([]);

export function useQuestions(method: Method, params?: any, body?: SearchParams, id?: string, textOnSuccess?: string, textOnFailed?: string) {
    const httpValue = useHttp(id ? 'questions' + '/' + id : 'questions', method, params, body);
    const questions: Ref<Question[] | Question> = httpValue.data;
    if(textOnSuccess) {
        const status: Ref<number> = httpValue.status;
        watch(status, (code) => {
            if(code === 200 || code === 201) {
                notification.success({
                    message: `Success`,
                    description: textOnSuccess,
                });
            }
        })
    }

    if(textOnFailed) {
        const error: Ref<number> = httpValue.error;
        watch(error, () => {
            notification.error({
                message: `Error`,
                description: textOnFailed,
            });
        })
    }
    return { questions, status: httpValue.status, error: httpValue.error }
    // const httpValue = useHttp('questions', method, params, body);
    // questions.value = httpValue.data;
    // return { questions, fetchQuestions } // add fun fetchQuestions, paramsy, put,
}
