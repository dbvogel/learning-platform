import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from './userStore'

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('logs in with valid credentials', () => {
    const store = useUserStore()

    const success = store.login('admin@example.com', 'admin123')

    expect(success).toBe(true)
    expect(store.isAuthenticated).toBe(true)
    expect(store.currentUser?.email).toBe('admin@example.com')
  })

  it('rejects invalid credentials', () => {
    const store = useUserStore()

    const success = store.login('admin@example.com', 'wrong-password')

    expect(success).toBe(false)
    expect(store.isAuthenticated).toBe(false)
    expect(store.currentUser).toBeNull()
  })

  it('logs out and clears user state', () => {
    const store = useUserStore()
    store.login('admin@example.com', 'admin123')

    store.logout()

    expect(store.isAuthenticated).toBe(false)
    expect(store.currentUser).toBeNull()
  })
})
