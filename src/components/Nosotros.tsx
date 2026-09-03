"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { InView } from "./InView";
import { scrollToHash } from "./scrollToHash";

/* Fotos reales de ADICENTER en obra. El pie describe lo que se ve,
   sin atribuir proyecto ni cliente: eso lo confirma Jaime. */
const FOTOS = [
  {
    src: "/images/nosotros/cuadrilla-subestacion.webp",
    alt: "Cuadrilla de ADICENTER en una subestación eléctrica",
    pie: "Cuadrilla en obra · subestación eléctrica",
  },
  {
    src: "/images/nosotros/equipo-campo.webp",
    alt: "Equipo técnico de ADICENTER trabajando en campo",
    pie: "Equipo técnico en campo",
  },
  {
    src: "/images/nosotros/induccion-seguridad.webp",
    alt: "Inducción de seguridad industrial del personal de ADICENTER",
    pie: "Inducción de seguridad industrial",
  },
];

const AVANCE_MS = 6000;

export function Nosotros() {
  const [i, setI] = useState(0);
  const [pausado, setPausado] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const ir = useCallback((n: number) => {
    setI(((n % FOTOS.length) + FOTOS.length) % FOTOS.length);
  }, []);

  /* Autoavance: se detiene al pasar el puntero, al enfocar con teclado
     y cuando el visitante pide menos movimiento. */
  useEffect(() => {
    if (pausado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setI((v) => (v + 1) % FOTOS.length), AVANCE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [pausado]);

  return (
    <InView>
      <section id="nosotros" className="cv-section relative overflow-hidden bg-navy-950 py-19 lg:py-28">
        <div className="blueprint-grid absolute inset-0 opacity-25" aria-hidden="true" />

        <div className="relative z-2 mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-[.92fr_1.08fr] lg:gap-14 lg:px-8">
          {/* ---------- columna de texto ---------- */}
          <div className="min-w-0">
            <Reveal as="div" index={0}>
              <span className="eyebrow flex items-center gap-3 text-sky">
                <span className="h-px w-8 flex-none bg-cyan" />
                Nuestra historia
              </span>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.4rem)] font-bold uppercase leading-[1.03] tracking-[-0.01em] text-white">
                Quiénes
                <br />
                <span className="text-cyan">somos</span>
              </h2>
              <span className="mt-3 block h-[3px] w-[168px] bg-cyan" />
            </Reveal>

            <Reveal as="div" index={1}>
              <p className="mt-7 max-w-[52ch] text-[15px] leading-[1.7] text-white/70 lg:text-[16px]">
                ADICENTER es el Centro de Aditivos, Epóxicos e Impermeabilizantes.
                Desde 2017 diseñamos, suministramos y supervisamos sistemas para
                impermeabilizar, reparar y proteger concreto en Honduras.
              </p>
              <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-white/70 lg:text-[16px]">
                No vendemos materiales sueltos: definimos el sistema que corresponde
                a cada superficie y lo aplicamos con cuadrillas propias, capacitadas
                en el producto y supervisadas en obra. Esa es la parte que sostiene
                la garantía.
              </p>
            </Reveal>

            <Reveal as="div" index={2}>
              <a
                href="#cotizar"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash("#cotizar");
                }}
                className="font-mono-adi mt-8 inline-flex items-center gap-2 border-b border-cyan/40 pb-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-cyan transition-all hover:gap-3.5 hover:border-cyan"
              >
                Hablemos de su proyecto
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Reveal>
          </div>

          {/* ---------- carrusel ---------- */}
          <Reveal as="div" index={1} className="min-w-0">
            <div
              className="relative"
              onMouseEnter={() => setPausado(true)}
              onMouseLeave={() => setPausado(false)}
              onFocusCapture={() => setPausado(true)}
              onBlurCapture={() => setPausado(false)}
            >
              {/* franja de marca sobre el marco */}
              <span className="block h-[3px] w-full rounded-t-[10px] bg-gradient-to-r from-cyan via-hivis to-cyan" aria-hidden="true" />

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-[10px] bg-navy">
                {FOTOS.map((f, n) => (
                  <Image
                    key={f.src}
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    priority={n === 0}
                    className={`object-cover transition-opacity duration-700 ${
                      n === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* velo inferior para que el pie se lea sobre cualquier foto */}
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/85 to-transparent"
                  aria-hidden="true"
                />

                <p className="font-mono-adi absolute bottom-4 left-5 right-16 text-[11px] uppercase tracking-[0.08em] text-white/90 sm:text-[12px]">
                  {FOTOS[i].pie}
                </p>

                {/* flechas */}
                <button
                  onClick={() => ir(i - 1)}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy-950/70 text-white backdrop-blur-sm transition-all hover:border-cyan hover:bg-navy-950/90 sm:h-10 sm:w-10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  onClick={() => ir(i + 1)}
                  aria-label="Foto siguiente"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy-950/70 text-white backdrop-blur-sm transition-all hover:border-cyan hover:bg-navy-950/90 sm:h-10 sm:w-10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>

              {/* puntos */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {FOTOS.map((f, n) => (
                  <button
                    key={f.src}
                    onClick={() => ir(n)}
                    aria-label={`Ver foto ${n + 1}`}
                    aria-current={n === i}
                    className={`h-2 rounded-full transition-all ${
                      n === i ? "w-6 bg-cyan" : "w-2 bg-white/25 hover:bg-white/45"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </InView>
  );
}
