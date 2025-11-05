import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { OrgNode } from "@/types/org";

// --- ¡TU NUEVA PALETA DE COLORES! ---
const palette = [
  "bg-blue-900 border-yellow-400 text-white", // 0: Azul (Consejo)
  "bg-gray-700 border-gray-800 text-white",  // 1: Gris (Grupos)
  "bg-red-800 border-yellow-400 text-white", // 2: Rojo (Áreas/Niveles)
  "bg-yellow-400 border-yellow-500 text-blue-900", // 3: Amarillo
  "bg-pink-300 border-pink-500 text-pink-900",     // 4: Rosita
  "bg-sky-200 border-sky-400 text-sky-900",       // 5: Azul Celeste
];
// ----------------------------------------

type CustomNodeData = OrgNode & { 
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
};

const CustomNode = memo(({ data }: NodeProps<CustomNodeData>) => {
  const { rows, depth, hasChildren, isExpanded } = data;

  // --- ¡LÓGICA DE COLOR CORREGIDA! ---
  let colorIndex: number;
  if (depth === 0) {
    colorIndex = 0; // Nivel 0 es Azul
  } else if (depth === 1) {
    colorIndex = 1; // Nivel 1 es Gris
  } else {
    // Para Nivel 2+, rotamos entre 2, 3, 4 y 5 (Rojo, Amarillo, Rosita, Celeste)
    // (depth - 2) nos da 0, 1, 2, 3, 4...
    // % 4 nos da 0, 1, 2, 3, 0...
    // + 2 nos da 2, 3, 4, 5, 2...
    colorIndex = ((depth - 2) % 4) + 2;
  }
  // -------------------------------------

  const colorClasses = palette[colorIndex];
  
  // El borde/texto cambia para los colores claros (Amarillo, Rosita, Celeste)
  const isLightColor = colorIndex === 3 || colorIndex === 4 || colorIndex === 5;
  const borderColor = isLightColor ? "border-gray-900" : "border-yellow-400";
  const textColor = isLightColor ? "text-gray-900" : "text-white";

  return (
    <div
      className={`relative border-2 rounded-sm shadow-lg ${colorClasses}`}
      style={{ width: 320 }} 
    >
      {/* --- Handle de ENTRADA (Arriba) --- */}
      <Handle
        type="target" 
        position={Position.Top} 
        className="!bg-gray-400 !w-3 !h-1 !opacity-0"
      />

      {/* --- Contenido del Nodo (Filas y Columnas) --- */}
      <div className="flex flex-col text-center">
         {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex flex-row ${
              rowIndex > 0 ? `border-t ${borderColor}` : ""
            }`}
          >
            {row.map((cellText, cellIndex) => (
              <div
                key={cellIndex}
                className={`flex-1 p-2 ${
                  cellIndex > 0 ? `border-l ${borderColor}` : ""
                } ${
                  rowIndex === 0 ? "font-bold" : "" 
                }`}
                style={{
                  fontSize: row.length > 2 ? '0.75rem' : '0.875rem' 
                }}
              >
                {cellText}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* --- Handle de SALIDA (Abajo) --- */}
      <Handle
        type="source" 
        position={Position.Bottom} 
        className="!bg-gray-400 !w-3 !h-1 !opacity-0"
      />

      {/* --- Botón +/- (Vuelve a estar ABAJO) --- */}
      {hasChildren && (
        <button 
          className={`
            absolute -bottom-3 left-1/2 -translate-x-1/2 
            w-6 h-6 rounded-full border shadow-md
            flex items-center justify-center font-mono text-lg
            ${colorClasses} ${borderColor} ${textColor}
            cursor-pointer
          `}
          data-action="toggle"
        >
          {isExpanded ? "-" : "+"}
        </button>
      )}
    </div>
  );
});

if (process.env.NODE_ENV === "development") {
  CustomNode.displayName = "CustomNode";
}

export default CustomNode;