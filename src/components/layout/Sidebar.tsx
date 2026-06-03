import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Briefcase, User, Building2, MapPin, FolderOpen,
  Bot, Newspaper, HardHat, Bell, CreditCard, Users, Gift, HeadphonesIcon,
  ChevronLeft, ChevronRight, LogOut, Crown, Menu, Database, ShieldAlert
} from 'lucide-react'
import { cn, getInitials } from '@/lib/utils'
import { useAuth } from '@/features/auth/AuthContext'
import { dummyNotifications } from '@/dummy/notifications'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/portal/dashboard' },
  { icon: Briefcase, label: 'My Portfolio', to: '/portal/portfolio' },
  { icon: User, label: 'Profile', to: '/portal/profile' },
  { icon: Building2, label: 'Bank Details', to: '/portal/bank' },
  { icon: MapPin, label: 'Bali Visit Plan', to: '/portal/visit-plan' },
  { icon: FolderOpen, label: 'Documents', to: '/portal/documents' },
  { icon: Bot, label: 'AI FAQ Assistant', to: '/portal/ai-chat' },
  { icon: Newspaper, label: 'News', to: '/portal/news' },
  { icon: HardHat, label: 'Construction Updates', to: '/portal/construction' },
  { icon: Bell, label: 'Notifications', to: '/portal/notifications' },
  { icon: CreditCard, label: 'Payment Schedule', to: '/portal/payments' },
  { icon: Users, label: 'Referral', to: '/portal/referral' },
  { icon: Gift, label: 'Rewards', to: '/portal/rewards' },
  { icon: HeadphonesIcon, label: 'Support', to: '/portal/support' },
]

const ADMIN_ITEMS = [
  { icon: Database, label: 'Knowledge Base', to: '/portal/admin/knowledge-base' },
]

const TIER_COLORS: Record<string, string> = {
  Silver: 'text-slate-400',
  Gold: 'text-gold-400',
  Platinum: 'text-blue-300',
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const unreadCount = dummyNotifications.filter(n => !n.isRead).length

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-navy-700/50',
        collapsed ? 'justify-center px-2' : ''
      )}>
        <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold">
          <Crown className="w-5 h-5 text-navy-900" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="font-display font-bold text-white text-sm leading-tight whitespace-nowrap">
                XYZ Properties
              </div>
              <div className="text-gold-400 text-[10px] font-medium whitespace-nowrap tracking-wider uppercase">
                Investor Portal
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {NAV_ITEMS.map(({ icon: Icon, label, to }) => {
          const isNotif = to.includes('notifications')
          return (
            <NavLink
              key={to}
              to={to}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn('sidebar-item relative', isActive ? 'sidebar-item-active' : 'sidebar-item-inactive',
                  collapsed ? 'justify-center px-2' : '')
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-gold-400' : '')} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="truncate overflow-hidden whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isNotif && unreadCount > 0 && (
                    <span className={cn(
                      'ml-auto bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0',
                      collapsed ? 'absolute -top-1 -right-1 w-4 h-4' : 'w-5 h-5'
                    )}>
                      {unreadCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Admin Section – only visible when user.isAdmin */}
      {user?.isAdmin && (
        <div className="px-2 pb-2">
          <div className={cn(
            'flex items-center gap-2 px-3 py-1.5 mb-1',
            collapsed ? 'justify-center' : ''
          )}>
            {!collapsed && (
              <>
                <ShieldAlert className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Admin</span>
              </>
            )}
            {collapsed && <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />}
          </div>
          {ADMIN_ITEMS.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn('sidebar-item relative', isActive ? 'sidebar-item-active' : 'sidebar-item-inactive',
                  collapsed ? 'justify-center px-2' : '')
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-gold-400' : 'text-amber-400/80')} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="truncate overflow-hidden whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </div>
      )}

      {/* User Info */}
      <div className="border-t border-navy-700/50 p-3 space-y-2">
        {!collapsed && user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 px-2 py-2"
          >
            <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center flex-shrink-0">
              <span className="text-gold-400 text-xs font-bold">{getInitials(user.fullName)}</span>
            </div>
            <div className="min-w-0">
              <div className="text-white text-xs font-semibold truncate">{user.fullName}</div>
              <div className={cn('text-[10px] font-medium', TIER_COLORS[user.tier])}>
                {user.tier} Member
              </div>
            </div>
          </motion.div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-navy-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-sm',
            collapsed ? 'justify-center' : ''
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col h-screen bg-navy-900 border-r border-navy-700/50 sticky top-0 overflow-hidden flex-shrink-0"
      >
        {sidebarContent}
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute top-5 -right-3 w-6 h-6 bg-navy-800 border border-navy-600 rounded-full flex items-center justify-center text-navy-300 hover:text-white transition-colors z-10 shadow-md"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden fixed left-0 top-0 h-full w-64 bg-navy-900 border-r border-navy-700/50 z-50 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
