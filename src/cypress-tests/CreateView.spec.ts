import CreateView from '../views/CreateView.vue';
import { mount } from '@cypress/vue'
import { createTestingPinia } from '@pinia/testing';
import router from '@/router';

describe('CreateView', () => {
  beforeEach(() => {
    mount(CreateView, {
      global: {
        plugins: [router]
      },
      plugins: [createTestingPinia({ createSpy: () => {} })]
    });
  });

  it('init view with headers', async () => {
    cy.get('h1').contains('This is an create view page');
    cy.get('h1').contains('Create');
  })

  describe('init view should have', () => {
    it('input with placeholder', async () => {
      cy.get('input').should('have.attr', 'placeholder', 'Add title');
    })

    it('select', async () => {
      cy.get('select').should('exist');
    })
  });

  describe('validation', () => {
    it('should display error when title has less than 10 characters', () => {
      cy.get('input').type('123');
      cy.get('input ~ p').should('be.visible').should('contain', 'title must be at least 10 characters');
    });
    it('should display error when select is reset', () => {
      cy.get('select').select('--Reset--');
      cy.get('select ~ p').should('be.visible').should('contain', 'type is a required field');
    });
    it('should display error for input and select, when user submit without fill form', () => {
      cy.get('button').click();
      cy.get('input ~ p').should('be.visible').should('contain', 'title must be at least 10 characters');
      cy.get('select ~ p').should('be.visible').should('contain', 'type is a required field');
    })
  });
  describe('on submit', () => {
    it('should display notification error, when request failed', () => {
      cy.get('input').type('12345678910');
      cy.get('select').select('junior');
      cy.get('button').click();
      cy.get('.ant-notification-notice-message').should('be.visible').should('contain', 'Error');
      cy.get('.ant-notification-notice-description').should('be.visible').should('contain', 'Request failed :(');
    });

    it('should display notification success, when request not failed', () => {
      const title = '12345678910';
      const select = 'junior';
      cy.intercept(
        {
          method: 'POST',
          url: '/questions',
        },
        {id: '1', title, type: select }
      ).as('getUsers');

      cy.get('input').type(title);
      cy.get('select').select(select);
      cy.get('button').click();
      cy.get('.ant-notification-notice-message').should('be.visible').should('contain', 'Success');
      cy.get('.ant-notification-notice-description').should('be.visible').should('contain', 'Created!');
    });
  });
})
