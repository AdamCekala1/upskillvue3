import { createRouter, createWebHistory } from 'vue-router'
import QuestionsView from '../views/QuestionsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: QuestionsView
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreateView.vue')
  },
  {
    path: '/:id/edit',
    name: 'edit',
    component: () => import('../views/EditView.vue'),
  }
];

export const config = {
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
}

const router = createRouter(config)

export default router
