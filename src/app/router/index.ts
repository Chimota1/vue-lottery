import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/entities/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home'),
      meta: { layout: 'default', title: 'Головна' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about'),
      meta: { layout: 'default', title: 'Про автора' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
      meta: { layout: 'auth', title: 'Вхід' },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/pages/users'),
      meta: { layout: 'default', requiresAuth: true, title: 'Учасники' },
    },
    {
      path: '/users/create',
      name: 'user-create',
      component: () => import('@/pages/user-create'),
      meta: { layout: 'default', requiresAuth: true, title: 'Новий учасник' },
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: () => import('@/pages/user-details'),
      props: true,
      meta: { layout: 'default', requiresAuth: true, title: 'Деталі користувача' },
      children: [
        {
          path: 'edit',
          name: 'user-edit',
          component: () => import('@/pages/user-edit'),
          props: true,
          meta: { layout: 'default', requiresAuth: true, title: 'Редагування користувача' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/not-found'),
      meta: { layout: 'default', title: '404 Не знайдено' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useSessionStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'users' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Vue Lottery App` : 'Vue Lottery App'
})

export default router
