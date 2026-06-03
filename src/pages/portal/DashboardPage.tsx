import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  TrendingUp, Wallet, Building2, CalendarClock, AlertTriangle,
  ArrowUpRight, CreditCard, Bot, ChevronRight, MapPin
} from 'lucide-react'
import { PageHeader, KPICard, StatusBadge } from '@/components/shared'
import { useAuth } from '@/features/auth/AuthContext'
import { dummyInvestorProjects } from '@/dummy/projects'
import { dummyPayments } from '@/dummy/payments'
import { dummyNotifications } from '@/dummy/notifications'
import { formatCurrency, formatDate, cn } from '@/lib/utils'

export default function DashboardPage() {
  const { user } = useAuth()
  const totalValue = dummyInvestorProjects.reduce((s, p) => s + p.currentValue, 0)
  const totalInvested = dummyInvestorProjects.reduce((s, p) => s + p.purchasePrice, 0)
  const totalGain = totalValue - totalInvested
  const gainPercent = ((totalGain / totalInvested) * 100).toFixed(1)
  const pendingPayments = dummyPayments.filter(p => p.status === 'pending' || p.status === 'overdue')
  const overduePayments = dummyPayments.filter(p => p.status === 'overdue')
  const unreadNotifs = dummyNotifications.filter(n => !n.isRead)

  return (
    <div className="p-6 max-w-7xl space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.fullName?.split(' ')[0] ?? 'Investor'}`}
        subtitle="Here's an overview of your investment portfolio"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Portfolio Value"
          value={formatCurrency(totalValue)}
          change={`+${gainPercent}%`}
          changeType="up"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          iconBg="bg-emerald-50"
          delay={0}
        />
        <KPICard
          title="Total Invested"
          value={formatCurrency(totalInvested)}
          subtitle={`${dummyInvestorProjects.length} properties`}
          icon={<Wallet className="w-5 h-5 text-navy-600" />}
          iconBg="bg-navy-50"
          delay={0.05}
        />
        <KPICard
          title="Capital Gain"
          value={formatCurrency(totalGain)}
          change={`+${gainPercent}%`}
          changeType="up"
          icon={<ArrowUpRight className="w-5 h-5 text-gold-600" />}
          iconBg="bg-gold-50"
          delay={0.1}
        />
        <KPICard
          title="Pending Payments"
          value={formatCurrency(pendingPayments.reduce((s, p) => s + p.amount, 0))}
          subtitle={`${pendingPayments.length} invoices`}
          change={overduePayments.length > 0 ? `${overduePayments.length} overdue` : undefined}
          changeType="down"
          icon={<CreditCard className="w-5 h-5 text-amber-600" />}
          iconBg="bg-amber-50"
          delay={0.15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Properties */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 premium-card p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-navy-900">My Properties</h2>
            <Link to="/portal/portfolio" className="text-xs text-navy-500 hover:text-navy-700 font-medium flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {dummyInvestorProjects.map((inv, i) => (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
              >
                <img
                  src={inv.project.imageUrl}
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/150x150/f1f5f9/94a3b8?text=Img" }}
                  alt={inv.project.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-900 text-sm truncate">{inv.project.name}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {inv.project.location} · Unit {inv.unitNumber}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display font-bold text-navy-900 text-sm">{formatCurrency(inv.currentValue)}</p>
                  <p className={cn('text-xs font-medium', inv.currentValue > inv.purchasePrice ? 'text-emerald-600' : 'text-red-500')}>
                    {inv.currentValue > inv.purchasePrice ? '▲' : '▼'} {formatCurrency(inv.currentValue - inv.purchasePrice)}
                  </p>
                </div>
                <StatusBadge status={inv.status} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Overdue Alert */}
          {overduePayments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-red-800 text-sm">Overdue Payment</p>
                  <p className="text-red-600 text-xs">{overduePayments.length} payment(s) overdue</p>
                </div>
              </div>
              {overduePayments.map(p => (
                <div key={p.id} className="bg-white rounded-xl p-3 border border-red-100">
                  <p className="font-medium text-navy-900 text-xs">{p.projectName}</p>
                  <p className="text-red-600 font-display font-bold text-sm mt-0.5">{formatCurrency(p.amount)}</p>
                  <p className="text-red-400 text-[11px]">Due {formatDate(p.dueDate)}</p>
                </div>
              ))}
              <Link to="/portal/payments" className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                View Payments <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          )}

          {/* Recent Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="premium-card p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-navy-900 text-sm">Recent Alerts</h3>
              <Link to="/portal/notifications" className="text-xs text-navy-500 hover:text-navy-700 font-medium flex items-center gap-1">
                All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {unreadNotifs.slice(0, 3).map(n => (
                <Link key={n.id} to={n.link || '#'} className="block p-3 rounded-xl bg-amber-50/50 border border-amber-100 hover:bg-amber-50 transition-colors">
                  <p className="font-semibold text-navy-900 text-xs">{n.title}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-2">{n.message}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="premium-card p-5 space-y-3"
          >
            <h3 className="font-display font-bold text-navy-900 text-sm">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Bot, label: 'AI Assistant', to: '/portal/ai-chat', bg: 'bg-violet-50 text-violet-600' },
                { icon: CalendarClock, label: 'Visit Plan', to: '/portal/visit-plan', bg: 'bg-blue-50 text-blue-600' },
                { icon: Building2, label: 'Construction', to: '/portal/construction', bg: 'bg-emerald-50 text-emerald-600' },
                { icon: CreditCard, label: 'Payments', to: '/portal/payments', bg: 'bg-amber-50 text-amber-600' },
              ].map(({ icon: Icon, label, to, bg }) => (
                <Link key={to} to={to} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', bg)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-navy-800 group-hover:text-navy-900">{label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
