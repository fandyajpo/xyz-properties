import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Plus, Trash2, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/shared'
import { dummyBankAccounts } from '@/dummy/investor'
import { cn } from '@/lib/utils'

export default function BankDetailsPage() {
  const [accounts, setAccounts] = useState(dummyBankAccounts)

  const handleSetDefault = (id: string) => {
    setAccounts(accounts.map(acc => ({ ...acc, isDefault: acc.id === id })))
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <PageHeader title="Bank Details" subtitle="Manage your nominated bank accounts for rental distributions">
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Account
        </button>
      </PageHeader>

      <div className="space-y-4">
        {accounts.map((acc, i) => (
          <motion.div
            key={acc.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn('premium-card p-6 border-2 transition-colors', acc.isDefault ? 'border-navy-500 bg-navy-50/30' : 'border-transparent')}
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-navy-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-bold text-navy-900 text-lg">{acc.bankName}</h3>
                    {acc.isDefault && (
                      <span className="inline-flex items-center gap-1 bg-navy-900 text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Default
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm mt-0.5">{acc.branch}</p>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Account Holder</p>
                      <p className="font-medium text-navy-900">{acc.accountHolder}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Account Number</p>
                      <p className="font-medium text-navy-900 font-mono tracking-wider">{acc.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">SWIFT Code</p>
                      <p className="font-medium text-navy-900 font-mono tracking-wider">{acc.swiftCode}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 justify-start sm:justify-end border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-4">
                {!acc.isDefault && (
                  <button onClick={() => handleSetDefault(acc.id)} className="text-xs font-semibold text-navy-600 bg-navy-50 hover:bg-navy-100 px-3 py-1.5 rounded-lg transition-colors">
                    Set Default
                  </button>
                )}
                <button className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
