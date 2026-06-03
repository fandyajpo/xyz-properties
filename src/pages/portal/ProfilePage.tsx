import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Shield, Save, Loader2, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react'
import { PageHeader } from '@/components/shared'
import { useAuth } from '@/features/auth/AuthContext'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({
    fullName: user?.fullName ?? '', email: user?.email ?? '', phone: user?.phone ?? '',
    nationality: user?.nationality ?? '', address: user?.address ?? '',
    city: user?.city ?? '', state: user?.state ?? '', postcode: user?.postcode ?? '',
  })

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000) }, 1200)
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <PageHeader title="Profile" subtitle="Manage your personal information and security" />

      {/* Personal Info */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold font-display">{user?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
          </div>
          <div>
            <h2 className="font-display font-bold text-navy-900 text-lg">{user?.fullName}</h2>
            <p className="text-slate-500 text-sm">{user?.email}</p>
            <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
              {user?.tier} Member · Since {user?.memberSince ? new Date(user.memberSince).getFullYear() : '2023'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', key: 'fullName', icon: User },
            { label: 'Email Address', key: 'email', icon: User, disabled: true },
            { label: 'Phone Number', key: 'phone', icon: User },
            { label: 'Nationality', key: 'nationality', icon: User },
            { label: 'Address', key: 'address', icon: User },
            { label: 'City', key: 'city', icon: User },
            { label: 'State', key: 'state', icon: User },
            { label: 'Postcode', key: 'postcode', icon: User },
          ].map(({ label, key, disabled }) => (
            <div key={key}>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">{label}</label>
              <input
                value={form[key as keyof typeof form]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                disabled={disabled}
                className={cn('input-field', disabled && 'bg-slate-50 text-slate-400 cursor-not-allowed')}
              />
            </div>
          ))}
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-navy-600" />
          </div>
          <div>
            <h2 className="font-display font-bold text-navy-900">Security</h2>
            <p className="text-slate-500 text-xs">Change your password</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1.5 block">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type={showOld ? 'text' : 'password'} placeholder="••••••••" className="input-field pl-10 pr-10" />
              <button type="button" onClick={() => setShowOld(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1.5 block">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type={showNew ? 'text' : 'password'} placeholder="••••••••" className="input-field pl-10 pr-10" />
              <button type="button" onClick={() => setShowNew(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
          Update Password
        </button>
      </motion.div>
    </div>
  )
}
