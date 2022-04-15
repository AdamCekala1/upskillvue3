import { useQuestions2 } from '@/composables/questions/useQuestions';
import { QuestionType } from '@/composables/questions/questions.enum';
import { notification } from 'ant-design-vue';
import { expect } from 'vitest';

// setup mocks
// mock ant-design-vue
vi.mock('ant-design-vue', () => {
  return  {
    notification: {success: vi.fn(() => undefined)}
  }
})



// mock useMyFetch
const mockQuestion = {
  id: 'some id',
  title: 'some title',
  type: QuestionType.MIDDLE,
}

const mockQuestionJson = vi.fn(() => ({
  data: mockQuestion
}))
const mockQuestionsJson = vi.fn(() => ({
  data: [mockQuestion]
}))
const mockPost = vi.fn(() => ({
  json: mockQuestionJson
}))
const mockGet = vi.fn(() => ({
  json: mockQuestionJson
}))
const mockPatch = vi.fn(() => ({
  json: mockQuestionJson
}))

const mockFetch = vi.fn(((_prefix, options) => {
  return {
    post: mockPost,
    get: mockPost,
    patch: mockPatch,
  }
}))

vi.mock('@/composables/useMyFetch', () => {
  return {
    useMyFetch: vi.fn(() => ({
      fetch: mockFetch
    }))
  }
})
// end setup mocks


describe('useQuestions2', () => {
  let composable: any;

  beforeEach(() => {
    vi.restoreAllMocks();
  })

  beforeEach(() => {
    composable = useQuestions2();
  })

  it('should exists', () => {
    expect(useQuestions2).toBeTruthy();
  });

  describe('createQuestion', () => {
    it('should return question when request is success', () => {
      // act
      const result = composable.createQuestion(null);
      // assert
      expect(result).toEqual(mockQuestion);
    });
    it('should call notification success', () => {
      // arrange
      const successSpy = vi.spyOn(notification, 'success');
      mockFetch.mockImplementationOnce((_prefix, options) => {
        options.afterFetch();

        return {
          post: mockPost,
          get: mockPost,
          patch: mockPatch,
        }
      });

      // act
      composable.createQuestion(null)

      // assert
      expect(successSpy).toHaveBeenCalledWith({
        description: 'Created!',
        message: 'Success'
      });
    });
    it('should call fetch with prefix "questions"', () => {
      // arrange
      let usedPrefix;
      mockFetch.mockImplementationOnce((prefix, _options) => {
        usedPrefix = prefix;
        return {
          post: mockPost,
          get: mockPost,
          patch: mockPatch,
        }
      });

      // act
      composable.createQuestion(null)

      // assert
      expect(usedPrefix).toEqual('questions');
    });
  });
  describe('updateQuestion', () => {
    it('should return question when request is success', () => {
      // act
      const result = composable.updateQuestion({id: '123'});

      // assert
      expect(result).toEqual(mockQuestion);
    });
    it('should call notification success', () => {
      // arrange
      const successSpy = vi.spyOn(notification, 'success');
      // @ts-ignore
      mockFetch.mockImplementationOnce((_prefix, options) => {
        options.afterFetch();

        return {
          patch: mockPatch,
        }
      });

      // act
      composable.updateQuestion({id: '123'})

      // assert
      expect(successSpy).toHaveBeenCalledWith({
        description: 'Updated!',
        message: 'Success'
      });
    });
    it('should call fetch with prefix "questions" and id', () => {
      // arrange
      let usedPrefix;
      // @ts-ignore
      mockFetch.mockImplementationOnce((prefix, _options) => {
        usedPrefix = prefix;
        return {
          patch: mockPatch,
        }
      });

      // act
      composable.updateQuestion({id: '123'})

      // assert
      expect(usedPrefix).toEqual('questions/123');
    });
  });

  describe('getQuestion', () => {
    it('should return question when request is success', () => {
      // act
      const result = composable.getQuestion('123');

      // assert
      expect(result).toEqual(mockQuestion);
    });
    it('should call fetch with prefix "questions" and id', () => {
      // arrange
      let usedPrefix;
      // @ts-ignore
      mockFetch.mockImplementationOnce((prefix, _options) => {
        usedPrefix = prefix;
        return {
          get: mockGet,
        }
      });

      // act
      composable.getQuestion('123');

      // assert
      expect(usedPrefix).toEqual('questions/123');
    });
  });

  describe('getQuestions', () => {
    it('should return question when request is success', () => {
      // act
      const result = composable.getQuestions();

      // assert
      expect(result).toEqual(mockQuestion);
    });
    [
      {prefix: 'questions', params: null},
      {prefix: 'questions?title_like=123', params: {title: '123'}},
      {prefix: 'questions?type_like=123', params: {type: '123'}},
      {prefix: 'questions?title_like=sometitle&type_like=123', params: {title: 'sometitle', type: '123'}},
    ].forEach(testCase => {
      it('should call fetch with prefix ' + testCase.prefix, () => {
        // arrange
        let usedPrefix;
        // @ts-ignore
        mockFetch.mockImplementationOnce((prefix, _options) => {
          usedPrefix = prefix;
          return {
            get: mockGet,
          }
        });

        // act
        composable.getQuestions(testCase.params);

        // assert
        expect(usedPrefix).toEqual(testCase.prefix);
      });
    })
  });
});
