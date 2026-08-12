import Image from "next/image";
import { Reveal } from "./Reveal";
import { InView } from "./InView";

/* ---------- iconos lineales, mismo lenguaje visual del resto del sitio ---------- */

const I = {
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  ruler: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 16l5-5 3 3L21 4" />
      <path d="M14 4h7v7" />
    </svg>
  ),
  droplet: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
    </svg>
  ),
  doc: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  ),
  roller: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="13" height="6" rx="1.2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  bolt: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3h9l-2 7h5l-9 11 2-8H6z" />
    </svg>
  ),
  layers: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  ),
  droplet16: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
    </svg>
  ),
  blueprint: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="1.2" />
      <path d="M3 9h18M8 9v11" />
    </svg>
  ),
  clockFast: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  globe: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.4-3.6-8.5S9.6 5.9 12 3.5z" />
    </svg>
  ),
  link: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 15l6-6M8.5 13 6 15.5a3 3 0 0 0 4.2 4.2L13 17M15.5 11 18 8.5a3 3 0 0 0-4.2-4.2L11 7" />
    </svg>
  ),
  lock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4.5" y="10.5" width="15" height="10" rx="1.5" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
    </svg>
  ),
  hex: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2.5l8.5 4.9v9.2L12 21.5l-8.5-4.9V7.4L12 2.5z" />
      <path d="M12 8.2l4 2.3v4.6l-4 2.3-4-2.3v-4.6l4-2.3z" />
    </svg>
  ),
  arrow: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

const PRINCIPIOS = [
  { icon: I.shield, titulo: "Sistemas comprobados", texto: "Productos probados en laboratorio y en obra real." },
  { icon: I.ruler, titulo: "Ingeniería aplicada", texto: "Especificamos lo que cada estructura realmente necesita." },
  { icon: I.droplet, titulo: "Desempeño garantizado", texto: "Soluciones que protegen y extienden la vida útil." },
  { icon: I.doc, titulo: "Respaldo técnico", texto: "Acompañamiento en todo el ciclo del proyecto." },
];

const LINEAS = [
  {
    n: "01",
    badge: "Línea principal",
    badgeStyle: "bg-hivis/12 text-hivis",
    accent: "#FF6A13",
    titulo: "Reparación y reforzamiento",
    img: "/images/sistemas/reparacion.webp",
    imgAlt: "Bloque de concreto en corte mostrando varilla de refuerzo",
    texto: "Recuperación estructural, refuerzo y reparación de elementos de concreto.",
    specs: [
      [I.roller, "Morteros de reparación", "Sika + Velosit"],
      [I.bolt, "Anclajes químicos", "Sika AnchorFix®"],
      [I.layers, "Grout estructural", "Hasta > C100/115"],
    ],
  },
  {
    n: "02",
    badge: "Línea B",
    badgeStyle: "text-cyan-dim",
    accent: "#01B7DE",
    titulo: "Impermeabilizantes",
    img: "/images/sistemas/impermeabilizantes.webp",
    imgAlt: "Losa de concreto impermeabilizada con membrana azul",
    texto: "Protección impermeable para losa, lámina, cisterna y muro.",
    specs: [
      [I.droplet16, "Base", "Cementicio / cristalino"],
      [I.blueprint, "Aplicación", "Losa · cisterna · muro"],
      [I.clockFast, "Protección", "Sello ultrarrápido"],
      [I.globe, "Origen", "Velosit® · Alemania"],
    ],
  },
  {
    n: "03",
    badge: "Línea C",
    badgeStyle: "text-cyan-dim",
    accent: "#012387",
    titulo: "Epóxicos y anclajes",
    img: "/images/sistemas/anclajes.webp",
    imgAlt: "Anclaje químico con resina epóxica en columna de acero",
    texto: "Adhesivos de alta resistencia, puentes de adherencia y anclajes químicos para cargas altas.",
    specs: [
      [I.link, "Base", "Epóxico bicomponente"],
      [I.lock, "Aplicación", "Cargas altas"],
      [I.link, "Adherencia", "Concreto viejo–nuevo"],
      [I.globe, "Origen", "Sika® · Alemania"],
    ],
  },
] as const;

export function Sistemas() {
  return (
    <InView className="cv-section relative bg-white text-ink">
      {/* blueprint técnico muy sutil — capa de fondo, no protagonista */}
      <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-[.55]" aria-hidden="true" />

      <section id="sistemas" className="relative z-2 py-19 lg:py-28">
        <div className="mx-auto max-w-[1220px] px-6">
          {/* ---- encabezado: texto + 4 principios técnicos ---- */}
          <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-8">
            <Reveal as="div">
              <span className="eyebrow on-light">Tres líneas · un solo criterio técnico</span>
              <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[38px] lg:text-[44px]">
                No vendemos
                <br />
                baldes. Vendemos
                <br />
                <span className="text-navy-500">sistemas completos.</span>
              </h2>
              <p className="mt-5 max-w-[58ch] text-[15.5px] leading-relaxed text-ink-soft">
                Cada producto se especifica dentro de un sistema: preparación, imprimante, capa
                base, refuerzo y acabado. Trabajamos con las líneas de{" "}
                <b className="font-semibold text-navy">Sika®</b> y{" "}
                <b className="font-semibold text-navy">Velosit® (Alemania)</b>, que es la única
                forma de que la garantía signifique algo cuando llega la temporada de lluvia.
              </p>
            </Reveal>

            <Reveal as="div" index={1} className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:gap-x-5">
              {PRINCIPIOS.map((p) => (
                <div key={p.titulo} className="text-center lg:text-left">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-[10px] border border-navy/[.16] text-navy-500 lg:mx-0">
                    {p.icon}
                  </span>
                  <h4 className="font-display mt-3.5 text-[12.5px] uppercase tracking-[0.01em] text-ink">
                    {p.titulo}
                  </h4>
                  <p className="mx-auto mt-1.5 max-w-[16ch] text-[12px] leading-snug text-ink-soft lg:mx-0">
                    {p.texto}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* ---- las tres líneas ---- */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LINEAS.map((l, i) => (
              <Reveal
                key={l.n}
                index={i}
                as="article"
                className="card-live card-live-light border-breathe group flex flex-col overflow-hidden rounded-[6px] border border-navy/[.13] bg-white transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-32px_rgba(1,35,135,.4)]"
              >
                <div className="flex flex-col p-7 pb-6.5">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[22px] leading-none" style={{ color: l.accent }}>
                      {l.n}
                    </span>
                    <span
                      className={`font-mono-adi rounded-full px-2.5 py-1 text-[9.5px] uppercase tracking-[0.13em] ${
                        i === 0 ? l.badgeStyle : ""
                      }`}
                      style={i !== 0 ? { color: l.accent } : undefined}
                    >
                      {l.badge}
                    </span>
                  </div>

                  <h3 className="font-display mt-3.5 text-[21px] leading-[1.08] text-ink sm:text-[23px]">
                    {l.titulo}
                  </h3>
                </div>

                <div className="relative mx-7 flex aspect-[16/11] items-center justify-center">
                  <Image
                    src={l.img}
                    alt={l.imgAlt}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 360px"
                    className="object-contain drop-shadow-[0_18px_26px_rgba(1,35,135,.18)]"
                  />
                </div>

                <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
                  <p className="text-[14px] leading-relaxed text-ink-soft">{l.texto}</p>

                  <ul className="mt-5 border-t border-navy/[.12]">
                    {l.specs.map(([icon, k, v]) => (
                      <li
                        key={k as string}
                        className="flex items-center justify-between gap-3 border-b border-navy/[.09] py-2.75 text-[11.5px]"
                      >
                        <span className="flex min-w-0 items-center gap-2 text-ink-soft">
                          <span className="flex-none text-navy-500/70">{icon}</span>
                          <span className="truncate uppercase tracking-[0.02em]">{k}</span>
                        </span>
                        <b className="flex-none text-right font-semibold uppercase tracking-[0.02em] text-ink">
                          {v}
                        </b>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#catalogo"
                    className="font-mono-adi mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-all hover:gap-2.5"
                    style={{ color: l.accent }}
                  >
                    Ver aplicaciones y especificaciones
                    {I.arrow}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---- franja de cierre ---- */}
          <Reveal
            as="div"
            index={2}
            className="mt-12 flex flex-col items-start gap-5 border-t border-navy/[.13] pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-navy/[.06] text-navy-500">
                {I.hex}
              </span>
              <p className="font-display text-[16px] leading-[1.15] text-ink sm:text-[19px]">
                Una solución correcta empieza
                <br className="hidden sm:block" /> por especificar el sistema correcto.
              </p>
            </div>
            <a
              href="#proceso"
              className="font-mono-adi inline-flex flex-none items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-navy-500 transition-all hover:gap-2.5"
            >
              Ver cómo trabajamos
              {I.arrow}
            </a>
          </Reveal>
        </div>
      </section>
    </InView>
  );
}
