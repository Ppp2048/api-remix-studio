"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CodePromptPanelProps = {
  prompt: string;
};

export function CodePromptPanel({ prompt }: CodePromptPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="glass-panel rounded-[2rem] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">Codex Build Pack</p>
          <p className="mt-1 text-sm text-muted">Copy this prompt to accelerate implementation.</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          Copy prompt
        </button>
      </div>
      <pre className="mt-4 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4 text-sm leading-7 text-slate-200">
        <code>{prompt}</code>
      </pre>
    </section>
  );
}
