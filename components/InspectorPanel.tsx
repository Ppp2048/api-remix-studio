"use client";

import { Cpu, Wand2 } from "lucide-react";
import type { ApiCatalogEntry, TemplatePreset } from "@/lib/types";
import { ApiCard } from "@/components/ApiCard";
import { CompatibilityMeter } from "@/components/CompatibilityMeter";
import { ScreenshotStyleUploader } from "@/components/ScreenshotStyleUploader";
import { StylePresetSelector } from "@/components/StylePresetSelector";
import { TemplatePicker } from "@/components/TemplatePicker";
import { TemplateUrlInput } from "@/components/TemplateUrlInput";

type InspectorPanelProps = {
  selectedApis: ApiCatalogEntry[];
  templates: TemplatePreset[];
  selectedTemplateId: string;
  templateUrl: string;
  screenshotName?: string;
  stylePreset: string;
  compatibility: {
    score: number;
    reasons: string[];
    warnings: string[];
  };
  onTemplateChange: (templateId: string) => void;
  onTemplateUrlChange: (value: string) => void;
  onScreenshotChange: (value: string | undefined) => void;
  onStylePresetChange: (value: string) => void;
  onGenerate: () => void;
};

export function InspectorPanel({
  selectedApis,
  templates,
  selectedTemplateId,
  templateUrl,
  screenshotName,
  stylePreset,
  compatibility,
  onTemplateChange,
  onTemplateUrlChange,
  onScreenshotChange,
  onStylePresetChange,
  onGenerate,
}: InspectorPanelProps) {
  return (
    <aside className="flex h-full flex-col gap-4">
      <CompatibilityMeter
        score={compatibility.score}
        reasons={compatibility.reasons}
        warnings={compatibility.warnings}
      />
      <section className="glass-panel rounded-[2rem] p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-brand/30 bg-brand/10 p-2 text-brand">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Selected APIs</p>
            <p className="text-sm text-muted">Current mashup building blocks</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {selectedApis.length ? (
            selectedApis.map((api) => <ApiCard key={api.id} api={api} compact selected />)
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-muted">
              Add 2-3 APIs from the library to begin scoring and generation.
            </div>
          )}
        </div>
      </section>
      <section className="glass-panel rounded-[2rem] p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-brand/30 bg-brand/10 p-2 text-brand">
            <Wand2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Template Controls</p>
            <p className="text-sm text-muted">Blend presets with external inspiration.</p>
          </div>
        </div>
        <div className="mt-4 space-y-5">
          <TemplatePicker templates={templates} selectedId={selectedTemplateId} onChange={onTemplateChange} />
          <TemplateUrlInput value={templateUrl} onChange={onTemplateUrlChange} />
          <ScreenshotStyleUploader fileName={screenshotName} onUpload={onScreenshotChange} />
          <StylePresetSelector value={stylePreset} onChange={onStylePresetChange} />
        </div>
        <button
          type="button"
          onClick={onGenerate}
          disabled={selectedApis.length < 2}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-muted"
        >
          Generate MVP
        </button>
      </section>
    </aside>
  );
}
