import { notification } from 'ant-design-vue';
import { useLoaderStore } from '@/stores/loader';
import { createFetch } from '@vueuse/core';

export function useMyFetch() {
  const baseUrl = 'http://localhost:3001/';
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

  return {fetch: createFetch({
    baseUrl,
    options: {
      beforeFetch,
      afterFetch,
      onFetchError,
    },
    fetchOptions: {
      mode: 'cors',
    },
  })}
}

