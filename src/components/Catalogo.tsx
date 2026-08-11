"use client";

import { useMemo, useState } from "react";
import { filtrosServicios, servicios } from "@/data/servicios";
import { Reveal } from "./Reveal";
import { SectionBg } from "./SectionBg";

const ICONOS: Record<string, React.ReactNode> = {
  cfrp: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M6 14v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" />
    </svg>
  ),
  grout: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 21V9l8-6 8 6v12" /><path d="M9 21v-6h6v6" />
    </svg>
  ),
  inyeccion: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2v6M9 5h6" /><path d="M8 8h8l-1 13a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2L8 8z" />
    </svg>
  ),
  losa: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="6" width="20" height="12" rx="1" /><path d="M2 12h20M12 6v12" />
    </svg>
  ),
  tanque: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 4h16v16H4z" /><path d="M4 13c3 0 3 3 6 3s3-3 6-3 3 3 4 3" />
    </svg>
  ),
  muro: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 21V9l9-6 9 6v12" /><path d="M3 15h18M9 21v-6M15 21v-6" />
    </svg>
  ),
  junta: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 12h6M15 12h6M9 5v14M15 5v14" />
    </svg>
  ),
  piso: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 3h18v18H3z" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  ),
};

export function Catalogo() {
  const [activo, setActivo] = useState<(typeof filtrosServicios)[number]["key"]>("all");

  const items = useMemo(
    () => (activo === "all" ? servicios : servicios.filter((s) => s.categoria === activo)),
    [activo]
  );

  return (
    <section id="catalogo" className="cv-section relative overflow-hidden py-19 lg:py-30">
      <SectionBg tone="dark" />
      <div className="relative z-2 mx-auto max-w-[1220px] px-6">
        <div className="mb-14 max-w-[760px]">
          <span className="eyebrow">Catálogo de servicios</span>
          <h2 className="font-display mt-4.5 text-[30px] sm:text-[40px] lg:text-[54px]">
            Ocho servicios,
            <br />
            un solo equipo.
          </h2>
          <p className="mt-5 max-w-[62ch] text-[17px] text-white/66">
            Del refuerzo estructural con fibra de carbono hasta el sello de la última junta. No
            subcontratamos: la misma cuadrilla que diagnostica es la que aplica.
          </p>
        </div>

        <div className="mb-8.5 flex flex-wrap gap-2.5">
          {filtrosServicios.map((f) => (
            <button
              key={f.key}
              onClick={() => setActivo(f.key)}
              className={`font-mono-adi min-h-[38px] rounded-full border px-4.5 py-2.5 text-[11px] uppercase tracking-[0.12em] transition-colors duration-250 ${
                activo === f.key
                  ? "border-cyan bg-cyan font-semibold text-navy-950"
                  : "border-white/12 text-white/66 hover:border-white/40 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <Reveal
              key={s.nombre}
              index={i}
              as="article"
              className="card-live border-breathe group flex flex-col rounded-[4px] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,.055),rgba(255,255,255,.015))] px-6 py-6.5 transition-all duration-400 hover:-translate-y-1.25 hover:border-cyan/55 hover:bg-[linear-gradient(160deg,rgba(1,183,222,.11),rgba(255,255,255,.02))]"
            >
              <span className="mb-4 text-cyan">{ICONOS[s.icono]}</span>
              <h4 className="font-display mb-2 text-[19px] tracking-[-0.01em]">{s.nombre}</h4>
              <p className="flex-1 text-[14px] text-white/60">{s.descripcion}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-dashed border-white/16 pt-3.5">
                {s.incluye.map((i) => (
                  <li key={i} className="font-mono-adi flex items-start gap-1.5 text-[9.5px] uppercase tracking-[0.04em] text-white/55">
                    <span className="mt-1 h-1 w-1 flex-none rounded-full bg-cyan" />
                    {i}
                  </li>
                ))}
              </ul>
              <a href="#cotizar" className="font-mono-adi mt-5 inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.12em] text-sky transition-all hover:gap-2.75">
                Cotizar este servicio
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
