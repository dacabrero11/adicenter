export type Proyecto = {
  tag: string;
  tagVariant: "default" | "ba";
  ubicacion: string;
  nombre: string;
  descripcion: string;
  stats: [string, string][];
  imagen: string;
};

export const proyectos: Proyecto[] = [
  {
    tag: "Refuerzo estructural",
    tagVariant: "default",
    ubicacion: "Tegucigalpa, F.M.",
    nombre: "Torre de Oficinas",
    descripcion:
      "Encapsulado de columnas con sistema SikaWrap® de fibra de carbono, para aumento de carga y actualización sísmica sin demoler.",
    stats: [
      ["21", "columnas reforzadas"],
      ["2", "capas de fibra"],
    ],
    imagen: "/images/proyectos/torre-oficinas.jpg",
  },
  {
    tag: "Refuerzo estructural",
    tagVariant: "default",
    ubicacion: "Zona industrial",
    nombre: "Planta Industrial",
    descripcion:
      "Refuerzo con platinas SikaCarbodur® en el piso de una planta de tratamiento de agua, por insuficiencia de sección original.",
    stats: [
      ["196", "ml de platina"],
      ["S502", "línea SikaCarbodur®"],
    ],
    imagen: "/images/proyectos/planta-industrial.jpg",
  },
  {
    tag: "Refuerzo estructural",
    tagVariant: "default",
    ubicacion: "Comayagua",
    nombre: "Aeropuerto Internacional Palmerola",
    descripcion:
      "Refuerzo estructural con platinas SikaCarbodur® S502 en losas de concreto, como parte de la actualización de cargas del proyecto.",
    stats: [
      ["252", "ml de platina"],
      ["S502", "línea SikaCarbodur®"],
    ],
    imagen: "/images/proyectos/aeropuerto-palmerola.jpg",
  },
  {
    tag: "Refuerzo estructural",
    tagVariant: "default",
    ubicacion: "Villanueva / Santa Marta, Cortés",
    nombre: "Subestación Eléctrica",
    descripcion:
      "Refuerzo estructural en dos plantas eléctricas de la misma constructora, con evaluación previa y modelo de carga en sitio.",
    stats: [
      ["2", "plantas reforzadas"],
      ["CFRP", "sistema aplicado"],
    ],
    imagen: "/images/proyectos/subestacion-electrica.jpg",
  },
  {
    tag: "Grouting",
    tagVariant: "default",
    ubicacion: "Tegucigalpa, F.M.",
    nombre: "Torre Corporativa",
    descripcion:
      "Grouting cementicio en placas base y refuerzo con fibra de carbono en columnas de niveles superiores.",
    stats: [
      ["2", "servicios combinados"],
      ["Cementicio", "grout sin contracción"],
    ],
    imagen: "/images/proyectos/torre-corporativa.jpg",
  },
  {
    tag: "Antes / Después",
    tagVariant: "ba",
    ubicacion: "San Pedro Sula, Cortés",
    nombre: "Centro Comercial",
    descripcion:
      "Impermeabilización de losa de techo con sistema acrílico reflectivo, sobre un área expuesta a lluvia directa todo el año.",
    stats: [
      ["Acrílico", "sistema aplicado"],
      ["Techo", "losa expuesta"],
    ],
    imagen: "/images/proyectos/centro-comercial.jpg",
  },
  {
    tag: "Antes / Después",
    tagVariant: "ba",
    ubicacion: "Tegucigalpa, F.M.",
    nombre: "Cisterna Municipal",
    descripcion:
      "Impermeabilización de cisterna con SikaTop® Seal 107, cementicio apto para contacto con agua potable.",
    stats: [
      ["SikaTop® Seal 107", "producto aplicado"],
      ["Agua potable", "uso certificado"],
    ],
    imagen: "/images/proyectos/cisterna-municipal.jpg",
  },
  {
    tag: "Pisos",
    tagVariant: "default",
    ubicacion: "San Pedro Sula, Cortés",
    nombre: "Piso Industrial",
    descripcion:
      "Recubrimiento epóxico de piso para planta de producción, aplicado sobre concreto preparado mecánicamente.",
    stats: [
      ["Epóxico", "sistema aplicado"],
      ["Planta", "uso industrial"],
    ],
    imagen: "/images/proyectos/piso-industrial.jpg",
  },
];
