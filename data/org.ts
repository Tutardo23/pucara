import type { OrgNode } from "@/types/org";

export const orgData: OrgNode = {
  id: "consejo",
  rows: [
    ["CONSEJO DE DIRECCION"],
    ["Representante Legal"],
    ["Teresita María Molina"],
    ["Fátima Del Río", "Maria Eugenia Martín (Polo)"],
  ],
  details: {
    id: "consejo-details",
    nombre: "Consejo de Dirección",
    cargo: "Equipo de Dirección Colegiado",
    members: [
      { id: "teresita-m", nombre: "Teresita María Molina", cargo: "Rep. Legal", horas: 40 },
      { id: "fatima-dr", nombre: "Fátima Del Río", cargo: "Miembro", horas: 20 },
      { id: "maria-em", nombre: "Maria Eugenia Martín (Polo)", cargo: "Miembro", horas: 20 },
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
        // --- NODO TALLER (ESTRUCTURA FINAL Y CORREGIDA) ---
        {
          id: "taller",
          // Coordinadora en la caja principal (sin horas)
          rows: [
            ["TALLER DE INGLÉS"],
            ["Coordinadora"],
            ["Prof. Laura Lazarte"], 
          ], 
          details: { 
            id: "taller-info", 
            nombre: "Taller de Inglés", 
            cargo: "Coordinadora: Prof. Laura Lazarte (9 hs - Contratada)",
            descripcion: "El Taller de Inglés inició el Ciclo Lectivo 2025 con 9 niveles.",
            members: [ // Solo el detalle de la Coordinadora
              {
                id: "laura-lazarte",
                nombre: "Prof. Laura Lazarte", 
                cargo: "Coordinadora Taller de Inglés (Contratada)", 
                horas: 9, 
                descripcion: "Coordinar docentes, supervisar clases, material y evaluaciones. Atención a padres y alumnas. Organizar campamento y Concert (en conjunto con la coordinadora del Colegio Pucara). Evaluar y preparar a alumnas que rinden Examen Internacional de Cambridge."
              },
            ],
          },
          children: [
            // --- 1. SECRETARÍA (Hija Directa) ---
            {
              id: "secretaria-taller",
              rows: [["Secretaria Taller"], ["Mercedes Araoz Teran"]], // Secretaría en caja separada (sin horas)
              details: {
                id: "mercedes-araoz",
                nombre: "Mercedes Araoz Teran",
                cargo: "Secretaria (Contratada)",
                horas: 6, // Horas aquí
                descripcion: "Control de asistencia de docentes y alumnas. Atención de padres y alumnos."
              },
            },
            // --- 2. GRUPO DOCENTE (CONSOLIDADO) ---
            {
              id: "docentes-taller-grupo",
              // Lista de docentes consolidada y simplificada (sin grados ni horas)
              rows: [
                ["Cuerpo Docente Taller"],
                ["Prof. Florencia Salas"],
                ["Prof. Karina Correa"],
                ["Prof. Luciana Cruz"],
                ["Prof. Sofia Filippini"],
                ["Prof. Natalia Agüero"],
                ["Prof. Lucia Rivarola"],
                ["Prof. Iris Torres"],
              ],
              details: {
                id: "docentes-taller-details",
                nombre: "Cuerpo Docente Taller de Inglés",
                cargo: "Docentes Contratados",
                descripcion: "Listado completo de docentes del taller con sus horas y grados asignados:",
                members: [ // Full details con horas y grados
                  { id: "florencia-salas", nombre: "Prof. Florencia Salas", cargo: "Docente 1º grado (Contratada)", horas: 6 },
                  { id: "karina-correa", nombre: "Prof. Karina Correa", cargo: "Docente 2º grado (Contratada)", horas: 6 },
                  { id: "luciana-cruz", nombre: "Prof. Luciana Cruz", cargo: "Docente 3º grado (Contratada)", horas: 6 },
                  { id: "sofia-filippini", nombre: "Prof. Sofia Filippini", cargo: "Docente 4º grado (Contratada)", horas: 6 },
                  { id: "natalia-aguero", nombre: "Prof. Natalia Agüero", cargo: "Docente 5º grado (Contratada)", horas: 6 },
                  { id: "lucia-rivarola", nombre: "Prof. Lucia Rivarola", cargo: "Docente 6º grado (Reemplazante)", horas: 6, note: "Reemplaza a Mercedes Fernandez (Licencia)" },
                  { id: "mercedes-f-lic", nombre: "Prof. Mercedes Fernandez", cargo: "Docente 6º grado (Licencia)", horas: 6 },
                  { id: "iris-torres", nombre: "Prof. Iris Torres", cargo: "Docente 2º Año Secundario (Contratada)", horas: 3 },
                ]
              },
              children: [] 
            }
          ]
        },
        // --- NIVEL INICIAL ---
        {
          id: "nivel-inicial",
          rows: [["Dirección Nivel Inicial"], ["Gabriela Ortega"]],
          details: { id: "gabriela-ortega", nombre: "Gabriela Ortega", cargo: "Directora Nivel Inicial", horas: 40 },
          children: [ 
            { id: "asesor-pedagogico-inicial", rows: [["Asesor pedagogico"]], details: { id: "asesor-pedagogico-inicial-details", nombre: "Asesor Pedagógico", cargo: "Nivel Inicial" } },
            { id: "sec-inicial", rows: [["Secretaria de Nivel"], ["Pía Haddad"]], details: { id: "pia-haddad", nombre: "Pía Haddad", cargo: "Secretaria Nivel Inicial" } },
            { id: "coord-inicial", rows: [["Coordinación"], ["Turno Mañana", "Turno Tarde"]], details: { id: "coord-inicial-details", nombre: "Coordinación Nivel Inicial", cargo: "Coordinación" }, children: [ { id: "coord-ingles-inicial", rows: [["Coordinación Inglés"]], details: { id: "coord-ingles-inicial-details", nombre: "Coordinación Inglés", cargo: "Nivel Inicial" }, children: [{ id: "docentes-ingles-inicial", rows: [["Docentes Inglés"]], details: { id: "docentes-ingles-inicial-details", nombre: "Docentes Inglés", cargo: "Nivel Inicial" } }] }, { id: "talleres-inicial", rows: [["Talleres"]], details: { id: "talleres-inicial-details", nombre: "Talleres", cargo: "Nivel Inicial" }, children: [{ id: "docentes-talleres-inicial", rows: [["Docentes"]], details: { id: "docentes-talleres-inicial-details", nombre: "Docentes Talleres", cargo: "Nivel Inicial" } }] }, { id: "personal-docente-inicial", rows: [["Personal Docente"]], details: { id: "personal-docente-inicial-details", nombre: "Personal Docente", cargo: "Nivel Inicial" }, children: [{ id: "maestras-sala-inicial", rows: [["Maestras de Sala"]], details: { id: "maestras-sala-inicial-details", nombre: "Maestras de Sala", cargo: "Nivel Inicial" } }, { id: "maestras-especiales-inicial", rows: [["Maestras Especiales"]], details: { id: "maestras-especiales-inicial-details", nombre: "Maestras Especiales", cargo: "Nivel Inicial" } }, { id: "feyvida-inicial", rows: [["Fe y Vida"]], details: { id: "feyvida-inicial-details", nombre: "Fe y Vida", cargo: "Nivel Inicial" } }] } ] }
          ]
        },
        // --- NIVEL PRIMARIO ---
        {
          id: "nivel-primario",
          rows: [["Director Nivel Primario"], ["Fátima Del Rio"]],
          details: { id: "fatima-del-rio-primario", nombre: "Fátima Del Rio", cargo: "Directora Nivel Primario", horas: 40 },
          children: [
            { id: "doe-primario", rows: [["DOE"], ["Psicólogas"]], details: { id: "doe-primario-details", nombre: "DOE Nivel Primario", cargo: "Psicólogas" } },
            { id: "sec-primario", rows: [["Secretaria de Nivel"], ["Monica Barrionuevo"]], details: { id: "monica-barrionuevo", nombre: "Monica Barrionuevo", cargo: "Secretaria Nivel Primario" } },
            { id: "coord-ingles-primario", rows: [["Coodinación Inglés"]], details: { id: "coord-ingles-primario-details", nombre: "Coordinación Inglés", cargo: "Nivel Primario" }, children: [{ id: "docentes-ingles-primario", rows: [["Docentes Inglés"]], details: { id: "docentes-ingles-primario-details", nombre: "Docentes Inglés", cargo: "Nivel Primario" } }] },
            { id: "coord-edfisica-primario", rows: [["Coordinación Educación Física"]], details: { id: "coord-edfisica-primario-details", nombre: "Coordinación Educación Física", cargo: "Nivel Primario" }, children: [{ id: "docentes-edfisica-primario", rows: [["Docentes"]], details: { id: "docentes-edfisica-primario-details", nombre: "Docentes Educación Física", cargo: "Nivel Primario" } }] },
            { id: "coord-feyvida-primario", rows: [["Coordinación Fe y Vida"]], details: { id: "coord-feyvida-primario-details", nombre: "Coordinación Fe y Vida", cargo: "Nivel Primario" }, children: [{ id: "docentes-feyvida-primario", rows: [["Docentes"]], details: { id: "docentes-feyvida-primario-details", nombre: "Docentes Fe y Vida", cargo: "Nivel Primario" } }] },
            { id: "coord-matematicas-primario", rows: [["Coordinación Matemáticas"]], details: { id: "coord-matematicas-primario-details", nombre: "Coordinación Matemáticas", cargo: "Nivel Primario" } },
            { id: "coord-lengua-primario", rows: [["Coordinación Lengua"]], details: { id: "coord-lengua-primario-details", nombre: "Coordinación Lengua", cargo: "Nivel Primario" }, children: [{ id: "docentes-lengua-primario", rows: [["Docentes"]], details: { id: "docentes-lengua-primario-details", nombre: "Docentes Lengua", cargo: "Nivel Primario" } }] },
            { id: "maestras-grado-primario", rows: [["Maestras de grado"]], details: { id: "maestras-grado-primario-details", nombre: "Maestras de grado", cargo: "Nivel Primario" }, children: [{ id: "docentes-grado-primario", rows: [["Docentes"]], details: { id: "docentes-grado-primario-details", nombre: "Docentes de Grado", cargo: "Nivel Primario" } }] },
            { id: "maestras-especiales-primario", rows: [["Maestras Especiales"]], details: { id: "maestras-especiales-primario-details", nombre: "Maestras Especiales", cargo: "Nivel Primario" }, children: [{ id: "docentes-especiales-primario", rows: [["Docentes"]], details: { id: "docentes-especiales-primario-details", nombre: "Docentes Especiales", cargo: "Nivel Primario" } }] },
          ]
        },
        
        // --- NIVEL SECUNDARIO (COMPLETO) ---
        {
          id: "nivel-secundario",
          rows: [["Director Nivel Secundario"], ["Cruz Prats Griet Lucia"]],
          details: { id: "cruz-prats", nombre: "Cruz Prats Griet Lucia", cargo: "Directora Nivel Secundario", horas: 40 },
          children: [ 
            {
              id: "doe-secundario",
              rows: [["DOE"], ["Psicóloga", "Psicopedagoga"]],
              details: { id: "doe-secundario-details", nombre: "DOE Nivel Secundario", cargo: "Psicóloga y Psicopedagoga" },
            },
            {
              id: "sec-secundario",
              rows: [["Secretaria de Nivel"], ["Eugenia Barrientos"]],
              details: { id: "eugenia-barrientos", nombre: "Eugenia Barrientos", cargo: "Secretaria Nivel Secundario" },
            },
            {
              id: "coord-ingles-secundario",
              rows: [["Coordinación Inglés"]],
              details: { id: "coord-ingles-secundario-details", nombre: "Coordinación Inglés", cargo: "Nivel Secundario" },
              children: [
                { id: "docentes-ingles-secundario", rows: [["Docentes Inglés"]], details: { id: "docentes-ingles-secundario-details", nombre: "Docentes Inglés", cargo: "Nivel Secundario" } }
              ]
            },
            {
              id: "coord-edfisica-secundario",
              rows: [["Coordinación Educación Física"]],
              details: { id: "coord-edfisica-secundario-details", nombre: "Coordinación Educación Física", cargo: "Nivel Secundario" },
              children: [
                { id: "docentes-edfisica-secundario", rows: [["Docentes"]], details: { id: "docentes-edfisica-secundario-details", nombre: "Docentes Educación Física", cargo: "Nivel Secundario" } }
              ]
            },
            {
              id: "coord-feyvida-secundario",
              rows: [["Coordinación Fe y Vida"]],
              details: { id: "coord-feyvida-secundario-details", nombre: "Coordinación Fe y Vida", cargo: "Nivel Secundario" },
              children: [
                { id: "docentes-feyvida-secundario", rows: [["Docentes"]], details: { id: "docentes-feyvida-secundario-details", nombre: "Docentes Fe y Vida", cargo: "Nivel Secundario" } }
              ]
            },
            {
              id: "coord-tutorias-secundario",
              rows: [["Coordinación Tutorias"]],
              details: { id: "coord-tutorias-secundario-details", nombre: "Coordinación Tutorías", cargo: "Nivel Secundario" },
              children: [
                { id: "docentes-tutorias-secundario", rows: [["Docentes"]], details: { id: "docentes-tutorias-secundario-details", nombre: "Docentes Tutorías", cargo: "Nivel Secundario" } }
              ]
            },
            {
              id: "pecs-secundario",
              rows: [["PECS"], ["Nombres"]],
              details: { id: "pecs-secundario-details", nombre: "PECS", cargo: "Programa de Estudios Curriculares" },
            },
            {
              id: "personal-docente-secundario",
              rows: [["Personal Docente"]],
              details: { id: "personal-docente-secundario-details", nombre: "Personal Docente", cargo: "Nivel Secundario" },
              children: [
                { id: "docentes-secundario-general", rows: [["Docentes"]], details: { id: "docentes-secundario-general-details", nombre: "Docentes Generales", cargo: "Nivel Secundario" } }
              ]
            },
          ]
        },
      ]
    },

    // --- 2. BRAZO DERECHO (ÁREAS DE GESTIÓN Y FAMILIA) ---
    {
      id: "grupo-areas",
      rows: [["ÁREAS DE GESTIÓN Y FAMILIA"]],
      details: {id: 'brazo-der-details', nombre: 'Áreas de Gestión y Familia', cargo: 'Agrupador de áreas'},
      children: [
        // --- ÁREA LEGAL ---
        {
          id: "legal",
          rows: [["Área Legal"], ["Dra. Clara García Castellanos"]],
          details: {
            id: "clara-garcia",
            nombre: "Dra. Clara García Castellanos",
            cargo: "Asesoría Legal (Tercerizada)",
            horas: 15,
            descripcion: "Servicio de asesoramiento legal externo, con 15 horas semanales."
          },
        },
        // --- ÁREAS DE FAMILIA/SOCIALES ---
        {
          id: "area-familia",
          rows: [["Area Familia (Polo)"], ["Maria Marta Rojas (Polo)"]],
          details: {
            id: "maria-rojas",
            nombre: "Maria Marta Rojas (Polo)",
            cargo: "Directora Area Familia",
          },
        },
        {
          id: "capellanes",
          rows: [["Capellanía"], ["Jesús Galindo"], ["Bustos"], ["Pedro Lobo Zavalia"]],
          details: { id: "capellanes-equipo", nombre: "Equipo de Capellanía", cargo: "..." },
        },
        {
          id: "postulaciones",
          rows: [["Postulaciones (Polo)"], ["Felicitas Del Frari (Polo)"]],
          details: { id: "felicitas-frari-postulaciones", nombre: "Felicitas Del Frari (Polo)", cargo: "Postulaciones" },
        },
        {
          id: "comunicacion",
          rows: [["Comunicación (Polo)"], ["Agostina Garcia Castro (Polo)"]],
          details: { id: "agostina-garcia", nombre: "Agostina Garcia Castro (Polo)", cargo: "Comunicación" },
        },
        {
          id: "recepcion",
          rows: [["Recepción"], ["Pia Heguy B."], ["Mercedes Araoz T."], ["Felicitas Del Frari"]],
          details: { id: "recepcion-equipo", nombre: "Equipo de Recepción", cargo: "..." },
        },
        // --- ÁREA DE ADMINISTRACIÓN (COMPLETA) ---
        {
          id: "area-admin",
          rows: [["Administración (Polo)"], ["Cristina Navarro Zaldarriaga"]],
          details: { 
            id: "cristina-navarro", 
            nombre: "Cristina Navarro Zaldarriaga", 
            cargo: "Administración",
            horas: 34
          },
          children: [
            {
              id: "facturacion",
              rows: [["Facturacion y Cobranzas"], ["- Virginia Melhen", "- Mercedes Garcia Posse", "- Victoria Morano"]],
              details: { 
                id: "facturacion-equipo", 
                nombre: "Facturación y Cobranzas", 
                cargo: "Equipo",
                members: [
                  { id: "virginia-m", nombre: "Virginia Melhen", cargo: "", horas: 6 },
                  { id: "mercedes-gp", nombre: "Mercedes Garcia Posse", cargo: "", horas: 34 },
                  { id: "victoria-m", nombre: "Victoria Morano", cargo: "Facturación tercerizada", horas: 8 }
                ]
              },
            },
            {
              id: "contabilidad",
              rows: [["Contabilidad y Tesoreria"], ["- Cristina Zottoli Z.", "- Virginia Melhen"]],
              details: { 
                id: "contabilidad-equipo", 
                nombre: "Contabilidad y Tesoreria", 
                cargo: "Equipo",
                members: [
                  { id: "cristina-z", nombre: "Cristina Zottoli Z.", cargo: "", horas: 25 },
                  { id: "virginia-m-2", nombre: "Virginia Melhen", cargo: "", horas: 34 }
                ]
              },
            },
            {
              id: "rrhh",
              rows: [["RRHH"], ["- Dolores Kaese", "- Guillermina Conti", "- Belén Manes"]],
              details: { 
                id: "rrhh-equipo", 
                nombre: "RRHH", 
                cargo: "Equipo",
                members: [
                  { id: "dolores-k", nombre: "Dolores Kaese", cargo: "", horas: 34 },
                  { id: "guillermina-c", nombre: "Guillermina Conti", cargo: "", horas: 34 },
                  { id: "belen-m", nombre: "Belén Manes", cargo: "Asesora tercerizada", horas: 20 }
                ]
              },
            },
            {
              id: "mantenimiento",
              rows: [["Mantenimiento, Op. y Ss."], ["- Juan Pablo Varela", "- Bernardo Bott"]],
              details: { 
                id: "mantenimiento-equipo", 
                nombre: "Mantenimiento, Op. y Ss.", 
                cargo: "Equipo",
                members: [
                  { id: "juan-v", nombre: "Juan Pablo Varela", cargo: "", horas: 34 },
                  { id: "bernardo-b", nombre: "Bernardo Bott", cargo: "", horas: 24.5 }
                ]
              },
            },
            {
              id: "limpieza",
              rows: [
                ["Limpieza"], 
                ["(Lastenia Kaese supervisora)"],
                ["- Fidel Rojas", "- Bernardo Bott", "- Carolina Fernandez", "- Ariel Ruiz"],
                ["- Francisco Diaz", "- Sabina Moyano", "- Susana Bazan", "- Fernando Rodriguez"]
              ],
              details: { 
                id: "limpieza-equipo", 
                nombre: "Limpieza", 
                cargo: "Equipo de Limpieza",
                members: [
                  { id: "lastenia-k", nombre: "Lastenia Kaese", cargo: "Supervisora tercerizada", horas: 15 },
                  { id: "fidel-r", nombre: "Fidel Rojas", cargo: "Personal", horas: 46.5 },
                  { id: "bernardo-b-2", nombre: "Bernardo Bott", cargo: "Personal", horas: 22 },
                  { id: "carolina-f", nombre: "Carolina Fernandez", cargo: "Personal", horas: 46.5 },
                  { id: "ariel-r", nombre: "Ariel Ruiz", cargo: "Personal", horas: 46.5 },
                  { id: "francisco-d", nombre: "Francisco Diaz", cargo: "Personal", horas: 31 },
                  { id: "sabina-m", nombre: "Sabina Moyano", cargo: "Personal", horas: 45 },
                  { id: "susana-b", nombre: "Susana Bazan", cargo: "Personal", horas: 37 },
                  { id: "fernando-r", nombre: "Fernando Rodriguez", cargo: "Personal", horas: 31 }
                ]
              },
            }
          ]
        },
      ]
    },
  ],
};