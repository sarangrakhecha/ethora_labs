import Link from "next/link";
import { Icon } from "@/components/Icons";

export const metadata = { title: "Page not found | Ethora Labs" };

export default function NotFound() {
  return (
    <section className="bg-navy">
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">404</p>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">This page doesn&rsquo;t exist.</h1>
        <span className="gold-rule mt-6" />
        <p className="mt-6 max-w-xl text-lg text-muted-dark">
          The link may be out of date, or the page may have moved. Here is where to go instead.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {[
            { href: "/", label: "Home" },
            { href: "/services", label: "Capabilities" },
            { href: "/products", label: "Products" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ivory/30 px-5 text-[15px] transition-colors hover:border-gold hover:text-gold">
                {l.label} <Icon name="arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
