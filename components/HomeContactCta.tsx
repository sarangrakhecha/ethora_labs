import Link from "next/link";
import Reveal from "./Reveal";
import { Icon } from "./Icons";

export default function HomeContactCta() {
  return (
    <section id="contact" className="bg-navy-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="flex flex-col items-start gap-8 rounded-xl border border-gold/30 bg-navy p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">Let&rsquo;s start a conversation.</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-dark">
              Have a product idea, an engineering challenge, or a quality goal in mind? We&rsquo;d love to hear about it.
            </p>
          </div>
          <Link href="/contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
            Get in touch <Icon name="arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
