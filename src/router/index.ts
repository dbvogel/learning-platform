import { createRouter, createWebHistory, type RouteRecordRaw } from  'vue-router'
import { useUserStore } from '@/stores/userStore'

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

  if (to.meta.requiredAuth && !userStore.isAuthenticated) {
    next({ name: 'Home', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router