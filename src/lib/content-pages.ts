import type { Locale } from "./content";

/* ---------------- BLOG ---------------- */

type PostMeta = { slug: string; date: Record<Locale, string>; tag: Record<Locale, string> };

export const POST_META: PostMeta[] = [
  { slug: "instalacja-a-nie-prowizorka.html", date: { pl: "Wrzesień 2026", en: "September 2026", de: "September 2026" }, tag: { pl: "Rzemiosło", en: "Craft", de: "Handwerk" } },
  { slug: "handlowiec-czy-excel.html", date: { pl: "Wrzesień 2026", en: "September 2026", de: "September 2026" }, tag: { pl: "Koszty", en: "Costs", de: "Kosten" } },
  { slug: "system-a-abonament-na-ai.html", date: { pl: "Wrzesień 2026", en: "September 2026", de: "September 2026" }, tag: { pl: "Interaktywne", en: "Interactive", de: "Interaktiv" } },
  { slug: "human-in-the-loop.html", date: { pl: "Wrzesień 2026", en: "September 2026", de: "September 2026" }, tag: { pl: "Interaktywne", en: "Interactive", de: "Interaktiv" } },
  { slug: "ai-nie-stworzy-marki.html", date: { pl: "Wrzesień 2026", en: "September 2026", de: "September 2026" }, tag: { pl: "Interaktywne", en: "Interactive", de: "Interaktiv" } },
  { slug: "dlaczego-buduje-silniki.html", date: { pl: "Wrzesień 2026", en: "September 2026", de: "September 2026" }, tag: { pl: "Manifest", en: "Manifesto", de: "Manifest" } },
  { slug: "jeden-model-vs-trzy-narzedzia.html", date: { pl: "Wrzesień 2026", en: "September 2026", de: "September 2026" }, tag: { pl: "Narzędzia", en: "Tools", de: "Tools" } },
  { slug: "jak-projektuje-swoj-lejek.html", date: { pl: "Sierpień 2026", en: "August 2026", de: "August 2026" }, tag: { pl: "Interaktywne", en: "Interactive", de: "Interaktiv" } },
  { slug: "ai-dla-jednej-osoby-przelom-2026.html", date: { pl: "Sierpień 2026", en: "August 2026", de: "August 2026" }, tag: { pl: "AI", en: "AI", de: "KI" } },
  { slug: "co-montaz-nauczyl-mnie-o-sprzedazy.html", date: { pl: "Sierpień 2026", en: "August 2026", de: "August 2026" }, tag: { pl: "Sprzedaż", en: "Sales", de: "Vertrieb" } },
];

type PostText = { title: string; teaser: string };

export const POST_TEXT: Record<Locale, Record<string, PostText>> = {
  pl: {
    "instalacja-a-nie-prowizorka.html": { title: "Dobry system jest jak instalacja w budynku. Prowizorka zawsze się mści.", teaser: "Kable na taśmie malarskiej działają — do pierwszego spięcia. Z systemami w firmie jest dokładnie tak samo." },
    "handlowiec-czy-excel.html": { title: "Płacisz handlowcowi za klikanie w Excela czy za zamykanie deali?", teaser: "Prosty test na trzy pytania i kalkulator, który pokazuje, ile miesięcznie kosztuje Cię ręczne przeklepywanie danych." },
    "system-a-abonament-na-ai.html": { title: "System firmowy to nie to samo co abonament na AI", teaser: "Kupienie trzem osobom dostępu do czatu to nie wdrożenie AI. O różnicy między narzędziem a infrastrukturą." },
    "human-in-the-loop.html": { title: "AI jest szybkie, ale człowiek ma wyczucie. Dlaczego stawiam na Human-in-the-Loop?", teaser: "Decyzja o wysłaniu oferty podjęta kciukiem, stojąc na drabinie. Kliknij powiadomienie i zobacz, jak to działa." },
    "ai-nie-stworzy-marki.html": { title: "AI nie stworzy Ci marki. Wygrywa ten, kto ma wizję.", teaser: "Graficy kontra generatory obrazków — obie strony się mylą. Porównaj prompt bez wizji z promptem z architekturą." },
    "dlaczego-buduje-silniki.html": { title: "Dlaczego buduję silniki dla biznesu? O rzemiośle, monterce i systemach bez fuszerki", teaser: "Manifest Vantix. Co plac budowy nauczył mnie o porządku, precyzji i robocie zrobionej ze sztuką." },
    "jeden-model-vs-trzy-narzedzia.html": { title: "Dlaczego jeden model z twardym kontekstem bije na głowę 3 osobne narzędzia AI?", teaser: "Trzy subskrypcje, trzy karty w przeglądarce, zero wspólnej pamięci — i dlaczego efekt i tak jest mdły." },
    "jak-projektuje-swoj-lejek.html": { title: "Jak projektuję swój lejek", teaser: "Interaktywny rozkład — kliknij każdy etap i zobacz, co się dzieje i jakich narzędzi używam." },
    "ai-dla-jednej-osoby-przelom-2026.html": { title: "Korzystam z AI od GPT-3. Przełom dla jednej osoby przyszedł dopiero w 2026.", teaser: "Przełom nie w mądrzejszych odpowiedziach, tylko w tym, co może zrobić jedna osoba." },
    "co-montaz-nauczyl-mnie-o-sprzedazy.html": { title: "Co montaż klimatyzacji nauczył mnie o sprzedaży", teaser: "Pełne ręce roboty w jednym miesiącu, pusta kolejka w kolejnym — i dlaczego to nie problem tylko firm instalacyjnych." },
  },
  en: {
    "instalacja-a-nie-prowizorka.html": { title: "A good system is like building wiring. Bodge jobs always come back to bite you.", teaser: "Cables held up with masking tape work — until the first short circuit. Company systems are exactly the same." },
    "handlowiec-czy-excel.html": { title: "Are you paying your salesperson to click around a spreadsheet or to close deals?", teaser: "A simple three-question test and a calculator showing what manual data entry costs you every month." },
    "system-a-abonament-na-ai.html": { title: "A company system is not the same as an AI subscription", teaser: "Buying three people chat access is not an AI rollout. On the difference between a tool and infrastructure." },
    "human-in-the-loop.html": { title: "AI is fast, but people have judgement. Why I build Human-in-the-Loop.", teaser: "Approving a quote with your thumb, standing on a ladder. Tap the notification and see how it works." },
    "ai-nie-stworzy-marki.html": { title: "AI won't build your brand. The one with the vision wins.", teaser: "Designers versus image generators — both camps are wrong. Compare a prompt without vision to one with architecture." },
    "dlaczego-buduje-silniki.html": { title: "Why I build engines for businesses: craft, site work and systems without shortcuts", teaser: "The Vantix manifesto. What construction taught me about order, precision and doing the job properly." },
    "jeden-model-vs-trzy-narzedzia.html": { title: "Why one model with hard context beats three separate AI tools", teaser: "Three subscriptions, three browser tabs, no shared memory — and why the output is bland anyway." },
    "jak-projektuje-swoj-lejek.html": { title: "How I design my funnel", teaser: "An interactive breakdown — click each stage to see what happens and which tools I use." },
    "ai-dla-jednej-osoby-przelom-2026.html": { title: "I've used AI since GPT-3. For one person, the breakthrough only came in 2026.", teaser: "The shift wasn't smarter answers — it was what a single person can now ship alone." },
    "co-montaz-nauczyl-mnie-o-sprzedazy.html": { title: "What installing air conditioning taught me about sales", teaser: "Fully booked one month, empty pipeline the next — and why that isn't only an installer's problem." },
  },
  de: {
    "instalacja-a-nie-prowizorka.html": { title: "Ein gutes System ist wie eine Gebäudeinstallation. Pfusch rächt sich immer.", teaser: "Kabel an Malerkrepp funktionieren — bis zum ersten Kurzschluss. Mit Firmensystemen ist es genauso." },
    "handlowiec-czy-excel.html": { title: "Bezahlst du deinen Vertriebler fürs Klicken in Excel oder fürs Abschließen?", teaser: "Ein Test mit drei Fragen und ein Rechner, der zeigt, was manuelles Abtippen dich monatlich kostet." },
    "system-a-abonament-na-ai.html": { title: "Ein Firmensystem ist nicht dasselbe wie ein KI-Abo", teaser: "Drei Chat-Zugänge zu kaufen ist keine KI-Einführung. Über den Unterschied zwischen Werkzeug und Infrastruktur." },
    "human-in-the-loop.html": { title: "KI ist schnell, der Mensch hat Gespür. Warum ich auf Human-in-the-Loop setze.", teaser: "Ein Angebot per Daumen freigeben, während man auf der Leiter steht. Tippe die Benachrichtigung an." },
    "ai-nie-stworzy-marki.html": { title: "KI baut dir keine Marke. Es gewinnt, wer eine Vision hat.", teaser: "Grafiker gegen Bildgeneratoren — beide Lager irren. Vergleiche einen Prompt ohne Vision mit einem mit Architektur." },
    "dlaczego-buduje-silniki.html": { title: "Warum ich Motoren fürs Geschäft baue: Handwerk, Montage und Systeme ohne Pfusch", teaser: "Das Vantix-Manifest. Was die Baustelle mich über Ordnung, Präzision und saubere Arbeit gelehrt hat." },
    "jeden-model-vs-trzy-narzedzia.html": { title: "Warum ein Modell mit hartem Kontext drei einzelne KI-Tools schlägt", teaser: "Drei Abos, drei Browser-Tabs, kein gemeinsames Gedächtnis — und warum das Ergebnis trotzdem fad bleibt." },
    "jak-projektuje-swoj-lejek.html": { title: "Wie ich meinen Funnel entwerfe", teaser: "Eine interaktive Aufschlüsselung — klicke jede Stufe an und sieh, was passiert und welche Tools ich nutze." },
    "ai-dla-jednej-osoby-przelom-2026.html": { title: "Ich nutze KI seit GPT-3. Für eine Einzelperson kam der Durchbruch erst 2026.", teaser: "Der Sprung lag nicht in klügeren Antworten, sondern darin, was eine Person allein umsetzen kann." },
    "co-montaz-nauczyl-mnie-o-sprzedazy.html": { title: "Was mich die Klimamontage über Vertrieb gelehrt hat", teaser: "Einen Monat ausgebucht, im nächsten leere Pipeline — und warum das nicht nur Monteure betrifft." },
  },
};

export const BLOG_UI: Record<Locale, { eyebrow: string; title: string; lead: string; read: string; back: string; ctaText: string; ctaButton: string }> = {
  pl: {
    eyebrow: "Blog",
    title: "Notatki z drogi od montażysty do automatyzatora",
    lead: "O systemach sprzedaży, automatyzacji i robocie zrobionej zgodnie ze sztuką. Bez lania wody.",
    read: "Czytaj",
    back: "Wszystkie wpisy",
    ctaText: "Jeśli Twoja firma żyje dziś głównie z poleceń, sprawdź, ile Cię to realnie kosztuje — kilka pytań, konkretna analiza na końcu.",
    ctaButton: "Zrób bezpłatny audyt",
  },
  en: {
    eyebrow: "Blog",
    title: "Notes from installer to automation builder",
    lead: "On sales systems, automation and doing the job properly. No filler.",
    read: "Read",
    back: "All posts",
    ctaText: "If your company runs mostly on referrals, find out what that actually costs you — a few questions, a concrete analysis at the end.",
    ctaButton: "Take the free audit",
  },
  de: {
    eyebrow: "Blog",
    title: "Notizen vom Monteur zum Automatisierer",
    lead: "Über Vertriebssysteme, Automatisierung und saubere Arbeit. Ohne Füllmaterial.",
    read: "Lesen",
    back: "Alle Beiträge",
    ctaText: "Wenn dein Unternehmen vor allem von Empfehlungen lebt, finde heraus, was dich das wirklich kostet — ein paar Fragen, am Ende eine konkrete Analyse.",
    ctaButton: "Kostenloses Audit starten",
  },
};

/* ---------------- AUDYT ---------------- */

export type AudytDict = {
  metaTitle: string;
  nav: { back: string; next: string; submit: string; sending: string };
  hours: { value: string; label: string; note: string }[];
  contact: {
    name: string; firma: string; email: string; phone: string; phoneHint: string;
    hoursTitle: string; hoursNote: string;
    smsTitle: string; smsYes: string; smsNo: string; smsWarn: string;
    privacy: string;
  };
  live: string;
  liveNote: string;
  already: { title: string; body: string; again: string };
  done: {
    title: string; body: (n: string, f: string, e: string) => string;
    eyebrow: string; heading: string; lead: string;
    now: string; plus5: string; plus10: string;
    noteNow: string; note5: string; note10: string;
    disclaimer: string;
    priorityTitle: string; priorityBody: (t: string) => string;
    blogCta: string; homeCta: string;
  };
  error: (m: string) => string;
  steps: {
    id: string; eyebrow: string; question: string; hint?: string;
    options?: { value: string; label: string; note?: string }[];
    fields?: { id: string; label: string; suffix?: string }[];
  }[];
};

export const AUDYT: Record<Locale, AudytDict> = {
  pl: {
    metaTitle: "Bezpłatny audyt lejka sprzedaży — Vantix",
    nav: { back: "Wstecz", next: "Dalej", submit: "Wyślij i umów audyt", sending: "Wysyłam…" },
    hours: [
      { value: "rano", label: "Rano", note: "8:00–11:00" },
      { value: "poludnie", label: "Południe", note: "11:00–14:00" },
      { value: "popoludnie", label: "Popołudnie", note: "14:00–17:00" },
      { value: "wieczor", label: "Wieczorem", note: "po 17:00" },
      { value: "dowolnie", label: "Obojętnie", note: "dopasuję się" },
    ],
    contact: {
      name: "Imię", firma: "Firma *", email: "E-mail *", phone: "Telefon", phoneHint: "opcjonalnie",
      hoursTitle: "Kiedy najlepiej dzwonić?",
      hoursNote: "Zaznacz, co Ci pasuje — nie zadzwonię poza tymi godzinami.",
      smsTitle: "Wysłać SMS-em przypomnienie o umówionym terminie?",
      smsYes: "Tak, chętnie", smsNo: "Nie, tylko mail",
      smsWarn: "Podaj numer telefonu wyżej, inaczej nie mam gdzie wysłać SMS-a.",
      privacy: "Dane trafiają wyłącznie do mnie i służą do przygotowania analizy oraz kontaktu. Nie dopisuję nikogo do newslettera i nie przekazuję danych dalej.",
    },
    live: "Na żywo",
    liveNote: "Tyle mniej więcej robi dziś Twój lejek. Pełne wyliczenie zobaczysz w analizie.",
    already: {
      title: "Ten audyt jest już u mnie.",
      body: "Widzę, że wypełniałeś go z tego urządzenia. Nie musisz robić tego drugi raz — odezwę się w umówionych godzinach.",
      again: "Wypełnij jeszcze raz dla innej firmy",
    },
    done: {
      title: "Mam wszystko.",
      body: (n, f, e) => `Dzięki${n ? `, ${n}` : ""} — pełną analizę dla firmy ${f} przygotuję osobiście i odezwę się na ${e}.`,
      eyebrow: "Twoja wstępna analiza",
      heading: "To widzę już teraz — bez czekania na rozmowę.",
      lead: "Poniżej konkrety wyliczone z Twoich odpowiedzi. Zabierz je ze sobą nawet jeśli nigdy nie zaczniemy współpracy.",
      now: "Dziś", plus5: "+5 pkt skuteczności", plus10: "+10 pkt skuteczności",
      noteNow: "z Twoich liczb", note5: "realne w kilka tygodni", note10: "cel na kwartał",
      disclaimer: "Ten sam ruch, ten sam zespół — różnica bierze się wyłącznie z procesu. Liczby są poglądowe i opierają się na tym, co sam podałeś.",
      priorityTitle: "Od czego zacząć",
      priorityBody: (t) => `Gdybyś miał zmienić dziś jedną rzecz, zacznij od tego: ${t.toLowerCase()}. To zwykle najszybszy zwrot przy najmniejszym nakładzie — i nie wymaga zwiększania budżetu na reklamę.`,
      blogCta: "Poczytaj blog w międzyczasie", homeCta: "Wróć na stronę",
    },
    error: (m) => `Nie udało się wysłać (${m}). Spróbuj jeszcze raz albo napisz wprost:`,
    steps: [
      { id: "branza", eyebrow: "Twoja firma", question: "Czym się zajmujesz?", hint: "Dopasowuję dalsze pytania do Twojej branży.", options: [
        { value: "instalacje", label: "Instalacje / montaż", note: "klima, hydraulika, elektryka, fotowoltaika" },
        { value: "budowlanka", label: "Budowlanka / wykończenia" },
        { value: "uslugi-prof", label: "Usługi profesjonalne", note: "kancelaria, biuro rachunkowe, doradztwo" },
        { value: "it", label: "IT / software / agencja" },
        { value: "ecom", label: "E-commerce / handel" },
        { value: "inne", label: "Coś innego" },
      ] },
      { id: "wielkosc", eyebrow: "Skala", question: "Ile osób pracuje w firmie?", options: [
        { value: "1", label: "Tylko ja" }, { value: "2-5", label: "2–5 osób" }, { value: "6-15", label: "6–15 osób" },
        { value: "16-50", label: "16–50 osób" }, { value: "50+", label: "Powyżej 50" },
      ] },
      { id: "sprzedaz", eyebrow: "Skala", question: "Kto u Was sprzedaje?", options: [
        { value: "wlasciciel", label: "Ja sam", note: "sprzedaż między jedną robotą a drugą" },
        { value: "1-handlowiec", label: "Jeden handlowiec" },
        { value: "zespol", label: "Zespół handlowy" },
        { value: "nikt", label: "Nikt konkretnie", note: "klienci przychodzą sami" },
      ] },
      { id: "kanaly", eyebrow: "Pozyskiwanie", question: "Skąd dziś przychodzą klienci?", hint: "Zaznacz wszystko, co realnie działa.", options: [
        { value: "polecenia", label: "Polecenia" }, { value: "google", label: "Google / SEO" }, { value: "ads", label: "Reklamy płatne" },
        { value: "social", label: "Social media" }, { value: "cold", label: "Cold outreach / telefon" },
        { value: "targi", label: "Targi, lokalnie, offline" }, { value: "marketplace", label: "Portale branżowe" },
      ] },
      { id: "narzedzia", eyebrow: "Co już masz", question: "Co z tego jest u Was wdrożone?", hint: "Szczerze — brak czegoś nie jest wstydem, to punkt wyjścia.", options: [
        { value: "strona", label: "Strona www" }, { value: "crm", label: "CRM" }, { value: "followup", label: "Automatyczny follow-up" },
        { value: "kalendarz", label: "Kalendarz do umawiania" }, { value: "oferty", label: "Szablony ofert" },
        { value: "analityka", label: "Analityka / koszt leada" }, { value: "nic", label: "Praktycznie nic z powyższych" },
      ] },
      { id: "liczby", eyebrow: "Liczby", question: "Kilka liczb — szacunkowo, na oko.", hint: "Nie muszą być co do złotówki. Chodzi o rząd wielkości.", fields: [
        { id: "zapytania", label: "Zapytań miesięcznie" }, { id: "closeRate", label: "Ile % kończy się zleceniem", suffix: "%" },
        { id: "wartosc", label: "Średnia wartość zlecenia", suffix: "zł" },
      ] },
      { id: "reakcja", eyebrow: "Proces", question: "Po jakim czasie odzywacie się do nowego zapytania?", hint: "To zwykle najdroższy punkt całego lejka.", options: [
        { value: "minuty", label: "W kilka minut" }, { value: "godziny", label: "Tego samego dnia" },
        { value: "dzien", label: "Następnego dnia" }, { value: "dluzej", label: "Bywa, że dłużej" },
        { value: "nie-wiem", label: "Nie mierzymy tego" },
      ] },
      { id: "followup", eyebrow: "Proces", question: "Co się dzieje, gdy klient nie odpowie na ofertę?", options: [
        { value: "sekwencja", label: "Leci zaplanowana sekwencja przypomnień" },
        { value: "recznie", label: "Ktoś odzywa się ręcznie, jak pamięta" },
        { value: "nic", label: "Nic — czekamy, aż sam wróci" },
      ] },
      { id: "problemy", eyebrow: "Problem", question: "Co Cię najbardziej uwiera?", hint: "Zaznacz te najważniejsze.", options: [
        { value: "za-malo", label: "Za mało zapytań" }, { value: "slabe", label: "Zapytania słabej jakości" },
        { value: "nie-domykam", label: "Zapytania są, ale nie domykam" }, { value: "chaos", label: "Chaos — leady giną" },
        { value: "sezon", label: "Skoki: raz zalew, raz pustka" }, { value: "czas", label: "Brak czasu na sprzedaż" },
        { value: "koszt", label: "Reklamy przepalają budżet" },
      ] },
      { id: "gotowosc", eyebrow: "Następny krok", question: "Kiedy chciałbyś to ruszyć?", options: [
        { value: "teraz", label: "Od razu" }, { value: "miesiac", label: "W ciągu miesiąca" },
        { value: "kwartal", label: "W tym kwartale" }, { value: "rozgladam", label: "Na razie się rozglądam" },
      ] },
      { id: "kontakt", eyebrow: "Ostatni krok", question: "Gdzie mam wysłać analizę?", hint: "Odezwę się osobiście — nie trafisz na żadną listę mailingową." },
    ],
  },

  en: {
    metaTitle: "Free sales funnel audit — Vantix",
    nav: { back: "Back", next: "Next", submit: "Send and book the audit", sending: "Sending…" },
    hours: [
      { value: "rano", label: "Morning", note: "8–11 am" },
      { value: "poludnie", label: "Midday", note: "11 am–2 pm" },
      { value: "popoludnie", label: "Afternoon", note: "2–5 pm" },
      { value: "wieczor", label: "Evening", note: "after 5 pm" },
      { value: "dowolnie", label: "Any time", note: "I'll fit around you" },
    ],
    contact: {
      name: "First name", firma: "Company *", email: "Email *", phone: "Phone", phoneHint: "optional",
      hoursTitle: "When is the best time to call?",
      hoursNote: "Pick what suits you — I won't call outside those hours.",
      smsTitle: "Send an SMS reminder before the call?",
      smsYes: "Yes, please", smsNo: "No, email only",
      smsWarn: "Add a phone number above, otherwise there's nowhere to send the SMS.",
      privacy: "Your data comes only to me and is used to prepare the analysis and get in touch. No newsletter, nothing passed on.",
    },
    live: "Live",
    liveNote: "That's roughly what your funnel produces today. The full breakdown comes with the analysis.",
    already: {
      title: "I already have this audit.",
      body: "It looks like you filled it in from this device. No need to do it twice — I'll be in touch within the hours you picked.",
      again: "Fill it in again for a different company",
    },
    done: {
      title: "Got everything.",
      body: (n, f, e) => `Thanks${n ? `, ${n}` : ""} — I'll prepare the full analysis for ${f} personally and get back to you at ${e}.`,
      eyebrow: "Your preliminary analysis",
      heading: "Here's what I can already see — no need to wait for the call.",
      lead: "Specifics calculated from your answers. Take them with you even if we never work together.",
      now: "Today", plus5: "+5 pts close rate", plus10: "+10 pts close rate",
      noteNow: "from your numbers", note5: "realistic in weeks", note10: "a quarterly target",
      disclaimer: "Same traffic, same team — the difference comes purely from process. These figures are indicative and based on what you entered.",
      priorityTitle: "Where to start",
      priorityBody: (t) => `If you changed one thing today, start here: ${t.toLowerCase()}. It usually pays back fastest for the least effort — and needs no extra ad budget.`,
      blogCta: "Read the blog meanwhile", homeCta: "Back to the site",
    },
    error: (m) => `Couldn't send it (${m}). Try again or email me directly:`,
    steps: [
      { id: "branza", eyebrow: "Your company", question: "What do you do?", hint: "I tailor the next questions to your industry.", options: [
        { value: "instalacje", label: "Installation / fit-out", note: "HVAC, plumbing, electrical, solar" },
        { value: "budowlanka", label: "Construction / finishing" },
        { value: "uslugi-prof", label: "Professional services", note: "law, accounting, consulting" },
        { value: "it", label: "IT / software / agency" },
        { value: "ecom", label: "E-commerce / retail" },
        { value: "inne", label: "Something else" },
      ] },
      { id: "wielkosc", eyebrow: "Scale", question: "How many people work at the company?", options: [
        { value: "1", label: "Just me" }, { value: "2-5", label: "2–5 people" }, { value: "6-15", label: "6–15 people" },
        { value: "16-50", label: "16–50 people" }, { value: "50+", label: "More than 50" },
      ] },
      { id: "sprzedaz", eyebrow: "Scale", question: "Who does the selling?", options: [
        { value: "wlasciciel", label: "I do", note: "selling between jobs" },
        { value: "1-handlowiec", label: "One salesperson" },
        { value: "zespol", label: "A sales team" },
        { value: "nikt", label: "Nobody specifically", note: "clients just show up" },
      ] },
      { id: "kanaly", eyebrow: "Acquisition", question: "Where do clients come from today?", hint: "Tick everything that genuinely works.", options: [
        { value: "polecenia", label: "Referrals" }, { value: "google", label: "Google / SEO" }, { value: "ads", label: "Paid ads" },
        { value: "social", label: "Social media" }, { value: "cold", label: "Cold outreach / phone" },
        { value: "targi", label: "Trade shows, local, offline" }, { value: "marketplace", label: "Industry portals" },
      ] },
      { id: "narzedzia", eyebrow: "What you have", question: "Which of these are in place?", hint: "Be honest — a gap isn't embarrassing, it's a starting point.", options: [
        { value: "strona", label: "A website" }, { value: "crm", label: "A CRM" }, { value: "followup", label: "Automated follow-up" },
        { value: "kalendarz", label: "Booking calendar" }, { value: "oferty", label: "Quote templates" },
        { value: "analityka", label: "Analytics / cost per lead" }, { value: "nic", label: "Practically none of these" },
      ] },
      { id: "liczby", eyebrow: "Numbers", question: "A few numbers — rough estimates are fine.", hint: "They don't need to be exact. Order of magnitude is enough.", fields: [
        { id: "zapytania", label: "Inquiries per month" }, { id: "closeRate", label: "% that turn into jobs", suffix: "%" },
        { id: "wartosc", label: "Average job value", suffix: "PLN" },
      ] },
      { id: "reakcja", eyebrow: "Process", question: "How fast do you reply to a new inquiry?", hint: "Usually the most expensive point in the whole funnel.", options: [
        { value: "minuty", label: "Within minutes" }, { value: "godziny", label: "Same day" },
        { value: "dzien", label: "Next day" }, { value: "dluzej", label: "Sometimes longer" },
        { value: "nie-wiem", label: "We don't measure it" },
      ] },
      { id: "followup", eyebrow: "Process", question: "What happens when a client doesn't reply to a quote?", options: [
        { value: "sekwencja", label: "A planned reminder sequence runs" },
        { value: "recznie", label: "Someone follows up manually, if they remember" },
        { value: "nic", label: "Nothing — we wait for them to come back" },
      ] },
      { id: "problemy", eyebrow: "Problem", question: "What bothers you most?", hint: "Pick the ones that matter most.", options: [
        { value: "za-malo", label: "Too few inquiries" }, { value: "slabe", label: "Poor quality inquiries" },
        { value: "nie-domykam", label: "Inquiries come, but don't close" }, { value: "chaos", label: "Chaos — leads get lost" },
        { value: "sezon", label: "Feast and famine cycles" }, { value: "czas", label: "No time for selling" },
        { value: "koszt", label: "Ads burn the budget" },
      ] },
      { id: "gotowosc", eyebrow: "Next step", question: "When would you want to start?", options: [
        { value: "teraz", label: "Right away" }, { value: "miesiac", label: "Within a month" },
        { value: "kwartal", label: "This quarter" }, { value: "rozgladam", label: "Just looking for now" },
      ] },
      { id: "kontakt", eyebrow: "Last step", question: "Where should I send the analysis?", hint: "I'll get in touch personally — you won't end up on any mailing list." },
    ],
  },

  de: {
    metaTitle: "Kostenloses Funnel-Audit — Vantix",
    nav: { back: "Zurück", next: "Weiter", submit: "Senden und Audit buchen", sending: "Wird gesendet…" },
    hours: [
      { value: "rano", label: "Morgens", note: "8–11 Uhr" },
      { value: "poludnie", label: "Mittags", note: "11–14 Uhr" },
      { value: "popoludnie", label: "Nachmittags", note: "14–17 Uhr" },
      { value: "wieczor", label: "Abends", note: "ab 17 Uhr" },
      { value: "dowolnie", label: "Egal", note: "ich richte mich nach dir" },
    ],
    contact: {
      name: "Vorname", firma: "Firma *", email: "E-Mail *", phone: "Telefon", phoneHint: "optional",
      hoursTitle: "Wann darf ich anrufen?",
      hoursNote: "Wähle, was dir passt — außerhalb dieser Zeiten rufe ich nicht an.",
      smsTitle: "SMS-Erinnerung vor dem Termin senden?",
      smsYes: "Ja, gerne", smsNo: "Nein, nur E-Mail",
      smsWarn: "Trag oben eine Telefonnummer ein, sonst kann ich keine SMS senden.",
      privacy: "Die Daten kommen ausschließlich zu mir und dienen der Analyse und Kontaktaufnahme. Kein Newsletter, keine Weitergabe.",
    },
    live: "Live",
    liveNote: "So viel bringt dein Funnel heute ungefähr. Die vollständige Rechnung kommt mit der Analyse.",
    already: {
      title: "Dieses Audit liegt mir bereits vor.",
      body: "Es sieht so aus, als hättest du es von diesem Gerät ausgefüllt. Kein zweites Mal nötig — ich melde mich in den gewählten Zeiten.",
      again: "Für eine andere Firma erneut ausfüllen",
    },
    done: {
      title: "Ich habe alles.",
      body: (n, f, e) => `Danke${n ? `, ${n}` : ""} — die vollständige Analyse für ${f} erstelle ich persönlich und melde mich unter ${e}.`,
      eyebrow: "Deine erste Analyse",
      heading: "Das sehe ich jetzt schon — ohne auf das Gespräch zu warten.",
      lead: "Konkretes, berechnet aus deinen Antworten. Nimm es mit, auch wenn wir nie zusammenarbeiten.",
      now: "Heute", plus5: "+5 Punkte Abschlussquote", plus10: "+10 Punkte Abschlussquote",
      noteNow: "aus deinen Zahlen", note5: "in Wochen realistisch", note10: "Quartalsziel",
      disclaimer: "Gleicher Traffic, gleiches Team — der Unterschied kommt allein aus dem Prozess. Die Zahlen sind Richtwerte auf Basis deiner Angaben.",
      priorityTitle: "Womit anfangen",
      priorityBody: (t) => `Wenn du heute eine Sache änderst, dann diese: ${t.toLowerCase()}. Das rechnet sich meist am schnellsten bei geringstem Aufwand — und braucht kein zusätzliches Werbebudget.`,
      blogCta: "Lies solange den Blog", homeCta: "Zurück zur Seite",
    },
    error: (m) => `Senden fehlgeschlagen (${m}). Versuch es nochmal oder schreib mir direkt:`,
    steps: [
      { id: "branza", eyebrow: "Dein Unternehmen", question: "Was macht ihr?", hint: "Die weiteren Fragen passe ich an deine Branche an.", options: [
        { value: "instalacje", label: "Installation / Montage", note: "Klima, Sanitär, Elektro, Photovoltaik" },
        { value: "budowlanka", label: "Bau / Ausbau" },
        { value: "uslugi-prof", label: "Professionelle Dienstleistungen", note: "Kanzlei, Steuerbüro, Beratung" },
        { value: "it", label: "IT / Software / Agentur" },
        { value: "ecom", label: "E-Commerce / Handel" },
        { value: "inne", label: "Etwas anderes" },
      ] },
      { id: "wielkosc", eyebrow: "Größe", question: "Wie viele Personen arbeiten im Unternehmen?", options: [
        { value: "1", label: "Nur ich" }, { value: "2-5", label: "2–5 Personen" }, { value: "6-15", label: "6–15 Personen" },
        { value: "16-50", label: "16–50 Personen" }, { value: "50+", label: "Mehr als 50" },
      ] },
      { id: "sprzedaz", eyebrow: "Größe", question: "Wer verkauft bei euch?", options: [
        { value: "wlasciciel", label: "Ich selbst", note: "Vertrieb zwischen zwei Aufträgen" },
        { value: "1-handlowiec", label: "Ein Vertriebler" },
        { value: "zespol", label: "Ein Vertriebsteam" },
        { value: "nikt", label: "Niemand konkret", note: "Kunden kommen von selbst" },
      ] },
      { id: "kanaly", eyebrow: "Akquise", question: "Woher kommen heute die Kunden?", hint: "Alles ankreuzen, was wirklich funktioniert.", options: [
        { value: "polecenia", label: "Empfehlungen" }, { value: "google", label: "Google / SEO" }, { value: "ads", label: "Bezahlte Werbung" },
        { value: "social", label: "Social Media" }, { value: "cold", label: "Kaltakquise / Telefon" },
        { value: "targi", label: "Messen, lokal, offline" }, { value: "marketplace", label: "Branchenportale" },
      ] },
      { id: "narzedzia", eyebrow: "Was vorhanden ist", question: "Was davon habt ihr im Einsatz?", hint: "Ehrlich — eine Lücke ist nicht peinlich, sondern ein Startpunkt.", options: [
        { value: "strona", label: "Website" }, { value: "crm", label: "CRM" }, { value: "followup", label: "Automatisches Follow-up" },
        { value: "kalendarz", label: "Terminkalender" }, { value: "oferty", label: "Angebotsvorlagen" },
        { value: "analityka", label: "Analytics / Kosten pro Lead" }, { value: "nic", label: "Praktisch nichts davon" },
      ] },
      { id: "liczby", eyebrow: "Zahlen", question: "Ein paar Zahlen — Schätzungen genügen.", hint: "Sie müssen nicht exakt sein. Die Größenordnung reicht.", fields: [
        { id: "zapytania", label: "Anfragen pro Monat" }, { id: "closeRate", label: "% die zum Auftrag werden", suffix: "%" },
        { id: "wartosc", label: "Durchschnittlicher Auftragswert", suffix: "PLN" },
      ] },
      { id: "reakcja", eyebrow: "Prozess", question: "Wie schnell antwortet ihr auf eine neue Anfrage?", hint: "Meist der teuerste Punkt im ganzen Funnel.", options: [
        { value: "minuty", label: "Innerhalb von Minuten" }, { value: "godziny", label: "Am selben Tag" },
        { value: "dzien", label: "Am nächsten Tag" }, { value: "dluzej", label: "Manchmal später" },
        { value: "nie-wiem", label: "Wir messen das nicht" },
      ] },
      { id: "followup", eyebrow: "Prozess", question: "Was passiert, wenn ein Kunde nicht auf das Angebot antwortet?", options: [
        { value: "sekwencja", label: "Eine geplante Erinnerungssequenz läuft" },
        { value: "recznie", label: "Jemand hakt manuell nach, wenn er daran denkt" },
        { value: "nic", label: "Nichts — wir warten, bis er sich meldet" },
      ] },
      { id: "problemy", eyebrow: "Problem", question: "Was stört dich am meisten?", hint: "Wähle die wichtigsten aus.", options: [
        { value: "za-malo", label: "Zu wenige Anfragen" }, { value: "slabe", label: "Anfragen schlechter Qualität" },
        { value: "nie-domykam", label: "Anfragen kommen, schließen aber nicht ab" }, { value: "chaos", label: "Chaos — Leads gehen verloren" },
        { value: "sezon", label: "Mal Flut, mal Flaute" }, { value: "czas", label: "Keine Zeit für Vertrieb" },
        { value: "koszt", label: "Werbung verbrennt Budget" },
      ] },
      { id: "gotowosc", eyebrow: "Nächster Schritt", question: "Wann möchtest du starten?", options: [
        { value: "teraz", label: "Sofort" }, { value: "miesiac", label: "Innerhalb eines Monats" },
        { value: "kwartal", label: "In diesem Quartal" }, { value: "rozgladam", label: "Ich schaue mich erst um" },
      ] },
      { id: "kontakt", eyebrow: "Letzter Schritt", question: "Wohin soll ich die Analyse schicken?", hint: "Ich melde mich persönlich — du landest auf keiner Mailingliste." },
    ],
  },
};
