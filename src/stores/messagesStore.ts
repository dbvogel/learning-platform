import { defineStore } from 'pinia'

import { ref } from 'vue'

export interface Message {
  id: number
  from: string
  subject: string
  content: string
  date: string
}

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Message[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMessages = async () => {
    loading.value = true
    error.value = null
    try {
      // TODO: Symfony-Backend implementieren
      // const response = await fetch('/api/messages')
      // messages.value = await response.json()

      // Mock data zum testen
      await new Promise(resolve => setTimeout(resolve, 500)) // Delay simulieren
      messages.value = [
        { id: 1, from: 'Admin', subject: 'Welcome!', content: 'Welcome to the platform.', date: '2023-10-01' },
        { id: 2, from: 'Support', subject: 'Help Available', content: 'Need help? Contact us.', date: '2023-10-05' },
        { id: 3, from: 'Teacher', subject: 'New Course', content: 'Check out the new Vue course.', date: '2023-10-10' },
      ]
    } catch (err) {
      error.value = 'Failed to fetch messages'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const addMessage = (message: Omit<Message, 'id'>) => {
    const newId = Math.max(...messages.value.map(m => m.id), 0) + 1
    messages.value.push({ ...message, id: newId })
  }

  return {
    messages,
    loading,
    error,
    fetchMessages,
    addMessage,
  }
})