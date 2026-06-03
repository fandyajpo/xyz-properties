import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, TrendingUp, Building2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { PageHeader, KPICard, StatusBadge } from '@/components/shared'
import { dummyInvestorProjects, dummyProjects } from '@/dummy/projects'
import { formatCurrency, formatPercent, cn } from '@/lib/utils'

export default function PortfolioPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const totalValue = dummyInvestorProjects.reduce((s, p) => s + p.currentValue, 0)
  const totalInvested = dummyInvestorProjects.reduce((s, p) => s + p.purchasePrice, 0)
  const totalGain = totalValue - totalInvested
  const avgROI = dummyInvestorProjects.reduce((s, p) => s + p.project.expectedROI, 0) / dummyInvestorProjects.length

  return (
    <div className="p-6 max-w-7xl space-y-6">
      <PageHeader title="My Portfolio" subtitle="Manage and monitor your property investments" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Total Portfolio" value={formatCurrency(totalValue)} change={`+${((totalGain / totalInvested) * 100).toFixed(1)}%`} changeType="up" icon={<TrendingUp className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" delay={0} />
        <KPICard title="Capital Gain" value={formatCurrency(totalGain)} icon={<Building2 className="w-5 h-5 text-gold-600" />} iconBg="bg-gold-50" delay={0.05} />
        <KPICard title="Avg. Expected ROI" value={formatPercent(avgROI)} icon={<TrendingUp className="w-5 h-5 text-navy-600" />} iconBg="bg-navy-50" delay={0.1} />
      </div>

      {/* Property Cards */}
      <div className="space-y-4">
        {dummyInvestorProjects.map((inv, i) => {
          const gain = inv.currentValue - inv.purchasePrice
          const gainPct = ((gain / inv.purchasePrice) * 100).toFixed(1)
          const expanded = expandedId === inv.id

          return (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="premium-card overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <img src={inv.project.imageUrl} onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found" }} alt={inv.project.name} className="w-full md:w-56 h-48 md:h-auto object-cover" />
                <div className="flex-1 p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-navy-900 text-lg">{inv.project.name}</h3>
                      <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {inv.project.location} · Unit {inv.unitNumber}</p>
                    </div>
                    <StatusBadge status={inv.status} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Purchase Price', val: formatCurrency(inv.purchasePrice) },
                      { label: 'Current Value', val: formatCurrency(inv.currentValue) },
                      { label: 'Capital Gain', val: `${formatCurrency(gain)} (${gainPct}%)`, color: gain >= 0 ? 'text-emerald-600' : 'text-red-500' },
                      { label: 'Expected ROI', val: formatPercent(inv.project.expectedROI) },
                    ].map(({ label, val, color }) => (
                      <div key={label}>
                        <p className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">{label}</p>
                        <p className={cn('font-display font-bold text-sm mt-0.5', color || 'text-navy-900')}>{val}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setExpandedId(expanded ? null : inv.id)} className="text-xs text-navy-500 hover:text-navy-700 font-medium flex items-center gap-1 mt-2">
                    {expanded ? 'Hide Details' : 'Show Details'} {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="pt-3 border-t border-slate-100 space-y-2">
                      <p className="text-slate-600 text-sm leading-relaxed">{inv.project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {inv.project.features.map(f => (
                          <span key={f} className="text-[10px] font-medium bg-navy-50 text-navy-600 px-2.5 py-1 rounded-full">{f}</span>
                        ))}
                      </div>
                      {inv.project.completionPercent < 100 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">Construction Progress</span>
                            <span className="font-semibold text-navy-900">{inv.project.completionPercent}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-navy-600 to-gold-500 rounded-full transition-all" style={{ width: `${inv.project.completionPercent}%` }} />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Other Projects */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
        <h2 className="font-display font-bold text-navy-900">Explore New Investments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyProjects.filter(p => !dummyInvestorProjects.find(ip => ip.projectId === p.id)).map(proj => (
            <div key={proj.id} className="premium-card overflow-hidden flex">
              <img src={proj.imageUrl} onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found" }} alt={proj.name} className="w-32 h-full object-cover flex-shrink-0" />
              <div className="p-4 flex-1 space-y-2">
                <h3 className="font-display font-bold text-navy-900 text-sm">{proj.name}</h3>
                <p className="text-slate-500 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> {proj.location}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-emerald-600 font-semibold">ROI {formatPercent(proj.expectedROI)}</span>
                  <StatusBadge status={proj.status} />
                </div>
                <p className="text-slate-500 text-[11px]">From {formatCurrency(proj.priceMin)} · {proj.availableUnits} units left</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
