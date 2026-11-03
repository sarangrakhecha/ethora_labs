import Reveal from "./Reveal";

// Placeholder so the "Insights" nav link has a real destination. No fake articles.
export default function Insights() {
  return (
    <section id="insights" className="on-light bg-ivory text-ink">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">Insights</h2>
            <span className="gold-rule mt-5 bg-gold-deep" />
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-light">
            We plan to share practical writing on software quality, test automation and engineering practice. Nothing is published yet — check back soon.
            {/* TODO: replace with a real list of posts once content exists. */}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
