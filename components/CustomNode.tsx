import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { OrgNode } from "@/types/org";

// --- PALETA DE COLORES ---
const palette = [
  { base: "bg-blue-900 border-yellow-400 text-white", header: "bg-blue-950" },   // Consejo
  { base: "bg-gray-700 border-gray-800 text-white", header: "bg-gray-900" },     // Grupo
  { base: "bg-red-800 border-yellow-400 text-white", header: "bg-red-900" },     // Áreas/Niveles
  { base: "bg-yellow-400 border-yellow-500 text-blue-900", header: "bg-yellow-500" }, // Amarillo
  { base: "bg-pink-300 border-pink-500 text-pink-900", header: "bg-pink-400" },  // Rosita
  { base: "bg-sky-200 border-sky-400 text-sky-900", header: "bg-sky-300" },      // Celeste
];
// ----------------------------------------

type CustomNodeData = OrgNode & {
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
};

const CustomNode = memo(({ data }: NodeProps<CustomNodeData>) => {
  const { rows, depth, hasChildren, isExpanded } = data;

  // --- LÓGICA DE COLOR ---
  let colorIndex: number;
  if (depth === 0) colorIndex = 0;
  else if (depth === 1) colorIndex = 1;
  else colorIndex = ((depth - 2) % 4) + 2;
  // ------------------------

  const paletteItem = palette[colorIndex];
  const isLightColor = colorIndex >= 3;
  const borderColor = isLightColor ? "border-gray-900" : "border-yellow-400";
  const textColor = isLightColor ? "text-gray-900" : "text-white";

  return (
    <div
      className={`relative border-2 rounded-md shadow-lg ${paletteItem.base}`}
      style={{
        width: 340,
        fontFamily: "'Dosis', sans-serif",
      }}
    >
      {/* Handle entrada */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-400 !w-3 !h-1 !opacity-0"
      />

      {/* Contenido del nodo */}
      <div className="flex flex-col text-center leading-tight">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex flex-row ${
              rowIndex > 0 ? `border-t ${borderColor}` : ""
            } ${
              rowIndex === 0
                ? `${paletteItem.header} ${textColor} font-extrabold`
                : ""
            }`}
          >
            {row.map((cellText, cellIndex) => (
              <div
                key={cellIndex}
                className={`flex-1 p-2 ${
                  cellIndex > 0 ? `border-l ${borderColor}` : ""
                }`}
                style={{
                  fontWeight:
                    rowIndex === 0
                      ? 800 // 🔹 título
                      : 650, // 🔸 subtítulo más fuerte
                  fontSize:
                    rowIndex === 0
                      ? "1rem"
                      : row.length > 2
                      ? "0.9rem"
                      : "0.95rem",
                  color: "inherit",
                  textShadow: isLightColor
                    ? "0 0 1px rgba(0,0,0,0.4)"
                    : "0 0 1px rgba(255,255,255,0.35)",
                  letterSpacing: "0.2px",
                }}
              >
                {cellText}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Handle salida */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400 !w-3 !h-1 !opacity-0"
      />

      {/* Botón +/- */}
      {hasChildren && (
        <button
          className={`
            absolute -bottom-3 left-1/2 -translate-x-1/2
            w-6 h-6 rounded-full border shadow-md
            flex items-center justify-center font-mono text-lg
            ${paletteItem.base} ${borderColor} ${textColor}
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
