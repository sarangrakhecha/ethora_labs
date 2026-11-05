import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { engagementSteps, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ethora Labs | Contact",
  description: "Have a product idea, an engineering challenge or a quality goal in mind? Start a conversation with Ethora Labs.",
  alternates: { canonical: "https://ethoralabs.co/contact/" },
};

export default function ContactPage() {
  return (
    <section className="border-b border-ivory/10 bg-navy">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-16 lg:px-8">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">Let&rsquo;s Talk</p>
          <h1 className="font-serif text-[2.4rem] leading-[1.1] sm:text-5xl lg:text-[3.2rem]">Tell us what you&rsquo;re working on.</h1>
          <span className="gold-rule mt-5" />
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ivory/90">
            A product idea, an engineering challenge, or something that isn&rsquo;t working as it should. Start with
            whatever you know and we&rsquo;ll ask what else we need.
          </p>

          <ol className="mt-6 space-y-4">
            {engagementSteps.map((s, i) => (
              <li key={s.t} className="grid grid-cols-[2rem_1fr] gap-4">
                <span className="font-serif text-xl text-gold tabular-nums" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-medium">{s.t}</span>
                  <span className="mt-1 block leading-relaxed text-muted-dark">{s.b}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex items-center gap-3 border-t border-ivory/10 pt-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy-deep" aria-hidden="true">
              <Icon name="mail" className="h-4 w-4 text-gold" />
            </span>
            <div>
              <a href={`mailto:${site.email}`} className="font-medium text-gold underline underline-offset-4 hover:text-ivory">{site.email}</a>
              <p className="text-sm text-muted-dark">Prefer email? You can reach us directly.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="on-light rounded-xl border border-ivory/15 bg-ivory p-6 text-ink sm:p-8">
          <h2 className="font-serif text-2xl">Start a conversation</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
