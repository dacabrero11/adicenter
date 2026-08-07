export type SistemaKey = "lamina" | "losa" | "piso" | "cisterna";

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
  { key: "lamina", label: "Techo de lámina", hint: "Corrosión, traslapes filtrando, calor excesivo en bodega" },
  { key: "losa", label: "Losa de concreto", hint: "Manchas de humedad en cielo, fisuras, empozamiento" },
  { key: "piso", label: "Piso industrial", hint: "Desgaste, polvo de concreto, tránsito de montacargas" },
  { key: "cisterna", label: "Cisterna o muro", hint: "Presión negativa, contacto con agua potable, sótanos" },
];

export const sistemas: Record<SistemaKey, Sistema> = {
  lamina: {
    key: "lamina",
    label: "Techo de lámina",
    hint: "",
    titulo: "Sistema reflectivo para cubierta metálica",
    descripcion:
      "Tratamiento de corrosión, sellado de traslapes con malla embebida y dos capas de membrana acrílica reflectiva. Baja la temperatura interna de la bodega y detiene la filtración en los tornillos.",
    pasos: [
      ["01", "Lavado a presión y tratamiento de puntos de óxido"],
      ["02", "Sellado de traslapes y tornillería con ADISEAL PU-40"],
      ["03", "Refuerzo de juntas con ADIMESH 60 embebido"],
      ["04", "Dos capas de ADIFLEX 400 en sentido cruzado"],
    ],
    rendimiento: "1.2 m²/L",
    vidaUtil: "5 – 7 años",
    tiempo: "4 – 8 días",
  },
  losa: {
    key: "losa",
    label: "Losa de concreto",
    hint: "",
    titulo: "Sistema poliuretánico para losa expuesta",
    descripcion:
      "Corrección de pendientes y fisuras, imprimante penetrante y membrana poliuretánica con refuerzo en todo el perímetro y bajantes. Pensado para losa que además se camina.",
    pasos: [
      ["01", "Reparación de fisuras y perfilado de pendientes"],
      ["02", "Imprimante ADIPOX PRIMER-E sobre concreto seco"],
      ["03", "Refuerzo perimetral y en bajantes con ADIMESH 60"],
      ["04", "Dos manos de ADITHANE PU-1 más acabado reflectivo"],
    ],
    rendimiento: "1.0 kg/m²",
    vidaUtil: "10 – 12 años",
    tiempo: "6 – 10 días",
  },
  piso: {
    key: "piso",
    label: "Piso industrial",
    hint: "",
    titulo: "Piso epóxico autonivelante industrial",
    descripcion:
      "Preparación mecánica del sustrato, imprimante epóxico y capa autonivelante con demarcación de rutas. Diseñado para tránsito de montacargas y lavado frecuente.",
    pasos: [
      ["01", "Escarificado o granallado del concreto"],
      ["02", "Reparación de juntas con ADIPOX MORTAR-HD"],
      ["03", "Imprimante ADIPOX PRIMER-E"],
      ["04", "Autonivelante ADIPOX SL-100 y demarcación"],
    ],
    rendimiento: "1.5 – 3 mm",
    vidaUtil: "8 – 10 años",
    tiempo: "8 – 14 días",
  },
  cisterna: {
    key: "cisterna",
    label: "Cisterna o muro",
    hint: "",
    titulo: "Sistema cementicio para contacto con agua",
    descripcion:
      "Recubrimiento cementicio de dos componentes apto para agua potable, con sellado de pasamuros y juntas frías. Trabaja también bajo presión negativa en sótanos.",
    pasos: [
      ["01", "Saneo de concreto suelto y apertura de juntas frías"],
      ["02", "Sellado de pasamuros y filtraciones activas"],
      ["03", "Dos capas cruzadas de ADISEAL CT-2"],
      ["04", "Prueba de estanqueidad de 72 horas"],
    ],
    rendimiento: "1.5 kg/m²·mm",
    vidaUtil: "12 años",
    tiempo: "5 – 9 días",
  },
};
