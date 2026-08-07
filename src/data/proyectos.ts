export type Proyecto = {
  tag: string;
  tagVariant: "default" | "ba"; // ba = antes/después (naranja)
  placeholderLabel: string;
  ubicacion: string;
  nombre: string;
  descripcion: string;
  stats: [string, string][];
  /** Ruta de la foto real cuando exista. Si es null, se muestra el placeholder. */
  imagen: string | null;
};

export const proyectos: Proyecto[] = [
  {
    tag: "Antes / Después",
    tagVariant: "ba",
    placeholderLabel: "Cubierta metálica",
    ubicacion: "Villanueva, Cortés · 2025",
    nombre: "Nave industrial",
    descripcion:
      "Impermeabilización de cubierta metálica con VELOSIT® WP 120 flexible y sello de traslapes, sin paro de producción.",
    stats: [
      ["9,400", "m² intervenidos"],
      ["14", "días de obra"],
    ],
    imagen: null,
  },
  {
    tag: "Piso epóxico",
    tagVariant: "default",
    placeholderLabel: "Piso terminado",
    ubicacion: "Tegucigalpa, F.M. · 2025",
    nombre: "Centro de distribución",
    descripcion:
      "Piso epóxico Sikadur® grado industrial, con demarcación de rutas y zonas de carga.",
    stats: [
      ["3,100", "m² intervenidos"],
      ["11", "días de obra"],
    ],
    imagen: null,
  },
  {
    tag: "Aditivos",
    tagVariant: "default",
    placeholderLabel: "Colado en sitio",
    ubicacion: "San Pedro Sula, Cortés · 2024",
    nombre: "Torre residencial",
    descripcion:
      "Aditivo cristalino VELOSIT® y control de fisuración en colados masivos de fundación, con dosificación en planta.",
    stats: [
      ["640", "m³ de concreto"],
      ["6", "colados"],
    ],
    imagen: null,
  },
  {
    tag: "Agua potable",
    tagVariant: "default",
    placeholderLabel: "Interior de cisterna",
    ubicacion: "Comayagua · 2024",
    nombre: "Cisterna municipal",
    descripcion:
      "Recubrimiento cementicio VELOSIT® WP 101 apto para contacto con agua potable, con sellado de pasamuros y prueba de estanqueidad de 72 horas.",
    stats: [
      ["780", "m² intervenidos"],
      ["0", "filtraciones"],
    ],
    imagen: null,
  },
  {
    tag: "Antes / Después",
    tagVariant: "ba",
    placeholderLabel: "Losa expuesta",
    ubicacion: "La Ceiba, Atlántida · 2023",
    nombre: "Bodega refrigerada",
    descripcion:
      "Losa con humedad recurrente: corrección de pendientes y sello cristalino VELOSIT® CW 111 con refuerzo perimetral y en bajantes.",
    stats: [
      ["2,200", "m² intervenidos"],
      ["3", "años sin reporte"],
    ],
    imagen: null,
  },
  {
    tag: "Grado alimenticio",
    tagVariant: "default",
    placeholderLabel: "Área de proceso",
    ubicacion: "Choloma, Cortés · 2023",
    nombre: "Planta de alimentos",
    descripcion:
      "Sistema epóxico grado alimenticio con media caña sanitaria en encuentros, resistente a lavado a presión y a químicos de limpieza.",
    stats: [
      ["1,450", "m² intervenidos"],
      ["72 h", "puesta en servicio"],
    ],
    imagen: null,
  },
];
