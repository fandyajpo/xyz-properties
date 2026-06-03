import { apiClient } from '@/lib/axios'
import type { ChatMessage, ProcessingStage } from '@/types/common.types'

const PROCESSING_STAGES: ProcessingStage[] = [
  { label: 'Connecting to AI...', status: 'pending' },
  { label: 'Analyzing your question...', status: 'pending' },
  { label: 'Searching knowledge base...', status: 'pending' },
  { label: 'Generating response...', status: 'pending' },
]

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const chatService = {
  async sendMessage(
    content: string,
    onStageUpdate: (stages: ProcessingStage[]) => void
  ): Promise<ChatMessage> {
    const stages = PROCESSING_STAGES.map(s => ({ ...s }))
    const start = Date.now()

    const animateStages = async () => {
      for (let i = 0; i < stages.length - 1; i++) {
        stages[i].status = 'active'
        onStageUpdate([...stages])
        await sleep(700 + Math.random() * 500)
        stages[i].status = 'done'
        stages[i].duration = Math.round(Math.random() * 300 + 200)
        onStageUpdate([...stages])
      }

      stages[stages.length - 1].status = 'active'
      onStageUpdate([...stages])
    }

    const [, apiResponse] = await Promise.all([
      animateStages(),

      apiClient
        .post(
          '/webhook/4e4b3bf5-3c0b-44e6-b621-d088aa4423f7',
          { chatInput: content },
          {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
        .then((res) => {
          console.log('DATA', res.data)

          return (
            res.data?.output ??
            res.data?.text ??
            res.data?.response ??
            JSON.stringify(res.data)
          )
        })
        .catch((err) => {
          console.error(err)
          return "I'm sorry, I couldn't reach the AI service right now."
        }),
    ])

    stages[stages.length - 1].status = 'done'
    stages[stages.length - 1].duration = Math.round(Date.now() - start - 1500)
    onStageUpdate([...stages])

    return {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      content: String(apiResponse),
      timestamp: new Date().toISOString(),
      processingStages: stages,
      metadata: {
        responseTime: Date.now() - start,
        sourceCount: 2,
        workflowStatus: 'completed',
      },
    }
  },
}