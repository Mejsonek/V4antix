const THOUGHTS = [
  { tag: "Rzemiosło", title: "Dobry system jest jak instalacja w budynku", teaser: "Kable na taśmie malarskiej działają — do pierwszego spięcia.", slug: "instalacja-a-nie-prowizorka.html" },
  { tag: "Koszty", title: "Płacisz handlowcowi za klikanie w Excela?", teaser: "Płacisz pełną stawkę za robotę, którą robi skrypt.", slug: "handlowiec-czy-excel.html" },
  { tag: "AI", title: "System firmowy to nie abonament na AI", teaser: "AI to silnik. Bez podwozia nic nie napędza.", slug: "system-a-abonament-na-ai.html" },
  { tag: "Proces", title: "AI jest szybkie, człowiek ma wyczucie", teaser: "Decyzja o ofercie podjęta kciukiem, na drabinie.", slug: "human-in-the-loop.html" },
  { tag: "Wizja", title: "AI nie stworzy Ci marki", teaser: "Bez twardych ram model idzie w stronę średniej.", slug: "ai-nie-stworzy-marki.html" },
  { tag: "Manifest", title: "Dlaczego buduję silniki dla biznesu", teaser: "Albo robisz zgodnie ze sztuką, albo wcale.", slug: "dlaczego-buduje-silniki.html" },
  { tag: "Narzędzia", title: "Jeden model bije trzy narzędzia AI", teaser: "Trzy subskrypcje, zero wspólnej pamięci.", slug: "jeden-model-vs-trzy-narzedzia.html" },
  { tag: "Lejek", title: "Jak projektuję swój lejek", teaser: "Cztery kanały, jeden CRM, jeden automat.", slug: "jak-projektuje-swoj-lejek.html" },
  { tag: "Sprzedaż", title: "Co montaż nauczył mnie o sprzedaży", teaser: "Pełne ręce roboty, a miesiąc później cisza.", slug: "co-montaz-nauczyl-mnie-o-sprzedazy.html" },
];

function Card({ t }: { t: (typeof THOUGHTS)[number] }) {
  return (
    <a
      href={`/blog/${t.slug}`}
      className="vx-post group block w-[260px] flex-shrink-0 rounded-xl border border-border bg-card p-4 sm:w-[300px] sm:p-5"
    >
      <span className="inline-block rounded-md border border-accent-brand/25 bg-accent-brand/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-brand">
        {t.tag}
      </span>
      <h3 className="relative mt-3 text-sm font-semibold leading-snug tracking-tight text-foreground sm:text-base">
        {t.title}
      </h3>
      <p className="relative mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {t.teaser}
      </p>
    </a>
  );
}

export function ThoughtsMarquee() {
  return (
    <div className="vx-marquee relative mt-10 sm:mt-12">
      <div className="vx-marquee-track flex gap-4">
        {[...THOUGHTS, ...THOUGHTS].map((t, i) => (
          <Card key={`${t.slug}-${i}`} t={t} />
        ))}
      </div>
      <div className="mt-6 px-1">
        <a
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-brand transition hover:gap-2.5"
        >
          Wszystkie notatki →
        </a>
      </div>
    </div>
  );
}
