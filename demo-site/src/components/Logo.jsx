export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dashed flight arc */}
      <path
        d="M 5 32 Q 22 3 39 32"
        stroke="#f97316"
        strokeWidth="2"
        strokeDasharray="3 2.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Origin dot */}
      <circle cx="5" cy="32" r="3" fill="#f97316" />
      {/* Destination dot */}
      <circle cx="39" cy="32" r="3" fill="#f97316" />
      {/* Plane at ~35% along arc, tilted ~-25° */}
      <g transform="translate(17.5, 17) rotate(-28)">
        {/* Body */}
        <ellipse cx="0" cy="0" rx="1.6" ry="5.2" fill="#f97316" />
        {/* Left wing */}
        <path d="M -1.2 -0.5 L -9 3.5 L -8 5 L -1.2 2.2 Z" fill="#f97316" />
        {/* Right wing */}
        <path d="M 1.2 -0.5 L 9 3.5 L 8 5 L 1.2 2.2 Z" fill="#f97316" />
        {/* Tail fins */}
        <path d="M -0.9 3.8 L -4 6.5 L -3.4 7.5 L 0 6 L 3.4 7.5 L 4 6.5 L 0.9 3.8 Z" fill="#f97316" />
      </g>
    </svg>
  )
}
