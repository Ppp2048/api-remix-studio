"use client";

import { ImagePlus } from "lucide-react";

type ScreenshotStyleUploaderProps = {
  fileName?: string;
  onUpload: (fileName: string | undefined) => void;
};

export function ScreenshotStyleUploader({ fileName, onUpload }: ScreenshotStyleUploaderProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white">Screenshot Inspiration</label>
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4">
        <ImagePlus className="h-5 w-5 text-brand" />
        <div className="text-sm text-slate-200">
          <div>{fileName ? `Uploaded: ${fileName}` : "Upload a screenshot for style inspiration"}</div>
          <p className="mt-1 text-xs text-muted">
            Uploaded inspiration detected. Use layout, spacing, and visual mood as reference.
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => onUpload(event.target.files?.[0]?.name)}
        />
      </label>
    </div>
  );
}
