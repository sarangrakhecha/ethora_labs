/**
 * Compact brand motifs for the product cards and the RenewGuard showcase.
 * These are abstract illustrations in Ethora's palette, never presented as product UI.
 * Culprit's real screenshots live in public/products/culprit/.
 */
export default function ProductArt({ name, className = "" }: { name: "culprit" | "renewguard"; className?: string }) {
  const common = { className: `h-full w-full ${className}`, viewBox: "0 0 400 150", fill: "none", "aria-hidden": true as const };

  if (name === "culprit") {
    // Cause and effect: a click, the requests it set off, and the one that failed, isolated.
    return (
      <svg {...common}>
        <defs>
          <radialGradient id="cg" cx="72%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#C4A77A" stopOpacity=".16" />
            <stop offset="100%" stopColor="#C4A77A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="150" fill="#0B1420" />
        <rect width="400" height="150" fill="url(#cg)" />

        {/* the click */}
        <circle cx="54" cy="75" r="5" fill="#C4A77A" />
        <circle cx="54" cy="75" r="13" stroke="#C4A77A" strokeWidth="1.2" opacity=".55" />
        <circle cx="54" cy="75" r="22" stroke="#C4A77A" strokeWidth="1" opacity=".22" />

        {/* what it set off */}
        <path d="M76 75h26" stroke="#C4A77A" strokeWidth="1.2" opacity=".5" />
        <path d="M102 75c14 0 14-29 28-29M102 75h28M102 75c14 0 14 29 28 29" stroke="#F6F3EC" strokeWidth="1.2" opacity=".2" fill="none" />

        {[{ y: 46, ok: true }, { y: 75, ok: false }, { y: 104, ok: true }].map((r) => (
          <g key={r.y} opacity={r.ok ? 0.28 : 1}>
            <rect x="130" y={r.y - 9} width="150" height="18" rx="4"
              stroke={r.ok ? "#F6F3EC" : "#C4A77A"} strokeWidth={r.ok ? 1 : 1.4}
              fill={r.ok ? "none" : "#C4A77A"} fillOpacity={r.ok ? 0 : 0.12} />
            <rect x="139" y={r.y - 3} width="22" height="6" rx="3" fill={r.ok ? "#F6F3EC" : "#C4A77A"} opacity={r.ok ? 0.5 : 1} />
            <rect x="169" y={r.y - 2.5} width={r.ok ? 72 : 92} height="5" rx="2.5" fill="#F6F3EC" opacity={r.ok ? 0.3 : 0.65} />
          </g>
        ))}

        {/* the one that matters, isolated */}
        <circle cx="205" cy="75" r="34" stroke="#C4A77A" strokeWidth="1.3" opacity=".85" />
        <path d="M205 33v10M205 107v10M163 75h10M237 75h10" stroke="#C4A77A" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M300 75h44" stroke="#C4A77A" strokeWidth="1.2" opacity=".5" />
        <path d="M338 70l6 5-6 5" stroke="#C4A77A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  // RenewGuard — the warning arrives before the date does.
  return (
    <svg {...common}>
      <defs>
        <linearGradient id="rgl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C4A77A" stopOpacity="0" />
          <stop offset="100%" stopColor="#C4A77A" stopOpacity=".5" />
        </linearGradient>
      </defs>
      <rect width="400" height="150" fill="#0B1420" />

      {/* the run of time */}
      <path d="M30 95h340" stroke="#F6F3EC" strokeWidth="1" opacity=".18" />
      {Array.from({ length: 13 }).map((_, i) => {
        const x = 30 + i * (340 / 12);
        const major = i % 3 === 0;
        return <path key={i} d={`M${x} ${major ? 86 : 90}v9`} stroke="#F6F3EC" strokeWidth="1" opacity={major ? 0.3 : 0.16} />;
      })}

      {/* today */}
      <path d="M115 48v58" stroke="#F6F3EC" strokeWidth="1.3" opacity=".45" />
      <circle cx="115" cy="95" r="3.5" fill="#F6F3EC" opacity=".6" />

      {/* the notice period, reaching ahead */}
      <rect x="115" y="60" width="160" height="35" rx="4" fill="url(#rgl)" />
      <path d="M115 60h160" stroke="#C4A77A" strokeWidth="1" opacity=".35" strokeDasharray="3 4" />

      {/* the renewal, seen coming */}
      <path d="M275 38v57" stroke="#C4A77A" strokeWidth="1.6" />
      <circle cx="275" cy="95" r="6" fill="#C4A77A" />
      <circle cx="275" cy="95" r="14" stroke="#C4A77A" strokeWidth="1.2" opacity=".5" />
      <circle cx="275" cy="95" r="23" stroke="#C4A77A" strokeWidth="1" opacity=".2" />
      <path d="M268 32h14l-7-11z" fill="#C4A77A" opacity=".9" />
    </svg>
  );
}
