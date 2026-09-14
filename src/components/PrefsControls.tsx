import { Moon, Sun } from "lucide-react";
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-accent-brand hover:text-accent-brand active:scale-95"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.75} />
      )}
    </button>
  );
}

/** Trzy języki widoczne od razu — bez rozwijanego menu, wygodne kciukiem. */
export function LanguageSwitcher({ full = false }: { full?: boolean }) {
  const { locale, setLocale, t } = useSitePrefs();
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`inline-flex items-center rounded-lg border border-border p-0.5 ${
        full ? "w-full" : ""
      }`}
    >
      {LOCALES.map((l) => {
        const on = l.code === locale;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            aria-pressed={on}
            aria-label={l.label}
            className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-2.5 text-xs font-semibold transition active:scale-95 sm:px-3 ${
              full ? "flex-1" : ""
            } ${
              on
                ? "bg-accent-brand/15 text-accent-brand"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-sm leading-none">{l.flag}</span>
            <span className={full ? "" : "hidden xs:inline sm:inline"}>{l.short}</span>
          </button>
        );
      })}
    </div>
  );
}
