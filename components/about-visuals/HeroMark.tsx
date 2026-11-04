/**
 * Hero's right-side composition: restrained technical linework in Ethora's own palette,
 * labelled with the two real roots this page explains (Ethics, Ethos) -- not a third,
 * invented "Engineering" branch some earlier drafts of this diagram included.
 */
export default function HeroMark() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden="true">
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
          <path d="M118 314 243 187 324 249 442 123 529 190" strokeWidth="1.4" opacity=".65" />
          <path d="M118 314 243 187 324 249 442 123 529 190 L529 360 L118 360 Z" fill="url(#aboutHeroGlow)" stroke="none" />
          <path d="M100 88V45H143M477 45H520V88M100 302V345H143M477 345H520V302" opacity=".22" />
          <circle cx="243" cy="187" r="5" fill="#C4A77A" stroke="none" />
          <circle cx="442" cy="123" r="5" fill="#C4A77A" stroke="none" />
          <circle cx="321" cy="201" r="7" fill="#0B1420" strokeWidth="1.4" />
        </g>
        <g fill="#D9C8A8" fontSize="12" letterSpacing="2.2" style={{ fontFamily: "system-ui, sans-serif" }}>
          <text x="52" y="177">ETHICS</text>
          <text x="465" y="107">ETHOS</text>
        </g>
        <g stroke="#C4A77A" strokeWidth=".8" opacity=".55">
          <path d="M115 181H202L243 187" />
          <path d="M473 112 445 123" />
        </g>
      </svg>
      <p className="mt-2 text-right text-[11px] font-medium uppercase tracking-[0.2em] text-muted-dark">Engineering with intention</p>
    </div>
  );
}
