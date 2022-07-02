import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Auth from '../views/Auth.vue'
import Board from '../views/Board.vue'
import Detail from '../views/Detail.vue'

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
      component: Detail,
      meta: {
        needAuth: true,
      },
      props: true,
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
  const { isAuthenticated, setAuthenticated } = useAuthStore()
  const token = localStorage.getItem('token')

  // jika ada token dan tidak menuju /login
  if (token && to.path !== '/login') {
    setAuthenticated()
    return next()
  }

  // jika ada token dan menuju /login, maka arahkan ke dashboard
  if (token && to.path === '/login') {
    setAuthenticated()
    return next('/')
  }

  // jika halaman membutuhkan autentikasi dan belum terautentikasi
  if (to.meta.needAuth && !isAuthenticated) {
    return next('/login')
  }

  return next()
})

export default router
