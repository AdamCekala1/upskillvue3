import { notification } from 'ant-design-vue';
import { useMyFetch } from '@/composables/useMyFetch';
import { Question } from '@/composables/questions/questions.interface';
import { Ref } from 'vue';

export interface UseQuestionsI {
    createQuestion: (params: any) => Ref<Question>,
    getQuestion: (id: string) => Ref<Question>,
    updateQuestion: (id: string) => Ref<Question>,
    getQuestions: (params: any) => Ref<Question[]>,
}

export function useQuestions2(): UseQuestionsI {
    const urlPrefix = 'questions';
    const {fetch} = useMyFetch();
    const afterFetch = (ctx: any, description: string) => {
        notification.success({
            message: `Success`,
            description,
        })

        return ctx;
    }

    return {
        createQuestion: (params: any) => {
            const { data } = fetch(
              urlPrefix,
              {afterFetch: (ctx) => afterFetch(ctx, 'Created!')}
            ).post(params).json();

            return data;
        },
        getQuestion: (id: string) => {
            const { data } = fetch(urlPrefix + '/' + id).get().json();

            return data;
        },
        updateQuestion: (params: any) => {
            const { data } = fetch(
              urlPrefix + '/' +params.id,
              {afterFetch: (ctx) => afterFetch(ctx, 'Updated!')}
            ).patch(params).json();

            return data;
        },
        getQuestions: (params?: any) => {
            let searchParams = '';

            if (params) {
                const filteredParams: any = {};
                Object.keys(params).forEach((key) => {
                    if (params[key]) {
                        filteredParams[key + '_like'] = params[key];
                    }
                });
                searchParams = `?${new URLSearchParams(filteredParams).toString()}`;
            }

            const { data } = fetch(`${urlPrefix}${searchParams}`).get().json();

            return data;
        },
    }
}

