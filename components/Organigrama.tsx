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
  type ReactFlowInstance
} from "reactflow";
import "reactflow/dist/style.css";

import type { OrgNode } from "@/types/org"; 
import { orgData } from "@/data/org";
import { getLayoutedElements } from "@/lib/layout";
import CustomNode from "./CustomNode";
import InfoSidebar from "./InfoSidebar";

// Tipo del nodo
type CustomOrgNode = OrgNode & { 
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
};

const nodeTypes = {
  custom: CustomNode,
};

// --- Tipos de los Handlers ---
type CustomNodeClick = (
  event: React.MouseEvent,
  node: Node<CustomOrgNode>
) => void;
type CustomPaneClick = () => void;


// --- Componente Interno del Flow ---
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
  
  const { fitBounds } = useReactFlow();

  useEffect(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);
  
  const zoomToNode = useCallback((node: Node<CustomOrgNode>) => {
    const nodeBounds = {
      x: node.position.x,
      y: node.position.y,
      width: node.width || 320,
      height: node.height || 120,
    };
    // Zoom suave (si lo activaras, usaría este)
    fitBounds(nodeBounds, { duration: 400, padding: 0.3 });
  }, [fitBounds]);

  const handleNodeClick: CustomNodeClick = (event, node) => {
    const target = event.target as HTMLElement;

    if (target.closest('[data-action="toggle"]')) {
      // Clic en el botón +/-: Solo expande/colapsa
      onToggleExpand(node.id); 
      // ¡NO HAY ZOOM!
    } else {
      // Clic en el cuerpo: Abre el panel (si quieres zoom aquí, descomenta zoomToNode(node))
      onNodeSelect(node); 
      // Si quieres que haga zoom AL TOCAR para verlo de cerca: zoomToNode(node);
    }
  };

  const handlePaneClick: CustomPaneClick = () => {
    onPaneClick(); // Solo cierra el panel
  };

  // --- ¡ZOOM INICIAL PARA CAPTURA! ---
  const onFlowInit = (reactFlowInstance: ReactFlowInstance) => {
    // Padding alto (0.9) para ver todo el mapa más alejado
    // Duration: 0 para que sea instantáneo.
    reactFlowInstance.fitView({ duration: 0, padding: 0.9 });
  };
  // ------------------------------------

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      panOnScroll={false}   
      zoomOnScroll={true}
      zoomOnDoubleClick
      className="react-flow-organigrama"
      onNodeClick={handleNodeClick}
      onPaneClick={handlePaneClick}
      nodesDraggable={true}
      onInit={onFlowInit} // Centra INSTANTÁNEAMENTE para la captura
    >
      <Controls /> 
      <Background />
    </ReactFlow>
  );
}

// --- Componente 'Organigrama' (Principal) ---
export default function Organigrama() {
  const [selectedNode, setSelectedNode] = useState<Node<CustomOrgNode> | null>(null);
  
  // Nodos expandidos por defecto
  const [expandedNodes, setExpandedNodes] = useState(new Set<string>(['consejo', 'grupo-niveles', 'grupo-areas']));
  
  const { nodes, edges } = useMemo(() => {
    return getLayoutedElements(orgData, expandedNodes);
  }, [expandedNodes]);

  const handleSelectNode = useCallback((node: Node<CustomOrgNode>) => {
    setSelectedNode(node);
  }, []);

  const handleToggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes(currentExpanded => {
      const newExpanded = new Set(currentExpanded);
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId);
      } else {
        newExpanded.add(nodeId);
      }
      return newExpanded;
    });
  }, []); 

  const handlePaneClick: CustomPaneClick = useCallback(() => {
    setSelectedNode(null); 
  }, []); 

  return (
    <div className="w-screen h-screen flex flex-col bg-neutral-50">
      
      <h1 className="text-xl font-semibold p-4 text-center border-b border-neutral-200 bg-white shadow-sm">
        Organigrama Institucional
      </h1>

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
          className={`
            transition-all duration-300 ease-in-out
            ${selectedNode ? "w-96" : "w-0"}
          `}
          style={{ width: selectedNode ? "24rem" : "0" }}
        >
          <InfoSidebar 
            node={selectedNode} 
            onClose={handlePaneClick}
          />
        </div>

      </div>
    </div>
  );
}