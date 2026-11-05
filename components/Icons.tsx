import { useId, type SVGProps } from "react";

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

/**
 * "Synthesis" mark: one ribbon coiled into an E, seen from the front. The two ivory
 * faces sweep up to the right; the darker back of the coil shows through the gap
 * between them, and the gold lower band slips out from behind the middle face. Shapes
 * are traced from the brand identity sheet; public/brand/ethora-symbol-on-dark.svg and
 * public/favicon.svg carry the same geometry, so change all three together.
 */
export function LogoMark({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const id = useId();
  const u = (name: string) => `url(#${id}${name})`;
  // On ivory the back of the coil turns navy and the middle face warms slightly, so
  // the ivory band still separates from the page behind it.
  const back = tone === "light" ? ["#2b3b4d", "#101c2a"] : ["#a5885b", "#7a5f36"];
  const face = tone === "light" ? ["#fbf9f4", "#e2d3b2"] : ["#f8f5ee", "#ddcdab"];
  return (
    <svg viewBox="2 5 104 112" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}top`} x1="36" y1="40" x2="84" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f6f3ec" />
          <stop offset=".38" stopColor="#efe6d3" />
          <stop offset=".7" stopColor="#d8bf93" />
          <stop offset="1" stopColor="#c4a77a" />
        </linearGradient>
        <linearGradient id={`${id}fold`} x1="100" y1="0" x2="86" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6e5530" />
          <stop offset="1" stopColor="#6e5530" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}back`} x1="14" y1="52" x2="46" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={back[0]} />
          <stop offset="1" stopColor={back[1]} />
        </linearGradient>
        <linearGradient id={`${id}face`} x1="10" y1="96" x2="100" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={face[0]} />
          <stop offset=".78" stopColor="#f1eadb" />
          <stop offset="1" stopColor={face[1]} />
        </linearGradient>
        <linearGradient id={`${id}low`} x1="60" y1="86" x2="60" y2="113" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b8996a" />
          <stop offset=".45" stopColor="#c4a77a" />
          <stop offset="1" stopColor="#a88a59" />
        </linearGradient>
        <linearGradient id={`${id}shade`} x1="42" y1="88" x2="45.5" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5e4826" stopOpacity=".9" />
          <stop offset="1" stopColor="#5e4826" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path fill={u("back")} d={BACK} />
      <path fill={u("low")} d={LOW} />
      <path fill={u("shade")} d={LOW} />
      <path fill={u("face")} d={FACE} />
      <path fill="none" stroke={u("fold")} strokeWidth="3.6" d="M100,22 C100,26 96,28 90,28.5 C72,33 55,38 41,44" />
      <path fill={u("top")} d={TOP} />
    </svg>
  );
}

const BACK = "M33,50 C39,52.5 45,55.8 50.5,58.5 C42,62.5 31,67.5 23,71 C19,68.5 15,66 12,62.8 C18,57.8 25.5,53.2 33,50 Z";
const LOW = "M100,91.5 L100,100 C100,106 96,110.5 88,111.5 C78,113.5 64,112 52,107.5 C44,104.5 37,102 32,99.5 L22,94 L38,84 L44,85 C54,85 62,88 70,90.2 C78,92 84,93.4 88,93.3 C93,93.2 97,92 100,91.5 Z";
const FACE = "M100,42 L100,58 C100,66 96,70.5 88,72 C66,78 42,87 26,95 C18,99 10,103 7,107 L7,90 C7,84 12,79 18,75.5 C32,68 55,58 77,52 C88,49 96,46 100,42 Z";
const TOP = "M7,67 L7,47 C8,40 12,35 17,32 C30,24 55,14 77,10 C88,8 99,12 100,20 L100,22 C100,26 96,28 90,28.5 C72,33 55,38 41,44 C28,50 13,58 7,67 Z";

export function Wordmark({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const textCls = tone === "light" ? "text-ink" : "text-ivory";
  const labsCls = tone === "light" ? "text-gold-deep" : "text-gold";
  return (
    <span className={`inline-flex items-center gap-2.5 text-[15px] ${className}`}>
      <LogoMark tone={tone} className="h-6 w-6 shrink-0" />
      <span className={`font-sans font-medium tracking-[0.18em] ${textCls}`}>
        ETHORA <span className={labsCls}>LABS</span>
      </span>
    </span>
  );
}
