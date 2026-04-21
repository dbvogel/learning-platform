import type { Download } from '@/stores/downloadsStore'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const downloadsService = {
  async getDownloads(): Promise<Download[]> {
    // Später echte Symfony-API, für jetzt nur Mock-Daten
    await wait(500)

    return [
      { id: 1, name: 'Course Material 1', size: '5MB', date: '2023-10-01', url: '/downloads/material1.pdf' },
      { id: 2, name: 'Tutorial Video', size: '100MB', date: '2023-10-05', url: '/downloads/tutorial.mp4' },
      { id: 3, name: 'Exercise Files', size: '2MB', date: '2023-10-10', url: '/downloads/exercises.zip' },
    ]
  },
}