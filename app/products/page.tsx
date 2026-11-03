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

export default function ProductsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Products we build"
        intro="Alongside our consulting work, we build our own products. Two of them are live or in progress today, and both come from problems we kept running into ourselves."
      />

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <article className="overflow-hidden rounded-xl border border-ivory/15 bg-navy-deep md:grid md:grid-cols-2">
                <div className={`aspect-[400/260] ${i % 2 ? "md:order-2" : ""}`}>
                  <ProductArt name={p.art} />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">{p.kind}</p>
                  <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{p.name}</h2>
                  <p className="mt-2 font-serif text-xl italic text-muted-dark">{p.tagline}</p>
                  <p className="mt-5 leading-relaxed text-muted-dark">{p.summary}</p>
                  <p className="mt-5">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${p.status.available ? "border-gold/50 bg-gold/10 text-ivory" : "border-ivory/25 text-muted-dark"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${p.status.available ? "bg-gold" : "bg-slate"}`} aria-hidden="true" />
                      {p.status.label}
                    </span>
                  </p>
                  <Link href={`/products/${p.slug}`} className="mt-7 inline-flex min-h-11 items-center gap-2 self-start rounded text-[15px] font-medium text-gold hover:text-ivory">
                    About {p.name} <Icon name="arrow" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
          <p className="pt-4 text-muted-dark">
            Looking for our consulting work instead?{" "}
            <Link href="/capabilities" className="text-gold underline underline-offset-4 hover:text-ivory">See our capabilities</Link>.
          </p>
        </div>
      </section>

      <CtaBand>Interested in one of our products, or have a problem you think we should be solving? Tell us about it.</CtaBand>
    </>
  );
}
