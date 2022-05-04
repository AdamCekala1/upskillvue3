import { mount } from '@vue/test-utils'
import CreateView from './CreateView.vue'
import { describe, test, expect, assert, beforeEach,  vi,  } from 'vitest'
import CreateForm from '@/components/CreateForm.vue';
import { DefinedComponent } from '@vue/test-utils/dist/types';
import { reactive } from 'vue';

const mockCreateQuestion = vi.fn(() => ({}));

vi.mock('@/composables/questions/useQuestions', () => {
  return {
    useQuestions2: vi.fn(() => ({
      createQuestion: mockCreateQuestion
    }))
  }
})


const mockPush = vi.fn(() => ({a: '123'}));
vi.mock('vue-router', () => {
  return {
    useRouter: vi.fn(() => ({push: mockPush}))
  }
})


describe('CreateView', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  })

  test('should render header', () => {
    // arrange
    const wrapper = mount(CreateView)
    // act
    const header = wrapper.get('h1')
    // assert
    expect(header.text()).toBe('This is an create view page')
  });

  test('should redirect to home screen when request return data', async  () => {
    // arrange
    const title = '123';
    const mockData = reactive({title: ''});
    mockCreateQuestion.mockImplementationOnce(() => mockData);
    const wrapper = mount(CreateView)
    const form = wrapper.findComponent<DefinedComponent>(CreateForm);

    // act
    form.vm.$emit('formSubmit', {title});
    mockData.title = title;
    await wrapper.vm.$nextTick();

    // assert
    expect(mockPush).toHaveBeenCalledWith({path: '/'});
  });
})
