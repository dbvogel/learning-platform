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
  <div class="flex items-center gap-2">
    <Globe class="w-4 h-4 text-slate-600" />
    <div class="flex gap-1 bg-slate-200 rounded-lg p-1">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :class="[
          'px-3 py-1 rounded text-sm font-medium transition-colors',
          locale === lang.code
            ? 'bg-white text-slate-900 shadow'
            : 'text-slate-600 hover:text-slate-900'
        ]"
      >
        {{ lang.flag }} {{ lang.code.toUpperCase() }}
      </button>
    </div>
  </div>
</template>
