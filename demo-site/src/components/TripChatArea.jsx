import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import StepsPanel from './StepsPanel'
import TripPlanPanel from './TripPlanPanel'
import PlanCards from './PlanCards'
import Logo from './Logo'

// ── helpers ───────────────────────────────────────────────────────────────────
const PALETTE = [
  'bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-pink-500',
  'bg-indigo-500', 'bg-teal-500', 'bg-rose-500', 'bg-violet-500',
]
function userColor(email) {
  let h = 0
  for (const c of (email || '')) h = (h * 31 + c.charCodeAt(0)) % PALETTE.length
  return PALETTE[h]
}
function initial(email, name) { return (name || email || '?')[0].toUpperCase() }
function displayName(msg) { return msg.user_name || msg.user_email?.split('@')[0] || 'Unknown' }
function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
function isSameDay(a, b) {
  const da = new Date(a), db = new Date(b)
  return da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
}
function dayLabel(ts) {
  const d = new Date(ts)
  const today = new Date()
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
  if (isSameDay(d, today)) return 'Today'
  if (isSameDay(d, yesterday)) return 'Yesterday'
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
}

// ── markdown renderer ─────────────────────────────────────────────────────────
const MD = {
  h1: ({ children }) => <p className="text-base font-bold mt-2 mb-1">{children}</p>,
  h2: ({ children }) => <p className="text-sm font-bold mt-2 mb-1">{children}</p>,
  h3: ({ children }) => <p className="text-sm font-semibold mt-1">{children}</p>,
  p:  ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-0.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-0.5">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>,
  code: ({ children }) => <code className="bg-[var(--bg-active)] rounded px-1 text-xs font-mono">{children}</code>,
  hr: () => <hr className="border-[var(--border-light)] my-3" />,
}

// ── date separator ────────────────────────────────────────────────────────────
function DateSeparator({ ts }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-[var(--border-light)]" />
      <span className="text-xs text-[var(--text-muted)] font-medium">{dayLabel(ts)}</span>
      <div className="flex-1 h-px bg-[var(--border-light)]" />
    </div>
  )
}

// ── plan ready card ───────────────────────────────────────────────────────────
function PlanReadyCard({ plan, onViewPlan }) {
  return (
    <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xl flex-shrink-0">🗺️</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
            {plan.trip_title || 'Your trip plan is ready'}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {plan.destination} · {plan.days?.length ?? 0} days
          </p>
        </div>
      </div>
      <button
        onClick={onViewPlan}
        className="flex-shrink-0 text-xs font-semibold text-orange-400 hover:text-orange-300 border border-orange-500/40 hover:border-orange-500/70 px-3 py-1.5 rounded-lg transition-colors"
      >
        View plan →
      </button>
    </div>
  )
}

// ── parse message content ─────────────────────────────────────────────────────
function parseMsgContent(content) {
  if (content && content.trimStart().startsWith('{')) {
    try {
      const data = JSON.parse(content)
      if (data.plans && Array.isArray(data.plans)) return { kind: 'plan_options', data }
      if (data.days  && Array.isArray(data.days))  return { kind: 'structured_plan', data }
    } catch { /* not JSON */ }
  }
  return { kind: 'markdown', text: content }
}

// ── AI message ────────────────────────────────────────────────────────────────
function AgentMessage({ msg, showHeader, onViewPlan }) {
  const parsed = parseMsgContent(msg.content)

  const avatar = (
    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
      <Logo size={32} />
    </div>
  )
  const placeholder = <div className="w-8 flex-shrink-0" />

  const header = showHeader && (
    <div className="flex items-center gap-2 mb-1">
      <span className="text-sm font-semibold text-[var(--text-primary)]">Raahi AI</span>
      <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-2 py-0.5 font-medium">AI</span>
      <span className="text-xs text-[var(--text-muted)]">{fmtTime(msg.timestamp)}</span>
    </div>
  )

  if (parsed.kind === 'plan_options') {
    return (
      <div className="flex items-start gap-3">
        {showHeader ? avatar : placeholder}
        <div className="flex-1 min-w-0">
          {showHeader && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-[var(--text-primary)]">Raahi AI</span>
              <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-2 py-0.5 font-medium">AI</span>
              <span className="text-xs text-[var(--text-muted)]">{fmtTime(msg.timestamp)}</span>
            </div>
          )}
          <PlanCards data={parsed.data} />
        </div>
      </div>
    )
  }

  if (parsed.kind === 'structured_plan') {
    return (
      <div className="flex items-start gap-3">
        {showHeader ? avatar : placeholder}
        <div className="flex-1 min-w-0">
          {header}
          <PlanReadyCard plan={parsed.data} onViewPlan={onViewPlan} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      {showHeader ? avatar : placeholder}
      <div className="flex-1 min-w-0">
        {header}
        <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
          <Markdown remarkPlugins={[remarkGfm]} components={MD}>{msg.content}</Markdown>
        </div>
      </div>
    </div>
  )
}

// ── user message ──────────────────────────────────────────────────────────────
function UserMessage({ msg, showHeader }) {
  const color = userColor(msg.user_email)
  return (
    <div className="flex items-start gap-3">
      {showHeader ? (
        <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center flex-shrink-0 text-white text-xs font-semibold shadow`}>
          {initial(msg.user_email, msg.user_name)}
        </div>
      ) : (
        <div className="w-8 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        {showHeader && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-[var(--text-primary)]">{displayName(msg)}</span>
            <span className="text-xs text-[var(--text-muted)]">{fmtTime(msg.timestamp)}</span>
          </div>
        )}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed break-words">{msg.content}</p>
      </div>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────
export default function TripChatArea({ trip, messages = [], steps = [], members = [] }) {
  const [activeTab, setActiveTab] = useState('steps')
  const [tripPlan, setTripPlan] = useState(null)
  const [panelExpanded, setPanelExpanded] = useState(false)
  const bottomRef = useRef(null)

  // Extract latest structured plan from messages
  useEffect(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i]
      if (m.is_agent && m.content?.trim().startsWith('{')) {
        try {
          const p = JSON.parse(m.content)
          if (p.days && Array.isArray(p.days)) { setTripPlan(p); break }
        } catch { /* not plan JSON */ }
      }
    }
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [messages])

  const handleViewPlan = () => setActiveTab('plan')

  // Build render list with date separators and grouping
  const rendered = []
  let lastMsg = null
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i]
    const showDate = !lastMsg || !isSameDay(lastMsg.timestamp, msg.timestamp)
    const showHeader = showDate ||
      lastMsg.user_email !== msg.user_email ||
      lastMsg.is_agent !== msg.is_agent
    if (showDate) rendered.push({ type: 'date', ts: msg.timestamp, key: `d-${i}` })
    rendered.push({ type: 'msg', msg, showHeader, key: `m-${i}` })
    lastMsg = msg
  }

  const memberNames = members.map(m => m.name || m.email.split('@')[0]).join(', ')

  return (
    <div className="flex flex-row flex-1 min-w-0 h-full overflow-hidden">

      {/* ── Chat column ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 h-full bg-[var(--bg-chat)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] flex-shrink-0 bg-[var(--bg-header)]">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-primary)] font-semibold text-base">{trip.name}</span>
                <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 font-medium">Planning</span>
                <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-2 py-0.5 font-medium">Demo</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{memberNames} · Raahi AI</p>
            </div>
          </div>

          <div className="flex -space-x-2">
            {members.slice(0, 4).map((m) => (
              <div
                key={m.email}
                title={m.email}
                className={`w-7 h-7 rounded-full ${userColor(m.email)} border-2 border-[var(--bg-header)] flex items-center justify-center text-white text-xs font-semibold`}
              >
                {initial(m.email, m.name)}
              </div>
            ))}
            <div className="w-7 h-7 rounded-full bg-white border-2 border-[var(--bg-header)] flex items-center justify-center overflow-hidden" title="Raahi AI">
              <Logo size={22} />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-4xl mb-3">✈️</span>
              <p className="text-[var(--text-secondary)] font-medium">No messages yet</p>
              <p className="text-[var(--text-muted)] text-sm mt-1">Run the export script to populate demo data.</p>
            </div>
          ) : (
            <div className="space-y-0.5 max-w-3xl mx-auto">
              {rendered.map((item) =>
                item.type === 'date' ? (
                  <DateSeparator key={item.key} ts={item.ts} />
                ) : item.msg.is_agent ? (
                  <div key={item.key} className={item.showHeader ? 'mt-4' : 'mt-0.5'}>
                    <AgentMessage msg={item.msg} showHeader={item.showHeader} onViewPlan={handleViewPlan} />
                  </div>
                ) : (
                  <div key={item.key} className={item.showHeader ? 'mt-4' : 'mt-0.5'}>
                    <UserMessage msg={item.msg} showHeader={item.showHeader} />
                  </div>
                )
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input — disabled in demo */}
        <div className="px-4 py-3 border-t border-[var(--border)] flex-shrink-0">
          <div className="max-w-3xl mx-auto flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl px-4 py-2.5 opacity-50">
            <input
              disabled
              placeholder="Demo mode — read only"
              className="flex-1 bg-transparent text-[var(--text-muted)] placeholder-[var(--text-faint)] text-sm focus:outline-none cursor-not-allowed"
            />
            <div className="flex-shrink-0 w-8 h-8 bg-[var(--bg-active)] rounded-full flex items-center justify-center cursor-not-allowed">
              <svg className="w-3.5 h-3.5 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
          <p className="text-center text-[var(--text-faint)] text-xs mt-1.5">Read-only demo</p>
        </div>
      </div>

      {/* ── Right panel ──────────────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 h-full flex flex-col border-l border-[var(--border)] overflow-hidden transition-[width] duration-300 ease-in-out"
        style={{ width: panelExpanded ? '560px' : '300px' }}
      >
        {/* Tab bar */}
        <div className="flex items-center border-b border-[var(--border)] flex-shrink-0" style={{ background: 'var(--bg-sidebar)' }}>
          <div className="flex flex-1">
            {[
              { key: 'steps', label: 'Steps' },
              { key: 'plan',  label: 'Trip Plan' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === key
                    ? 'text-[var(--text-primary)] border-b-2 border-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {label}
                {key === 'plan' && tripPlan && (
                  <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 inline-block align-middle" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPanelExpanded(v => !v)}
            title={panelExpanded ? 'Shrink panel' : 'Expand panel'}
            className="mr-2 w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-active)] transition-colors flex-shrink-0"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${panelExpanded ? 'rotate-180' : 'rotate-0'}`}
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'steps' ? (
            <StepsPanel steps={steps} />
          ) : (
            <TripPlanPanel plan={tripPlan} />
          )}
        </div>
      </div>
    </div>
  )
}
