/**
 * "Our philosophy" section's visual: the structure already implied by the prose itself
 * ("problems of judgement: what to build, what to verify..."; "we lead with engineering
 * judgement rather than with tools") made visible, rather than a decorative illustration
 * with no connection to the text beside it. Three concepts, all drawn from that same
 * paragraph -- nothing new asserted.
 */
export default function PhilosophyDiagram() {
  return (
    <div className="mx-auto w-full max-w-sm" aria-hidden="true">
      <div className="rounded-xl border border-gold/30 bg-navy-deep/60 px-6 py-5 text-center">
        <p className="font-serif text-2xl text-ivory">Judgement</p>
        <p className="mt-1 text-sm leading-snug text-muted-dark">What to build, verify, or leave alone</p>
      </div>
      <div className="mx-auto h-8 w-px bg-gold/30" />
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-ivory/15 bg-navy-deep/40 px-4 py-4 text-center">
          <p className="font-serif text-lg text-ivory">Engineering rigour</p>
          <p className="mt-1 text-sm leading-snug text-muted-dark">Before tools, before opinions</p>
        </div>
        <div className="rounded-xl border border-ivory/15 bg-navy-deep/40 px-4 py-4 text-center">
          <p className="font-serif text-lg text-ivory">Honesty</p>
          <p className="mt-1 text-sm leading-snug text-muted-dark">Saying what is actually true</p>
        </div>
      </div>
    </div>
  );
}
