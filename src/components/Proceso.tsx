const PASOS = [
  {
    n: "Paso 01",
    titulo: "Visita y diagnóstico",
    texto: "Levantamiento de la superficie, prueba de humedad y adherencia, e identificación de los puntos críticos reales del área.",
  },
  {
    n: "Paso 02",
    titulo: "Especificación técnica",
    texto: "Se define el sistema completo con espesores, consumos por m² y cronograma. Queda por escrito antes de comprar material.",
  },
  {
    n: "Paso 03",
    titulo: "Suministro y arranque",
    texto: "Despacho al frente de obra, capacitación de la cuadrilla y aplicación supervisada del primer paño de control.",
  },
  {
    n: "Paso 04",
    titulo: "Cierre y garantía",
    texto: "Prueba de estanqueidad, acta de entrega con registro fotográfico y emisión de la póliza de garantía del sistema.",
  },
];

export function Proceso() {
  return (
    <div className="bg-paper text-ink">
      <section id="proceso" className="py-19 lg:py-30">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="mb-14 max-w-[760px]">
            <span className="eyebrow on-light">Cómo trabajamos</span>
            <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[40px] lg:text-[54px]">
              Del diagnóstico
              <br />
              al acta de entrega.
            </h2>
          </div>
          <div className="grid grid-cols-1 border-t border-navy/[.14] sm:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((p, i) => (
              <div
                key={p.n}
                className={`relative border-navy/[.14] px-6.5 pt-8.5 pb-6 sm:border-b lg:border-b-0 ${
                  i < 3 ? "lg:border-r" : ""
                } ${i % 2 === 0 ? "sm:border-r lg:border-r" : ""}`}
              >
                <div className="font-mono-adi text-[11px] tracking-[0.2em] text-cyan-dim">{p.n}</div>
                <h4 className="font-display mt-4 mb-2.5 text-[17px] text-ink">{p.titulo}</h4>
                <p className="text-sm text-ink-soft">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
