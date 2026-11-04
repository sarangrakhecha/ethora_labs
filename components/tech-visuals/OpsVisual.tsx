import { Icon } from "../Icons";

// Cloud, deployment & engineering-operations technologies: one shared stage row
// (how this site itself actually ships a change), with the relevant stage(s)
// highlighted per technology -- rather than three unrelated, disconnected diagrams.

const STAGES = ["Commit", "Typecheck", "Test", "Build", "Deploy"];
const HIGHLIGHT: Record<string, string[]> = {
  git: ["Commit"],
  pipeline: ["Typecheck", "Test", "Build"],
  cloudflare: ["Deploy"],
};

export default function OpsVisual({ id }: { id: string }) {
  const active = HIGHLIGHT[id] ?? [];
  return (
    <div>
      <p className="text-sm text-slate">How this site itself ships a change</p>
      <ol className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {STAGES.map((s, i) => {
          const on = active.includes(s);
          return (
            <li key={s} className="flex items-center gap-1.5">
              <span className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${on ? "border-gold bg-gold/15 text-ivory" : "border-ivory/20 text-muted-dark"}`}>
                {s}
              </span>
              {i < STAGES.length - 1 && <Icon name="arrow" className="h-3.5 w-3.5 shrink-0 text-slate" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
