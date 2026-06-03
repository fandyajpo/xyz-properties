import React from 'react'
import { motion } from 'framer-motion'
import { Crown, Star, Gift, Check, ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/shared'
import { useAuth } from '@/features/auth/AuthContext'
import { cn } from '@/lib/utils'

export default function RewardsPage() {
  const { user } = useAuth()
  const currentPoints = user?.rewardPoints || 0
  
  const tiers = [
    { name: 'Silver', min: 0, max: 2000, color: 'text-slate-400', bg: 'bg-slate-100', border: 'border-slate-200', benefits: ['Priority project updates', 'Quarterly portfolio reports', 'Basic concierge service'] },
    { name: 'Gold', min: 2000, max: 10000, color: 'text-gold-500', bg: 'bg-gold-50', border: 'border-gold-200', benefits: ['Free airport transfers (2x/year)', '2 nights free stay at any property', 'Dedicated portfolio manager', 'VIP event invitations'] },
    { name: 'Platinum', min: 10000, max: 999999, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', benefits: ['Free airport transfers (Unlimited)', '7 nights free stay at any property', 'Free helicopter transfer (1x/year)', 'Director-level direct access', 'First-refusal on new projects'] },
  ]

  const currentTier = tiers.find(t => currentPoints >= t.min && currentPoints < t.max) || tiers[0]
  const nextTier = tiers[tiers.indexOf(currentTier) + 1]
  const progressToNext = nextTier ? ((currentPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100

  return (
    <div className="p-6 max-w-6xl space-y-6">
      <PageHeader title="XYZ Rewards" subtitle="Exclusive benefits for our valued investors" />

      {/* Hero Status */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={cn("premium-card p-8 border-t-4 relative overflow-hidden", currentTier.border)}>
        <div className="absolute -right-10 -top-10 opacity-5">
          <Crown className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Current Tier</p>
            <h2 className={cn("font-display font-bold text-4xl mb-2", currentTier.color)}>{currentTier.name} Member</h2>
            <p className="text-navy-900 font-bold text-xl flex items-center justify-center md:justify-start gap-2">
              <Star className="w-5 h-5 text-gold-500 fill-gold-500" /> {currentPoints.toLocaleString()} points
            </p>
          </div>
          
          {nextTier && (
            <div className="flex-1 w-full bg-white/50 rounded-2xl p-6 border border-slate-100">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className={currentTier.color}>{currentTier.name}</span>
                <span className={nextTier.color}>{nextTier.name}</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div className={cn("h-full transition-all duration-1000", currentTier.name === 'Gold' ? 'bg-gold-500' : 'bg-slate-400')} style={{ width: `${progressToNext}%` }} />
              </div>
              <p className="text-xs text-slate-500 text-center md:text-left">Earn {(nextTier.min - currentPoints).toLocaleString()} more points to reach {nextTier.name} tier.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tier Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, i) => {
          const isCurrent = tier.name === currentTier.name
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={cn("premium-card p-6 transition-all duration-300", isCurrent ? `ring-2 ring-offset-2 ring-${tier.name === 'Gold' ? 'gold-400' : tier.name === 'Platinum' ? 'blue-400' : 'slate-300'} shadow-lg scale-105 z-10` : 'opacity-70 hover:opacity-100')}
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", tier.bg)}>
                <Crown className={cn("w-6 h-6", tier.color)} />
              </div>
              <h3 className="font-display font-bold text-navy-900 text-xl mb-1">{tier.name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">{tier.min.toLocaleString()}+ points</p>
              
              <ul className="space-y-3">
                {tier.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-navy-800">
                    <Check className={cn("w-4 h-4 mt-0.5 flex-shrink-0", tier.color)} />
                    {b}
                  </li>
                ))}
              </ul>

              {isCurrent && (
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Your Current Tier</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Earn Points */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="premium-card p-6 bg-slate-50 border-dashed">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-5 h-5 text-gold-500" />
          <h3 className="font-display font-bold text-navy-900">How to earn points</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { a: 'Purchase Property', p: '1 pt per $100 spent' },
            { a: 'Refer a Friend', p: '2,000 pts per success' },
            { a: 'Early Payment', p: '100 pts per invoice' },
            { a: 'Annual Anniversary', p: '500 pts' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <p className="font-semibold text-navy-900 text-sm mb-1">{item.a}</p>
              <p className="text-gold-600 font-bold text-xs">{item.p}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
