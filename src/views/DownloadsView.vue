<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'vue-router'
import { useDownloadsStore } from '@/stores/downloadsStore'
import { ArrowLeft, Download, FileDown } from 'lucide-vue-next'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const downloadsStore = useDownloadsStore()
const { t } = useI18n()

onMounted(async () => {
  await downloadsStore.fetchDownloads()
})

const handleBack = () => {
  router.push('/dashboard')
}

const handleDownload = (fileName: string) => {
  alert(`Downloading: ${fileName}`)
  // TODO: Implement actual download logic
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header with back button -->
      <Button @click="handleBack" variant="outline" class="mb-6 flex items-center gap-2">
        <ArrowLeft class="w-4 h-4" />
        {{ t('common.backToDashboard') }}
      </Button>

      <!-- Downloads Header -->
      <Card class="border-2 border-orange-200 shadow-lg mb-6">
        <CardHeader class="bg-linear-to-r from-orange-400 to-orange-600 text-white rounded-t-lg">
          <div class="flex items-center gap-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-full">
              <Download class="w-8 h-8" />
            </div>
            <div>
              <CardTitle class="text-white text-2xl">{{ t('downloads.downloads') }}</CardTitle>
              <CardDescription class="text-orange-100">{{ t('downloads.filesAvailable', { count: downloadsStore.downloads.length }) }}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <!-- Downloads List -->
      <div class="space-y-4">
        <div v-for="download in downloadsStore.downloads" :key="download.id" class="transition-transform duration-300 hover:scale-102">
          <Card class="hover:shadow-lg border-orange-200">
            <CardContent class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 flex-1">
                  <div class="bg-linear-to-br from-orange-400 to-orange-600 p-3 rounded-lg shrink-0">
                    <FileDown class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-slate-900">{{ download.name }}</h3>
                    <div class="flex gap-4 mt-1">
                      <p class="text-sm text-slate-600">{{ t('downloads.size') }}: <span class="font-medium">{{ download.size }}</span></p>
                      <p class="text-sm text-slate-600">{{ t('downloads.date') }}: <span class="font-medium">{{ download.date }}</span></p>
                    </div>
                  </div>
                </div>
                <Button @click="handleDownload(download.name)" size="sm" class="flex items-center gap-2 bg-orange-500 hover:bg-orange-600">
                  <FileDown class="w-4 h-4" />
                  {{ t('downloads.download') }}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>