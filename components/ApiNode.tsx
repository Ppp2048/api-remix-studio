"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { DatabaseZap } from "lucide-react";

type ApiNodeType = Node<
  {
    label: string;
    category: string;
  },
  "apiNode"
>;

export function ApiNode({ data }: NodeProps<ApiNodeType>) {
  return (
    <div className="min-w-[220px] rounded-3xl border border-brand/30 bg-slate-950/95 p-4 shadow-2xl">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-brand/30 bg-brand/10 p-2 text-brand">
          <DatabaseZap className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand">{data.category}</p>
          <p className="mt-1 font-semibold text-white">{data.label}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
