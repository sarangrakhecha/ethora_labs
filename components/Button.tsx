import type { ReactNode } from "react";
import { Icon } from "./Icons";

export function ButtonLink({ href, children, variant = "gold", arrow = true, onClick, className = "" }: {
  href: string; children: ReactNode; variant?: "gold" | "outline" | "outline-dark"; arrow?: boolean; onClick?: () => void; className?: string;
}) {
  const styles = {
    gold: "bg-gold text-navy-deep hover:bg-[#d4b98f]",
    outline: "border border-ivory/50 text-ivory hover:border-gold hover:text-gold",
    "outline-dark": "border border-navy/40 text-ink hover:border-navy hover:bg-navy hover:text-ivory",
  }[variant];
  return (
    <a href={href} onClick={onClick} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[15px] font-medium transition-colors ${styles} ${className}`}>
      {children}{arrow && <Icon name="arrow" />}
    </a>
  );
}
