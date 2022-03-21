import { reactive, Ref, ref, watch } from 'vue'
import { Method } from 'axios';
import { Question, SearchParams } from '@/composables/questions/questions.interface';
import { notification } from 'ant-design-vue';

// const questions = ref<Question[]>([]);
import { useFetch  } from '@vueuse/core'
import { useLoaderStore } from '@/stores/loader';

export function useQuestions2() {
    const urlPrefix = 'http://localhost:3001/questions';
    const loader = useLoaderStore()
    const beforeFetch = ({ options }: any) => {
        loader.setLoader(true);
        return options;
    }
    const afterFetch = (ctx: any) => {
        loader.setLoader(false);
        return ctx;
    };
    const onFetchError = (ctx: any) => {
        loader.setLoader(false);
        notification.error({
            message: `Error`,
            description: 'Request failed :(',
        })

        return ctx
    };

    return {
        createQuestion: (params: any) => {
            const { data } = useFetch(urlPrefix, {
                beforeFetch,
                afterFetch,
                onFetchError,
            }).post(params).json();

            return data;
        },
        getQuestion: (id: string) => {
            const { data } = useFetch(urlPrefix + '/' + id, {
                beforeFetch,
                afterFetch,
                onFetchError,
            }).get().json();

            return data;
        },
        updateQuestion: (params: any) => {
            const { data } = useFetch(urlPrefix + '/' +params.id, {
                beforeFetch,
                afterFetch,
                onFetchError,
            }).patch(params).json();

            return data;
        },
        getQuestions: (params?: any) => {
            const url = new URL(urlPrefix);

            if (params) {
                const filteredParams: any = {};
                Object.keys(params).forEach((key) => {
                    if (params[key]) {
                        filteredParams[key + '_like'] = params[key];
                    }
                });
                const searchParams = new URLSearchParams(filteredParams).toString();
                url.search = searchParams;
            }

            const { data } = useFetch(url.toString(), {
                beforeFetch,
                afterFetch,
                onFetchError,
            }).get().json();

            return data;
        },
    }
}

