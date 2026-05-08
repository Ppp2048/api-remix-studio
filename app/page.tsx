import Link from "next/link";
import { ArrowRight, Bot, LayoutTemplate, Network, Radar } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";

const featureCards = [
  {
    icon: Network,
    title: "Curated free API library",
    description: "Mix 2-3 no-key or optional-key public APIs with compatibility scoring and warnings.",
  },
  {
    icon: LayoutTemplate,
    title: "Template-aware planning",
    description: "Blend built-in UI presets with inspiration URLs or screenshots for fast style direction.",
  },
  {
    icon: Bot,
    title: "Codex build pack",
    description: "Generate a product idea, file tree, feature ladder, and implementation-ready prompt.",
  },
  {
    icon: Radar,
    title: "Demo-first delivery",
    description: "Ship one working prototype route plus a deployability checklist tuned for Vercel.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-brand">Why it works</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Everything needed for a hackathon MVP</h2>
              </div>
              <Link href="/studio" className="hidden items-center gap-2 text-sm text-slate-300 hover:text-white md:inline-flex">
                Open studio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((card) => (
                <article key={card.title} className="glass-panel rounded-[2rem] p-6">
                  <div className="inline-flex rounded-2xl border border-brand/30 bg-brand/10 p-3 text-brand">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand">Example API mashups</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  ["REST Countries + Open-Meteo + Frankfurter", "Travel Cost Planner"],
                  ["GitHub REST + CoinGecko", "Developer Market Pulse"],
                  ["Open Library + Universities", "Student Reading Explorer"],
                  ["NASA APOD + Open-Meteo", "Stargazing Planner"],
                ].map(([combo, product]) => (
                  <div key={combo} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-muted">{combo}</p>
                    <p className="mt-3 text-xl font-semibold text-white">{product}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand">Demo flow</p>
              <div className="mt-5 space-y-4">
                {[
                  "Choose 2-3 APIs from the library.",
                  "Connect them visually on the React Flow canvas.",
                  "Layer in a built-in template plus inspiration URL or screenshot.",
                  "Generate a polished MVP plan, build prompt, and demo-ready direction.",
                ].map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
