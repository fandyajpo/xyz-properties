export type ProjectStatus = 'planning' | 'construction' | 'completed' | 'sold_out'

export interface Project {
  id: string
  name: string
  location: string
  description: string
  status: ProjectStatus
  completionPercent: number
  expectedROI: number
  priceMin: number
  priceMax: number
  totalUnits: number
  availableUnits: number
  imageUrl: string
  galleryUrls: string[]
  estimatedCompletion: string
  developer: string
  features: string[]
  coordinates: {
    lat: number
    lng: number
  }
}

export interface InvestorProject {
  id: string
  investorId: string
  projectId: string
  project: Project
  unitNumber: string
  purchasePrice: number
  currentValue: number
  purchaseDate: string
  ownershipPercent: number
  status: 'active' | 'completed' | 'pending'
}

export interface ConstructionMilestone {
  id: string
  projectId: string
  phase: string
  description: string
  completionPercent: number
  startDate: string
  endDate: string
  status: 'completed' | 'in_progress' | 'upcoming'
  engineerNotes: string
  images: string[]
  publishedAt: string
}
