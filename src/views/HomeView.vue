<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

onMounted(() => {
  if (userStore.isAuthenticated) {
    router.replace('/dashboard')
  }
})

const getRedirectTarget = () => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/dashboard'
}

const handleLogin = () => {
  errorMessage.value = ''
  const success = userStore.login(email.value, password.value)
  if (success) {
    router.push(getRedirectTarget())
  } else {
    errorMessage.value = t('auth.invalidCredentials')
  }
}
</script>

<template>
  <div style="background-color: blue; min-height: calc(100vh - 56px); display: flex; align-items: center; justify-content: center;">
    <Card class="mx-3 w-full max-w-sm sm:mx-4">
      <CardHeader>
        <CardTitle class="mb-2">{{ t('auth.login') }}</CardTitle>
        <CardDescription>{{ t('auth.testAccounts') }}</CardDescription>
        <ul class="mt-2 space-y-1 text-xs text-gray-700 sm:text-sm">
          <li v-for="user in userStore.users" :key="user.id" class="break-all">
            {{ user.email }} - {{ user.password }}
          </li>
        </ul>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-5">
          <div>
            <Label for="email" class="mb-2">{{ t('auth.email') }}</Label>
            <Input id="email" type="email" v-model="email" :placeholder="t('auth.enterEmail')" required />
          </div>
          <div>
            <Label for="password" class="mb-2">{{ t('auth.password') }}</Label>
            <Input id="password" type="password" v-model="password" :placeholder="t('auth.enterPassword')" required />
          </div>
          <Button type="submit" class="w-full">{{ t('auth.login') }}</Button>
          <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>