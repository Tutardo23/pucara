export interface NodeDetails {
  id: string; 
  nombre: string;
  cargo: string;
  email?: string;
  descripcion?: string;
  horas?: number;
  members?: NodeDetails[]; 
}

export interface OrgNode {
  id: string; 
  rows: string[][]; 
  details?: NodeDetails; 
  children?: OrgNode[];
  // ¡Sin propiedad 'layout'!
}