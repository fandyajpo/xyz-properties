import type { Notification } from '@/types/common.types'

export const dummyNotifications: Notification[] = [
  {
    id: 'notif_001', investorId: 'inv_michael_anderson_001',
    type: 'payment', title: 'Payment Overdue',
    message: 'Your Annual Property Management Fee for Seminyak Residences (V12) of AUD $8,500 was due on 15 May 2026. Please make payment to avoid late fees.',
    isRead: false, isArchived: false,
    link: '/portal/payments', createdAt: '2026-05-16T08:00:00Z',
  },
  {
    id: 'notif_002', investorId: 'inv_michael_anderson_001',
    type: 'project', title: 'Construction Update — Seminyak Residences',
    message: 'MEP works are now 90% complete at Seminyak Residences. The facade cladding installation has commenced on Buildings A and B. Estimated facade completion: July 2026.',
    isRead: false, isArchived: false,
    link: '/portal/construction', createdAt: '2026-05-18T10:30:00Z',
  },
  {
    id: 'notif_003', investorId: 'inv_michael_anderson_001',
    type: 'document', title: 'New Document Available',
    message: 'Your updated Strata Title certificate for Uluwatu Ocean Villas Unit B03 has been uploaded to your Document Centre.',
    isRead: false, isArchived: false,
    link: '/portal/documents', createdAt: '2026-05-20T09:15:00Z',
  },
  {
    id: 'notif_004', investorId: 'inv_michael_anderson_001',
    type: 'payment', title: 'Upcoming Payment Reminder',
    message: 'Instalment 4 of 6 for Seminyak Residences (V12) — AUD $127,500 is due on 30 June 2026. Ensure your funds are transferred 3 business days prior.',
    isRead: true, isArchived: false,
    link: '/portal/payments', createdAt: '2026-05-15T07:00:00Z',
  },
  {
    id: 'notif_005', investorId: 'inv_michael_anderson_001',
    type: 'referral', title: 'Referral Reward Earned!',
    message: 'Congratulations! Your referral of James Whitfield has been confirmed. You have earned AUD $2,500 in referral rewards. Check your Rewards dashboard.',
    isRead: true, isArchived: false,
    link: '/portal/rewards', createdAt: '2026-05-10T14:22:00Z',
  },
  {
    id: 'notif_006', investorId: 'inv_michael_anderson_001',
    type: 'support', title: 'Support Ticket Resolved',
    message: 'Your support ticket #TKT-2026-0031 regarding the rental yield statement has been resolved. Please review the response from our investor relations team.',
    isRead: true, isArchived: false,
    link: '/portal/support', createdAt: '2026-05-08T16:45:00Z',
  },
  {
    id: 'notif_007', investorId: 'inv_michael_anderson_001',
    type: 'project', title: 'Bali Visit Plan Approved',
    message: 'Your Bali visit plan for 10–18 July 2026 has been approved. Airport pickup has been arranged. Our concierge will contact you 48 hours before arrival.',
    isRead: true, isArchived: false,
    link: '/portal/visit-plan', createdAt: '2026-04-22T11:00:00Z',
  },
  {
    id: 'notif_008', investorId: 'inv_michael_anderson_001',
    type: 'system', title: 'Q1 2026 Portfolio Report Available',
    message: 'Your Q1 2026 Investor Portfolio Report is now available. Your portfolio achieved a 3.2% capital growth this quarter, outperforming the Bali residential index by 1.4%.',
    isRead: true, isArchived: false,
    link: '/portal/documents', createdAt: '2026-04-05T09:00:00Z',
  },
]
