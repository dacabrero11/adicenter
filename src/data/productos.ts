export type Producto = {
  categoria: "reparacion" | "anclajes" | "imper" | "aditivos" | "epoxicos" | "grout";
  marca: "Sika" | "Velosit";
  familia: string;
  nombre: string;
  descripcion: string;
  specs: [string, string][];
};

export const productos: Producto[] = [
  // ── Reparación y reforzamiento (línea con énfasis) ──
  {
    categoria: "reparacion",
    marca: "Sika",
    familia: "Morteros de reparación",
    nombre: "Sika MonoTop®-412 S",
    descripcion:
      "Mortero de reparación estructural con inhibidor de corrosión integrado, para aplicación manual o por proyección sobre concreto dañado.",
    specs: [
      ["Marca", "Sika®"],
      ["Aplicación", "Manual / proyectado"],
      ["Uso típico", "Reparación estructural"],
    ],
  },
  {
    categoria: "reparacion",
    marca: "Sika",
    familia: "Morteros de reparación",
    nombre: "SikaTop®-122",
    descripcion:
      "Mortero de alta adherencia y resistencia, a base de cemento y resinas acrílicas, para reparación de elementos estructurales.",
    specs: [
      ["Marca", "Sika®"],
      ["Base", "Cemento + acrílico"],
      ["Uso típico", "Columnas, vigas, losas"],
    ],
  },
  {
    categoria: "reparacion",
    marca: "Sika",
    familia: "Morteros de reparación",
    nombre: "SikaQuick®",
    descripcion:
      "Mortero de reparación de fraguado rápido, pensado para reponer el servicio de la estructura en el menor tiempo posible.",
    specs: [
      ["Marca", "Sika®"],
      ["Fraguado", "Rápido"],
      ["Uso típico", "Reparaciones urgentes"],
    ],
  },
  {
    categoria: "reparacion",
    marca: "Sika",
    familia: "Recubrimiento anticorrosivo",
    nombre: "SikaTop® Armatec®-110 EpoCem®",
    descripcion:
      "Recubrimiento anticorrosivo y puente de adherencia de tres componentes para proteger el acero de refuerzo expuesto antes de reparar.",
    specs: [
      ["Marca", "Sika®"],
      ["Función", "Anticorrosivo + puente de adherencia"],
      ["Uso típico", "Acero de refuerzo expuesto"],
    ],
  },
  {
    categoria: "reparacion",
    marca: "Velosit",
    familia: "Morteros de reparación",
    nombre: "VELOSIT® RM 202",
    descripcion:
      "Mortero de reparación cementicio para uso vertical y sobrecabeza, en concreto, mampostería y piedra natural. Se moldea y perfila a mano.",
    specs: [
      ["Marca", "Velosit® · Alemania"],
      ["Aplicación", "Vertical / sobrecabeza"],
      ["Espesor", "Filo de cuchillo hasta 10 cm"],
    ],
  },
  {
    categoria: "reparacion",
    marca: "Velosit",
    familia: "Morteros de reparación",
    nombre: "VELOSIT® RM 211",
    descripcion:
      "Mortero de reparación cristalino que deja una superficie lisa, pensado para trabajar junto con recubrimientos impermeabilizantes cristalinos.",
    specs: [
      ["Marca", "Velosit® · Alemania"],
      ["Terminado", "Superficie lisa"],
      ["Uso típico", "Base para impermeabilización cristalina"],
    ],
  },

  // ── Anclajes químicos ──
  {
    categoria: "anclajes",
    marca: "Sika",
    familia: "Anclajes químicos",
    nombre: "Sika AnchorFix®-3001",
    descripcion:
      "Adhesivo epóxico de dos componentes para anclajes de alto desempeño, apto para concreto fisurado y no fisurado.",
    specs: [
      ["Marca", "Sika®"],
      ["Base", "Epóxico bicomponente"],
      ["Sustrato", "Concreto fisurado y sano"],
    ],
  },
  {
    categoria: "anclajes",
    marca: "Sika",
    familia: "Anclajes químicos",
    nombre: "Sika AnchorFix®-3030",
    descripcion:
      "Adhesivo epóxico para anclaje de varillas de construcción, pernos roscados y fijaciones de alto desempeño.",
    specs: [
      ["Marca", "Sika®"],
      ["Base", "Epóxico"],
      ["Uso típico", "Varillas y pernos roscados"],
    ],
  },
  {
    categoria: "anclajes",
    marca: "Sika",
    familia: "Anclajes químicos",
    nombre: "Sika AnchorFix®-2+ Tropical",
    descripcion:
      "Adhesivo de curado rápido para anclajes de cargas medias a altas, formulado para climas cálidos y húmedos.",
    specs: [
      ["Marca", "Sika®"],
      ["Curado", "Rápido"],
      ["Clima", "Cálido / húmedo"],
    ],
  },

  // ── Impermeabilizantes cementicios (Velosit) ──
  {
    categoria: "imper",
    marca: "Velosit",
    familia: "Impermeabilizante cementicio",
    nombre: "VELOSIT® WP 120",
    descripcion:
      "Lechada impermeabilizante cementicia altamente flexible, para superficies con movimiento y microfisuración.",
    specs: [
      ["Marca", "Velosit® · Alemania"],
      ["Flexibilidad", "Alta"],
      ["Uso típico", "Losas y muros con fisuración"],
    ],
  },
  {
    categoria: "imper",
    marca: "Velosit",
    familia: "Impermeabilizante cementicio",
    nombre: "VELOSIT® WP 101",
    descripcion:
      "Lechada impermeabilizante cementicia de alta resistencia, para cisternas, sótanos y estructuras bajo presión de agua.",
    specs: [
      ["Marca", "Velosit® · Alemania"],
      ["Resistencia", "Alta"],
      ["Uso típico", "Cisternas y sótanos"],
    ],
  },
  {
    categoria: "imper",
    marca: "Velosit",
    familia: "Impermeabilizante cristalino",
    nombre: "VELOSIT® CW 111",
    descripcion:
      "Impermeabilización cristalina de alta resistencia que sella la matriz del concreto por crecimiento de cristales dentro del poro.",
    specs: [
      ["Marca", "Velosit® · Alemania"],
      ["Tecnología", "Cristalización"],
      ["Uso típico", "Contacto directo con agua"],
    ],
  },
  {
    categoria: "imper",
    marca: "Velosit",
    familia: "Sello de fisuras activas",
    nombre: "VELOSIT® PC 221 / PC 222",
    descripcion:
      "Cemento de fraguado ultrarrápido para sellar filtraciones activas y goteras puntuales antes de impermeabilizar el área completa.",
    specs: [
      ["Marca", "Velosit® · Alemania"],
      ["Fraguado", "Ultrarrápido (segundos)"],
      ["Uso típico", "Filtraciones activas"],
    ],
  },
  {
    categoria: "imper",
    marca: "Sika",
    familia: "Membrana de reparación",
    nombre: "Sika MonoTop®-160 Migrating",
    descripcion:
      "Mortero monocomponente para impermeabilización por cristalización, migra dentro de la masa de concreto sellando desde adentro.",
    specs: [
      ["Marca", "Sika®"],
      ["Tecnología", "Cristalización migrante"],
      ["Uso típico", "Concreto en contacto con agua"],
    ],
  },

  // ── Epóxicos (adhesivos y primers) ──
  {
    categoria: "epoxicos",
    marca: "Sika",
    familia: "Adhesivo epóxico estructural",
    nombre: "Sikadur®-31 Normal",
    descripcion:
      "Adhesivo epóxico de alta resistencia, uso general para pegado estructural de concreto endurecido y otros sustratos.",
    specs: [
      ["Marca", "Sika®"],
      ["Base", "Epóxico bicomponente"],
      ["Uso típico", "Pegado estructural"],
    ],
  },
  {
    categoria: "epoxicos",
    marca: "Sika",
    familia: "Puente de adherencia",
    nombre: "Sikadur®-32 Gel",
    descripcion:
      "Puente de adherencia epóxico entre concreto endurecido y concreto fresco, formato en gel para superficies verticales.",
    specs: [
      ["Marca", "Sika®"],
      ["Formato", "Gel (no escurre)"],
      ["Uso típico", "Concreto viejo a concreto nuevo"],
    ],
  },
  {
    categoria: "epoxicos",
    marca: "Sika",
    familia: "Adhesivo epóxico de baja viscosidad",
    nombre: "Sikadur®-35 Hi-Mod LV",
    descripcion:
      "Adhesivo epóxico multipropósito de baja viscosidad, alta resistencia y alto módulo, penetra fisuras finas por gravedad o inyección.",
    specs: [
      ["Marca", "Sika®"],
      ["Viscosidad", "Baja"],
      ["Uso típico", "Sello de fisuras finas"],
    ],
  },

  // ── Grout / anclaje y nivelación ──
  {
    categoria: "grout",
    marca: "Sika",
    familia: "Grout estructural",
    nombre: "SikaGrout®-212",
    descripcion:
      "Grout cementicio sin contracción para relleno estructural, nivelación de placas base y anclaje de maquinaria.",
    specs: [
      ["Marca", "Sika®"],
      ["Contracción", "Compensada"],
      ["Uso típico", "Placas base y maquinaria"],
    ],
  },
  {
    categoria: "grout",
    marca: "Sika",
    familia: "Grout de alta resistencia",
    nombre: "SikaGrout®-9200",
    descripcion:
      "Grout cementicio de ultra alta resistencia con nanotecnología, resistencia a compresión superior a C100/115 según EN 206-1.",
    specs: [
      ["Marca", "Sika®"],
      ["Resistencia", "> C100/115 (EN 206-1)"],
      ["Uso típico", "Instalaciones de alta carga"],
    ],
  },

  // ── Aditivos para concreto ──
  {
    categoria: "aditivos",
    marca: "Velosit",
    familia: "Aditivo impermeabilizante",
    nombre: "VELOSIT® — Aditivo cristalino líquido",
    descripcion:
      "Aditivo impermeabilizante y plastificante líquido de cristalización, se integra en la mezcla de concreto desde la planta.",
    specs: [
      ["Marca", "Velosit® · Alemania"],
      ["Formato", "Líquido"],
      ["Función", "Impermeabilizante + plastificante"],
    ],
  },
];

export const filtros = [
  { key: "all", label: "Todo el catálogo" },
  { key: "reparacion", label: "Reparación y reforzamiento" },
  { key: "imper", label: "Impermeabilizantes" },
  { key: "anclajes", label: "Anclajes químicos" },
  { key: "epoxicos", label: "Epóxicos" },
  { key: "grout", label: "Grout" },
  { key: "aditivos", label: "Aditivos" },
] as const;
