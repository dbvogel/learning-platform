import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: number
  email: string
  password: string
  name: string
}

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([
    { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
    { id: 2, email: 'user@example.com', password: 'user123', name: 'Regular User' },
    { id: 3, email: 'test@example.com', password: 'test123', name: 'Test User' },
  ])

  const currentUser = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const login = (email: string, password: string): boolean => {
    const user = users.value.find(u => u.email === email && u.password === password)
    if (user) {
      currentUser.value = user
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const logout = () => {
    currentUser.value = null
    isAuthenticated.value = false
  }

  return {
    users,
    currentUser,
    isAuthenticated,
    login,
    logout,
  }
})