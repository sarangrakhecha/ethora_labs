import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService, SERVICE_ENGAGEMENT_NOTE } from "@/lib/services";
import { ServiceDemo } from "@/components/demos";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const url = `https://ethoralabs.co/services/${s.slug}/`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url, type: "website", images: ["/og.png"] },
    twitter: { card: "summary_large_image", title: s.metaTitle, description: s.metaDescription, images: ["/og.png"] },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = s.related.map(getService).filter(Boolean);
  const contactHref = `/contact/?service=${s.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.nav.label,
    description: s.metaDescription,
    provider: { "@type": "Organization", name: "Ethora Labs", url: "https://ethoralabs.co" },
    areaServed: "Worldwide",
    url: `https://ethoralabs.co/services/${s.slug}/`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Capabilities", href: "/#capabilities" }]}
        eyebrow={s.nav.label}
        title={s.headline}
        intro={s.intro}
      />

      <section className="border-b border-ivory/10 bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="max-w-2xl text-muted-dark">{s.addresses}</p>
          <Link href={contactHref} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
            {s.cta} <Icon name="arrow" />
          </Link>
        </div>
      </section>

      {/* B. Challenges */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Challenges we solve</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {s.challenges.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={i * 70} className="h-full">
                  <div className="h-full rounded-xl border border-gold-deep/25 bg-white/50 p-6">
                    <h3 className="font-serif text-xl">{c.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-light">{c.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* C. What we do */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">What we do</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {s.whatWeDo.map((w, i) => (
              <li key={w.title}>
                <Reveal delay={i * 50}>
                  <h3 className="flex items-start gap-3 font-medium text-ivory">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />{w.title}
                  </h3>
                  <p className="mt-2 pl-8 leading-relaxed text-muted-dark">{w.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* D. Interactive demonstration */}
      <section id="demo" className={s.demo === "risk" || s.demo === "prototype" ? "on-light bg-ivory text-ink" : "bg-navy-deep"}>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">{s.demoIntro.title}</h2>
            <span className={`gold-rule mt-5 ${s.demo === "risk" || s.demo === "prototype" ? "bg-gold-deep" : ""}`} />
            <p className={`mt-6 max-w-3xl leading-relaxed ${s.demo === "risk" || s.demo === "prototype" ? "text-muted-light" : "text-muted-dark"}`}>{s.demoIntro.body}</p>
          </Reveal>
          <div className="mt-10"><ServiceDemo name={s.demo} /></div>
        </div>
      </section>

      {/* E + F. Deliverables and approach */}
      <section className="bg-navy">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Typical deliverables</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-5 text-sm text-slate">Illustrative of what an engagement can produce. Not a record of completed client work.</p>
            <ul className="mt-6 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed text-muted-dark">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />{d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-3xl sm:text-4xl">Our approach</h2>
            <span className="gold-rule mt-5" />
            <ol className="mt-6 space-y-5">
              {s.approach.map((a, i) => (
                <li key={a.phase} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="font-serif text-xl text-gold tabular-nums" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-medium">{a.phase}</span>
                    <span className="mt-1 block leading-relaxed text-muted-dark">{a.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-muted-dark">
              This sits inside our wider{" "}
              <Link href="/approach" className="text-gold underline underline-offset-4 hover:text-ivory">Design, Build, Verify, Improve</Link> cycle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* G. Engagement options */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Engagement options</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {s.engagements.map((e, i) => (
              <li key={e.name}>
                <Reveal delay={i * 70} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-gold-deep/25 bg-white/50 p-6">
                    <h3 className="font-serif text-xl">{e.name}</h3>
                    <p className="mt-1 text-sm font-medium text-gold-deep">{e.shape}</p>
                    <p className="mt-4 leading-relaxed text-muted-light">{e.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-muted-light">{SERVICE_ENGAGEMENT_NOTE}</p>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl">Related capabilities</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((r) => r && (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}`} className="group flex h-full items-start gap-4 rounded-xl border border-ivory/15 p-5 transition-colors hover:border-gold/70">
                  <span>
                    <span className="block font-medium">{r.nav.label}</span>
                    <span className="mt-1 block text-sm leading-snug text-muted-dark">{r.nav.description}</span>
                  </span>
                  <Icon name="arrow" className="ml-auto shrink-0 text-gold" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* H. Service-specific CTA */}
      <section className="border-t border-gold/30 bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">Talk to us about {s.nav.label.toLowerCase()}</h2>
            <p className="mt-3 max-w-xl text-muted-dark">
              Tell us what you are working on. We will tell you honestly whether we are the right people for it.
            </p>
          </div>
          <Link href={contactHref} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
            Start a conversation <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
