import type { Node } from "reactflow";
import type { OrgNode, NodeDetails } from "@/types/org"; 

// Tipo del nodo que recibimos
type CustomOrgNode = OrgNode & { 
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
};

interface InfoSidebarProps {
  node: Node<CustomOrgNode> | null; 
  onClose: () => void;
}

// (Componente interno MemberCard sin cambios)
function MemberCard({ member }: { member: NodeDetails }) {
  return (
    <div className="mt-4 p-3 rounded-lg border border-neutral-200 bg-neutral-50">
      <h4 className="font-bold text-base text-blue-800">{member.nombre}</h4>
      <p className="text-sm font-medium text-neutral-700">{member.cargo}</p>
      {member.horas && (
        <p className="text-sm text-neutral-500 mt-1">{member.horas} hs semanales</p>
      )}
      {member.descripcion && (
        <p className="text-sm text-neutral-600 mt-2">{member.descripcion}</p>
      )}
    </div>
  );
}

export default function InfoSidebar({ node, onClose }: InfoSidebarProps) {
  if (!node) {
    return (
      <div className="w-96 h-full border-l border-neutral-200 bg-white p-6 flex flex-col justify-center items-center text-center shadow-lg">
        <p className="text-neutral-500 text-sm">
          Haz clic en un miembro del organigrama para ver sus detalles.
        </p>
        {/* --- ¡ERROR ARREGLADO AQUÍ! --- */}
        {/* Antes había una </D> o algo similar */}
      </div>
    );
  }
  
  const { details, rows } = node.data;
  const mainTitle = rows[0]?.[0] || node.id; 

  return (
    <div className="w-96 h-full border-l border-neutral-200 bg-white p-6 shadow-lg relative flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800"
        aria-label="Cerrar panel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mt-8 flex-grow overflow-y-auto">
        
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          {details?.nombre ?? mainTitle}
        </h2>
        
        {details?.cargo && (
          <p className="text-base text-neutral-700 font-medium">
            {details.cargo}
          </p>
        )}

        {details?.horas && !details.members && (
           <p className="text-sm text-neutral-600 mt-1">
            <strong>Horas totales:</strong> {details.horas} hs semanales
          </p>
        )}
        
        {details?.descripcion && !details.members && (
          <p className="text-sm text-neutral-600 whitespace-pre-wrap mt-4">
            {details.descripcion}
          </p>
        )}

        {details?.members && details.members.length > 0 && (
          <>
            <hr className="my-5 border-t border-neutral-200" />
            
            {details.descripcion && (
              <p className="text-sm text-neutral-600 whitespace-pre-wrap mb-4">
                {details.descripcion}
              </p>
            )}

            <h3 className="font-semibold text-neutral-800 text-sm uppercase tracking-wider">
              Miembros del Equipo
            </h3>
            
            <div className="flex flex-col space-y-3 mt-2">
              {details.members.map((member) => (
                <MemberCard key={member.nombre} member={member} />
              ))}
            </div>
          </>
        )}

        {details?.email && !details.members && (
          <>
            <hr className="my-5 border-t border-neutral-200" />
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-800 text-sm uppercase tracking-wider">
                Información de Contacto
              </h3>
              <p className="text-sm text-neutral-600">
                <strong>Email:</strong> {details.email}
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}