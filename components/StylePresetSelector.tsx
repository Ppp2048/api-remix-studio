"use client";

const styles = ["futuristic", "minimal", "glass", "terminal", "playful", "executive"];

type StylePresetSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function StylePresetSelector({ value, onChange }: StylePresetSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white">Style Preset</label>
      <div className="flex flex-wrap gap-2">
        {styles.map((style) => (
          <button
            type="button"
            key={style}
            onClick={() => onChange(style)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              value === style
                ? "bg-white text-slate-950"
                : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
}
