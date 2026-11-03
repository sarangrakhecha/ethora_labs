import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductArt from "@/components/ProductArt";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Products | Ethora Labs",
  description: "Culprit, a Chrome extension for software debugging, and RenewGuard, renewal and recurring-commitment management. Products built by Ethora Labs.",
};

type Row = {
  kind: string; name: string; tagline: string; summary: string;
  art: "culprit" | "renewguard" | "terminal";
  facts: string[]; chip: string; highlight: boolean;
  href: string; cta: string; external: boolean;
};

const rows: Row[] = [
  ...products.map((p) => ({
    kind: p.kind, name: p.name, tagline: p.tagline, summary: p.summary, art: p.art,
    facts: [] as string[], chip: p.status.label, highlight: p.status.available,
    href: `/products/${p.slug}`, cta: `About ${p.name}`, external: false,
  })),
  {
    kind: "Open source",
    name: "TerminalQuest",
    tagline: "Learn the terminal by saving a ship \u2014 not by reading slides.",
    summary:
      "A small arcade game that teaches the command line by making you use it. Each station drops you into a real bash prompt: what you type actually runs, and a real file has to move before anything unlocks. Open source, free to play and fork.",
    art: "terminal",
    // Figures taken from TerminalQuest's own README.
    facts: ["8 commands, 3 levels", "502 automated tests", "98% coverage", "Zero dependencies", "MIT"],
    chip: "",
    highlight: false,
    href: "https://github.com/sarangrakhecha/TerminalQuest",
    cta: "View on GitHub",
    external: true,
  },
];

export default function ProductsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Products we build"
        intro="Alongside our consulting work, we build our own products: one available today, one in development. We also publish open-source CLI tools on GitHub."
      />

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          {rows.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <article className="group overflow-hidden rounded-xl border border-ivory/15 bg-navy-deep transition-colors hover:border-gold/60 md:grid md:grid-cols-2">
                <div className={`overflow-hidden ${i % 2 ? "md:order-2" : ""}`}>
                  <div className="aspect-[400/150] transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <ProductArt name={r.art} />
                  </div>
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">{r.kind}</p>
                  <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{r.name}</h2>
                  <p className="mt-2 font-serif text-xl italic text-muted-dark">{r.tagline}</p>
                  <p className="mt-5 leading-relaxed text-muted-dark">{r.summary}</p>

                  {r.facts.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {r.facts.map((f) => (
                        <li key={f} className="rounded-full border border-ivory/20 px-3 py-1 text-sm text-muted-dark">{f}</li>
                      ))}
                    </ul>
                  )}

                  {r.chip && (
                  <p className="mt-5">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${r.highlight ? "border-gold/50 bg-gold/10 text-ivory" : "border-ivory/25 text-muted-dark"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${r.highlight ? "bg-gold" : "bg-slate"}`} aria-hidden="true" />
                      {r.chip}
                    </span>
                  </p>
                  )}

                  {r.external ? (
                    <a href={r.href} target="_blank" rel="noopener noreferrer"
                      className="mt-7 inline-flex min-h-11 items-center gap-2 self-start rounded text-[15px] font-medium text-gold hover:text-ivory">
                      {r.cta} <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <Link href={r.href} className="mt-7 inline-flex min-h-11 items-center gap-2 self-start rounded text-[15px] font-medium text-gold hover:text-ivory">
                      {r.cta} <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}

          <p className="pt-2 text-muted-dark">
            Looking for our consulting work instead?{" "}
            <Link href="/services" className="text-gold underline underline-offset-4 hover:text-ivory">See our capabilities</Link>.
          </p>
        </div>
      </section>

      <CtaBand>Interested in one of our products, or have a problem you think we should be solving? Tell us about it.</CtaBand>
    </>
  );
}
