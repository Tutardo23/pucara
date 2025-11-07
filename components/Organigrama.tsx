"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
} from "reactflow";
import "reactflow/dist/style.css";

import type { OrgNode } from "@/types/org";
import { orgData } from "@/data/org";
import { getLayoutedElements } from "@/lib/layout";
import CustomNode from "./CustomNode";
import InfoSidebar from "./InfoSidebar";

type CustomOrgNode = OrgNode & {
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
};

const nodeTypes = { custom: CustomNode };

type CustomNodeClick = (
  event: React.MouseEvent,
  node: Node<CustomOrgNode>
) => void;

type CustomPaneClick = () => void;

// =======================================================
// 🔹 Componente del flujo (organigrama)
// =======================================================
function OrgChartFlow({
  nodes: layoutedNodes,
  edges: layoutedEdges,
  onNodeSelect,
  onToggleExpand,
  onPaneClick,
}: {
  onNodeSelect: (node: Node<CustomOrgNode>) => void;
  onToggleExpand: (nodeId: string) => void;
  onPaneClick: CustomPaneClick;
  nodes: Node<CustomOrgNode>[];
  edges: Edge[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const { fitView, fitBounds } = useReactFlow();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fitView({ duration: 800, padding: 0.3 });
    }, 200);
    return () => clearTimeout(timeout);
  }, [fitView]);

  useEffect(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);

  const handleExpandAndRefit = useCallback(
    (nodeId: string) => {
      if (nodeId === "grupo-niveles" || nodeId === "grupo-areas") {
        setTimeout(() => {
          fitView({ duration: 600, padding: 0.45 });
        }, 300);
      }
    },
    [fitView]
  );

  const zoomToNode = useCallback(
    (node: Node<CustomOrgNode>) => {
      const nodeBounds = {
        x: node.position.x,
        y: node.position.y,
        width: node.width || 320,
        height: node.height || 120,
      };
      fitBounds(nodeBounds, { duration: 500, padding: 0.3 });
    },
    [fitBounds]
  );

  const handleNodeClick: CustomNodeClick = (event, node) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-action="toggle"]')) {
      onToggleExpand(node.id);
      handleExpandAndRefit(node.id);
    } else {
      zoomToNode(node);
      onNodeSelect(node);
    }
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      panOnScroll={false}
      zoomOnScroll
      zoomOnDoubleClick
      className="react-flow-organigrama"
      onNodeClick={handleNodeClick}
      onPaneClick={onPaneClick}
      nodesDraggable={true}
    >
      <Controls />
      <Background className="react-flow-organigrama" />

      {/* 🔹 Escudos grandes arriba a la derecha */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src="/escudo1.png"
          alt="Escudo Colegio 1"
          style={{
            height: "120px",
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.35))",
          }}
        />
        <img
          src="/escudo2.png"
          alt="Escudo Colegio 2"
          style={{
            height: "120px",
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.35))",
          }}
        />
      </div>
    </ReactFlow>
  );
}

// =======================================================
// 🔹 Componente principal del organigrama
// =======================================================
export default function Organigrama() {
  const [selectedNode, setSelectedNode] = useState<Node<CustomOrgNode> | null>(
    null
  );
  const [expandedNodes, setExpandedNodes] = useState(
    new Set<string>(["consejo"])
  );

  const { nodes, edges } = useMemo(
    () => getLayoutedElements(orgData, expandedNodes),
    [expandedNodes]
  );

  const handleSelectNode = useCallback((node: Node<CustomOrgNode>) => {
    setSelectedNode(node);
  }, []);

  const handleToggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes((currentExpanded) => {
      const newExpanded = new Set(currentExpanded);
      if (newExpanded.has(nodeId)) newExpanded.delete(nodeId);
      else newExpanded.add(nodeId);
      return newExpanded;
    });
  }, []);

  const handlePaneClick: CustomPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-neutral-50 relative">
      {/* 🔹 Título centrado arriba */}
      <h1 className="text-2xl font-bold text-center font-[Dosis] pt-4 pb-2">
        Organigrama Institucional
      </h1>

      {/* 🔹 Contenedor principal */}
      <div className="flex-grow flex flex-row overflow-hidden relative">
        <div className="flex-grow h-full">
          <ReactFlowProvider>
            <OrgChartFlow
              nodes={nodes}
              edges={edges}
              onNodeSelect={handleSelectNode}
              onToggleExpand={handleToggleExpand}
              onPaneClick={handlePaneClick}
            />
          </ReactFlowProvider>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            selectedNode ? "w-96" : "w-0"
          }`}
          style={{ width: selectedNode ? "24rem" : "0" }}
        >
          <InfoSidebar node={selectedNode} onClose={handlePaneClick} />
        </div>
      </div>
    </div>
  );
}
