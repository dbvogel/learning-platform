import { defineStore } from 'pinia'

import { ref } from 'vue'
import { messagesService } from '@/services/messagesService'

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
      messages.value = await messagesService.getMessages()
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