import { QuestionType } from '@/composables/questions/questions.enum';

const mockUseField = vi.fn(() => ({
  value: 'qwerty',
  errorMessage: 'qwerty',
}))

import { mount, VueWrapper } from '@vue/test-utils'
import CreateForm from './CreateForm.vue'
import QuestionsTypeSelect from './QuestionsTypeSelect.vue'
import { describe, test, expect, beforeEach, vi, assert } from 'vitest'
import { DefinedComponent } from '@vue/test-utils/dist/types';

const mockHandleSubmit = vi.fn((fun: Function) => fun());
vi.mock('vee-validate', () => {
  return {
    useForm: vi.fn(() => ({
      handleSubmit: mockHandleSubmit,
    })),
    useField: mockUseField,
  }
})

describe('CreateView', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  })
  describe('title input', () => {
    test('should be rendered', () => {
      // arrange
      const wrapper = mount(CreateForm)
      // act
      const input = wrapper.find('input');
      // assert
      expect(input).toBeTruthy();
    });
    test('should have placeholder', () => {
      // arrange
      const wrapper = mount(CreateForm)
      // act
      const input = wrapper.find('input');
      // assert
      expect(input.element.placeholder).toEqual('Add title');
    });
    ['123', '', 'testValue'].forEach(testValue => {
      test('should have value from useField', () => {
        // arrange
        mockUseField.mockImplementationOnce(() => ({
          value: testValue
        } as any));
        const wrapper = mount(CreateForm)
        // act
        const input = wrapper.find('input');
        // assert
        expect(input.element.value).toEqual(testValue);
      });
    });

      ['error1', 'errorx', 'testerror'].forEach(errorMessage => {
      test('should have error from useField', () => {
        // arrange
        mockUseField.mockImplementationOnce(() => ({
          errorMessage
        } as any));
        const wrapper = mount(CreateForm)
        // act
        const errorArea = wrapper.find('errorMessage');
        // assert
        expect(errorArea).toBeTruthy();
      });
    })
  });
  describe('QuestionsTypeSelect', () => {
    test('should be rendered', () => {
      // arrange
      const wrapper = mount(CreateForm)
      // act
      const questionsTypeSelect = wrapper.findComponent<DefinedComponent>(QuestionsTypeSelect);
      // assert
      expect(questionsTypeSelect).toBeTruthy();
    });
  });

  describe('submit', () => {
    test('should be rendered', () => {
      // arrange
      const wrapper = mount(CreateForm)
      // act
      const submit = wrapper.find('button');
      // assert
      expect(submit).toBeTruthy();
    });

    describe('form should emit values', () => {
      beforeEach(() => {
        // arrange
        const titleValue = 'some title 12334344343';
        const typeValue = QuestionType.MIDDLE;
        mockUseField.mockImplementationOnce(() => ({
          value: titleValue
        } as any));
        mockUseField.mockImplementationOnce (() => ({
          value: typeValue
        } as any));
      })
      test('on form submit', async() => {
        // act
        const wrapper = mount(CreateForm);
        await  wrapper.find('form').trigger('submit');
        // assert
        expect(wrapper.emitted()).toHaveProperty('formSubmit')
      });

      test('on button click', async() => {
        // act
        const wrapper = mount(CreateForm);
        await wrapper.find('button').element.click();
        // assert
        console.log('wrapper.emitted()', wrapper.emitted());
        expect(wrapper.emitted()).toHaveProperty('formSubmit')
      });
    });
  });
})
