import { notification } from 'ant-design-vue';
import { useMyFetch } from '@/composables/useMyFetch';
import { describe, expect, spyOn } from 'vitest';

// setup mocks
// mock ant-design-vue
vi.mock('ant-design-vue', () => {
  return  {
    notification: {error: vi.fn(() => undefined)}
  }
})

// mock loader
const spySetLoader = vi.fn((_isLoading) => undefined);
vi.mock('@/stores/loader', () => {
  return ({
    useLoaderStore: vi.fn(() => ({ setLoader: spySetLoader }))
  })
})

// mock vueUse
const mockCreateReturn = vi.fn((_config) => undefined);
vi.mock('@vueuse/core', () => {
  return {
    createFetch: vi.fn((config) => {
      return () => mockCreateReturn(config);
    })
  }
})
// end setup mocks


describe('useQuestions2', () => {
  let composable: any;

  beforeEach(() => {
    vi.restoreAllMocks();
  })

  beforeEach(() => {
    composable = useMyFetch();
  })

  it('should exists', () => {
    expect(composable).toBeTruthy();
  });

  describe('fetch', () => {
    it('should exists', () => {
      expect(composable.fetch).toBeTruthy();
    });

    let calledConfig;
    beforeEach(() => {
      // @ts-ignore
      mockCreateReturn.mockImplementationOnce((config) => {
        calledConfig = config;
        return null;
      });
    })

    it('should be called with server prefix', () => {
      // act
      composable.fetch()
      // assert
      // @ts-ignore
      expect(calledConfig.baseUrl).toEqual('http://localhost:3001/');
    })

    describe('beforeFetch', () => {
      it('should set loader as true', () => {
        // act
        composable.fetch()
        calledConfig.options.beforeFetch({options: null});
        // arrange
        expect(spySetLoader).toHaveBeenCalledWith(true);
      });
    })

    describe('afterFetch', () => {
      it('should set loader as false', () => {
        // act
        composable.fetch()
        calledConfig.options.afterFetch();
        // arrange
        expect(spySetLoader).toHaveBeenCalledWith(false);
      });
    })

    describe('onFetchError', () => {

      it('should set loader as false', () => {
        // act
        composable.fetch()
        calledConfig.options.onFetchError();
        // arrange
        expect(spySetLoader).toHaveBeenCalledWith(false);
      });

      it('should call notification', () => {
        // arrange
        const errorSpy = vi.spyOn(notification, 'error');
        // act
        composable.fetch()
        calledConfig.options.onFetchError();
        // arrange
        expect(errorSpy).toHaveBeenCalledWith({
          message: `Error`,
          description: 'Request failed :(',
        });
      });
    });
  });
});
