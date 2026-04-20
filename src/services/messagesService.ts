import type { Message } from '@/stores/messagesStore'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const messagesService = {
  async getMessages(): Promise<Message[]> {
    // Replace this with a Symfony-backed API call later.
    // Example: return apiClient.get('/api/messages')
    await wait(500)

    return [
      { id: 1, from: 'Admin', subject: 'Welcome!', content: 'Welcome to the platform.', date: '2023-10-01' },
      { id: 2, from: 'Support', subject: 'Help Available', content: 'Need help? Contact us.', date: '2023-10-05' },
      { id: 3, from: 'Teacher', subject: 'New Course', content: 'Check out the new Vue course.', date: '2023-10-10' },
    ]
  },
}