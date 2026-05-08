import Logo from './Logo'

const THEMES = [
  {
    key: 'light',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
  {
    key: 'system',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path strokeLinecap="round" d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    key: 'dark',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    ),
  },
]

export default function SignIn({ onSignIn, theme, setTheme }) {
  return (
    <div className="relative flex items-center justify-center h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* Theme toggle — top right */}
      <div className="absolute top-4 right-4 flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-card)]">
        {THEMES.map(({ key, icon }) => (
          <button
            key={key}
            title={key}
            onClick={() => setTheme(key)}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              theme === key
                ? 'bg-[var(--bg-active)] text-[var(--text-primary)]'
                : 'text-[var(--text-faint)] hover:text-[var(--text-muted)]'
            }`}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-sm px-6">

        {/* Logo + title */}
        <div className="flex flex-col items-center mb-8">
          <Logo size={56} className="mb-4" />
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Raahi AI</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Sign in to start planning</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            disabled
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-faint)] text-sm focus:outline-none focus:border-orange-500 transition-colors cursor-not-allowed"
          />
          <input
            type="password"
            placeholder="Password"
            disabled
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-faint)] text-sm focus:outline-none focus:border-orange-500 transition-colors cursor-not-allowed"
          />
          <button
            onClick={onSignIn}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm transition-colors mt-1"
          >
            Sign in
          </button>
        </div>

        <p className="text-center text-sm text-[var(--text-muted)] mt-5">
          Don't have an account?{' '}
          <span className="text-orange-500 cursor-not-allowed">Sign up</span>
        </p>

        <p className="text-center text-xs text-[var(--text-faint)] mt-6">Demo mode — click Sign in to continue</p>
      </div>
    </div>
  )
}
