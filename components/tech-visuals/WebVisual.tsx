// Application & UI technologies: each visual reflects this site's own, real structure
// (its routes, its component tree, its own design tokens, its own build scripts)
// rather than a generic or invented illustration.

const ROUTES = ["/", "/services/[slug]", "/products/[slug]", "/technologies", "/about"];
const COMPONENT_TREE = ["Header", "TechnologyExplorer", "   Selector", "   Preview panel", "Footer"];
const SCRIPTS = ["npm run lint", "npm run test:unit", "npm run build", "npm run test:e2e"];
const TOKENS = [
  { name: "navy", hex: "#101C2A" },
  { name: "ivory", hex: "#F6F3EC" },
  { name: "gold", hex: "#C4A77A" },
  { name: "slate", hex: "#83929B" },
];

export default function WebVisual({ id }: { id: string }) {
  if (id === "nextjs") {
    return (
      <div>
        <p className="text-sm text-slate">This site&rsquo;s own route structure</p>
        <ul className="mt-3 space-y-1.5 font-mono text-sm">
          {ROUTES.map((r, i) => (
            <li key={r} className={`text-ivory/90 ${i > 0 ? "ml-1.5 border-l border-gold/30 pl-5" : ""}`}>{r}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (id === "react") {
    return (
      <div>
        <p className="text-sm text-slate">This page&rsquo;s own component tree</p>
        <ul className="mt-3 space-y-1.5 font-mono text-sm text-ivory/90">
          {COMPONENT_TREE.map((c) => <li key={c} className="whitespace-pre">{c}</li>)}
        </ul>
      </div>
    );
  }

  if (id === "typescript") {
    return (
      <div>
        <p className="text-sm text-slate">The real type behind this explorer&rsquo;s own data</p>
        <div className="mt-3 rounded-lg bg-navy p-4 font-mono text-[13px] leading-relaxed text-ivory/80">
          <p><span className="text-gold">type</span> Technology = {"{"}</p>
          <p className="pl-4">role: <span className="text-gold">string</span>;</p>
          <p className="pl-4">visual: <span className="text-gold">&quot;web&quot; | &quot;testing&quot; | &quot;ops&quot;</span>;</p>
          <p>{"}"}</p>
        </div>
      </div>
    );
  }

  if (id === "tailwind") {
    return (
      <div>
        <p className="text-sm text-slate">This site&rsquo;s own design tokens</p>
        <ul className="mt-3 grid grid-cols-2 gap-3">
          {TOKENS.map((t) => (
            <li key={t.name} className="flex items-center gap-3 rounded-lg border border-ivory/15 p-3">
              <span className="h-8 w-8 shrink-0 rounded border border-ivory/15" style={{ background: t.hex }} aria-hidden="true" />
              <span><span className="block text-sm font-medium text-ivory">{t.name}</span><span className="block font-mono text-xs text-slate">{t.hex}</span></span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // nodejs
  return (
    <div>
      <p className="text-sm text-slate">This site&rsquo;s own build scripts, run in sequence</p>
      <ol className="mt-3 space-y-2">
        {SCRIPTS.map((s, i) => (
          <li key={s} className="flex items-center gap-3 font-mono text-sm text-ivory/90">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 text-xs text-gold">{i + 1}</span>{s}
          </li>
        ))}
      </ol>
    </div>
  );
}
