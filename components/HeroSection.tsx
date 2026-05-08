import Link from "next/link";
import { ArrowRight, Boxes, Layers3, Sparkles } from "lucide-react";
import HeroOrbit from "@/components/HeroOrbit";

const mashups = [
  "Travel Cost Planner",
  "Developer Market Pulse",
  "Student Reading Explorer",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm text-sky-100">
            <Sparkles className="h-4 w-4" />
            Codex-powered MVP generation layer
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Mix APIs. <span className="text-gradient">Generate MVPs.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Turn free APIs and design inspiration into deployable MVP plans with product ideas,
              compatibility scoring, UI strategy, and a ready-to-build Codex pack.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/studio"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02]"
            >
              Start Remixing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo/travel-cost-planner"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              View Demo
              <Boxes className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {mashups.map((item) => (
              <div key={item} className="glass-panel rounded-2xl px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-brand">Example Remix</p>
                <p className="mt-2 font-medium text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <HeroOrbit />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-panel rounded-3xl p-5">
              <p className="text-sm text-muted">Compatibility Engine</p>
              <p className="mt-2 text-2xl font-semibold text-white">0-100 score with reasons</p>
            </div>
            <div className="glass-panel rounded-3xl p-5">
              <p className="text-sm text-muted">Outputs</p>
              <div className="mt-2 flex items-center gap-3 text-white">
                <Layers3 className="h-6 w-6 text-brand" />
                MVP plan, demo, prompt, checklist
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
