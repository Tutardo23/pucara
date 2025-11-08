import type { OrgNode } from "@/types/org";

export const orgData: OrgNode = {
  id: "consejo",
  rows: [
    ["CONSEJO DE DIRECCION"],
    ["Director General"],
    ["Teresita María Molina"],
    ["Fátima Del Río", "Maria Eugenia Martín (Polo)"],
  ],
  details: {
    id: "consejo-details",
    nombre: "Consejo de Dirección",
    cargo: "Equipo de Dirección Colegiado",
    members: [
      { id: "teresita-m", nombre: "Teresita María Molina", cargo: "Rep. Legal", horas: 31 },
      { id: "fatima-dr", nombre: "Fátima Del Río", cargo: "Miembro", horas: 2 },
      { id: "maria-em", nombre: "Maria Eugenia Martín (Polo)", cargo: "Miembro", horas: 2 },
    ],
  },
  
  // --- ESTRUCTURA IZQUIERDA/DERECHA (CON DAGRE ESTABLE) ---
  children: [
    // --- 1. BRAZO IZQUIERDO (NIVELES) ---
    {
      id: "grupo-niveles",
      rows: [["NIVELES DE EDUCACIÓN"]], 
      details: {id: 'brazo-izq-details', nombre: 'Niveles de Educación', cargo: 'Agrupador de niveles'},
      children: [
        // --- NODO TALLER ---
        {
          id: "taller",
          rows: [
            ["TALLER DE INGLÉS"],
            ["Coordinadora"],
            ["Prof. Laura Lazarte (9 hs - Contratada)"],
          ], 
          details: { 
            id: "taller-info", 
            nombre: "Taller de Inglés", 
            cargo: "Coordinadora: Prof. Laura Lazarte (9 hs - Contratada)",
            descripcion: "El Taller de Inglés inició el Ciclo Lectivo 2025 con 9 niveles.",
            members: [ 
              { id: "laura-lazarte", nombre: "Prof. Laura Lazarte", cargo: "Coordinadora Taller de Inglés (Contratada)", horas: 9, descripcion: "Funciones: Coordinar docentes, supervisar clases, material y evaluaciones. Atención a padres y alumnas. Organizar campamento y Concert. Evaluar y preparar a alumnas que rinden Examen Internacional de Cambridge." },
              { id: "mercedes-araoz", nombre: "Mercedes Araoz Teran", cargo: "Secretaria (Contratada)", horas: 6, descripcion: "Control de asistencia de docentes y alumnas. Atención de padres y alumnos." },
              { id: "florencia-salas", nombre: "Prof. Florencia Salas", cargo: "Docente 1º grado (Contratada)", horas: 6 },
              { id: "karina-correa", nombre: "Prof. Karina Correa", cargo: "Docente 2º grado (Contratada)", horas: 6 },
              { id: "luciana-cruz", nombre: "Prof. Luciana Cruz", cargo: "Docente 3º grado (Contratada)", horas: 6 },
              { id: "sofia-filippini", nombre: "Prof. Sofia Filippini", cargo: "Docente 4º grado (Contratada)", horas: 6 },
              { id: "natalia-aguero", nombre: "Prof. Natalia Agüero", cargo: "Docente 5º grado (Contratada)", horas: 6 },
              { id: "lucia-rivarola", nombre: "Prof. Lucia Rivarola", cargo: "Docente 6º grado (Reemplazante)", horas: 6, note: "Reemplaza a Mercedes Fernandez (Licencia)" },
              { id: "mercedes-f-lic", nombre: "Prof. Mercedes Fernandez", cargo: "Docente 6º grado (Licencia)", horas: 6 },
              { id: "iris-torres", nombre: "Prof. Iris Torres", cargo: "Docente 2º Año Secundario (Contratada)", horas: 3 },
            ],
          },
          children: [
            { id: "secretaria-taller", rows: [["Secretaria Taller"], ["Mercedes Araoz Teran (6 hs)"]], details: { id: "mercedes-araoz-det", nombre: "Mercedes Araoz Teran", cargo: "Secretaria (Contratada)", horas: 6, descripcion: "Control de asistencia de docentes y alumnas. Atención de padres y alumnos." } },
            { id: "docentes-taller-grupo", rows: [ ["Cuerpo Docente Taller"], ["Prof. Florencia Salas (6 hs)"], ["Prof. Karina Correa (6 hs)"], ["Prof. Luciana Cruz (6 hs)"], ["Prof. Sofia Filippini (6 hs)"], ["Prof. Natalia Agüero (6 hs)"], ["Prof. Lucia Rivarola (6 hs)"], ["Prof. Iris Torres (3 hs)"], ], details: { id: "docentes-taller-details", nombre: "Cuerpo Docente Taller de Inglés", cargo: "Docentes Contratados" }, children: [] }
          ]
        },
        
        // --- ¡NIVEL INICIAL ACTUALIZADO! ---
        {
          id: "nivel-inicial",
          rows: [["Dirección Nivel Inicial"], ["Gabriela Ortega (32 hs)"]],
          details: { id: "gabriela-ortega", nombre: "Gabriela Ortega", cargo: "Directora Nivel Inicial", horas: 32 },
          children: [ 
            { 
              id: "asesor-pedagogico-inicial", 
              rows: [["Asesor pedagogico"], ["Gabriela Escobar (33 hs)"]], 
              details: { id: "asesor-pedagogico-inicial-details", nombre: "Gabriela Escobar", cargo: "Asesor Pedagógico", horas: 33 } 
            },
            { 
              id: "sec-inicial", 
              rows: [["Secretaria de Nivel"], ["Pía Haddad (31 hs)"]], 
              details: { id: "pia-haddad", nombre: "Pía Haddad", cargo: "Secretaria Nivel Inicial", horas: 31 } 
            },
            { 
              id: "coord-inicial", 
              rows: [["Coordinación"], ["Turno Mañana ", "Turno Tarde  (Laura Cosentino - 20 hs)"]], 
              details: { 
                id: "coord-inicial-details", 
                nombre: "Coordinación Nivel Inicial", 
                cargo: "Coordinación",
                members: [
                  { id: "laura-cosentino-coord", nombre: "Laura Cosentino", cargo: "Coordinadora Turno Mañana", horas: 20 }
                ]
              }, 
              children: [ 
                // --- MOVIMIENTO 2: Docentes de Inglés VAN AQUÍ ---
                { 
                  id: "coord-ingles-inicial", 
                  rows: [["Coordinación Inglés"], ["Emilia Franchini (2h)"]], 
                  details: { id: "coord-ingles-inicial-details", nombre: "Emilia Franchini", cargo: "Coordinación Inglés", horas: 2 }, 
                  children: [
                    { 
                      id: "docentes-ingles-inicial", 
                      rows: [
                        ["Docentes Inglés"],
                        ["ROMERO ADRIANA (12 hs, TM/TT)"],
                        ["LOPEZ ALURRALDE PIA (8 hs, TM)"],
                        ["CRUZ LUCIANA (4 hs, TT)"]
                      ],
                      details: { 
                        id: "docentes-ingles-inicial-details", 
                        nombre: "Docentes Inglés", 
                        cargo: "Nivel Inicial",
                        members: [
                          { id: "romero-adriana", nombre: "ROMERO ADRIANA", cargo: "Maestra de inglés (Titular, TM/TT)", horas: 12 },
                          { id: "lopez-alurralde-pia", nombre: "LOPEZ ALURRALDE PIA", cargo: "Maestra de inglés (Titular, TM)", horas: 8 },
                          { id: "cruz-luciana-ingles", nombre: "CRUZ LUCIANA", cargo: "Maestra de inglés (Contrato, TT)", horas: 4 },
                        ]
                      } 
                    }
                  ] 
                }, 
                // --- TALLERES INICIAL (SIN CAMBIOS) ---
                { 
                  id: "talleres-inicial", 
                  rows: [["Talleres"], ["Taller de Inglés (2 hs - Cruz Luciana)", "Taller de Ed. Física (2 hs - Graneros Ignacio)"]], 
                  details: { 
                    id: "talleres-inicial-details", 
                    nombre: "Talleres Nivel Inicial", 
                    cargo: "Docentes de Talleres",
                    members: [
                      { id: "cruz-luciana-taller", nombre: "Cruz Luciana", cargo: "Taller de inglés (Contrato)", horas: 2 },
                      { id: "graneros-ignacio-taller", nombre: "Graneros Ignacio", cargo: "Taller de educación física (Contrato)", horas: 2 }
                    ]
                  }, 
                  children: [
                    { 
                      id: "docentes-talleres-inicial", 
                      rows: [
                        ["Docentes Talleres"], 
                        ["Pepe Alejandra (8,5 hs)"], 
                        ["Constanza Escalante (4,5 hs)"],
                        ["Sofía Valdivieso (4,5 hs)"]
                      ], 
                      details: { 
                        id: "docentes-talleres-inicial-details", 
                        nombre: "Docentes Talleres", 
                        cargo: "Nivel Inicial",
                        members: [
                          { id: "pepe-a-taller", nombre: "Pepe Alejandra", cargo: "Docente Taller", horas: 8.5 },
                          { id: "escalante-c-taller", nombre: "Constanza Escalante", cargo: "Docente Taller", horas: 4.5 },
                          { id: "valdivieso-s-taller", nombre: "Sofía Valdivieso", cargo: "Docente Taller", horas: 4.5 }
                        ]
                      } 
                    }
                  ] 
                }, 
                // --- PERSONAL DOCENTE (ARREGLO DE TURNO MAÑANA/TARDE) ---
                { 
                  id: "personal-docente-inicial", 
                  rows: [["Personal Docente"]], 
                  details: { id: "personal-docente-inicial-details", nombre: "Personal Docente", cargo: "Nivel Inicial" }, 
                  children: [
                    // --- NODO: MAESTRAS DE SALA ---
                    { 
                      id: "maestras-sala-inicial", 
                      rows: [ 
                        ["Maestras de Sala (Turno Mañana)"], 
                        ["COSENTINO LAURA (20 hs)", "LORD VALENTINA (20 hs)"],
                        ["PEPE ALEJANDRA (20 hs)", "FILGUEIRA JULIANA (20 hs)"],
                        ["LOBO VALLEJO V. (20 hs)", "REARTE JIMENA (20 hs)"],
                        ["JUEZ PEREZ V. (20 hs)", "VALDIVIESO SOFIA (20 hs)"],
                        ["Maestras de Sala (Turno Tarde)"],
                        ["TORRES EUGENIA (20 hs)", "AGUIRRE SOFÍA (20 hs)"],
                        ["MARTINA LOBO J. (20 hs)", "REARTE JIMENA (20 hs, Contrato)"],
                        ["NEVILLE CANDELARIA (20 hs)"],
                      ], 
                      details: { 
                        id: "maestras-sala-inicial-details", 
                        nombre: "Maestras de Sala", 
                        cargo: "Nivel Inicial (Turno Mañana y Tarde)",
                        members: [
                          { id: "cosentino-laura-sala", nombre: "COSENTINO LAURA", cargo: "Maestra de sala (Titular, TM)", horas: 20 },
                          { id: "lord-valentina", nombre: "LORD VALENTINA", cargo: "Maestra de sala (Titular, TM)", horas: 20 },
                          { id: "pepe-alejandra", nombre: "PEPE ALEJANDRA", cargo: "Maestra de sala (Titular, TM)", horas: 20 },
                          { id: "filgueira-juliana", nombre: "FILGUEIRA JULIANA", cargo: "Maestra de sala (Titular, TM)", horas: 20 },
                          { id: "lobo-vallejo-victoria", nombre: "LOBO VALLEJO VICTORIA", cargo: "Maestra de sala (Titular, TM)", horas: 20 },
                          { id: "rearte-jimena-sala-tm", nombre: "REARTE JIMENA", cargo: "Maestra de sala (Titular, TM)", horas: 20 },
                          { id: "juez-perez-valentina", nombre: "JUEZ PEREZ VALENTINA", cargo: "Maestra de sala (Titular, TM)", horas: 20 },
                          { id: "valdivieso-sofia", nombre: "VALDIVIESO SOFIA", cargo: "Maestra de sala (Titular, TM)", horas: 20 },
                          { id: "torres-eugenia-sala-tt", nombre: "TORRES EUGENIA", cargo: "Maestra de sala (Titular, TT)", horas: 20 },
                          { id: "aguirre-sofia", nombre: "AGUIRRE SOFÍ", cargo: "Maestra de sala (Titular, TT)", horas: 20 },
                          { id: "martina-lobo-juliana", nombre: "MARTINA LOBO JULIANA", cargo: "Maestra de sala (Titular, TT)", horas: 20 },
                          { id: "rearte-jimena-sala-tt", nombre: "REARTE JIMENA", cargo: "Maestra de sala (Contrato, TT)", horas: 20 },
                          { id: "neville-candelaria", nombre: "NEVILLE CANDELARIA", cargo: "Maestra de sala (Titular, TT)", horas: 20 },
                        ]
                      } 
                    }, 
                    // --- NODO: MAESTRAS ESPECIALES (Auxiliares y Coordinadores) ---
                    { 
                      id: "maestras-especiales-inicial", 
                      rows: [ 
                        ["Maestras Especiales"],
                        ["ESCALANTE CONSTANZA (20 hs, Aux TM)"],
                        ["PRADO CLARA (20 hs, Aux TM)"],
                        ["ROBLES MAGDALENA (20 hs, Aux TM)"],
                        ["TOMASSONI SOFIA (20 hs, Aux TM)"],
                        ["COLOMBRES PAULINA (20 hs, Aux TM)"],
                        ["RUIZ CAROLIN (20 hs, Aux TT)"],
                        ["FERREYRA MICAELA (20 hs, Aux TT)"],
                        ["AUDI FALÚ SUSANA (15 hs, Música TM)"],
                        ["ARCE MARIAN (7 hs, Música TT)"],
                        ["CAMANDNA RODOLFO (4 hs, EdF TM)"],
                        ["RUEDA LORENA (6 hs, EdF TM/TT)"],
                        ["GRANEROS IGNACIO (15 hs, EdF TM/TT)"],
                        ["ROMERO ADRIANA (12 hs, Inglés TM/TT)"],
                        ["LOPEZ ALURRALDE PIA (8 hs, Inglés TM)"],
                        // ¡CRUZ LUCIANA (Inglés TT) FUE MOVÍA A COORD. INGLÉS ARRIBA!
                      ], 
                      details: { 
                        id: "maestras-especiales-inicial-details", 
                        nombre: "Maestras Especiales (Auxiliares y Profesores)", 
                        cargo: "Nivel Inicial",
                        members: [
                          { id: "escalante-constanza", nombre: "ESCALANTE CONSTANZA", cargo: "Maestra auxiliar (Titular, TM)", horas: 20 },
                          { id: "prado-clara", nombre: "PRADO CLARA", cargo: "Maestra auxiliar (Titular, TM)", horas: 20 },
                          { id: "robles-magdalena", nombre: "ROBLES MAGDALENA", cargo: "Maestra auxiliar (Titular, TM)", horas: 20 },
                          { id: "tomassoni-sofia", nombre: "TOMASSONI SOFIA", cargo: "Maestra auxiliar (Titular, TM)", horas: 20 },
                          { id: "colombres-paulina", nombre: "COLOMBRES PAULINA", cargo: "Maestra auxiliar (Contrato, TM)", horas: 20 },
                          { id: "ruiz-carolina", nombre: "RUIZ CAROLIN", cargo: "Maestra auxiliar (Titular, TT)", horas: 20 },
                          { id: "ferreyra-micaela", nombre: "FERREYRA MICAELA", cargo: "Maestra auxiliar (Contrato, TT)", horas: 20 },
                          { id: "audi-falu-susana", nombre: "AUDI FALÚ SUSANA", cargo: "Maestra de música (Contrato, TM)", horas: 15 },
                          { id: "arce-mariana", nombre: "ARCE MARIAN", cargo: "Maestra de música (Titular, TT)", horas: 7 },
                          { id: "camandna-rodolfo", nombre: "CAMANDNA RODOLFO", cargo: "Profesor educ. física (Titular, TM)", horas: 4 },
                          { id: "rueda-lorena", nombre: "RUEDA LORENA", cargo: "Profesor educ. física (Titular, TM/TT)", horas: 6 },
                          { id: "graneros-ignacio-edfis", nombre: "GRANEROS IGNACIO", cargo: "Profesor educ. física (Titular, TM/TT)", horas: 15 },
                          { id: "romero-adriana", nombre: "ROMERO ADRIANA", cargo: "Maestra de inglés (Titular, TM/TT)", horas: 12 },
                          { id: "lopez-alurralde-pia", nombre: "LOPEZ ALURRALDE PIA", cargo: "Maestra de inglés (Titular, TM)", horas: 8 },
                          { id: "cruz-luciana-ingles", nombre: "CRUZ LUCIANA", cargo: "Maestra de inglés (Contrato, TT)", horas: 4 },
                        ]
                      } 
                    }, 
                    { 
                      id: "feyvida-inicial", 
                      rows: [["Fe y Vida"], ["(Dictan las docentes de sala)"]], 
                      details: { id: "feyvida-inicial-details", nombre: "Fe y Vida", cargo: "Nivel Inicial", descripcion: "Dictan las docentes de sala" } 
                    }
                  ] 
                } 
              ] 
            }
          ]
        },
        // --- NIVEL PRIMARIO ---
        {
  id: "nivel-primario",
  rows: [["Dirección Nivel Primario"], ["María Fátima Del Río (29 hs, Titular)"]],
  details: {
    id: "fatima-del-rio-primario",
    nombre: "María Fátima Del Río",
    cargo: "Directora General de Nivel Primario (Titular)",
    horas: 29,
  },
  children: [
    // --- SECRETARÍA ---
    {
      id: "sec-primario",
      rows: [["Secretaría de Nivel"], ["Estela Mónica Barrionuevo (22 hs, Titular)"]],
      details: {
        id: "secretaria-primario-details",
        nombre: "Secretaría de Nivel Primario",
        cargo: "Secretaria de Nivel",
        members: [
          { id: "barrionuevo-em", nombre: "Estela Mónica Barrionuevo", cargo: "Secretaria (Titular)", horas: 22 },
        ],
      },
    },

    // --- DOE ---
    {
      id: "doe-primario",
      rows: [
        ["DOE"],
        ["Psicóloga", "Psicopedagoga"],
        ["Paula Alonso (12 hs, Titular)", "María Fioretti (7,33 hs, Titular)"],
      ],
      details: {
        id: "doe-primario-details",
        nombre: "DOE Nivel Primario",
        cargo: "Departamento de Orientación Educativa",
        members: [
          { id: "alonso-mp", nombre: "María Paula Alonso", cargo: "Psicóloga (Titular)", horas: 12 },
          { id: "fioretti-m", nombre: "María Fioretti", cargo: "Psicopedagoga (Titular)", horas: 7.33 },
        ],
      },
    },

    // --- COORDINACIÓN INGLÉS ---
    {
      id: "coord-ingles-primario",
      rows: [["Coordinación Inglés"], ["María Emilia Franchini (10 hs, Titular)"]],
      details: {
        id: "coord-ingles-primario-details",
        nombre: "Coordinación Inglés",
        cargo: "Coordinadora y docente de Inglés (Titular)",
        members: [
          { id: "franchini-me", nombre: "María Emilia Franchini", cargo: "Coordinadora y Docente de Inglés (Titular)", horas: 10.66 },
        ],
      },
      children: [
        {
          id: "docentes-ingles-primario",
          rows: [
            ["Docentes de Inglés"],
            ["María Pía López Alurralde (10,66 hs, Titular)"],
            ["María Pía Rovarini (10,66 hs, Titular)"],
            ["Ana Lucía Rivarola (10,66 hs Titular + 5,33 hs Titular)"],
            ["Lucía López Alurralde (10,66 hs, Titular)"],
            ["Natalia Berdú (5,33 hs, Titular)"],
            ["María Eugenia Russo (10,66 hs, Titular)"],
            ["Fabiana Ovando (10,66 hs, Titular)"],
          ],
          details: {
            id: "docentes-ingles-primario-details",
            nombre: "Equipo Docente de Inglés",
            cargo: "Nivel Primario",
            members: [
              { id: "lopez-pia", nombre: "María Pía López Alurralde", cargo: "Maestra de inglés (Titular)", horas: 10.66 },
              { id: "rovarini-mp", nombre: "María Pía Rovarini", cargo: "Maestra de inglés (Titular)", horas: 10.66 },
              { id: "rivarola-al", nombre: "Ana Lucía Rivarola", cargo: "Maestra de inglés (Titular)", horas: 16 },
              { id: "lopez-lucia", nombre: "Lucía López Alurralde", cargo: "Maestra de inglés (Titular)", horas: 10.66 },
              { id: "berdu-n", nombre: "Natalia Berdú", cargo: "Maestra de inglés (Titular)", horas: 5.33 },
              { id: "russo-me", nombre: "María Eugenia Russo", cargo: "Maestra auxiliar de inglés (Titular)", horas: 10.66 },
              { id: "ovando-f", nombre: "Fabiana Ovando", cargo: "Maestra auxiliar de inglés (Titular)", horas: 10.66 },
            ],
          },
        },
      ],
    },

    // --- COORDINACIÓN EDUCACIÓN FÍSICA ---
    {
      id: "coord-edfisica-primario",
      rows: [["Coordinación Educación Física"], ["María Florencia Bravo (0,66 hs Coord. + 4,66 hs Docente)"]],
      details: {
        id: "coord-edfisica-primario-details",
        nombre: "Coordinación Educación Física",
        cargo: "Coordinadora y equipo docente",
        members: [
          { id: "bravo-mf", nombre: "María Florencia Bravo Antezana", cargo: "Coordinadora y maestra de Ed. Física", horas: 5.32 },
        ],
      },
      children: [
        {
          id: "docentes-edfisica-primario",
          rows: [
            ["Docentes de Educación Física"],
            ["Agustina Rojas (4,66 hs, Titular)"],
            ["Carina Celia Noemí Guerrero (4,66 hs, Titular)"],
            ["Ana Carolina Rigazzio (8 hs, Titular)"],
            ["Lorena Rueda (2 hs, Titular)"],
          ],
          details: {
            id: "docentes-edfisica-primario-details",
            nombre: "Equipo Docente Educación Física",
            cargo: "Nivel Primario",
            members: [
              { id: "rojas-a", nombre: "Agustina Rojas", cargo: "Maestra de Educación Física y hockey (Titular)", horas: 4.66 },
              { id: "guerrero-cc", nombre: "Carina Celia Noemí Guerrero", cargo: "Maestra de Educación Física (Titular)", horas: 4.66 },
              { id: "rigazzio-ac", nombre: "Ana Carolina Rigazzio", cargo: "Maestra de Educación Física y hockey (Titular)", horas: 8 },
              { id: "rueda-l", nombre: "Lorena Rueda", cargo: "Maestra de Educación Física y hockey (Titular)", horas: 2 },
            ],
          },
        },
      ],
    },

    // --- COORDINACIÓN FE Y VIDA ---
    {
      id: "coord-feyvida-primario",
      rows: [["Coordinación Fe y Vida Cristiana"], ["María Fátima Del Río (3 hs Coord.)"]],
      details: {
        id: "coord-feyvida-primario-details",
        nombre: "Coordinación Fe y Vida Cristiana",
        cargo: "Coordinadora y equipo docente",
        members: [
          { id: "del-rio-mf", nombre: "María Fátima Del Río", cargo: "Coordinadora de Fe y Vida Cristiana (Titular)", horas: 3 },
        ],
      },
      children: [
        {
          id: "docentes-feyvida-primario",
          rows: [
            ["Docentes de Fe y Vida"],
            ["Ana Cristina Lix Klett (4 hs, Titular)"],
            ["Andrea Lucía Navarro (8 hs, Titular)"],
            ["Laura Agüero Turbatti (12 hs, Titular)"],
          ],
          details: {
            id: "docentes-feyvida-primario-details",
            nombre: "Equipo Docente Fe y Vida",
            cargo: "Nivel Primario",
            members: [
              { id: "lix-ac", nombre: "Ana Cristina Lix Klett", cargo: "Maestra de Fe y Vida (Titular)", horas: 4 },
              { id: "navarro-al", nombre: "Andrea Lucía Navarro", cargo: "Maestra de Fe y Vida (Titular)", horas: 8 },
              { id: "aguero-tl", nombre: "Laura Agüero Turbatti", cargo: "Maestra de Fe y Vida (Titular)", horas: 12 },
            ],
          },
        },
      ],
    },

    // --- COORDINACIÓN MATEMÁTICAS ---
    {
      id: "coord-matematicas-primario",
      rows: [["Coordinación Matemáticas"], ["Consuelo Terán Nougués (3 hs Coord., 22 hs Docente)"]],
      details: {
        id: "coord-matematicas-primario-details",
        nombre: "Coordinación Matemáticas",
        cargo: "Coordinadora y equipo docente",
        members: [
          { id: "teran-c", nombre: "Consuelo Terán Nougués", cargo: "Coordinadora de matemáticas (Titular)", horas: 3 },
        ],
      },
      children: [
        {
          id: "docentes-matematicas-primario",
          rows: [
            ["Docentes de Matemáticas y Cs. Naturales"],
            ["María del Pilar Hernández (22 hs, Titular)"],
            ["Fabiana Beatriz Gómez (22 hs, Titular)"],
            ["María de las Mercedes Trejo (22 hs, Titular)"],
            ["Josefina Aguilar Frías Silva (22 hs, Titular)"],
            ["Carla Luciana Vega (22 hs, Titular)"],
          ],
          details: {
            id: "docentes-matematicas-primario-details",
            nombre: "Equipo Docente Matemáticas y Cs. Naturales",
            cargo: "Nivel Primario",
            members: [
              { id: "hernandez-mdp", nombre: "María del Pilar Hernández", cargo: "Maestra de matemáticas y cs. naturales (Titular)", horas: 22 },
              { id: "gomez-fb", nombre: "Fabiana Beatriz Gómez", cargo: "Maestra de matemáticas y cs. naturales (Titular)", horas: 22 },
              { id: "trejo-mm", nombre: "María de las Mercedes Trejo", cargo: "Maestra de matemáticas y cs. naturales (Titular)", horas: 22 },
              { id: "aguilar-js", nombre: "Josefina Aguilar Frías Silva", cargo: "Maestra de matemáticas y cs. naturales (Titular)", horas: 22 },
              { id: "vega-cl", nombre: "Carla Luciana Vega", cargo: "Maestra de matemáticas y cs. naturales (Titular)", horas: 22 },
            ],
          },
        },
      ],
    },

    // --- COORDINACIÓN LENGUA ---
    {
      id: "coord-lengua-primario",
      rows: [["Coordinación Lengua"], ["Viviana Sabina Valdez (3 hs Coord., 22 hs Docente)"]],
      details: {
        id: "coord-lengua-primario-details",
        nombre: "Coordinación Lengua",
        cargo: "Coordinadora y equipo docente",
        members: [
          { id: "valdez-vs", nombre: "Viviana Sabina Valdez", cargo: "Coordinadora de lengua (Titular)", horas: 3 },
        ],
      },
      children: [
        {
          id: "docentes-lengua-primario",
          rows: [
            ["Docentes de Lengua y Cs. Sociales"],
            ["Ana Inés Torino (22 hs, Titular)"],
            ["Cyntia Elizabeth Fernández (22 hs, Titular)"],
            ["María José Salas (22 hs, Titular)"],
            ["Gabriela Patricia Guzmán (22 hs, Titular)"],
            ["Claudia Edith Juárez (22 hs, Titular)"],
          ],
          details: {
            id: "docentes-lengua-primario-details",
            nombre: "Equipo Docente Lengua y Cs. Sociales",
            cargo: "Nivel Primario",
            members: [
              { id: "torino-ai", nombre: "Ana Inés Torino", cargo: "Maestra de lengua y cs. sociales (Titular)", horas: 22 },
              { id: "fernandez-ce", nombre: "Cyntia Elizabeth Fernández", cargo: "Maestra de lengua y cs. sociales (Titular)", horas: 22 },
              { id: "salas-mj", nombre: "María José Salas", cargo: "Maestra de lengua y cs. sociales (Titular)", horas: 22 },
              { id: "guzman-gp", nombre: "Gabriela Patricia Guzmán", cargo: "Maestra de lengua y cs. sociales (Titular)", horas: 22 },
              { id: "juarez-ce", nombre: "Claudia Edith Juárez", cargo: "Maestra de lengua y cs. sociales (Titular)", horas: 22 },
            ],
          },
        },
      ],
    },

    // --- MAESTRAS ESPECIALES ---
    {
      id: "maestras-especiales-primario",
      rows: [
        ["Maestras Especiales"],
        ["Florencia Terán (6,66 hs, Titular)"],
        ["Ana Lía Berno (1,33 hs, Titular)"],
        ["Josefina Sánchez (4 hs, Titular)"],
        ["Analía Pacheco (8 hs, Titular)"],
        ["Mariana Borkosky (12 hs, Titular)"],
        ["Silvina Mohamad (8 hs, Titular)"],
      ],
      details: {
        id: "maestras-especiales-primario-details",
        nombre: "Maestras Especiales",
        cargo: "Nivel Primario",
        members: [
          { id: "teran-f", nombre: "Florencia Terán", cargo: "Maestra de computación (Titular)", horas: 6.66 },
          { id: "berno-al", nombre: "Ana Lía Berno", cargo: "Maestra de computación (Titular)", horas: 1.33 },
          { id: "sanchez-j", nombre: "Josefina Sánchez", cargo: "Maestra de música (Titular)", horas: 4 },
          { id: "pacheco-a", nombre: "Analía Pacheco", cargo: "Maestra de música (Titular)", horas: 8 },
          { id: "borkosky-m", nombre: "Mariana Borkosky", cargo: "Maestra de plástica (Titular)", horas: 12 },
          { id: "mohamad-s", nombre: "Silvina Mohamad", cargo: "Maestra de tecnología (Titular)", horas: 8 },
        ],
      },
    },

    // --- PERSONAL AUXILIAR ---
    {
      id: "auxiliares-primario",
      rows: [
        ["Personal Auxiliar"],
        ["Estela Lastra (Docente Auxiliar - 22 hs)"],
        ["Adriana Alicia Campos (Docente Auxiliar y Auxiliar de Secretaría - 31hs)"],
      ],
      details: {
        id: "auxiliares-primario-details",
        nombre: "Personal Auxiliar",
        cargo: "Docentes auxiliares y de secretaría",
        members: [
          { id: "lastra-e", nombre: "Estela Lastra", cargo: "Docente Auxiliar", horas: 22 },
          { id: "campos-aa", nombre: "Adriana Alicia Campos", cargo: "Docente Auxiliar y Auxiliar de Secretaría", horas: 31 },
        ],
      },
    },
  ],
}
,

        
        // --- NIVEL SECUNDARIO ---
       {
  id: "nivel-secundario",
  rows: [["Dirección Nivel Secundario"], ["Cruz Prats Griet Lucia (28,67 hs, Titular)"]],
  details: {
    id: "cruz-prats",
    nombre: "Cruz Prats Griet Lucia",
    cargo: "Directora Nivel Secundario (Titular)",
    horas: 28.67,
  },
  children: [
    // --- DIRECTORA DE ESTUDIOS ---
    {
      id: "dir-estudios-secundario",
      rows: [["Directora de Estudios"], ["Gisela De Lafuente (10,67 hs, Titular)"]],
      details: {
        id: "gisela-de-lafuente",
        nombre: "Gisela De Lafuente",
        cargo: "Directora de Estudios (Titular)",
        horas: 10.67,
      },
      children: [
        // --- DOE ---
        {
          id: "doe-secundario",
          rows: [
            ["DOE"],
            ["Psicóloga", "Psicopedagoga"],
            ["Evangelina Mohamad (11,33 hs)", "Andrea Quiroga (6,67 hs)"],
          ],
          details: {
            id: "doe-secundario-details",
            nombre: "DOE Nivel Secundario",
            cargo: "Departamento de Orientación Educativa",
            members: [
              { id: "mohamad-evangelina", nombre: "Evangelina Mohamad", cargo: "Psicóloga (Titular)", horas: 11.33 },
              { id: "quiroga-andrea", nombre: "Andrea Quiroga", cargo: "Psicopedagoga (Titular)", horas: 6.67 },
            ],
          },
        },

        // --- SECRETARÍA ---
        {
          id: "sec-secundario",
          rows: [
            ["Secretaría de Nivel"],
            ["Eugenia Barrientos (25 hs)", "Ana Lía Berno (8 hs, Auxiliar)"],
          ],
          details: {
            id: "sec-secundario-details",
            nombre: "Secretaría Nivel Secundario",
            cargo: "Secretaria y auxiliar de secretaría",
            members: [
              { id: "barrientos-eugenia", nombre: "Eugenia Barrientos", cargo: "Secretaria de Nivel (Titular)", horas: 25 },
              { id: "berno-ana-lia", nombre: "Ana Lía Berno", cargo: "Auxiliar de Secretaría (Titular)", horas: 8 },
            ],
          },
        },

        // --- COORDINACIÓN INGLÉS ---
        {
          id: "coord-ingles-secundario",
          rows: [["Coordinación Inglés"], ["María José Puig (6 hs, Titular)"]],
          details: {
            id: "coord-ingles-secundario-details",
            nombre: "Coordinación Inglés",
            cargo: "Coordinadora del área de Inglés",
            members: [
              { id: "puig-maria-jose", nombre: "María José Puig", cargo: "Coordinadora de Inglés (Titular)", horas: 6 },
            ],
          },
          children: [
            {
              id: "docentes-ingles-secundario",
              rows: [
                ["Docentes Inglés"],
                ["María José Puig (14 hs)", "Lucía Molinelli (10,67 hs)"],
                ["Josefina García González (14,67 hs)", "María Méndez Terán (7,33 hs)"],
              ],
              details: {
                id: "docentes-ingles-secundario-details",
                nombre: "Docentes Inglés",
                cargo: "Profesores de inglés",
                members: [
                  { id: "puig-maria-jose-d", nombre: "María José Puig", cargo: "Docente de Inglés", horas: 14 },
                  { id: "molinelli-lucia", nombre: "Lucía Molinelli", cargo: "Docente de Inglés", horas: 10.67 },
                  { id: "garcia-josefina", nombre: "Josefina García González", cargo: "Docente de Inglés", horas: 14.67 },
                  { id: "mendez-teran-maria", nombre: "María Méndez Terán", cargo: "Docente de Inglés", horas: 7.33 },
                ],
              },
            },
          ],
        },

        // --- COORDINACIÓN EDUCACIÓN FÍSICA ---
        {
          id: "coord-edfisica-secundario",
          rows: [["Coordinación Educación Física"], ["María Florencia Bravo Antezana (1,33 hs, Titular)"]],
          details: {
            id: "coord-edfisica-secundario-details",
            nombre: "Coordinación Educación Física",
            cargo: "Coordinadora del área de Educación Física",
            members: [
              { id: "bravo-antezana-mf", nombre: "María Florencia Bravo Antezana", cargo: "Coordinadora de Ed. Física", horas: 1.33 },
            ],
          },
          children: [
            {
              id: "docentes-edfisica-secundario",
              rows: [
                ["Docentes Educación Física"],
                ["María Florencia Bravo Antezana (4 hs)", "Agustina Rojas (10 hs)"],
                ["Lorena Rueda (8 hs)", "Carina Guerrero (2 hs)"],
              ],
              details: {
                id: "docentes-edfisica-secundario-details",
                nombre: "Docentes Educación Física",
                cargo: "Profesores de Educación Física",
                members: [
                  { id: "bravo-antezana-mf2", nombre: "María Florencia Bravo Antezana", cargo: "Docente Ed. Física", horas: 4 },
                  { id: "rojas-agustina", nombre: "Agustina Rojas", cargo: "Docente Ed. Física y Hockey", horas: 10 },
                  { id: "rueda-lorena", nombre: "Lorena Rueda", cargo: "Docente Ed. Física y Hockey", horas: 8 },
                  { id: "guerrero-carina", nombre: "Carina Guerrero", cargo: "Docente Ed. Física", horas: 2 },
                ],
              },
            },
          ],
        },

        // --- COORDINACIÓN FE Y VIDA ---
        {
          id: "coord-feyvida-secundario",
          rows: [["Coordinación Fe y Vida"], ["Ercilia Salas (3,33 hs, Titular)"]],
          details: {
            id: "coord-feyvida-secundario-details",
            nombre: "Coordinación Fe y Vida",
            cargo: "Coordinadora del área de Fe y Vida",
            members: [
              { id: "salas-ercilia", nombre: "Ercilia Salas", cargo: "Coordinadora Fe y Vida", horas: 3.33 },
            ],
          },
          children: [
            {
              id: "docentes-feyvida-secundario",
              rows: [
                ["Docentes Fe y Vida"],
                ["Ercilia Salas (4 hs)", "Gisela De Lafuente (4 hs)"],
                ["Gregoria Masegosa (4 hs)", "María Virginia Eroles (6,67 hs)"],
                ["María de la Paz Méndez (4 hs)"],
              ],
              details: {
                id: "docentes-feyvida-secundario-details",
                nombre: "Docentes Fe y Vida",
                cargo: "Profesores del área Fe y Vida",
                members: [
                  { id: "salas-ercilia-doc", nombre: "Ercilia Salas", cargo: "Docente Fe y Vida", horas: 4 },
                  { id: "de-lafuente-gisela", nombre: "Gisela De Lafuente", cargo: "Docente Fe y Vida", horas: 4 },
                  { id: "masegosa-gregoria", nombre: "Gregoria Masegosa", cargo: "Docente Fe y Vida", horas: 4 },
                  { id: "eroles-virginia", nombre: "María Virginia Eroles", cargo: "Docente Fe y Vida", horas: 2.67 },
                  { id: "mendez-paz", nombre: "María de la Paz Méndez", cargo: "Docente Fe y Vida", horas: 4 },
                ],
              },
            },
          ],
        },

        // --- COORDINACIÓN TUTORÍAS ---
        {
          id: "coord-tutorias-secundario",
          rows: [["Coordinación Tutorías"], ["Evangelina Mohamad (Titular)"]],
          details: {
            id: "coord-tutorias-secundario-details",
            nombre: "Coordinación Tutorías",
            cargo: "Responsable del área de Tutorías",
            members: [
              { id: "mohamad-evangelina-tut", nombre: "Evangelina Mohamad", cargo: "Coordinadora de Tutorías" },
            ],
          },
          children: [
            {
              id: "tutoras-secundario",
              rows: [
                ["Tutoras"],
                ["Gisela De Lafuente (6,67 hs)", "María Ercilia Salas (5,33 hs)"],
                ["Josefina García González (8,67 hs)", "Carina Celia Guerrero (4 hs)"],
                ["Ana Lía Berno (7,33 hs)", "María V. Eroles (6 hs)"],
                ["María J. Puig (3,33 hs)", "Natalia Gioia (5,33 hs)"],
                ["Cynthia Nieva (2 hs)", "Florencia Terán (8 hs)"],
                ["María de la Paz Méndez (2,67 hs)", "Lucía Molinelli (2,67 hs)"],
              ],
              details: {
                id: "tutoras-secundario-details",
                nombre: "Tutoras",
                cargo: "Equipo de tutorías",
                members: [
                  { id: "lafuente-gisela-tut", nombre: "Gisela De Lafuente", cargo: "Tutora", horas: 6.67 },
                  { id: "salas-ercilia-tut", nombre: "María Ercilia Salas", cargo: "Tutora", horas: 5.33 },
                  { id: "garcia-gonzalez-j", nombre: "Josefina García González", cargo: "Tutora", horas: 8.67 },
                  { id: "guerrero-carina-tut", nombre: "Carina Celia Guerrero", cargo: "Tutora", horas: 4 },
                  { id: "berno-ana-tut", nombre: "Ana Lía Berno", cargo: "Tutora", horas: 7.33 },
                  { id: "eroles-virginia-tut", nombre: "María Virginia Eroles", cargo: "Tutora", horas: 6 },
                  { id: "puig-maria-jose-tut", nombre: "María José Puig", cargo: "Tutora", horas: 3.33 },
                  { id: "gioia-natalia-tut", nombre: "Natalia Gioia", cargo: "Tutora", horas: 5.33 },
                  { id: "nieva-cynthia-tut", nombre: "Cynthia Nieva", cargo: "Tutora", horas: 2 },
                  { id: "teran-florencia-tut", nombre: "Florencia Terán", cargo: "Tutora", horas: 8 },
                  { id: "mendez-teran-mdp", nombre: "María de la Paz Méndez", cargo: "Tutora", horas: 2.67 },
                  { id: "molinelli-lucia-tut", nombre: "Lucía Molinelli", cargo: "Tutora", horas: 2.67 },
                ],
              },
            },
          ],
        },

        // --- PECS ---
        {
          id: "pecs-secundario",
          rows: [["PECS"], ["(sin coordinación)"]],
          details: {
            id: "pecs-secundario-details",
            nombre: "PECS",
            cargo: "PECS (sin coordinación)",
          },
          children: [
            {
              id: "preceptoras-secundario",
              rows: [
                ["Preceptoras"],
                ["María Eugenia Aid (32 hs)", "Florencia Coggan (32 hs)"],
                ["María José Terán (32 hs)"],
              ],
              details: {
                id: "preceptoras-secundario-details",
                nombre: "Preceptoras",
                cargo: "Equipo de preceptoras",
                members: [
                  { id: "aid-maria-eugenia", nombre: "María Eugenia Aid", cargo: "Preceptora", horas: 32 },
                  { id: "coggan-florencia", nombre: "Florencia Coggan", cargo: "Preceptora", horas: 32 },
                  { id: "teran-maria-jose", nombre: "María José Terán", cargo: "Preceptora", horas: 32 },
                ],
              },
            },
          ],
        },

        // --- PERSONAL DOCENTE HUMANÍSTICAS ---
        {
  id: "personal-docente-secundario-humanas",
  rows: [
    ["Personal Docente – Áreas Humanísticas"],
    ["Pamela Arias (19,33 hs)", "Martina Colombres (5,33 hs)"],
    ["Paula Migliavacca (5,33 hs)", "Paola Arena (6 hs)"],
    ["Natalia Gioia (22,67 hs)", "María Silvia Villagra (12 hs)"],
    ["Mariana Borkosky (2 hs)", "Silvina Mohamad (6 hs)"],
    ["María Virginia Eroles (3,33 hs)"],
  ["Rosario Ávila Gallo (6 hs)", "Agustina Cazón (6,67 hs)"],
  ["Carolina Costas (9,33 hs)", "Magalí Cruzado (22,66 hs)"],
  ["Lourdes Fuentes (8 hs)"], // ⬅️ agregada
  ],
  details: {
    id: "personal-docente-secundario-humanas-details",
    nombre: "Personal Docente – Áreas Humanísticas",
    cargo: "Lengua, Historia, Ética, Política, Arte",
    members: [
      { id: "arias-pamela", nombre: "Pamela Arias", cargo: "Lengua", horas: 19.33 },
      { id: "colombres-martina", nombre: "Martina Colombres", cargo: "Lengua", horas: 5.33 },
      { id: "migliavacca-paula", nombre: "Paula Migliavacca", cargo: "Lengua", horas: 5.33 },
      { id: "arena-paola", nombre: "Paola Arena", cargo: "Historia", horas: 6 },
      { id: "gioia-natalia", nombre: "Natalia Gioia", cargo: "Ética e Historia", horas: 22.67 },
      { id: "villagra-maria", nombre: "María Silvia Villagra", cargo: "Política", horas: 12 },
      { id: "borkosky-mariana", nombre: "Mariana Borkosky", cargo: "Arte", horas: 2 },
      { id: "mohamad-silvina", nombre: "Silvina Mohamad", cargo: "Arte", horas: 6 },
      { id: "eroles-virginia-humanas", nombre: "María Virginia Eroles", cargo: "Lengua y Ética", horas: 3.33 },
      { id: "avila-rosario", nombre: "Rosario Ávila Gallo", cargo: "Lengua", horas: 6 },
{ id: "cazon-agustina", nombre: "Agustina Cazón", cargo: "Lengua", horas: 6.67 },
{ id: "costas-carolina", nombre: "Carolina Costas", cargo: "Historia", horas: 9.33 },
{ id: "cruzado-magali", nombre: "Magalí Cruzado", cargo: "Lengua y Ética", horas: 22.66 },
{ id: "fuentes-lourdes", nombre: "Lourdes Fuentes", cargo: "Arte", horas: 8 },
 // ⬅️ nueva línea
    ],
  },
},


        // --- PERSONAL DOCENTE CIENTÍFICAS / TÉCNICAS ---
        {
  id: "personal-docente-secundario-ciencias",
  rows: [
    ["Personal Docente – Áreas Científicas / Técnicas"],
    ["Cruz Prats Griet (3,33 hs)", "Bettina Gómez (17,33 hs)"],
    ["Carla Marengo (15,33 hs)", "Ana Belén Reynoso (6,67 hs)"],
    ["Silvana Toffoletti (6 hs)", "Lucía Auad (14 hs)"],
    ["María Laura Pérez (4 hs)", "Ana Lía Berno (8,67 hs)"],
    ["Florencia Terán (4 hs)", "Cynthia Nieva (11,33 hs)"],
    ["Gisela De Lafuente (4 hs)", "Josefina Diez (5,33 hs)"], // ⬅️ horas actualizadas
    ["María Ercilia Salas (11,33 hs)", "Gregoria Masegosa (4 hs)"],
    ["Constanza Natale (3,33 hs)"],
 // ⬅️ nuevas incorporaciones
  ],
  details: {
    id: "personal-docente-secundario-ciencias-details",
    nombre: "Personal Docente – Áreas Científicas / Técnicas",
    cargo: "Matemática, Ciencias, Tecnología, Economía",
    members: [
      { id: "cruz-prats-griet", nombre: "Griet Cruz Prats", cargo: "Matemática", horas: 3.33 },
      { id: "gomez-bettina", nombre: "Bettina Gómez", cargo: "Matemática y Física", horas: 17.33 },
      { id: "marengo-carla", nombre: "Carla Marengo", cargo: "Matemática", horas: 15.33 },
      { id: "reynoso-ana", nombre: "Ana Belén Reynoso", cargo: "Matemática", horas: 6.67 },
      { id: "toffoletti-silvana", nombre: "Silvana Toffoletti", cargo: "Matemática", horas: 6 },
      { id: "auad-lucia", nombre: "Lucía Auad", cargo: "Biología, Salud y Química", horas: 14 },
      { id: "perez-laura", nombre: "María Laura Pérez", cargo: "Biología y Salud", horas: 4 },
      { id: "berno-ana-lia", nombre: "Ana Lía Berno", cargo: "Tecnología", horas: 8.67 },
      { id: "teran-florencia", nombre: "Florencia Terán", cargo: "TIC", horas: 4 },
      { id: "nieva-cynthia", nombre: "Cynthia Nieva", cargo: "Administración y SIC", horas: 11.33 },
      { id: "de-lafuente-gisela-eco", nombre: "Gisela De Lafuente", cargo: "Economía", horas: 4 }, // ⬅️ actualizada
      { id: "diez-josefina", nombre: "Josefina Diez", cargo: "Profesora (Científico-Técnico)", horas: 5.33 },
      { id: "salas-ercilia-ciencias", nombre: "María Ercilia Salas", cargo: "Ciencias Sociales / Técnicas", horas: 11.33 }, // ⬅️ nueva
      { id: "masegosa-gregoria-ciencias", nombre: "Gregoria Masegosa", cargo: "Ciencias Sociales / Técnicas", horas: 4 },
      { id: "natale-constanza", nombre: "Constanza Natale", cargo: "Matemática", horas: 3.33 },
 // ⬅️ nueva
    ],
  },
},

      ],
    },
  ],
}
,




      ]
    },

    // --- 2. BRAZO DERECHO (ÁREAS DE GESTIÓN Y FAMILIA) ---
    {
      id: "grupo-areas",
      rows: [["ÁREAS TRANSVERSALES"]],
      details: {id: 'brazo-der-details', nombre: 'ÁREAS TRANSVERSALES', cargo: 'Agrupador de áreas'},
      children: [
        // --- ÁREA LEGAL ---
        {
          id: "legal",
          rows: [["Área Legal (Polo)"], ["Dra. Clara García Castellanos (15 hs - Tercerizada)"]],
          details: { id: "clara-garcia", nombre: "Dra. Clara García Castellanos", cargo: "Asesoría Legal (Tercerizada)", horas: 15, descripcion: "Servicio de asesoramiento legal externo, con 15 horas semanales." },
        },
        // --- ÁREAS DE FAMILIA/SOCIALES ---
        {
  id: "area-familia-polo",
  rows: [
    ["Área Familia, Comunicación y Postulaciones (Polo)"],
    ["María Marta Rojas (31 hs)", "María Eugenia Martín (5 hs)"],
    ["Felicitas Del Frari (29 hs)", "Agostina García Castro (20 hs)"],
    ["Constanza Lavergne (10 hs)"]
    ],
  details: {
    id: "area-familia-polo-details",
    nombre: "Área Familia, Comunicación y Postulaciones (Polo)",
    cargo: "Equipo unificado del Polo",
    members: [
      { id: "maria-marta-rojas", nombre: "María Marta Rojas", cargo: "Directora Área Familia (Polo)", horas: 31 },
      { id: "maria-eugenia-martin", nombre: "María Eugenia Martín", cargo: "Colaboradora Área Familia (Polo)", horas: 5 },
      { id: "felicitas-del-frari", nombre: "Felicitas Del Frari", cargo: "Responsable de Postulaciones (Polo)", horas: 29 },
      { id: "agostina-garcia", nombre: "Agostina García Castro", cargo: "Comunicación y Promoción (Polo)", horas: 20 },
      { id: "constanza-lavergne", nombre: "Constanza Lavergne", cargo: "(Polo)", horas: 10 }
    ]
  }
},



        {
  id: "capellanes",
  rows: [
    ["Capellanía"],
    ["Jesús Galindo Bustos (31 hs, Polo)"],
    ["Andrej Rant (31 hs, Polo)"],
    ["Pedro Lobo (8 hs, Jardín Los Cerritos)"]
  ],
  details: {
    id: "capellanes-equipo",
    nombre: "Equipo de Capellanía",
    cargo: "Formación espiritual y acompañamiento",
    members: [
      { id: "galindo-jesus", nombre: "Jesús Galindo Bustos", cargo: "Capellán (Polo)", horas: 31 },
      { id: "rant-andrej", nombre: "Andrej Rant", cargo: "Capellán (Polo)", horas: 31 },
      { id: "lobo-pedro", nombre: "Pedro Lobo Zavalia", cargo: "Capellán (Jardín Los Cerritos)", horas: 8 }
    ]
  }
}
,
        

       
       {
  id: "recepcion",
  rows: [
    ["Recepción"],
    ["Pía Heguy (27 hs)"],
    ["Mercedes Araoz Teran (6 hs)"],
    ["Felicitas Del Frari (5 hs)"]
  ],
  details: {
    id: "recepcion-equipo",
    nombre: "Equipo de Recepción",
    cargo: "Atención y soporte institucional",
    members: [
      { id: "pia-heguy", nombre: "Pía Heguy", cargo: "Recepción", horas: 27 },
      { id: "mercedes-araoz", nombre: "Mercedes Araoz Teran", cargo: "Recepción", horas: 6 },
      { id: "felicitas-del-frari", nombre: "Felicitas Del Frari", cargo: "Recepción", horas: 5 }
    ]
  }
}
,

        {
          id: "area-admin",
          rows: [["Administración (Polo)"], ["Cristina Navarro Zaldarriaga (34 hs)"]],
          details: { 
            id: "cristina-navarro", 
            nombre: "Cristina Navarro Zaldarriaga", 
            cargo: "Administración",
            horas: 34
          },
          children: [
            { id: "facturacion", rows: [["Facturacion y Cobranzas"], ["Virginia Melhen (6 hs)", "Mercedes Garcia Posse (34 hs)", "Victoria Morano (8 hs - Tercerizada)"]], details: { id: "facturacion-equipo", nombre: "Facturación y Cobranzas", cargo: "Equipo", members: [ { id: "virginia-m", nombre: "Virginia Melhen", cargo: "", horas: 6 }, { id: "mercedes-gp", nombre: "Mercedes Garcia Posse", cargo: "", horas: 34 }, { id: "victoria-m", nombre: "Victoria Morano", cargo: "Facturación tercerizada", horas: 8 } ] }, },
            { id: "contabilidad", rows: [["Contabilidad y Tesoreria"], ["Cristina Zottoli Z. (25 hs)", "Virginia Melhen (34 hs)"]], details: { id: "contabilidad-equipo", nombre: "Contabilidad y Tesoreria", cargo: "Equipo", members: [ { id: "cristina-z", nombre: "Cristina Zottoli Z.", cargo: "", horas: 25 }, { id: "virginia-m-2", nombre: "Virginia Melhen", cargo: "", horas: 34 } ] }, },
        // --- ÁREA DE ADMINISTRACIÓN (COMPLETA Y CORREGIDA) ---
            { id: "rrhh", rows: [["RRHH"], ["Dolores Kaese (34 hs)", "Guillermina Conti (34 hs)"]], details: { id: "rrhh-equipo", nombre: "RRHH", cargo: "Equipo", members: [ { id: "dolores-k", nombre: "Dolores Kaese", cargo: "", horas: 34 }, { id: "guillermina-c", nombre: "Guillermina Conti", cargo: "", horas: 34 } ] }, },
            { id: "mantenimiento", rows: [["Mantenimiento, Op. y Ss."], ["Juan Pablo Varela (34 hs)", "Bernardo Bott (24,5 hs)"]], details: { id: "mantenimiento-equipo", nombre: "Mantenimiento, Op. y Ss.", cargo: "Equipo", members: [ { id: "juan-v", nombre: "Juan Pablo Varela", cargo: "", horas: 34 }, { id: "bernardo-b", nombre: "Bernardo Bott", cargo: "", horas: 24.5 } ] }, },
            { id: "limpieza", rows: [ ["Limpieza"], ["(Lastenia Kaese 15 hs supervisora Tercerizada)"], ["Fidel Rojas (46.5 hs)", " Bernardo Bott (22 hs)", "Carolina Fernandez (46.5 hs)", "Ariel Ruiz (46.5 hs)"], ["Francisco Diaz (31 hs)", "Sabina Moyano (45 hs)", "Susana Bazan (37 hs)", "Fernando Rodriguez (31 hs)"] ], details: { id: "limpieza-equipo", nombre: "Limpieza", cargo: "Equipo de Limpieza", members: [ { id: "lastenia-k", nombre: "Lastenia Kaese", cargo: "Supervisora tercerizada", horas: 15 }, { id: "fidel-r", nombre: "Fidel Rojas", cargo: "Personal", horas: 46.5 }, { id: "bernardo-b-2", nombre: "Bernardo Bott", cargo: "Personal", horas: 22 }, { id: "carolina-f", nombre: "Carolina Fernandez", cargo: "Personal", horas: 46.5 }, { id: "ariel-r", nombre: "Ariel Ruiz", cargo: "Personal", horas: 46.5 }, { id: "francisco-d", nombre: "Francisco Diaz", cargo: "Personal", horas: 31 }, { id: "sabina-m", nombre: "Sabina Moyano", cargo: "Personal", horas: 45 }, { id: "susana-b", nombre: "Susana Bazan", cargo: "Personal", horas: 37 }, { id: "fernando-r", nombre: "Fernando Rodriguez", cargo: "Personal", horas: 31 } ] }, },
          ]
        },
      ]
    },
  ],
};