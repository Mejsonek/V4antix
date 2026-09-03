import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Calculator as CalcIcon,
  Zap,
  Target,
  Cog,
  TrendingUp,
  Paintbrush,
  UserMinus,
  BotOff,
  Search,
  ClipboardList,
  Rocket,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { VantixLogo, VantixMark } from "@/components/VantixLogo";
import { ThemeToggle, LanguageSwitcher } from "@/components/PrefsControls";
import { Blueprint } from "@/components/Blueprint";
import { SitePrefsProvider, useSitePrefs } from "@/lib/site-prefs";

export default function App() {
  return (
    <SitePrefsProvider>
      <Page />
    </SitePrefsProvider>
  );
}

function Page() {
  const { t } = useSitePrefs();
  useEffect(() => {
    document.title = t.meta.title;
  }, [t.meta.title]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Promise />
      <Story />
      <AgencyCallout />
      <Solution />
      <Blueprint />
      <Process />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Nav() {
  const { t } = useSitePrefs();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#problem", label: t.nav.problem },
    { href: "#rozwiazanie", label: t.nav.solution },
    { href: "#proces", label: t.nav.process },
    { href: "#cennik", label: t.nav.pricing },
    { href: "/blog/", label: t.nav.blog },
  ];
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="min-w-0 shrink-0">
          <VantixLogo />
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent-brand after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <a
            href="/audyt.html"
            className="vx-btn-accent hidden items-center gap-2 rounded-md bg-accent-brand px-4 py-2 text-sm font-medium text-accent-brand-foreground sm:inline-flex"
          >
            {t.nav.audit} <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition hover:border-accent-brand hover:text-accent-brand lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden border-t border-border bg-background lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        } transition-[max-height] duration-300 ease-out`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-surface-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-2 px-3 sm:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <a
            href="/audyt.html"
            onClick={() => setOpen(false)}
            className="vx-btn-accent mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-accent-brand px-4 py-2.5 text-sm font-medium text-accent-brand-foreground sm:hidden"
          >
            {t.nav.audit} <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useSitePrefs();
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section id="top" className="relative overflow-hidden bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 vx-hero-grid"
        style={{ transform: `translate3d(0, ${y * 0.15}px, 0)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl sm:-right-10"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent-brand) 45%, transparent), transparent 70%)",
          transform: `translate3d(0, ${y * 0.08}px, 0)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 hidden h-64 w-64 opacity-30 md:block"
        style={{ transform: `translate3d(0, ${-y * 0.12}px, 0) rotate(-8deg)` }}
      >
        <VantixMark className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32 lg:py-40">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-brand" />
            {t.hero.badge}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-balance text-foreground sm:mt-8">
            {t.hero.h1a}
            <br className="hidden sm:block" />{" "}
            <span className="relative inline-block">
              <span className="text-muted-foreground">{t.hero.h1b}</span>{" "}
              <span className="relative inline-block">
                {t.hero.h1c}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-accent-brand/80"
                />
              </span>
              .
            </span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
            {t.hero.p}
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="/audyt.html"
              className="vx-btn-accent group inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-brand px-5 py-3 text-sm font-medium text-accent-brand-foreground sm:w-auto"
            >
              {t.hero.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <span className="text-sm text-muted-foreground">{t.hero.ctaNote}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Promise() {
  const { t } = useSitePrefs();
  return (
    <section className="bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
            {t.promise.eyebrow}
          </span>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {t.promise.title}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {t.promise.items.map((s, i) => (
            <Reveal key={s.k} delay={i * 100}>
              <div className="vx-card h-full rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {s.k}
                </div>
                <div className="mt-2 h-0.5 w-8 rounded-full bg-accent-brand" />
                <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  const { t } = useSitePrefs();
  return (
    <section id="problem" className="bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 md:grid-cols-5 md:gap-16 md:py-32">
        <Reveal className="md:col-span-2">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
            {t.story.eyebrow}
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-foreground">
            {t.story.title}
          </h2>
        </Reveal>
        <Reveal
          delay={120}
          className="space-y-5 text-base leading-relaxed text-muted-foreground md:col-span-3 md:text-lg"
        >
          <p>{t.story.p1}</p>
          <p className="text-foreground">
            {t.story.p2a}{" "}
            <strong className="font-semibold text-foreground">{t.story.p2strong}</strong>
            {t.story.p2b}
          </p>
          <p>{t.story.p3}</p>
        </Reveal>
      </div>
    </section>
  );
}

function AgencyCallout() {
  const { t } = useSitePrefs();
  const icons = [Paintbrush, UserMinus, BotOff];
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
            {t.agency.eyebrow}
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-foreground">
            {t.agency.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.agency.p}
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3">
          {t.agency.items.map((text, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={text} delay={i * 100}>
                <div className="vx-card h-full rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-brand/10 text-accent-brand ring-1 ring-accent-brand/20">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-foreground">{text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Solution() {
  const { t } = useSitePrefs();
  const icons = [Zap, Target, Cog, TrendingUp];
  return (
    <section id="rozwiazanie" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
            {t.solution.eyebrow}
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-foreground">
            {t.solution.titlePre} <span className="font-bold tracking-wider">AI</span>{" "}
            {t.solution.titlePost}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2">
          {t.solution.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title} delay={i * 80}>
                <div className="vx-card group h-full rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-brand/10 text-accent-brand ring-1 ring-accent-brand/20 transition group-hover:bg-accent-brand group-hover:text-accent-brand-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground sm:mt-6">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useSitePrefs();
  const icons = [Search, ClipboardList, Rocket];
  return (
    <section id="proces" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
            {t.process.eyebrow}
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-foreground">
            {t.process.title}
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">
          {t.process.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={s.t} delay={i * 100}>
                <div className="vx-card relative h-full rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-brand/10 text-accent-brand ring-1 ring-accent-brand/20">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-xs font-semibold tabular-nums tracking-normal text-muted-foreground/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Pricing() {
  const { t } = useSitePrefs();
  return (
    <section id="cennik" className="bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 md:grid-cols-5 md:gap-12 md:py-32">
        <Reveal className="md:col-span-2">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
            {t.pricing.eyebrow}
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-foreground">
            {t.pricing.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t.pricing.p1}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.pricing.p2}</p>
        </Reveal>
        <Reveal delay={120} className="md:col-span-3">
          <div className="vx-card relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-brand via-accent-brand/70 to-transparent"
            />
            <div className="grid gap-6 border-b border-border pb-6 sm:grid-cols-2">
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {t.pricing.step1Label}
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {t.pricing.step1Value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{t.pricing.step1Note}</div>
              </div>
              <div className="sm:text-right">
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {t.pricing.step2Label}
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {t.pricing.step2Value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground sm:ml-auto sm:max-w-[220px]">
                  {t.pricing.step2Note}
                </div>
              </div>
            </div>
            <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.pricing.includedTitle}
            </div>
            <ul className="mt-4 space-y-3">
              {t.pricing.included.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-brand/10 text-accent-brand ring-1 ring-accent-brand/20">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <a
              href="/audyt.html"
              className="vx-btn-primary group mt-10 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              {t.pricing.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const { t } = useSitePrefs();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 md:py-32">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
            {t.faq.eyebrow}
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-foreground">
            {t.faq.title}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:mt-12">
            {t.faq.items.map((f) => (
              <details key={f.q} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-sm font-medium tracking-tight text-foreground sm:text-base md:text-lg">
                    {f.q}
                  </span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-muted text-muted-foreground transition duration-300 group-open:rotate-45 group-open:bg-accent-brand group-open:text-accent-brand-foreground">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { t } = useSitePrefs();
  return (
    <section id="audyt-cta" className="bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24 md:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-primary/60 bg-primary p-8 text-primary-foreground shadow-lg sm:p-10 md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--accent-brand) 65%, transparent), transparent 70%)",
              }}
            />
            <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 opacity-15">
              <VantixMark className="h-full w-full" />
            </div>
            <h2 className="relative max-w-3xl text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-balance text-primary-foreground">
              {t.finalCta.titlePre} <span className="text-accent-brand">{t.finalCta.titleAccent}</span>
            </h2>
            <p className="relative mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
              {t.finalCta.p}
            </p>
            <div className="relative mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="/audyt.html"
                className="vx-btn-accent group inline-flex items-center justify-center gap-2 rounded-md bg-accent-brand px-5 py-3 text-sm font-medium text-accent-brand-foreground"
              >
                {t.finalCta.cta1}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="/audyt.html"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/20 px-5 py-3 text-sm font-medium text-primary-foreground transition hover:border-accent-brand hover:bg-primary-foreground/5"
              >
                <CalcIcon className="h-4 w-4" /> {t.finalCta.cta2}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useSitePrefs();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <VantixLogo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              {t.footer.contact}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:kacper@vantix.pl" className="transition hover:text-foreground">
                  kacper@vantix.pl
                </a>
              </li>
              <li>
                <a href="/audyt.html" className="transition hover:text-foreground">
                  Bezpłatny audyt
                </a>
              </li>
              <li>
                <a href="/blog/" className="transition hover:text-foreground">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} Vantix. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
