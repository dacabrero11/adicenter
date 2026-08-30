export type Turno = { rol: "bot" | "user"; texto: string };

export const saludoInicial =
  "Buenas, soy <b>J1MMY</b>. Ando en las obras de ADICENTER y también aquí.<br/><br/>Puedo ayudarle a escoger el sistema correcto, calcular el rendimiento por m² o arrancar su cotización. ¿Qué superficie está tratando?";

export const preguntasRapidas = [
  { label: "Reparación", texto: "Tengo una columna con el acero expuesto" },
  { label: "Techo filtrando", texto: "Mi techo de lámina está filtrando" },
  { label: "Cotizar m²", texto: "Necesito precio para 1200 m²" },
  { label: "Programa obra", texto: "¿Qué incluye el Programa Obra para constructoras?" },
];

type Entrada = { claves: string[]; respuesta: string };

export const guion: Entrada[] = [
  {
    claves: ["lamina", "lámina", "techo", "filtr", "gotea", "tornillo", "traslape", "bodega"],
    respuesta:
      "Techo de lámina filtrando casi siempre es <b>traslapes y tornillería</b>, no la lámina en sí.<br/><br/>El sistema que recomendamos es: tratamiento de óxido, sello de puntos activos con <b>VELOSIT® PC 221/222</b> y dos capas de <b>VELOSIT® WP 120</b> flexible.<br/><br/>¿Cuántos m² aproximados tiene la cubierta?",
  },
  {
    claves: ["rinde", "rendimiento", "galon", "galón", "litro", "cuanto cubre", "cubre"],
    respuesta:
      "El rendimiento exacto depende del producto — trabajamos con <b>Sika®</b> y <b>Velosit® (Alemania)</b>, y cada línea trae su propia ficha técnica con el consumo por m².<br/><br/>Sobre lámina o superficie porosa siempre se calcula un 10–15% adicional. Dígame la superficie y le confirmo el consumo exacto con la ficha del producto.",
  },
  {
    claves: ["precio", "costo", "cotiz", "cuanto vale", "m2", "m²", "presupuest"],
    respuesta:
      "Con el metraje le armo el estimado. Necesito tres datos:<br/><br/>1. Superficie (lámina, losa, piso, cisterna o piscina)<br/>2. Área aproximada en m²<br/>3. Departamento del proyecto<br/><br/>Con eso el equipo le devuelve la cotización formal <b>en menos de 24 horas</b>, con consumo por m² y ficha técnica incluida.",
  },
  {
    claves: ["constructora", "volumen", "programa obra", "contratista", "distribuidor"],
    respuesta:
      "Sí. Dentro del <b>Programa Obra</b> manejamos escala de precio por metraje anual y despacho por etapas al frente de obra.<br/><br/>También incluye asesor técnico en sitio, visita de diagnóstico sin costo y capacitación de su cuadrilla antes de arrancar el metraje. ¿Cuántos frentes tiene abiertos actualmente?",
  },
  {
    claves: ["piso", "epoxico", "epóxico", "industrial", "montacarga", "planta", "autonivel"],
    respuesta:
      "Para piso industrial trabajamos el sistema epóxico <b>Sikadur®</b>: puente de adherencia más capa epóxica de alta resistencia.<br/><br/>Lo crítico ahí es la preparación: sin granallado o escarificado el sistema se despega. ¿El piso actual tiene brillo, polvo o desprendimiento?",
  },
  {
    claves: ["piscina elevada", "elevada", "suspendida", "vibracion", "vibración", "azotea"],
    respuesta:
      "Para piscina elevada o suspendida el sistema cambia: usamos <b>VELOSIT® WP 124</b>, que permite ajustar la mezcla variando el polímero según la condición de presión y resiste mejor la presión negativa.<br/><br/>Si el vaso todavía no se ha vaciado, conviene meter aditivo cristalizante <b>CA 112</b> o <b>CA 115</b> en el concreto: le da propiedad auto-reparable ante microfisuras de hasta 0.5 mm.<br/><br/>¿En qué etapa está el proyecto?",
  },
  {
    claves: ["piscina", "piscinas", "alberca", "vaso", "gresite", "azulejo", "skimmer", "skimmers", "pileta"],
    respuesta:
      "Para piscinas trabajamos el sistema completo, no solo el recubrimiento.<br/><br/>La membrana es <b>VELOSIT® WP 120</b> (elongación mayor al 100%, soporta hasta 5 bar) o <b>SikaTop® Seal-107</b>, mínimo 2 capas. Pero lo que decide el resultado es el paso previo: sellar tuberías, focos y desagües con <b>SikaSwell® S-2</b>, y las juntas piso-pared con waterstop <b>WS 801</b>. Ahí es donde se pierden casi todas las piscinas.<br/><br/>¿Es piscina nueva o una que ya está perdiendo nivel?",
  },
  {
    claves: ["credito", "crédito", "financiamiento", "a plazo", "fiado"],
    respuesta:
      "Por ahora no manejamos línea de crédito; las compras son de contado.<br/><br/>Lo que sí aplica para constructoras es el <b>Programa Obra</b>: escala de precio por metraje anual, despacho por etapas al frente de obra y capacitación de su cuadrilla. ¿Quiere que le pase el detalle?",
  },
  {
    claves: ["cisterna", "tanque", "agua potable", "sotano", "sótano", "muro", "presion negativa", "presión negativa"],
    respuesta:
      "Para contacto con agua potable usamos <b>VELOSIT® WP 101</b>, mortero cementicio de alta resistencia con desempeño bajo presión negativa.<br/><br/>Antes de recubrir hay que sellar pasamuros y juntas frías con <b>VELOSIT® PC 221</b>, que es donde se pierde el trabajo. ¿La cisterna está en operación o vacía?",
  },
  {
    claves: ["aditivo", "concreto", "mezcla", "fragua", "planta", "resistencia"],
    respuesta:
      "En aditivos trabajamos el <b>aditivo cristalino líquido VELOSIT®</b>, que impermeabiliza y plastifica la mezcla desde la planta.<br/><br/>Si el colado es en planta podemos apoyar con la dosificación. ¿Qué volumen de concreto está manejando?",
  },
  {
    claves: ["garantia", "garantía", "poliza", "póliza", "dura", "vida util", "vida útil"],
    respuesta:
      "La garantía se emite por escrito sobre el <b>sistema completo</b>, no sobre el balde suelto, y está condicionada a que la aplicación sea supervisada por nuestro técnico.<br/><br/>La vida útil exacta depende de la línea (Sika® o Velosit®) y queda especificada en la ficha técnica. ¿Le interesa que agendemos la visita de diagnóstico?",
  },
  {
    claves: ["visita", "tecnico", "técnico", "diagnostico", "diagnóstico", "agendar", "ir a ver"],
    respuesta:
      "La visita de diagnóstico es <b>sin costo, sin metraje mínimo</b>. Incluye levantamiento, prueba de humedad y adherencia, y el acta con la especificación del sistema.<br/><br/>Déjeme su nombre, teléfono y el municipio del proyecto y se lo agendo con el asesor de su zona.",
  },
  {
    claves: ["reparacion", "reparación", "reforzamiento", "acero expuesto", "columna", "viga", "corrosion", "corrosión", "concreto dañado", "disgregado", "fisura", "grieta"],
    respuesta:
      "Reparación y reforzamiento es <b>lo que más hacemos</b>.<br/><br/>El sistema típico es: picado y saneo del concreto dañado, protección anticorrosiva del acero expuesto con <b>SikaTop® Armatec®-110 EpoCem®</b> y mortero estructural <b>Sika MonoTop®</b> o <b>VELOSIT® RM 202</b>.<br/><br/>¿La estructura tiene acero de refuerzo visible o es solo desprendimiento superficial de concreto?",
  },
  {
    claves: ["envio", "envío", "despacho", "entrega", "tegucigalpa", "san pedro", "sps"],
    respuesta:
      "Despachamos a Tegucigalpa, San Pedro Sula y zona norte en <b>24 a 48 horas</b>; al resto del país entre 48 y 72 horas.<br/><br/>En obras grandes la entrega se programa por etapas para que no tenga material parado en bodega. ¿A qué municipio sería el envío?",
  },
];

export const respuestaGenerica =
  "Con gusto le ayudo. Para darle la respuesta técnica correcta, cuénteme:<br/><br/>• ¿Qué superficie es? (lámina, losa, piso, cisterna, piscina o concreto en planta)<br/>• ¿Qué área aproximada tiene?<br/><br/>Si prefiere, un asesor puede llamarle hoy mismo.";

export function responderJimmy(mensaje: string): string {
  const q = mensaje.toLowerCase();
  const hit = guion.find((g) => g.claves.some((k) => q.includes(k)));
  return hit ? hit.respuesta : respuestaGenerica;
}
