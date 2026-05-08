"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiLibrarySidebar } from "@/components/ApiLibrarySidebar";
import { InspectorPanel } from "@/components/InspectorPanel";
import { apiCatalog, apiCatalogMap } from "@/lib/api-catalog";
import { calculateCompatibility } from "@/lib/compatibility";
import { defaultSelection, selectionToQuery } from "@/lib/preview-query";
import { templatePresets } from "@/lib/template-presets";

const StudioCanvas = dynamic(() => import("@/components/StudioCanvas").then((mod) => mod.StudioCanvas), {
  ssr: false,
  loading: () => <div className="glass-panel h-[720px] animate-pulse rounded-[2rem] bg-slate-900/70" />,
});

export function StudioBuilder() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelection.apiIds);
  const [selectedTemplateId, setSelectedTemplateId] = useState(defaultSelection.templateId);
  const [templateUrl, setTemplateUrl] = useState("");
  const [screenshotName, setScreenshotName] = useState<string | undefined>();
  const [stylePreset, setStylePreset] = useState(defaultSelection.stylePreset);

  const selectedApis = useMemo(
    () => selectedIds.map((id) => apiCatalogMap[id]).filter(Boolean),
    [selectedIds],
  );
  const compatibility = useMemo(() => calculateCompatibility(selectedIds), [selectedIds]);

  const handleAdd = (apiId: string) => {
    setSelectedIds((current) => {
      if (current.includes(apiId)) return current;
      if (current.length >= 3) return [...current.slice(1), apiId];
      return [...current, apiId];
    });
  };

  const handleGenerate = () => {
    router.push(
      `/preview?${selectionToQuery({
        apiIds: selectedIds,
        templateId: selectedTemplateId,
        stylePreset,
        templateUrl: templateUrl || undefined,
        screenshotName,
      })}`,
    );
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
      <ApiLibrarySidebar apis={apiCatalog} selectedIds={selectedIds} onAdd={handleAdd} />
      <StudioCanvas selectedApis={selectedApis} />
      <InspectorPanel
        selectedApis={selectedApis}
        templates={templatePresets}
        selectedTemplateId={selectedTemplateId}
        templateUrl={templateUrl}
        screenshotName={screenshotName}
        stylePreset={stylePreset}
        compatibility={compatibility}
        onTemplateChange={setSelectedTemplateId}
        onTemplateUrlChange={setTemplateUrl}
        onScreenshotChange={setScreenshotName}
        onStylePresetChange={setStylePreset}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
