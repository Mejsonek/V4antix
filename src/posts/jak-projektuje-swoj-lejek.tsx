import { useState } from "react";
import { Radio, Cog, FileSearch, MailCheck, CalendarCheck } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { mount } from "@/lib/mount";

const STAGES = [
  {
    id: "kanaly",
    number: "01",
    icon: Radio,
    label: "Wielokanałowe pozyskiwanie",
    summary: "Cztery kanały naraz",
    description:
      "Cold reach (spersonalizowane maile + osobiste listy), ads, landing page i social media Vantix (posty edukacyjne i storytellingowe) — działają równolegle, nie jeden po drugim. Każdy mail jest pisany pod konkretną firmę, nie pod listę — każdy klient jest traktowany jak „ten” klient, nie jak pozycja w tabeli.",
    tools: "OutreachPilot, poczta tradycyjna, Meta/Google Ads, social media",
    why: "Value first. Zanim cokolwiek poproszę, coś daję — konkretną obserwację, konkretny list, konkretny post, nie ogólnik.",
  },
  {
    id: "crm",
    number: "02",
    icon: Cog,
    label: "CRM",
    summary: "Cały proces zautomatyzowany",
    description:
      "Niezależnie od kanału, każdy kontakt ląduje w tym samym miejscu — Notion CRM, zasilany automatycznie przez n8n. Zero ręcznego przepisywania między kanałami.",
    tools: "n8n + Notion CRM",
    why: "Cztery kanały bez wspólnego CRM to cztery osobne, nieporównywalne procesy. Z CRM to jeden proces z czterema wejściami.",
  },
  {
    id: "audyt",
    number: "03",
    icon: FileSearch,
    label: "Interaktywny audyt",
    summary: "Automatycznie wysyłany",
    description:
      "Zamiast gotowej oferty, klient dostaje interaktywny audyt — narzędzie, w którym sam wprowadza swoje liczby i widzi wynik. To ten sam mechanizm co kalkulator, tylko dopasowany do etapu, na którym już jest w CRM.",
    tools: "Kalkulator / audyt interaktywny",
    why: "Wynik, który klient sam sobie policzył, przekonuje mocniej niż ten, który mu powiem.",
  },
  {
    id: "email",
    number: "04",
    icon: MailCheck,
    label: "Email z częściowym wynikiem",
    summary: "Hak do rozmowy",
    description:
      "Częściowy wynik audytu trafia mailem — wystarczająco dużo, żeby pokazać, że jest problem wart rozmowy, za mało, żeby to była cała odpowiedź. Cel: umówienie rozmowy, nie zamknięcie sprzedaży w mailu.",
    tools: "Automatyczny mail z CRM",
    why: "Pełny wynik bez kontekstu można zignorować. Częściowy wynik rodzi pytanie — a pytanie prowadzi do rozmowy.",
  },
  {
    id: "kalendarz",
    number: "05",
    icon: CalendarCheck,
    label: "Kalendarz",
    summary: "Umówienie rozmowy",
    description:
      "Klient sam wybiera termin z kalendarza — bez wymiany 5 maili w stylu „to może we wtorek?”. Stąd prosta droga do rozmowy audytowej i, jeśli pasujemy sobie, do współpracy.",
    tools: "Kalendarz online",
    why: "Każde tarcie między „chcę porozmawiać” a „rozmawiamy” to okazja, żeby ktoś się rozmyślił.",
  },
];

function InteractiveFunnel() {
  const [active, setActive] = useState(STAGES[0].id);
  const stage = STAGES.find((s) => s.id === active)!;
  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {STAGES.map((s) => {
          const Icon = s.icon;
          const on = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border px-1 py-3 text-center transition sm:gap-2 sm:py-4 ${
                on ? "border-accent-brand bg-accent-brand/10" : "border-border hover:border-accent-brand/40"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10 ${
                  on
                    ? "bg-accent-brand text-accent-brand-foreground"
                    : "bg-surface-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                {s.number}
              </span>
              <span className="text-[11px] font-medium leading-tight text-foreground sm:text-xs">
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-5 rounded-xl bg-surface-muted p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {stage.number}. {stage.label}
          </h3>
          <span className="flex-shrink-0 rounded-md bg-accent-brand/10 px-2 py-0.5 text-[11px] font-semibold text-accent-brand">
            {stage.summary}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{stage.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Narzędzia: </span>
          {stage.tools}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Dlaczego tak: </span>
          {stage.why}
        </p>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground sm:hidden">
        Kliknij etap, żeby zobaczyć szczegóły
      </p>
    </div>
  );
}

function Post() {
  return (
    <BlogLayout eyebrow="Jak pracuję" title="Jak projektuję swój lejek" date="Sierpień 2026">
      <p>
        Kiedy ktoś pyta mnie, jak wygląda mój lejek, najczęściej spodziewa się jednej ścieżki:
        mail → strona → sprzedaż. U mnie wygląda inaczej — cztery kanały działają naraz,
        wszystkie ładują się do jednego CRM, a stamtąd proces jest już w pełni zautomatyzowany
        aż do umówienia rozmowy.
      </p>
      <p>
        Cold reach, ads, landing page i social media Vantix to nie kolejne etapy — to cztery
        równoległe wejścia do tego samego procesu. Każdy mail w cold reachu jest pisany pod
        konkretną firmę, nie pod listę kontaktów. Czasem to zwykły list, nie mail — bo prawie
        nikt dziś nie wysyła już fizycznych listów, więc taki list się wyróżnia. Zasada jest
        jedna: każdy klient jest traktowany jak „ten” klient, nie jak pozycja w arkuszu. Value
        first — zanim o cokolwiek poproszę, coś daję.
      </p>
      <p>
        Poniżej możesz kliknąć każdy etap i zobaczyć, co się w nim dzieje, jakich narzędzi
        używam i dlaczego akurat w tej kolejności.
      </p>
      <InteractiveFunnel />
      <p>
        Najważniejszy element całego procesu to moment, w którym audyt przestaje być czymś, co
        ja tłumaczę, a staje się czymś, co klient sam sobie policzył. Interaktywny audyt w CRM
        działa dokładnie tak jak kalkulator na stronie — klient wprowadza własne liczby, widzi
        własny wynik. Częściowy wynik trafia potem mailem, żeby był powód do rozmowy, a nie
        gotowa odpowiedź, którą można zignorować.
      </p>
      <p>
        Ostatni krok — kalendarz — istnieje po to, żeby nic nie stało na przeszkodzie między
        „chcę porozmawiać” a rozmową. Żadnej wymiany pięciu maili o terminie. Klient wybiera
        slot, ja się pojawiam.
      </p>
      <p>
        To jest dokładnie ten proces, który dziś działa dla Vantix — cztery kanały, jeden CRM,
        jeden automat od pierwszego kontaktu do umówionej rozmowy.
      </p>
    </BlogLayout>
  );
}

mount(<Post />);
