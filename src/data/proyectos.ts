export type StatIcono = "columna" | "capas" | "platina" | "gota" | "escudo" | "reloj" | "perno" | "sistema";

export type Proyecto = {
  tag: string;
  tagVariant: "default" | "ba";
  categoria: "refuerzo" | "impermeabilizacion" | "grouting" | "inyecciones" | "pisos";
  año: number;
  ubicacion: string;
  nombre: string;
  descripcion: string;
  stats: [string, string, StatIcono][];
  imagen: string;
};

export const proyectos: Proyecto[] = [
  {
    tag: "Refuerzo Estructural", tagVariant: "default", categoria: "refuerzo", año: 2024,
    ubicacion: "Tegucigalpa, F.M.", nombre: "Torre de Oficinas",
    descripcion: "Encapsulado de columnas con sistema SikaWrap® de fibra de carbono, para aumento de carga y actualización sísmica.",
    stats: [["21", "Columnas reforzadas", "columna"], ["2", "Capas de fibra", "capas"]],
    imagen: "/images/proyectos/torre-oficinas.jpg",
  },
  {
    tag: "Refuerzo Estructural", tagVariant: "default", categoria: "refuerzo", año: 2024,
    ubicacion: "Zona Industrial", nombre: "Planta Industrial",
    descripcion: "Refuerzo con platinas SikaCarbodur® en el piso de una planta de tratamiento de agua, por insuficiencia de sección original.",
    stats: [["196", "ml de platina", "platina"], ["S502", "Línea SikaCarbodur®", "sistema"]],
    imagen: "/images/proyectos/planta-industrial.jpg",
  },
  {
    tag: "Refuerzo Estructural", tagVariant: "default", categoria: "refuerzo", año: 2024,
    ubicacion: "Comayagua", nombre: "Aeropuerto Internacional Palmerola",
    descripcion: "Refuerzo estructural con platinas SikaCarbodur® S502 en losas de concreto, como parte de la actualización de cargas del proyecto.",
    stats: [["252", "ml de platina", "platina"], ["S502", "Línea SikaCarbodur®", "sistema"]],
    imagen: "/images/proyectos/aeropuerto-palmerola.jpg",
  },
  {
    tag: "Refuerzo Estructural", tagVariant: "default", categoria: "refuerzo", año: 2023,
    ubicacion: "Villanueva / Santa Marta, Cortés", nombre: "Subestación Eléctrica",
    descripcion: "Refuerzo estructural en dos plantas eléctricas de la misma constructora, con evaluación previa y modelo de carga en sitio.",
    stats: [["2", "Plantas reforzadas", "columna"], ["CFRP", "Sistema aplicado", "capas"]],
    imagen: "/images/proyectos/subestacion-electrica.jpg",
  },
  {
    tag: "Impermeabilización", tagVariant: "default", categoria: "impermeabilizacion", año: 2023,
    ubicacion: "San Salvador", nombre: "Edificio Residencial",
    descripcion: "Refuerzo con fibra de carbono en vigas y losas por cambio de uso de edificio residencial a comercial.",
    stats: [["1,200 m²", "Área impermeabilizada", "gota"]],
    imagen: "/images/proyectos/cisterna-municipal.jpg",
  },
  {
    tag: "Grouting", tagVariant: "default", categoria: "grouting", año: 2023,
    ubicacion: "Santa Ana", nombre: "Tanque Elevado",
    descripcion: "Inyección de grout de alta resistencia para anclaje de pernos y relleno estructural en tanque elevado.",
    stats: [["48", "Pernos anclados", "perno"]],
    imagen: "/images/proyectos/torre-corporativa.jpg",
  },
  {
    tag: "Antes / Después", tagVariant: "ba", categoria: "impermeabilizacion", año: 2023,
    ubicacion: "Zona Metropolitana", nombre: "Centro Comercial",
    descripcion: "Sistema de impermeabilización acrílico en cubierta metálica con garantía extendida.",
    stats: [["15 años", "Garantía extendida", "escudo"]],
    imagen: "/images/proyectos/centro-comercial.jpg",
  },
  {
    tag: "Pisos", tagVariant: "default", categoria: "pisos", año: 2022,
    ubicacion: "San Pedro Sula, Cortés", nombre: "Piso Industrial",
    descripcion: "Recubrimiento epóxico de piso para planta de producción, aplicado sobre concreto preparado mecánicamente.",
    stats: [["Epóxico", "Sistema aplicado", "sistema"], ["Planta", "Uso industrial", "columna"]],
    imagen: "/images/proyectos/piso-industrial.jpg",
  },
];

export const FILTROS = [
  { key: "todos", label: "Todos" },
  { key: "refuerzo", label: "Refuerzo Estructural" },
  { key: "impermeabilizacion", label: "Impermeabilización" },
  { key: "grouting", label: "Grouting" },
  { key: "inyecciones", label: "Inyecciones" },
  { key: "pisos", label: "Pisos Industriales" },
] as const;

export const HEADER_STATS = [
  { valor: "+350", label: "Proyectos entregados" },
  { valor: "+1.2M m²", label: "Área impermeabilizada" },
  { valor: "15+", label: "Años de experiencia" },
  { valor: "3", label: "Líneas de especialización" },
];

export const STAT_ICONO: Record<string, React.ReactNode> = {};
