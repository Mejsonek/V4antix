type Props = {
  className?: string;
  showWordmark?: boolean;
  tone?: "dark" | "light";
};

export function VantixLogo({ className = "", showWordmark = true, tone = "dark" }: Props) {
  const text = tone === "dark" ? "text-foreground" : "text-primary-foreground";
  const sub = tone === "dark" ? "text-muted-foreground" : "text-primary-foreground/70";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <VantixMark className="h-7 w-7 shrink-0" />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={`text-[15px] font-bold tracking-[0.02em] ${text}`}>VANTIX</span>
          <span className={`mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] ${sub}`}>
            Growth Solutions
          </span>
        </span>
      )}
    </span>
  );
}

export function VantixMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vx-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF7A2E" />
          <stop offset="100%" stopColor="#E4520E" />
        </linearGradient>
      </defs>
      <path d="M6 8 L22 40 L18 40 L6 20 Z" fill="url(#vx-orange)" />
      <path d="M42 8 L26 40 L22 40 L34 20 Z" fill="url(#vx-orange)" />
      <path d="M24 24 L32 8 L26 8 L18 22 Z" fill="url(#vx-orange)" />
    </svg>
  );
}
