import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, Clock, TrendingUp, Building2, ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/shared'
import { dummyNews } from '@/dummy/news'
import { formatDate, cn } from '@/lib/utils'

export default function NewsPage() {
  const [filter, setFilter] = useState<string>('all')
  const categories = [
    { id: 'all', label: 'All News' },
    { id: 'market', label: 'Market Updates', icon: TrendingUp },
    { id: 'company', label: 'Company News', icon: Building2 },
    { id: 'investment', label: 'Investment Insights', icon: Newspaper },
  ]

  const filteredNews = filter === 'all' ? dummyNews : dummyNews.filter(n => n.category === filter)
  const featured = filteredNews.find(n => n.featured) || filteredNews[0]
  const rest = filteredNews.filter(n => n.id !== featured?.id)

  return (
    <div className="p-6 max-w-7xl space-y-6">
      <PageHeader title="Investor News" subtitle="Latest updates from XYZ Properties and the Bali real estate market" />

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2',
              filter === id ? 'bg-navy-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Featured Article */}
          {featured && (
            <div className="premium-card overflow-hidden group cursor-pointer relative">
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent z-10" />
              <img src={featured.imageUrl} onError={(e) => { e.currentTarget.src = "https://placehold.co/800x400/f1f5f9/94a3b8?text=Image+Not+Found" }} alt={featured.title} className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-gold-500 text-navy-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">Featured</span>
                  <span className="text-white/80 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime} min read</span>
                </div>
                <h2 className="font-display font-bold text-white text-2xl sm:text-3xl mb-3 leading-tight">{featured.title}</h2>
                <p className="text-navy-100 text-sm sm:text-base max-w-3xl line-clamp-2 sm:line-clamp-none">{featured.summary}</p>
                <div className="flex items-center gap-4 mt-6">
                  <span className="text-white text-xs font-medium">{featured.author}</span>
                  <span className="text-white/60 text-xs">•</span>
                  <span className="text-white/80 text-xs">{formatDate(featured.publishedAt)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Grid Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((news, i) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="premium-card overflow-hidden group cursor-pointer flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={news.imageUrl} onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found" }} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-navy-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
                    {news.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{news.readTime} min read</span>
                    <span>•</span>
                    <span>{formatDate(news.publishedAt)}</span>
                  </div>
                  <h3 className="font-display font-bold text-navy-900 text-lg mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-1">{news.summary}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold text-navy-800">{news.author}</span>
                    <span className="text-gold-500 group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
