export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="20 20 160 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="raahi-mg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fb923c' }} />
          <stop offset="100%" style={{ stopColor: '#ea580c' }} />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#raahi-mg1)" />
      <circle cx="125" cy="75" r="14" fill="#ffffff" opacity="0.9" />
      <path d="M 30 145 L 75 80 L 110 130 L 130 110 L 170 145 Z" fill="#9a3412" opacity="0.6" />
      <path d="M 30 145 L 65 95 L 100 145 Z" fill="#ffffff" />
      <path d="M 65 95 L 75 110 L 70 110 L 60 110 Z" fill="#ea580c" />
      <path d="M 90 145 L 130 100 L 170 145 Z" fill="#ffffff" opacity="0.85" />
      <circle cx="50" cy="55" r="2" fill="#ffffff" opacity="0.9" />
      <circle cx="160" cy="50" r="2.5" fill="#ffffff" opacity="0.8" />
      <circle cx="55" cy="40" r="1.5" fill="#ffffff" opacity="0.7" />
    </svg>
  )
}
