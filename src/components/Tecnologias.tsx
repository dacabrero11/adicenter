"use client";

import Image from "next/image";
import { useState } from "react";
import { InView } from "./InView";
import { Reveal } from "./Reveal";
import { CRITERIOS, tecnologias, type Rating } from "@/data/tecnologias";

/* ---- puntos de rating ---- */
function Dots({ v, max = 3 }: { v: Rating; max?: number }) {
  return (
    <span className="flex items-center justify-center gap-[3.5px]">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`h-[7px] w-[7px] rounded-full ${
            i < v ? "bg-cyan" : v === 0 && i === 0 ? "bg-white/20" : "bg-white/20"
          }`}
        />
      ))}
    </span>
  );
}

/* ---- ícono de cada tecnología ---- */
const ICONOS: Record<string, React.ReactNode> = {
  cristalizacion: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2l2.8 4.8H18l-2.4 3.7 1.6 5-5.2-2-5.2 2 1.6-5L6 6.8h3.2z" />
    </svg>
  ),
  cementicio: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="5" width="13" height="6" rx="1.2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  acrilico: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M17.7 6.3l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  ),
  asfaltica: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
    </svg>
  ),
  poliuretano: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
    </svg>
  ),
};

const TECNO_ICON_COLORES: Record<string, string> = {
  cristalizacion: "text-cyan",
  cementicio: "text-sky",
  acrilico: "text-hivis-soft",
  asfaltica: "text-cyan",
  poliuretano: "text-cyan",
};

export function Tecnologias({ onAskJimmy }: { onAskJimmy?: (m?: string) => void }) {
  const [active, setActive] = useState<string>("cristalizacion");
  const tecActiva = tecnologias.find((t) => t.slug === active) ?? tecnologias[0];

  return (
    <InView
      as="section"
      className="cv-section relative overflow-hidden bg-[linear-gradient(165deg,var(--navy-900),var(--navy-950))] py-19 text-white lg:py-28"
    >
      <div className="blueprint-grid absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative z-2 mx-auto max-w-[1280px] px-6">
        {/* ---- encabezado ---- */}
        <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
          <Reveal as="div" className="max-w-[680px]">
            <span className="eyebrow">Cinco tecnologías de impermeabilización</span>
            <h2 className="font-display mt-4.5 text-[28px] sm:text-[36px] lg:text-[42px]">
              Cinco tecnologías.
              <br />
              <span className="text-cyan">Una solución según el sustrato.</span>
            </h2>
            <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-white/60">
              No aplicamos la misma impermeabilización en todos los proyectos. Seleccionamos la
              tecnología según el sustrato, exposición, tránsito, presión de agua y vida útil
              esperada.
            </p>
          </Reveal>

          <Reveal
            as="div"
            index={1}
            className="hidden flex-none items-center gap-3 rounded-[8px] border border-white/12 bg-white/[.04] px-5 py-3.5 lg:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-navy-500/30 text-cyan">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <div>
              <strong className="font-display block text-[12.5px] uppercase tracking-[0.02em] text-white">
                Calidad ADICENTER
              </strong>
              <span className="text-[11.5px] text-white/55">
                Sistemas probados en obra y respaldados por garantía.
              </span>
            </div>
          </Reveal>
        </div>

        {/* ---- 5 cards de tecnologías ---- */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {tecnologias.map((t, i) => {
            const on = active === t.slug;
            return (
              <Reveal
                key={t.slug}
                index={i}
                as="article"
                className="overflow-hidden rounded-[6px]"
              >
                <div
                  onClick={() => setActive(t.slug)}
                  className={`card-live relative flex h-full cursor-pointer flex-col border transition-all duration-300 hover:-translate-y-1 ${
                    on
                      ? "border-cyan/60 bg-[linear-gradient(160deg,rgba(1,183,222,.14),rgba(1,183,222,.04))] shadow-[0_22px_50px_-24px_rgba(1,183,222,.45)]"
                      : "border-white/10 bg-white/[.025] hover:border-white/25"
                  }`}
                >
                {t.recomendada && (
                  <span className="font-mono-adi absolute left-4 top-3.5 z-10 flex items-center gap-1 rounded-full bg-hivis px-2 py-0.75 text-[8.5px] uppercase tracking-[0.08em] text-white">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3 6 7 1-5 5 1 7-6-3.5L6 21l1-7-5-5 7-1z" />
                    </svg>
                    Recomendada
                  </span>
                )}

                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image
                    src={t.img}
                    alt={t.imgAlt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 230px"
                    className="object-contain object-bottom transition-transform duration-400 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <span className={`font-display text-[18px] leading-none text-cyan/60`}>{t.n}</span>
                    <span className={`${TECNO_ICON_COLORES[t.slug]}`}>{ICONOS[t.slug]}</span>
                  </div>
                  <h3 className="font-display mt-2.5 text-[16px] text-white">{t.nombre}</h3>
                  <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-white/55">{t.frase}</p>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="font-mono-adi text-[8.5px] uppercase tracking-[0.1em] text-cyan/70">
                      Ideal para
                    </div>
                    <div className="mt-1 text-[11.5px] text-white/80">{t.idealPara}</div>
                    <div className="font-mono-adi mt-3 text-[8.5px] uppercase tracking-[0.1em] text-white/40">
                      Ventaja principal
                    </div>
                    <div className="mt-1 text-[11.5px] text-white/65">{t.ventaja}</div>
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

        {/* ---- tabla comparativa rápida ---- */}
        <Reveal as="div" index={5} className="mt-10 overflow-hidden rounded-[6px] border border-white/10">
          <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[.03] px-5.5 py-3.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-cyan">
              <path d="M3 3h18v18H3z" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
            </svg>
            <span className="font-mono-adi text-[10.5px] uppercase tracking-[0.1em] text-white/55">
              Comparación rápida
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="w-[160px] px-5.5 py-3.5">
                    <span className="sr-only">Tecnología</span>
                  </th>
                  {CRITERIOS.map((c) => (
                    <th
                      key={c.key}
                      className="px-2 py-3.5 text-center"
                    >
                      <span className="font-mono-adi text-[9px] uppercase tracking-[0.06em] text-white/45">
                        {c.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tecnologias.map((t, i) => (
                  <tr
                    key={t.slug}
                    onClick={() => setActive(t.slug)}
                    className={`cursor-pointer border-b border-white/[.07] transition-colors last:border-b-0 hover:bg-white/[.03] ${
                      active === t.slug ? "bg-cyan/[.06]" : ""
                    }`}
                  >
                    <td className="px-5.5 py-3.5">
                      <span className="font-mono-adi mr-2 text-[9px] text-white/35">{t.n}</span>
                      <span className="text-[13px] font-medium text-white">{t.nombre}</span>
                    </td>
                    {CRITERIOS.map((c) => (
                      <td key={c.key} className="px-2 py-3.5 text-center">
                        <Dots v={t.ratings[c.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-5 border-t border-white/10 bg-white/[.02] px-5.5 py-3">
            {[["Óptimo",3],["Bueno",2],["Regular",1]].map(([label,v]) => (
              <span key={label as string} className="inline-flex items-center gap-1.5">
                <Dots v={v as Rating} />
                <span className="font-mono-adi text-[9px] text-white/40">{label as string}</span>
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5">
              <Dots v={0} />
              <span className="font-mono-adi text-[9px] text-white/40">No recomendable</span>
            </span>
          </div>
        </Reveal>

        {/* ---- CTA con Jimmy ---- */}
        {onAskJimmy && (
          <Reveal as="div" index={6} className="mt-10 flex flex-col items-start gap-5 rounded-[6px] border border-white/10 bg-white/[.03] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/15 bg-navy-500/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-cyan">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <div>
                <strong className="font-display block text-[15.5px] text-white">
                  ¿No sabe cuál corresponde a su superficie?
                </strong>
                <span className="text-[13px] text-white/55">
                  Jimmy puede analizar su caso y recomendarle el sistema adecuado en segundos.
                </span>
              </div>
            </div>
            <button
              onClick={() => onAskJimmy("Quisiera saber qué tecnología de impermeabilización es la adecuada para mi superficie")}
              className="font-mono-adi flex-none rounded-[4px] bg-hivis px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-14px_rgba(255,106,19,.7)] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d33]"
            >
              Analizar mi superficie →
            </button>
          </Reveal>
        )}
      </div>
    </InView>
  );
}
