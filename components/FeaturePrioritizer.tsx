type FeaturePrioritizerProps = {
  mustHave: string[];
  shouldHave: string[];
  wow: string[];
};

export function FeaturePrioritizer({ mustHave, shouldHave, wow }: FeaturePrioritizerProps) {
  const groups = [
    { title: "Must-have", items: mustHave, accent: "text-emerald-300" },
    { title: "Should-have", items: shouldHave, accent: "text-sky-300" },
    { title: "Wow feature", items: wow, accent: "text-violet-300" },
  ];

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title} className="glass-panel rounded-[2rem] p-5">
          <p className={`text-sm font-medium ${group.accent}`}>{group.title}</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            {group.items.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
