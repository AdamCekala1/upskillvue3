import { notification } from 'ant-design-vue';
import { useLoaderStore } from '@/stores/loader';
import {AfterFetchContext, createFetch, OnFetchErrorContext} from '@vueuse/core';

export const useMyFetch = createFetch({
  baseUrl: 'http://localhost:3001/',
  options: {
    beforeFetch({ options }) {
      const loader = useLoaderStore()
      loader.setLoader(true);
      return { options };
    },
    afterFetch(ctx: AfterFetchContext) {
      const loader = useLoaderStore()
      loader.setLoader(false);

      return ctx;
    },
    onFetchError(ctx: OnFetchErrorContext) {
      const loader = useLoaderStore()
      loader.setLoader(false);
      notification.error({
        message: `Error`,
        description: 'Request failed :(',
      })

      return ctx
    }
  },
  fetchOptions: {
    mode: 'cors',
  },
})
