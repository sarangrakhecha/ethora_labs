"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <section className="bg-navy">
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Something went wrong on this page.</h1>
        <span className="gold-rule mt-6" />
        <p className="mt-6 max-w-xl text-lg text-muted-dark">
          This is our fault, not yours. Try again, and if it keeps happening please let us know.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center rounded-md bg-gold px-5 text-[15px] font-medium text-navy-deep transition-colors hover:bg-[#d4b98f]">
            Try again
          </button>
          <a href="/contact" className="inline-flex min-h-11 items-center rounded-md border border-ivory/30 px-5 text-[15px] transition-colors hover:border-gold hover:text-gold">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
