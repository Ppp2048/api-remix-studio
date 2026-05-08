type DataFlowViewProps = {
  items: string[];
};

export function DataFlowView({ items }: DataFlowViewProps) {
  return (
    <section className="glass-panel rounded-[2rem] p-5">
      <p className="text-sm font-medium text-white">API Data Flow</p>
      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
              {index + 1}
            </div>
            <p className="text-sm leading-7 text-slate-200">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
