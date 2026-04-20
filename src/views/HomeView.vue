<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  errorMessage.value = ''
  const success = userStore.login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    errorMessage.value = t('auth.invalidCredentials')
  }
}
</script>

<template>
  <div style="background-color: blue; min-height: calc(100vh - 65px); display: flex; align-items: center; justify-content: center;">
    <Card class="w-full max-w-sm mx-4">
      <CardHeader>
        <CardTitle class="mb-2">{{ t('auth.login') }}</CardTitle>
        <CardDescription>{{ t('auth.testAccounts') }}</CardDescription>
        <ul class="text-sm text-gray-600 mt-2">
          <li v-for="user in userStore.users" :key="user.id">{{ user.email }} {{ user.password }}</li>
        </ul>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-5">
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