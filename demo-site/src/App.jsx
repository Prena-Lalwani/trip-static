import { useEffect, useState } from 'react'
import { loadDemoData } from './data/loader'
import Sidebar from './components/Sidebar'
import TripChatArea from './components/TripChatArea'
import SignIn from './components/SignIn'

function applyTheme(mode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = mode === 'dark' || (mode === 'system' && prefersDark)
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [signedIn, setSignedIn] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system')

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyTheme('system')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme])

  useEffect(() => {
    loadDemoData()
      .then(setData)
      .catch(() => setError('Failed to load demo data. Run export_demo_data.py first.'))
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-center px-6" style={{ background: 'var(--bg-base)' }}>
        <div>
          <span className="text-4xl block mb-4">⚠️</span>
          <p className="text-[var(--text-secondary)] font-medium">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: 'var(--bg-base)' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--text-muted)] text-sm">Loading demo…</p>
        </div>
      </div>
    )
  }

  if (!signedIn) {
    return <SignIn onSignIn={() => setSignedIn(true)} theme={theme} setTheme={setTheme} />
  }

  return (
    <div className="flex h-screen bg-[var(--bg-base)] overflow-hidden">
      <Sidebar trip={data.trip} members={data.members} theme={theme} setTheme={setTheme} onSignOut={() => setSignedIn(false)} />
      <main className="flex flex-1 min-w-0 h-full overflow-hidden">
        <TripChatArea
          trip={data.trip}
          messages={data.messages}
          steps={data.steps}
          members={data.members}
        />
      </main>
    </div>
  )
}
