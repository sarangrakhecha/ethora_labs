import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Ethora Labs | Contact",
  description: "Have a product idea, an engineering challenge or a quality goal in mind? Start a conversation with Ethora Labs.",
  alternates: { canonical: "https://ethoralabs.co/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start a conversation."
        intro="Have a product idea, an engineering challenge, or a quality goal in mind? Tell us what you are working on and we will tell you honestly whether we are the right people for it."
      />
      <section className="bg-navy-deep">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-2xl">What happens next</h2>
            <span className="gold-rule mt-5" />
            <ol className="mt-6 space-y-5">
              {[
                { t: "We read it properly", b: "A person reads your message. There is no sales pipeline here." },
                { t: "We reply honestly", b: "Including when the answer is that we are not the right fit, or that you may not need us at all." },
                { t: "We propose something small", b: "If it makes sense to work together, we suggest a first step small enough to judge us on." },
              ].map((s, i) => (
                <li key={s.t} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="font-serif text-xl text-gold tabular-nums" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-medium">{s.t}</span>
                    <span className="mt-1 block leading-relaxed text-muted-dark">{s.b}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={80}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
