export type Turno = { rol: "bot" | "user"; texto: string };

export const saludoInicial =
  "Buenas, soy <b>Jimmy</b>. Ando en las obras de ADICENTER y también aquí.<br/><br/>Puedo ayudarle a escoger el sistema correcto, calcular el rendimiento por m² o arrancar su cotización. ¿Qué superficie está tratando?";

export const preguntasRapidas = [
  { label: "Techo filtrando", texto: "Mi techo de lámina está filtrando" },
  { label: "Rendimiento", texto: "¿Cuánto rinde el impermeabilizante por galón?" },
  { label: "Cotizar m²", texto: "Necesito precio para 1200 m²" },
  { label: "Crédito obra", texto: "¿Manejan crédito para constructoras?" },
];

type Entrada = { claves: string[]; respuesta: string };

export const guion: Entrada[] = [
  {
    claves: ["lamina", "lámina", "techo", "filtr", "gotea", "tornillo", "traslape", "bodega"],
    respuesta:
      "Techo de lámina filtrando casi siempre es <b>traslapes y tornillería</b>, no la lámina en sí.<br/><br/>El sistema que recomendamos es: tratamiento de óxido, sellado con ADISEAL PU-40, refuerzo de juntas con malla y dos capas de <b>ADIFLEX 400</b> reflectivo.<br/><br/>¿Cuántos m² aproximados tiene la cubierta?",
  },
  {
    claves: ["rinde", "rendimiento", "galon", "galón", "litro", "cuanto cubre", "cubre"],
    respuesta:
      "Depende del sistema:<br/><br/>• <b>ADIFLEX 400</b> — 1.2 m²/L por capa (van dos capas)<br/>• <b>ADITHANE PU-1</b> — 1.0 kg/m² en dos manos<br/>• <b>ADISEAL CT-2</b> — 1.5 kg por m² y por mm de espesor<br/><br/>Sobre lámina o superficie porosa se calcula un 10–15% adicional. ¿Sobre qué superficie va a aplicar?",
  },
  {
    claves: ["precio", "costo", "cotiz", "cuanto vale", "m2", "m²", "presupuest"],
    respuesta:
      "Con el metraje le armo el estimado. Necesito tres datos:<br/><br/>1. Superficie (lámina, losa, piso o cisterna)<br/>2. Área aproximada en m²<br/>3. Departamento del proyecto<br/><br/>Con eso el equipo le devuelve la cotización formal <b>en menos de 2 horas hábiles</b>, con consumo por m² y ficha técnica incluida.",
  },
  {
    claves: ["credito", "crédito", "constructora", "volumen", "obra", "contratista", "distribuidor"],
    respuesta:
      "Sí. Dentro del <b>Programa Obra</b> manejamos escala de precio por metraje anual, crédito a 30 y 60 días previa evaluación, y despacho por etapas al frente de obra.<br/><br/>También incluye asesor técnico en sitio y capacitación de su cuadrilla antes de arrancar el metraje. ¿Cuántos frentes tiene abiertos actualmente?",
  },
  {
    claves: ["piso", "epoxico", "epóxico", "industrial", "montacarga", "planta", "autonivel"],
    respuesta:
      "Para piso industrial trabajamos <b>ADIPOX SL-100</b>, autonivelante de 100% sólidos, entre 1.5 y 3 mm de espesor y resistencia sobre 75 MPa.<br/><br/>Lo crítico ahí es la preparación: sin granallado o escarificado el sistema se despega. ¿El piso actual tiene brillo, polvo o desprendimiento?",
  },
  {
    claves: ["cisterna", "tanque", "agua potable", "sotano", "sótano", "muro", "presion negativa", "presión negativa"],
    respuesta:
      "Para contacto con agua potable usamos <b>ADISEAL CT-2</b>, cementicio de dos componentes, apto certificado y con desempeño bajo presión negativa.<br/><br/>Antes de recubrir hay que sellar pasamuros y juntas frías, que es donde se pierde el trabajo. ¿La cisterna está en operación o vacía?",
  },
  {
    claves: ["aditivo", "concreto", "mezcla", "fisura", "fragua", "planta", "resistencia"],
    respuesta:
      "En la línea de aditivos lo más pedido es <b>ADIMIX HR-5</b> (reductor de alto rango, ASTM C494 Tipo F) y <b>ADIFIBER PP-12</b> para control de fisuración por retracción.<br/><br/>Si el colado es en planta podemos apoyar con la dosificación. ¿Qué volumen de concreto está manejando?",
  },
  {
    claves: ["garantia", "garantía", "poliza", "póliza", "dura", "vida util", "vida útil"],
    respuesta:
      "La garantía se emite por escrito sobre el <b>sistema completo</b>, no sobre el balde suelto, y está condicionada a que la aplicación sea supervisada por nuestro técnico.<br/><br/>Vida útil según sistema: acrílico 5–7 años, poliuretánico 10–12 años, cementicio hasta 12 años. ¿Le interesa que agendemos la visita de diagnóstico?",
  },
  {
    claves: ["visita", "tecnico", "técnico", "diagnostico", "diagnóstico", "agendar", "ir a ver"],
    respuesta:
      "La visita de diagnóstico es <b>sin costo en proyectos desde 300 m²</b>. Incluye levantamiento, prueba de humedad y adherencia, y el acta con la especificación del sistema.<br/><br/>Déjeme su nombre, teléfono y el municipio del proyecto y se lo agendo con el asesor de su zona.",
  },
  {
    claves: ["envio", "envío", "despacho", "entrega", "tegucigalpa", "san pedro", "sps"],
    respuesta:
      "Despachamos a Tegucigalpa, San Pedro Sula y zona norte en <b>24 a 48 horas</b>; al resto del país entre 48 y 72 horas.<br/><br/>En obras grandes la entrega se programa por etapas para que no tenga material parado en bodega. ¿A qué municipio sería el envío?",
  },
];

export const respuestaGenerica =
  "Con gusto le ayudo. Para darle la respuesta técnica correcta, cuénteme:<br/><br/>• ¿Qué superficie es? (lámina, losa, piso, cisterna o concreto en planta)<br/>• ¿Qué área aproximada tiene?<br/><br/>Si prefiere, un asesor puede llamarle hoy mismo.";

export function responderJimmy(mensaje: string): string {
  const q = mensaje.toLowerCase();
  const hit = guion.find((g) => g.claves.some((k) => q.includes(k)));
  return hit ? hit.respuesta : respuestaGenerica;
}
