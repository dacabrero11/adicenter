export type Rating = 0 | 1 | 2 | 3; // 0 = no recomendable, 1 regular, 2 bueno, 3 óptimo

export type Tecnologia = {
  n: string;
  slug: string;
  nombre: string;
  frase: string;
  img: string;
  imgAlt: string;
  idealPara: string;
  ventaja: string;
  referencia: string;
  recomendada?: boolean;
  ratings: {
    aguaPresion: Rating;
    transitoPeatonal: Rating;
    exteriorUV: Rating;
    sustratoHumedo: Rating;
    durabilidad: Rating;
  };
};

export const tecnologias: Tecnologia[] = [
  {
    n: "01",
    slug: "cristalizacion",
    nombre: "Cristalización",
    frase: "La solución que trabaja desde dentro.",
    img: "/images/tecnologias/cristalizacion.webp",
    imgAlt: "Impermeabilización por cristalización penetrando la matriz del concreto",
    idealPara: "Cisternas, sótanos, muros de contención",
    ventaja: "Bloquea el paso del agua dentro de la matriz del concreto.",
    referencia: "VELOSIT® CW 111 · Sika MonoTop®-160 Migrating",
    recomendada: true,
    ratings: { aguaPresion: 3, transitoPeatonal: 1, exteriorUV: 2, sustratoHumedo: 3, durabilidad: 3 },
  },
  {
    n: "02",
    slug: "cementicio",
    nombre: "Cementicio",
    frase: "Adhiere y sella sobre la superficie de concreto.",
    img: "/images/tecnologias/cementicio.webp",
    imgAlt: "Recubrimiento cementicio aplicado con llana sobre losa de concreto",
    idealPara: "Losas, cuartos húmedos, cimentaciones, cisternas",
    ventaja: "Excelente adherencia y tolerancia a la humedad del sustrato.",
    referencia: "Sika MonoTop® 107",
    ratings: { aguaPresion: 2, transitoPeatonal: 1, exteriorUV: 2, sustratoHumedo: 2, durabilidad: 2 },
  },
  {
    n: "03",
    slug: "acrilico",
    nombre: "Acrílico",
    frase: "Membrana reflectiva y elástica para exposición solar.",
    img: "/images/tecnologias/acrilico.webp",
    imgAlt: "Membrana acrílica reflectiva blanca sobre losa de concreto",
    idealPara: "Azoteas, techos planos, terrazas",
    ventaja: "Alta reflectancia solar y buena resistencia a la intemperie.",
    referencia: "Membrana acrílica elastomérica",
    ratings: { aguaPresion: 0, transitoPeatonal: 0, exteriorUV: 3, sustratoHumedo: 1, durabilidad: 2 },
  },
  {
    n: "04",
    slug: "asfaltica",
    nombre: "Asfáltica APP",
    frase: "Membrana prefabricada de alto desempeño.",
    img: "/images/tecnologias/asfaltica.webp",
    imgAlt: "Rollo de membrana asfáltica APP termofusionada sobre losa",
    idealPara: "Cubiertas industriales, losas de estacionamiento, puentes",
    ventaja: "Alta resistencia mecánica y a la intemperie. Larga vida útil.",
    referencia: "Membrana asfáltica APP termofusionada",
    ratings: { aguaPresion: 3, transitoPeatonal: 2, exteriorUV: 3, sustratoHumedo: 1, durabilidad: 3 },
  },
  {
    n: "05",
    slug: "poliuretano",
    nombre: "Poliuretano",
    frase: "Membrana líquida continua de alta elasticidad.",
    img: "/images/tecnologias/poliuretano.webp",
    imgAlt: "Membrana de poliuretano líquido azul aplicada sobre losa de concreto",
    idealPara: "Estacionamientos, pasarelas, balcones transitables",
    ventaja: "Sin juntas ni traslapes. Alta elasticidad y durabilidad.",
    referencia: "Sistema poliuretano líquido",
    ratings: { aguaPresion: 3, transitoPeatonal: 3, exteriorUV: 3, sustratoHumedo: 2, durabilidad: 3 },
  },
];

export const CRITERIOS: { key: keyof Tecnologia["ratings"]; label: string }[] = [
  { key: "aguaPresion", label: "Agua a presión" },
  { key: "transitoPeatonal", label: "Tránsito peatonal" },
  { key: "exteriorUV", label: "Exterior / rayos UV" },
  { key: "sustratoHumedo", label: "Sustrato húmedo" },
  { key: "durabilidad", label: "Durabilidad estimada" },
];
