"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { ApiCard } from "@/components/ApiCard";
import type { ApiCatalogEntry } from "@/lib/types";

type ApiLibrarySidebarProps = {
  apis: ApiCatalogEntry[];
  selectedIds: string[];
  onAdd: (apiId: string) => void;
};

export function ApiLibrarySidebar({ apis, selectedIds, onAdd }: ApiLibrarySidebarProps) {
  const [query, setQuery] = useState("");

  const filteredApis = apis.filter((api) => {
    const haystack = `${api.name} ${api.category} ${api.tags.join(" ")} ${api.description}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <aside className="glass-panel flex h-full flex-col rounded-[2rem] p-4">
      <div className="mb-4">
        <p className="text-sm font-medium text-white">API Library</p>
        <p className="mt-1 text-sm text-muted">Choose up to 3 public APIs for your remix.</p>
      </div>
      <label className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
        <Search className="h-4 w-4 text-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none"
          placeholder="Search by category, tag, or API name"
        />
      </label>
      <div className="space-y-3 overflow-y-auto pr-1">
        {filteredApis.map((api) => (
          <ApiCard
            key={api.id}
            api={api}
            compact
            selected={selectedIds.includes(api.id)}
            onAdd={onAdd}
          />
        ))}
      </div>
    </aside>
  );
}
