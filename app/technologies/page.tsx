import type { Metadata } from "next";
import Link from "next/link";
import PageHero, { CtaBand } from "@/components/PageHero";
import TechnologyExplorer from "@/components/TechnologyExplorer";
import Reveal from "@/components/Reveal";
import HeroMark from "@/components/technologies-visuals/HeroMark";
import { Icon } from "@/components/Icons";
import { noWidow } from "@/lib/typography";

// All six categories in lib/technologies.ts, as quick-access tiles -- showing only
// a curated four read as incomplete next to a "View all technologies" link that
// implies there's more hiding behind it.
const showcase = [
  { id: "web", icon: "code", title: "Application", description: "Web, backend, and APIs" },
  { id: "qe", icon: "check", title: "Quality & Testing", description: "Testing strategy and automation" },
  { id: "ops", icon: "branch", title: "DevOps & Operations", description: "CI/CD, version control, and release" },
  { id: "infra", icon: "cloud", title: "Cloud & Infrastructure", description: "Hosting and deployment platforms" },
  { id: "data", icon: "database", title: "Data & Storage", description: "Databases and data systems" },
  { id: "mobile", icon: "phone", title: "Mobile", description: "Native and cross-platform" },
] as const;

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

      <section className="border-t border-ivory/10 bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal>
            <div className="lg:flex lg:items-center lg:gap-10">
              <h2 className="shrink-0 font-serif text-3xl leading-tight sm:text-4xl">Explore our technologies</h2>
              <span className="mt-5 block h-px w-12 bg-gold lg:mt-0 lg:h-14 lg:w-px" aria-hidden="true" />
              <div className="mt-5 max-w-2xl lg:mt-0">
                <p className="leading-relaxed text-muted-dark">
                  {noWidow(
                    "This list is deliberately selective: it covers technologies we have genuine, hands-on experience with — the stack this site itself is built and tested with, plus the cloud, data and mobile tooling we use in client engagements — rather than every tool we could plausibly use."
                  )}
                </p>
                <div className="mt-4 flex justify-end">
                  <Link href="#explore-technologies" className="inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-sm text-gold transition-colors hover:text-[#d4b98f]">
                    View all technologies <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((s) => (
              <Link key={s.id} href={`#${s.id}`}
                className="group flex min-h-[6.5rem] items-center gap-3.5 rounded-xl border border-ivory/20 bg-ivory/[0.025] p-4 transition-colors hover:border-gold hover:bg-gold/[0.08]">
                <Icon name={s.icon} className="h-7 w-7 shrink-0 text-gold" />
                <span className="min-w-0">
                  <span className="block text-[14px] font-semibold text-ivory">{s.title}</span>
                  <span className="mt-1 block text-xs leading-snug text-muted-dark">{s.description}</span>
                </span>
                <Icon name="arrow" className="ml-auto h-4 w-4 shrink-0 text-ivory/70 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </Reveal>

          <Reveal delay={120} id="explore-technologies" className="mt-16 scroll-mt-24">
            <TechnologyExplorer />
          </Reveal>
        </div>
      </section>

      <CtaBand>Have a stack in mind, or need help choosing one? Tell us about the problem.</CtaBand>
    </>
  );
}
