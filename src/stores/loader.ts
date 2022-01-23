import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    setLoader(value: boolean) {
      this.isLoading = value;
    }
  }
})
