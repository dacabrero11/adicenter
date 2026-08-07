const PILARES = [
  {
    color: "#FF6A13",
    idx: "01 — Nuestro fuerte",
    titulo: "Reparación y reforzamiento",
    texto:
      "Grout, adhesivos estructurales, anclajes químicos y morteros de reparación con las líneas Sika® MonoTop/SikaTop y Velosit® RM. Es el trabajo que más hacemos: devolverle capacidad de carga a una estructura sin rehacerla.",
    specs: [
      ["Morteros de reparación", "Sika + Velosit"],
      ["Anclajes químicos", "Sika AnchorFix®"],
      ["Grout estructural", "Hasta > C100/115"],
      ["Recubrimiento anticorrosivo", "Incluido"],
    ],
    destacado: true,
  },
  {
    color: "#01B7DE",
    idx: "02 — Línea B",
    titulo: "Impermeabilizantes",
    texto:
      "Lechadas cementicias y cristalinas Velosit® para losa, lámina, cisterna y muro. Con sello de filtraciones activas y refuerzo en juntas, que es donde realmente se filtra el agua.",
    specs: [
      ["Base", "Cementicio / cristalino"],
      ["Flexibilidad", "Estándar y alta"],
      ["Filtraciones activas", "Sello ultrarrápido"],
      ["Origen", "Velosit® Alemania"],
    ],
    destacado: false,
  },
  {
    color: "#012387",
    idx: "03 — Línea C",
    titulo: "Epóxicos y anclajes",
    texto:
      "Adhesivos Sikadur® de alta resistencia, puentes de adherencia y anclajes químicos para varillas y pernos de alto desempeño, en concreto fisurado o sano.",
    specs: [
      ["Base", "Epóxico bicomponente"],
      ["Anclajes químicos", "Cargas altas"],
      ["Puente de adherencia", "Concreto viejo–nuevo"],
      ["Origen", "Sika®"],
    ],
    destacado: false,
  },
  {
    color: "#0A2461",
    idx: "04 — Línea D",
    titulo: "Aditivos para concreto",
    texto:
      "Aditivos que corrigen el comportamiento de la mezcla desde la planta: impermeabilización integral por cristalización y control de trabajabilidad.",
    specs: [
      ["Formato", "Líquido"],
      ["Función", "Impermeabilizante + plastificante"],
      ["Aplicación", "Dosificación en planta"],
      ["Origen", "Velosit® Alemania"],
    ],
    destacado: false,
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
            <span className="eyebrow on-light">Cuatro líneas · un solo criterio técnico</span>
            <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[40px] lg:text-[54px]">
              No vendemos
              <br />
              baldes. Vendemos
              <br />
              sistemas completos.
            </h2>
            <p className="mt-5 max-w-[62ch] text-[17px] text-ink-soft">
              Cada producto se especifica dentro de un sistema: preparación, imprimante, capa
              base, refuerzo y acabado. Trabajamos con las líneas de{" "}
              <b className="font-semibold text-navy">Sika®</b> y{" "}
              <b className="font-semibold text-navy">Velosit® (Alemania)</b>, que es la única
              forma de que la garantía signifique algo cuando llega la temporada de lluvia.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {PILARES.map((p) => (
              <article
                key={p.titulo}
                className={`group relative overflow-hidden rounded-[4px] border bg-white p-7.5 pb-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_28px_60px_-34px_rgba(1,35,135,.55)] ${
                  p.destacado ? "border-hivis/40 shadow-[0_18px_44px_-30px_rgba(255,106,19,.55)]" : "border-navy/[.14]"
                }`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: p.color }}
                />
                {p.destacado && (
                  <span className="font-mono-adi absolute right-6 top-6 rounded-full bg-hivis/12 px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-hivis">
                    Énfasis ADICENTER
                  </span>
                )}
                <span className="font-mono-adi text-[11px] tracking-[0.2em]" style={{ color: p.color }}>
                  {p.idx}
                </span>
                <h3 className="font-display mt-4 mb-3 text-[20px] text-ink sm:text-[23px]">{p.titulo}</h3>
                <p className="max-w-[62ch] text-[15px] text-ink-soft">{p.texto}</p>
                <ul className="mt-5.5 grid grid-cols-1 gap-x-6 border-t border-navy/[.14] pt-4 sm:grid-cols-2">
                  {p.specs.map(([k, v]) => (
                    <li key={k} className="font-mono-adi flex justify-between gap-3.5 py-2 text-[11px] uppercase tracking-[0.05em] text-ink-soft">
                      <span className="flex-none">{k}</span>
                      <b className="min-w-0 flex-1 text-right font-semibold text-ink">{v}</b>
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
