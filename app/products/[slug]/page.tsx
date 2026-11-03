import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { products, CULPRIT_STORE_URL } from "@/lib/products";
import ProductArt from "@/components/ProductArt";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} | Ethora Labs`, description: p.summary };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const other = products.find((x) => x.slug !== slug);
  const storeLive = p.slug === "culprit" && CULPRIT_STORE_URL.length > 0;
  const shots = p.screenshots;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }]}
        eyebrow={p.kind}
        title={p.name}
        intro={p.summary}
      />

      {/* Status + primary action */}
      <section className="border-b border-ivory/10 bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="flex items-center gap-2 font-medium">
              <span className={`h-2 w-2 rounded-full ${p.status.available ? "bg-gold" : "bg-slate"}`} aria-hidden="true" />
              {p.status.label}
            </p>
            <p className="mt-2 max-w-xl text-muted-dark">{p.status.detail}</p>
          </div>
          {storeLive ? (
            <a href={CULPRIT_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
              Add to Chrome <Icon name="arrow" />
            </a>
          ) : (
            <Link href="/contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-ivory/40 px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-gold hover:text-gold">
              Ask about {p.name} <Icon name="arrow" />
            </Link>
          )}
        </div>
      </section>

      {/* Showcase */}
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal>
            {shots.length > 0 ? (
              <ul className="grid gap-5 md:grid-cols-2">
                {shots.map((s, i) => (
                  <li key={s.src} className={`overflow-hidden rounded-xl border border-ivory/15 bg-navy ${i === 0 ? "md:col-span-2" : ""}`}>
                    <Image src={s.src} alt={s.alt} width={s.w} height={s.h} priority={i === 0}
                      className={i === 0 ? "h-auto w-full" : "mx-auto h-auto w-full max-w-[26rem]"} />
                    <p className="border-t border-ivory/10 px-5 py-4 text-sm text-muted-dark">{s.caption}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <div className="overflow-hidden rounded-xl border border-ivory/15">
                  <div className="aspect-[400/150] max-h-[26rem]"><ProductArt name={p.art} /></div>
                </div>
                {/* Honest about what this image is. */}
                <p className="mt-3 text-sm text-slate">Brand illustration. Product screenshots are being prepared.</p>
              </>
            )}
          </Reveal>
        </div>
      </section>

      {/* What it covers — only the areas the team has confirmed */}
      {(p.features.length > 0 || p.areas.length > 0) && (
        <section className="on-light bg-ivory text-ink">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
            <Reveal>
              <h2 className="font-serif text-3xl sm:text-4xl">What it does</h2>
              <span className="gold-rule mt-5 bg-gold-deep" />
            </Reveal>
            <Reveal delay={80}>
              {p.features.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f.title} className="rounded-lg border border-gold-deep/25 bg-white/50 p-5">
                      <h3 className="flex items-start gap-3 font-medium">
                        <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />{f.title}
                      </h3>
                      <p className="mt-2 pl-8 leading-relaxed text-muted-light">{f.body}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {p.areas.map((a) => (
                    <li key={a} className="flex items-center gap-3 rounded-lg border border-gold-deep/25 bg-white/50 px-4 py-4 font-medium">
                      <Icon name="check" className="h-5 w-5 shrink-0 text-gold-deep" />{a}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* Where it came from / what's next */}
      <section className="bg-navy">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Built by Ethora</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={80} className="space-y-5 leading-relaxed text-muted-dark">
            <p>
              {p.name} is built and maintained by Ethora Labs. It comes from the same engineering approach we bring to
              client work: design the right thing, build it carefully, verify it properly, and keep improving it.
            </p>
            <p>
              {p.status.available
                ? "If you use it and something is wrong, or something is missing, we would rather hear about it than not."
                : "If this is a problem you have, we would be glad to hear how you handle it today — it genuinely shapes what we build."}
            </p>
            <p>
              <Link href="/#approach" className="text-gold underline underline-offset-4 hover:text-ivory">How we work</Link>
              {" · "}
              <Link href="/#capabilities" className="text-gold underline underline-offset-4 hover:text-ivory">Consulting capabilities</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* The other product */}
      {other && (
        <section className="bg-navy-deep">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl">Our other product</h2>
            <Link href={`/products/${other.slug}`} className="group mt-5 flex flex-col gap-4 rounded-xl border border-ivory/15 p-6 transition-colors hover:border-gold/70 sm:flex-row sm:items-center">
              <div className="h-24 w-40 shrink-0 overflow-hidden rounded-lg"><ProductArt name={other.art} /></div>
              <span>
                <span className="block font-serif text-xl">{other.name}</span>
                <span className="mt-1 block text-sm text-muted-dark">{other.tagline}</span>
                <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${other.status.available ? "border-gold/50 bg-gold/10 text-ivory" : "border-ivory/25 text-muted-dark"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${other.status.available ? "bg-gold" : "bg-slate"}`} aria-hidden="true" />
                  {other.status.label}
                </span>
              </span>
              <Icon name="arrow" className="text-gold sm:ml-auto" />
            </Link>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
