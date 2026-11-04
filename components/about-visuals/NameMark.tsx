/**
 * "The name" section's visual: the ETHORA wordmark, large, with the two real roots it
 * comes from underneath -- captions drawn directly from the section's own prose
 * ("Ethics is how we choose to work" / "Ethos is the character and conviction behind
 * that choice"), not new copy.
 */
export default function NameMark() {
  return (
    <div className="text-center lg:text-left">
      <p className="font-serif text-[3.2rem] leading-none tracking-[0.04em] text-ink sm:text-[4rem] lg:text-[3.6rem] xl:text-[4.2rem]">
        ETHORA
      </p>
      <div className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-8 lg:mx-0">
        <div className="border-t border-gold-deep/40 pt-4 text-left">
          <p className="font-serif text-xl italic text-gold-deep">Ethics</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-light">The standards that guide our choices.</p>
        </div>
        <div className="border-t border-gold-deep/40 pt-4 text-left">
          <p className="font-serif text-xl italic text-gold-deep">Ethos</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-light">The character and conviction we bring.</p>
        </div>
      </div>
    </div>
  );
}
