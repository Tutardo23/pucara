export const orgData = {
  id: "root",
  etiqueta: "Dirección General",
  persona: {
    id: "1",
    nombre: "María López",
    cargo: "Directora General",
    tipo: "Titular",
    horas: 40,
  },
  children: [
    {
      id: "coord-1",
      etiqueta: "Coordinación Académica",
      persona: {
        id: "2",
        nombre: "Ana Torres",
        cargo: "Coordinadora Nivel Inicial",
        tipo: "Contratada",
        horas: 25,
      },
      children: [
        {
          id: "doc-1",
          etiqueta: "Docente Sala 5 A",
          persona: {
            id: "3",
            nombre: "Laura Gómez",
            cargo: "Docente",
            tipo: "Titular",
            horas: 18,
          },
        },
      ],
    },
    {
      id: "coord-2",
      etiqueta: "Secretaría",
      persona: {
        id: "4",
        nombre: "Juan Pérez",
        cargo: "Secretario Académico",
        tipo: "Titular",
        horas: 30,
      },
    },
  ],
};
