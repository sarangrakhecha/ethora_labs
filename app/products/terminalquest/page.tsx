import type { Metadata } from "next";
import Link from "next/link";
import { products, openSource } from "@/lib/products";
import ProductArt from "@/components/ProductArt";
import ScreenshotStrip from "@/components/ScreenshotStrip";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `${openSource.name} | Ethora Labs`,
  description: openSource.summary,
  alternates: { canonical: "https://ethoralabs.co/products/terminalquest/" },
};

export default function TerminalQuestPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }]}
        eyebrow="Open source · Not a product"
        title={openSource.name}
        intro={openSource.summary}
      />

      {/* Status + primary action, matching the product pages' pattern */}
      <section className="border-b border-ivory/10 bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-slate" aria-hidden="true" />
              Open source on GitHub
            </p>
            <p className="mt-2 max-w-xl text-muted-dark">
              A personal open-source project, not one of Ethora&rsquo;s own products — free to play, read and fork under MIT.
            </p>
          </div>
          <a href={openSource.href} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
            View on GitHub <Icon name="arrow" />
          </a>
        </div>
      </section>

      {/* Screenshots, rendered from the game's own drawing code \u2014 not mockups */}
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal>
            <ScreenshotStrip shots={openSource.screenshots} label={openSource.name} />
          </Reveal>
        </div>
      </section>

      {/* Why it exists */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Why it exists</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-light">{openSource.why}</p>
          </Reveal>
        </div>
      </section>

      {/* The loop */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">How it works</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {openSource.loop.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-ivory/15 bg-navy-deep p-6">
                    <span className="font-serif text-2xl text-gold" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-serif text-xl">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-dark">{step.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Facts + philosophy */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">At a glance</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
            <ul className="mt-6 flex flex-wrap gap-2">
              {openSource.facts.map((f) => (
                <li key={f} className="rounded-full border border-gold-deep/40 px-3 py-1.5 text-sm text-muted-light">{f}</li>
              ))}
            </ul>
            <p className="mt-6 max-w-md leading-relaxed text-muted-light">
              Figures are from the project&rsquo;s own test suite and documentation, not a claim made on its behalf.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-3xl sm:text-4xl">Design principles</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
            <ul className="mt-6 space-y-3">
              {openSource.philosophy.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-muted-light">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />{p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Our products */}
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl">Ethora&rsquo;s products</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group flex h-full flex-col gap-4 rounded-xl border border-ivory/15 p-6 transition-colors hover:border-gold/70 sm:flex-row sm:items-center">
                  <div className="h-24 w-40 shrink-0 overflow-hidden rounded-lg"><ProductArt name={p.art} /></div>
                  <span>
                    <span className="block font-serif text-xl">{p.name}</span>
                    <span className="mt-1 block text-sm text-muted-dark">{p.tagline}</span>
                  </span>
                  <Icon name="arrow" className="text-gold sm:ml-auto" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gold/30 bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">Read the code, or play it</h2>
            <p className="mt-3 max-w-xl text-muted-dark">The full source, the test suite and the install instructions are on GitHub.</p>
          </div>
          <a href={openSource.href} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
            View on GitHub <Icon name="arrow" />
          </a>
        </div>
      </section>
    </>
  );
}
