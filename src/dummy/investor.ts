import type { Investor, BankAccount, VisitPlan } from '@/types/investor.types'

export const dummyInvestor: Investor = {
  id: 'inv_michael_anderson_001',
  fullName: 'Michael Anderson',
  email: 'investor@xyzproperties.com',
  phone: '+61 412 345 678',
  nationality: 'Australian',
  country: 'Australia',
  address: '42 Harbour View Drive',
  city: 'Sydney',
  state: 'NSW',
  postcode: '2000',
  referralCode: 'MICHAEL-AU-2026',
  memberSince: '2023-03-15',
  tier: 'Gold',
  rewardPoints: 4750,
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  isAdmin: true, // Set to false (or remove) for non-admin investors in production
}

export const dummyBankAccounts: BankAccount[] = [
  {
    id: 'bank_001',
    userId: 'inv_michael_anderson_001',
    bankName: 'Commonwealth Bank of Australia',
    accountHolder: 'Michael Anderson',
    accountNumber: '****4521',
    branch: 'Sydney CBD Branch',
    swiftCode: 'CTBAAU2S',
    isDefault: true,
    createdAt: '2023-04-10',
  },
  {
    id: 'bank_002',
    userId: 'inv_michael_anderson_001',
    bankName: 'ANZ Bank',
    accountHolder: 'Michael Anderson',
    accountNumber: '****8834',
    branch: 'North Sydney Branch',
    swiftCode: 'ANZBAU3M',
    isDefault: false,
    createdAt: '2023-07-22',
  },
]

export const dummyVisitPlans: VisitPlan[] = [
  {
    id: 'visit_001',
    userId: 'inv_michael_anderson_001',
    arrivalDate: '2026-07-10',
    departureDate: '2026-07-18',
    airportPickup: true,
    accommodation: 'Alaya Resort Ubud',
    purpose: 'Site inspection — Uluwatu Ocean Villas + Seminyak Residences',
    notes: 'Prefer afternoon pickup from Ngurah Rai Airport. Would like a meeting with the project manager on Day 2.',
    status: 'approved',
    createdAt: '2026-04-20',
  },
  {
    id: 'visit_002',
    userId: 'inv_michael_anderson_001',
    arrivalDate: '2026-12-22',
    departureDate: '2026-12-30',
    airportPickup: true,
    accommodation: 'COMO Uma Canggu',
    purpose: 'Holiday + Canggu Smart Villas handover ceremony',
    notes: 'Family trip with spouse and two children. Need child-friendly hotel recommendations.',
    status: 'pending',
    createdAt: '2026-05-10',
  },
]
