import { mount } from '@vue/test-utils'
import CreateView from './CreateView.vue'
import { describe, test, expect, assert, beforeEach,  vi,  } from 'vitest'
import { useQuestions2 } from '@/composables/questions/useQuestions';

const mockCreateQuestion = vi.fn(() => ({}));

vi.mock('@/composables/questions/useQuestions', () => {
  return {
    useQuestions2: vi.fn(() => ({
      createQuestion: mockCreateQuestion
    }))
  }
})

describe('CreateView', () => {
  test('should render header', () => {
    const wrapper = mount(CreateView)

    const header = wrapper.get('h1')

    expect(header.text()).toBe('This is an create view page')
  })
})
