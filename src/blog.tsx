import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { VantixLogo, VantixMark } from "@/components/VantixLogo";
import { ThemeToggle } from "@/components/PrefsControls";
import { LanguageSwitcher, ThemeToggle as _TT } from "@/components/PrefsControls";
import { useSitePrefs } from "@/lib/site-prefs";
import { POST_META, POST_TEXT, BLOG_UI } from "@/lib/content-pages";
import { mount } from "@/lib/mount";

type CardPost = { slug: string; title: string; teaser: string; date: string; tag: string };

function PostCard({ post, index, readLabel }: { post: CardPost; index: number; readLabel: string }) {
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
        {readLabel}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  );
}

function BlogIndex() {
  const { locale } = useSitePrefs();
  const ui = BLOG_UI[locale];
  const posts: CardPost[] = POST_META.map((m) => ({
    slug: m.slug,
    date: m.date[locale],
    tag: m.tag[locale],
    title: POST_TEXT[locale][m.slug].title,
    teaser: POST_TEXT[locale][m.slug].teaser,
  }));

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
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <span className="text-xs font-medium uppercase tracking-widest text-accent-brand">
          {ui.eyebrow}
        </span>
        <h1 className="mt-3 text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight text-foreground">
          {ui.title}
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          {ui.lead}
        </p>

        <div className="mt-8 space-y-4">
          {posts.map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} readLabel={ui.read} />
          ))}
        </div>
      </main>
    </div>
  );
}

mount(<BlogIndex />);
