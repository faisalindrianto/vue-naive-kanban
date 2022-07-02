import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Auth from '../views/Auth.vue'
import Board from '../views/Board.vue'
import TaskDetail from '../views/TaskDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'board',
      component: Board,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: TaskDetail,
      meta: {
        needAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Auth,
      meta: {
        needAuth: false,
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated } = useAuthStore()

  if (to.meta.needAuth && !isAuthenticated) {
    return next('/login')
  }

  return next()
})

export default router
