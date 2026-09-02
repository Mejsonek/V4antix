import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { content, type Dict, type Locale } from "./content";

type Theme = "light" | "dark";

type PrefsValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: Dict;
};

const PrefsContext = createContext<PrefsValue | null>(null);

const LOCALE_KEY = "vantix.locale";
const THEME_KEY = "vantix.theme";

function isLocale(v: string | null): v is Locale {
  return v === "pl" || v === "en" || v === "de";
}

export function SitePrefsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pl");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(LOCALE_KEY);
    if (isLocale(storedLocale)) {
      setLocaleState(storedLocale);
    } else {
      const nav = window.navigator.language.slice(0, 2).toLowerCase();
      if (isLocale(nav)) setLocaleState(nav);
    }
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(LOCALE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <PrefsContext.Provider
      value={{ locale, setLocale, theme, toggleTheme, t: content[locale] as unknown as Dict }}
    >
      {children}
    </PrefsContext.Provider>
  );
}

export function useSitePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("useSitePrefs must be used inside SitePrefsProvider");
  return ctx;
}
