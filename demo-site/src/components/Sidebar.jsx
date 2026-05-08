import Logo from './Logo'

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

const THEMES = [
  {
    key: 'light',
    label: 'Light',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
  {
    key: 'system',
    label: 'System',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path strokeLinecap="round" d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    key: 'dark',
    label: 'Dark',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    ),
  },
]

export default function Sidebar({ trip, members = [], theme, setTheme, onSignOut }) {

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col h-full" style={{ background: 'var(--bg-sidebar)' }}>

      {/* Logo */}
      <div className="px-4 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Logo size={32} />
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
              <Logo size={28} className="flex-shrink-0" />
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
      <div className="px-4 py-4 border-t border-[var(--border)] flex-shrink-0 space-y-2">
        {/* Theme toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-card)]">
          {THEMES.map(({ key, label, icon }) => (
            <button
              key={key}
              title={label}
              onClick={() => setTheme(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                theme === key
                  ? 'bg-[var(--bg-active)] text-[var(--text-primary)]'
                  : 'text-[var(--text-faint)] hover:text-[var(--text-muted)]'
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onSignOut}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-active)] text-sm transition-colors w-full"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  )
}
