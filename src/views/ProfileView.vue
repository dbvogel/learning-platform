<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ArrowLeft, User } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()

const handleBack = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header with back button -->
      <Button @click="handleBack" variant="outline" class="mb-6 flex items-center gap-2">
        <ArrowLeft class="w-4 h-4" />
        {{ t('common.backToDashboard') }}
      </Button>

      <!-- Profile Card -->
      <Card class="border-2 border-blue-200 shadow-lg">
        <CardHeader class="bg-linear-to-r from-blue-400 to-blue-600 text-white rounded-t-lg">
          <div class="flex items-center gap-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-full">
              <User class="w-8 h-8" />
            </div>
            <div>
              <CardTitle class="text-white text-2xl">{{ t('profile.myProfile') }}</CardTitle>
              <CardDescription class="text-blue-100">{{ t('profile.manageAccount') }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="p-8">
          <div class="space-y-6">
            <div class="border-b pb-4">
              <p class="text-sm text-slate-600 font-semibold mb-1">{{ t('profile.fullName') }}</p>
              <p class="text-2xl font-bold text-slate-900">{{ userStore.currentUser?.name }}</p>
            </div>
            <div class="border-b pb-4">
              <p class="text-sm text-slate-600 font-semibold mb-1">{{ t('profile.emailAddress') }}</p>
              <p class="text-lg text-slate-900">{{ userStore.currentUser?.email }}</p>
            </div>
            <div>
              <p class="text-sm text-slate-600 font-semibold mb-1">{{ t('profile.userId') }}</p>
              <p class="text-lg text-slate-900">#{{ userStore.currentUser?.id }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>