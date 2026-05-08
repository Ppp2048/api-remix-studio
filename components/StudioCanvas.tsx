"use client";

import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useEffect } from "react";
import type { ApiCatalogEntry } from "@/lib/types";
import { ApiNode } from "@/components/ApiNode";

const nodeTypes = {
  apiNode: ApiNode,
};

type StudioCanvasProps = {
  selectedApis: ApiCatalogEntry[];
};

function buildNodes(apis: ApiCatalogEntry[]): Node[] {
  return apis.map((api, index) => ({
    id: api.id,
    type: "apiNode",
    position: { x: 60 + index * 230, y: index % 2 === 0 ? 120 : 250 },
    data: {
      label: api.name,
      category: api.category,
    },
  }));
}

function buildEdges(apis: ApiCatalogEntry[]): Edge[] {
  return apis.slice(1).map((api, index) => ({
    id: `${apis[index].id}-${api.id}`,
    source: apis[index].id,
    target: api.id,
    animated: true,
  }));
}

export function StudioCanvas({ selectedApis }: StudioCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(buildNodes(selectedApis));
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(buildEdges(selectedApis));

  useEffect(() => {
    setNodes(buildNodes(selectedApis));
    setEdges(buildEdges(selectedApis));
  }, [selectedApis, setEdges, setNodes]);

  const onConnect = (connection: Connection) => {
    setEdges((currentEdges) =>
      addEdge(
        {
          ...connection,
          animated: true,
        },
        currentEdges,
      ),
    );
  };

  return (
    <div className="xy-theme glass-panel h-[720px] overflow-hidden rounded-[2rem]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap zoomable pannable />
        <Controls />
        <Background gap={24} color="rgba(148, 163, 184, 0.16)" />
      </ReactFlow>
    </div>
  );
}
