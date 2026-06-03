export type PaymentStatus = 'paid' | 'pending' | 'overdue'

export interface Payment {
  id: string
  invoiceNumber: string
  investorId: string
  projectId: string
  projectName: string
  unitNumber: string
  description: string
  amount: number
  currency: string
  dueDate: string
  paidDate?: string
  status: PaymentStatus
  paymentMethod?: string
  reference?: string
}

export interface PaymentSummary {
  totalPaid: number
  totalPending: number
  totalOverdue: number
  nextDueDate: string
  nextDueAmount: number
}
