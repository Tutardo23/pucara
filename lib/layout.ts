import dagre from "dagre";
import type { Node, Edge } from "reactflow";
import type { OrgNode } from "@/types/org"; 

const NODE_WIDTH = 320; 
const NODE_HEIGHT = 120; // Alto promedio

// Tipo para los datos que pasaremos al nodo
type CustomNodeData = OrgNode & { 
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
};

function transformData(
  orgNode: OrgNode,
  parentId: string | null = null,
  depth = 0,
  expandedNodes: Set<string> 
): { nodes: Node<CustomNodeData>[]; edges: Edge[] } {
  
  const nodeId = orgNode.id;
  const hasChildren = (orgNode.children?.length ?? 0) > 0;
  const isExpanded = expandedNodes.has(nodeId);

  const currentNode: Node<CustomNodeData> = {
    id: nodeId,
    type: "custom", 
    data: { ...orgNode, depth, hasChildren, isExpanded }, 
    position: { x: 0, y: 0 }, 
  };

  let nodes: Node<CustomNodeData>[] = [currentNode];
  let edges: Edge[] = [];

  if (parentId) {
    edges.push({
      id: `${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
      type: "smoothstep",
      style: { strokeWidth: 2, stroke: "#9ca3af" },
    });
  }

  // Solo generamos los hijos si el nodo tiene hijos Y está expandido
  if (hasChildren && isExpanded) {
    for (const child of orgNode.children!) {
      const { nodes: childNodes, edges: childEdges } = transformData(
        child,
        nodeId,
        depth + 1,
        expandedNodes
      );
      nodes = nodes.concat(childNodes);
      edges = edges.concat(childEdges);
    }
  }

  return { nodes, edges };
}

// La función principal (Sincrónica)
export function getLayoutedElements(
  orgData: OrgNode, 
  expandedNodes: Set<string>
) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const { nodes, edges } = transformData(orgData, null, 0, expandedNodes); 

  dagreGraph.setGraph({ 
    rankdir: 'TB', // Top-to-Bottom
    nodesep: 60,   // Espacio horizontal entre hermanos
    ranksep: 90    // Espacio vertical entre niveles
  });

  nodes.forEach((node) => {
    const nodeHeight = node.data.rows.length * 40 + 30; 
    dagreGraph.setNode(node.id, {
      width: NODE_WIDTH,
      height: nodeHeight, 
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const nodeHeight = nodeWithPosition.height;
    
    node.position = {
      x: nodeWithPosition.x - NODE_WIDTH / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes: layoutedNodes as Node<CustomNodeData>[], edges: edges };
}