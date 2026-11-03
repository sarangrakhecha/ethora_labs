import Link from "next/link";
import { products } from "@/lib/products";
import ProductArt from "./ProductArt";
import Reveal from "./Reveal";
import { Icon } from "./Icons";

/** Two-product showcase for the home page. Consulting stays in its own sections. */
export default function ProductsShowcase() {
  return (
    <section id="products" className="bg-navy-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">Our Products</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark">
              Beyond consulting, we build and maintain our own products.
            </p>
          </div>
          <Link href="/products" className="inline-flex min-h-11 items-center gap-2 rounded text-[15px] font-medium text-gold hover:text-ivory">
            All products <Icon name="arrow" />
          </Link>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {products.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 90} className="h-full">
                <Link href={`/products/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-ivory/15 bg-navy transition-colors hover:border-gold/70">
                  <div className="aspect-[400/260]"><ProductArt name={p.art} /></div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-2xl">{p.name}</h3>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${p.status.available ? "border-gold/50 bg-gold/10 text-ivory" : "border-ivory/25 text-muted-dark"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${p.status.available ? "bg-gold" : "bg-slate"}`} aria-hidden="true" />
                        {p.status.available ? "Available" : "In development"}
                      </span>
                    </div>
                    <p className="mt-1 font-serif text-lg italic text-muted-dark">{p.tagline}</p>
                    <p className="mt-4 leading-relaxed text-muted-dark">{p.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-2 self-start pt-6 text-[15px] font-medium text-gold">
                      About {p.name} <Icon name="arrow" className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
