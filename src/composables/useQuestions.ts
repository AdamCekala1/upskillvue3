import {useUrlSearchParams} from "@vueuse/core";
import {Question, SearchParams} from "@/composables/questions/questions.interface";
import {ref} from "vue";

const urlSearchParams = useUrlSearchParams('history', {removeFalsyValues: true, removeNullishValues: true});
const questions = ref<Question[]>([]);

export function useQuestions() {
    const updateParams = (newValue: Partial<SearchParams>) => {
        urlSearchParams.title = newValue.title as string;
        urlSearchParams.type = newValue.type as string;
    };

    const updateQuestions = (_questions: Question[]) => questions.value = _questions

    return {
        questions,
        updateQuestions,
        urlSearchParams,
        updateParams,
    }
}