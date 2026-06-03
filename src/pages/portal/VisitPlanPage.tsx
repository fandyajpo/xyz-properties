import React from 'react'
import { motion } from 'framer-motion'
import { Plane, Calendar, MapPin, CheckCircle2, Clock } from 'lucide-react'
import { PageHeader, StatusBadge } from '@/components/shared'
import { dummyVisitPlans } from '@/dummy/investor'
import { formatDate } from '@/lib/utils'

export default function VisitPlanPage() {
  return (
    <div className="p-6 max-w-5xl space-y-6">
      <PageHeader title="Bali Visit Plan" subtitle="Coordinate your upcoming visits and site inspections">
        <button className="btn-primary flex items-center gap-2">
          <Plane className="w-4 h-4" /> Schedule Visit
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyVisitPlans.map((visit, i) => (
          <motion.div
            key={visit.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="premium-card overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-navy-600" />
                </div>
                <div>
                  <p className="font-display font-bold text-navy-900">
                    {formatDate(visit.arrivalDate)} — {formatDate(visit.departureDate)}
                  </p>
                </div>
              </div>
              <StatusBadge status={visit.status} />
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Purpose of Visit</p>
                <p className="text-sm font-medium text-navy-900">{visit.purpose}</p>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Accommodation</p>
                  <p className="text-sm text-navy-900">{visit.accommodation}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 text-sm">
                <p className="text-slate-500 mb-1">Notes / Requests:</p>
                <p className="text-navy-900 italic">"{visit.notes}"</p>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs font-medium">
                {visit.airportPickup ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Airport Pickup Confirmed
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" /> Awaiting Pickup Details
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
