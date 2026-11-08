import type { Metadata } from "next";
import Link from "next/link";
import { products, recurrVision, recurrAudiences, recurrSavingsNote } from "@/lib/products";
import ScreenshotStrip from "@/components/ScreenshotStrip";
import ProductArt from "@/components/ProductArt";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";

const recurr = products.find((p) => p.slug === "recurr")!;
const culprit = products.find((p) => p.slug === "culprit")!;
const WAITLIST_SUBJECT = "Recurr%20Waitlist";
const waitlistHref = `mailto:${recurr.waitlistEmail}?subject=${WAITLIST_SUBJECT}`;

// A restrained forest-green accent for Recurr's own product identity, used only on
// this page -- the rest of the site keeps navy/ivory/gold untouched.
const forest = "#1b4332";

export const metadata: Metadata = {
  title: `${recurr.name} | Ethora Labs`,
  description: recurr.summary,
  alternates: { canonical: "https://ethoralabs.co/products/recurr/" },
  openGraph: { title: `${recurr.name} | Ethora Labs`, description: recurr.summary, url: "https://ethoralabs.co/products/recurr/", siteName: "Ethora Labs", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: `${recurr.name} | Ethora Labs`, description: recurr.summary, images: ["/og.png"] },
};

export default function RecurrPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }]}
        eyebrow={recurr.kind}
        title={recurr.name}
        intro={recurr.summary}
        aside={
          <div className="overflow-hidden rounded-xl border border-ivory/15">
            <div className="aspect-[400/150]"><ProductArt name="recurr" /></div>
          </div>
        }
      />

      {/* Status -- the waitlist CTA lives once, with the sneak peek below, rather than
          repeated here too. */}
      <section className="border-b border-ivory/10 bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 font-medium">
            <span className="h-2 w-2 rounded-full" style={{ background: "#d9a441" }} aria-hidden="true" />
            {recurr.status.label}
          </p>
          <p className="mt-2 max-w-xl text-muted-dark">{recurr.status.detail}</p>
        </div>
      </section>

      {/* Product sneak peek */}
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "#d9a441" }}>Product sneak peek</p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">A first look behind the curtain</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-dark">
                These are real screens from our own build — nothing public yet, but here&rsquo;s exactly what&rsquo;s
                waiting on the other side of the waitlist.
              </p>
            </div>
            <a href={waitlistHref} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[15px] font-medium text-ivory transition-colors hover:brightness-110" style={{ background: forest }}>
              Join the Waitlist <Icon name="arrow" />
            </a>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            {recurr.screenshots.length > 0 ? (
              <ScreenshotStrip shots={recurr.screenshots} label={recurr.name} />
            ) : (
              <div className="overflow-hidden rounded-xl border border-ivory/15"><div className="aspect-[400/150]"><ProductArt name="recurr" /></div></div>
            )}
          </Reveal>
        </div>
      </section>

      {/* What it does */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">What it does</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <ul className="grid gap-4 sm:grid-cols-2">
              {recurr.features.map((f) => (
                <li key={f.title} className="rounded-lg border border-gold-deep/25 bg-white/50 p-5">
                  <h3 className="flex items-start gap-3 font-medium">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />{f.title}
                  </h3>
                  <p className="mt-2 pl-8 leading-relaxed text-muted-light">{f.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Why Recurr exists */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Why Recurr exists</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={80} className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-dark">
            <p>
              The problem was never really remembering a renewal date. Calendars already do that. The real problem is
              that recurring financial and contractual commitments can renew before anyone has consciously decided
              what to do about them.
            </p>
            <p>Recurr aims to turn renewal information into timely, actionable decisions — made before the deadline, not discovered after it.</p>
          </Reveal>
        </div>
      </section>

      {/* Product vision: forward it, we'll track it */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: forest }}>{recurrVision.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{recurrVision.headline}</h2>
            <p className="mt-2 font-serif text-xl italic text-muted-light">{recurrVision.philosophy}</p>
            <p className="mt-4 leading-relaxed text-muted-light">{recurrVision.intro}</p>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {recurrVision.steps.map((step, i) => (
                // The numbered badge sits beside the text as a separate flex child, not
                // inline with it; the no-orphan check can misread that fixed badge as a
                // stray one-word "line" of its own (same case EngineeringCanvas opts out
                // of), so it's deliberately not applied here either.
                <li key={step} data-allow-widow className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-serif text-sm" style={{ borderColor: forest, color: forest }} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-muted-light">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Business and personal */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Business and personal</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={80} className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-slate">{recurrAudiences.business.label}</h3>
              <ul className="mt-3 space-y-2 leading-relaxed text-muted-dark">
                {recurrAudiences.business.items.map((x) => (
                  <li key={x} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-slate">{recurrAudiences.personal.label}</h3>
              <ul className="mt-3 space-y-2 leading-relaxed text-muted-dark">
                {recurrAudiences.personal.items.map((x) => (
                  <li key={x} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />{x}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-12 flex flex-col gap-4 rounded-xl border border-ivory/15 bg-navy-deep p-6 sm:flex-row sm:items-start">
            <Icon name="shield" className="h-6 w-6 shrink-0 text-gold" />
            <p className="leading-relaxed text-muted-dark">{recurrSavingsNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Built by Ethora + our other product, side by side -- two short blocks that
          each left the other half of the row empty when stacked as separate sections. */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Built by Ethora</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
            <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-muted-light">
              <p>
                Recurr is built and maintained by Ethora Labs. It comes from the same engineering approach we
                bring to client work: design the right thing, build it carefully, verify it properly, and keep
                improving it.
              </p>
              <p>If this is a problem you have, we would be glad to hear how you handle it today — it genuinely shapes what we build.</p>
              <p>
                <Link href="/approach" className="text-gold-deep underline underline-offset-4">How we work</Link>
                {" · "}
                <Link href="/#capabilities" className="text-gold-deep underline underline-offset-4">Consulting capabilities</Link>
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-serif text-3xl sm:text-4xl">Our other product</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
            <ul className="mt-8 grid gap-4">
              <li>
                <Link href={`/products/${culprit.slug}`} className="group flex h-full flex-col gap-4 rounded-xl border border-gold-deep/25 bg-white/50 p-6 transition-colors hover:border-gold-deep/70 sm:flex-row sm:items-center">
                  <div className="h-24 w-40 shrink-0 overflow-hidden rounded-lg"><ProductArt name={culprit.art} /></div>
                  <span>
                    <span className="block font-serif text-xl">{culprit.name}</span>
                    <span className="mt-1 block text-sm text-muted-light">{culprit.tagline}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold-deep/40 bg-gold-deep/10 px-2.5 py-1 text-xs text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" aria-hidden="true" />
                      {culprit.status.label}
                    </span>
                  </span>
                  <Icon name="arrow" className="text-gold-deep sm:ml-auto" />
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Recurr-specific waitlist close, separate from Ethora's general contact CTA below */}
      <section className="border-t border-ivory/10 bg-navy-deep">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">Interested in early access?</h2>
            <p className="mt-3 max-w-xl text-muted-dark">Email us to join the Recurr waitlist — there&rsquo;s no form yet, just a person who will read it.</p>
          </div>
          <a href={waitlistHref} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md px-6 py-3 text-[15px] font-medium text-ivory transition-colors hover:brightness-110" style={{ background: forest }}>
            Join the Waitlist <Icon name="arrow" />
          </a>
        </div>
      </section>

      <CtaBand>Have a consulting question instead? We&rsquo;d love to hear about it.</CtaBand>
    </>
  );
}
