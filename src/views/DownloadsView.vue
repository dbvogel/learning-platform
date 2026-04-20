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
  <div class="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header with back button -->
      <Button @click="handleBack" variant="outline" class="mb-4 flex items-center gap-2 text-xs sm:mb-6 sm:text-sm">
        <ArrowLeft class="w-4 h-4" />
        {{ t('common.backToDashboard') }}
      </Button>

      <!-- Downloads Header -->
      <Card class="border-2 border-orange-200 shadow-lg mb-6">
        <CardHeader class="bg-linear-to-r from-orange-400 to-orange-600 text-white rounded-t-lg">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="rounded-full bg-white bg-opacity-20 p-2 sm:p-3">
              <Download class="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div class="min-w-0">
              <CardTitle class="text-xl text-white sm:text-2xl">{{ t('downloads.downloads') }}</CardTitle>
              <CardDescription class="text-sm text-orange-100 sm:text-base">{{ t('downloads.filesAvailable', { count: downloadsStore.downloads.length }) }}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <!-- Downloads List -->
      <div class="space-y-4">
        <div v-for="download in downloadsStore.downloads" :key="download.id" class="transition-transform duration-300 hover:scale-[1.01]">
          <Card class="hover:shadow-lg border-orange-200">
            <CardContent class="p-4 sm:p-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4 flex-1">
                  <div class="bg-linear-to-br from-orange-400 to-orange-600 p-3 rounded-lg shrink-0">
                    <FileDown class="w-6 h-6 text-white" />
                  </div>
                  <div class="min-w-0">
                    <h3 class="text-base font-semibold text-slate-900 sm:text-lg wrap-break-word">{{ download.name }}</h3>
                    <div class="mt-1 flex flex-col gap-1 sm:flex-row sm:gap-4">
                      <p class="text-sm text-slate-600">{{ t('downloads.size') }}: <span class="font-medium">{{ download.size }}</span></p>
                      <p class="text-sm text-slate-600">{{ t('downloads.date') }}: <span class="font-medium">{{ download.date }}</span></p>
                    </div>
                  </div>
                </div>
                <Button @click="handleDownload(download.name)" size="sm" class="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600">
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