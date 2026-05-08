import { ArrowUpRight, Plus } from "lucide-react";
import type { ApiCatalogEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

type ApiCardProps = {
  api: ApiCatalogEntry;
  compact?: boolean;
  selected?: boolean;
  onAdd?: (apiId: string) => void;
};

export function ApiCard({ api, compact, selected, onAdd }: ApiCardProps) {
  return (
    <article
      className={cn(
        "glass-panel rounded-3xl border p-4 transition hover:-translate-y-0.5 hover:border-brand/40",
        selected && "border-brand/60 bg-brand/10",
        compact ? "space-y-3" : "space-y-4",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand">{api.category}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{api.name}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-muted">{api.authType}</span>
      </div>
      <p className="text-sm leading-6 text-slate-300">{api.description}</p>
      <div className="flex flex-wrap gap-2">
        {api.tags.slice(0, compact ? 3 : 5).map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-200">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-muted">
          Difficulty: <span className="text-slate-200">{api.difficulty}</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={api.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/5"
          >
            Docs
            <ArrowUpRight className="h-3 w-3" />
          </a>
          {onAdd ? (
            <button
              type="button"
              onClick={() => onAdd(api.id)}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-950 transition hover:scale-[1.02]"
            >
              <Plus className="h-3 w-3" />
              {selected ? "Added" : "Add"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
