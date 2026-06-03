import type { SupportTicket, Referral, ChatSession } from '@/types/common.types'

export const dummySupportTickets: SupportTicket[] = [
  {
    id: 'tkt_001', ticketNumber: 'TKT-2026-0031',
    investorId: 'inv_michael_anderson_001',
    subject: 'Rental Yield Statement — Q4 2025 Discrepancy',
    category: 'Financial', priority: 'medium', status: 'resolved',
    message: 'Hi, I\'ve reviewed my Q4 2025 rental yield statement for Uluwatu Ocean Villas B03 and noticed the gross rental income appears lower than the occupancy figures would suggest. The statement shows 68% occupancy at AUD $4,200/night, but the total rental income figure doesn\'t reconcile. Could you please provide a detailed breakdown?',
    responses: [
      {
        id: 'resp_001', author: 'Investor Relations Team', isStaff: true,
        message: 'Dear Michael, thank you for flagging this. After reviewing your account, we identified a data entry error in the Q4 statement. The correct gross rental income for Q4 2025 is AUD $218,400 (vs. the AUD $195,600 shown). An amended statement has been uploaded to your Document Centre. We sincerely apologise for the inconvenience.',
        createdAt: '2026-05-08T16:45:00Z',
      },
    ],
    createdAt: '2026-05-06T10:00:00Z', updatedAt: '2026-05-08T16:45:00Z',
  },
  {
    id: 'tkt_002', ticketNumber: 'TKT-2026-0044',
    investorId: 'inv_michael_anderson_001',
    subject: 'Construction Update Request — Canggu Smart Villas A17',
    category: 'Construction', priority: 'low', status: 'pending',
    message: 'Could you please provide a detailed update on the current construction status of my Canggu Smart Villas unit A17? I\'d like to understand the current phase, any delays, and the revised completion timeline. Also, when will the smart home specifications be finalised?',
    responses: [
      {
        id: 'resp_002', author: 'Project Management Team', isStaff: true,
        message: 'Dear Michael, your request has been received and forwarded to our Canggu site project manager. We will provide a comprehensive update within 3 business days, including updated construction photos and revised milestone schedule.',
        createdAt: '2026-05-21T09:00:00Z',
      },
    ],
    createdAt: '2026-05-20T14:30:00Z', updatedAt: '2026-05-21T09:00:00Z',
  },
  {
    id: 'tkt_003', ticketNumber: 'TKT-2026-0018',
    investorId: 'inv_michael_anderson_001',
    subject: 'Annual Property Management Fee — Invoice Query',
    category: 'Financial', priority: 'high', status: 'open',
    message: 'I received a notification about an overdue property management fee of AUD $8,500 for Seminyak Residences V12. However, my records show I had standing instructions for this to be automatically deducted from my retained rental proceeds account. Could you clarify why this wasn\'t processed automatically and confirm the correct payment method?',
    responses: [],
    createdAt: '2026-05-17T11:20:00Z', updatedAt: '2026-05-17T11:20:00Z',
  },
]

export const dummyReferrals: Referral[] = [
  {
    id: 'ref_001', referrerId: 'inv_michael_anderson_001',
    refereeEmail: 'james.whitfield@email.com.au', refereeName: 'James Whitfield',
    status: 'converted', reward: 2500,
    createdAt: '2026-02-14', convertedAt: '2026-05-10',
  },
  {
    id: 'ref_002', referrerId: 'inv_michael_anderson_001',
    refereeEmail: 'sophie.chen@email.com.au', refereeName: 'Sophie Chen',
    status: 'pending', reward: 2500,
    createdAt: '2026-04-03',
  },
  {
    id: 'ref_003', referrerId: 'inv_michael_anderson_001',
    refereeEmail: 'david.harrison@email.com.au', refereeName: 'David Harrison',
    status: 'pending', reward: 2500,
    createdAt: '2026-05-05',
  },
  {
    id: 'ref_004', referrerId: 'inv_michael_anderson_001',
    refereeEmail: 'rachel.obryan@email.com.au', refereeName: 'Rachel O\'Bryan',
    status: 'converted', reward: 2500,
    createdAt: '2025-09-20', convertedAt: '2025-12-08',
  },
]

export const dummyAIChats: ChatSession[] = [
  {
    id: 'chat_001', investorId: 'inv_michael_anderson_001',
    title: 'Construction Progress Inquiry',
    messages: [
      {
        id: 'msg_001', role: 'user',
        content: 'How is my Seminyak Residences project progressing?',
        timestamp: '2026-05-18T14:00:00Z',
      },
      {
        id: 'msg_002', role: 'assistant',
        content: '## Seminyak Residences — Construction Update\n\nYour **Villa V12** at Seminyak Residences is currently **72% complete** and tracking to schedule.\n\n### Current Phase: MEP & Facade Installation\n- ✅ Foundation Works — **Complete**\n- ✅ Structural Frame — **Complete**\n- 🔄 MEP & Facade — **78% complete** (target: Aug 2026)\n- ⏳ Interior & Pool Works — **Not started** (target: Sep 2026)\n\n### Key Updates\n- Smart home cabling and solar panel mounting have been completed\n- HVAC commissioning is scheduled for August 2026\n- Imported Italian marble and timber joinery are on order\n\n**Estimated handover:** September 2026 (on track)\n\nWould you like to see the latest construction photos or review your upcoming payment schedule?',
        timestamp: '2026-05-18T14:00:08Z',
        metadata: { responseTime: 1840, sourceCount: 3, workflowStatus: 'completed' },
      },
    ],
    createdAt: '2026-05-18T14:00:00Z', updatedAt: '2026-05-18T14:00:08Z',
  },
  {
    id: 'chat_002', investorId: 'inv_michael_anderson_001',
    title: 'Payment Questions',
    messages: [
      {
        id: 'msg_003', role: 'user',
        content: 'When is my next payment due?',
        timestamp: '2026-05-19T09:30:00Z',
      },
      {
        id: 'msg_004', role: 'assistant',
        content: '## Upcoming Payment Schedule\n\nYou have **3 upcoming payments** across your portfolio:\n\n| Invoice | Project | Due Date | Amount |\n|---|---|---|---|\n| INV-2026-0055 | Seminyak V12 (Mgmt Fee) | **15 May 2026** ⚠️ | AUD $8,500 |\n| INV-2026-0041 | Seminyak V12 (Inst. 4/6) | 30 Jun 2026 | AUD $127,500 |\n| INV-2026-0028 | Canggu A17 (Inst. 2/6) | 15 Jul 2026 | AUD $102,750 |\n\n> ⚠️ **Action Required:** Your property management fee of **AUD $8,500** is currently overdue. Please arrange payment to avoid late fees.\n\nYour preferred payment bank is **Commonwealth Bank of Australia** (CTBAAU2S). Would you like the full wire transfer details?',
        timestamp: '2026-05-19T09:30:06Z',
        metadata: { responseTime: 1620, sourceCount: 4, workflowStatus: 'completed' },
      },
    ],
    createdAt: '2026-05-19T09:30:00Z', updatedAt: '2026-05-19T09:30:06Z',
  },
]
