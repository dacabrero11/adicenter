export type Categoria = "reparacion" | "imper" | "sello" | "pisos";

export type Servicio = {
  n: string;
  slug: string;
  categoria: Categoria;
  titulo: string;
  img: string;
  imgAlt: string;
  descripcion: string;
  specs: [string, string][];
};

export const servicios: Servicio[] = [
  {
    n: "01",
    slug: "cfrp",
    categoria: "reparacion",
    titulo: "Refuerzo estructural con fibra de carbono",
    img: "/images/catalogo/reparacion.webp",
    imgAlt: "Refuerzo estructural con fibra de carbono Sika CarboDur en columna y viga",
    descripcion:
      "Sistema SikaWrap® y SikaCarbodur® para aumento de carga, sección insuficiente de vigas y columnas, o actualización sísmica — sin demoler la estructura.",
    specs: [
      ["Sistema", "SikaWrap® / CarboDur®"],
      ["Aplicación", "Vigas y columnas"],
      ["Función", "Aumento de carga"],
    ],
  },
  {
    n: "02",
    slug: "grouting",
    categoria: "reparacion",
    titulo: "Grouting",
    img: "/images/catalogo/grouting.webp",
    imgAlt: "Grout estructural bajo placa base de columna de acero",
    descripcion:
      "Relleno estructural con grout cementicio sin contracción, para nivelación de placas base, anclaje de maquinaria y elementos estructurales.",
    specs: [
      ["Sistema", "SikaGrout®"],
      ["Espesor", "10 – 150 mm"],
      ["Aplicación", "Placas base, maquinaria"],
    ],
  },
  {
    n: "03",
    slug: "inyeccion",
    categoria: "reparacion",
    titulo: "Inyección epóxica",
    img: "/images/catalogo/inyeccion.webp",
    imgAlt: "Inyección de resina epóxica en fisura de muro de concreto",
    descripcion:
      "Sello de fisuras estructurales por inyección a presión, para restituir la continuidad del concreto sin abrir la superficie.",
    specs: [
      ["Sistema", "Sikadur®"],
      ["Aplicación", "Fisuras activas e inactivas"],
      ["Función", "Restituir continuidad"],
    ],
  },
  {
    n: "04",
    slug: "impermeabilizacion-losas",
    categoria: "imper",
    titulo: "Impermeabilización de losas",
    img: "/images/catalogo/impermeab_losa.webp",
    imgAlt: "Membrana impermeabilizante aplicada con soplete en losa de techo",
    descripcion:
      "Sistemas en frío con membranas acrílicas, poliuretano, asfálticas APP y cristalinas, según el uso y tránsito de la losa.",
    specs: [
      ["Uso", "Techo y azotea"],
      ["Tipo", "Losas transitables"],
      ["Control", "Prueba de encharcamiento"],
    ],
  },
  {
    n: "05",
    slug: "impermeabilizacion-cisternas",
    categoria: "imper",
    titulo: "Impermeabilización de tanques y cisternas",
    img: "/images/catalogo/impermeab_cisterna.webp",
    imgAlt: "Impermeabilización de cisterna con productos Velosit",
    descripcion:
      "Recubrimiento cementicio apto para contacto con agua potable, con sellado de pasamuros y prueba de estanqueidad.",
    specs: [
      ["Sistema", "Velosit®"],
      ["Uso", "Agua potable"],
      ["Control", "Prueba de estanqueidad"],
    ],
  },
  {
    n: "06",
    slug: "impermeabilizacion-muros",
    categoria: "imper",
    titulo: "Impermeabilización de muros enterrados",
    img: "/images/catalogo/impermeab_muro.webp",
    imgAlt: "Impermeabilización de muro de contención enterrado con drenaje",
    descripcion:
      "Protección de muros de contención y sótanos contra presión negativa, con membrana asfáltica o sistema cristalino.",
    specs: [
      ["Uso", "Muros de contención"],
      ["Función", "Presión negativa"],
      ["Momento", "Antes del relleno"],
    ],
  },
  {
    n: "07",
    slug: "sellado",
    categoria: "sello",
    titulo: "Sello de juntas y pintura para tráfico",
    img: "/images/catalogo/sellado.webp",
    imgAlt: "Sellado de junta de dilatación y pintura de demarcación para tráfico",
    descripcion:
      "Sellado de juntas de dilatación en piso, pared y estacionamiento, con pintura de demarcación resistente a tránsito vehicular.",
    specs: [
      ["Sistema", "Sikaflex®"],
      ["Tipo", "Elástico / poliuretano"],
      ["Uso", "Estacionamientos"],
    ],
  },
  {
    n: "08",
    slug: "pisos",
    categoria: "pisos",
    titulo: "Pisos epóxicos y poliuretano",
    img: "/images/catalogo/pisos.webp",
    imgAlt: "Recubrimiento epóxico y de poliuretano aplicado en piso industrial",
    descripcion:
      "Recubrimientos de alto tránsito para plantas industriales, bodegas y áreas de proceso, con preparación mecánica del sustrato.",
    specs: [
      ["Sistema", "Sikafloor®"],
      ["Acabado", "Epóxico / poliuretano"],
      ["Uso", "Alto tránsito"],
    ],
  },
  {
    n: "09",
    slug: "impermeabilizacion-piscinas",
    categoria: "imper",
    titulo: "Impermeabilización de piscinas",
    // TODO: reemplazar por la imagen real de piscina cuando esté lista
    img: "/images/catalogo/impermeab_cisterna.webp",
    imgAlt: "Vaso de piscina impermeabilizado con sistema cementicio antes de colocar el gresite",
    descripcion:
      "Sistema completo para vasos de piscina: sello de penetraciones y juntas, membrana cementicia flexible con refuerzo de malla en los ángulos, y sellado elástico final de skimmers y focos antes del revestimiento.",
    specs: [
      ["Sistema", "VELOSIT® / Sika®"],
      ["Presión", "Hasta 5 bar"],
      ["Control", "Prueba de estanqueidad"],
    ],
  },
];

export const filtros = [
  { key: "all", label: "Todos los servicios" },
  { key: "reparacion", label: "Reparación y refuerzo" },
  { key: "imper", label: "Impermeabilización" },
  { key: "sello", label: "Sellado" },
  { key: "pisos", label: "Pisos" },
] as const;
