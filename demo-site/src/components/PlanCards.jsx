const GENRE_COLORS = {
  'Adventure & Outdoors': { badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  'Culture & History':    { badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  'Food & Nightlife':     { badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
  'Beach & Relaxation':   { badge: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
  'Spiritual & Wellness': { badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  'Photography & Scenic': { badge: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
  'Shopping & Lifestyle': { badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  'Wildlife & Nature':    { badge: 'bg-lime-500/20 text-lime-400 border-lime-500/30' },
}
const fallback = { badge: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' }

function PlanCard({ plan, index }) {
  const colors = GENRE_COLORS[plan.genre] ?? fallback

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-[var(--bg-card)] ring-1 ring-[var(--border-light)]/50">

      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <span className={`text-xs font-semibold border rounded-full px-2.5 py-1 ${colors.badge}`}>
          {plan.icon} {plan.genre}
        </span>
        <span className="w-5 h-5 rounded-full bg-[var(--bg-active)] flex items-center justify-center text-xs text-[var(--text-muted)] font-bold">
          {index + 1}
        </span>
      </div>

      <div className="relative h-36 flex-shrink-0 bg-[var(--bg-input)] mx-3 rounded-xl overflow-hidden">
        {plan.image ? (
          <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">{plan.icon || '✈️'}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="text-[var(--text-primary)] font-semibold text-sm leading-tight">{plan.title}</h3>
          <p className="text-[var(--text-muted)] text-xs mt-1 leading-relaxed">{plan.tagline}</p>
        </div>

        {plan.vibe && (
          <div className="flex flex-wrap gap-1.5">
            {plan.vibe.split(',').map((v, i) => (
              <span key={i} className="text-xs bg-[var(--bg-input)] text-[var(--text-muted)] rounded-full px-2.5 py-0.5">
                {v.trim()}
              </span>
            ))}
          </div>
        )}

        {plan.budget && (
          <div className="flex items-center gap-2 bg-[var(--bg-input)] rounded-lg px-3 py-2">
            <svg className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-[var(--text-secondary)] font-medium">{plan.budget}</span>
          </div>
        )}

        {plan.places?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">Top Places</p>
            <ul className="space-y-1">
              {plan.places.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <svg className="w-3 h-3 text-[var(--text-muted)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {plan.activities?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">Activities</p>
            <div className="flex flex-wrap gap-1.5">
              {plan.activities.map((a, i) => (
                <span key={i} className="text-xs bg-[var(--bg-input)] text-[var(--text-muted)] rounded px-2 py-0.5">{a}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Pick button disabled in demo */}
        <button
          disabled
          className="w-full mt-1 py-2 rounded-xl text-white/50 text-xs font-semibold bg-zinc-700 cursor-not-allowed"
          title="Pick disabled in demo"
        >
          Pick this →
        </button>
      </div>
    </div>
  )
}

export default function PlanCards({ data }) {
  const plans = data.plans ?? []

  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <div className="flex items-center gap-2">
        <span className="text-[var(--text-primary)] font-semibold text-sm">
          ✈️ {data.destination} — Pick your vibe
        </span>
        <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-2 py-0.5">AI</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {plans.map((plan, i) => (
          <PlanCard key={i} plan={plan} index={i} />
        ))}
      </div>
      <p className="text-xs text-[var(--text-faint)] text-center">Demo mode — pick disabled</p>
    </div>
  )
}
