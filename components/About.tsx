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
            {/* Founder profile. The experience below is Sarang's own professional background —
                it is deliberately not presented as work delivered by Ethora Labs.
                TODO: add a photo and a LinkedIn or GitHub link when available. */}
            <div className="rounded-xl border border-ivory/15 bg-navy-deep p-6 sm:p-8">
              <h3 className="font-serif text-2xl">Who is behind the engineering</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-muted-dark">
                Ethora Labs was founded by <span className="text-ivory">Sarang Rakhecha</span>, whose background is in
                software quality, testing and automation — built working with engineering teams at
                <span className="text-ivory"> Apple</span>, <span className="text-ivory">Qualtrics</span> and
                <span className="text-ivory"> NetApp</span>.
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-muted-dark">
                That is personal professional experience, not a delivery record for Ethora Labs. The company itself is
                new, and we would rather say so than imply otherwise.
              </p>
            </div>
            <p className="text-muted-dark">
              What we offer from the start is a clear way of working, the engineering discipline behind it, and a
              commitment to the values we begin with: integrity, intelligence, quality, curiosity, innovation, and
              long-term value creation.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
