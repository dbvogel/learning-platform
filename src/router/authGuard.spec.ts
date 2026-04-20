import { describe, expect, it } from 'vitest'
import { getAuthRedirect, type AuthGuardTarget } from './authGuard'

describe('getAuthRedirect', () => {
  it('redirects unauthenticated users from protected routes to home with redirect query', () => {
    const to: AuthGuardTarget = {
      name: 'Dashboard',
      fullPath: '/dashboard',
      meta: { requiredAuth: true },
    }

    const redirect = getAuthRedirect(to, false)

    expect(redirect).toEqual({ name: 'Home', query: { redirect: '/dashboard' } })
  })

  it('redirects authenticated users away from home to dashboard', () => {
    const to: AuthGuardTarget = {
      name: 'Home',
      fullPath: '/',
      meta: { requiredAuth: false },
    }

    const redirect = getAuthRedirect(to, true)

    expect(redirect).toEqual({ name: 'Dashboard' })
  })

  it('allows navigation when access is valid', () => {
    const to: AuthGuardTarget = {
      name: 'Messages',
      fullPath: '/messages',
      meta: { requiredAuth: true },
    }

    const redirect = getAuthRedirect(to, true)

    expect(redirect).toBeNull()
  })
})
