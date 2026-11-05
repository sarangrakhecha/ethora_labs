import { Icon } from "@/components/Icons";
import { noWidow } from "@/lib/typography";

/**
 * Technologies hero's right-side composition: the four selection criteria named in the
 * intro paragraph, as labelled cards connected to a center "Fit for the problem" capsule
 * -- matching the user-approved reference design. Desktop uses an absolute-positioned
 * grid plus a percentage-based SVG overlay for the connector lines (same technique as
 * EngineeringCanvas's loop, which keeps strokes a constant width as the column scales).
 * Below `lg` the connectors and orbit ring are dropped and the capsule moves above a
 * plain 2x2 grid, rather than overlapping it.
 */
const criteria = [
  { icon: "layers", title: "Maintainability", body: "Easy to evolve, keep, and extend." },
  { icon: "shield", title: "Reliability", body: "Dependable in real-world conditions." },
  { icon: "chart", title: "Long-term value", body: "A sound investment that compounds over time." },
  { icon: "bolt", title: "Performance", body: "Meets real needs, with headroom to scale." },
] as const;

const positions = ["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"] as const;

// Card-corner-to-capsule connectors -- coordinates scaled from the approved reference's
// own SVG (640x350 viewBox) into this component's 100x70 space, so each of the four
// curves lands on its own distinct point near the capsule instead of four lines
// converging on one or two shared endpoints (which reads as two big arcs, not four).
const lines = [
  "M39,19 C44,19 45,29 47,31",
  "M61,19 C56,19 55,29 53,31",
  "M39,52 C44,52 45,42 47,40",
  "M61,52 C56,52 55,42 53,40",
];

function Chip({ icon }: { icon: string }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/[0.06]">
      <Icon name={icon} className="h-4 w-4 text-gold" />
    </span>
  );
}

function Capsule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-full border border-gold bg-navy-deep px-4 py-3 shadow-[0_0_20px_rgba(196,167,122,0.3)] ${className}`}>
      <Icon name="layers" className="h-5 w-5 shrink-0 text-gold" />
      <p className="text-[13px] font-semibold leading-tight text-ivory">Fit for the<br />problem</p>
    </div>
  );
}

export default function HeroMark() {
  return (
    <div className="mx-auto w-full max-w-[32rem]" aria-hidden="true">
      {/* Desktop: four cards around a connected center capsule */}
      <div className="relative hidden lg:block" style={{ aspectRatio: "100 / 70" }}>
        <div className="absolute left-1/2 top-1/2 aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dotted border-gold/40" />
        <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          {lines.map((d) => (
            <path key={d} d={d} fill="none" stroke="#C4A77A" strokeWidth="1" opacity=".6" vectorEffect="non-scaling-stroke" />
          ))}
          {["39,19", "61,19", "39,52", "61,52"].map((p) => {
            const [cx, cy] = p.split(",");
            return <circle key={p} cx={cx} cy={cy} r="1" fill="#C4A77A" />;
          })}
        </svg>

        {criteria.map((c, i) => (
          <div key={c.title} className={`absolute w-[39%] rounded-xl border border-ivory/20 bg-navy-deep/90 p-3.5 ${positions[i]}`}>
            <div className="flex items-start gap-3">
              <Chip icon={c.icon} />
              <div>
                <p className="text-[14px] font-semibold text-ivory">{c.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted-dark">{noWidow(c.body)}</p>
              </div>
            </div>
          </div>
        ))}

        <Capsule className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Below lg: capsule above a plain 2x2 grid -- no connectors to keep aligned. */}
      <div className="lg:hidden">
        <Capsule className="mx-auto w-fit" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          {criteria.map((c) => (
            <div key={c.title} className="rounded-xl border border-ivory/20 bg-navy-deep/90 p-3">
              <Chip icon={c.icon} />
              <p className="mt-2 text-[13px] font-semibold text-ivory">{c.title}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted-dark">{noWidow(c.body)}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 flex items-center justify-center gap-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-dark">
        <span className="hidden h-px w-6 shrink-0 bg-gold/50 sm:block" aria-hidden="true" />
        Our technology decision framework
        <span className="hidden h-px w-6 shrink-0 bg-gold/50 sm:block" aria-hidden="true" />
      </p>
    </div>
  );
}
