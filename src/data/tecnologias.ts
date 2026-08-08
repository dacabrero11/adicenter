export type Tecnologia = {
  nombre: string;
  etiqueta: string;
  descripcion: string;
  usoTipico: string;
  referencia: string;
};

export const tecnologias: Tecnologia[] = [
  {
    nombre: "Por cristalización",
    etiqueta: "Cristalización",
    descripcion:
      "Sella la matriz del concreto desde adentro: los cristales crecen dentro del poro y bloquean el paso del agua, incluso bajo presión negativa.",
    usoTipico: "Cisternas, sótanos, muros de contención",
    referencia: "VELOSIT® CW 111 · Sika MonoTop®-160 Migrating",
  },
  {
    nombre: "Cementicio",
    etiqueta: "Cementicio",
    descripcion:
      "Lechada rígida o flexible a base de cemento, se adhiere directo al sustrato y admite tránsito y recubrimiento posterior.",
    usoTipico: "Losas, cuartos húmedos, cisternas",
    referencia: "Sika MonoTop® 107",
  },
  {
    nombre: "Sistema acrílico",
    etiqueta: "Acrílico",
    descripcion:
      "Membrana elastomérica aplicada en frío, con alta reflectancia solar. La opción más común para azoteas y techos expuestos al sol directo.",
    usoTipico: "Azoteas, techos planos, terrazas",
    referencia: "Membrana acrílica elastomérica",
  },
  {
    nombre: "Membrana asfáltica APP",
    etiqueta: "Asfáltica APP",
    descripcion:
      "Rollo bituminoso modificado con polipropileno atáctico, termofusionado con soplete. Alta resistencia mecánica para cubiertas de alto tránsito o exposición severa.",
    usoTipico: "Cubiertas industriales, losas de estacionamiento",
    referencia: "Membrana asfáltica APP termofusionada",
  },
  {
    nombre: "Poliuretano líquido",
    etiqueta: "Poliuretano",
    descripcion:
      "Membrana líquida de alta elasticidad, resistente al tránsito peatonal y vehicular directo, sin juntas ni traslapes.",
    usoTipico: "Estacionamientos, pasarelas, balcones transitables",
    referencia: "Sistema poliuretano líquido",
  },
];
