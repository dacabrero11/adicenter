"use client";

import Image from "next/image";
import { useState } from "react";
import { opcionesSuperficie, sistemas, type SistemaKey } from "@/data/sistemas";
import { Button } from "./Button";
import { SectionBg } from "./SectionBg";
import { InView } from "./InView";

const ICONOS: Record<SistemaKey, React.ReactNode> = {
  reparacion: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 15l2 2 4-4" />
    </svg>
  ),
  lamina: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 18l4-12M8 18l4-12M14 18l4-12M20 18l2-6M2 18h20" />
    </svg>
  ),
  losa: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="6" width="20" height="12" rx="1" /><path d="M2 12h20M12 6v12" />
    </svg>
  ),
  piso: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 3h18v18H3z" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  ),
  cisterna: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 4h16v16H4z" /><path d="M4 13c3 0 3 3 6 3s3-3 6-3 3 3 4 3" />
    </svg>
  ),
};

export function Selector() {
  const [sel, setSel] = useState<SistemaKey>("reparacion");
  const s = sistemas[sel];

  return (
    <InView className="cv-section relative text-ink">
      <SectionBg tone="light" />
      <section id="selector" className="relative z-2 py-19 lg:py-30">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="mb-14 max-w-[760px]">
            <span className="eyebrow on-light">Selector de sistema</span>
            <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[40px] lg:text-[54px]">
              Dígame qué
              <br />
              se está mojando.
            </h2>
            <p className="mt-5 max-w-[62ch] text-[17px] text-ink-soft">
              Elija la superficie del proyecto y le mostramos el sistema recomendado, el orden de
              aplicación y el rendimiento estimado antes de que nos escriba.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[.95fr_1.05fr]">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {opcionesSuperficie.map((o) => {
                const on = o.key === sel;
                return (
                  <button
                    key={o.key}
                    onClick={() => setSel(o.key)}
                    className={`card-live relative rounded-[4px] border p-5.5 text-left transition-all duration-300 hover:-translate-y-0.75 ${
                      on
                        ? "border-navy bg-navy text-white shadow-[0_20px_44px_-24px_rgba(1,35,135,.8)]"
                        : "card-live-light border-navy/[.14] bg-white hover:border-cyan"
                    }`}
                  >
                    <span className="mb-3.5 block text-cyan">{ICONOS[o.key]}</span>
                    <strong className="font-display block text-[16px] tracking-[-0.005em]">{o.label}</strong>
                    <small className={`mt-1.5 block text-[12.5px] leading-snug ${on ? "text-white/66" : "text-ink-soft"}`}>
                      {o.hint}
                    </small>
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-full overflow-hidden rounded-[4px] bg-navy-900 px-7 py-8.5 text-white">
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(70% 60% at 90% 0%,rgba(1,183,222,.22),transparent 65%)" }}
              />
              <div key={s.key} className="animate-panel-fade relative z-2">
                <div className="mb-4.5 flex items-center gap-3.25">
                  <Image
                    src="/images/jimmy-face.png"
                    alt=""
                    width={50}
                    height={50}
                    className="h-[50px] w-[50px] rounded-full object-cover shadow-[inset_0_0_0_1px_rgba(1,183,222,.35)]"
                  />
                  <span className="font-mono-adi text-[9.5px] uppercase leading-relaxed tracking-[0.15em] text-white/58">
                    Recomendación de
                    <b className="block font-medium text-cyan">Jimmy · técnico ADICENTER</b>
                  </span>
                </div>

                <h4 className="font-display text-[22px] leading-[1.02] sm:text-[28px] lg:text-[30px]">{s.titulo}</h4>
                <p className="mt-3.5 text-[15px] text-white/68">{s.descripcion}</p>

                <div className="mt-6.5 flex flex-col">
                  {s.pasos.map(([n, texto]) => (
                    <div key={n} className="flex gap-4 border-t border-white/12 py-3.5">
                      <em className="font-mono-adi min-w-[38px] pt-0.75 text-[10.5px] not-italic tracking-[0.14em] text-cyan">{n}</em>
                      <span className="text-[14.5px] text-white/82">{texto}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6.5 flex flex-wrap gap-6.5">
                  {[
                    [s.rendimiento, "Rendimiento"],
                    [s.vidaUtil, "Comportamiento"],
                    [s.tiempo, "Tiempo de obra"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <div className="font-display text-[22px] leading-none text-white sm:text-[26px]">{v}</div>
                      <div className="font-mono-adi mt-1.5 text-[9.5px] uppercase tracking-[0.14em] text-white/50">{l}</div>
                    </div>
                  ))}
                </div>
                <p className="font-mono-adi mt-3 text-[9px] uppercase tracking-[0.1em] text-white/35">
                  Cifras de referencia · se confirman con la ficha técnica de la marca antes de cotizar
                </p>

                <Button href="#cotizar" className="mt-7 w-full">Cotizar este sistema</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </InView>
  );
}
