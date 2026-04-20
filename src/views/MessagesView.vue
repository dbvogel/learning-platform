<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'vue-router'
import { useMessagesStore } from '@/stores/messagesStore'
import { ArrowLeft, MessageSquare, Mail } from 'lucide-vue-next'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const messagesStore = useMessagesStore()
const { t } = useI18n()

onMounted(async () => {
  await messagesStore.fetchMessages()
})

const handleBack = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-purple-50 to-purple-100 p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header with back button -->
      <Button @click="handleBack" variant="outline" class="mb-4 flex items-center gap-2 text-xs sm:mb-6 sm:text-sm">
        <ArrowLeft class="w-4 h-4" />
        {{ t('common.backToDashboard') }}
      </Button>

      <!-- Messages Header -->
      <Card class="border-2 border-purple-200 shadow-lg mb-6">
        <CardHeader class="bg-linear-to-r from-purple-400 to-purple-600 text-white rounded-t-lg">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="rounded-full bg-white bg-opacity-20 p-2 sm:p-3">
              <MessageSquare class="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div class="min-w-0">
              <CardTitle class="text-xl text-white sm:text-2xl">{{ t('messages.messages') }}</CardTitle>
              <CardDescription class="text-sm text-purple-100 sm:text-base">{{ t('messages.yourInbox', { count: messagesStore.messages.length }) }}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <!-- Messages List -->
      <div class="space-y-4">
        <div v-if="messagesStore.loading" class="space-y-4">
          <Card v-for="skeleton in 3" :key="`messages-skeleton-${skeleton}`" class="border-purple-200">
            <CardContent class="p-4 sm:p-6">
              <div class="animate-pulse space-y-3">
                <div class="h-4 w-1/3 rounded bg-purple-100"></div>
                <div class="h-3 w-1/4 rounded bg-purple-100"></div>
                <div class="h-3 w-5/6 rounded bg-purple-100"></div>
                <div class="h-3 w-2/3 rounded bg-purple-100"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card v-else-if="messagesStore.error" class="border-red-200">
          <CardContent class="p-4 sm:p-6">
            <p class="text-sm text-red-600">{{ messagesStore.error }}</p>
          </CardContent>
        </Card>

        <Card v-else-if="messagesStore.messages.length === 0" class="border-purple-200">
          <CardContent class="p-4 sm:p-6">
            <p class="text-sm text-slate-600">{{ t('messages.empty') }}</p>
          </CardContent>
        </Card>

        <div v-for="message in messagesStore.messages" :key="message.id" class="transition-transform duration-300 hover:scale-[1.01]">
          <Card class="hover:shadow-lg border-purple-200">
            <CardContent class="p-4 sm:p-6">
              <div class="flex items-start gap-3 sm:gap-4">
                <div class="bg-linear-to-br from-purple-400 to-purple-600 p-3 rounded-lg shrink-0 mt-1">
                  <Mail class="w-5 h-5 text-white" />
                </div>
                <div class="flex-1">
                  <h3 class="text-base font-semibold text-slate-900 sm:text-lg wrap-break-word">{{ message.subject }}</h3>
                  <p class="text-sm text-slate-600 mb-2">{{ t('messages.from') }}: <span class="font-medium">{{ message.from }}</span></p>
                  <p class="mb-3 text-sm text-slate-700 sm:text-base wrap-break-word">{{ message.content }}</p>
                  <p class="text-xs text-slate-500">{{ message.date }}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>