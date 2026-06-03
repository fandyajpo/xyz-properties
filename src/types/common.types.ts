export type NotificationType = 'payment' | 'project' | 'document' | 'support' | 'referral' | 'system'

export interface Notification {
  id: string
  investorId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  isArchived: boolean
  link?: string
  createdAt: string
}

export interface Document {
  id: string
  investorId: string
  projectId?: string
  category: 'floorplans' | 'contracts' | 'legal' | 'marketing'
  name: string
  fileName: string
  fileType: string
  fileSize: number
  downloadUrl: string
  uploadedAt: string
  uploadedBy: string
  description?: string
}

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  category: 'market' | 'company' | 'investment'
  imageUrl: string
  author: string
  publishedAt: string
  readTime: number
  featured: boolean
}

export interface SupportTicket {
  id: string
  ticketNumber: string
  investorId: string
  subject: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'pending' | 'resolved' | 'closed'
  message: string
  responses: TicketResponse[]
  createdAt: string
  updatedAt: string
}

export interface TicketResponse {
  id: string
  author: string
  isStaff: boolean
  message: string
  createdAt: string
}

export interface Referral {
  id: string
  referrerId: string
  refereeEmail: string
  refereeName: string
  status: 'pending' | 'converted' | 'rejected'
  reward: number
  createdAt: string
  convertedAt?: string
}

export interface RewardTier {
  tier: 'Silver' | 'Gold' | 'Platinum'
  minPoints: number
  maxPoints: number
  benefits: string[]
  color: string
  icon: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  processingStages?: ProcessingStage[]
  metadata?: {
    responseTime: number
    sourceCount: number
    workflowStatus: string
  }
}

export interface ProcessingStage {
  label: string
  status: 'pending' | 'active' | 'done'
  duration?: number
}

export interface ChatSession {
  id: string
  investorId: string
  title: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}
