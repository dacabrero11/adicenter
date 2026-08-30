"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { proyectos, FILTROS, HEADER_STATS, type StatIcono } from "@/data/proyectos";
import { Reveal } from "./Reveal";
import { InView } from "./InView";

const POR_PAGINA = 6;

/* ---- íconos por tipo de stat ---- */
const STAT_ICONO: Record<StatIcono, React.ReactNode> = {
  columna: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="2" width="6" height="20" rx="1"/><rect x="14" y="6" width="6" height="16" rx="1"/>
    </svg>
  ),
  capas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>
    </svg>
  ),
  platina: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="8" width="20" height="4" rx="1"/><path d="M2 14h20M2 18h20"/>
    </svg>
  ),
  gota: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>
    </svg>
  ),
  escudo: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  reloj: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  perno: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2v14M8 12l4 4 4-4M6 20h12"/>
    </svg>
  ),
  sistema: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/>
    </svg>
  ),
};

const HEADER_ICONO = [
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18M3 15h18"/></svg>,
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  <svg key="d" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>,
];

export function Proyectos({ onAskJ1MMY }: { onAskJ1MMY: (mensaje?: string) => void }) {
  const [filtro, setFiltro] = useState<string>("todos");
  const [pagina, setPagina] = useState(0);
  const seccionRef = useRef<HTMLElement>(null);

  const cambiarPagina = (n: number) => {
    setPagina(n);
    // Después del re-render calculamos la posición real de la sección.
    // El header sticky mide ~64px; lo compensamos para que la sección
    // quede bajo el header y no oculta detrás de él.
    // Solo hacemos scroll si la sección está por encima del viewport.
    window.setTimeout(() => {
      const el = seccionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const HEADER_H = 64;
      if (rect.top < HEADER_H) {
        const y = window.scrollY + rect.top - HEADER_H - 16;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 0);
  };

  const filtrados = useMemo(() => {
    if (filtro === "todos") return proyectos;
    return proyectos.filter((p) => p.categoria === filtro);
  }, [filtro]);

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA);
  const pagActual = Math.min(pagina, totalPaginas - 1);
  const visibles = filtrados.slice(pagActual * POR_PAGINA, (pagActual + 1) * POR_PAGINA);

  function cambiarFiltro(k: string) {
    setFiltro(k);
    setPagina(0);
  }

  return (
    <InView className="cv-section relative text-ink">
      {/* fondo técnico claro */}
      <div className="absolute inset-0 bg-[linear-gradient(168deg,#f0f5fc_0%,#eaf1fa_50%,#e6eef8_100%)]" />
      <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-[.45]" aria-hidden="true" />

      <section id="proyectos" ref={seccionRef} className="relative z-2 py-19 lg:py-24">
        <div className="mx-auto max-w-[1260px] px-6">

          {/* ---- encabezado ---- */}
          <Reveal as="div" className="mb-11">
            <div className="flex flex-wrap items-start justify-between gap-6 lg:gap-10">
              <div className="max-w-[580px]">
                <span className="eyebrow on-light">Obras entregadas</span>
                <h2 className="font-display mt-4.5 text-[28px] text-ink sm:text-[36px] lg:text-[42px]">
                  Lo que ya está
                  <br />
                  <span className="text-navy-500">aguantando</span> la lluvia.
                </h2>
                <p className="mt-4 max-w-[52ch] text-[15px] font-medium text-ink">
                  Obras reales. Sistemas especificados.
                  <br />Resultados que permanecen.
                </p>
                <p className="mt-2.5 flex items-start gap-2 text-[13px] text-ink-soft">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-[1px] flex-none text-navy-500/60">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Por confidencialidad de los propietarios, algunos proyectos se muestran con nombre genérico en lugar del nombre comercial del edificio.
                </p>
              </div>

              {/* 4 stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
                {HEADER_STATS.map((s, i) => (
                  <div key={s.label} className="flex flex-col items-center rounded-[6px] border border-navy/[.13] bg-white px-4 py-3.5 text-center shadow-[0_8px_22px_-18px_rgba(1,35,135,.4)]">
                    <span className="mb-2 text-navy-500/70">{HEADER_ICONO[i]}</span>
                    <span className="font-display text-[20px] leading-none text-navy sm:text-[22px]">{s.valor}</span>
                    <span className="font-mono-adi mt-1.5 text-[12px] uppercase tracking-[0.06em] text-ink-soft">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <div />
              <a
                href="#cotizar"
                className="font-mono-adi inline-flex items-center gap-2 rounded-[4px] bg-hivis px-5.5 py-3.25 text-[12px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-14px_rgba(255,106,19,.7)] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d33]"
              >
                Cotizar un proyecto así
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          </Reveal>

          {/* ---- filtros ---- */}
          <Reveal as="div" index={1} className="mb-7 flex flex-wrap gap-2">
            {FILTROS.map((f) => (
              <button
                key={f.key}
                onClick={() => cambiarFiltro(f.key)}
                className={`font-mono-adi rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                  filtro === f.key
                    ? "border-navy bg-navy text-white"
                    : "border-navy/[.18] text-ink-soft hover:border-navy/50 hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </Reveal>

          {/* ---- grid de tarjetas ---- */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((p, i) => (
              <Reveal
                key={`${p.nombre}-${pagActual}`}
                index={i}
                as="article"
                className="group flex flex-col overflow-hidden rounded-[6px] border border-navy/[.13] bg-white shadow-[0_8px_22px_-18px_rgba(1,35,135,.35)] transition-all duration-300 hover:-translate-y-1 hover:border-navy/30 hover:shadow-[0_24px_50px_-26px_rgba(1,35,135,.45)]"
              >
                {/* imagen */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.imagen}
                    alt={p.nombre}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* marca de agua: el cliente pidió que ninguna foto de obra
                      circule sin identificar a ADICENTER */}
                  <span className="font-mono-adi pointer-events-none absolute bottom-3 right-3.5 select-none text-[11px] font-bold uppercase tracking-[0.14em] text-white/70 drop-shadow-[0_1px_3px_rgba(0,0,0,.65)]">
                    ADICENTER
                  </span>
                  {/* tag categoría */}
                  <span
                    className={`font-mono-adi absolute left-3.5 top-3.5 rounded-[3px] px-2.5 py-1.25 text-[12px] uppercase tracking-[0.12em] text-white ${
                      p.tagVariant === "ba" ? "bg-hivis" : "bg-navy"
                    }`}
                  >
                    {p.tag}
                  </span>
                  {/* año */}
                  <span className="font-mono-adi absolute right-3.5 top-3.5 rounded-[3px] bg-black/40 px-2 py-1.25 text-[12px] tracking-[0.06em] text-white backdrop-blur-[2px]">
                    {p.año}
                  </span>
                </div>

                {/* contenido */}
                <div className="flex flex-1 flex-col p-5.5">
                  <span className="font-mono-adi flex items-center gap-1.5 text-[12px] uppercase tracking-[0.14em] text-navy-500/80">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {p.ubicacion}
                  </span>
                  <h4 className="font-display mt-2.5 mb-2.5 text-[18px] leading-tight tracking-[-0.005em] text-ink">
                    {p.nombre}
                  </h4>
                  <p className="flex-1 text-[13px] leading-relaxed text-ink-soft">{p.descripcion}</p>

                  {/* stats con íconos */}
                  <div className="mt-4.5 flex flex-wrap gap-4 border-t border-navy/[.11] pt-4">
                    {p.stats.map(([v, l, icono]) => (
                      <div key={l} className="flex items-center gap-2">
                        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-[6px] bg-navy/[.06] text-navy-500">
                          {STAT_ICONO[icono]}
                        </span>
                        <div>
                          <div className="font-display text-[15px] leading-none text-navy">{v}</div>
                          <div className="font-mono-adi mt-0.75 text-[12px] uppercase tracking-[0.1em] text-ink/45">{l}</div>
                        </div>
                      </div>
                    ))}
                    {/* flecha ver más */}
                    <span className="ml-auto flex items-center self-end">
                      <button
                        onClick={() => onAskJ1MMY(`Cuéntame sobre el proyecto ${p.nombre} en ${p.ubicacion}`)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/[.18] text-navy-500/70 transition-all hover:border-navy hover:bg-navy hover:text-white"
                        aria-label="Preguntar a J1MMY sobre este proyecto"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M7 7h10v10"/>
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---- paginación ---- */}
          {totalPaginas > 1 && (
            <Reveal as="div" index={7} className="mt-9 flex items-center justify-center gap-4">
              <button
                onClick={() => cambiarPagina(Math.max(0, pagActual - 1))}
                disabled={pagActual === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/[.18] text-navy-500 transition-all hover:border-navy hover:bg-navy hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Página anterior"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M11 6l-6 6 6 6"/>
                </svg>
              </button>
              <span className="font-mono-adi text-[12px] tracking-[0.08em] text-ink-soft">
                {pagActual + 1} / {totalPaginas}
              </span>
              <button
                onClick={() => cambiarPagina(Math.min(totalPaginas - 1, pagActual + 1))}
                disabled={pagActual === totalPaginas - 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/[.18] text-navy-500 transition-all hover:border-navy hover:bg-navy hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Página siguiente"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </Reveal>
          )}

          {/* ---- CTA inferior ---- */}
          <Reveal as="div" index={8} className="mt-11 flex flex-col items-start gap-4 rounded-[6px] border border-navy/[.13] bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-navy/[.16] text-navy-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </span>
              <div>
                <strong className="font-display block text-[15px] text-ink">¿Tiene un proyecto parecido?</strong>
                <span className="text-[13px] text-ink-soft">Cuéntenos qué necesita resolver y especificamos el sistema adecuado.</span>
              </div>
            </div>
            <button
              onClick={() => onAskJ1MMY("Tengo un proyecto parecido a los que vi en la sección de obras")}
              className="font-mono-adi flex-none rounded-[4px] bg-navy px-5.5 py-3.25 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-navy-500"
            >
              Hablar con un técnico →
            </button>
            <span className="hidden items-center gap-1.5 text-[12px] text-ink-soft sm:flex">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="flex-none">
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/>
              </svg>
              Respuesta rápida y asesoría técnica especializada.
            </span>
          </Reveal>

        </div>
      </section>
    </InView>
  );
}
