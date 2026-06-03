import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Check, Trash2, CreditCard, Building2, FileText, UserCircle, Settings } from 'lucide-react'
import { PageHeader } from '@/components/shared'
import { dummyNotifications } from '@/dummy/notifications'
import { formatDate, cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(dummyNotifications)

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  const getIcon = (type: string) => {
    switch(type) {
      case 'payment': return <CreditCard className="w-5 h-5 text-amber-500" />
      case 'project': return <Building2 className="w-5 h-5 text-emerald-500" />
      case 'document': return <FileText className="w-5 h-5 text-blue-500" />
      case 'referral': return <UserCircle className="w-5 h-5 text-violet-500" />
      case 'support': return <Settings className="w-5 h-5 text-slate-500" />
      default: return <Bell className="w-5 h-5 text-navy-500" />
    }
  }

  const getBg = (type: string) => {
    switch(type) {
      case 'payment': return 'bg-amber-50 border-amber-100'
      case 'project': return 'bg-emerald-50 border-emerald-100'
      case 'document': return 'bg-blue-50 border-blue-100'
      case 'referral': return 'bg-violet-50 border-violet-100'
      default: return 'bg-slate-50 border-slate-100'
    }
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <PageHeader title="Notifications" subtitle="Stay updated on your investments, payments, and account activity">
        <button onClick={markAllAsRead} className="btn-outline flex items-center gap-2 text-xs py-2">
          <Check className="w-4 h-4" /> Mark all read
        </button>
      </PageHeader>

      <div className="space-y-3">
        <AnimatePresence>
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => markAsRead(n.id)}
              className={cn(
                'group p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden',
                n.isRead ? 'bg-white border-slate-100 opacity-70 hover:opacity-100' : `${getBg(n.type)} shadow-sm`
              )}
            >
              {!n.isRead && <div className="absolute top-0 left-0 w-1 h-full bg-gold-500" />}
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-1 mb-1">
                    <h3 className={cn("text-sm", n.isRead ? "font-medium text-navy-800" : "font-bold text-navy-900")}>
                      {n.title}
                    </h3>
                    <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                      {formatDate(n.createdAt)}
                    </span>
                  </div>
                  <p className={cn("text-sm", n.isRead ? "text-slate-500" : "text-navy-700")}>
                    {n.message}
                  </p>
                  
                  {n.link && !n.isRead && (
                    <div className="mt-3">
                      <Link to={n.link} className="inline-flex items-center text-xs font-bold text-navy-600 hover:text-navy-800 bg-white px-3 py-1.5 rounded border border-navy-100 hover:border-navy-300 transition-colors">
                        View Details
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
