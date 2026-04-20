<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { User, MessageSquare, Download, LogOut } from 'lucide-vue-next'
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
])

const navigate = (route: string) => {
  router.push(route)
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">{{ t('dashboard.welcomeBack', { name: userStore.currentUser?.name || '' }) }}</h1>
        <p class="text-slate-600">{{ t('dashboard.hereYourDashboard') }}</p>
      </div>

      <!-- Menu Tiles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          v-for="item in menuItems"
          :key="item.title"
          @click="navigate(item.route)"
          class="cursor-pointer transition-all duration-300 transform hover:scale-105"
        >
          <Card class="h-full hover:shadow-xl">
            <CardContent class="p-8 flex items-center justify-between h-full">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-slate-900 mb-1">{{ item.title }}</h3>
                <p class="text-slate-600 text-sm">{{ item.description }}</p>
              </div>
              <div :class="`bg-linear-to-br ${item.color} p-4 rounded-lg ml-4 shrink-0`">
                <component :is="item.icon" class="w-8 h-8 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Logout Card -->
      <Card class="border-red-200">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
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