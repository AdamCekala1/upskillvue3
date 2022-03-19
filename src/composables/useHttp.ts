import { ref, isReactive, watch } from 'vue'
import axios from 'axios'
import {Method} from 'axios'
import { useLoaderStore } from '@/stores/loader';
import { SearchParams } from './questions/questions.interface';

export function useHttp(endpoint: string, method: Method, params?: any, body?: SearchParams) {
  const data = ref<any[]>([])
  const error = ref('')
  const status = ref<number>()
  const loader = useLoaderStore()
  const getData = (paramsValue?: SearchParams | null) => {
      return axios({
        method,
        url: 'http://localhost:3001/' + endpoint,
        params: paramsValue,
        data: body,
      });
  }
  const handleResponse = (promise: Promise<any>) =>  promise.then((response: any) => {
        console.log('get ' + endpoint + '  : ', response);
        status.value = response.status;
        data.value = response.data;
    })
    .catch((err: any) =>{
        console.log(err);
        status.value = err.status;
        error.value = err
    })
    .finally(() => {
        loader.setLoader(false);
    })

    if(params && isReactive(params)) {
        handleResponse(getData(null));
        watch(params, () => {
            console.log('request with params:',params);
            loader.setLoader(true);
            handleResponse(getData(params));
        });
    } else if(params) {
        loader.setLoader(true);
        handleResponse(getData(params));
    } else {
        loader.setLoader(true);
        handleResponse(getData());
    }

  return { data, error, status }
}
