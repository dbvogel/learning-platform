import { defineStore } from 'pinia'

import { ref } from 'vue'

export interface Download {
  id: number
  name: string
  size: string
  date: string
  url: string
}

export const useDownloadsStore = defineStore('downloads', () => {
  const downloads = ref<Download[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchDownloads = async () => {
    loading.value = true
    error.value = null
    try {
      // TODO: Replace with real API call to Symfony backend
      // const response = await fetch('/api/downloads')
      // downloads.value = await response.json()

      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate delay
      downloads.value = [
        { id: 1, name: 'Course Material 1', size: '5MB', date: '2023-10-01', url: '/downloads/material1.pdf' },
        { id: 2, name: 'Tutorial Video', size: '100MB', date: '2023-10-05', url: '/downloads/tutorial.mp4' },
        { id: 3, name: 'Exercise Files', size: '2MB', date: '2023-10-10', url: '/downloads/exercises.zip' },
      ]
    } catch (err) {
      error.value = 'Failed to fetch downloads'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const addDownload = (download: Omit<Download, 'id'>) => {
    const newId = Math.max(...downloads.value.map(d => d.id), 0) + 1
    downloads.value.push({ ...download, id: newId })
  }

  return {
    downloads,
    loading,
    error,
    fetchDownloads,
    addDownload,
  }
})