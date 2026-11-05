/**
 * "The name" section's visual: the ETHORA wordmark, large, with the two real roots it
 * comes from underneath -- captions drawn directly from the section's own prose
 * ("Ethics is how we choose to work" / "Ethos is the character and conviction behind
 * that choice"), not new copy.
 */
export default function NameMark() {
  return (
    <div className="lg:border-l lg:border-gold-deep/30 lg:pl-12">
      <p className="font-serif text-[3.4rem] leading-none tracking-[0.03em] text-ink sm:text-[4.5rem] lg:text-[4.8rem]">
        ETHORA<span className="text-gold-deep">.</span>
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <div className="border-t border-gold-deep/40 pt-4">
          <span className="text-xs tracking-[0.15em] text-gold-deep">I.</span>
          <p className="mt-2 font-serif text-2xl">Ethics</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-light">The standards we hold ourselves to.</p>
        </div>
        <div className="border-t border-gold-deep/40 pt-4">
          <span className="text-xs tracking-[0.15em] text-gold-deep">II.</span>
          <p className="mt-2 font-serif text-2xl">Ethos</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-light">The conviction we bring to our work.</p>
        </div>
      </div>
    </div>
  );
}
