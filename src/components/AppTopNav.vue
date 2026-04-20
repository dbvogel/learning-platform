<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()

const navItems = computed(() => {
  if (!userStore.isAuthenticated) {
    return [
      { to: '/', label: t('nav.home') },
    ]
  }

  return [
    { to: '/dashboard', label: t('nav.dashboard') },
    { to: '/profile', label: t('dashboard.myProfile') },
    { to: '/messages', label: t('dashboard.messages') },
    { to: '/downloads', label: t('dashboard.downloads') },
  ]
})

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-3">
      <RouterLink to="/" class="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
        LearnFlow
      </RouterLink>

      <nav class="hidden items-center gap-2 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'rounded-md px-3 py-2 text-sm font-medium transition-colors',
            route.path === item.to
              ? 'bg-slate-900 text-white'
              : 'text-slate-700 hover:bg-slate-100'
          ]"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="ml-auto flex items-center gap-1 sm:ml-0 sm:gap-2">
        <LanguageSwitcher />
        <Button v-if="userStore.isAuthenticated" variant="destructive" size="sm" class="px-2 text-xs sm:px-3 sm:text-sm" @click="handleLogout">
          {{ t('common.logout') }}
        </Button>
      </div>
    </div>

    <nav class="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-3 pb-2 sm:px-4 sm:pb-3 md:hidden">
      <RouterLink
        v-for="item in navItems"
        :key="`mobile-${item.to}`"
        :to="item.to"
        :class="[
          'whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:py-2 sm:text-sm',
          route.path === item.to
            ? 'bg-slate-900 text-white'
            : 'text-slate-700 hover:bg-slate-100'
        ]"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </header>
</template>
