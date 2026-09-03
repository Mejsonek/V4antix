import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { VantixLogo, VantixMark } from "@/components/VantixLogo";
import { ThemeToggle } from "@/components/PrefsControls";
import { analyze } from "@/lib/analiza";
import { mount } from "@/lib/mount";

const WEBHOOK_URL = "https://v4ntix.app.n8n.cloud/webhook/vantix-audyt";
const DRAFT_KEY = "vantix.audyt.draft";
const SUBMIT_KEY = "vantix.audyt.submitted";

type Answers = Record<string, string | string[] | number>;

type Step =
  | {
      kind: "single" | "multi";
      id: string;
      eyebrow: string;
      question: string;
      hint?: string;
      options: { value: string; label: string; note?: string }[];
      optional?: boolean;
    }
  | {
      kind: "numbers";
      id: string;
      eyebrow: string;
      question: string;
      hint?: string;
      fields: { id: string; label: string; suffix?: string; default: number; step?: number }[];
    }
  | { kind: "contact"; id: string; eyebrow: string; question: string; hint?: string };

const STEPS: Step[] = [
  {
    kind: "single",
    id: "branza",
    eyebrow: "Twoja firma",
    question: "Czym się zajmujesz?",
    hint: "Dopasowuję dalsze pytania do Twojej branży.",
    options: [
      { value: "instalacje", label: "Instalacje / montaż", note: "klima, hydraulika, elektryka, fotowoltaika" },
      { value: "budowlanka", label: "Budowlanka / wykończenia" },
      { value: "uslugi-prof", label: "Usługi profesjonalne", note: "kancelaria, biuro rachunkowe, doradztwo" },
      { value: "it", label: "IT / software / agencja" },
      { value: "ecom", label: "E-commerce / handel" },
      { value: "inne", label: "Coś innego" },
    ],
  },
  {
    kind: "single",
    id: "wielkosc",
    eyebrow: "Skala",
    question: "Ile osób pracuje w firmie?",
    options: [
      { value: "1", label: "Tylko ja" },
      { value: "2-5", label: "2–5 osób" },
      { value: "6-15", label: "6–15 osób" },
      { value: "16-50", label: "16–50 osób" },
      { value: "50+", label: "Powyżej 50" },
    ],
  },
  {
    kind: "single",
    id: "sprzedaz",
    eyebrow: "Skala",
    question: "Kto u Was sprzedaje?",
    options: [
      { value: "wlasciciel", label: "Ja sam", note: "sprzedaż między jedną robotą a drugą" },
      { value: "1-handlowiec", label: "Jeden handlowiec" },
      { value: "zespol", label: "Zespół handlowy" },
      { value: "nikt", label: "Nikt konkretnie", note: "klienci przychodzą sami" },
    ],
  },
  {
    kind: "multi",
    id: "kanaly",
    eyebrow: "Pozyskiwanie",
    question: "Skąd dziś przychodzą klienci?",
    hint: "Zaznacz wszystko, co realnie działa.",
    options: [
      { value: "polecenia", label: "Polecenia" },
      { value: "google", label: "Google / SEO" },
      { value: "ads", label: "Reklamy płatne" },
      { value: "social", label: "Social media" },
      { value: "cold", label: "Cold outreach / telefon" },
      { value: "targi", label: "Targi, lokalnie, offline" },
      { value: "marketplace", label: "Portale branżowe / marketplace" },
    ],
  },
  {
    kind: "multi",
    id: "narzedzia",
    eyebrow: "Co już masz",
    question: "Co z tego jest u Was wdrożone?",
    hint: "Szczerze — brak czegoś nie jest wstydem, to punkt wyjścia.",
    options: [
      { value: "strona", label: "Strona www" },
      { value: "crm", label: "CRM" },
      { value: "followup", label: "Automatyczny follow-up" },
      { value: "kalendarz", label: "Kalendarz do umawiania" },
      { value: "oferty", label: "Szablony ofert" },
      { value: "analityka", label: "Analityka / mierzenie kosztu leada" },
      { value: "nic", label: "Praktycznie nic z powyższych" },
    ],
  },
  {
    kind: "numbers",
    id: "liczby",
    eyebrow: "Liczby",
    question: "Kilka liczb — szacunkowo, na oko.",
    hint: "Nie muszą być co do złotówki. Chodzi o rząd wielkości.",
    fields: [
      { id: "zapytania", label: "Zapytań miesięcznie", default: 15, step: 1 },
      { id: "closeRate", label: "Ile % kończy się zleceniem", suffix: "%", default: 25, step: 5 },
      { id: "wartosc", label: "Średnia wartość zlecenia", suffix: "zł", default: 4000, step: 500 },
    ],
  },
  {
    kind: "single",
    id: "reakcja",
    eyebrow: "Proces",
    question: "Po jakim czasie odzywacie się do nowego zapytania?",
    hint: "To zwykle najdroższy punkt całego lejka.",
    options: [
      { value: "minuty", label: "W kilka minut" },
      { value: "godziny", label: "Tego samego dnia" },
      { value: "dzien", label: "Następnego dnia" },
      { value: "dluzej", label: "Bywa, że dłużej" },
      { value: "nie-wiem", label: "Nie mierzymy tego" },
    ],
  },
  {
    kind: "single",
    id: "followup",
    eyebrow: "Proces",
    question: "Co się dzieje, gdy klient nie odpowie na ofertę?",
    options: [
      { value: "sekwencja", label: "Leci zaplanowana sekwencja przypomnień" },
      { value: "recznie", label: "Ktoś odzywa się ręcznie, jak pamięta" },
      { value: "nic", label: "Nic — czekamy, aż sam wróci" },
    ],
  },
  {
    kind: "multi",
    id: "problemy",
    eyebrow: "Problem",
    question: "Co Cię najbardziej uwiera?",
    hint: "Maksymalnie trzy — te najważniejsze.",
    options: [
      { value: "za-malo", label: "Za mało zapytań" },
      { value: "slabe", label: "Zapytania słabej jakości" },
      { value: "nie-domykam", label: "Zapytania są, ale nie domykam" },
      { value: "chaos", label: "Chaos — leady giną" },
      { value: "sezon", label: "Skoki: raz zalew, raz pustka" },
      { value: "czas", label: "Brak czasu na sprzedaż" },
      { value: "koszt", label: "Reklamy przepalają budżet" },
    ],
  },
  {
    kind: "single",
    id: "gotowosc",
    eyebrow: "Następny krok",
    question: "Kiedy chciałbyś to ruszyć?",
    options: [
      { value: "teraz", label: "Od razu" },
      { value: "miesiac", label: "W ciągu miesiąca" },
      { value: "kwartal", label: "W tym kwartale" },
      { value: "rozgladam", label: "Na razie się rozglądam" },
    ],
  },
  {
    kind: "contact",
    id: "kontakt",
    eyebrow: "Ostatni krok",
    question: "Gdzie mam wysłać analizę?",
    hint: "Odezwę się osobiście — nie trafisz na żadną listę mailingową.",
  },
];

const HOURS = [
  { value: "rano", label: "Rano", note: "8:00–11:00" },
  { value: "poludnie", label: "Południe", note: "11:00–14:00" },
  { value: "popoludnie", label: "Popołudnie", note: "14:00–17:00" },
  { value: "wieczor", label: "Wieczorem", note: "po 17:00" },
  { value: "dowolnie", label: "Obojętnie", note: "dopasuję się" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(Math.round(n));
}

function uid() {
  return `aud_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export default function Audyt() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    zapytania: 15,
    closeRate: 25,
    wartosc: 4000,
  });
  const [name, setName] = useState("");
  const [firma, setFirma] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState<string[]>([]);
  const [sms, setSms] = useState<"tak" | "nie" | "">("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "already">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const submissionId = useRef<string>(uid());
  const topRef = useRef<HTMLDivElement>(null);

  // wznowienie niedokończonego wypełniania
  useEffect(() => {
    try {
      if (window.localStorage.getItem(SUBMIT_KEY)) setStatus("already");
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.answers) setAnswers((a) => ({ ...a, ...d.answers }));
        if (typeof d.step === "number") setStep(Math.min(d.step, STEPS.length - 1));
        if (d.submissionId) submissionId.current = d.submissionId;
        if (d.contact) {
          setName(d.contact.name ?? "");
          setFirma(d.contact.firma ?? "");
          setEmail(d.contact.email ?? "");
          setPhone(d.contact.phone ?? "");
          setHours(d.contact.hours ?? []);
          setSms(d.contact.sms ?? "");
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "already") return;
    try {
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          step,
          answers,
          submissionId: submissionId.current,
          contact: { name, firma, email, phone, hours, sms },
        }),
      );
    } catch {
      /* ignore */
    }
  }, [step, answers, name, firma, email, phone, hours, sms, status]);

  const current = STEPS[step];
  const progress = ((step + (status === "sent" ? 1 : 0)) / STEPS.length) * 100;

  const wynik = useMemo(() => {
    const z = Number(answers.zapytania) || 0;
    const cr = Number(answers.closeRate) || 0;
    const w = Number(answers.wartosc) || 0;
    const teraz = z * (cr / 100) * w;
    const potencjal = z * (Math.min(cr + 10, 100) / 100) * w;
    return { teraz, roznica: potencjal - teraz };
  }, [answers]);

  function setSingle(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
    setTimeout(() => next(), 180);
  }

  function toggleMulti(id: string, value: string) {
    setAnswers((a) => {
      const cur = Array.isArray(a[id]) ? (a[id] as string[]) : [];
      const has = cur.includes(value);
      return { ...a, [id]: has ? cur.filter((v) => v !== value) : [...cur, value] };
    });
  }

  function canAdvance() {
    if (current.kind === "single") return Boolean(answers[current.id]);
    if (current.kind === "multi")
      return current.optional || (Array.isArray(answers[current.id]) && (answers[current.id] as string[]).length > 0);
    if (current.kind === "numbers") return true;
    return Boolean(firma && email);
  }

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit() {
    if (!firma || !email) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: submissionId.current,
          zrodlo: "audyt",
          wypelniono: new Date().toISOString(),
          kontakt: {
            imie: name,
            firma,
            email: email.trim().toLowerCase(),
            telefon: phone,
            godzinyKontaktu: hours,
            zgodaSms: sms === "tak",
          },
          odpowiedzi: answers,
          wyliczenia: {
            przychodMiesiecznie: Math.round(wynik.teraz),
            potencjalnaRoznicaMiesiecznie: Math.round(wynik.roznica),
            potencjalnaRoznicaRocznie: Math.round(wynik.roznica * 12),
          },
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      try {
        window.localStorage.setItem(SUBMIT_KEY, submissionId.current);
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "nieznany błąd");
    }
  }

  if (status === "already") {
    return (
      <Shell>
        <div className="rounded-2xl border border-accent-brand/40 bg-accent-brand/5 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-foreground">
            <Check className="h-5 w-5 text-accent-brand" strokeWidth={2.5} />
            <span className="font-semibold">Ten audyt jest już u mnie.</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Widzę, że wypełniałeś go z tego urządzenia. Nie musisz robić tego drugi raz —
            odezwę się w umówionych godzinach. Jeśli chcesz coś dopowiedzieć, napisz wprost:{" "}
            <a href="mailto:kacper@vantix.pl" className="text-accent-brand underline">
              kacper@vantix.pl
            </a>
          </p>
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.removeItem(SUBMIT_KEY);
              } catch {
                /* ignore */
              }
              submissionId.current = uid();
              setStatus("idle");
              setStep(0);
            }}
            className="mt-5 text-sm font-medium text-accent-brand underline"
          >
            Wypełnij jeszcze raz dla innej firmy
          </button>
        </div>
      </Shell>
    );
  }

  if (status === "sent") {
    const a = analyze(answers);
    return (
      <Shell>
        <div className="rounded-2xl border border-accent-brand/40 bg-accent-brand/5 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-brand text-accent-brand-foreground">
              <Check className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-semibold text-foreground">Mam wszystko.</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground sm:text-base">
            Dzięki{name ? `, ${name}` : ""} — pełną analizę dla firmy{" "}
            <strong className="font-semibold">{firma}</strong> przygotuję osobiście i odezwę się
            na <strong className="font-semibold">{email}</strong>
            {phone ? " lub telefonicznie" : ""}
            {hours.length
              ? ` (${hours.map((h) => HOURS.find((x) => x.value === h)?.label).join(", ").toLowerCase()})`
              : ""}
            .
          </p>
        </div>

        <div className="mt-8">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
            Twoja wstępna analiza
          </span>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            To widzę już teraz — bez czekania na rozmowę.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Poniżej konkrety wyliczone z Twoich odpowiedzi. Zabierz je ze sobą nawet jeśli nigdy
            nie zaczniemy współpracy.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { k: "Dziś", v: a.scenariusz.teraz, note: "z Twoich liczb" },
            { k: "+5 pkt skuteczności", v: a.scenariusz.plus5, note: "realne w kilka tygodni" },
            { k: "+10 pkt skuteczności", v: a.scenariusz.plus10, note: "cel na kwartał" },
          ].map((s2, i) => (
            <div
              key={s2.k}
              className={`rounded-xl border p-4 ${
                i === 0 ? "border-border bg-card" : "border-accent-brand/30 bg-accent-brand/5"
              }`}
            >
              <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                {s2.k}
              </div>
              <div className="mt-1.5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {fmt(s2.v)} zł
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{s2.note}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Ten sam ruch, ten sam zespół — różnica bierze się wyłącznie z procesu. Liczby są
          poglądowe i opierają się na tym, co sam podałeś.
        </p>

        <div className="mt-8 space-y-3">
          {a.findings.map((f, i) => (
            <div
              key={f.title}
              className="vx-step rounded-xl border border-border bg-card p-5"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                    f.severity === "krytyczne"
                      ? "bg-destructive/10 text-destructive"
                      : f.severity === "dobre"
                        ? "bg-accent-brand/10 text-accent-brand"
                        : "bg-surface-muted text-muted-foreground"
                  }`}
                >
                  {f.severity}
                </span>
              </div>
              <h3 className="mt-2.5 text-base font-semibold tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              {f.impact && (
                <p className="mt-2 text-sm font-medium text-accent-brand">{f.impact}</p>
              )}
            </div>
          ))}
        </div>

        {a.priorytet && (
          <div className="mt-8 rounded-2xl border border-accent-brand/40 bg-accent-brand/5 p-6">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent-brand">
              <Sparkles className="h-3.5 w-3.5" /> Od czego zacząć
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
              Gdybyś miał zmienić dziś jedną rzecz, zacznij od tego:{" "}
              <strong className="font-semibold">{a.priorytet.title.toLowerCase()}</strong>. To
              zwykle najszybszy zwrot przy najmniejszym nakładzie — i nie wymaga zwiększania
              budżetu na reklamę.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent-brand"
          >
            Poczytaj blog w międzyczasie
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent-brand"
          >
            Wróć na stronę
          </a>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div ref={topRef} />
      <div className="sticky top-[57px] z-40 -mx-4 mb-6 bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-widest">
            {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="vx-progress h-full rounded-full"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      </div>

      <div key={current.id} className="vx-step">
        <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
          {current.eyebrow}
        </span>
        <h1 className="mt-3 text-[clamp(1.4rem,4.5vw,2rem)] font-semibold leading-tight tracking-tight text-foreground">
          {current.question}
        </h1>
        {current.hint && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{current.hint}</p>
        )}

        <div className="mt-6">
          {current.kind === "single" && (
            <div className="grid gap-2.5">
              {current.options.map((o) => {
                const on = answers[current.id] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setSingle(current.id, o.value)}
                    className={`vx-choice rounded-xl border p-4 text-left transition ${
                      on
                        ? "border-accent-brand bg-accent-brand/10"
                        : "border-border bg-card hover:border-accent-brand/50"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-foreground sm:text-base">
                          {o.label}
                        </span>
                        {o.note && (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {o.note}
                          </span>
                        )}
                      </span>
                      <span
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition ${
                          on
                            ? "border-accent-brand bg-accent-brand text-accent-brand-foreground"
                            : "border-border"
                        }`}
                      >
                        {on && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {current.kind === "multi" && (
            <div className="grid gap-2.5">
              {current.options.map((o) => {
                const cur = Array.isArray(answers[current.id])
                  ? (answers[current.id] as string[])
                  : [];
                const on = cur.includes(o.value);
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => toggleMulti(current.id, o.value)}
                    className={`vx-choice rounded-xl border p-4 text-left transition ${
                      on
                        ? "border-accent-brand bg-accent-brand/10"
                        : "border-border bg-card hover:border-accent-brand/50"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-foreground sm:text-base">
                          {o.label}
                        </span>
                        {o.note && (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {o.note}
                          </span>
                        )}
                      </span>
                      <span
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition ${
                          on
                            ? "border-accent-brand bg-accent-brand text-accent-brand-foreground"
                            : "border-border"
                        }`}
                      >
                        {on && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {current.kind === "numbers" && (
            <div className="grid gap-4">
              {current.fields.map((f) => (
                <label key={f.id} className="block rounded-xl border border-border bg-card p-4">
                  <span className="text-xs font-medium text-muted-foreground">{f.label}</span>
                  <span className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      inputMode="numeric"
                      step={f.step}
                      value={Number(answers[f.id] ?? f.default)}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [f.id]: Number(e.target.value) || 0 }))
                      }
                      className="w-full bg-transparent text-2xl font-semibold tracking-tight text-foreground outline-none"
                    />
                    {f.suffix && (
                      <span className="text-sm text-muted-foreground">{f.suffix}</span>
                    )}
                  </span>
                </label>
              ))}
              <div className="rounded-xl border border-accent-brand/30 bg-accent-brand/5 p-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent-brand">
                  <Sparkles className="h-3.5 w-3.5" /> Na żywo
                </div>
                <div className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  {fmt(wynik.teraz)} zł / mies.
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tyle mniej więcej robi dziś Twój lejek. Pełne wyliczenie zobaczysz w analizie.
                </p>
              </div>
            </div>
          )}

          {current.kind === "contact" && (
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Imię" value={name} onChange={setName} placeholder="Jak się do Ciebie zwracać" />
                <Input label="Firma *" value={firma} onChange={setFirma} required />
                <Input label="E-mail *" value={email} onChange={setEmail} type="email" required />
                <Input label="Telefon" value={phone} onChange={setPhone} type="tel" placeholder="opcjonalnie" />
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <span className="text-sm font-semibold text-foreground">
                  Kiedy najlepiej dzwonić?
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  Zaznacz, co Ci pasuje — nie zadzwonię poza tymi godzinami.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {HOURS.map((h) => {
                    const on = hours.includes(h.value);
                    return (
                      <button
                        key={h.value}
                        type="button"
                        onClick={() =>
                          setHours((cur) =>
                            cur.includes(h.value)
                              ? cur.filter((v) => v !== h.value)
                              : [...cur, h.value],
                          )
                        }
                        className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
                          on
                            ? "border-accent-brand bg-accent-brand/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-accent-brand/50"
                        }`}
                      >
                        <span className="block font-semibold">{h.label}</span>
                        <span className="block text-[11px] opacity-70">{h.note}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <span className="text-sm font-semibold text-foreground">
                  Wysłać SMS-em przypomnienie o umówionym terminie?
                </span>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {(["tak", "nie"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSms(v)}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                        sms === v
                          ? "border-accent-brand bg-accent-brand/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-accent-brand/50"
                      }`}
                    >
                      {v === "tak" ? "Tak, chętnie" : "Nie, tylko mail"}
                    </button>
                  ))}
                </div>
                {sms === "tak" && !phone && (
                  <p className="mt-2 text-xs text-destructive">
                    Podaj numer telefonu wyżej, inaczej nie mam gdzie wysłać SMS-a.
                  </p>
                )}
              </div>

              <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent-brand" />
                Dane trafiają wyłącznie do mnie i służą do przygotowania analizy oraz kontaktu.
                Nie dopisuję nikogo do newslettera i nie przekazuję danych dalej.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" /> Wstecz
          </button>

          {current.kind === "contact" ? (
            <button
              type="button"
              onClick={submit}
              disabled={!canAdvance() || status === "sending"}
              className="vx-btn-accent inline-flex items-center justify-center gap-2 rounded-md bg-accent-brand px-6 py-3 text-sm font-semibold text-accent-brand-foreground disabled:opacity-50"
            >
              {status === "sending" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Wysyłam…
                </>
              ) : (
                <>
                  Wyślij i umów audyt <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance()}
              className="vx-btn-accent inline-flex items-center justify-center gap-2 rounded-md bg-accent-brand px-6 py-3 text-sm font-semibold text-accent-brand-foreground disabled:opacity-40"
            >
              Dalej <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {status === "error" && (
          <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
            Nie udało się wysłać ({errorMsg}). Spróbuj jeszcze raz albo napisz wprost:{" "}
            <a href="mailto:kacper@vantix.pl" className="underline">
              kacper@vantix.pl
            </a>
          </p>
        )}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 vx-blueprint-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 hidden h-[440px] w-[440px] opacity-[0.05] lg:block"
      >
        <VantixMark className="h-full w-full" />
      </div>
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/">
            <VantixLogo />
          </a>
          <ThemeToggle />
        </div>
      </header>
      <main className="relative mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-accent-brand"
      />
    </label>
  );
}

mount(<Audyt />);
