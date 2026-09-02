import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { VantixLogo, VantixMark } from "@/components/VantixLogo";
import { ThemeToggle } from "@/components/PrefsControls";

type Props = {
  title: string;
  eyebrow: string;
  date: string;
  children: ReactNode;
};

export function BlogLayout({ title, eyebrow, date, children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 hidden h-[420px] w-[420px] opacity-[0.05] lg:block"
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
        <a
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-accent-brand"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Wszystkie wpisy
        </a>
        <span className="mt-6 block text-xs font-medium uppercase tracking-widest text-accent-brand">
          {eyebrow}
        </span>
        <h1 className="mt-3 text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{date}</p>
        <article className="prose-vantix mt-8 space-y-5 text-base leading-relaxed text-foreground sm:text-lg">
          {children}
        </article>
        <div className="mt-12 rounded-2xl border border-accent-brand/40 bg-accent-brand/5 p-6 sm:p-8">
          <p className="text-sm font-semibold text-foreground sm:text-base">
            Jeśli Twoja firma żyje dziś głównie z poleceń, sprawdź w 30 sekund, ile Cię to
            realnie kosztuje.
          </p>
          <a
            href="/kalkulator.html"
            className="vx-btn-accent mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-accent-brand px-5 py-2.5 text-sm font-medium text-accent-brand-foreground"
          >
            Otwórz kalkulator <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </main>
    </div>
  );
}
