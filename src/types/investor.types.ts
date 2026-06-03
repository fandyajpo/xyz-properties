export interface Investor {
  id: string
  fullName: string
  email: string
  phone: string
  nationality: string
  country: string
  address: string
  city: string
  state: string
  postcode: string
  referralCode: string
  memberSince: string
  tier: 'Silver' | 'Gold' | 'Platinum'
  rewardPoints: number
  avatarUrl?: string
  isAdmin?: boolean
}

export interface BankAccount {
  id: string
  userId: string
  bankName: string
  accountHolder: string
  accountNumber: string
  branch: string
  swiftCode: string
  isDefault: boolean
  createdAt: string
}

export interface VisitPlan {
  id: string
  userId: string
  arrivalDate: string
  departureDate: string
  airportPickup: boolean
  accommodation: string
  purpose: string
  notes: string
  status: 'pending' | 'approved' | 'completed'
  createdAt: string
}
