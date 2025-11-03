export type OrgNode = {
  id: string;
  etiqueta: string;
  persona?: {
    id: string;
    nombre: string;
    cargo: string;
    tipo: string; // 👈 antes seguro decía "Titular" | "Contratada"
    horas: number;
  };
  children?: OrgNode[];
};
