import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { VantixLogo, VantixMark } from "@/components/VantixLogo";
import { ThemeToggle } from "@/components/PrefsControls";
import { mount } from "@/lib/mount";

export const POSTS = [
  {
    slug: "instalacja-a-nie-prowizorka.html",
    title: "Dobry system jest jak instalacja w budynku. Prowizorka zawsze się mści.",
    teaser:
      "Kable na taśmie malarskiej działają — do pierwszego spięcia. Z systemami w firmie jest dokładnie tak samo.",
    date: "Wrzesień 2026",
    tag: "Rzemiosło",
  },
  {
    slug: "handlowiec-czy-excel.html",
    title: "Płacisz handlowcowi za klikanie w Excela czy za zamykanie deali?",
    teaser:
      "Prosty test na trzy pytania i kalkulator, który pokazuje, ile miesięcznie kosztuje Cię ręczne przeklepywanie danych.",
    date: "Wrzesień 2026",
    tag: "Kalkulator",
  },
  {
    slug: "system-a-abonament-na-ai.html",
    title: "System firmowy to nie to samo co abonament na AI",
    teaser:
      "Kupienie trzem osobom dostępu do czatu to nie wdrożenie AI. O różnicy między narzędziem a infrastrukturą — i o tym, gdzie lądują Twoje dane.",
    date: "Wrzesień 2026",
    tag: "Interaktywne",
  },
  {
    slug: "human-in-the-loop.html",
    title: "AI jest szybkie, ale człowiek ma wyczucie. Dlaczego stawiam na Human-in-the-Loop?",
    teaser:
      "Decyzja o wysłaniu oferty podjęta kciukiem, stojąc na drabinie. Kliknij powiadomienie i zobacz, jak to działa.",
    date: "Wrzesień 2026",
    tag: "Interaktywne",
  },
  {
    slug: "ai-nie-stworzy-marki.html",
    title: "AI nie stworzy Ci marki. Wygrywa ten, kto ma wizję.",
    teaser:
      "Graficy kontra generatory obrazków — obie strony się mylą. Porównaj prompt bez wizji z promptem, który ma architekturę.",
    date: "Wrzesień 2026",
    tag: "Interaktywne",
  },
  {
    slug: "dlaczego-buduje-silniki.html",
    title: "Dlaczego buduję silniki dla biznesu? O rzemiośle, monterce i systemach bez fuszerki",
    teaser:
      "Manifest Vantix. Co plac budowy nauczył mnie o porządku, precyzji i robocie zrobionej ze sztuką.",
    date: "Wrzesień 2026",
    tag: "Manifest",
  },
  {
    slug: "jeden-model-vs-trzy-narzedzia.html",
    title: "Dlaczego jeden model z twardym kontekstem bije na głowę 3 osobne narzędzia AI?",
    teaser:
      "Trzy subskrypcje, trzy karty w przeglądarce, zero wspólnej pamięci — i dlaczego efekt i tak jest mdły.",
    date: "Wrzesień 2026",
    tag: "Narzędzia",
  },
  {
    slug: "jak-projektuje-swoj-lejek.html",
    title: "Jak projektuję swój lejek",
    teaser:
      "Interaktywny rozkład — kliknij każdy etap i zobacz, co się dzieje, jakich narzędzi używam i dlaczego w tej kolejności.",
    date: "Sierpień 2026",
    tag: "Interaktywne",
  },
  {
    slug: "ai-dla-jednej-osoby-przelom-2026.html",
    title: "Korzystam z AI od GPT-3. Przełom dla jednej osoby przyszedł dopiero w 2026.",
    teaser:
      "Testowałem GPT, zanim to była codzienność. Ale przełom — nie w mądrzejszych odpowiedziach, tylko w tym, co może zrobić jedna osoba — nastąpił dopiero teraz.",
    date: "Sierpień 2026",
    tag: "AI",
  },
  {
    slug: "co-montaz-nauczyl-mnie-o-sprzedazy.html",
    title: "Co montaż klimatyzacji nauczył mnie o sprzedaży",
    teaser:
      "Pełne ręce roboty w jednym miesiącu, pusta kolejka w kolejnym — i dlaczego to nie jest problem tylko firm instalacyjnych.",
    date: "Sierpień 2026",
    tag: "Sprzedaż",
  },
];

function PostCard({ post, index }: { post: (typeof POSTS)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <a
      ref={ref}
      href={`/blog/${post.slug}`}
      onMouseMove={onMove}
      style={{ transitionDelay: `${Math.min(index * 60, 300)}ms` }}
      className={`vx-post group block rounded-2xl border border-border bg-card p-5 shadow-sm transition-[opacity,transform] duration-700 ease-out sm:p-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <div className="relative flex items-center justify-between gap-3">
        <span className="vx-post-index font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex items-center gap-2">
          <span className="rounded-md border border-accent-brand/25 bg-accent-brand/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-brand">
            {post.tag}
          </span>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </span>
      </div>
      <h2 className="relative mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
        {post.title}
      </h2>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{post.teaser}</p>
      <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-brand">
        Czytaj
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  );
}

function BlogIndex() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 vx-blueprint-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 hidden h-[460px] w-[460px] opacity-[0.06] lg:block"
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

      <main className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
          Blog
        </span>
        <h1 className="mt-3 text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight text-foreground">
          Notatki z drogi od montażysty do automatyzatora
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          O systemach sprzedaży, automatyzacji i robocie zrobionej zgodnie ze sztuką. Bez lania
          wody.
        </p>

        <div className="mt-8 space-y-4">
          {POSTS.map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}

mount(<BlogIndex />);
