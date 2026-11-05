/**
 * Technologies hero's right-side composition: the four selection criteria named in the
 * intro paragraph (maintainability, reliability, performance, long-term value), shown
 * as spokes around a central "fit" node rather than restated as another sentence.
 */
export default function HeroMark() {
  const spokes = [
    { label: "MAINTAINABILITY", x: 321, y: 55, anchor: "middle" as const },
    { label: "RELIABILITY", x: 540, y: 201, anchor: "start" as const },
    { label: "PERFORMANCE", x: 321, y: 347, anchor: "middle" as const },
    { label: "LONG-TERM VALUE", x: 102, y: 201, anchor: "end" as const },
  ];
  const nodes = [
    [321, 95], [500, 201], [321, 307], [142, 201],
  ] as const;

  return (
    <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden="true">
      <svg viewBox="-70 0 760 395" className="h-auto w-full drop-shadow-[0_0_36px_rgba(196,167,122,0.1)]">
        <defs>
          <radialGradient id="techHeroGlow" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#C4A77A" stopOpacity=".18" />
            <stop offset="1" stopColor="#C4A77A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="321" cy="201" r="160" fill="url(#techHeroGlow)" />
        <g stroke="#C4A77A" fill="none">
          <circle cx="321" cy="201" r="145" opacity=".16" strokeDasharray="4 7" />
          {nodes.map(([x, y], i) => (
            <path key={i} d={`M321,201 L${x},${y}`} strokeWidth="1" opacity=".4" />
          ))}
          <circle cx="321" cy="201" r="26" strokeWidth="1.3" opacity=".6" />
        </g>
        <g fill="#C4A77A" stroke="none">
          <circle cx="321" cy="201" r="4" />
          {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" />)}
        </g>
        <g fill="#D9C8A8" fontSize="11.5" letterSpacing="1.8" style={{ fontFamily: "system-ui, sans-serif" }}>
          {spokes.map((s) => <text key={s.label} x={s.x} y={s.y} textAnchor={s.anchor}>{s.label}</text>)}
        </g>
        <text x="321" y="205" textAnchor="middle" fill="#F6F3EC" fontSize="11" letterSpacing="1.5" style={{ fontFamily: "system-ui, sans-serif" }}>FIT</text>
      </svg>
      <p className="mt-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-dark">Chosen for the problem, not the trend</p>
    </div>
  );
}
