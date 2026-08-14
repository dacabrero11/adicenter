"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { InView } from "./InView";

/* ---------- íconos naranja para los 6 beneficios ---------- */
const ICONOS = [
  /* 01 escala precio */
  <svg key="01" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M18 20V10M12 20V4M6 20v-6" />
    <path d="M3 3l4 4 4-4 4 4 4-4" />
  </svg>,
  /* 02 crédito */
  <svg key="02" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="2" y="6" width="20" height="13" rx="2" />
    <path d="M2 11h20M6 16h2M10 16h4" />
  </svg>,
  /* 03 asesor */
  <svg key="03" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />
    <circle cx="12" cy="11" r="2.5" />
  </svg>,
  /* 04 cuadrillas */
  <svg key="04" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  /* 05 garantía */
  <svg key="05" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M9 15l2 2 4-4" />
  </svg>,
  /* 06 entrega */
  <svg key="06" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h4l3 3v5h-7z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>,
];

const BENEFICIOS = [
  { n: "01", titulo: "Escala de precio por volumen", texto: "Tabulador por metraje anual proyectado, no por pedido suelto.", principal: true },
  { n: "02", titulo: "Crédito a 30 y 60 días", texto: "Línea aprobada tras evaluación, sujeta a historial y respaldo." },
  { n: "03", titulo: "Asesor técnico en sitio", texto: "Visita de diagnóstico, prueba de adherencia y acta de arranque." },
  { n: "04", titulo: "Capacitación de cuadrillas", texto: "Taller de aplicación con su personal antes de iniciar el metraje." },
  { n: "05", titulo: "Garantía por escrito", texto: "Póliza del sistema completo, condicionada a aplicación supervisada." },
  { n: "06", titulo: "Entrega programada", texto: "Despacho por etapas al frente de obra, sin bodega muerta." },
];

const STATS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
      </svg>
    ),
    valor: "1",
    label: "Programa",
    sub: "Condiciones diseñadas para obra.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="6" />
        <path d="M8.56 2.75a8 8 0 0 0 .49 14.21M15.44 2.75a8 8 0 0 1-.49 14.21M12 22v-2" />
      </svg>
    ),
    valor: "6",
    label: "Beneficios",
    sub: "Ventajas que impulsan su proyecto.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20h20M5 20V8l7-5 7 5v12" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
    valor: "1",
    label: "Equipo técnico",
    sub: "Acompañamiento de principio a fin.",
  },
];

export function ProgramaObra() {
  return (
    <InView
      as="section"
      id="obra"
      className="cv-section relative overflow-hidden bg-[linear-gradient(150deg,var(--navy),var(--navy-950)_72%)] py-19 lg:py-28"
    >
      {/* fondo técnico */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: "repeating-linear-gradient(115deg,transparent 0 26px,rgba(1,183,222,.055) 26px 27px)" }}
        aria-hidden="true"
      />

      <div className="relative z-2 mx-auto max-w-[1280px] px-6">
        {/* ---- fila superior: texto | grid de beneficios ---- */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
          {/* columna izquierda */}
          <Reveal as="div">
            <span className="eyebrow">Programa Obra · constructoras y desarrolladores</span>
            <h2 className="font-display mt-4.5 text-[30px] leading-[1.03] sm:text-[38px] lg:text-[46px]">
              Si maneja volumen,
              <br />
              <span className="text-cyan">obtenga condiciones de obra.</span>
            </h2>
            <div className="mt-1.5 h-px w-[72px] bg-cyan/60" />
            <p className="mt-5 max-w-[50ch] text-[15.5px] text-white/66">
              Precios por volumen, entregas programadas y acompañamiento técnico para
              constructoras, contratistas y desarrolladores.
            </p>

            {/* gráfico de barras 3D */}
            <div className="relative mt-10 hidden lg:block">
              <div className="grafico-barras-wrap relative max-w-[340px]">
                <Image
                  src="/images/grafico-barras.webp"
                  alt="Crecimiento de proyectos ADICENTER"
                  width={900}
                  height={635}
                  className="grafico-barras-img h-auto w-full drop-shadow-[0_18px_40px_rgba(1,183,222,.35)]"
                />
              </div>
              <div className="absolute bottom-4 right-0 flex items-center gap-2.5 rounded-[6px] border border-cyan/25 bg-navy-950/80 px-3.5 py-3">
                <span className="text-cyan">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <span>
                  <strong className="font-display block text-[11px] uppercase tracking-[0.04em] text-white">Condiciones diseñadas</strong>
                  <span className="text-[10.5px] text-cyan">para proyectos que construyen en grande.</span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* columna derecha: grid 3×2 de beneficios */}
          <div className="overflow-hidden rounded-[8px] border border-white/10">
            <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
              {BENEFICIOS.map((b, i) => (
                <Reveal
                  key={b.n}
                  index={i}
                  className="relative bg-[linear-gradient(155deg,rgba(1,35,135,.60),rgba(1,20,80,.70))] px-5.5 py-6 transition-colors duration-300 hover:bg-[linear-gradient(155deg,rgba(1,35,135,.80),rgba(1,20,80,.90))]"
                >
                  {b.principal && (
                    <span className="font-mono-adi absolute right-4 top-3.5 rounded-full bg-hivis px-2 py-0.5 text-[8.5px] uppercase tracking-[0.08em] text-white">
                      Beneficio principal
                    </span>
                  )}
                  <span className="font-mono-adi mb-4 block text-[10.5px] text-white/35">{b.n}</span>
                  <span className="text-hivis-soft">{ICONOS[i]}</span>
                  <strong className="font-display mt-3.5 block text-[14.5px] uppercase leading-tight tracking-[0.01em] text-white">
                    {b.titulo}
                  </strong>
                  <div className="mt-2 h-px w-8 bg-hivis/60" />
                  <small className="mt-3 block text-[12.5px] leading-relaxed text-white/60">{b.texto}</small>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ---- fila inferior: stats | CTA ---- */}
        <Reveal as="div" index={6} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr]">
          {/* stats */}
          <div className="flex flex-wrap gap-6 rounded-[6px] border border-white/10 bg-white/[.03] px-6 py-5 sm:flex-nowrap">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-1 items-center gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[8px] border border-white/15 text-cyan">
                  {s.icon}
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[22px] leading-none text-white">{s.valor}</div>
                  <div className="font-mono-adi mt-0.5 text-[9.5px] uppercase tracking-[0.06em] text-white">{s.label}</div>
                  <div className="mt-0.75 text-[11px] text-white/45">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col justify-between rounded-[6px] border border-white/10 bg-white/[.03] px-6 py-5">
            <div>
              <h4 className="font-display text-[16.5px] uppercase leading-tight text-white">
                ¿Tiene varios frentes<br />de obra abiertos?
              </h4>
              <p className="mt-1.5 text-[12.5px] text-white/55">
                Conversemos sobre condiciones para su proyecto.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a
                href="#cotizar"
                className="font-mono-adi inline-flex items-center gap-2 rounded-[4px] bg-hivis px-5.5 py-3 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-14px_rgba(255,106,19,.7)] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d33]"
              >
                Solicitar condiciones de obra
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <span className="font-mono-adi text-[10px] text-white/40">Respuesta en menos de 24 horas</span>
            </div>
          </div>
        </Reveal>
      </div>
    </InView>
  );
}
