import { Icon } from "@/components/Icons";

/**
 * Technologies hero's right-side composition: the four selection criteria named in the
 * intro paragraph, as labelled cards around a center card -- not an abstract diagram
 * that needs its own legend to be read. Built with the same card/connector pattern as
 * EngineeringCanvas (HTML cards + a percentage-based SVG overlay for the lines), rather
 * than a hand-tuned fixed-pixel SVG, so it stays legible as the column narrows.
 */
const criteria = [
  { icon: "layers", title: "Maintainability", body: "Easy to evolve, keep, and extend.", pos: "left-0 top-0" },
  { icon: "shield", title: "Reliability", body: "Dependable in real-world conditions.", pos: "right-0 top-0" },
  { icon: "chart", title: "Long-term value", body: "A sound investment that compounds over time.", pos: "left-0 bottom-0" },
  { icon: "target", title: "Performance", body: "Meets real needs, with headroom to scale.", pos: "right-0 bottom-0" },
] as const;

// Card-to-center connector endpoints, in the same 0-100 x 0-78 space as the cards'
// percentage positions below -- each pair is [corner nearest the center, center point].
const lines = [
  "M38,30 L50,39", "M62,30 L50,39", "M38,48 L50,39", "M62,48 L50,39",
];

export default function HeroMark() {
  return (
    <div className="mx-auto w-full max-w-[30rem]" aria-hidden="true">
      <div className="relative" style={{ aspectRatio: "100 / 78" }}>
        <svg viewBox="0 0 100 78" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          {lines.map((d) => (
            <path key={d} d={d} fill="none" stroke="#C4A77A" strokeWidth="1" opacity=".55" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        {criteria.map((c) => (
          <div key={c.title} className={`absolute w-[42%] rounded-xl border border-ivory/20 bg-navy-deep/80 p-3 ${c.pos}`}>
            <Icon name={c.icon} className="h-5 w-5 text-gold" />
            <p className="mt-1.5 text-[13px] font-medium text-ivory">{c.title}</p>
            <p className="mt-0.5 text-xs leading-snug text-muted-dark">{c.body}</p>
          </div>
        ))}

        <div className="absolute left-1/2 top-[50%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold bg-navy-deep px-3 py-2.5 text-center shadow-[0_0_28px_rgba(196,167,122,0.25)]">
          <Icon name="gear" className="mx-auto h-5 w-5 text-gold" />
          <p className="mt-1 text-[13px] font-medium leading-snug text-ivory">Fit for the problem</p>
        </div>
      </div>
      <p className="mt-5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-dark">Our technology decision framework</p>
    </div>
  );
}
