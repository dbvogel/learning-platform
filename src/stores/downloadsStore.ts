import { defineStore } from 'pinia'

import { ref } from 'vue'
import { downloadsService } from '@/services/downloadsService'

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
      downloads.value = await downloadsService.getDownloads()
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