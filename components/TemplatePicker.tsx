"use client";

import type { TemplatePreset } from "@/lib/types";

type TemplatePickerProps = {
  templates: TemplatePreset[];
  selectedId: string;
  onChange: (templateId: string) => void;
};

export function TemplatePicker({ templates, selectedId, onChange }: TemplatePickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white">Built-in Template</label>
      <select
        value={selectedId}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id} className="bg-slate-950">
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}
