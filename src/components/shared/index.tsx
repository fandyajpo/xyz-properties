import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({ end, duration = 1500, prefix = '', suffix = '', decimals = 0, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true)
        const startTime = Date.now()
        const tick = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * end * Math.pow(10, decimals)) / Math.pow(10, decimals))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(end)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, decimals, hasStarted])

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : count >= 1000000
    ? (count / 1000000).toFixed(1) + 'M'
    : count >= 1000
    ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + 'K'
    : count.toLocaleString()

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  )
}

interface KPICardProps {
  title: string
  value: string
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  iconBg: string
  delay?: number
  subtitle?: string
}

export function KPICard({ title, value, change, changeType = 'up', icon, iconBg, delay = 0, subtitle }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="kpi-card group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-display font-bold text-navy-900 mt-1">{value}</p>
          {subtitle && <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>}
        </div>
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1.5">
          <span className={cn('text-xs font-semibold', changeType === 'up' ? 'text-emerald-600' : changeType === 'down' ? 'text-red-500' : 'text-slate-500')}>
            {changeType === 'up' ? '▲' : changeType === 'down' ? '▼' : '●'} {change}
          </span>
          <span className="text-xs text-slate-400">vs last quarter</span>
        </div>
      )}
      {/* Subtle gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants: Record<string, string> = {
    paid: 'status-paid',
    pending: 'status-pending',
    overdue: 'status-overdue',
    approved: 'status-approved',
    completed: 'status-completed',
    construction: 'status-progress',
    planning: 'bg-blue-50 text-blue-700 border border-blue-200',
    active: 'status-approved',
    open: 'status-pending',
    resolved: 'status-paid',
    converted: 'status-paid',
    in_progress: 'status-progress',
    upcoming: 'bg-slate-50 text-slate-600 border border-slate-200',
    sold_out: 'bg-slate-100 text-slate-500 border border-slate-200',
  }

  const labels: Record<string, string> = {
    in_progress: 'In Progress',
    sold_out: 'Sold Out',
  }

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
      variants[status.toLowerCase()] || 'bg-slate-100 text-slate-600',
      className
    )}>
      {labels[status.toLowerCase()] || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="page-header text-2xl">{title}</h1>
        {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('premium-card p-6 space-y-4', className)}>
      <div className="shimmer h-4 w-3/4 rounded" />
      <div className="shimmer h-8 w-1/2 rounded" />
      <div className="shimmer h-3 w-full rounded" />
      <div className="shimmer h-3 w-2/3 rounded" />
    </div>
  )
}

export function EmptyState({ icon, title, message, action }: {
  icon: React.ReactNode
  title: string
  message: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-navy-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm max-w-sm">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
