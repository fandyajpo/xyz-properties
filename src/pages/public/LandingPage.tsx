import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Shield, Building2, TrendingUp, Users, MapPin, CheckCircle2, Star, ArrowRight } from 'lucide-react'
import { dummyProjects } from '@/dummy/projects'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-gold">
              <span className="text-navy-900 font-display font-bold text-xl">X</span>
            </div>
            <span className="font-display font-bold text-xl text-navy-900 hidden sm:block">XYZ Properties</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#why-us" className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors">Why Invest</a>
            <a href="#journey" className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors">Investment Journey</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-navy-900 hover:text-navy-700 transition-colors hidden sm:block">Sign In</Link>
            <Link to="/login" className="btn-primary shadow-premium hover:shadow-premium-lg">Investor Portal</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?w=2000&q=80" onError={(e) => { e.currentTarget.src = "https://placehold.co/2000x1000/0f172a/334155?text=Image+Not+Found" }} alt="Luxury Bali Villa" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider mb-6">
              Bali's Premier Developer
            </span>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-white leading-[1.1] mb-6">
              Invest in Bali with <span className="gradient-text">Confidence.</span>
            </h1>
            <p className="text-lg text-navy-200 mb-10 leading-relaxed max-w-xl">
              Premium property investment opportunities designed specifically for Australian and global high-net-worth investors. Seamless, transparent, and highly profitable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="btn-gold text-center py-4 px-8 text-lg flex items-center justify-center gap-2">
                Access Investor Portal <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credibility Stats */}
      <section className="bg-navy-900 py-12 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '12+', label: 'Years Experience' },
              { value: '24', label: 'Projects Completed' },
              { value: '14.2%', label: 'Avg. ROI Delivered' },
              { value: '850+', label: 'Active Investors' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <p className="font-display font-bold text-4xl text-gold-400 mb-2">{stat.value}</p>
                <p className="text-sm font-medium text-navy-200 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy-900 mb-4">The XYZ Advantage</h2>
            <p className="text-slate-600 text-lg">Why over 850 Australian investors trust us with their Bali property portfolios.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'End-to-End Legal Protection', desc: 'Secure structuring utilizing PMA (Foreign Investment Company) or Hak Pakai titles, fully compliant with Indonesian law and optimized for Australian tax residency.' },
              { icon: Building2, title: 'Transparent Construction', desc: 'Monitor your investment via our proprietary investor portal. View live updates, milestone progress, and financial reports from anywhere in the world.' },
              { icon: TrendingUp, title: 'Turnkey Management', desc: 'Our in-house hospitality division handles everything from furnishing to marketing and guest relations, ensuring maximum occupancy and yield.' },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-premium transition-all">
                <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-6 shadow-gold">
                  <f.icon className="w-7 h-7 text-navy-900" />
                </div>
                <h3 className="font-display font-bold text-xl text-navy-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Trusted by Australian Investors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Jenkins', role: 'Property Investor, Sydney', quote: "The transparency provided by the XYZ portal is unmatched. I track my Uluwatu villa's construction and payments seamlessly from my phone.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
              { name: 'David & Emma Thompson', role: 'SMSF Trustees, Melbourne', quote: "XYZ handled the complex legal structuring for our SMSF perfectly. Our Canggu investment is currently yielding 14% net, far exceeding our domestic portfolio.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" },
              { name: 'Marcus Wong', role: 'Entrepreneur, Brisbane', quote: "What impressed me most was the post-handover management. The turnkey solution means I just log in to check my monthly distributions. Completely hassle-free.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" },
            ].map((t, i) => (
              <div key={i} className="bg-navy-800/50 border border-navy-700 p-8 rounded-2xl">
                <div className="flex gap-1 mb-6 text-gold-400">
                  <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-navy-100 text-lg leading-relaxed mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} onError={(e) => { e.currentTarget.src = "https://placehold.co/150x150/0f172a/334155?text=User" }} alt="" className="w-12 h-12 rounded-full border-2 border-navy-600" />
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-xs text-navy-300">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-navy-300 py-16 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
                <span className="text-navy-900 font-display font-bold text-lg">X</span>
              </div>
              <span className="font-display font-bold text-xl text-white">XYZ Properties</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Bali's premier luxury property developer, specializing in high-yield investment opportunities for the discerning global investor.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 rounded-full bg-navy-800 hover:bg-gold-500 hover:text-navy-900 transition-colors cursor-pointer flex items-center justify-center">in</div>
              <div className="w-8 h-8 rounded-full bg-navy-800 hover:bg-gold-500 hover:text-navy-900 transition-colors cursor-pointer flex items-center justify-center">fb</div>
              <div className="w-8 h-8 rounded-full bg-navy-800 hover:bg-gold-500 hover:text-navy-900 transition-colors cursor-pointer flex items-center justify-center">ig</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Offices</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <strong className="block text-white mb-1">Bali Head Office</strong>
                Sunset Road No. 88, Seminyak, Bali, Indonesia
              </li>
              <li>
                <strong className="block text-white mb-1">Sydney Advisory Office</strong>
                Level 24, 100 Barangaroo Ave, Sydney NSW 2000
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Investment Disclaimer</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Foreign Ownership Guide</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-navy-800/50 text-xs text-center">
          <p>© 2026 XYZ Properties Bali. All rights reserved. This platform is a demonstration environment.</p>
        </div>
      </footer>
    </div>
  )
}
