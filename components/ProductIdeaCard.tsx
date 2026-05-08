import type { ProductIdea } from "@/lib/types";

type ProductIdeaCardProps = {
  idea: ProductIdea;
};

export function ProductIdeaCard({ idea }: ProductIdeaCardProps) {
  return (
    <section className="glass-panel rounded-[2rem] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-brand">Generated Product Idea</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{idea.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{idea.oneLinePitch}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
          <p className="text-sm text-muted">Wow factor</p>
          <p className="mt-2 text-3xl font-semibold text-white">{idea.wowFactor}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-medium text-white">Problem solved</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">{idea.problemSolved}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-medium text-white">Target users</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {idea.targetUsers.map((user) => (
              <span key={user} className="rounded-full bg-white/8 px-3 py-2 text-sm text-slate-200">
                {user}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
