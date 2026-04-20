<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Globe } from 'lucide-vue-next'

const { locale } = useI18n()

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
]

const changeLanguage = (lang: string) => {
  locale.value = lang as 'en' | 'de'
  localStorage.setItem('language', lang)
}
</script>

<template>
  <div class="flex items-center gap-1 sm:gap-2">
    <Globe class="h-4 w-4 text-slate-600" />
    <div class="flex gap-1 rounded-lg bg-slate-200 p-1">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :class="[
          'rounded px-2 py-1 text-xs font-medium transition-colors sm:px-3 sm:text-sm',
          locale === lang.code
            ? 'bg-white text-slate-900 shadow'
            : 'text-slate-600 hover:text-slate-900'
        ]"
      >
        <span>{{ lang.flag }}</span>
        <span class="hidden sm:inline">{{ lang.code.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>
