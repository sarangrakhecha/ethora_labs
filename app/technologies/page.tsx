import type { Metadata } from "next";
import Link from "next/link";
import PageHero, { CtaBand } from "@/components/PageHero";
import TechnologyExplorer from "@/components/TechnologyExplorer";
import Reveal from "@/components/Reveal";
import HeroMark from "@/components/technologies-visuals/HeroMark";
import { techCategories } from "@/lib/technologies";
import { Icon } from "@/components/Icons";

// One icon per category, in the order techCategories already lists them in
// lib/technologies.ts -- not a separate lookup keyed on category id.
const categoryIcons = ["code", "check", "branch", "cloud", "chart", "terminal"];

const title = "Technologies We Use | Ethora Labs";
const description = "The technologies Ethora Labs genuinely works with, how we select tools for a given problem, and how they connect to our engineering services.";
const url = "https://ethoralabs.co/technologies/";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Ethora Labs", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }]}
        eyebrow="Technologies"
        title="The right technology. For the right problem."
        intro="Good engineering starts with understanding the problem. We select technologies based on maintainability, reliability, performance, and long-term value — not popularity alone."
        aside={<HeroMark />}
      />

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
            <Reveal>
              <p className="max-w-2xl leading-relaxed text-muted-dark">
                This list is deliberately selective: it covers technologies we have genuine, hands-on experience with —
                the stack this site itself is built and tested with, plus the cloud, data and mobile tooling we use in
                client engagements — rather than every tool we could plausibly use. Select one below to see what it is
                for, the engineering considerations it raises, and which of our services it relates to.
              </p>
            </Reveal>

            <Reveal delay={60}>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">Jump to a category</p>
              <ul className="mt-4 divide-y divide-ivory/10 rounded-lg border border-ivory/15">
                {techCategories.map((cat, i) => (
                  <li key={cat.id}>
                    <Link href={`#${cat.id}`} className="flex items-center gap-3 px-4 py-3 text-[15px] text-ivory/90 transition-colors hover:bg-ivory/[0.06] hover:text-ivory">
                      <Icon name={categoryIcons[i]} className="h-4 w-4 shrink-0 text-gold" />
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-12">
            <TechnologyExplorer />
          </Reveal>
        </div>
      </section>

      <CtaBand>Have a stack in mind, or need help choosing one? Tell us about the problem.</CtaBand>
    </>
  );
}
