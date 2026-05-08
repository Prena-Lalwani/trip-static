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

export default function Sidebar({ trip, members = [] }) {
  return (
    <aside className="w-72 flex-shrink-0 flex flex-col h-full" style={{ background: 'var(--bg-sidebar)' }}>

      {/* Logo */}
      <div className="px-4 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7H3a7 7 0 017-7h1V5.73A2 2 0 0112 2z"/>
            </svg>
          </div>
          <span className="text-[var(--text-primary)] font-bold text-base">Raahi AI</span>
          <span className="ml-auto text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-2 py-0.5 font-medium">Demo</span>
        </div>
      </div>

      {/* Section label */}
      <div className="px-4 pt-2 pb-1 flex-shrink-0">
        <p className="text-[10px] font-bold text-[var(--text-faint)] uppercase tracking-widest">Trips</p>
      </div>

      {/* Trip entry */}
      <div className="px-2 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[var(--bg-active)] cursor-default">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/30 to-orange-700/30 flex items-center justify-center flex-shrink-0">
            <span className="text-sm">✈️</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{trip.name}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{members.length} member{members.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Members */}
      {members.length > 0 && (
        <div className="px-4 pt-4 flex-shrink-0">
          <p className="text-[10px] font-bold text-[var(--text-faint)] uppercase tracking-widest mb-2">Members</p>
          <div className="space-y-2">
            {members.map((m) => (
              <div key={m.email} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full ${userColor(m.email)} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                  {initial(m.email, m.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-secondary)] truncate">{m.name || m.email.split('@')[0]}</p>
                  <p className="text-[10px] text-[var(--text-faint)] truncate">{m.email}</p>
                </div>
              </div>
            ))}
            {/* AI member */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7H3a7 7 0 017-7h1V5.73A2 2 0 0112 2z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[var(--text-secondary)] truncate">Raahi AI</p>
                <p className="text-[10px] text-orange-400 truncate">AI Assistant</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1" />

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[var(--border)] flex-shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--text-faint)] text-sm cursor-not-allowed select-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
          Sign out (demo)
        </div>
      </div>
    </aside>
  )
}
