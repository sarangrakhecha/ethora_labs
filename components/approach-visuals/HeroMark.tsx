/**
 * Approach hero's right-side composition: the same Design -> Build -> Verify -> Improve
 * cycle the page describes below, previewed as a loop rather than a fifth restatement
 * of the sequence in prose. The open arrow from Improve back to Design is the point:
 * the page's closing line says the cycle repeats, not that it ends.
 */
const stages = [
  { label: "DESIGN", x: 321, y: 61 },
  { label: "BUILD", x: 466, y: 201 },
  { label: "VERIFY", x: 321, y: 341 },
  { label: "IMPROVE", x: 176, y: 201 },
];

export default function HeroMark() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden="true">
      <svg viewBox="0 0 620 395" className="h-auto w-full drop-shadow-[0_0_36px_rgba(196,167,122,0.1)]">
        <defs>
          <marker id="approachArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="#C4A77A" />
          </marker>
        </defs>
        <g stroke="#C4A77A" fill="none">
          <circle cx="321" cy="201" r="104" opacity=".16" strokeDasharray="4 7" />
          {/* The loop itself, left open at the top so the arrowhead can show it re-entering Design. */}
          <path d="M339,99 A104,104 0 1 1 303,99" strokeWidth="1.4" opacity=".7" markerEnd="url(#approachArrow)" />
        </g>
        <g fill="#C4A77A" stroke="none">
          {stages.map((s) => <circle key={s.label} cx={s.x} cy={s.y} r="5" />)}
        </g>
        <g fill="#D9C8A8" fontSize="12" letterSpacing="2.2" style={{ fontFamily: "system-ui, sans-serif" }}>
          <text x="321" y="40" textAnchor="middle">DESIGN</text>
          <text x="505" y="205" textAnchor="start">BUILD</text>
          <text x="321" y="372" textAnchor="middle">VERIFY</text>
          <text x="137" y="205" textAnchor="end">IMPROVE</text>
        </g>
      </svg>
      <p className="mt-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-dark">A cycle, not a finish line</p>
    </div>
  );
}
