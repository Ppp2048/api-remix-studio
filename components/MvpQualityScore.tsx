type MvpQualityScoreProps = {
  total: number;
  compatibility: number;
  problemClarity: number;
  demoValue: number;
  buildSimplicity: number;
  deployability: number;
};

export function MvpQualityScore({
  total,
  compatibility,
  problemClarity,
  demoValue,
  buildSimplicity,
  deployability,
}: MvpQualityScoreProps) {
  const rows = [
    ["API compatibility", compatibility],
    ["Problem clarity", problemClarity],
    ["Demo value", demoValue],
    ["Build simplicity", buildSimplicity],
    ["Deployability", deployability],
  ] as const;

  return (
    <section className="glass-panel rounded-[2rem] p-5">
      <p className="text-sm text-muted">MVP Quality Score</p>
      <div className="mt-3 flex items-end gap-3">
        <span className="text-5xl font-semibold text-white">{total}</span>
        <span className="pb-2 text-sm text-muted">/100</span>
      </div>
      <div className="mt-5 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-slate-300">{label}</span>
              <span className="text-white">{value}</span>
            </div>
            <div className="h-2 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-400"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
