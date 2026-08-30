"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { StatsCounter } from "./StatsCounter";
import { RevealRepeat } from "./RevealRepeat";
import { CAPAS, HeroBlock } from "./HeroBlock";
import { scrollToHash } from "./scrollToHash";

const PARTICULAS = [
  { l: "12%", t: "22%", s: 2, d: "0s" },
  { l: "28%", t: "68%", s: 1.5, d: "2.4s" },
  { l: "46%", t: "16%", s: 2, d: "5.1s" },
  { l: "63%", t: "78%", s: 1.5, d: "1.2s" },
  { l: "78%", t: "34%", s: 2.5, d: "3.6s" },
  { l: "88%", t: "60%", s: 1.5, d: "6.3s" },
  { l: "36%", t: "45%", s: 1.5, d: "8.1s" },
  { l: "70%", t: "12%", s: 2, d: "4.4s" },
];

/**
 * Devuelve, para cada capa, dónde está realmente en el bloque (`ancla`) y
 * dónde se dibuja su etiqueta (`y`).
 *
 * No coinciden, y no pueden: las capas 01 a 04 se apilan dentro de ~10% del
 * alto del bloque (unos 48 px en escritorio), mientras que una etiqueta
 * legible ocupa unos 60 px. Por eso las etiquetas se reparten de forma
 * legible, centradas sobre el conjunto de capas para que el desvío quede
 * repartido, y una línea guía une cada una con su capa.
 */
function posicionar(alto: number, minSep: number) {
  const ancla = CAPAS.map((c) => (c.ly / 100) * alto);
  const n = ancla.length;

  const span = minSep * (n - 1);
  const centroIdeal = (ancla[0] + ancla[n - 1]) / 2;

  // centramos el grupo sobre las capas y lo mantenemos dentro del bloque
  let inicio = centroIdeal - span / 2;
  const margen = minSep * 0.55;
  inicio = Math.max(margen, Math.min(inicio, alto - span - margen));

  const y = Array.from({ length: n }, (_, i) => inicio + i * minSep);
  return { y, ancla };
}

/** Trazado de la guía: sale del borde de la placa y entra a la etiqueta. */
function trazo(anclaY: number, etiquetaY: number) {
  return `M -16 ${anclaY.toFixed(1)} L -4 ${anclaY.toFixed(1)} C 6 ${anclaY.toFixed(1)} 8 ${etiquetaY.toFixed(1)} 18 ${etiquetaY.toFixed(1)} L 26 ${etiquetaY.toFixed(1)}`;
}

export function Hero() {
  const [focus, setFocus] = useState<number | null>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [altoBloque, setAltoBloque] = useState(0);

  // La posición de las etiquetas depende del alto real del bloque, que cambia
  // con el ancho de la ventana por su aspect ratio.
  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAltoBloque(el.getBoundingClientRect().height));
    ro.observe(el);
    setAltoBloque(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, []);

  const pos = altoBloque > 0 ? posicionar(altoBloque, 68) : null;

  // Las placas flotan (parallax, hover, despliegue ambiental), así que un
  // ancla fija se desalinea. El bloque nos pasa el desplazamiento real de
  // cada capa en cada frame y aquí reescribimos el trazado directo en el DOM:
  // pasar por estado de React serían 60 renders por segundo.
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const posRef = useRef(pos);
  posRef.current = pos;

  const onFrame = useCallback((offsetsY: number[]) => {
    const p = posRef.current;
    if (!p) return;
    for (let i = 0; i < offsetsY.length; i++) {
      const anclaY = p.ancla[i] + offsetsY[i];
      pathRefs.current[i]?.setAttribute("d", trazo(anclaY, p.y[i]));
      dotRefs.current[i]?.setAttribute("cy", anclaY.toFixed(1));
    }
  }, []);

  return (
    <section className="relative overflow-hidden pt-[56px] md:pt-[76px]">
      {/* ---- fondo bicolor: claro del lado del texto, oscuro del lado del bloque ---- */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="hero-split" />
        {/* la trama y las partículas se enmascaran para vivir solo sobre lo oscuro */}
        <div className="hero-dark-only">
          <div className="blueprint-grid absolute inset-0 opacity-70" />
          {PARTICULAS.map((p, i) => (
            <span
              key={i}
              className="hero-particle"
              style={{
                left: p.l,
                top: p.t,
                width: p.s,
                height: p.s,
                animationDelay: p.d,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-2 mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-10 px-6 pb-16 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-6 xl:max-w-[1460px] 2xl:max-w-[1560px]">
        {/* ---- columna de texto ---- */}
        <RevealRepeat>
          <span className="eyebrow eyebrow-light hero-line" style={{ animationDelay: "0.05s" }}>
            Centro de aditivos, epóxicos e impermeabilizantes
          </span>

          <h1 className="font-display mt-5 text-[clamp(2.15rem,4.3vw,3.9rem)] leading-[0.92] text-ink">
            <span className="hero-line" style={{ animationDelay: "0.15s" }}>
              No vendemos
            </span>
            <br />
            <span className="hero-line" style={{ animationDelay: "0.3s" }}>
              materiales.
            </span>
            <br />
            <span className="hero-line" style={{ animationDelay: "0.45s" }}>
              Diseñamos
            </span>
            <br />
            <span className="hero-line text-navy" style={{ animationDelay: "0.6s" }}>
              sistemas.
            </span>
          </h1>

          <p
            className="hero-line mt-7 max-w-[46ch] text-base text-ink/72 sm:text-[18px]"
            style={{ animationDelay: "0.8s" }}
          >
            Diseñamos, suministramos y supervisamos soluciones para impermeabilizar, reparar y
            proteger concreto, desde el diagnóstico hasta la ejecución en obra.
          </p>

          <div className="hero-line mt-9 flex flex-wrap gap-3.5" style={{ animationDelay: "0.95s" }}>
            <Button href="#sistemas">Ver sistemas</Button>
            <Button onClick={() => scrollToHash("#cotizar")} variant="ghostLight">
              Cotizar proyecto
            </Button>
          </div>

          <div className="hero-line mt-6" style={{ animationDelay: "1.1s" }}>
            <span className="font-mono-adi flex items-center gap-2.5 text-[12px] uppercase tracking-[0.1em] text-ink/55">
              <span className="dot-live" /> Respuesta a cotizaciones en menos de 24 horas
            </span>
          </div>
        </RevealRepeat>

        {/* ---- bloque + etiquetas de capa ---- */}
        <div className="flex items-center gap-3 lg:gap-5">
          <div ref={blockRef} className="min-w-0 flex-1">
            <HeroBlock onLayerFocus={setFocus} onFrame={onFrame} />
          </div>

          <ul
            className="relative w-full md:w-[248px] flex-none xl:w-[300px] 2xl:w-[330px]"
            style={pos ? { height: altoBloque } : undefined}
          >
            {/* líneas guía: unen cada etiqueta con la altura real de su capa */}
            {pos && (
              <svg
                className="pointer-events-none absolute -left-7 top-0 h-full w-7 overflow-visible"
                aria-hidden="true"
              >
                {CAPAS.map((c, i) => {
                  const on = focus === i;
                  const a = pos.ancla[i];
                  const y = pos.y[i];
                  return (
                    <g key={c.n}>
                      {/* punto sobre el borde de la placa */}
                      <circle
                        ref={(el) => {
                          dotRefs.current[i] = el;
                        }}
                        cx={-16}
                        cy={a}
                        r={on ? 2.6 : 1.8}
                        fill={on ? "var(--cyan)" : "rgba(255,255,255,.5)"}
                        style={{ transition: "fill 300ms, r 300ms" }}
                      />
                      <path
                        ref={(el) => {
                          pathRefs.current[i] = el;
                        }}
                        d={trazo(a, y)}
                        fill="none"
                        stroke={on ? "var(--cyan)" : "rgba(255,255,255,.28)"}
                        strokeWidth={on ? 1.5 : 1}
                        style={{ transition: "stroke 300ms, stroke-width 300ms" }}
                      />
                    </g>
                  );
                })}
              </svg>
            )}
            {CAPAS.map((c, i) => {
              const on = focus === i;
              return (
                <li
                  key={c.n}
                  className="hero-label md:absolute md:left-0 md:right-0"
                  style={{
                    animationDelay: `${2.5 + i * 0.09}s`,
                    ...(pos ? { top: pos.y[i], transform: "translateY(-50%)" } : {}),
                  }}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-mono-adi text-[13px] tracking-[0.16em] transition-colors duration-300 xl:text-[14px] ${
                        on ? "text-cyan" : "text-white/45"
                      }`}
                    >
                      {c.n} /
                    </span>
                    <span
                      className={`font-mono-adi text-[14px] uppercase leading-tight tracking-[0.08em] transition-colors duration-300 xl:text-[15px] ${
                        on ? "text-cyan" : "text-white"
                      }`}
                    >
                      {c.titulo}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[13px] leading-snug text-white/62 xl:text-[14px]">{c.desc}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ---- barra de datos ---- */}
      <div className="relative z-2 border-y border-white/10 bg-navy-950">
        <StatsCounter />
      </div>
    </section>
  );
}
