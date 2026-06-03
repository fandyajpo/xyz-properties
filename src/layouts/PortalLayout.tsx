import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Bell, Search } from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import { useAuth } from '@/features/auth/AuthContext'
import { dummyNotifications } from '@/dummy/notifications'
import { cn, getGreeting, getInitials } from '@/lib/utils'

export function PortalLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()
  const unread = dummyNotifications.filter(n => !n.isRead).length

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(p => !p)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center px-4 gap-4 flex-shrink-0 shadow-sm z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 hidden md:flex items-center gap-3 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search portfolio, documents..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500/20 focus:border-navy-300 transition-all"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-slate-500">{getGreeting()},</span>
              <span className="text-sm font-semibold text-navy-900">{user?.fullName?.split(' ')[0]}</span>
            </div>

            <button className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 text-navy-900 text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>

            <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center cursor-pointer">
              <span className="text-white text-xs font-bold">
                {user ? getInitials(user.fullName) : 'MA'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
