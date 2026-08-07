const PILARES = [
  {
    color: "#01B7DE",
    idx: "01 — Línea A",
    titulo: "Aditivos para concreto",
    texto:
      "Corrigen el comportamiento de la mezcla en planta y en obra: trabajabilidad, tiempo de fraguado, resistencia temprana y control de fisuras por retracción.",
    specs: [
      ["Reductores de agua", "4 grados"],
      ["Acelerantes / retardantes", "Sí"],
      ["Fibras estructurales", "PP y acero"],
      ["Dosificación en planta", "Incluida"],
    ],
  },
  {
    color: "#012387",
    idx: "02 — Línea B",
    titulo: "Epóxicos industriales",
    texto:
      "Pisos que aguantan montacargas, químicos y lavado a presión. Autonivelantes, morteros epóxicos, anclajes y sistemas antiderrapantes para planta y bodega.",
    specs: [
      ["Espesor de aplicación", "0.3 – 6 mm"],
      ["Resistencia compresión", "≥ 70 MPa"],
      ["Grado alimenticio", "Disponible"],
      ["Puesta en servicio", "24 – 72 h"],
    ],
  },
  {
    color: "#FF6A13",
    idx: "03 — Línea C",
    titulo: "Impermeabilizantes",
    texto:
      "Membranas acrílicas, poliuretánicas y cementicias para losa, lámina, cisterna y muro. Con refuerzo de malla en juntas y detalles críticos, que es donde realmente se filtra el agua.",
    specs: [
      ["Vida útil del sistema", "5 – 12 años"],
      ["Elongación", "hasta 400 %"],
      ["Reflectancia solar", "hasta 87 %"],
      ["Contacto con agua potable", "Línea certificada"],
    ],
  },
] as const;

export function Sistemas() {
  return (
    <div className="bg-paper text-ink relative">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" className="-mb-1.5 block w-full">
        <path d="M0 90 L0 46 C 200 -8, 420 78, 700 40 C 960 6, 1180 74, 1440 30 L1440 90 Z" fill="var(--paper)" />
        <path d="M0 46 C 200 -8, 420 78, 700 40 C 960 6, 1180 74, 1440 30" stroke="var(--cyan)" strokeWidth={2} fill="none" opacity={0.55} />
      </svg>

      <section id="sistemas" className="py-19 lg:py-30">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="mb-14 max-w-[760px]">
            <span className="eyebrow on-light">Tres líneas · un solo criterio técnico</span>
            <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[40px] lg:text-[54px]">
              No vendemos
              <br />
              baldes. Vendemos
              <br />
              sistemas completos.
            </h2>
            <p className="mt-5 max-w-[62ch] text-[17px] text-ink-soft">
              Cada producto se especifica dentro de un sistema: preparación, imprimante, capa
              base, refuerzo y acabado. Es la única forma de que la garantía signifique algo
              cuando llega la temporada de lluvia.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PILARES.map((p) => (
              <article
                key={p.titulo}
                className="group relative overflow-hidden rounded-[4px] border border-navy/[.14] bg-white p-7.5 pb-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_28px_60px_-34px_rgba(1,35,135,.55)]"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: p.color }}
                />
                <span className="font-mono-adi text-[11px] tracking-[0.2em]" style={{ color: p.color }}>
                  {p.idx}
                </span>
                <h3 className="font-display mt-4 mb-3 text-[19px] text-ink sm:text-[22px]">{p.titulo}</h3>
                <p className="text-[15px] text-ink-soft">{p.texto}</p>
                <ul className="mt-5.5 border-t border-navy/[.14] pt-4">
                  {p.specs.map(([k, v]) => (
                    <li key={k} className="font-mono-adi flex justify-between gap-3.5 py-2 text-[11px] uppercase tracking-[0.05em] text-ink-soft">
                      <span>{k}</span>
                      <b className="font-semibold text-ink">{v}</b>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
