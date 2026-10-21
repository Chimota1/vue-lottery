import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../../views/HomeView.vue'),
      meta: { layout: 'default', title: 'Головна' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../../views/AboutView.vue'),
      meta: { layout: 'default', title: 'Про автора' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../../views/LoginView.vue'),
      meta: { layout: 'auth', title: 'Вхід' },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../../views/UsersView.vue'),
      meta: { layout: 'default', requiresAuth: true, title: 'Учасники' },
    },
    {
      path: '/users/create',
      name: 'user-create',
      component: () => import('../../views/UserCreateView.vue'),
      meta: { layout: 'default', requiresAuth: true, title: 'Новий учасник' },
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: () => import('../../views/UserDetailsView.vue'),
      props: true,
      meta: { layout: 'default', requiresAuth: true, title: 'Деталі користувача' },
      children: [
        {
          path: 'edit',
          name: 'user-edit',
          component: () => import('../../views/UserEditView.vue'),
          props: true,
          meta: { layout: 'default', requiresAuth: true, title: 'Редагування користувача' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../../views/NotFoundView.vue'),
      meta: { layout: 'default', title: '404 Не знайдено' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

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
