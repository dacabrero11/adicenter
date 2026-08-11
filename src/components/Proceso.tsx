"use client";

import { useEffect, useRef, useState } from "react";
import { SectionBg } from "./SectionBg";

const PASOS = [
  {
    n: "01",
    titulo: "Visita y diagnóstico",
    texto:
      "Levantamiento de la superficie, prueba de humedad y adherencia, e identificación de los puntos críticos reales del área.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    n: "02",
    titulo: "Especificación técnica",
    texto:
      "Se define el sistema completo con espesores, consumos por m² y cronograma. Queda por escrito antes de comprar material.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    n: "03",
    titulo: "Suministro y arranque",
    texto:
      "Despacho al frente de obra, capacitación de la cuadrilla y aplicación supervisada del primer paño de control.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" />
        <path d="M16 8h4l3 3v5h-7z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    n: "04",
    titulo: "Cierre y garantía",
    texto:
      "Prueba de estanqueidad, acta de entrega con registro fotográfico y emisión de la póliza de garantía del sistema.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export function Proceso() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setOn(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="cv-section relative text-ink">
      <SectionBg tone="light" />
      <section id="proceso" className="relative z-2 py-19 lg:py-30">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="mb-16 max-w-[760px]">
            <span className="eyebrow on-light">Cómo trabajamos</span>
            <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[40px] lg:text-[54px]">
              Del diagnóstico
              <br />
              al acta de entrega.
            </h2>
          </div>

          <div ref={ref} className="relative">
            {/* riel de fondo */}
            <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-navy/[.14] lg:block" />
            {/* línea de avance que se dibuja */}
            <div
              className={`absolute left-0 right-0 top-[27px] hidden h-[2px] bg-gradient-to-r from-cyan via-navy-500 to-hivis lg:block ${
                on ? "draw-line" : "scale-x-0"
              }`}
              style={{ transformOrigin: "left" }}
            />

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {PASOS.map((p, i) => (
                <div key={p.n} className="group relative">
                  {/* nodo */}
                  <div
                    className={`relative z-2 flex h-[54px] w-[54px] items-center justify-center rounded-full border border-navy/[.16] bg-white text-navy shadow-[0_10px_28px_-14px_rgba(1,35,135,.5)] transition-all duration-400 group-hover:border-cyan group-hover:text-cyan group-hover:shadow-[0_16px_38px_-14px_rgba(1,183,222,.7)] ${
                      on ? "node-pop" : "opacity-0"
                    } ${on && i === 0 ? "node-ring" : ""}`}
                    style={{ animationDelay: on ? `${i * 160}ms` : undefined }}
                  >
                    {p.icon}
                  </div>

                  <div
                    className={`mt-6 transition-all duration-700 ${
                      on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: on ? `${240 + i * 160}ms` : undefined }}
                  >
                    <div className="font-mono-adi text-[10.5px] uppercase tracking-[0.2em] text-cyan-dim">
                      Paso {p.n}
                    </div>
                    <h4 className="font-display mt-3 mb-2.5 text-[17px] text-ink transition-colors duration-300 group-hover:text-navy-500">
                      {p.titulo}
                    </h4>
                    <p className="max-w-[34ch] text-sm text-ink-soft">{p.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
