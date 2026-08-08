export type Servicio = {
  categoria: "reparacion" | "imper" | "pisos" | "sello";
  icono: "cfrp" | "grout" | "inyeccion" | "losa" | "tanque" | "muro" | "junta" | "piso";
  nombre: string;
  descripcion: string;
  incluye: string[];
};

export const servicios: Servicio[] = [
  {
    categoria: "reparacion",
    icono: "cfrp",
    nombre: "Refuerzo estructural con fibra de carbono",
    descripcion:
      "Sistema SikaWrap® y SikaCarbodur® para aumento de carga, sección insuficiente de vigas y columnas, o actualización sísmica — sin demoler la estructura.",
    incluye: ["Evaluación estructural en sitio", "Modelo de carga", "Platinas y mantos CFRP", "Aplicación certificada"],
  },
  {
    categoria: "reparacion",
    icono: "grout",
    nombre: "Grouting",
    descripcion:
      "Relleno estructural con grout cementicio sin contracción, para nivelación de placas base, anclaje de maquinaria y elementos estructurales.",
    incluye: ["Placas base y equipos", "Anclaje de pernos", "Relleno en columnas y trabes", "Alta resistencia inicial"],
  },
  {
    categoria: "reparacion",
    icono: "inyeccion",
    nombre: "Inyección epóxica",
    descripcion:
      "Sello de fisuras estructurales por inyección a presión, para restituir la continuidad del concreto sin abrir la superficie.",
    incluye: ["Diagnóstico de fisura", "Inyección a presión controlada", "Sello superficial", "Reporte fotográfico"],
  },
  {
    categoria: "imper",
    icono: "losa",
    nombre: "Impermeabilización de losas",
    descripcion:
      "Sistemas en frío con membranas acrílicas, poliuretano, asfálticas APP y cristalinas, según el uso y tránsito de la losa.",
    incluye: ["Losas de techo y azotea", "Losas transitables", "Corrección de pendientes", "Prueba de encharcamiento"],
  },
  {
    categoria: "imper",
    icono: "tanque",
    nombre: "Impermeabilización de tanques y cisternas",
    descripcion:
      "Recubrimiento cementicio apto para contacto con agua potable, con sellado de pasamuros y prueba de estanqueidad.",
    incluye: ["Cisternas de agua potable", "Tanques industriales", "Sello de pasamuros", "Apto agua potable"],
  },
  {
    categoria: "imper",
    icono: "muro",
    nombre: "Impermeabilización de muros enterrados",
    descripcion:
      "Protección de muros de contención y sótanos contra presión negativa, con membrana asfáltica o sistema cristalino.",
    incluye: ["Muros de contención", "Sótanos y cimentaciones", "Presión negativa", "Protección antes del relleno"],
  },
  {
    categoria: "sello",
    icono: "junta",
    nombre: "Sello de juntas y pintura para tráfico",
    descripcion:
      "Sellado de juntas de dilatación en piso, pared y estacionamiento, con pintura de demarcación resistente a tránsito vehicular.",
    incluye: ["Juntas de dilatación", "Estacionamientos", "Demarcación vial", "Resistencia a tránsito"],
  },
  {
    categoria: "pisos",
    icono: "piso",
    nombre: "Pisos epóxicos y poliuretano",
    descripcion:
      "Recubrimientos de alto tránsito para plantas industriales, bodegas y áreas de proceso, con preparación mecánica del sustrato.",
    incluye: ["Plantas y bodegas", "Alto tránsito", "Preparación mecánica", "Acabado nivelado"],
  },
];

export const filtrosServicios = [
  { key: "all", label: "Todos los servicios" },
  { key: "reparacion", label: "Reparación y reforzamiento" },
  { key: "imper", label: "Impermeabilización" },
  { key: "sello", label: "Sellado" },
  { key: "pisos", label: "Pisos" },
] as const;
