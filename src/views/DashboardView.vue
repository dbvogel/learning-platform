<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { User, MessageSquare, Download, LogOut, Activity } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}

const menuItems = computed(() => [
  {
    title: t('dashboard.myProfile'),
    description: t('dashboard.viewManageAccount'),
    icon: User,
    route: '/profile',
    color: 'from-blue-400 to-blue-600',
  },
  {
    title: t('dashboard.messages'),
    description: t('dashboard.checkInbox'),
    icon: MessageSquare,
    route: '/messages',
    color: 'from-purple-400 to-purple-600',
  },
  {
    title: t('dashboard.downloads'),
    description: t('dashboard.accessYourFiles'),
    icon: Download,
    route: '/downloads',
    color: 'from-orange-400 to-orange-600',
  },
  {
    title: t('dashboard.workflows'),
    description: t('dashboard.monitorProcesses'),
    icon: Activity,
    route: '/workflows',
    color: 'from-cyan-500 to-slate-700',
  },
])

const navigate = (route: string) => {
  router.push(route)
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-6 sm:mb-10 lg:mb-12">
        <h1 class="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">{{ t('dashboard.welcomeBack', { name: userStore.currentUser?.name || '' }) }}</h1>
        <p class="text-sm text-slate-600 sm:text-base">{{ t('dashboard.hereYourDashboard') }}</p>
      </div>

      <!-- Menu Tiles Grid -->
      <div class="mb-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-4 md:mb-8">
        <div
          v-for="item in menuItems"
          :key="item.title"
          @click="navigate(item.route)"
          class="transform cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        >
          <Card class="h-full hover:shadow-xl">
            <CardContent class="flex h-full items-center justify-between gap-3 p-4 sm:p-6 lg:p-8">
              <div class="min-w-0 flex-1">
                <h3 class="mb-1 text-lg font-semibold text-slate-900 sm:text-xl">{{ item.title }}</h3>
                <p class="text-sm text-slate-600">{{ item.description }}</p>
              </div>
              <div :class="`bg-linear-to-br ${item.color} ml-2 shrink-0 rounded-lg p-3 sm:ml-4 sm:p-4`">
                <component :is="item.icon" class="h-6 w-6 text-white sm:h-8 sm:w-8" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Logout Card -->
      <Card class="border-red-200">
        <CardContent class="p-4 sm:p-6">
          <div class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 class="text-lg font-semibold text-slate-900">{{ t('common.signOut') }}</h3>
              <p class="text-slate-600 text-sm">{{ t('common.endSession') }}</p>
            </div>
            <Button @click="handleLogout" variant="destructive" class="flex items-center gap-2">
              <LogOut class="w-4 h-4" />
              {{ t('common.logout') }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>