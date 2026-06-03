import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/axios'


export interface InsertKnowledgeBasePayload {
  content: string
  metadata?: Record<string, any>
}

export interface KnowledgeBaseStats {
  namespaces?: {
    __default__?: {
      vectorCount: number
    }
  }
  indexFullness?: number
  totalVectorCount?: number
  dimension?: number
  metric?: string
  vectorType?: string
  memoryFullness?: number
  storageFullness?: number
}


export const KNOWLEDGE_BASE_KEYS = {
  all: ['knowledgeBase'] as const,
  stats: () => [...KNOWLEDGE_BASE_KEYS.all, 'stats'] as const,
}


export function useInsertKnowledgeBase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()

      formData.append('file', file)

      const { data } = await apiClient.post('/webhook/insert', formData, {
        method: "POST",
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KNOWLEDGE_BASE_KEYS.stats() })
    },
  })
}


export function useRemoveKnowledgeBase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.delete(`/webhook/truncate`, {
        method: "DELETE",
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KNOWLEDGE_BASE_KEYS.stats() })
    },
  })
}


export function useKnowledgeBaseStats() {
  return useQuery({
    queryKey: KNOWLEDGE_BASE_KEYS.stats(),
    queryFn: async () => {
      const { data } = await apiClient.get('/webhook/stats', {
        method: "GET",
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      return data
    },
  })
}


