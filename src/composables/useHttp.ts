import { ref, isRef, watch, Ref } from 'vue'
import axios from 'axios'
import { useLoaderStore } from '@/stores/loader';

export function useHttp(endpoint: string = 'questions', params?: Ref<any>) {
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

    console.log('isRef(params)', isRef(params));
    if(isRef(params)) {
        handleResponse(getData(null));
        watch(params, () => {
            console.log('watch!!!!!!!!!!!!! requeste!!!!!!!!', params.value);
            loader.setLoader(true);
            handleResponse(getData(params.value));
        }, { deep: true });
    } else {
        loader.setLoader(true);
        handleResponse(getData());
    }

  return { data, error }
}