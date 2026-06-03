import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Copy, CheckCircle2, Loader2, Sparkles,
  RotateCcw, ChevronRight, X
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { chatService } from '@/services/chat.service'
import type { ChatMessage, ProcessingStage } from '@/types/common.types'
import { cn } from '@/lib/utils'

// ─── Suggested Prompts ────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { icon: '📄', text: 'Where can I find my SPA contract?' },
  { icon: '🎁', text: 'Explain my referral rewards' },
  { icon: '📊', text: 'What is my portfolio ROI?' },
  { icon: '✈️', text: 'How do I plan a Bali site visit?' },
]

// ─── Typing cursor animation ──────────────────────────────────────────────────
function TypingCursor() {
  return (
    <motion.span
      className="inline-block w-[3px] h-[1.1em] bg-navy-700 ml-[2px] align-middle rounded-sm"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// ─── Typing text hook ─────────────────────────────────────────────────────────
function useTypewriter(text: string, enabled: boolean, speed = 14) {
  const [shown, setShown] = useState(enabled ? '' : text)
  const [done, setDone] = useState(!enabled)

  useEffect(() => {
    if (!enabled) { setShown(text); setDone(true); return }
    setShown('')
    setDone(false)
    let i = 0
    const t = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) { clearInterval(t); setDone(true) }
    }, speed)
    return () => clearInterval(t)
  }, [text, enabled, speed])

  return { shown, done }
}

// ─── Processing pill ──────────────────────────────────────────────────────────
function ProcessingPill({ stages }: { stages: ProcessingStage[] }) {
  const active = stages.find(s => s.status === 'active')
  const done = stages.filter(s => s.status === 'done').length
  const total = stages.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-600"
    >
      <Loader2 className="w-3 h-3 animate-spin text-navy-500" />
      <span>{active?.label ?? 'Processing...'}</span>
      <span className="text-slate-400 font-mono">{done}/{total}</span>
    </motion.div>
  )
}

// ─── Thinking dots ────────────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex gap-1 items-center py-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-slate-300 rounded-full"
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.16, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Markdown renderer ────────────────────────────────────────────────────────
function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headings
        h1: ({ children }) => <h1 className="text-base font-bold text-slate-900 mt-4 mb-2 first:mt-0">{children}</h1>,
        h2: ({ children }) => <h2 className="text-sm font-bold text-slate-900 mt-3 mb-1.5 first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-semibold text-slate-800 mt-2 mb-1 first:mt-0">{children}</h3>,
        // Paragraphs
        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
        // Bold / italic
        strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
        em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
        // Lists
        ul: ({ children }) => <ul className="list-disc list-outside pl-4 mb-2 space-y-0.5">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-outside pl-4 mb-2 space-y-0.5">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed text-slate-700">{children}</li>,
        // Code
        code: ({ className, children, ...props }) => {
          const isBlock = className?.startsWith('language-')
          return isBlock ? (
            <code className="block bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-[11px] font-mono text-slate-800 overflow-x-auto my-2 whitespace-pre">{children}</code>
          ) : (
            <code className="bg-slate-100 text-slate-800 text-[11px] font-mono px-1.5 py-0.5 rounded" {...props}>{children}</code>
          )
        },
        pre: ({ children }) => <pre className="my-2">{children}</pre>,
        // Blockquote
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-navy-300 pl-3 my-2 text-slate-600 italic">{children}</blockquote>
        ),
        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-2">
            <table className="w-full text-xs border-collapse border border-slate-200 rounded-lg overflow-hidden">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-slate-100">{children}</thead>,
        th: ({ children }) => <th className="border border-slate-200 px-3 py-1.5 text-left font-semibold text-slate-700">{children}</th>,
        td: ({ children }) => <td className="border border-slate-200 px-3 py-1.5 text-slate-600">{children}</td>,
        // Links
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-navy-600 underline underline-offset-2 hover:text-navy-800 transition-colors">{children}</a>
        ),
        // Horizontal rule
        hr: () => <hr className="my-3 border-slate-200" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function Message({ msg, isLatest }: { msg: ChatMessage; isLatest: boolean }) {
  const isUser = msg.role === 'user'
  const [copied, setCopied] = useState(false)
  const { shown, done } = useTypewriter(msg.content, !isUser && isLatest)

  const copy = () => {
    navigator.clipboard.writeText(msg.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full navy-gradient flex items-center justify-center flex-shrink-0 mr-3 mt-0.5 shadow-sm">
          <Sparkles className="w-4 h-4 text-gold-400" />
        </div>
      )}

      <div className={cn('flex flex-col gap-1.5', isUser ? 'items-end max-w-[70%]' : 'items-start max-w-[80%]')}>
        {!isUser && (
          <span className="text-[11px] font-semibold text-slate-500 ml-1">XYZ AI</span>
        )}

        {/* Bubble */}
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'bg-navy-900 text-white rounded-br-sm'
              : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
          )}
        >
          {isUser ? (
            <span>{msg.content}</span>
          ) : (
            <span className="block">
              <MarkdownContent content={shown} />
              {!done && <TypingCursor />}
            </span>
          )}
        </div>

        {/* Actions row */}
        {!isUser && done && (
          <div className="flex items-center gap-2 ml-1">
            <span className="text-[10px] text-slate-400">
              {new Date(msg.timestamp).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
            </span>
            {msg.metadata && (
              <span className="text-[10px] text-slate-400">
                · {(msg.metadata.responseTime / 1000).toFixed(1)}s
              </span>
            )}
            <button
              onClick={copy}
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
            >
              {copied
                ? <><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Copied</>
                : <><Copy className="w-3 h-3" /> Copy</>
              }
            </button>
          </div>
        )}
        {isUser && (
          <span className="text-[10px] text-slate-400 mr-1">
            {new Date(msg.timestamp).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </motion.div>
  )
}

// ─── Welcome / Empty state ────────────────────────────────────────────────────
function WelcomeScreen({ onSuggest }: { onSuggest: (t: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center h-full px-6 text-center gap-8"
    >
      {/* Logo / hero */}
      <div className="space-y-4">
        <motion.div
          animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 navy-gradient rounded-2xl flex items-center justify-center mx-auto shadow-premium"
        >
          <Sparkles className="w-8 h-8 text-gold-400" />
        </motion.div>
        <div>
          <h1 className="font-display font-bold text-2xl text-navy-900 mb-1">
            Hi, I'm XYZ AI
          </h1>
          <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
            Your personal property investment assistant. Ask me anything.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Connected · Ready to help
        </div>
      </div>

      {/* Suggestions grid */}
      <div className="w-full max-w-lg space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Try asking
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SUGGESTIONS.map((s, i) => (
            <motion.button
              key={s.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              onClick={() => onSuggest(s.text)}
              className="group flex items-center gap-3 text-left bg-white border border-slate-200 hover:border-navy-300 hover:bg-navy-50 rounded-xl px-4 py-3 transition-all shadow-sm hover:shadow-md"
            >
              <span className="text-xl flex-shrink-0">{s.icon}</span>
              <span className="text-sm text-slate-700 group-hover:text-navy-800 flex-1 leading-snug">{s.text}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-navy-400 transition-colors flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AIChatPage() {
  // In-memory only — clears on refresh
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [stages, setStages] = useState<ProcessingStage[]>([])
  const [latestAIId, setLatestAIId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const clearAll = useCallback(() => {
    setMessages([])
    setLatestAIId(null)
    setInput('')
  }, [])

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || isThinking) return
    setInput('')

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMsg])
    setIsThinking(true)
    setStages([])

    const reply = await chatService.sendMessage(content, setStages)

    setLatestAIId(reply.id)
    setMessages(prev => [...prev, reply])
    setIsThinking(false)
    setStages([])
  }, [input, isThinking])

  const hasMessages = messages.length > 0

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-slate-50">

      {/* ── Top bar ────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-white border-b border-slate-100 px-6 h-14 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 navy-gradient rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-gold-400" />
            </div>
            {isThinking && (
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gold-400 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-900">XYZ AI Assistant</p>
            <p className="text-[11px] text-slate-500">
              {isThinking ? (
                <span className="text-gold-500 flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Thinking…
                </span>
              ) : 'Property FAQ'}
            </p>
          </div>
        </div>

        {hasMessages && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearAll}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            New chat
          </motion.button>
        )}
      </div>

      {/* ── Message area ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full h-full">
          <AnimatePresence mode="wait">
            {!hasMessages ? (
              <div key="welcome" className="h-full">
                <WelcomeScreen onSuggest={t => sendMessage(t)} />
              </div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-8 space-y-6"
              >
                {messages.map(msg => (
                  <Message
                    key={msg.id}
                    msg={msg}
                    isLatest={msg.id === latestAIId}
                  />
                ))}

                {/* Thinking state */}
                <AnimatePresence>
                  {isThinking && (
                    <motion.div
                      key="thinking"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full navy-gradient flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                        <Sparkles className="w-4 h-4 text-gold-400" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold text-slate-500">XYZ AI</span>
                        {stages.length > 0 ? (
                          <ProcessingPill stages={stages} />
                        ) : (
                          <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                            <ThinkingDots />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Input bar ──────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-white border-t border-slate-100 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        <div className="max-w-3xl mx-auto px-6 py-4 space-y-3">

          {/* Quick chips – show after first message */}
          {/* <AnimatePresence>
            {hasMessages && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {['Payment schedule', 'Construction update', 'My documents', 'Referral rewards'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    disabled={isThinking}
                    className="flex-shrink-0 text-[11px] bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:bg-navy-50 hover:border-navy-200 hover:text-navy-700 transition-all disabled:opacity-40"
                  >
                    {chip}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence> */}

          {/* Input field */}
          <div className="relative flex items-end gap-3 bg-white border border-slate-200 hover:border-navy-300 focus-within:border-navy-400 focus-within:ring-2 focus-within:ring-navy-100 rounded-2xl px-4 py-3 transition-all shadow-sm">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
              }}
              placeholder="Ask me anything about your investment…"
              rows={1}
              disabled={isThinking}
              className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none min-h-[24px] max-h-[120px] disabled:opacity-50 leading-relaxed py-0"
            />
            <div className="flex items-center gap-2 flex-shrink-0">
              {input && (
                <button onClick={() => setInput('')} className="text-slate-300 hover:text-slate-500 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isThinking}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                className="w-9 h-9 bg-navy-900 hover:bg-navy-800 disabled:opacity-35 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
              >
                {isThinking
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Send className="w-4 h-4" />
                }
              </motion.button>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            XYZ AI can make mistakes. Verify important info with your investor relations team.
          </p>
        </div>
      </div>
    </div>
  )
}
