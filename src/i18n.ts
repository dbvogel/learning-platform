import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

export type MessageSchema = typeof en

const i18n = createI18n<{ message: MessageSchema }, 'en' | 'de'>({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de,
  },
})

export default i18n
