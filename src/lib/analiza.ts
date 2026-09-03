import type { Locale } from "./content";

type Answers = Record<string, string | string[] | number>;

const T = {
  pl: {
    reakcjaWolna: { t: "Za wolna reakcja na nowe zapytanie", b: "Klient, który wysyła zapytanie, zwykle pyta w kilku miejscach naraz. Kto odezwie się pierwszy, ten zwykle rozmawia — reszta dostaje „już wybraliśmy kogoś innego”. To najtańszy do naprawienia punkt w całym lejku, bo nie wymaga ani złotówki więcej na reklamę.", i: (v: string) => `Nawet kilka odzyskanych zapytań miesięcznie to rząd ${v}.` },
    reakcjaNieWiem: { t: "Nie wiesz, ile czasu zajmuje Wam odpowiedź", b: "Nie da się poprawić czegoś, czego się nie mierzy. Pierwszy krok to nie automatyzacja, tylko prosty licznik: kiedy przyszło zapytanie i kiedy poszła odpowiedź." },
    reakcjaDobra: { t: "Reagujecie szybko — to realna przewaga", b: "Odpowiedź w kilka minut stawia Was przed większością konkurencji. Warto to utrzymać przy większym wolumenie, bo to zwykle pierwsza rzecz, która pęka przy wzroście." },
    followupBrak: { t: "Brak follow-upu — pieniądze leżą w już opłaconych leadach", b: "Duża część klientów nie odpowiada na pierwszą ofertę nie dlatego, że nie chce, tylko dlatego, że akurat ma inne rzeczy na głowie. Bez sekwencji przypomnień ta grupa wyparowuje — mimo że koszt ich pozyskania już poniosłeś.", i: (v: string) => `Odzyskanie choćby części tej grupy to rząd ${v}.` },
    followupRecznie: { t: "Follow-up zależy od tego, czy ktoś pamięta", b: "Ręczne przypominanie działa w spokojnym tygodniu i przestaje działać dokładnie wtedy, gdy macie dużo roboty — czyli wtedy, gdy najbardziej się opłaca. To zadanie dla sekwencji, nie dla pamięci." },
    polecenia: { t: "Dopływ klientów opiera się głównie na poleceniach", b: "Polecenia są najlepsze jakościowo i najgorsze pod względem sterowalności — nie decydujesz, ile ich będzie w danym miesiącu. Stąd skoki: raz zalew, raz pustka. Nie chodzi o rezygnację z poleceń, tylko o dołożenie kanału, którym da się kręcić gałką." },
    crm: { t: "Brak jednego miejsca, w którym żyją wszystkie leady", b: "Kiedy zapytania siedzą w skrzynce, na WhatsAppie i w głowie, część ginie — nie przez niedbalstwo, tylko dlatego, że nikt nie widzi całości naraz. CRM nie musi być drogi; musi być jeden." },
    analityka: { t: "Nie znacie kosztu pozyskania klienta", b: "Bez tej liczby każda decyzja o budżecie reklamowym jest zgadywaniem. Wystarczy najprostsza wersja: ile wydaliśmy, ile zapytań przyszło, ile się domknęło." },
    domykanie: { t: "Wąskim gardłem jest domykanie, nie ruch", b: (z: number, c: number) => `Przy ${z} zapytaniach miesięcznie i skuteczności ${c}% dolewanie ruchu podniesie koszty, zanim podniesie przychód. Najpierw proces sprzedaży, potem reklama — w odwrotnej kolejności przepala się budżet.` },
    paliwo: { t: "Domykacie dobrze — brakuje paliwa na wejściu", b: (c: number) => `Skuteczność ${c}% oznacza, że proces sprzedaży działa. To wygodna sytuacja: każdy dodatkowy lead ma realną szansę zamienić się w zlecenie, więc inwestycja w ruch zwraca się szybciej niż przeciętnie.` },
    sev: { kryt: "krytyczne", duze: "duże", warte: "warte poprawy", dobre: "dobre" },
  },
  en: {
    reakcjaWolna: { t: "Too slow to respond to new inquiries", b: "Someone sending an inquiry is usually asking several companies at once. Whoever replies first usually gets the conversation — everyone else hears \"we already picked someone\". It's the cheapest fix in the whole funnel because it costs nothing extra in ad spend.", i: (v: string) => `Even a few recovered inquiries a month is around ${v}.` },
    reakcjaNieWiem: { t: "You don't know how long replies take", b: "You can't improve what you don't measure. The first step isn't automation, it's a simple count: when the inquiry arrived and when the reply went out." },
    reakcjaDobra: { t: "You respond fast — that's a real advantage", b: "Replying within minutes puts you ahead of most competitors. Worth protecting as volume grows, because it's usually the first thing that breaks." },
    followupBrak: { t: "No follow-up — money is sitting in leads you already paid for", b: "Most clients who don't reply to a first quote aren't uninterested, they're just busy. Without a reminder sequence that group simply evaporates — even though you already paid to acquire them.", i: (v: string) => `Recovering even part of that group is around ${v}.` },
    followupRecznie: { t: "Follow-up depends on someone remembering", b: "Manual chasing works in a quiet week and stops working exactly when you're busy — which is when it pays off most. That's a job for a sequence, not for memory." },
    polecenia: { t: "Client flow rests mainly on referrals", b: "Referrals are the best channel for quality and the worst for control — you don't decide how many arrive this month. Hence the swings. This isn't about dropping referrals, it's about adding a channel you can actually turn up." },
    crm: { t: "No single place where all leads live", b: "When inquiries sit in an inbox, on WhatsApp and in someone's head, some get lost — not through carelessness, but because nobody sees the whole picture. A CRM doesn't need to be expensive; it needs to be singular." },
    analityka: { t: "You don't know your cost per acquired client", b: "Without that number every ad budget decision is guesswork. Start with the simplest version: what we spent, how many inquiries came in, how many closed." },
    domykanie: { t: "The bottleneck is closing, not traffic", b: (z: number, c: number) => `At ${z} inquiries a month and a ${c}% close rate, pouring in more traffic raises costs before it raises revenue. Sales process first, ads second — the other way round burns budget.` },
    paliwo: { t: "You close well — what's missing is fuel at the top", b: (c: number) => `A ${c}% close rate means the sales process works. That's a comfortable position: every extra lead has a real chance of becoming a job, so investing in traffic pays back faster than average.` },
    sev: { kryt: "critical", duze: "significant", warte: "worth fixing", dobre: "strong" },
  },
  de: {
    reakcjaWolna: { t: "Zu langsame Reaktion auf neue Anfragen", b: "Wer eine Anfrage schickt, fragt meist mehrere Firmen gleichzeitig an. Wer zuerst antwortet, führt das Gespräch — alle anderen hören „wir haben schon jemanden“. Das ist der günstigste Hebel im ganzen Funnel, denn er kostet keinen Cent zusätzliches Werbebudget.", i: (v: string) => `Schon ein paar zurückgewonnene Anfragen pro Monat liegen bei rund ${v}.` },
    reakcjaNieWiem: { t: "Ihr wisst nicht, wie lange eure Antwort dauert", b: "Was nicht gemessen wird, lässt sich nicht verbessern. Der erste Schritt ist keine Automatisierung, sondern ein einfacher Zähler: wann kam die Anfrage, wann ging die Antwort raus." },
    reakcjaDobra: { t: "Ihr reagiert schnell — ein echter Vorteil", b: "Eine Antwort binnen Minuten setzt euch vor die meisten Wettbewerber. Das gilt es bei wachsendem Volumen zu halten, denn genau das bricht meist zuerst weg." },
    followupBrak: { t: "Kein Follow-up — Geld liegt in bereits bezahlten Leads", b: "Die meisten Kunden, die auf ein erstes Angebot nicht antworten, sind nicht uninteressiert, sondern beschäftigt. Ohne Erinnerungssequenz verdampft diese Gruppe — obwohl die Akquisekosten längst bezahlt sind.", i: (v: string) => `Schon ein Teil davon zurückzuholen liegt bei rund ${v}.` },
    followupRecznie: { t: "Follow-up hängt davon ab, ob jemand daran denkt", b: "Manuelles Nachfassen klappt in einer ruhigen Woche und hört genau dann auf, wenn viel los ist — also dann, wenn es sich am meisten lohnt. Das ist Aufgabe einer Sequenz, nicht des Gedächtnisses." },
    polecenia: { t: "Der Kundenzufluss beruht vor allem auf Empfehlungen", b: "Empfehlungen sind qualitativ das Beste und in der Steuerbarkeit das Schlechteste — du entscheidest nicht, wie viele diesen Monat kommen. Daher die Ausschläge. Es geht nicht darum, Empfehlungen aufzugeben, sondern einen regelbaren Kanal danebenzustellen." },
    crm: { t: "Kein zentraler Ort, an dem alle Leads leben", b: "Wenn Anfragen im Postfach, bei WhatsApp und im Kopf liegen, geht ein Teil verloren — nicht aus Nachlässigkeit, sondern weil niemand das Ganze sieht. Ein CRM muss nicht teuer sein; es muss eines sein." },
    analityka: { t: "Ihr kennt die Kosten pro gewonnenem Kunden nicht", b: "Ohne diese Zahl ist jede Budgetentscheidung Raten. Die einfachste Version genügt: was ausgegeben, wie viele Anfragen, wie viele Abschlüsse." },
    domykanie: { t: "Der Engpass ist der Abschluss, nicht der Traffic", b: (z: number, c: number) => `Bei ${z} Anfragen im Monat und ${c}% Abschlussquote erhöht mehr Traffic zuerst die Kosten, nicht den Umsatz. Erst der Vertriebsprozess, dann Werbung — andersherum verbrennt man Budget.` },
    paliwo: { t: "Ihr schließt gut ab — es fehlt Nachschub oben", b: (c: number) => `${c}% Abschlussquote heißt, der Vertriebsprozess funktioniert. Eine komfortable Lage: jeder zusätzliche Lead hat echte Chancen, also rechnet sich Investition in Traffic schneller als üblich.` },
    sev: { kryt: "kritisch", duze: "erheblich", warte: "verbesserungswürdig", dobre: "stark" },
  },
} as const;

export type Finding = {
  severity: string;
  tone: "kryt" | "duze" | "warte" | "dobre";
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

export function analyze(a: Answers, locale: Locale = "pl") {
  const L = T[locale];
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
      severity: L.sev.kryt, tone: "kryt",
      title: L.reakcjaWolna.t, body: L.reakcjaWolna.b,
      impact: odzysk > 0 ? L.reakcjaWolna.i(pln(odzysk)) : undefined,
    });
  } else if (reakcja === "nie-wiem") {
    findings.push({ severity: L.sev.duze, tone: "duze", title: L.reakcjaNieWiem.t, body: L.reakcjaNieWiem.b });
  } else if (reakcja === "minuty") {
    findings.push({ severity: L.sev.dobre, tone: "dobre", title: L.reakcjaDobra.t, body: L.reakcjaDobra.b });
  }

  // 2. Follow-up
  if (followup === "nic") {
    const odzysk = zapytania * (closeRate / 100) * wartosc * 0.25;
    findings.push({
      severity: L.sev.kryt, tone: "kryt",
      title: L.followupBrak.t, body: L.followupBrak.b,
      impact: odzysk > 0 ? L.followupBrak.i(pln(odzysk)) : undefined,
    });
  } else if (followup === "recznie") {
    findings.push({ severity: L.sev.duze, tone: "duze", title: L.followupRecznie.t, body: L.followupRecznie.b });
  }

  // 3. Zależność od poleceń
  if (kanaly.includes("polecenia") && kanaly.length <= 2) {
    findings.push({ severity: L.sev.duze, tone: "duze", title: L.polecenia.t, body: L.polecenia.b });
  }

  // 4. Brak CRM
  if (narzedzia.includes("nic") || !narzedzia.includes("crm")) {
    findings.push({ severity: L.sev.duze, tone: "duze", title: L.crm.t, body: L.crm.b });
  }

  // 5. Brak mierzenia
  if (!narzedzia.includes("analityka")) {
    findings.push({ severity: L.sev.warte, tone: "warte", title: L.analityka.t, body: L.analityka.b });
  }

  // 6. Diagnoza wg zgłoszonego problemu
  if (problemy.includes("nie-domykam") && closeRate < 30) {
    findings.push({ severity: L.sev.duze, tone: "duze", title: L.domykanie.t, body: L.domykanie.b(zapytania, closeRate) });
  }
  if (problemy.includes("za-malo") && closeRate >= 30) {
    findings.push({ severity: L.sev.warte, tone: "warte", title: L.paliwo.t, body: L.paliwo.b(closeRate) });
  }

  const scenariusz = {
    teraz: przychod,
    plus5: zapytania * (Math.min(closeRate + 5, 100) / 100) * wartosc,
    plus10: zapytania * (Math.min(closeRate + 10, 100) / 100) * wartosc,
  };

  const priorytet =
    findings.find((f) => f.tone === "kryt") ??
    findings.find((f) => f.tone === "duze") ??
    findings[0];

  return { przychod, scenariusz, findings: findings.slice(0, 5), priorytet };
}
