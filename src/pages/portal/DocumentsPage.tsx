import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, FileJson, Search, Filter } from 'lucide-react'
import { PageHeader } from '@/components/shared'
import { dummyDocuments } from '@/dummy/documents'
import { formatDate } from '@/lib/utils'

export default function DocumentsPage() {
  const [filter, setFilter] = useState<string>('all')

  const filteredDocs = filter === 'all' ? dummyDocuments : dummyDocuments.filter(d => d.category === filter)

  return (
    <div className="p-6 max-w-6xl space-y-6">
      <PageHeader title="Document Centre" subtitle="Access your contracts, floorplans, and property reports" />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {['all', 'contracts', 'floorplans', 'legal', 'marketing'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === cat ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search documents..." className="input-field pl-9 h-9 text-xs" />
        </div>
      </div>

      {/* Document List */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc, i) => (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">{doc.name}</p>
                        <p className="text-xs text-slate-500">{doc.fileName} · {(doc.fileSize / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs">{formatDate(doc.uploadedAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <a href={doc.downloadUrl} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-navy-600 hover:bg-navy-100 transition-colors">
                      <Download className="w-4 h-4" />
                    </a>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
