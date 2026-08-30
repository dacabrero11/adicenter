export type SistemaKey = "lamina" | "losa" | "piso" | "cisterna" | "piscina" | "reparacion";

export type Sistema = {
  key: SistemaKey;
  label: string;
  hint: string;
  titulo: string;
  descripcion: string;
  pasos: [string, string][];
  rendimiento: string;
  vidaUtil: string;
  tiempo: string;
};

export const opcionesSuperficie: { key: SistemaKey; label: string; hint: string }[] = [
  { key: "reparacion", label: "Reparación estructural", hint: "Acero expuesto, concreto disgregado, columnas o vigas dañadas" },
  { key: "lamina", label: "Techo de lámina", hint: "Corrosión, traslapes filtrando, calor excesivo en bodega" },
  { key: "losa", label: "Losa de concreto", hint: "Manchas de humedad en cielo, fisuras, empozamiento" },
  { key: "piso", label: "Piso industrial", hint: "Desgaste, polvo de concreto, tránsito de montacargas" },
  { key: "cisterna", label: "Cisterna o muro", hint: "Presión negativa, contacto con agua potable, sótanos" },
  { key: "piscina", label: "Piscina", hint: "Vaso nuevo o piscina que pierde nivel, filtración en focos y skimmers" },
];

export const sistemas: Record<SistemaKey, Sistema> = {
  reparacion: {
    key: "reparacion",
    label: "Reparación estructural",
    hint: "",
    titulo: "Sistema de reparación y reforzamiento",
    descripcion:
      "Saneo del concreto disgregado, protección anticorrosiva del acero expuesto y mortero de reparación estructural. Es el sistema que más aplicamos — devuelve capacidad de carga sin necesidad de demoler.",
    pasos: [
      ["01", "Picado y saneo de concreto disgregado hasta llegar a sustrato sano"],
      ["02", "Limpieza y protección del acero con SikaTop® Armatec®-110 EpoCem®"],
      ["03", "Aplicación de mortero estructural Sika MonoTop®-412 S o VELOSIT® RM 202"],
      ["04", "Sello y acabado con recubrimiento de protección según exposición"],
    ],
    rendimiento: "Según espesor",
    vidaUtil: "Estructural",
    tiempo: "3 – 7 días",
  },
  lamina: {
    key: "lamina",
    label: "Techo de lámina",
    hint: "",
    titulo: "Sistema reflectivo para cubierta metálica",
    descripcion:
      "Tratamiento de corrosión, sellado de traslapes y dos capas de lechada impermeabilizante cementicia flexible. Baja la temperatura interna de la bodega y detiene la filtración en los tornillos.",
    pasos: [
      ["01", "Lavado a presión y tratamiento de puntos de óxido"],
      ["02", "Sellado de traslapes y tornillería"],
      ["03", "Sello de filtraciones activas con VELOSIT® PC 221/222"],
      ["04", "Dos capas de VELOSIT® WP 120 en sentido cruzado"],
    ],
    rendimiento: "Según ficha técnica",
    vidaUtil: "Alta flexibilidad",
    tiempo: "4 – 8 días",
  },
  losa: {
    key: "losa",
    label: "Losa de concreto",
    hint: "",
    titulo: "Sistema cristalino para losa expuesta",
    descripcion:
      "Corrección de fisuras, mortero de reparación con terminado liso y sello por cristalización. Pensado para losa que además se camina.",
    pasos: [
      ["01", "Reparación de fisuras con VELOSIT® RM 211"],
      ["02", "Perfilado de pendientes y bajantes"],
      ["03", "Impermeabilización cristalina VELOSIT® CW 111"],
      ["04", "Prueba de encharcamiento antes de entregar"],
    ],
    rendimiento: "Según espesor",
    vidaUtil: "Larga duración",
    tiempo: "5 – 9 días",
  },
  piso: {
    key: "piso",
    label: "Piso industrial",
    hint: "",
    titulo: "Piso epóxico de alta resistencia",
    descripcion:
      "Preparación mecánica del sustrato, puente de adherencia y sistema epóxico Sikadur® para tránsito de montacargas y lavado frecuente.",
    pasos: [
      ["01", "Escarificado o granallado del concreto"],
      ["02", "Reparación de juntas con mortero Sika MonoTop®"],
      ["03", "Puente de adherencia Sikadur®-32 Gel"],
      ["04", "Sistema epóxico Sikadur® y demarcación"],
    ],
    rendimiento: "Según espesor",
    vidaUtil: "Alta resistencia",
    tiempo: "8 – 14 días",
  },
  cisterna: {
    key: "cisterna",
    label: "Cisterna o muro",
    hint: "",
    titulo: "Sistema cementicio para contacto con agua",
    descripcion:
      "Recubrimiento cementicio de alta resistencia apto para agua potable, con sellado de pasamuros y juntas frías. Trabaja también bajo presión negativa en sótanos.",
    pasos: [
      ["01", "Saneo de concreto suelto y apertura de juntas frías"],
      ["02", "Sellado de pasamuros y filtraciones activas con VELOSIT® PC 221"],
      ["03", "Dos capas cruzadas de VELOSIT® WP 101"],
      ["04", "Prueba de estanqueidad de 72 horas"],
    ],
    rendimiento: "Según espesor",
    vidaUtil: "Alta resistencia",
    tiempo: "5 – 9 días",
  },
  piscina: {
    key: "piscina",
    label: "Piscina",
    hint: "",
    titulo: "Sistema de impermeabilización para piscinas",
    descripcion:
      "Sello de las penetraciones y juntas, membrana cementicia flexible reforzada con malla en los ángulos, y sellado elástico final de accesorios. El vaso queda estanco antes de colocar el gresite, que es cuando todavía se puede corregir.",
    pasos: [
      ["01", "Sello de penetraciones y juntas con SikaSwell® S-2 y waterstop VELOSIT® WS 801"],
      ["02", "Membrana cementicia flexible: VELOSIT® WP 120 o SikaTop® Seal-107, mínimo 2 capas"],
      ["03", "Refuerzo con Sika® Mesh en ángulos, esquinas y encuentros muro-piso"],
      ["04", "Prueba de estanqueidad, revestimiento con SikaCeram®-252 y sello elástico de accesorios"],
    ],
    rendimiento: "Según ficha técnica",
    vidaUtil: "Hasta 5 bar de presión",
    tiempo: "5 – 10 días",
  },
};
