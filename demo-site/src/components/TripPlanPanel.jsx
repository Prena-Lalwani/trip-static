import { useState } from 'react'

function ExpandSection({ label, expanded, onToggle, children }) {
  return (
    <div className="border-t border-[var(--border)]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--bg-card)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg
            className={`w-3 h-3 text-[var(--text-muted)] transition-transform ${expanded ? '' : '-rotate-90'}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="text-sm text-[var(--text-secondary)] font-medium">{label}</span>
        </div>
      </button>
      {expanded && <div className="px-4 pb-3">{children}</div>}
    </div>
  )
}

export default function TripPlanPanel({ plan = null }) {
  const [selectedDay, setSelectedDay] = useState(1)
  const [expanded, setExpanded] = useState({ places: true, activities: false, budget: false })
  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  if (!plan || !plan.days?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6" style={{ background: 'var(--bg-sidebar)' }}>
        <span className="text-4xl mb-3">✈️</span>
        <p className="text-[var(--text-secondary)] font-medium text-sm">Trip plan coming soon</p>
        <p className="text-[var(--text-faint)] text-xs mt-2 leading-relaxed">
          Complete all 11 steps — your personalized itinerary will appear here.
        </p>
      </div>
    )
  }

  const days = plan.days
  const currentDay = days.find(d => d.day_number === selectedDay) ?? days[0]
  const breakdown = currentDay?.budget_breakdown ?? {}
  const allDayBudgets = days.reduce((sum, d) => sum + (d.budget_breakdown?.total ?? 0), 0)

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-sidebar)' }}>

      {/* Ready badge */}
      <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between flex-shrink-0">
        <span className="text-xs text-[var(--text-muted)]">{plan.trip_theme ?? 'Trip'} · ready to book</span>
        <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          READY
        </span>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col">

        {/* Hero */}
        <div className="relative h-40 bg-gradient-to-br from-zinc-700 to-zinc-900 overflow-hidden flex-shrink-0">
          {plan.hero_image && (
            <img src={plan.hero_image} alt="" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none' }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {plan.trip_theme && (
            <div className="absolute top-3 left-3">
              <span className="text-xs font-bold bg-orange-500 text-white px-2 py-1 rounded">{plan.trip_theme}</span>
            </div>
          )}
          {plan.trip_title && (
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-bold text-sm leading-tight">{plan.trip_title}</p>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="px-4 py-3 space-y-2 border-b border-[var(--border)] flex-shrink-0">
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] flex-wrap">
            {plan.dates       && <span>📅 {plan.dates}</span>}
            {plan.travelers   && <span>👥 {plan.travelers}</span>}
            {plan.total_budget && <span>💰 ${plan.total_budget.toLocaleString()}</span>}
            {plan.destination && <span>📍 {plan.destination}</span>}
          </div>
          {plan.budget_per_person && (
            <p className="text-xs text-[var(--text-faint)]">${plan.budget_per_person}/person · {days.length} days</p>
          )}
        </div>

        {/* Day tabs */}
        <div className="px-4 pb-3 border-b border-[var(--border)] pt-3 flex-shrink-0">
          <p className="text-[10px] font-bold text-[var(--text-faint)] uppercase tracking-widest mb-2">Itinerary</p>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {days.map(d => (
              <button
                key={d.day_number}
                onClick={() => setSelectedDay(d.day_number)}
                className={`flex-shrink-0 w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                  selectedDay === d.day_number
                    ? 'bg-orange-500 text-white'
                    : 'bg-[var(--bg-active)] text-[var(--text-muted)] hover:bg-[var(--bg-card)]'
                }`}
              >
                D{d.day_number}
              </button>
            ))}
          </div>
          {currentDay && (
            <div className="mt-2">
              <p className="text-[10px] font-bold text-[var(--text-faint)]">DAY {currentDay.day_number}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{currentDay.summary}</p>
            </div>
          )}
        </div>

        {/* Expandable sections */}
        <div className="flex-shrink-0">
          <ExpandSection label="Places" expanded={expanded.places} onToggle={() => toggle('places')}>
            {currentDay?.places?.length ? (
              <ul className="space-y-1.5">
                {currentDay.places.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="text-orange-400 mt-0.5 flex-shrink-0">•</span>{p}
                  </li>
                ))}
              </ul>
            ) : <p className="text-xs text-[var(--text-faint)]">No places listed for this day.</p>}
          </ExpandSection>

          <ExpandSection label="Activities" expanded={expanded.activities} onToggle={() => toggle('activities')}>
            {currentDay?.activities?.length ? (
              <ul className="space-y-1.5">
                {currentDay.activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="text-orange-400 mt-0.5 flex-shrink-0">•</span>{a}
                  </li>
                ))}
              </ul>
            ) : <p className="text-xs text-[var(--text-faint)]">No activities listed for this day.</p>}
          </ExpandSection>

          <ExpandSection label="Daily Breakdown" expanded={expanded.budget} onToggle={() => toggle('budget')}>
            {(() => {
              const maxTotal = Math.max(...days.map(d => d.budget_breakdown?.total ?? 0), 1)
              return (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    {days.map(d => {
                      const total = d.budget_breakdown?.total ?? 0
                      const pct = Math.round((total / maxTotal) * 100)
                      const isSelected = d.day_number === selectedDay
                      return (
                        <button key={d.day_number} onClick={() => setSelectedDay(d.day_number)} className="w-full flex items-center gap-2 group">
                          <span className={`text-[10px] w-6 flex-shrink-0 text-right font-mono ${isSelected ? 'text-orange-400' : 'text-[var(--text-faint)]'}`}>D{d.day_number}</span>
                          <div className="flex-1 h-4 bg-[var(--bg-active)] rounded-sm overflow-hidden">
                            <div className={`h-full rounded-sm transition-all ${isSelected ? 'bg-orange-500' : 'bg-[var(--bg-card)] group-hover:bg-[var(--border-light)]'}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className={`text-[10px] w-10 text-right flex-shrink-0 font-mono ${isSelected ? 'text-orange-400 font-bold' : 'text-[var(--text-faint)]'}`}>${total}</span>
                        </button>
                      )
                    })}
                  </div>
                  {Object.keys(breakdown).length > 0 && (
                    <div className="border-t border-[var(--border)] pt-2.5 space-y-1.5">
                      <p className="text-[10px] font-bold text-[var(--text-faint)] uppercase tracking-wide mb-1">Day {selectedDay} breakdown</p>
                      {['transport', 'food', 'activities', 'accommodation'].map(key => (
                        breakdown[key] != null && (
                          <div key={key} className="flex items-center justify-between text-xs">
                            <span className="text-[var(--text-muted)] capitalize">{key}</span>
                            <span className="text-[var(--text-secondary)]">${breakdown[key]}</span>
                          </div>
                        )
                      ))}
                      <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[var(--border-light)] mt-1">
                        <span className="text-[var(--text-secondary)] font-semibold">Day Total</span>
                        <span className="text-orange-400 font-bold">${breakdown.total ?? 0}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </ExpandSection>
        </div>

        {allDayBudgets > 0 && (
          <div className="px-4 py-3 border-t border-[var(--border)] flex items-center justify-between flex-shrink-0">
            <span className="text-xs text-[var(--text-muted)]">Trip total</span>
            <span className="text-sm font-bold text-[var(--text-primary)]">${allDayBudgets.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 border-t border-[var(--border)] p-3 flex items-center gap-3">
        <button className="flex-1 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
          + Book this trip
        </button>
        <button className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Share</button>
      </div>
    </div>
  )
}
