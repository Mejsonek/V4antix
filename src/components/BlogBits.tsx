import { useMemo, useState, type ReactNode } from "react";
import { Check, Smartphone, ShieldCheck, AlertTriangle } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(Math.round(n));
}

export function Box({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-widest text-accent-brand">
          {title}
        </h3>
      )}
      <div className={title ? "mt-4" : ""}>{children}</div>
    </div>
  );
}

/** Manifest — zasady rzemiosła */
export function ManifestBox({
  title,
  items,
}: {
  title: string;
  items: { n: string; k: string; v: string }[];
}) {
  return (
    <Box title={title}>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.n} className="flex gap-4">
            <span className="font-mono text-sm font-semibold tabular-nums text-accent-brand">
              {i.n}
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">{i.k}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                {i.v}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Box>
  );
}

/** Dwie karty kontrastu: chaos vs architektura */
export function CompareCards({
  a,
  b,
}: {
  a: { label: string; title: string; items: string[] };
  b: { label: string; title: string; items: string[] };
}) {
  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-border bg-surface-muted p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <AlertTriangle className="h-3.5 w-3.5" /> {a.label}
        </div>
        <div className="mt-3 text-base font-semibold text-foreground">{a.title}</div>
        <ul className="mt-3 space-y-2">
          {a.items.map((i) => (
            <li key={i} className="text-sm leading-relaxed text-muted-foreground">
              — {i}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-accent-brand/40 bg-accent-brand/5 p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-brand">
          <ShieldCheck className="h-3.5 w-3.5" /> {b.label}
        </div>
        <div className="mt-3 text-base font-semibold text-foreground">{b.title}</div>
        <ul className="mt-3 space-y-2">
          {b.items.map((i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground">
              <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent-brand" strokeWidth={2.5} />
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Kalkulator: ile płacisz za ręczną robotę handlowca */
export function ManualWorkCalculator() {
  const [reps, setReps] = useState(2);
  const [salary, setSalary] = useState(7000);
  const [share, setShare] = useState(50);

  const wasted = useMemo(() => reps * salary * (share / 100), [reps, salary, share]);

  return (
    <Box title="Kalkulator manualnego etatu">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Liczba handlowców</span>
          <input
            type="number"
            min={0}
            value={reps}
            onChange={(e) => setReps(Number(e.target.value) || 0)}
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent-brand"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">
            Średnia pensja (PLN / mies.)
          </span>
          <input
            type="number"
            min={0}
            step={500}
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value) || 0)}
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent-brand"
          />
        </label>
        <div>
          <span className="text-xs font-medium text-muted-foreground">
            Czas na ręcznej robocie: {share}%
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={share}
            onChange={(e) => setShare(Number(e.target.value))}
            className="mt-3 w-full accent-[#FE5600]"
          />
        </div>
      </div>
      <div className="mt-6 rounded-xl border border-accent-brand/40 bg-accent-brand/5 p-5">
        <div className="text-xs font-medium uppercase tracking-widest text-accent-brand">
          Tyle miesięcznie płacisz za kopiowanie danych, nie za sprzedaż
        </div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {fmt(wasted)} zł{" "}
          <span className="text-sm font-normal text-muted-foreground">
            / mies. · {fmt(wasted * 12)} zł / rok
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Ostatni suwak ustawiasz sam — to Twoje założenie, nie moja statystyka. Zwykle warto
        zacząć od tego, żeby po prostu zmierzyć, ile czasu realnie schodzi na przeklepywanie.
      </p>
    </Box>
  );
}

/** Przełącznik architektury: AI hype vs architektura */
export function ArchitectureToggle() {
  const [mode, setMode] = useState<"hype" | "vantix">("hype");
  const flow =
    mode === "hype"
      ? [
          "Dane klienta z arkusza",
          "Wklejone do publicznego czatu",
          "Brak połączenia z bazą firmy",
          "Odpowiedź bez kontekstu → zgadywanie",
        ]
      : [
          "Dane w Twojej bazie (Notion / własny serwer)",
          "Prywatny webhook (n8n)",
          "Model z kontekstem firmy: oferta, marże, zasady",
          "Gotowy wpis w CRM, dane nie opuszczają infrastruktury",
        ];
  return (
    <Box>
      <div className="grid grid-cols-2 gap-2">
        {(["hype", "vantix"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-md border px-3 py-2.5 text-sm font-medium transition ${
              mode === m
                ? "border-accent-brand bg-accent-brand/10 text-foreground"
                : "border-border text-muted-foreground hover:border-accent-brand/50"
            }`}
          >
            {m === "hype" ? "Abonament na AI" : "Zaprojektowany system"}
          </button>
        ))}
      </div>
      <ol className="mt-5 space-y-3">
        {flow.map((step, i) => (
          <li key={step} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                mode === "vantix"
                  ? "bg-accent-brand text-accent-brand-foreground"
                  : "bg-surface-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </Box>
  );
}

/** Symulacja powiadomienia HITL na telefonie */
export function HitlPhoneMock() {
  const [state, setState] = useState<"idle" | "done">("idle");
  return (
    <Box>
      <div className="mx-auto max-w-xs rounded-[1.75rem] border-4 border-foreground/15 bg-surface-muted p-3 shadow-sm">
        <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
          <Smartphone className="h-3.5 w-3.5" /> Vantix Bot · teraz
        </div>
        {state === "idle" ? (
          <>
            <div className="mt-3 rounded-xl bg-card p-3">
              <div className="text-sm font-semibold text-foreground">Nowy lead</div>
              <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Marek Nowak · Klimatex sp. z o.o. · instalacje
                <br />
                Wynik z kalkulatora: 18 400 zł / mies. różnicy
              </div>
            </div>
            <div className="mt-3 grid gap-2">
              <button
                type="button"
                onClick={() => setState("done")}
                className="vx-btn-accent rounded-md bg-accent-brand px-3 py-2 text-xs font-semibold text-accent-brand-foreground"
              >
                Akceptuj i wyślij analizę
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground"
                >
                  Odrzuć
                </button>
                <button
                  type="button"
                  className="rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground"
                >
                  Zmień wycenę
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-3 rounded-xl border border-accent-brand/40 bg-accent-brand/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Check className="h-4 w-4 text-accent-brand" strokeWidth={2.5} /> Lead przetworzony
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Spersonalizowany mail wysłany w 2,4 s — bez dotykania laptopa.
            </p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="mt-3 text-xs font-medium text-accent-brand underline"
            >
              Pokaż jeszcze raz
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Kliknij przycisk — tak wygląda decyzja z drabiny.
      </p>
    </Box>
  );
}

/** Prompt bez wizji vs prompt z wizją */
export function PromptCompare() {
  const [side, setSide] = useState<"a" | "b">("a");
  return (
    <Box>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setSide("a")}
          className={`rounded-md border px-3 py-2.5 text-sm font-medium transition ${
            side === "a"
              ? "border-accent-brand bg-accent-brand/10 text-foreground"
              : "border-border text-muted-foreground hover:border-accent-brand/50"
          }`}
        >
          Prompt bez wizji
        </button>
        <button
          type="button"
          onClick={() => setSide("b")}
          className={`rounded-md border px-3 py-2.5 text-sm font-medium transition ${
            side === "b"
              ? "border-accent-brand bg-accent-brand/10 text-foreground"
              : "border-border text-muted-foreground hover:border-accent-brand/50"
          }`}
        >
          Prompt z architekturą
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[160px_1fr] sm:items-center">
        <div className="mx-auto h-32 w-32 overflow-hidden rounded-xl border border-border">
          {side === "a" ? (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,#8b5cf6,#4338ca_60%,#312e81)] blur-[1px]" />
          ) : (
            <svg viewBox="0 0 100 100" className="h-full w-full bg-[#0d0d0f]">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M10 0H0V10" fill="none" stroke="#ffffff14" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
              <path d="M20 20 L45 80 L38 80 L20 40 Z" fill="#FE5600" />
              <path d="M80 20 L55 80 L48 80 L66 40 Z" fill="#FE5600" />
            </svg>
          )}
        </div>
        <div>
          <div className="font-mono text-xs leading-relaxed text-muted-foreground">
            {side === "a"
              ? "„Zrób nowoczesne logo tech, ma być ładne”"
              : "„Czysta geometria, proporcje 1:1, surowy techniczny grid, jeden kolor akcentu #FE5600, zero gradientów, zero ozdobników”"}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            {side === "a"
              ? "Efekt: fioletowy gradient, który wygląda jak tysiąc innych szablonów. Model poszedł w stronę średniej, bo nie dostał żadnych ram."
              : "Efekt: konkret, który da się rozpoznać. Nie dlatego, że model jest lepszy — dlatego, że dostał twarde ograniczenia."}
          </p>
        </div>
      </div>
    </Box>
  );
}
