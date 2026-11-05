import type { Metadata } from "next";
import PageHero, { CtaBand } from "@/components/PageHero";
import TechnologyExplorer from "@/components/TechnologyExplorer";
import Reveal from "@/components/Reveal";

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
      />

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="leading-relaxed text-muted-dark">
              This list is deliberately selective: it covers technologies we have genuine, hands-on experience with —
              the stack this site itself is built and tested with, plus the cloud, data and mobile tooling we use in
              client engagements — rather than every tool we could plausibly use. Select one below to see what it is
              for, the engineering considerations it raises, and which of our services it relates to.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-12">
            <TechnologyExplorer />
          </Reveal>
        </div>
      </section>

      <CtaBand>Have a stack in mind, or need help choosing one? Tell us about the problem.</CtaBand>
    </>
  );
}
