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
    imagen: "/images/proyectos/cisterna-municipal.jpg",
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
    ubicacion: "Comayagua", nombre: "Aeropuerto Internacional",
    descripcion: "Refuerzo estructural con platinas SikaCarbodur® S502 en losas de concreto, como parte de la actualización de cargas del proyecto.",
    stats: [["252", "ml de platina", "platina"], ["S502", "Línea SikaCarbodur®", "sistema"]],
    imagen: "/images/proyectos/aeropuerto-palmerola.jpg",
  },
  {
    // FOTO ACTUALIZADA: ahora muestra la aplicación real de SikaWrap en columna
    tag: "Refuerzo Estructural", tagVariant: "default", categoria: "refuerzo", año: 2023,
    ubicacion: "Villanueva / Santa Marta, Cortés", nombre: "Subestación Eléctrica",
    descripcion: "Encapsulado de columnas con SikaWrap® de fibra de carbono en instalaciones eléctricas de alta tensión, con evaluación estructural previa y modelo de carga en sitio.",
    stats: [["2", "Plantas reforzadas", "columna"], ["CFRP", "Sistema aplicado", "capas"]],
    imagen: "/images/proyectos/subestacion-electrica.webp",
  },
  {
    tag: "Refuerzo Estructural", tagVariant: "default", categoria: "refuerzo", año: 2023,
    ubicacion: "Tegucigalpa, F.M.", nombre: "Edificio Corporativo",
    descripcion: "Refuerzo con fibra de carbono en vigas y losas por cambio de uso de edificio residencial a comercial.",
    stats: [["CFRP", "Sistema aplicado", "capas"]],
    imagen: "/images/proyectos/torre-oficinas.jpg",
  },
  {
    // REEMPLAZADO: Tanque Elevado → Estacionamiento Comercial con foto e identidad correctas
    tag: "Impermeabilización", tagVariant: "default", categoria: "impermeabilizacion", año: 2023,
    ubicacion: "Cortés", nombre: "Estacionamiento Comercial",
    descripcion: "Impermeabilización de losa de estacionamiento a nivel elevado, con sistema elastomérico aplicado sobre sustrato preparado mecánicamente.",
    stats: [["10 años", "Garantía del sistema", "escudo"], ["Losa expuesta", "Superficie tratada", "gota"]],
    imagen: "/images/proyectos/estacionamiento-comercial.webp",
  },
  {
    tag: "Impermeabilización", tagVariant: "default", categoria: "impermeabilizacion", año: 2023,
    ubicacion: "Zona Metropolitana", nombre: "Centro Comercial",
    descripcion: "Impermeabilización de cubierta con membrana asfáltica en rollo, con traslapes sellados sobre superficie preparada.",
    stats: [["10 años", "Garantía del sistema", "escudo"]],
    imagen: "/images/proyectos/centro-comercial.jpg",
  },
  {
    tag: "Pisos Industriales", tagVariant: "default", categoria: "pisos", año: 2025,
    ubicacion: "Tegucigalpa, F.M.", nombre: "Planta de Alimentos",
    descripcion: "Aplicación de revestimiento epóxico en área de preparación de alimentos, con sellado de sustrato, dos manos de aplicación y acabado antiderrapante en tonalidad gris.",
    stats: [["Epóxico", "Sistema aplicado", "sistema"], ["Alimenticio", "Norma de uso", "escudo"]],
    imagen: "/images/proyectos/revestimiento-epoxicos.webp",
  },
  {
    tag: "Pisos Industriales", tagVariant: "default", categoria: "pisos", año: 2025,
    ubicacion: "Zona Metropolitana", nombre: "Área Sanitaria Industrial",
    descripcion: "Recubrimiento epóxico con curva sanitaria en transición piso-muro, aplicado según requerimientos de inocuidad para industria alimenticia.",
    stats: [["Curva sanitaria", "Detalle crítico", "sistema"], ["Inocuidad", "Norma cumplida", "escudo"]],
    imagen: "/images/proyectos/curva-sanitaria.webp",
  },
  {
    tag: "Pisos Industriales", tagVariant: "default", categoria: "pisos", año: 2024,
    ubicacion: "Zona Industrial", nombre: "Industria Alimenticia",
    descripcion: "Piso epóxico de altas prestaciones en área de proceso y bodega, con acabado liso y uniforme sobre sustrato de concreto preparado mecánicamente.",
    stats: [["Alta resistencia", "Especificación", "escudo"], ["Epóxico", "Sistema aplicado", "sistema"]],
    imagen: "/images/proyectos/industria-alimenticia.webp",
  },
  {
    tag: "Pisos Industriales", tagVariant: "default", categoria: "pisos", año: 2024,
    ubicacion: "San Pedro Sula, Cortés", nombre: "Bodega Industrial",
    descripcion: "Recubrimiento epóxico para bodega de distribución en zona de carga y descarga, con requerimiento de resistencia química al derrame y tráfico de montacargas.",
    stats: [["Epóxico", "Sistema aplicado", "sistema"], ["Tráfico pesado", "Requerimiento", "columna"]],
    imagen: "/images/proyectos/bodega-industrial.webp",
  },
  {
    tag: "Pisos Industriales", tagVariant: "default", categoria: "pisos", año: 2022,
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

/* Cifras confirmadas por ADICENTER. Los años se calculan desde 2017,
   el año de fundación, para que no queden desactualizados solos. */
const FUNDACION = 2017;
const ANIOS = new Date().getFullYear() - FUNDACION;

export const HEADER_STATS = [
  { valor: "+300", label: "Proyectos entregados" },
  { valor: "+6,000 m²", label: "Área impermeabilizada" },
  { valor: `${ANIOS}`, label: "Años de experiencia" },
  { valor: "5", label: "Líneas de especialización" },
];

export const STAT_ICONO: Record<string, React.ReactNode> = {};
