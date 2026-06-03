import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, Crown, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/features/auth/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        navigate('/portal/dashboard')
      } else {
        setError('Invalid email or password. Use the demo credentials below.')
      }
    } catch {
      setError('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemo = () => {
    setEmail('investor@xyzproperties.com')
    setPassword('Investor123!')
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540541338537-1220205ac2cb?w=1600&q=90)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-navy-950/90" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-navy-600/20 rounded-full blur-3xl" />

      {/* Back to Home */}
      <Link to="/" className="absolute top-6 left-6 text-navy-200 hover:text-white text-sm flex items-center gap-2 transition-colors">
        ← Back to Website
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card */}
        <div className="navy-glass p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center mb-4 shadow-gold">
              <Crown className="w-7 h-7 text-navy-900" />
            </div>
            <h1 className="font-display font-bold text-2xl text-white">Investor Portal</h1>
            <p className="text-navy-300 text-sm mt-1">XYZ Properties · Bali</p>
          </div>

          {/* Dummy user hint */}
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              fillDemo();
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full mb-6 p-3 bg-gold-500/10 border border-gold-500/30 rounded-xl text-center group cursor-pointer"
          >
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">Dummy User Login</p>
            <p className="text-navy-200 text-xs">investor@xyzproperties.com · Investor123!</p>
            <p className="text-gold-500/70 text-[10px] mt-1 group-hover:text-gold-400 transition-colors">Click to auto-fill →</p>
          </motion.button>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-xs">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-navy-200 text-xs font-medium mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-navy-800/60 border border-navy-600/60 text-white placeholder:text-navy-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/60 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-navy-200 text-xs font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-navy-800/60 border border-navy-600/60 text-white placeholder:text-navy-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-navy-600 bg-navy-800 accent-gold-500"
                />
                <span className="text-navy-300 text-xs">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-gold-400 text-xs hover:text-gold-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 gold-gradient text-navy-900 font-semibold rounded-xl shadow-gold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Access Investor Portal'
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-navy-400 text-xs mt-6">
          © 2026 XYZ Properties Bali · All rights reserved
        </p>
      </motion.div>
    </div>
  )
}
