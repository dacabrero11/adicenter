export type Producto = {
  categoria: "aditivos" | "epoxicos" | "imper" | "comp";
  familia: string;
  nombre: string;
  descripcion: string;
  specs: [string, string][];
};

export const productos: Producto[] = [
  {
    categoria: "imper",
    familia: "Impermeabilizantes / Acrílico",
    nombre: "ADIFLEX 400",
    descripcion:
      "Membrana elastomérica acrílica de alta reflectancia para losa y lámina. Se aplica en frío, sin llama, sobre superficie preparada.",
    specs: [
      ["Rendimiento", "1.2 m²/L por capa"],
      ["Presentación", "Cubeta 5 gal / 1 gal"],
      ["Elongación", "400 %"],
    ],
  },
  {
    categoria: "imper",
    familia: "Impermeabilizantes / Poliuretano",
    nombre: "ADITHANE PU-1",
    descripcion:
      "Membrana poliuretánica monocomponente para cubiertas transitables y detalles críticos con movimiento estructural.",
    specs: [
      ["Rendimiento", "1.0 kg/m² (2 capas)"],
      ["Presentación", "Balde 20 kg"],
      ["Vida útil", "10 – 12 años"],
    ],
  },
  {
    categoria: "imper",
    familia: "Impermeabilizantes / Cementicio",
    nombre: "ADISEAL CT-2",
    descripcion:
      "Recubrimiento cementicio de dos componentes para cisternas, tanques y sótanos. Resiste presión negativa.",
    specs: [
      ["Rendimiento", "1.5 kg/m² por mm"],
      ["Presentación", "Kit 25 kg"],
      ["Agua potable", "Apto certificado"],
    ],
  },
  {
    categoria: "epoxicos",
    familia: "Epóxicos / Piso",
    nombre: "ADIPOX SL-100",
    descripcion:
      "Autonivelante epóxico 100% sólidos para piso industrial de alto tránsito, bodega y planta de proceso.",
    specs: [
      ["Espesor", "1.5 – 3 mm"],
      ["Compresión", "≥ 75 MPa"],
      ["Servicio", "72 h"],
    ],
  },
  {
    categoria: "epoxicos",
    familia: "Epóxicos / Primer",
    nombre: "ADIPOX PRIMER-E",
    descripcion:
      "Imprimante epóxico de baja viscosidad. Penetra y sella el poro del concreto para garantizar adherencia del sistema.",
    specs: [
      ["Rendimiento", "4 – 6 m²/L"],
      ["Presentación", "Kit 4 L / 16 L"],
      ["Repintado", "6 – 24 h"],
    ],
  },
  {
    categoria: "epoxicos",
    familia: "Epóxicos / Mortero",
    nombre: "ADIPOX MORTAR-HD",
    descripcion:
      "Mortero epóxico de alta resistencia para reparación de juntas, muelles de carga y zonas de impacto severo.",
    specs: [
      ["Espesor", "5 – 30 mm"],
      ["Compresión", "≥ 90 MPa"],
      ["Presentación", "Kit 30 kg"],
    ],
  },
  {
    categoria: "aditivos",
    familia: "Aditivos / Reductor",
    nombre: "ADIMIX HR-5",
    descripcion:
      "Reductor de agua de alto rango, base policarboxilato. Aumenta resistencia temprana sin sacrificar trabajabilidad.",
    specs: [
      ["Dosis", "0.6 – 1.5% cemento"],
      ["Presentación", "Tambo 200 L"],
      ["Norma", "ASTM C494 Tipo F"],
    ],
  },
  {
    categoria: "aditivos",
    familia: "Aditivos / Fibra",
    nombre: "ADIFIBER PP-12",
    descripcion:
      "Microfibra de polipropileno para control de fisuración por retracción plástica en losas y pavimentos.",
    specs: [
      ["Dosis", "600 – 900 g/m³"],
      ["Longitud", "12 mm"],
      ["Norma", "ASTM C1116"],
    ],
  },
  {
    categoria: "aditivos",
    familia: "Aditivos / Impermeabilizante",
    nombre: "ADIMIX SEAL-C",
    descripcion:
      "Aditivo impermeabilizante integral por cristalización. Sella la matriz del concreto desde la mezcla.",
    specs: [
      ["Dosis", "1% cemento"],
      ["Presentación", "Saco 20 kg"],
      ["Norma", "ASTM C1585"],
    ],
  },
  {
    categoria: "comp",
    familia: "Complementos / Refuerzo",
    nombre: "ADIMESH 60",
    descripcion:
      "Malla de refuerzo de poliéster para embeber en membrana sobre juntas, traslapes y encuentros de losa con muro.",
    specs: [
      ["Ancho", "10 / 20 / 100 cm"],
      ["Presentación", "Rollo 50 m"],
      ["Gramaje", "60 g/m²"],
    ],
  },
  {
    categoria: "comp",
    familia: "Complementos / Anclaje",
    nombre: "ADIFIX AN-2",
    descripcion:
      "Anclaje químico epóxico de dos componentes para varilla y perno en concreto agrietado y no agrietado.",
    specs: [
      ["Cartucho", "410 ml"],
      ["Adherencia", "≥ 14 MPa"],
      ["Norma", "ICC-ES referenciado"],
    ],
  },
  {
    categoria: "comp",
    familia: "Complementos / Sellador",
    nombre: "ADISEAL PU-40",
    descripcion:
      "Sellador de poliuretano para juntas de dilatación en piso, fachada y cubierta. Alta recuperación elástica.",
    specs: [
      ["Movimiento", "± 25%"],
      ["Presentación", "Salchicha 600 ml"],
      ["Curado", "3 mm/día"],
    ],
  },
];

export const filtros = [
  { key: "all", label: "Todo el catálogo" },
  { key: "aditivos", label: "Aditivos" },
  { key: "epoxicos", label: "Epóxicos" },
  { key: "imper", label: "Impermeabilizantes" },
  { key: "comp", label: "Complementos" },
] as const;
