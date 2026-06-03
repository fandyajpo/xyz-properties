import React from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Download, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { PageHeader, StatusBadge } from '@/components/shared'
import { dummyPayments } from '@/dummy/payments'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function PaymentsPage() {
  const pending = dummyPayments.filter(p => p.status === 'pending' || p.status === 'overdue')
  const completed = dummyPayments.filter(p => p.status === 'paid')

  return (
    <div className="p-6 max-w-6xl space-y-6">
      <PageHeader title="Payment Schedule" subtitle="Manage your upcoming instalments and view payment history" />

      {/* Action Required */}
      {pending.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="font-display font-bold text-navy-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" /> Action Required
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pending.map(p => (
              <div key={p.id} className="premium-card p-5 border-t-4 border-t-amber-500">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.invoiceNumber}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="font-display font-bold text-navy-900 text-2xl mb-1">{formatCurrency(p.amount)}</h3>
                <p className="text-sm font-medium text-navy-800 mb-0.5">{p.projectName} {p.unitNumber}</p>
                <p className="text-xs text-slate-500 mb-4">{p.description}</p>
                
                <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Due Date</span>
                  <span className={`text-xs font-bold ${p.status === 'overdue' ? 'text-red-600' : 'text-navy-900'}`}>{formatDate(p.dueDate)}</span>
                </div>
                
                <button className="w-full btn-gold text-xs py-2.5 flex items-center justify-center gap-2">
                  <CreditCard className="w-4 h-4" /> Pay Now
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* History Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4 pt-4">
        <h2 className="font-display font-bold text-navy-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Payment History
        </h2>
        <div className="premium-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-medium text-[11px] uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Date Paid</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {completed.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{p.invoiceNumber}</td>
                    <td className="px-6 py-4 font-medium text-navy-900">{p.projectName} {p.unitNumber}</td>
                    <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{p.description}</td>
                    <td className="px-6 py-4 text-slate-600">{formatDate(p.paidDate!)}</td>
                    <td className="px-6 py-4 text-right font-display font-bold text-navy-900">{formatCurrency(p.amount)}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 text-navy-600 hover:bg-navy-50 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
