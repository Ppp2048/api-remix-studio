type FileTreeViewProps = {
  apiNames: string[];
};

const baseTree = [
  "app/",
  "  api/",
  "    countries/route.ts",
  "    weather/route.ts",
  "    currency/route.ts",
  "  studio/page.tsx",
  "  preview/page.tsx",
  "  demo/travel-cost-planner/page.tsx",
  "components/",
  "lib/",
  "docs/",
];

export function FileTreeView({ apiNames }: FileTreeViewProps) {
  return (
    <section className="glass-panel rounded-[2rem] p-5">
      <p className="text-sm font-medium text-white">Generated File Tree</p>
      <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 font-mono text-sm leading-7 text-slate-300">
        {baseTree.map((row) => (
          <div key={row}>{row}</div>
        ))}
        <div className="mt-3 text-brand"># API modules: {apiNames.join(", ")}</div>
      </div>
    </section>
  );
}
