import { mount, VueWrapper } from '@vue/test-utils'
import EditView from './EditView.vue'
import { describe, test, expect, beforeEach,  vi,  } from 'vitest'
import CreateForm from '@/components/CreateForm.vue';
import { DefinedComponent } from '@vue/test-utils/dist/types';
import { reactive, ref } from 'vue';
import { QuestionType } from '@/composables/questions/questions.enum';
import { Question } from '@/composables/questions/questions.interface';

const mockQuestionId = '123456';
const mockUpdateQuestion = vi.fn(() => ({}));
const mockQuestion = {
  id: mockQuestionId,
  title: 'some time',
  type: QuestionType.JUNIOR
};
const mockGetQuestion = vi.fn(() => (ref(mockQuestion)));

vi.mock('@/composables/questions/useQuestions', () => {
  return {
    useQuestions2: vi.fn(() => ({
      updateQuestion: mockUpdateQuestion,
      getQuestion: mockGetQuestion
    }))
  }
})


const mockPush = vi.fn(() => ({a: '123'}));
vi.mock('vue-router', () => {
  return {
    useRouter: vi.fn(() => ({push: mockPush})),
    useRoute: vi.fn(() => ({params: {id: mockQuestionId}})),
  }
})


describe('CreateView', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  })

  test('should render header', async () => {
    // arrange
    const wrapper = mount(EditView)
    // act
    const hasTitle = wrapper.text().includes('This is an edit view page:');
    // assert
    expect(hasTitle).toBeTruthy();
  });

  test('should get question with id from url', async  () => {
    // act
    mount(EditView)
    // assert
    expect(mockGetQuestion).toHaveBeenCalledWith(mockQuestionId);
  });

  test('should redirect to home screen when request return data', async  () => {
    // arrange
    const title = '123';
    const mockData = reactive({title: ''});
    mockUpdateQuestion.mockImplementationOnce(() => mockData);
    const wrapper = mount(EditView)
    const form = wrapper.findComponent<DefinedComponent>(CreateForm);

    // act
    form.vm.$emit('formSubmit', {title});
    mockData.title = title;
    await wrapper.vm.$nextTick();

    // assert
    expect(mockPush).toHaveBeenCalledWith({path: '/'});
  });

  test('should call updateQuestion with proper values', async  () => {
    // arrange
    const title = '123 nwe title :) ';
    const mockData = reactive({title: ''});
    mockUpdateQuestion.mockImplementationOnce(() => mockData);
    const wrapper = mount(EditView)
    const form = wrapper.findComponent<DefinedComponent>(CreateForm);

    // act
    form.vm.$emit('formSubmit', {title});
    mockData.title = title;
    await wrapper.vm.$nextTick();

    // assert
    expect(mockUpdateQuestion).toHaveBeenCalledWith({title, id: mockQuestion.id, type: mockQuestion.type});
  });

  describe('create form should have set props', () => {
    let form: VueWrapper<any>;

    beforeEach(() => {
      // arrange
      const wrapper = mount(EditView)
      form = wrapper.findComponent<DefinedComponent>(CreateForm);
    })

    test('title', async  () => {
      // act
      const hasTitle = form.vm.$props.title === 'Edit question';

      // assert
      expect(hasTitle).toBe(true);
    });

    describe('question', () => {
      let propsQuestion: Question;
      beforeEach(() => {
        // act
        propsQuestion = form.vm.$props.question;
      })
      test('id', async  () => {
        // assert
        expect(propsQuestion.id).toEqual(mockQuestion.id);
      });
      test('title', async  () => {
        // assert
        expect(propsQuestion.title).toEqual(mockQuestion.title);
      });
      test('type', async  () => {
        // assert
        expect(propsQuestion.type).toEqual(mockQuestion.type);
      });
    })
  })
})
