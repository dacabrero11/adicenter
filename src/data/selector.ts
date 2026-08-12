export type SurfaceKey = "losa" | "techo" | "piso" | "cisterna" | "muro";
export type ProblemKey = "filtracion" | "fisuras" | "desgaste" | "humedad" | "otro";

export const SURFACES: { key: SurfaceKey; label: string; hint: string; img: string; imgAlt: string }[] = [
  { key: "losa", label: "Losa", hint: "Concreto horizontal expuesto.", img: "/images/selector/losa.webp", imgAlt: "Sistema de impermeabilización para losa de concreto" },
  { key: "techo", label: "Techo", hint: "Lámina metálica o superficies inclinadas.", img: "/images/selector/techo.webp", imgAlt: "Sistema de impermeabilización para techo de lámina" },
  { key: "piso", label: "Piso", hint: "Tráfico peatonal o vehicular.", img: "/images/selector/piso.webp", imgAlt: "Sistema de piso industrial" },
  { key: "cisterna", label: "Cisterna", hint: "Contención de agua, tanques y depósitos.", img: "/images/selector/cisterna.webp", imgAlt: "Sistema de impermeabilización para cisterna" },
  { key: "muro", label: "Muro", hint: "Muros, fachadas y superficies verticales.", img: "/images/selector/muro.webp", imgAlt: "Sistema de impermeabilización para muro" },
];

export const PROBLEMS: { key: ProblemKey; label: string; hint: string }[] = [
  { key: "filtracion", label: "Filtración", hint: "Paso de agua a través del sistema." },
  { key: "fisuras", label: "Fisuras", hint: "Grietas o fisuras en la superficie." },
  { key: "desgaste", label: "Desgaste", hint: "Desgaste por tráfico o abrasión." },
  { key: "humedad", label: "Humedad", hint: "Humedad en muros o presión negativa." },
  { key: "otro", label: "Otro", hint: "Otra situación específica." },
];

const TITULO_POR_PROBLEMA: Record<ProblemKey, string> = {
  filtracion: "Sistema de impermeabilización",
  fisuras: "Sistema de reparación de fisuras",
  desgaste: "Sistema de protección antidesgaste",
  humedad: "Sistema de control de humedad",
  otro: "Sistema recomendado",
};

type SistemaBase = {
  tituloSuperficie: string;
  descripcion: string;
  capas: [string, string][]; // de arriba (04) hacia abajo (01), como en la referencia
  pasos: { n: string; titulo: string; texto: string }[];
  rendimiento: string;
  comportamiento: string;
  tiempo: string;
};

const BASE: Record<SurfaceKey, SistemaBase> = {
  losa: {
    tituloSuperficie: "para losa de concreto",
    descripcion:
      "Solución completa para losas de concreto con alta durabilidad y resistencia, apta para tránsito ocasional.",
    capas: [
      ["04 — Acabado protector", "Recubrimiento final con alta resistencia a rayos UV y tránsito."],
      ["03 — Membrana impermeable", "Membrana líquida 100% impermeable de alta elongación."],
      ["02 — Imprimación / puente", "Promotor de adherencia para asegurar una unión óptima."],
      ["01 — Preparación", "Limpieza y preparación de la superficie para asegurar adherencia."],
    ],
    pasos: [
      { n: "01", titulo: "Preparación", texto: "Limpieza, reparación y preparación de superficie." },
      { n: "02", titulo: "Imprimación", texto: "Aplicación de imprimante para mejor adherencia." },
      { n: "03", titulo: "Membrana", texto: "Aplicación de membrana líquida impermeable." },
      { n: "04", titulo: "Acabado", texto: "Aplicación de recubrimiento final protector." },
    ],
    rendimiento: "1.2 m²/L",
    comportamiento: "Estructural",
    tiempo: "3 – 7 días",
  },
  techo: {
    tituloSuperficie: "para techo de lámina",
    descripcion:
      "Sistema reflectivo para cubierta metálica, con sello de traslapes y tornillería antes de la membrana.",
    capas: [
      ["04 — Acabado reflectivo", "Capa final de alta reflectancia solar, baja la temperatura interna."],
      ["03 — Membrana flexible", "VELOSIT® WP 120, membrana cementicia de alta elongación."],
      ["02 — Sello de traslapes", "Sello de puntos activos y tornillería con VELOSIT® PC 221/222."],
      ["01 — Preparación", "Lavado a presión y tratamiento de puntos de óxido."],
    ],
    pasos: [
      { n: "01", titulo: "Preparación", texto: "Lavado a presión y tratamiento de óxido." },
      { n: "02", titulo: "Sello", texto: "Sello de traslapes y tornillería." },
      { n: "03", titulo: "Membrana", texto: "Dos capas de membrana flexible en sentido cruzado." },
      { n: "04", titulo: "Acabado", texto: "Capa reflectiva final." },
    ],
    rendimiento: "Según ficha técnica",
    comportamiento: "Alta flexibilidad",
    tiempo: "4 – 8 días",
  },
  piso: {
    tituloSuperficie: "para piso industrial",
    descripcion:
      "Sistema epóxico de alta resistencia para tránsito de montacargas, planta de producción y lavado frecuente.",
    capas: [
      ["04 — Acabado epóxico", "Sikadur®, capa final de alta resistencia y acabado nivelado."],
      ["03 — Capa base decorativa", "Terrazo epóxico o cuarzo, según acabado especificado."],
      ["02 — Puente de adherencia", "Sikadur®-32 Gel, promotor de adherencia."],
      ["01 — Preparación", "Escarificado o granallado mecánico del concreto."],
    ],
    pasos: [
      { n: "01", titulo: "Preparación", texto: "Escarificado o granallado del concreto." },
      { n: "02", titulo: "Reparación", texto: "Juntas y fisuras con mortero Sika MonoTop®." },
      { n: "03", titulo: "Puente", texto: "Puente de adherencia epóxico." },
      { n: "04", titulo: "Acabado", texto: "Sistema epóxico y demarcación." },
    ],
    rendimiento: "Según espesor",
    comportamiento: "Alta resistencia",
    tiempo: "8 – 14 días",
  },
  cisterna: {
    tituloSuperficie: "para cisterna",
    descripcion:
      "Recubrimiento cementicio apto para contacto con agua potable, con sellado de pasamuros y prueba de estanqueidad.",
    capas: [
      ["04 — Sello de pasamuros", "Sello de puntos de filtración activa antes del recubrimiento general."],
      ["03 — Recubrimiento cementicio", "VELOSIT® WP 101, dos capas cruzadas apto agua potable."],
      ["02 — Imprimación", "Puente de adherencia sobre concreto saneado."],
      ["01 — Preparación", "Saneo de concreto suelto y apertura de juntas frías."],
    ],
    pasos: [
      { n: "01", titulo: "Preparación", texto: "Saneo de concreto y apertura de juntas frías." },
      { n: "02", titulo: "Sello", texto: "Sello de pasamuros y filtraciones activas." },
      { n: "03", titulo: "Recubrimiento", texto: "Dos capas cruzadas de recubrimiento cementicio." },
      { n: "04", titulo: "Control", texto: "Prueba de estanqueidad de 72 horas." },
    ],
    rendimiento: "1.5 kg/m²",
    comportamiento: "Agua potable",
    tiempo: "5 – 9 días",
  },
  muro: {
    tituloSuperficie: "para muro",
    descripcion:
      "Protección de muros de contención y sótanos contra presión negativa, con membrana y sistema de drenaje.",
    capas: [
      ["04 — Recubrimiento protector", "Capa final de protección contra el relleno y la humedad del suelo."],
      ["03 — Membrana + malla", "Membrana asfáltica o cristalina reforzada con malla en juntas."],
      ["02 — Imprimación", "Promotor de adherencia sobre concreto sano."],
      ["01 — Preparación", "Saneo de concreto y sello de puntos de filtración activa."],
    ],
    pasos: [
      { n: "01", titulo: "Preparación", texto: "Saneo de concreto y sello de filtraciones activas." },
      { n: "02", titulo: "Imprimación", texto: "Promotor de adherencia sobre el muro." },
      { n: "03", titulo: "Membrana", texto: "Membrana reforzada con malla en juntas." },
      { n: "04", titulo: "Protección", texto: "Recubrimiento protector antes del relleno." },
    ],
    rendimiento: "1.5 kg/m²",
    comportamiento: "Presión negativa",
    tiempo: "5 – 9 días",
  },
};

export function getResultado(surface: SurfaceKey, problem: ProblemKey) {
  const base = BASE[surface];
  const surf = SURFACES.find((s) => s.key === surface)!;
  const prob = PROBLEMS.find((p) => p.key === problem)!;
  return {
    titulo: `${TITULO_POR_PROBLEMA[problem]} ${base.tituloSuperficie}`,
    descripcion: base.descripcion,
    capas: base.capas,
    pasos: base.pasos,
    rendimiento: base.rendimiento,
    comportamiento: base.comportamiento,
    tiempo: base.tiempo,
    img: surf.img,
    imgAlt: surf.imgAlt,
    superficieLabel: surf.label,
    problemaLabel: prob.label,
  };
}
