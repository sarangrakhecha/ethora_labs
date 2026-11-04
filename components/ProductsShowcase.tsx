import { products } from "@/lib/products";
import Reveal from "./Reveal";
import ExpandingPanels, { type Panel } from "./ExpandingPanels";

const panels: Panel[] = [
  ...products.map((p) => ({
    key: p.slug,
    icon: p.slug === "culprit" ? "target" : "loop",
    art: p.art,
    title: p.name,
    subtitle: p.tagline,
    detail: p.summary,
    chip: { label: p.status.available ? "Available" : "In development", highlight: p.status.available },
    href: `/products/${p.slug}`,
    cta: `About ${p.name}`,
  })),
  {
    key: "view-all",
    icon: "layers",
    title: "View all",
    subtitle: "The full Products line-up.",
    detail: "Culprit and RenewGuard, each with their own page: features, status and what's next.",
    href: "/products",
    cta: "See all products",
  },
];

/** Products showcase for the home page. Consulting stays in its own sections. */
export default function ProductsShowcase() {
  return (
    <section id="products" className="bg-navy-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl">Our Products</h2>
          <span className="gold-rule mt-5" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark">
            Beyond consulting, we build and maintain our own products.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12 block">
          <ExpandingPanels heightClass="lg:h-[36rem]" panels={panels} />
        </Reveal>
      </div>
    </section>
  );
}
