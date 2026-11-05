import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
};

export function Icon({ name, ...p }: { name: string } & SVGProps<SVGSVGElement>) {
  const props = { ...base, ...p };
  switch (name) {
    case "laptop": return <svg {...props}><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></svg>;
    case "shield": return <svg {...props}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "loop": return <svg {...props}><path d="M12 12c-2-3-3.5-4-5.5-4a4 4 0 000 8c2 0 3.5-1 5.5-4zm0 0c2 3 3.5 4 5.5 4a4 4 0 000-8c-2 0-3.5 1-5.5 4z" /></svg>;
    case "bulb": return <svg {...props}><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" /></svg>;
    case "pen": return <svg {...props}><path d="M4 20l1-4L16 5l3 3L8 19z" /><path d="M14 7l3 3" /></svg>;
    case "code": return <svg {...props}><path d="M9 8l-4 4 4 4M15 8l4 4-4 4M13.5 6l-3 12" /></svg>;
    case "check": return <svg {...props}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "chart": return <svg {...props}><path d="M5 20v-5M10 20v-9M15 20v-13M20 20V4" /></svg>;
    case "layers": return <svg {...props}><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></svg>;
    case "target": return <svg {...props}><circle cx="12" cy="12" r="6.5" /><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" /></svg>;
    case "terminal": return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 10l2.5 2L7 14M12.5 15H17" /></svg>;
    case "gear": return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
    case "arrow": return <svg {...props} width={18} height={18} strokeWidth={1.8}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "chevron": return <svg {...props} width={14} height={14} strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>;
    case "plus": return <svg {...props} width={16} height={16} strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>;
    case "menu": return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "close": return <svg {...props}><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case "cloud": return <svg {...props}><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.6-1.5A4.5 4.5 0 007 18z" /></svg>;
    case "branch": return <svg {...props}><circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="10" r="2.2" /><path d="M6 8.2V18M6 8.2a6 6 0 006 6h4" /></svg>;
    case "mail": return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></svg>;
    default: return null;
  }
}

export function LogoMark({ className = "" }: { className?: string }) {
  // Placeholder geometric mark: a faceted diamond with an inner rule. Temporary, not a permanent logo.
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path d="M16 3l13 13-13 13L3 16z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.5 16h13M16 9.5v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-7 w-7 text-gold" />
      <span className="h-6 w-px bg-slate/50" aria-hidden="true" />
      <span className="font-sans text-[15px] font-medium tracking-[0.18em]">ETHORA LABS</span>
    </span>
  );
}
