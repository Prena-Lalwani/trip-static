import { useEffect, useState } from 'react'
import { loadDemoData } from './data/loader'
import Sidebar from './components/Sidebar'
import TripChatArea from './components/TripChatArea'

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDemoData()
      .then(setData)
      .catch(() => setError('Failed to load demo data. Run export_demo_data.py first.'))
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950 text-center px-6">
        <div>
          <span className="text-4xl block mb-4">⚠️</span>
          <p className="text-zinc-300 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Loading demo…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[var(--bg-base)] overflow-hidden">
      <Sidebar trip={data.trip} members={data.members} />
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
