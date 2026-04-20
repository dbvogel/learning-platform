import { createRouter, createWebHistory, type RouteRecordRaw } from  'vue-router'
import { useUserStore } from '@/stores/userStore'
import { getAuthRedirect } from './authGuard'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiredAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('@/views/MessagesView.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/downloads',
    name: 'Downloads',
    component: () => import('@/views/DownloadsView.vue'),
    meta: { requiredAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// **Navigation Guard** (Auth-Schutz)
router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()

  const redirect = getAuthRedirect(
    {
      name: to.name,
      fullPath: to.fullPath,
      meta: {
        requiredAuth: !!to.meta.requiredAuth,
      },
    },
    userStore.isAuthenticated,
  )

  if (redirect) {
    next(redirect)
    return
  }

  next()
})

export default router