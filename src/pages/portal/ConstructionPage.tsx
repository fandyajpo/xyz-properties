import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HardHat, Calendar, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import { PageHeader, StatusBadge } from '@/components/shared'
import { dummyConstructionMilestones } from '@/dummy/projects'
import { dummyInvestorProjects } from '@/dummy/projects'
import { formatDate, cn } from '@/lib/utils'

export default function ConstructionPage() {
  const [selectedProject, setSelectedProject] = useState(dummyInvestorProjects[0]?.projectId)
  const [expandedPhase, setExpandedPhase] = useState<string | null>(dummyConstructionMilestones[0]?.id)

  const milestones = dummyConstructionMilestones.filter(m => m.projectId === selectedProject)

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <PageHeader title="Construction Updates" subtitle="Track the build progress of your active investments" />

      {/* Project Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {dummyInvestorProjects.map(inv => (
          <button
            key={inv.id}
            onClick={() => setSelectedProject(inv.projectId)}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border',
              selectedProject === inv.projectId ? 'bg-navy-900 text-white border-navy-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-navy-300'
            )}
          >
            {inv.project.name}
          </button>
        ))}
      </div>

      <div className="premium-card p-6 sm:p-8">
        <div className="relative pl-8 sm:pl-12 border-l-2 border-slate-100 space-y-8">
          {milestones.map((ms, i) => {
            const isExpanded = expandedPhase === ms.id
            const Icon = ms.status === 'completed' ? CheckCircle2 : ms.status === 'in_progress' ? HardHat : Circle
            
            return (
              <motion.div
                key={ms.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className={cn(
                  'absolute -left-[41px] sm:-left-[57px] w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm',
                  ms.status === 'completed' ? 'bg-emerald-500 text-white' : ms.status === 'in_progress' ? 'bg-gold-500 text-white' : 'bg-slate-200 text-slate-400'
                )}>
                  <Icon className="w-4 h-4" />
                </div>

                <div 
                  className={cn('rounded-2xl border transition-all cursor-pointer overflow-hidden', isExpanded ? 'border-navy-200 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50')}
                  onClick={() => setExpandedPhase(isExpanded ? null : ms.id)}
                >
                  <div className="p-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <StatusBadge status={ms.status} />
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{ms.phase}</span>
                      </div>
                      <p className="text-sm text-slate-600">{ms.description}</p>
                    </div>
                    <button className="text-slate-400 hover:text-navy-900">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-100 bg-white"
                      >
                        <div className="p-5 space-y-4">
                          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
                            <div>
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Start Date</p>
                              <p className="font-medium text-navy-900 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(ms.startDate)}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">End Date</p>
                              <p className="font-medium text-navy-900 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(ms.endDate)}</p>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Progress ({ms.completionPercent}%)</p>
                              <div className="h-2 mt-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${ms.completionPercent}%` }} />
                              </div>
                            </div>
                          </div>

                          {ms.engineerNotes && (
                            <div className="bg-slate-50 rounded-xl p-4 text-sm border border-slate-100">
                              <p className="text-xs font-bold text-navy-900 mb-1 flex items-center gap-1.5"><HardHat className="w-3.5 h-3.5 text-gold-600" /> Engineer's Notes</p>
                              <p className="text-slate-600 italic">{ms.engineerNotes}</p>
                            </div>
                          )}

                          {ms.images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                              {ms.images.map((img, idx) => (
                                <img key={idx} src={img} onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found" }} alt="Construction progress" className="w-full h-32 object-cover rounded-lg border border-slate-200" />
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
