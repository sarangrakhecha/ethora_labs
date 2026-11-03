import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl">About Ethora</h2>
            <span className="gold-rule mt-5" />
          </Reveal>
          <Reveal delay={100} className="max-w-3xl space-y-6 text-lg leading-relaxed">
            <p className="font-serif text-2xl leading-snug sm:text-3xl">
              Ethora Labs is an engineering-led technology consultancy built on a simple belief: great software comes from clear thinking, strong engineering, and thoughtful execution.
            </p>
            <p className="text-muted-dark">
              The name comes from two Greek-rooted ideas: <em className="not-italic text-ivory">ethics</em> and <em className="not-italic text-ivory">ethos</em>. Ethics is how we choose to work; ethos is the character and conviction behind it. Together they describe a company that wants to be trusted for how it builds, not only for what it builds.
            </p>
            <p className="text-muted-dark">
              Ethora Labs is a new company. We are not claiming a long delivery history. What we offer is a clear way of working, the engineering discipline behind it, and a commitment to the values we start with: integrity, intelligence, quality, curiosity, innovation, and long-term value creation.
            </p>
            {/*
              TODO: Founder profile. Add name, photo, role and a short honest bio here
              once the founder has approved the copy. Do not add credentials or history that cannot be verified.

              <FounderProfile name="" role="" photo="" bio="" />
            */}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
