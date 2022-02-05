import { createRouter, createWebHistory } from 'vue-router'
import QuestionsView from '../views/QuestionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: QuestionsView
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    }
  ]
})

export default router
