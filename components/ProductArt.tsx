/**
 * Abstract, non-literal artwork for the product showcases.
 * These are brand graphics, NOT screenshots or product UI, and are never labelled as such.
 * TODO: real screenshots replace these once supplied.
 */
export default function ProductArt({ name, className = "" }: { name: "culprit" | "renewguard"; className?: string }) {
  const common = { className: `h-full w-full ${className}`, viewBox: "0 0 400 260", fill: "none", "aria-hidden": true as const };

  if (name === "culprit") {
    // Inspection motif: a field of nodes with one isolated and brought into focus.
    return (
      <svg {...common}>
        <defs>
          <radialGradient id="cg" cx="58%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#C4A77A" stopOpacity=".20" />
            <stop offset="100%" stopColor="#C4A77A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="260" fill="#0B1420" />
        <rect width="400" height="260" fill="url(#cg)" />
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 11 }).map((_, c) => {
            const x = 32 + c * 34, y = 30 + r * 33;
            const target = r === 3 && c === 6;
            return <circle key={`${r}-${c}`} cx={x} cy={y} r={target ? 4 : 2} fill={target ? "#C4A77A" : "#F6F3EC"} opacity={target ? 1 : 0.18} />;
          })
        )}
        {/* reticle over the isolated node */}
        <circle cx="236" cy="129" r="30" stroke="#C4A77A" strokeWidth="1.5" opacity=".9" />
        <circle cx="236" cy="129" r="46" stroke="#C4A77A" strokeWidth="1" opacity=".35" />
        <path d="M236 83v22M236 153v22M190 129h22M260 129h22" stroke="#C4A77A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // RenewGuard — cycle motif: a recurring ring with the next due point marked ahead of time.
  return (
    <svg {...common}>
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#C4A77A" stopOpacity=".16" />
          <stop offset="100%" stopColor="#C4A77A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="#0B1420" />
      <rect width="400" height="260" fill="url(#rg)" />
      <circle cx="200" cy="130" r="84" stroke="#F6F3EC" strokeWidth="1" opacity=".16" />
      <circle cx="200" cy="130" r="62" stroke="#F6F3EC" strokeWidth="1" opacity=".1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = 200 + Math.cos(a) * 74, y1 = 130 + Math.sin(a) * 74;
        const x2 = 200 + Math.cos(a) * 84, y2 = 130 + Math.sin(a) * 84;
        return <path key={i} d={`M${x1} ${y1}L${x2} ${y2}`} stroke="#F6F3EC" strokeWidth="1.5" opacity={i === 2 ? 0 : 0.22} strokeLinecap="round" />;
      })}
      {/* elapsed arc, then the marker for what is coming up */}
      <path d="M200 46a84 84 0 0 1 72.7 41.9" stroke="#C4A77A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="272.7" cy="87.9" r="6" fill="#C4A77A" />
      <circle cx="272.7" cy="87.9" r="13" stroke="#C4A77A" strokeWidth="1.5" opacity=".45" />
      <path d="M200 130v-34" stroke="#C4A77A" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      <circle cx="200" cy="130" r="3.5" fill="#C4A77A" />
    </svg>
  );
}
