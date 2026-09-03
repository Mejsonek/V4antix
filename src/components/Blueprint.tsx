import { useEffect, useRef, useState } from "react";
import { Megaphone, MousePointerClick, Calculator, UserPlus, Mail, Database, CalendarCheck } from "lucide-react";

const NODES = [
  { id: "ruch", icon: Megaphone, label: "Ruch", detail: "Ads · cold reach · social", meta: "wejście" },
  { id: "landing", icon: MousePointerClick, label: "Landing", detail: "Strona pod konwersję", meta: "24/7" },
  { id: "audyt", icon: Calculator, label: "Audyt", detail: "Klient sam liczy swoje liczby", meta: "kwalifikacja" },
  { id: "lead", icon: UserPlus, label: "Lead", detail: "Imię · firma · wynik", meta: "webhook" },
  { id: "email", icon: Mail, label: "E-mail", detail: "Spersonalizowana analiza", meta: "auto" },
  { id: "crm", icon: Database, label: "CRM", detail: "Notion · status · historia", meta: "sync" },
  { id: "rozmowa", icon: CalendarCheck, label: "Rozmowa", detail: "Termin wybrany przez klienta", meta: "cel" },
];

export function Blueprint() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(NODES.length - 1);
      return;
    }
    const items = Array.from(node.querySelectorAll("[data-step]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.step);
            setActive((prev) => (i > prev ? i : prev));
          }
        });
      },
      { threshold: 0.55, rootMargin: "0px 0px -15% 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 vx-blueprint-grid" />
      <div ref={ref} className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
            Schemat instalacji
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-foreground">
            Tak wygląda lejek, kiedy jest zaprojektowany, a nie sklejony.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Każdy element ma swoje miejsce i swoje wejście. Przewiń — zobaczysz, którędy płynie
            klient od pierwszego kliknięcia do umówionej rozmowy.
          </p>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <div
            aria-hidden
            className="absolute bottom-0 left-[27px] top-0 w-px bg-border sm:left-[31px]"
          />
          <div
            aria-hidden
            className="vx-trace absolute left-[27px] top-0 w-px sm:left-[31px]"
            style={{
              height: `${active < 0 ? 0 : ((active + 1) / NODES.length) * 100}%`,
            }}
          />

          <ol className="relative space-y-3 sm:space-y-4">
            {NODES.map((n, i) => {
              const Icon = n.icon;
              const on = i <= active;
              return (
                <li
                  key={n.id}
                  data-step={i}
                  className={`flex items-stretch gap-4 transition-all duration-700 ease-out sm:gap-5 ${
                    on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-45"
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-500 sm:h-16 sm:w-16 ${
                      on
                        ? "vx-node-on border-accent-brand/60 bg-background text-accent-brand"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                  </span>
                  <div
                    className={`flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border p-4 transition-all duration-500 sm:p-5 ${
                      on
                        ? "border-accent-brand/25 bg-card shadow-sm"
                        : "border-border bg-card/40"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                        {n.label}
                      </div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                        {n.detail}
                      </div>
                    </div>
                    <span
                      className={`flex-shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition sm:text-[11px] ${
                        on
                          ? "bg-accent-brand/10 text-accent-brand"
                          : "bg-surface-muted text-muted-foreground"
                      }`}
                    >
                      {n.meta}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {active + 1 >= NODES.length
            ? "// instalacja kompletna — 7/7 punktów"
            : `// ${Math.max(active + 1, 0)}/${NODES.length} punktów`}
        </p>
      </div>
    </section>
  );
}
