export type AuthGuardTarget = {
  name?: string | symbol | null
  fullPath: string
  meta: {
    requiredAuth?: boolean
  }
}

export const getAuthRedirect = (to: AuthGuardTarget, isAuthenticated: boolean) => {
  if (to.meta.requiredAuth && !isAuthenticated) {
    return { name: 'Home', query: { redirect: to.fullPath } }
  }

  if (to.name === 'Home' && isAuthenticated) {
    return { name: 'Dashboard' }
  }

  return null
}