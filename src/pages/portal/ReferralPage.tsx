import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Copy, CheckCircle2, Gift, Send } from 'lucide-react'
import { PageHeader, KPICard, StatusBadge } from '@/components/shared'
import { dummyReferrals } from '@/dummy/support'
import { useAuth } from '@/features/auth/AuthContext'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function ReferralPage() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.referralCode || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalEarned = dummyReferrals.filter(r => r.status === 'converted').reduce((s, r) => s + r.reward, 0)

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <PageHeader title="Referral Program" subtitle="Invite friends to invest with XYZ Properties and earn rewards" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 sm:p-8 bg-gradient-to-br from-navy-900 to-navy-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-display font-bold text-2xl mb-2">Share the XYZ Experience</h2>
              <p className="text-navy-200 text-sm mb-8 max-w-md">Earn AUD $2,500 for every successful referral that purchases a property with XYZ Properties Bali. Your friend will also receive a $1,000 furnishing voucher.</p>
              
              <div className="bg-navy-950/50 border border-navy-700/50 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full text-center sm:text-left">
                  <p className="text-[10px] text-navy-300 font-bold uppercase tracking-wider mb-1">Your Referral Code</p>
                  <p className="font-mono text-gold-400 text-xl font-bold tracking-widest">{user?.referralCode}</p>
                </div>
                <button onClick={handleCopy} className="w-full sm:w-auto btn-gold py-2.5 flex items-center justify-center gap-2 text-sm">
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6">
            <h3 className="font-display font-bold text-navy-900 mb-4">Invite via Email</h3>
            <div className="flex gap-3">
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="friend@email.com" 
                className="input-field flex-1"
              />
              <button className="btn-primary flex items-center gap-2">
                <Send className="w-4 h-4" /> Send Invite
              </button>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <KPICard title="Total Earned" value={formatCurrency(totalEarned)} icon={<Gift className="w-5 h-5 text-gold-600" />} iconBg="bg-gold-50" delay={0.2} />
          <KPICard title="Successful Referrals" value={dummyReferrals.filter(r => r.status === 'converted').length.toString()} icon={<Users className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" delay={0.25} />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="premium-card overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-display font-bold text-navy-900 text-lg">Referral History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium text-[11px] uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Referee</th>
                <th className="px-6 py-4">Date Invited</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyReferrals.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-navy-900">{r.refereeName}</p>
                    <p className="text-xs text-slate-500">{r.refereeEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{formatDate(r.createdAt)}</td>
                  <td className="px-6 py-4"><StatusBadge status={r.status} /></td>
                  <td className="px-6 py-4 text-right font-display font-bold text-navy-900">{r.status === 'converted' ? formatCurrency(r.reward) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
