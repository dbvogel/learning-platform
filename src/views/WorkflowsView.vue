<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'vue-router'
import { ArrowLeft, Activity, CircleAlert, CircleCheckBig, LoaderCircle, Clock3 } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useWorkflowsStore, type WorkflowStatus } from '@/stores/workflowsStore'

const router = useRouter()
const workflowsStore = useWorkflowsStore()
const { t } = useI18n()

onMounted(async () => {
  await workflowsStore.fetchWorkflowRuns()
})

const handleBack = () => {
  router.push('/dashboard')
}

const statusConfig = computed<Record<WorkflowStatus, { label: string; badgeClass: string; icon: typeof Activity }>>(() => ({
  success: {
    label: t('workflows.statusSuccess'),
    badgeClass: 'bg-emerald-100 text-emerald-700',
    icon: CircleCheckBig,
  },
  running: {
    label: t('workflows.statusRunning'),
    badgeClass: 'bg-sky-100 text-sky-700',
    icon: LoaderCircle,
  },
  pending: {
    label: t('workflows.statusPending'),
    badgeClass: 'bg-amber-100 text-amber-700',
    icon: Clock3,
  },
  failed: {
    label: t('workflows.statusFailed'),
    badgeClass: 'bg-rose-100 text-rose-700',
    icon: CircleAlert,
  },
}))
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-cyan-50 to-slate-100 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-5xl">
      <Button @click="handleBack" variant="outline" class="mb-4 flex items-center gap-2 text-xs sm:mb-6 sm:text-sm">
        <ArrowLeft class="h-4 w-4" />
        {{ t('common.backToDashboard') }}
      </Button>

      <Card class="mb-6 border-2 border-cyan-200 shadow-lg">
        <CardHeader class="rounded-t-lg bg-linear-to-r from-cyan-500 to-slate-700 text-white">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="rounded-full bg-white/20 p-2 sm:p-3">
              <Activity class="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div class="min-w-0">
              <CardTitle class="text-xl text-white sm:text-2xl">{{ t('workflows.title') }}</CardTitle>
              <CardDescription class="text-sm text-cyan-50 sm:text-base">
                {{ t('workflows.subtitle', { count: workflowsStore.workflowRuns.length }) }}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div class="space-y-4">
        <div v-if="workflowsStore.loading" class="space-y-4">
          <Card v-for="skeleton in 4" :key="`workflow-skeleton-${skeleton}`" class="border-cyan-200">
            <CardContent class="p-4 sm:p-6">
              <div class="animate-pulse space-y-3">
                <div class="h-4 w-1/3 rounded bg-cyan-100"></div>
                <div class="h-3 w-1/4 rounded bg-cyan-100"></div>
                <div class="h-3 w-5/6 rounded bg-cyan-100"></div>
                <div class="h-3 w-2/3 rounded bg-cyan-100"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card v-else-if="workflowsStore.error" class="border-red-200">
          <CardContent class="p-4 sm:p-6">
            <p class="text-sm text-red-600">{{ workflowsStore.error }}</p>
          </CardContent>
        </Card>

        <Card v-else-if="workflowsStore.workflowRuns.length === 0" class="border-cyan-200">
          <CardContent class="p-4 sm:p-6">
            <p class="text-sm text-slate-600">{{ t('workflows.empty') }}</p>
          </CardContent>
        </Card>

        <Card v-for="workflow in workflowsStore.workflowRuns" :key="workflow.id" class="border-cyan-200 hover:shadow-lg">
          <CardContent class="p-4 sm:p-6">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 flex-1">
                <div class="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div class="min-w-0">
                    <p class="text-xs font-semibold uppercase tracking-wide text-cyan-700">{{ workflow.system }}</p>
                    <h3 class="text-base font-semibold text-slate-900 sm:text-lg wrap-break-word">{{ workflow.task }}</h3>
                  </div>
                  <span :class="['inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold', statusConfig[workflow.status].badgeClass]">
                    <component :is="statusConfig[workflow.status].icon" class="h-4 w-4" :class="workflow.status === 'running' ? 'animate-spin' : ''" />
                    {{ statusConfig[workflow.status].label }}
                  </span>
                </div>

                <p class="mb-3 text-sm text-slate-700 sm:text-base wrap-break-word">{{ workflow.description }}</p>

                <p class="text-xs text-slate-500">
                  {{ t('workflows.lastUpdated') }}: {{ workflow.lastUpdated }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>