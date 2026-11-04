import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import ExpandingPanels, { type Panel } from "@/components/ExpandingPanels";
import PageHero, { CtaBand } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Products | Ethora Labs",
  description: "Culprit, a Chrome extension for software debugging, and RenewGuard, renewal and recurring-commitment management. Products built by Ethora Labs.",
};

// Only the two real Ethora products. TerminalQuest is open-source, not part of
// the commercial Products division, and is deliberately not listed here.
const panels: Panel[] = products.map((p) => ({
  key: p.slug,
  icon: p.slug === "culprit" ? "target" : "loop",
  art: p.art,
  title: p.name,
  subtitle: p.tagline,
  detail: p.summary,
  chip: { label: p.status.label, highlight: p.status.available },
  href: `/products/${p.slug}`,
  cta: `About ${p.name}`,
}));

export default function ProductsIndex() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }]}
        eyebrow="Products"
        title="Products we build"
        intro="Alongside our consulting work, we build our own products: one available today, one in development."
      />

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <ExpandingPanels panels={panels} />
          </Reveal>
          <p className="mt-10 text-muted-dark">
            Looking for our consulting work instead?{" "}
            <Link href="/#capabilities" className="text-gold underline underline-offset-4 hover:text-ivory">See our capabilities</Link>.
          </p>
        </div>
      </section>

      <CtaBand>Interested in one of our products, or have a problem you think we should be solving? Tell us about it.</CtaBand>
    </>
  );
}
