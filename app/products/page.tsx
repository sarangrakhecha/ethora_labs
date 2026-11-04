import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products, productVision, whyWeBuild, productsConnect, productsClosing, renewGuardAudiences, renewGuardSavingsNote } from "@/lib/products";
import ProductArt from "@/components/ProductArt";
import ProductPhilosophy from "@/components/ProductPhilosophy";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";

const title = "Our Products & Product Philosophy | Ethora Labs";
const description = "Discover why Ethora Labs builds products and explore Culprit and RenewGuard—two tools designed to simplify real problems through thoughtful engineering.";
const url = "https://ethoralabs.co/products/";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Ethora Labs", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const culprit = products.find((p) => p.slug === "culprit")!;
const renewguard = products.find((p) => p.slug === "renewguard")!;
const culpritShot = culprit.screenshots[0];
const renewguardShot = renewguard.screenshots[0];

// A short lifecycle summary for this condensed preview -- the full, detailed
// forward-an-email vision lives on RenewGuard's own dedicated page.
const renewGuardWorkflow = ["Add", "Remind", "Decide", "Act", "Confirm", "Protect Savings"];

export default function ProductsIndex() {
  return (
    <>
      {/* A. Product vision */}
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }]}
        eyebrow={productVision.eyebrow}
        title={productVision.headline}
        intro={productVision.body}
      />

      {/* B. Why we build -- heading full-width above a two-column grid of bullets,
          rather than paired against a short heading column that runs out of
          content long before the bullets and paragraph beside it do. */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl">{whyWeBuild.headline}</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
              {whyWeBuild.points.map((pt) => (
                <li key={pt} className="flex gap-3 leading-relaxed text-muted-light">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" aria-hidden="true" />{pt}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-3xl border-t border-gold-deep/25 pt-6 leading-relaxed text-ink">{whyWeBuild.connection}</p>
          </Reveal>
        </div>
      </section>

      {/* C. How we think about products */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">How we think about products</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Observe. Question. Simplify. Build. Validate. Improve.</h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-dark">
              An illustrative framework for how an idea becomes something worth shipping — not a record that every
              product here has completed every stage.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-12">
            <ProductPhilosophy />
          </Reveal>
        </div>
      </section>

      {/* D1. Culprit */}
      <section className="border-t border-ivory/10 bg-navy-deep">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <Reveal className="order-2 lg:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">Developer Tools &middot; Software Quality</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">{culprit.name}</h2>
            <p className="mt-2 font-serif text-xl italic text-muted-dark">{culprit.tagline}</p>
            <p className="mt-6 leading-relaxed text-ivory/90">
              Culprit is a proprietary Chrome extension designed to help developers and software testers investigate
              browser failures.
            </p>
            <p className="mt-4 leading-relaxed text-muted-dark">
              Debugging becomes unnecessarily difficult when the context surrounding a failure is missing. Culprit aims
              to make that context easier to capture and communicate.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Capture of user actions", "Selector generation", "Network failure diagnostics", "Screenshots", "More actionable debugging information"].map((a) => (
                <li key={a} className="rounded-full border border-ivory/20 px-3 py-1 text-sm text-ivory/90">{a}</li>
              ))}
            </ul>
            <Link href="/products/culprit/" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
              Explore Culprit <Icon name="arrow" />
            </Link>
          </Reveal>
          <Reveal delay={80} className="order-1 lg:order-2">
            {culpritShot ? (
              <div className="overflow-hidden rounded-xl border border-ivory/15">
                <Image src={culpritShot.src} alt={culpritShot.alt} width={culpritShot.w} height={culpritShot.h} className="h-auto w-full" />
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-ivory/15"><div className="aspect-[400/150]"><ProductArt name="culprit" /></div></div>
            )}
          </Reveal>
        </div>
      </section>

      {/* D2. RenewGuard -- the image and the intro are paired (and roughly similar
          in height), so centering them no longer leaves one side empty; the
          workflow, segments and disclaimer that would have dwarfed the image run
          full-width below instead of being stacked inside the narrower column. */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              {renewguardShot ? (
                <div className="overflow-hidden rounded-xl border border-gold-deep/25">
                  <Image src={renewguardShot.src} alt={renewguardShot.alt} width={renewguardShot.w} height={renewguardShot.h} className="h-auto w-full" />
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gold-deep/25"><div className="aspect-[400/150]"><ProductArt name="renewguard" /></div></div>
              )}
              <p className="mt-3 text-sm text-slate">From our internal build. <Link href="/products/renewguard/" className="underline underline-offset-4 hover:text-ink">See more screens</Link>.</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-deep">Renewal &amp; Recurring-Commitment Management</p>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl">{renewguard.name}</h2>
              <p className="mt-2 font-serif text-xl italic text-muted-light">{renewguard.tagline}</p>
              <p className="mt-6 leading-relaxed text-ink">
                RenewGuard helps businesses and individuals manage renewals and recurring commitments. It goes beyond
                reminders by helping users make decisions, track real-world actions, and confirm outcomes.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-14 border-t border-gold-deep/20 pt-12">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium text-gold-deep">
              {renewGuardWorkflow.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-gold-deep/40 bg-white/50 px-3 py-1">{step}</span>
                  {i < renewGuardWorkflow.length - 1 && <Icon name="arrow" className="h-3.5 w-3.5 text-gold-deep/60" />}
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-light">
              Renewal dates are easy to overlook, but the larger problem is that decisions and actions often happen too
              late. RenewGuard is designed to make upcoming commitments visible and help users act before deadlines.
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr]">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate">{renewGuardAudiences.business.label}</h3>
                <ul className="mt-2 space-y-1 text-muted-light">{renewGuardAudiences.business.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate">{renewGuardAudiences.personal.label}</h3>
                <ul className="mt-2 space-y-1 text-muted-light">{renewGuardAudiences.personal.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate">Worth knowing</h3>
                <p className="mt-2 leading-relaxed text-muted-light">{renewGuardSavingsNote}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/products/renewguard/" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-[15px] font-medium text-ivory transition-colors hover:bg-navy-deep">
                Explore RenewGuard <Icon name="arrow" />
              </Link>
              <a href={`mailto:${renewguard.waitlistEmail}?subject=RenewGuard%20Waitlist`} className="text-[15px] font-medium text-gold-deep underline underline-offset-4 hover:text-ink">
                Join the waitlist
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* E. What connects our products */}
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">{productsConnect.headline}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-dark">{productsConnect.intro}</p>
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {productsConnect.points.map((pt) => (
                <li key={pt} className="rounded-lg border border-ivory/15 p-4 leading-snug text-ivory/90">{pt}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* F. Closing */}
      <section className="bg-navy">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <p className="font-serif text-2xl leading-snug sm:text-3xl">{productsClosing}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/products/culprit/" className="text-[15px] font-medium text-gold underline underline-offset-4 hover:text-ivory">Explore Culprit</Link>
              <span className="text-slate" aria-hidden="true">&middot;</span>
              <Link href="/products/renewguard/" className="text-[15px] font-medium text-gold underline underline-offset-4 hover:text-ivory">Explore RenewGuard</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand>Have a product idea, or feedback on Culprit or RenewGuard? We&rsquo;d like to hear it.</CtaBand>
    </>
  );
}
