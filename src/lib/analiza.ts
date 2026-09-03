type Answers = Record<string, string | string[] | number>;

export type Finding = {
  severity: "krytyczne" | "duże" | "warte poprawy" | "dobre";
  title: string;
  body: string;
  impact?: string;
};

function arr(a: Answers, k: string): string[] {
  const v = a[k];
  return Array.isArray(v) ? v : [];
}

function num(a: Answers, k: string, d = 0): number {
  const v = Number(a[k]);
  return Number.isFinite(v) ? v : d;
}

function pln(n: number) {
  return `${new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(Math.round(n))} zł`;
}

export function analyze(a: Answers) {
  const zapytania = num(a, "zapytania", 0);
  const closeRate = num(a, "closeRate", 0);
  const wartosc = num(a, "wartosc", 0);
  const kanaly = arr(a, "kanaly");
  const narzedzia = arr(a, "narzedzia");
  const problemy = arr(a, "problemy");
  const reakcja = String(a.reakcja ?? "");
  const followup = String(a.followup ?? "");

  const przychod = zapytania * (closeRate / 100) * wartosc;
  const findings: Finding[] = [];

  // 1. Czas reakcji
  if (reakcja === "dzien" || reakcja === "dluzej") {
    const odzysk = zapytania * 0.08 * wartosc;
    findings.push({
      severity: "krytyczne",
      title: "Za wolna reakcja na nowe zapytanie",
      body: "Klient, który wysyła zapytanie, zwykle pyta w kilku miejscach naraz. Kto odezwie się pierwszy, ten zwykle rozmawia — reszta dostaje „już wybraliśmy kogoś innego”. To najtańszy do naprawienia punkt w całym lejku, bo nie wymaga ani złotówki więcej na reklamę.",
      impact: odzysk > 0 ? `Nawet kilka odzyskanych zapytań miesięcznie to rząd ${pln(odzysk)} / mies.` : undefined,
    });
  } else if (reakcja === "nie-wiem") {
    findings.push({
      severity: "duże",
      title: "Nie wiesz, ile czasu zajmuje Wam odpowiedź",
      body: "Nie da się poprawić czegoś, czego się nie mierzy. Pierwszy krok to nie automatyzacja, tylko prosty licznik: kiedy przyszło zapytanie i kiedy poszła odpowiedź. Zwykle sam pomiar poprawia wynik, bo problem przestaje być niewidoczny.",
    });
  } else if (reakcja === "minuty") {
    findings.push({
      severity: "dobre",
      title: "Reagujecie szybko — to realna przewaga",
      body: "Odpowiedź w kilka minut stawia Was przed większością konkurencji. Warto to utrzymać przy większym wolumenie, bo to zwykle pierwsza rzecz, która pęka przy wzroście liczby zapytań.",
    });
  }

  // 2. Follow-up
  if (followup === "nic") {
    const odzysk = zapytania * (closeRate / 100) * wartosc * 0.25;
    findings.push({
      severity: "krytyczne",
      title: "Brak follow-upu — pieniądze leżą w już opłaconych leadach",
      body: "Duża część klientów nie odpowiada na pierwszą ofertę nie dlatego, że nie chce, tylko dlatego, że akurat ma inne rzeczy na głowie. Bez zaplanowanej sekwencji przypomnień ta grupa po prostu wyparowuje — mimo że koszt ich pozyskania już poniosłeś.",
      impact: odzysk > 0 ? `Odzyskanie choćby części tej grupy to rząd ${pln(odzysk)} / mies.` : undefined,
    });
  } else if (followup === "recznie") {
    findings.push({
      severity: "duże",
      title: "Follow-up zależy od tego, czy ktoś pamięta",
      body: "Ręczne przypominanie działa w tygodniu, w którym jest spokój, i przestaje działać dokładnie wtedy, gdy macie dużo roboty — czyli wtedy, gdy najbardziej się opłaca. To zadanie dla sekwencji, nie dla pamięci.",
    });
  }

  // 3. Zależność od poleceń
  if (kanaly.includes("polecenia") && kanaly.length <= 2) {
    findings.push({
      severity: "duże",
      title: "Dopływ klientów opiera się głównie na poleceniach",
      body: "Polecenia są najlepszym źródłem jakościowo i najgorszym pod względem sterowalności — nie decydujesz, ile ich będzie w danym miesiącu. Stąd biorą się skoki: raz zalew, raz pustka. Nie chodzi o rezygnację z poleceń, tylko o dołożenie kanału, którym da się kręcić gałką.",
    });
  }

  // 4. Brak CRM
  if (narzedzia.includes("nic") || !narzedzia.includes("crm")) {
    findings.push({
      severity: "duże",
      title: "Brak jednego miejsca, w którym żyją wszystkie leady",
      body: "Kiedy zapytania siedzą w skrzynce, na WhatsAppie i w głowie, część ginie — nie przez niedbalstwo, tylko dlatego, że nikt nie widzi całości naraz. CRM nie musi być drogi ani skomplikowany; musi być jeden.",
    });
  }

  // 5. Brak mierzenia
  if (!narzedzia.includes("analityka")) {
    findings.push({
      severity: "warte poprawy",
      title: "Nie znacie kosztu pozyskania klienta",
      body: "Bez tej liczby każda decyzja o budżecie reklamowym jest zgadywaniem. Wystarczy zacząć od najprostszej wersji: ile wydaliśmy, ile zapytań przyszło, ile z nich się domknęło.",
    });
  }

  // 6. Diagnoza wg zgłoszonego problemu
  if (problemy.includes("nie-domykam") && closeRate < 30) {
    findings.push({
      severity: "duże",
      title: "Wąskim gardłem jest domykanie, nie ruch",
      body: `Przy ${zapytania} zapytaniach miesięcznie i skuteczności ${closeRate}% dolewanie ruchu podniesie koszty, zanim podniesie przychód. Najpierw proces sprzedaży, potem reklama — w odwrotnej kolejności przepala się budżet.`,
    });
  }
  if (problemy.includes("za-malo") && closeRate >= 30) {
    findings.push({
      severity: "warte poprawy",
      title: "Domykacie dobrze — brakuje paliwa na wejściu",
      body: `Skuteczność ${closeRate}% oznacza, że proces sprzedaży działa. To rzadka i wygodna sytuacja: każdy dodatkowy lead ma realną szansę zamienić się w zlecenie, więc inwestycja w ruch zwraca się szybciej niż przeciętnie.`,
    });
  }

  const scenariusz = {
    teraz: przychod,
    plus5: zapytania * (Math.min(closeRate + 5, 100) / 100) * wartosc,
    plus10: zapytania * (Math.min(closeRate + 10, 100) / 100) * wartosc,
  };

  const priorytet =
    findings.find((f) => f.severity === "krytyczne") ??
    findings.find((f) => f.severity === "duże") ??
    findings[0];

  return { przychod, scenariusz, findings: findings.slice(0, 5), priorytet };
}
