import { Ref } from 'vue'
import { useHttp } from '@/composables/useHttp';

export enum QuestionType {
    JUNIOR = 'junior',
    MIDDLE = 'middle',
    SENIOR = 'senior'
}

export interface SearchParams {
    title: string,
    type: QuestionType | null,
}

export interface Question { 
    id: number,
    title: string,
    author: string,
}


export function useQuestions(params?: SearchParams) {
    const httpValue = useHttp('questions', params);
    const questions: Ref<Question[]> = httpValue.data;
    return { questions }
}
