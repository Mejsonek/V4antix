import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Check, LoaderCircle, TrendingUp } from "lucide-react";
import { VantixLogo } from "@/components/VantixLogo";
import { ThemeToggle } from "@/components/PrefsControls";

const WEBHOOK_URL = "https://v4ntix.app.n8n.cloud/webhook/vantix-lead-capture";

const CHANNELS = [
  {
    value: "polecenia",
    label: "Głównie polecenia",
    note: "Pipeline zależny od tego, kto akurat kogoś poleci w danym miesiącu — trudno to prognozować.",
  },
  {
    value: "reklamy",
    label: "Reklamy płatne",
    note: "Ruch jest, pytanie ile z niego realnie konwertuje się w umówione spotkanie, a nie tylko w kliknięcie.",
  },
  {
    value: "cold",
    label: "Cold outreach / telefon",
    note: "Działa, ale zwykle nie skaluje się bez powtarzalnego procesu follow-upu.",
  },
  {
    value: "mix",
    label: "Trochę wszystkiego, bez systemu",
    note: "Najtrudniejszy przypadek do zoptymalizowania — bo nie wiadomo, co realnie działa.",
  },
  {
    value: "inne",
    label: "Inne / nie wiem",
    note: "Warto to najpierw zmapować, zanim zacznie się cokolwiek zmieniać.",
  },
];

function fmt(n: number) {
  return new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(Math.round(n));
}

export default function Calculator() {
  const [channel, setChannel] = useState("polecenia");
  const [inquiries, setInquiries] = useState(15);
  const [closeRate, setCloseRate] = useState(25);
  const [avgValue, setAvgValue] = useState(4000);
  const [uplift, setUplift] = useState(10);
  const [name, setName] = useState("");
  const [firma, setFirma] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const { current, projected, diffMonthly, diffYearly } = useMemo(() => {
    const cr = Math.min(100, Math.max(0, closeRate));
    const up = Math.min(100 - cr, Math.max(0, uplift));
    const cur = inquiries * (cr / 100) * avgValue;
    const proj = inquiries * ((cr + up) / 100) * avgValue;
    return {
      current: cur,
      projected: proj,
      diffMonthly: proj - cur,
      diffYearly: (proj - cur) * 12,
    };
  }, [inquiries, closeRate, avgValue, uplift]);

  const activeChannel = CHANNELS.find((c) => c.value === channel)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firma || !email) return;
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imie: name,
          firma,
          email,
          telefon: phone,
          kanal: activeChannel.label,
          zapytania: inquiries,
          closeRate,
          wartoscZlecenia: avgValue,
          uplift,
          wynikDzis: Math.round(current),
          wynikProjekcja: Math.round(projected),
          rozniceMiesiac: Math.round(diffMonthly),
          rozniceRok: Math.round(diffYearly),
          zrodlo: "kalkulator",
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/">
            <VantixLogo />
          </a>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
          Kalkulator
        </span>
        <h1 className="mt-3 text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight text-foreground">
          Ile realnie tracisz przez brak uporządkowanego lejka?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Wpisz swoje liczby. Ostatni suwak ustaw sam — to Twoje założenie, nie obiecana
          statystyka. Zajmie to 30 sekund.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <div>
            <label className="text-sm font-semibold text-foreground">
              Jak dziś pozyskujesz zlecenia?
            </label>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {CHANNELS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setChannel(c.value)}
                  className={`rounded-md border px-3 py-2.5 text-left text-sm transition ${
                    channel === c.value
                      ? "border-accent-brand bg-accent-brand/10 font-semibold text-foreground"
                      : "border-border text-muted-foreground hover:border-accent-brand/50"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {activeChannel.note}
            </p>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-3">
            <Field label="Zapytań / miesiąc">
              <input
                type="number"
                min={0}
                value={inquiries}
                onChange={(e) => setInquiries(Number(e.target.value) || 0)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent-brand"
              />
            </Field>
            <Field label="Zamyka się w zlecenie (%)">
              <input
                type="number"
                min={0}
                max={100}
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value) || 0)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent-brand"
              />
            </Field>
            <Field label="Śr. wartość zlecenia (PLN)">
              <input
                type="number"
                min={0}
                value={avgValue}
                onChange={(e) => setAvgValue(Number(e.target.value) || 0)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent-brand"
              />
            </Field>
          </div>

          <div className="mt-7 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">
                O ile mógłby wzrosnąć close rate z uporządkowanym follow-upem?
              </label>
              <span className="rounded-md bg-accent-brand/10 px-2 py-0.5 text-sm font-semibold text-accent-brand">
                +{uplift} pkt proc.
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              value={uplift}
              onChange={(e) => setUplift(Number(e.target.value))}
              className="mt-3 w-full accent-[#FE5600]"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              To Twoje założenie — ustaw ostrożnie. Realną liczbę dla Twojej firmy pokazuje
              dopiero audyt.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Dziś
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {fmt(current)} zł
              <span className="text-sm font-normal text-muted-foreground"> /mies.</span>
            </div>
          </div>
          <div className="rounded-xl border border-accent-brand/40 bg-accent-brand/5 p-5">
            <div className="text-xs font-medium uppercase tracking-widest text-accent-brand">
              Z uporządkowanym follow-upem
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {fmt(projected)} zł
              <span className="text-sm font-normal text-muted-foreground"> /mies.</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-surface-muted p-5">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-brand/10 text-accent-brand">
            <TrendingUp className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <div className="text-sm text-muted-foreground">Różnica przy Twoich założeniach</div>
            <div className="text-lg font-semibold text-foreground">
              {fmt(diffMonthly)} zł / mies. · {fmt(diffYearly)} zł / rok
            </div>
          </div>
        </div>

        {status === "sent" ? (
          <div className="mt-8 rounded-xl border border-accent-brand/40 bg-accent-brand/5 p-6">
            <div className="flex items-center gap-2 text-foreground">
              <Check className="h-5 w-5 text-accent-brand" strokeWidth={2.5} />
              <span className="font-semibold">Dziękuję, mam Twoje dane.</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Odezwę się w ciągu 1-2 dni roboczych, żeby umówić bezpłatny audyt.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8"
          >
            <h2 className="text-base font-semibold text-foreground">
              Zobacz dokładny plan dla Twojej firmy — bezpłatny audyt
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Zostaw kontakt, przenoszę też liczby z kalkulatora — nie musisz ich powtarzać.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Imię i nazwisko">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent-brand"
                />
              </Field>
              <Field label="Firma *">
                <input
                  type="text"
                  required
                  value={firma}
                  onChange={(e) => setFirma(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent-brand"
                />
              </Field>
              <Field label="E-mail *">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent-brand"
                />
              </Field>
              <Field label="Telefon">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent-brand"
                />
              </Field>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="vx-btn-accent mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-brand px-5 py-3 text-sm font-medium text-accent-brand-foreground disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Wysyłam...
                </>
              ) : (
                <>
                  Wyślij i umów audyt <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            {status === "error" && (
              <p className="mt-3 text-sm text-destructive">
                Coś nie zadziałało. Napisz bezpośrednio:{" "}
                <a href="mailto:kacper@vantix.pl" className="underline">
                  kacper@vantix.pl
                </a>
              </p>
            )}
          </form>
        )}
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
