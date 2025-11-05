export interface NodeDetails {
  id: string; 
  nombre: string;
  cargo: string;
  email?: string;
  descripcion?: string;
  horas?: number;
  members?: NodeDetails[]; 
  note?: string; // <-- ¡AQUÍ ESTÁ LA CORRECCIÓN!
}

export interface OrgNode {
  id: string; 
  rows: string[][]; 
  details?: NodeDetails; 
  children?: OrgNode[];
}