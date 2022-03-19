import { QuestionType } from '@/composables/questions/questions.enum';

export interface SearchParams {
    title: string,
    type: QuestionType | null,
}

export interface Question { 
    id: string | number,
    title: string,
    type: QuestionType | null,
}
