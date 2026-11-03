import Link from "next/link";
import { products } from "@/lib/products";
import Reveal from "./Reveal";
import { Icon } from "./Icons";
import ExpandingPanels from "./ExpandingPanels";

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

        <Reveal delay={80} className="mt-12 block">
          <ExpandingPanels heightClass="lg:h-[27rem] xl:h-[24rem]" panels={products.map((p) => ({
            key: p.slug,
            icon: p.slug === "culprit" ? "target" : "loop",
            art: p.art,
            title: p.name,
            subtitle: p.tagline,
            detail: p.summary,
            chip: { label: p.status.available ? "Available" : "In development", highlight: p.status.available },
            href: `/products/${p.slug}`,
            cta: `About ${p.name}`,
          }))} />
        </Reveal>
      </div>
    </section>
  );
}
