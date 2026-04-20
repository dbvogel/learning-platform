import { describe, expect, it } from 'vitest'
import en from './locales/en.json'
import de from './locales/de.json'

describe('i18n messages', () => {
  it('contains English login label', () => {
    expect(en.auth.login).toBe('Login')
  })

  it('contains German login label', () => {
    expect(de.auth.login).toBe('Anmelden')
  })
})
