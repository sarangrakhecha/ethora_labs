import { ButtonLink } from "./Button";
import EngineeringCanvas from "./EngineeringCanvas";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-deep/60 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-10 lg:px-8 lg:py-24">
        <div>
          <span className="gold-rule mb-6 w-14" />
          <h1 className="font-serif text-[2.6rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            Every great product starts with a question.
            <span className="mt-2 block italic text-gold">What if it could work better?</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/90">
            Ethora Labs is an engineering-led technology consultancy. We design and build web applications and APIs, automate testing, and run CI/CD pipelines — shipping systems your own team can read, change, and operate.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/#capabilities">Explore Capabilities</ButtonLink>
            <ButtonLink href="/approach" variant="outline" arrow={false}>Our Approach</ButtonLink>
          </div>
        </div>
        <EngineeringCanvas />
      </div>
    </section>
  );
}
