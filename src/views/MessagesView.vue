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
  <div class="min-h-screen bg-linear-to-br from-purple-50 to-purple-100 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header with back button -->
      <Button @click="handleBack" variant="outline" class="mb-6 flex items-center gap-2">
        <ArrowLeft class="w-4 h-4" />
        {{ t('common.backToDashboard') }}
      </Button>

      <!-- Messages Header -->
      <Card class="border-2 border-purple-200 shadow-lg mb-6">
        <CardHeader class="bg-linear-to-r from-purple-400 to-purple-600 text-white rounded-t-lg">
          <div class="flex items-center gap-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-full">
              <MessageSquare class="w-8 h-8" />
            </div>
            <div>
              <CardTitle class="text-white text-2xl">{{ t('messages.messages') }}</CardTitle>
              <CardDescription class="text-purple-100">{{ t('messages.yourInbox', { count: messagesStore.messages.length }) }}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <!-- Messages List -->
      <div class="space-y-4">
        <div v-for="message in messagesStore.messages" :key="message.id" class="transition-transform duration-300 hover:scale-102">
          <Card class="hover:shadow-lg border-purple-200">
            <CardContent class="p-6">
              <div class="flex items-start gap-4">
                <div class="bg-linear-to-br from-purple-400 to-purple-600 p-3 rounded-lg shrink-0 mt-1">
                  <Mail class="w-5 h-5 text-white" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-slate-900">{{ message.subject }}</h3>
                  <p class="text-sm text-slate-600 mb-2">{{ t('messages.from') }}: <span class="font-medium">{{ message.from }}</span></p>
                  <p class="text-slate-700 mb-3">{{ message.content }}</p>
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