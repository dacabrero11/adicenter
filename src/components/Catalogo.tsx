"use client";

import { useMemo, useState } from "react";
import { filtros, productos } from "@/data/productos";

export function Catalogo() {
  const [activo, setActivo] = useState<(typeof filtros)[number]["key"]>("all");

  const items = useMemo(
    () => (activo === "all" ? productos : productos.filter((p) => p.categoria === activo)),
    [activo]
  );

  return (
    <section id="catalogo" className="relative overflow-hidden bg-navy-900 py-19 lg:py-30">
      <div className="pointer-events-none absolute inset-0 opacity-[.03] mix-blend-overlay" />
      <div className="blueprint-grid absolute inset-0" style={{ opacity: 0.6 }} />
      <div className="relative z-2 mx-auto max-w-[1220px] px-6">
        <div className="mb-14 max-w-[760px]">
          <span className="eyebrow">Catálogo técnico</span>
          <h2 className="font-display mt-4.5 text-[30px] sm:text-[40px] lg:text-[54px]">
            Cada producto,
            <br />
            con su ficha.
          </h2>
          <p className="mt-5 max-w-[62ch] text-[17px] text-white/66">
            Rendimientos reales, presentaciones disponibles y norma de referencia. Sin letra
            chiquita: si un sistema no aplica para su superficie, se lo decimos antes de
            facturar.
          </p>
        </div>

        <div className="mb-8.5 flex flex-wrap gap-2.5">
          {filtros.map((f) => (
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
          {items.length === 0 ? (
            <div className="font-mono-adi col-span-full p-10 text-center text-[12px] uppercase tracking-[0.1em] text-white/50">
              Sin productos en esta línea
            </div>
          ) : (
            items.map((p) => (
              <article
                key={p.nombre}
                className="group relative flex flex-col overflow-hidden rounded-[4px] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,.055),rgba(255,255,255,.015))] px-6 py-6.5 transition-all duration-400 hover:-translate-y-1.25 hover:border-cyan/55 hover:bg-[linear-gradient(160deg,rgba(1,183,222,.11),rgba(255,255,255,.02))]"
              >
                <span className="font-mono-adi text-[9.5px] uppercase tracking-[0.18em] text-cyan">{p.familia}</span>
                <h4 className="font-display mt-3 mb-2 text-[21px] tracking-[-0.01em]">{p.nombre}</h4>
                <p className="flex-1 text-[14.5px] text-white/60">{p.descripcion}</p>
                <div className="mt-5 border-t border-dashed border-white/16 pt-3.5">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="font-mono-adi flex justify-between gap-3 py-1.25 text-[10.5px] uppercase tracking-[0.06em] text-white/50">
                      <span>{k}</span>
                      <b className="font-medium text-white">{v}</b>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <a href="#cotizar" className="font-mono-adi inline-flex items-center gap-1.5 py-2.75 text-[10.5px] uppercase tracking-[0.12em] text-sky transition-all hover:gap-2.75">
                    Ficha técnica
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
