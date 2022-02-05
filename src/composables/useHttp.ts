import { ref, isReactive, watch, reactive } from 'vue'
import axios from 'axios'
import { useLoaderStore } from '@/stores/loader';
import { SearchParams } from './useQuestions';

export function useHttp(endpoint: string = 'questions', params?: SearchParams) {
  const data = ref<any[]>([])
  const error = ref(null)
  const loader = useLoaderStore()
  const getData = (paramsValue?: any) => axios.get('http://localhost:3001/' + endpoint, {params: paramsValue})
  const handleResponse = (promise: Promise<any>) =>  promise.then((response: any) => {
        console.log('get ' + endpoint + '  : ', response);
        data.value = response.data;
    })
    .catch((err: any) =>{
        console.log(err);
        error.value = err
    })
    .finally(() => {
        loader.setLoader(false);
    })

    if(params && isReactive(params)) {
        handleResponse(getData(null));
        watch(params, () => {
            console.log('request with params:', params);
            loader.setLoader(true);
            handleResponse(getData(params));
        });
    } else {
        loader.setLoader(true);
        handleResponse(getData());
    }

  return { data, error }
}