import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'
import defaultLayout from '@/layouts/default.vue'
import NotFound from '@/views/404.vue'
import routes from './routes'
import { loadingBar } from '@/utils/createDiscreteApi'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: defaultLayout,
      children: routes,
      redirect: '/index',
      meta: {
        title: '后台管理',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: NotFound,
      meta: {
        title: '页面不存在',
        requiresAuth: false,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  loadingBar.start()
  next()
})

router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    loadingBar.error()
    return
  }
  const title = to.meta.title
    ? to.meta.title + ' - 后台管理模板'
    : '后台管理模板'
  document.title = title
  loadingBar.finish()
})

export default router
