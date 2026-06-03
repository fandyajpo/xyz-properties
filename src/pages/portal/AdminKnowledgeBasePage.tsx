import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, Trash2, Database, FileText, CheckCircle2,
  AlertTriangle, Loader2, ShieldAlert, X, RefreshCw,
  HardDrive, Info
} from 'lucide-react'
import { PageHeader } from '@/components/shared'
import { useAuth } from '@/features/auth/AuthContext'
import { cn } from '@/lib/utils'
import { Navigate } from 'react-router-dom'
import { useInsertKnowledgeBase, useKnowledgeBaseStats, useRemoveKnowledgeBase } from '@/hooks/useKnowledgeBase'

// ─── API endpoints ────────────────────────────────────────────────────────────
const PINECONE_DELETE_URL = 'https://sample-movies-wvc8s1e.svc.aped-4627-b74a.pinecone.io/vectors/delete'
const N8N_UPLOAD_URL = 'http://localhost:5678/webhook-test/4e4b3bf5-3c0b-44e6-b621-d088aa4423f7'

// ─── Types ────────────────────────────────────────────────────────────────────
type StatusType = 'idle' | 'loading' | 'success' | 'error'

interface IndexStats {
  totalVectorCount?: number
  dimension?: number
  namespaces?: Record<string, { vectorCount: number }>
}

// ─── Drag & Drop Zone ─────────────────────────────────────────────────────────
function DropZone({
  file,
  onFile,
  disabled,
}: {
  file: File | null
  onFile: (f: File) => void
  disabled: boolean
}) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      if (disabled) return
      const dropped = e.dataTransfer.files[0]
      if (dropped) onFile(dropped)
    },
    [disabled, onFile]
  )

  return (
    <div
      onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        'relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 group',
        dragging
          ? 'border-navy-400 bg-navy-50 scale-[1.01]'
          : file
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-slate-200 bg-slate-50 hover:border-navy-300 hover:bg-navy-50/50',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.txt,.docx,.csv,.json,.md"
        onChange={e => {
          const f = e.target.files?.[0]
          if (f) onFile(f)
          e.target.value = ''
        }}
        disabled={disabled}
      />

      <AnimatePresence mode="wait">
        {file ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-sm">
              <FileText className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-navy-900 text-sm">{file.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {(file.size / 1024).toFixed(1)} KB · Click to replace
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-3"
          >
            <div className={cn(
              'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm',
              dragging ? 'bg-navy-100' : 'bg-slate-100 group-hover:bg-navy-100'
            )}>
              <Upload className={cn(
                'w-7 h-7 transition-colors',
                dragging ? 'text-navy-600' : 'text-slate-400 group-hover:text-navy-500'
              )} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-navy-800 text-sm">
                {dragging ? 'Drop to upload' : 'Drag & drop your file'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PDF, DOCX, TXT, CSV, JSON, MD · Max 50MB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Status Banner ────────────────────────────────────────────────────────────
function StatusBanner({
  status,
  message,
  onDismiss,
}: {
  status: 'success' | 'error'
  message: string
  onDismiss: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={cn(
        'flex items-start gap-3 rounded-xl px-4 py-3.5 border text-sm',
        status === 'success'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-red-50 border-red-200 text-red-800'
      )}
    >
      {status === 'success' ? (
        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
      ) : (
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
      )}
      <span className="flex-1 leading-relaxed">{message}</span>
      <button onClick={onDismiss} className="text-current opacity-50 hover:opacity-100 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

// ─── Confirm Modal ─────────────────────────────────────────────────────────────
function ConfirmDeleteModal({
  onConfirm,
  onCancel,
  loading,
}: {
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 10 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="font-display font-bold text-navy-900 text-lg">Delete Knowledge Base</h2>
            <p className="text-slate-500 text-sm mt-0.5">This action cannot be undone</p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700 leading-relaxed">
            All vectors in the Pinecone index will be <strong>permanently deleted</strong>. The AI assistant will have no knowledge base until a new file is uploaded.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Deleting…</>
            ) : (
              <><Trash2 className="w-4 h-4" /> Yes, Delete All</>
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminKnowledgeBasePage() {
  const { user } = useAuth()

  const removeKb = useRemoveKnowledgeBase()
  const insertKb = useInsertKnowledgeBase()

  // Guard: non-admins are redirected
  if (!user?.isAdmin) {
    return <Navigate to="/portal/dashboard" replace />
  }

  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<StatusType>('idle')
  const [uploadMsg, setUploadMsg] = useState('')

  const [deleteStatus, setDeleteStatus] = useState<StatusType>('idle')
  const [deleteMsg, setDeleteMsg] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const { data: stats, isLoading: statsLoading, isError, refetch: fetchStats } = useKnowledgeBaseStats()
  const statsError = isError ? 'Could not fetch index stats. Check your API settings.' : ''
  const vectorCount = stats?.namespaces?.__default__?.vectorCount ?? stats?.totalVectorCount ?? 0
  const hasKnowledgeBase = vectorCount > 0

  // ── Upload ──────────────────────────────────────────────────────────────────
  const handleUpload = async () => {
    if (!file) return

    setUploadStatus('loading')
    setUploadMsg('')

    insertKb.mutate(file, {
      onSuccess: () => {
        setUploadStatus('success')
        setUploadMsg(
          `"${file.name}" uploaded successfully and is being processed into the knowledge base.`
        )
        setFile(null)
      },
      onError: (err: any) => {
        setUploadStatus('error')
        setUploadMsg(
          `Upload failed: ${err?.message || 'Unknown error'}`
        )
      },
    })
  }

  const handleDelete = () => {
    setDeleteStatus('loading')
    setDeleteMsg('')

    removeKb.mutate(undefined, {
      onSuccess: () => {
        setDeleteStatus('success')
        setDeleteMsg(
          'All vectors have been deleted from the knowledge base. The index is now empty.'
        )
        setShowConfirm(false)
      },
      onError: (err: any) => {
        setDeleteStatus('error')
        setDeleteMsg(
          `Deletion failed: ${err?.message || 'Unknown error'}`
        )
        setShowConfirm(false)
      },
    })
  }

  const isBusy =
    insertKb.isPending ||
    removeKb.isPending

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <PageHeader
        title="Knowledge Base Manager"
        subtitle="Upload or remove the AI assistant's document knowledge base"
      >
        {/* Admin badge */}
        <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          <ShieldAlert className="w-3.5 h-3.5" />
          Admin Only
        </span>
      </PageHeader>

      {/* ── Index Stats Card ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-navy-900 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6 text-gold-400" />
          </div>
          <div>
            <p className="text-navy-300 text-xs font-medium uppercase tracking-wider">Pinecone Index</p>
            {statsLoading ? (
              <div className="flex items-center gap-2 mt-1">
                <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                <span className="text-white text-sm">Fetching stats…</span>
              </div>
            ) : stats ? (
              <div className="flex items-center gap-4 mt-1">
                <span className="text-white font-display font-bold text-xl">
                  {vectorCount.toLocaleString()}
                </span>
                <span className="text-navy-400 text-sm">vectors stored</span>
                {stats.dimension && (
                  <span className="text-navy-400 text-xs">· dim {stats.dimension}</span>
                )}
              </div>
            ) : statsError ? (
              <p className="text-red-400 text-sm mt-1">{statsError}</p>
            ) : (
              <p className="text-navy-400 text-sm mt-1">Click refresh to load stats</p>
            )}
          </div>
        </div>
        <button
          type='button'
          onClick={() => fetchStats()}
          disabled={statsLoading}
          className="flex items-center gap-2 text-navy-300 hover:text-white hover:bg-navy-800 border border-navy-700 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 flex-shrink-0"
        >
          <RefreshCw className={cn('w-4 h-4', statsLoading && 'animate-spin')} />
          Refresh
        </button>
      </motion.div>

      {/* ── Info banner ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3.5"
      >
        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 leading-relaxed">
          Only <strong>one knowledge base</strong> can be active at a time. Uploading a new file will add it on top of the existing vectors. To replace the knowledge base entirely, delete all vectors first, then upload the new file.
        </p>
      </motion.div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Upload Card ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <h2 className="font-display font-bold text-navy-900">Upload Knowledge Base</h2>
              <p className="text-slate-500 text-xs mt-0.5">Select a single document to ingest</p>
            </div>
          </div>

          {hasKnowledgeBase ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center mt-4">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-amber-800">Knowledge Base Exists</p>
              <p className="text-xs text-amber-700 mt-1">
                You must remove the existing knowledge base before you can insert a new one.
              </p>
            </div>
          ) : (
            <>
              <DropZone file={file} onFile={setFile} disabled={isBusy} />

              <AnimatePresence>
                {(uploadStatus === 'success' || uploadStatus === 'error') && uploadMsg && (
                  <StatusBanner
                    status={uploadStatus === 'success' ? 'success' : 'error'}
                    message={uploadMsg}
                    onDismiss={() => { setUploadStatus('idle'); setUploadMsg('') }}
                  />
                )}
              </AnimatePresence>

              <button
                id="upload-kb-btn"
                onClick={handleUpload}
                disabled={!file || isBusy}
                className={cn(
                  'w-full flex items-center justify-center gap-2 font-semibold text-sm py-3 px-4 rounded-xl transition-all',
                  file && !isBusy
                    ? 'bg-navy-900 hover:bg-navy-800 text-white shadow-sm hover:shadow-md'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                )}
              >
                {uploadStatus === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Uploading & Processing…</>
                ) : (
                  <><Upload className="w-4 h-4" /> Upload to Knowledge Base</>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                File will be sent to the webhook for processing and ingestion.
              </p>
            </>
          )}
        </motion.div>

        {/* ── Delete Card ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="font-display font-bold text-navy-900">Delete Knowledge Base</h2>
              <p className="text-slate-500 text-xs mt-0.5">Remove all vectors from Pinecone</p>
            </div>
          </div>

          {/* Visual representation */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
              <HardDrive className="w-8 h-8 text-slate-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-navy-800 text-sm">Pinecone Vector Store</p>
              {stats ? (
                <p className="text-slate-500 text-xs mt-0.5">
                  {vectorCount.toLocaleString()} vectors · will be permanently removed
                </p>
              ) : (
                <p className="text-slate-400 text-xs mt-0.5">Refresh stats to see vector count</p>
              )}
            </div>

          </div>

          <AnimatePresence>
            {(deleteStatus === 'success' || deleteStatus === 'error') && deleteMsg && (
              <StatusBanner
                status={deleteStatus === 'success' ? 'success' : 'error'}
                message={deleteMsg}
                onDismiss={() => { setDeleteStatus('idle'); setDeleteMsg('') }}
              />
            )}
          </AnimatePresence>

          <button
            id="delete-kb-btn"
            onClick={() => setShowConfirm(true)}
            disabled={isBusy}
            className="w-full flex items-center justify-center gap-2 font-semibold text-sm py-3 px-4 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete All Vectors
          </button>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Sends a <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">deleteAll: true</code> request to the Pinecone delete endpoint. This is irreversible.
          </p>
        </motion.div>
      </div>

      {/* ── Confirm Delete Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showConfirm && (
          <ConfirmDeleteModal
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
            loading={deleteStatus === 'loading'}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
