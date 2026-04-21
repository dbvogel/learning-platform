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
  <div class="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-4 sm:p-6 lg:p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header with back button -->
      <Button @click="handleBack" variant="outline" class="mb-4 flex items-center gap-2 text-xs sm:mb-6 sm:text-sm">
        <ArrowLeft class="w-4 h-4" />
        {{ t('common.backToDashboard') }}
      </Button>

      <!-- Profile Card -->
      <Card class="border-2 border-blue-200 shadow-lg">
        <CardHeader class="bg-linear-to-r from-blue-400 to-blue-600 text-white rounded-t-lg">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="rounded-full bg-white/20 p-2 sm:p-3">
              <User class="h-6 w-6 text-white sm:h-8 sm:w-8" />
            </div>
            <div class="min-w-0">
              <CardTitle class="text-xl text-white sm:text-2xl">{{ t('profile.myProfile') }}</CardTitle>
              <CardDescription class="text-sm text-blue-100 sm:text-base">{{ t('profile.manageAccount') }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="p-4 sm:p-6 lg:p-8">
          <div class="space-y-4 sm:space-y-6">
            <div class="border-b pb-4">
              <p class="text-sm text-slate-600 font-semibold mb-1">{{ t('profile.fullName') }}</p>
              <p class="text-xl font-bold text-slate-900 sm:text-2xl wrap-break-word">{{ userStore.currentUser?.name }}</p>
            </div>
            <div class="border-b pb-4">
              <p class="text-sm text-slate-600 font-semibold mb-1">{{ t('profile.emailAddress') }}</p>
              <p class="text-base text-slate-900 break-all sm:text-lg">{{ userStore.currentUser?.email }}</p>
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