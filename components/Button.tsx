import type { ReactNode } from "react";
import { Icon } from "./Icons";

export function ButtonLink({ href, children, variant = "gold", arrow = true, size = "md", onClick, className = "" }: {
  href: string; children: ReactNode; variant?: "gold" | "outline" | "outline-dark"; arrow?: boolean; size?: "sm" | "md"; onClick?: () => void; className?: string;
}) {
  const styles = {
    gold: "bg-gold text-navy-deep hover:bg-[#d4b98f]",
    outline: "border border-ivory/50 text-ivory hover:border-gold hover:text-gold",
    "outline-dark": "border border-navy/40 text-ink hover:border-navy hover:bg-navy hover:text-ivory",
  }[variant];
  return (
    <a href={href} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ${size === "sm" ? "min-h-9 px-4 py-1.5 text-[14px]" : "min-h-11 px-5 py-2.5 text-[15px]"} ${styles} ${className}`}>
      {children}{arrow && <Icon name="arrow" className={size === "sm" ? "h-4 w-4" : ""} />}
    </a>
  );
}
