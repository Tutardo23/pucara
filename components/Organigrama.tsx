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

  // Sincroniza el estado si los nodos cambian (por expansión)
  useEffect(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);
  
  const zoomToNode = (node: Node<CustomOrgNode>) => {
    const nodeBounds = {
      x: node.position.x,
      y: node.position.y,
      width: node.width || 320,
      height: node.height || 120,
    };
    fitBounds(nodeBounds, { duration: 400, padding: 0.8 });
  };

  // --- ¡AQUÍ ESTÁ LA CORRECCIÓN DEL ZOOM! ---
  const handleNodeClick: CustomNodeClick = (event, node) => {
    const target = event.target as HTMLElement;

    if (target.closest('[data-action="toggle"]')) {
      // --- Clic en el botón +/- ---
      // 1. Solo avisa al padre para expandir/colapsar
      onToggleExpand(node.id);
      
      // 2. ¡YA NO HACE ZOOM!
      // (Borramos el 'if (!node.data.isExpanded)' que llamaba a zoomToNode)

    } else {
      // --- Clic en el cuerpo de la caja ---
      // 1. Avisa al padre para abrir el sidebar
      onNodeSelect(node);
      // 2. SÍ hace zoom (Como pediste)
      zoomToNode(node);
    }
  };
  // ------------------------------------------

  const handlePaneClick: CustomPaneClick = () => {
    onPaneClick(); // Solo cierra el panel, no mueve la cámara
  };

  // Esta función se llama UNA SOLA VEZ cuando React Flow carga
  const onFlowInit = (reactFlowInstance: ReactFlowInstance) => {
    // Le decimos que centre la vista
    reactFlowInstance.fitView({ duration: 600, padding: 0.1 });
  };

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
      onInit={onFlowInit} // <-- El zoom inicial estable
    >
      <Controls /> 
      <Background />
    </ReactFlow>
  );
}

// --- Componente 'Organigrama' (Principal) ---
// (Esta parte no necesita cambios)
export default function Organigrama() {
  const [selectedNode, setSelectedNode] = useState<Node<CustomOrgNode> | null>(null);
  
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