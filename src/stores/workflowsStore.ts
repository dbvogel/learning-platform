import { defineStore } from 'pinia'
import { ref } from 'vue'
import { workflowsService } from '@/services/workflowsService'

export type WorkflowStatus = 'success' | 'running' | 'pending' | 'failed'

export interface WorkflowRun {
  id: number
  system: string
  task: string
  status: WorkflowStatus
  lastUpdated: string
  description: string
}

export const useWorkflowsStore = defineStore('workflows', () => {
  const workflowRuns = ref<WorkflowRun[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchWorkflowRuns = async () => {
    loading.value = true
    error.value = null
    try {
      workflowRuns.value = await workflowsService.getWorkflowRuns()
    } catch (err) {
      error.value = 'Failed to fetch workflow runs'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    workflowRuns,
    loading,
    error,
    fetchWorkflowRuns,
  }
})