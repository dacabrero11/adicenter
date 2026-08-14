"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const PASOS = [
  {
    n: "01",
    titulo: "Diagnóstico",
    texto: "Visitamos, evaluamos y detectamos los puntos críticos del área.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    n: "02",
    titulo: "Especificación",
    texto: "Definimos el sistema completo, espesores, consumos por m² y el método de aplicación.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    n: "03",
    titulo: "Ejecución",
    texto: "Suministramos, capacitamos y supervisamos la aplicación en obra.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="1" y="3" width="15" height="13" />
        <path d="M16 8h4l3 3v5h-7z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    n: "04",
    titulo: "Garantía",
    texto: "Realizamos pruebas de estanqueidad y entregamos acta de garantía.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export function Proceso() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    let done = false;
    let raf1 = 0;
    let raf2 = 0;
    let rafCheck = 0;

    const arm = () => {
      if (done) return;
      done = true;
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      // Doble rAF: garantiza que el estado inicial (scaleX(0), nodos en
      // opacity 0) se pinte en un frame propio antes de cambiar al final.
      // Sin esto el navegador colapsa ambos valores y no interpola.
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
    };

    // Red de seguridad idéntica a la de Reveal: con `content-visibility`
    // la sección puede estar sin layout (alto/ancho 0) justo cuando el
    // usuario llega de un salto de ancla, y entonces el observer nunca
    // alcanza su umbral. Medir la posición real lo resuelve.
    const check = () => {
      rafCheck = 0;
      if (done || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh - 40 && r.bottom > 0) arm();
    };
    const onScroll = () => {
      if (rafCheck) return;
      rafCheck = requestAnimationFrame(check);
    };

    // threshold 0: no dependemos del área del elemento, que puede ser 0
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && arm()),
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (rafCheck) cancelAnimationFrame(rafCheck);
    };
  }, []);

  return (
    <div className="cv-section relative overflow-hidden text-ink">
      {/* fondo blueprint claro */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #f5f8fd 0%, #eef4fb 40%, #e8f0fa 100%)",
        }}
      />
      <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-[.40]" aria-hidden="true" />

      <section id="proceso" className="relative z-2 py-19 lg:py-28">
        <div className="mx-auto max-w-[1260px] px-6">

          {/* ---- encabezado ---- */}
          <div className="mb-14 max-w-[680px]">
            <span className="inline-flex items-center gap-2.5">
              <span className="h-px w-7 bg-navy-500" />
              <span className="font-mono-adi text-[10.5px] uppercase tracking-[0.2em] text-navy-500">
                Cómo trabajamos
              </span>
            </span>
            <h2 className="font-display mt-5 text-[32px] leading-[1.05] text-ink sm:text-[42px] lg:text-[54px]">
              Del diagnóstico
              <br />
              <span className="text-navy-500">al acta de entrega.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
              Un proceso técnico, claro y comprobable.
              <br />Así aseguramos resultados que duran.
            </p>
          </div>

          {/* ---- timeline ---- */}
          <div ref={ref} className={`relative ${visible ? "is-on" : ""}`}>

            {/* línea horizontal desktop */}
            <div className="absolute left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] top-[38px] hidden h-px bg-navy/[.12] lg:block" />
            {/* puntos de conexión intermedios */}
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="proceso-dot absolute top-[34px] hidden h-[9px] w-[9px] rounded-full border-2 border-navy/[.35] bg-white lg:block"
                style={
                  {
                    left: `${12.5 + i * 25}%`,
                    "--d": `${420 + i * 190}ms`,
                  } as CSSProperties
                }
              />
            ))}
            {/* línea animada que se dibuja */}
            <div className="proceso-line absolute left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] top-[38px] hidden h-[2px] lg:block" />

            {/* 4 pasos */}
            <div className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
              {PASOS.map((paso, i) => (
                <div
                  key={paso.n}
                  className="flex flex-col items-start lg:items-center"
                >
                  {/* icono en círculo */}
                  <div className="relative lg:mx-auto">
                    {/* halo sutil */}
                    <span
                      className="absolute -inset-[6px] rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(1,35,135,.09) 0%, transparent 72%)",
                      }}
                    />
                    {/* línea vertical en mobile que conecta los pasos */}
                    {i < PASOS.length - 1 && (
                      <span className="absolute left-[37px] top-[78px] h-10 w-px bg-navy/[.14] lg:hidden" />
                    )}
                    <div
                      className="proceso-node z-2 flex h-[76px] w-[76px] items-center justify-center rounded-full border border-navy/[.18] bg-white text-navy-500"
                      style={{ "--d": `${300 + i * 190}ms` } as CSSProperties}
                    >
                      {paso.icon}
                    </div>
                  </div>

                  {/* contenido */}
                  <div
                    className={`mt-7 pl-1 text-left transition-all duration-700 lg:pl-0 lg:text-center ${
                      visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: visible ? `${480 + i * 190}ms` : "0ms" }}
                  >
                    <span className="font-display text-[28px] leading-none text-navy-500">{paso.n}</span>
                    <h4 className="font-display mt-3 text-[15px] font-bold uppercase tracking-[0.04em] text-ink">
                      {paso.titulo}
                    </h4>
                    {/* línea decorativa bajo el título */}
                    <span className="mt-2.5 block h-px w-7 bg-navy-500/50 lg:mx-auto" />
                    <p className="mt-3 max-w-[28ch] text-[13.5px] leading-relaxed text-ink-soft lg:mx-auto">
                      {paso.texto}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- franja inferior de cierre ---- */}
          <div
            className={`mt-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: visible ? "900ms" : "0ms" }}
          >
            <div className="flex flex-col items-start justify-between gap-5 rounded-[10px] border border-navy/[.14] bg-white/70 px-7 py-5 backdrop-blur-[2px] sm:flex-row sm:items-center">
              <div className="flex items-center gap-3.5">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-navy/[.16] text-navy-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <strong className="font-display block text-[15px] uppercase tracking-[0.04em] text-navy-500">
                    Un solo equipo.
                  </strong>
                  <span className="font-mono-adi text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                    De la primera visita a la garantía.
                  </span>
                </div>
              </div>
              <a
                href="#cotizar"
                className="font-mono-adi inline-flex flex-none items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-navy-500 transition-all hover:gap-3 hover:text-navy"
              >
                Cotizar proyecto
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
