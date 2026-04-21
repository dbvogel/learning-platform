import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type AppLanguage = 'en' | 'de'

const LANGUAGE_KEY = 'language'

const isAppLanguage = (value: string | null): value is AppLanguage => value === 'en' || value === 'de'

export const getStoredLanguage = (): AppLanguage => {
  if (typeof window === 'undefined') return 'en'

  const saved = window.localStorage.getItem(LANGUAGE_KEY)
  return isAppLanguage(saved) ? saved : 'en'
}

export const usePreferredLanguage = () => {
  const { locale } = useI18n()

  const language = computed<AppLanguage>({
    get: () => (isAppLanguage(locale.value) ? locale.value : 'en'),
    set: (nextLanguage) => {
      locale.value = nextLanguage
      window.localStorage.setItem(LANGUAGE_KEY, nextLanguage)
    },
  })

  const setLanguage = (nextLanguage: AppLanguage) => {
    language.value = nextLanguage
  }

  return {
    language,
    setLanguage,
  }
}