import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'
import { getStoredLanguage } from './composables/usePreferredLanguage'

export type MessageSchema = typeof en

const i18n = createI18n<{ message: MessageSchema }, 'en' | 'de'>({
  legacy: false,
  locale: getStoredLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    de,
  },
})

export default i18n
