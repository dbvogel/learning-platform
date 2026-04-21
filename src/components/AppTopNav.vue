<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useUserStore } from '@/stores/userStore'
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()
const mobileMenuOpen = ref(false)

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
    { to: '/workflows', label: t('dashboard.workflows') },
  ]
})

const handleLogout = () => {
  mobileMenuOpen.value = false
  userStore.logout()
  router.push('/')
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
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
        <Button
          variant="outline"
          size="sm"
          class="px-2 md:hidden"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation menu"
          @click="toggleMobileMenu"
        >
          <component :is="mobileMenuOpen ? X : Menu" class="h-4 w-4" />
        </Button>
        <Button v-if="userStore.isAuthenticated" variant="destructive" size="sm" class="px-2 text-xs sm:px-3 sm:text-sm" @click="handleLogout">
          {{ t('common.logout') }}
        </Button>
      </div>
    </div>

    <nav v-if="mobileMenuOpen" class="mx-auto max-w-6xl px-3 pb-3 sm:px-4 md:hidden">
      <div class="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <RouterLink
          v-for="item in navItems"
          :key="`mobile-${item.to}`"
          :to="item.to"
          :class="[
            'rounded-md px-3 py-2 text-sm font-medium transition-colors',
            route.path === item.to
              ? 'bg-slate-900 text-white'
              : 'text-slate-700 hover:bg-slate-100'
          ]"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
