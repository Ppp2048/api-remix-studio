type DeploymentChecklistProps = {
  warnings: string[];
};

const baseItems = [
  "Verify all external requests run through server-side route handlers when reliability matters.",
  "Confirm all selected APIs are free, public, and do not require frontend secrets.",
  "Enable caching and graceful fallbacks for public API instability.",
  "Run npm run build before pushing to Vercel.",
  "Document known demo limitations and fallback behavior in the README.",
];

export function DeploymentChecklist({ warnings }: DeploymentChecklistProps) {
  const items = [...baseItems, ...warnings];
  return (
    <section className="glass-panel rounded-[2rem] p-5">
      <p className="text-sm font-medium text-white">Deployment Readiness Checklist</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <label key={item} className="flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent" />
            <span className="text-sm leading-7 text-slate-200">{item}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
