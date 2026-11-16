/**
 * Hero's right-side composition: restrained technical linework in Ethora's own palette,
 * labelled with the three roots the page explains (Ethics, Ethos, Engineering).
 * The zigzag's start and end points share both x-offset and y, mirrored around the
 * corner-bracket frame's own center (310, 314 baseline) -- any mismatch there either
 * pokes the fill past one bottom corner, or gives its two base edges different
 * heights, so it only reads as symmetric with both matched.
 */
export default function HeroMark() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden="true">
      <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-dark">The roots of our name</p>
      <svg viewBox="0 0 620 395" className="h-auto w-full drop-shadow-[0_0_36px_rgba(196,167,122,0.1)]">
        <defs>
          <linearGradient id="aboutHeroGlow" x1="0" x2="1" y1="1" y2="0">
            <stop stopColor="#C4A77A" stopOpacity=".04" />
            <stop offset=".55" stopColor="#C4A77A" stopOpacity=".22" />
            <stop offset="1" stopColor="#C4A77A" stopOpacity=".05" />
          </linearGradient>
        </defs>
        <g stroke="#C4A77A" fill="none">
          <circle cx="321" cy="201" r="145" opacity=".3" strokeWidth="1" />
          <circle cx="321" cy="201" r="104" opacity=".16" strokeDasharray="4 7" />
          <circle cx="321" cy="201" r="54" opacity=".36" strokeWidth="1.3" />
          <path d="M75 201H565M321 18V378" opacity=".14" />
          <path d="M130 314 210 190 270 250 310 140 350 250 410 190 490 314" strokeWidth="1.4" opacity=".65" />
          <path d="M130 314 210 190 270 250 310 140 350 250 410 190 490 314 L490 360 L130 360 Z" fill="url(#aboutHeroGlow)" stroke="none" />
          <path d="M100 88V45H143M477 45H520V88M100 302V345H143M477 345H520V302" opacity=".22" />
          <circle cx="210" cy="190" r="5" fill="#C4A77A" stroke="none" />
          <circle cx="310" cy="140" r="5" fill="#C4A77A" stroke="none" />
          <circle cx="410" cy="190" r="5" fill="#C4A77A" stroke="none" />
          <circle cx="321" cy="201" r="7" fill="#0B1420" strokeWidth="1.4" />
        </g>
        <g fill="#D9C8A8" fontSize="12" letterSpacing="2.2" style={{ fontFamily: "system-ui, sans-serif" }}>
          <text x="40" y="177">ETHICS</text>
          <text x="310" y="72" textAnchor="middle">ENGINEERING</text>
          <text x="422" y="165">ETHOS</text>
        </g>
        <g stroke="#C4A77A" strokeWidth=".8" opacity=".55">
          <path d="M103 181H170L210 190" />
          <path d="M310 88V140" />
          <path d="M435 173 415 188" />
        </g>
      </svg>
    </div>
  );
}
