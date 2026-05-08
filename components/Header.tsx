import Link from "next/link";
import { Boxes, Sparkles } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/preview", label: "Preview" },
  { href: "/demo/travel-cost-planner", label: "Demo" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand">
            <Boxes className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-brand">API REMIX STUDIO</p>
            <p className="text-xs text-muted">Codex-powered MVP generation layer</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-medium text-sky-100 transition hover:border-brand/70 hover:bg-brand/20"
        >
          <Sparkles className="h-4 w-4" />
          Start Remixing
        </Link>
      </div>
    </header>
  );
}
