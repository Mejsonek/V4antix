import { ArrowRight } from "lucide-react";
import { VantixLogo } from "@/components/VantixLogo";
import { ThemeToggle } from "@/components/PrefsControls";
import { mount } from "@/lib/mount";

export const POSTS = [
  {
    slug: "instalacja-a-nie-prowizorka.html",
    title: "Dobry system jest jak instalacja w budynku. Prowizorka zawsze się mści.",
    teaser:
      "Kable na taśmie malarskiej działają — do pierwszego spięcia. Z systemami w firmie jest dokładnie tak samo.",
    date: "Wrzesień 2026",
  },
  {
    slug: "handlowiec-czy-excel.html",
    title: "Płacisz handlowcowi za klikanie w Excela czy za zamykanie deali?",
    teaser:
      "Prosty test na trzy pytania i kalkulator, który pokazuje, ile miesięcznie kosztuje Cię ręczne przeklepywanie danych.",
    date: "Wrzesień 2026",
  },
  {
    slug: "system-a-abonament-na-ai.html",
    title: "System firmowy to nie to samo co abonament na AI",
    teaser:
      "Kupienie trzem osobom dostępu do czatu to nie wdrożenie AI. O różnicy między narzędziem a infrastrukturą — i o tym, gdzie lądują Twoje dane.",
    date: "Wrzesień 2026",
  },
  {
    slug: "human-in-the-loop.html",
    title: "AI jest szybkie, ale człowiek ma wyczucie. Dlaczego stawiam na Human-in-the-Loop?",
    teaser:
      "Decyzja o wysłaniu oferty podjęta kciukiem, stojąc na drabinie. Kliknij powiadomienie i zobacz, jak to działa.",
    date: "Wrzesień 2026",
  },
  {
    slug: "ai-nie-stworzy-marki.html",
    title: "AI nie stworzy Ci marki. Wygrywa ten, kto ma wizję.",
    teaser:
      "Graficy kontra generatory obrazków — obie strony się mylą. Porównaj prompt bez wizji z promptem, który ma architekturę.",
    date: "Wrzesień 2026",
  },
  {
    slug: "dlaczego-buduje-silniki.html",
    title: "Dlaczego buduję silniki dla biznesu? O rzemiośle, monterce i systemach bez fuszerki",
    teaser:
      "Manifest Vantix. Co plac budowy nauczył mnie o porządku, precyzji i robocie zrobionej ze sztuką.",
    date: "Wrzesień 2026",
  },
  {
    slug: "jeden-model-vs-trzy-narzedzia.html",
    title: "Dlaczego jeden model z twardym kontekstem bije na głowę 3 osobne narzędzia AI?",
    teaser:
      "Trzy subskrypcje, trzy karty w przeglądarce, zero wspólnej pamięci — i dlaczego efekt i tak jest mdły.",
    date: "Wrzesień 2026",
  },
  {
    slug: "jak-projektuje-swoj-lejek.html",
    title: "Jak projektuję swój lejek",
    teaser:
      "Interaktywny rozkład — kliknij każdy etap i zobacz, co się dzieje, jakich narzędzi używam i dlaczego w tej kolejności.",
    date: "Sierpień 2026",
  },
  {
    slug: "ai-dla-jednej-osoby-przelom-2026.html",
    title: "Korzystam z AI od GPT-3. Przełom dla jednej osoby przyszedł dopiero w 2026.",
    teaser:
      "Testowałem GPT, zanim to była codzienność. Ale przełom — nie w mądrzejszych odpowiedziach, tylko w tym, co może zrobić jedna osoba — nastąpił dopiero teraz.",
    date: "Sierpień 2026",
  },
  {
    slug: "co-montaz-nauczyl-mnie-o-sprzedazy.html",
    title: "Co montaż klimatyzacji nauczył mnie o sprzedaży",
    teaser:
      "Pełne ręce roboty w jednym miesiącu, pusta kolejka w kolejnym — i dlaczego to nie jest problem tylko firm instalacyjnych.",
    date: "Sierpień 2026",
  },
];

function BlogIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/">
            <VantixLogo />
          </a>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
          Blog
        </span>
        <h1 className="mt-3 text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight text-foreground">
          Notatki z drogi od montażysty do automatyzatora
        </h1>
        <div className="mt-8 space-y-4">
          {POSTS.map((p) => (
            <a
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="vx-card block rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <div className="text-xs text-muted-foreground">{p.date}</div>
              <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.teaser}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-brand">
                Czytaj <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

mount(<BlogIndex />);
