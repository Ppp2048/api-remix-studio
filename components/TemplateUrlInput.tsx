"use client";

type TemplateUrlInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TemplateUrlInput({ value, onChange }: TemplateUrlInputProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white">Template URL Inspiration</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="https://example.com/inspiration"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
      />
      <p className="text-xs text-muted">
        The link is stored in the generated style guide and Codex build prompt for layout inspiration.
      </p>
    </div>
  );
}
