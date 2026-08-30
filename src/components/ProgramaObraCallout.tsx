"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * Callout compacto del Programa Obra.
 * Se usa una segunda vez después de la sección de Proyectos, cuando
 * el visitante ya vio las obras realizadas y tiene contexto para
 * valorar la oferta. No repite el gráfico ni el grid de beneficios
 * — solo el gancho, los tres puntos más fuertes y el CTA.
 */
export function ProgramaObraCallout() {
  return (
    <section
      aria-label="Programa Obra para constructoras"
      className="relative overflow-hidden bg-navy-950 py-16 sm:py-20"
    >
      {/* misma textura diagonal que ProgramaObra */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "repeating-linear-gradient(115deg,transparent 0 26px,rgba(1,183,222,.055) 26px 27px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-2 mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_auto]">
          {/* texto */}
          <Reveal as="div" className="max-w-[680px]">
            <span className="font-mono-adi text-[11px] uppercase tracking-[0.22em] text-cyan">
              Programa Obra · constructoras y desarrolladores
            </span>
            <h2 className="font-display mt-3 text-[24px] leading-[1.06] text-white sm:text-[30px] lg:text-[36px]">
              ¿Maneja volumen?
              <br />
              <span className="text-cyan">Las condiciones cambian.</span>
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {[
                ["Precio por escala anual", "Tabulador según metraje proyectado."],
                ["Entrega programada", "Por etapas al frente de obra."],
                ["Garantía por escrito", "Hasta 10 años, condicionada a instalación supervisada."],
              ].map(([t, d]) => (
                <li key={t} className="flex min-w-[220px] items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan/15">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-cyan"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-white">{t}</span>
                    <span className="text-[13px] text-white/55">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* CTA */}
          <Reveal as="div" index={1} className="flex flex-col items-start gap-4 lg:items-end">
            <Link
              href="#obra"
              className="font-mono-adi inline-flex items-center gap-2 rounded-[5px] bg-hivis px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-14px_rgba(255,106,19,.7)] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d33]"
            >
              Ver condiciones de obra
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#cotizar"
              className="font-mono-adi text-[12px] uppercase tracking-[0.1em] text-white/50 underline-offset-4 transition-colors hover:text-cyan hover:underline"
            >
              O solicitar cotización directa →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
