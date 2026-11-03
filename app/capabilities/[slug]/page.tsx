import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { capabilities } from "@/lib/content";
import { Icon } from "@/components/Icons";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";

type Params = { slug: string };

// Required for `output: "export"` — pre-renders one page per capability.
export function generateStaticParams(): Params[] {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = capabilities.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: `${c.title} | Ethora Labs`, description: c.description };
}

export default async function CapabilityPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = capabilities.find((x) => x.slug === slug);
  if (!c) notFound();
  const others = capabilities.filter((x) => x.slug !== slug);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Capabilities", href: "/capabilities" }]}
        title={c.title}
        intro={c.intro}
      />

      {/* What we do */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">What we do</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
          </Reveal>
          <Reveal delay={80}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {c.what.map((w) => (
                <li key={w} className="flex gap-3 rounded-lg border border-gold-deep/25 bg-white/50 p-4 leading-relaxed">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-muted-light">{c.more}</p>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">How we work</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {c.how.map((h, i) => (
              <li key={h.title}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-ivory/15 bg-navy-deep p-6">
                    <span className="font-serif text-2xl text-gold" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-serif text-xl">{h.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-dark">{h.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-muted-dark">
            This sits inside our wider{" "}
            <Link href="/#approach" className="text-gold underline underline-offset-4 hover:text-ivory">Design, Build, Verify, Improve</Link>{" "}
            approach.
          </p>
        </div>
      </section>

      {/* When this helps + how it starts */}
      <section className="on-light bg-ivory text-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">When this helps</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
            <ul className="mt-6 space-y-3">
              {c.fit.map((f) => (
                <li key={f} className="flex gap-3 leading-relaxed text-muted-light">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" aria-hidden="true" />{f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-3xl sm:text-4xl">How an engagement starts</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
            <p className="mt-6 leading-relaxed text-muted-light">{c.start}</p>
            <Link href="/#contact" className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-navy/40 px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-navy hover:bg-navy hover:text-ivory">
              Talk to us about this <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Other capabilities */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl">Other capabilities</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={`/capabilities/${o.slug}`} className="group flex h-full items-start gap-4 rounded-xl border border-ivory/15 p-5 transition-colors hover:border-gold/70">
                  <Icon name={o.icon} className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
                  <span>
                    <span className="block font-medium">{o.title}</span>
                    <span className="mt-1 block text-sm leading-snug text-muted-dark">{o.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
