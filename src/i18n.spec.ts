import { describe, expect, it } from 'vitest'
import i18n from './i18n'

describe('i18n', () => {
  it('translates in English by default', () => {
    i18n.global.locale.value = 'en'

    expect(i18n.global.t('auth.login')).toBe('Login')
  })

  it('switches to German locale', () => {
    i18n.global.locale.value = 'de'

    expect(i18n.global.t('auth.login')).toBe('Anmelden')
  })
})
