import { useEffect, useRef, useState } from "react";
import { Check, Moon, Sun } from "lucide-react";
import { LOCALES } from "@/lib/content";
import { useSitePrefs } from "@/lib/site-prefs";

export function ThemeToggle() {
  const { theme, toggleTheme, t } = useSitePrefs();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t.nav.theme}
      title={t.nav.theme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-accent-brand hover:text-accent-brand"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.75} />
      )}
    </button>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useSitePrefs();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-label={t.nav.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-semibold text-muted-foreground transition hover:border-accent-brand hover:text-accent-brand"
      >
        <span className="text-base leading-none">{current.flag}</span>
        {current.short}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg"
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === locale}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-foreground transition hover:bg-surface-muted"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{l.flag}</span>
                  <span className="font-semibold">{l.short}</span>
                  <span className="text-muted-foreground">{l.label}</span>
                </span>
                {l.code === locale && (
                  <Check className="h-3.5 w-3.5 text-accent-brand" strokeWidth={2.5} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
