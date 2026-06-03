import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Phone, Mail, ChevronRight, Plus, CheckCircle2, Clock } from 'lucide-react'
import { PageHeader, StatusBadge } from '@/components/shared'
import { dummySupportTickets } from '@/dummy/support'
import { formatDate } from '@/lib/utils'

export default function SupportPage() {
  const [expandedId, setExpandedId] = useState<string | null>(dummySupportTickets[0]?.id || null)

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <PageHeader title="Support & Help Centre" subtitle="We're here to help you with your investment journey">
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 bg-navy-900 text-white flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-gold-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Call Us</h3>
            <p className="text-navy-200 text-xs mb-4">Mon-Fri, 9am - 6pm (WITA)</p>
            <p className="font-bold text-gold-400 text-xl tracking-wider">+62 361 123 4567</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-display font-bold text-navy-900 text-lg mb-1">Email Us</h3>
            <p className="text-slate-500 text-xs mb-4">We usually reply within 24 hrs</p>
            <p className="font-bold text-navy-900 text-sm">investors@xyzproperties.com</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="premium-card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="font-display font-bold text-navy-900 text-lg mb-1">AI Assistant</h3>
            <p className="text-slate-500 text-xs mb-4">Instant answers to FAQs 24/7</p>
            <a href="/portal/ai-chat" className="font-bold text-violet-600 hover:text-violet-700 text-sm flex items-center gap-1">Open Chat <ChevronRight className="w-4 h-4" /></a>
          </motion.div>
        </div>

        {/* Tickets List */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="font-display font-bold text-navy-900 text-lg border-b border-slate-200 pb-2">Your Support Tickets</h2>
          
          <div className="space-y-4">
            {dummySupportTickets.map(tkt => {
              const isExpanded = expandedId === tkt.id
              return (
                <div key={tkt.id} className="premium-card overflow-hidden">
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : tkt.id)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tkt.ticketNumber}</span>
                        <StatusBadge status={tkt.status} />
                        {tkt.priority === 'high' && <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-red-100">High Priority</span>}
                      </div>
                      <h3 className="font-display font-bold text-navy-900">{tkt.subject}</h3>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Updated {formatDate(tkt.updatedAt)}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-slate-100 bg-slate-50/50">
                        <div className="p-5 space-y-6">
                          {/* Original Message */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-navy-200 flex items-center justify-center text-[10px] font-bold text-navy-700">You</div>
                              <span className="text-xs text-slate-400">{formatDate(tkt.createdAt)}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl rounded-tl-none border border-slate-200 shadow-sm text-sm text-navy-800">
                              {tkt.message}
                            </div>
                          </div>

                          {/* Responses */}
                          {tkt.responses.map(resp => (
                            <div key={resp.id} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-[10px] font-bold text-navy-900">XYZ</div>
                                <span className="text-xs font-semibold text-navy-900">{resp.author}</span>
                                <span className="text-xs text-slate-400">{formatDate(resp.createdAt)}</span>
                              </div>
                              <div className="bg-navy-900 text-white p-4 rounded-xl rounded-tl-none shadow-sm text-sm">
                                {resp.message}
                              </div>
                            </div>
                          ))}

                          {tkt.status !== 'resolved' && (
                            <div className="pt-4 border-t border-slate-200 flex gap-3">
                              <input type="text" placeholder="Type your reply..." className="input-field flex-1" />
                              <button className="btn-primary">Reply</button>
                            </div>
                          )}
                          {tkt.status === 'resolved' && (
                            <div className="pt-2 text-center">
                              <p className="text-xs font-medium text-emerald-600 flex items-center justify-center gap-1"><CheckCircle2 className="w-4 h-4" /> This ticket has been resolved and closed.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
