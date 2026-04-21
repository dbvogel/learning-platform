import type { WorkflowRun } from '@/stores/workflowsStore'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const workflowsService = {
  async getWorkflowRuns(): Promise<WorkflowRun[]> {
    // Später echte Symfony-API, für jetzt nur Mock-Daten
    await wait(450)

    return [
      {
        id: 1,
        system: 'ERP',
        task: 'Customer master data sync',
        status: 'success',
        lastUpdated: '2026-04-20 08:15',
        description: 'Nightly sync finished without validation errors.',
      },
      {
        id: 2,
        system: 'Website',
        task: 'Product availability export',
        status: 'running',
        lastUpdated: '2026-04-20 09:40',
        description: 'Current catalog export is being generated for the storefront.',
      },
      {
        id: 3,
        system: 'YouTrack',
        task: 'New support request ticket creation',
        status: 'pending',
        lastUpdated: '2026-04-20 09:55',
        description: 'Awaiting approval from the responsible department queue.',
      },
      {
        id: 4,
        system: 'ERP',
        task: 'Invoice delivery workflow',
        status: 'failed',
        lastUpdated: '2026-04-20 10:05',
        description: 'One invoice payload failed schema validation and needs review.',
      },
    ]
  },
}