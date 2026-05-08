import { AlertTriangle, ShieldCheck, Zap } from "lucide-react";

type CompatibilityMeterProps = {
  score: number;
  reasons: string[];
  warnings: string[];
};

export function CompatibilityMeter({ score, reasons, warnings }: CompatibilityMeterProps) {
  return (
    <section className="glass-panel rounded-[2rem] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Compatibility Score</p>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-5xl font-semibold text-white">{score}</span>
            <span className="pb-2 text-sm text-muted">/100</span>
          </div>
        </div>
        <div className="rounded-3xl border border-brand/30 bg-brand/10 px-4 py-3 text-brand">
          <Zap className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400"
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="mt-5 space-y-3">
        {reasons.slice(0, 3).map((reason) => (
          <div key={reason} className="flex items-start gap-3 text-sm text-slate-200">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            {reason}
          </div>
        ))}
        {warnings.slice(0, 2).map((warning) => (
          <div key={warning} className="flex items-start gap-3 text-sm text-amber-100">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            {warning}
          </div>
        ))}
      </div>
    </section>
  );
}
