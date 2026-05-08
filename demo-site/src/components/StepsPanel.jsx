const STEP_META = {
  destination:   { name: 'Destination',    subtitle: 'Where to go' },
  trip_type:     { name: 'Trip Type',       subtitle: 'Type of travel' },
  group_size:    { name: 'Travelers',       subtitle: 'Group size' },
  group_type:    { name: 'Group Type',      subtitle: 'Who is travelling' },
  duration:      { name: 'Duration',        subtitle: 'Length of trip' },
  travel_dates:  { name: 'Travel Dates',    subtitle: 'When to travel' },
  budget:        { name: 'Budget',          subtitle: 'Total trip budget' },
  accommodation: { name: 'Accommodation',   subtitle: 'Where to stay' },
  travel_style:  { name: 'Trip Theme',      subtitle: 'Style of travel' },
  activities:    { name: 'Activities',      subtitle: 'Day-by-day plans' },
  transport:     { name: 'Local Transport', subtitle: 'Getting around' },
}

function StepIcon({ status }) {
  if (status === 'confirmed') {
    return (
      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )
  }
  if (status === 'interpreted') {
    return (
      <div className="w-5 h-5 rounded-full border-2 border-orange-400 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-orange-400" />
      </div>
    )
  }
  return <div className="w-5 h-5 rounded-full border-2 border-[var(--border-light)] flex-shrink-0" />
}

function StatusBadge({ status }) {
  if (status === 'confirmed') {
    return (
      <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] px-1.5 py-0.5 rounded-full">
        CONFIRMED
      </span>
    )
  }
  if (status === 'interpreted') {
    return (
      <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] px-1.5 py-0.5 rounded-full">
        EXTRACTED
      </span>
    )
  }
  return (
    <span className="bg-[var(--bg-card)] text-[var(--text-faint)] text-[10px] px-1.5 py-0.5 rounded-full">
      PENDING
    </span>
  )
}

export default function StepsPanel({ steps = [] }) {
  const confirmed = steps.filter(s => s.status === 'confirmed').length
  const total = steps.length || 11
  const percent = Math.round((confirmed / total) * 100)

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-sidebar)' }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--border)] flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--text-muted)]">{confirmed} / {total} steps confirmed</span>
          <span className="text-xs text-[var(--text-muted)]">{percent}%</span>
        </div>
        <div className="w-full h-1 bg-[var(--bg-active)] rounded-full">
          <div className="bg-green-500 h-1 rounded-full transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Step list */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {steps.map((step) => {
            const meta = STEP_META[step.step_name] || { name: step.step_name, subtitle: '' }
            const hasValue = step.value && (step.status === 'confirmed' || step.status === 'interpreted')

            return (
              <div key={step.step_number} className="flex items-start gap-3 px-4 py-3 border-b border-[var(--border)] last:border-0">
                <div className="mt-0.5">
                  <StepIcon status={step.status} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-[var(--text-primary)] truncate">{meta.name}</span>
                    <StatusBadge status={step.status} />
                  </div>
                  <p className="text-xs text-[var(--text-faint)] mt-0.5">{meta.subtitle}</p>
                  {hasValue && (
                    <p className="text-xs text-[var(--text-secondary)] mt-1 break-words">{step.value}</p>
                  )}
                  {step.status === 'interpreted' && (
                    <button
                      disabled
                      className="bg-orange-500/50 text-white/60 text-xs px-3 py-1 rounded-md font-medium mt-1.5 cursor-not-allowed"
                      title="Confirm disabled in demo"
                    >
                      ✓ Confirm
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
