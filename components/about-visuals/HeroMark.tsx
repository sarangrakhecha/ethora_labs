/**
 * Hero's right-side composition: a restrained typographic mark built from Ethora's own
 * name story (ethics + ethos), not a generic illustration. Two labels only -- matching
 * the real two-word etymology explained on this page, not a third, invented root.
 */
export default function HeroMark() {
  return (
    <div className="mx-auto w-full max-w-[20rem]" aria-hidden="true">
      <div className="relative aspect-square rounded-full border border-gold/20">
        <div className="absolute inset-[12%] rounded-full border border-dashed border-gold/15" />
        <div className="flex h-full items-center justify-center">
          <span className="font-serif text-[7rem] leading-none text-gold/90 sm:text-[8rem]">E</span>
        </div>
      </div>
      <div className="mt-7 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <span className="h-px w-6 shrink-0 bg-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-ivory/80">Ethics</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-px w-6 shrink-0 bg-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-ivory/80">Ethos</span>
        </div>
      </div>
    </div>
  );
}
