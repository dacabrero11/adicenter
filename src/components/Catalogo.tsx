"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { InView } from "./InView";
import { filtros, servicios, type Categoria } from "@/data/servicios";

/* ---------- iconos ---------- */
const I = {
  target: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" fill="currentColor" stroke="none" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  hardhat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 17a8 8 0 0 1 16 0" /><path d="M2 17h20v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" /><path d="M12 9V5" />
    </svg>
  ),
  docCheck: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v5h5" /><path d="M9 15l2 2 4-4" />
    </svg>
  ),
  arrow: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  bulb: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .8 1.7v.5h5.6v-.5c0-.7.3-1.3.8-1.7A6 6 0 0 0 12 3z" />
    </svg>
  ),
};

const PRINCIPIOS = [
  { icon: I.target, titulo: "Diagnóstico preciso", texto: "Evaluamos a fondo para definir la solución correcta." },
  { icon: I.shield, titulo: "Especificación técnica", texto: "Sistemas definidos con los mejores materiales y métodos." },
  { icon: I.hardhat, titulo: "Ejecución controlada", texto: "Aplicación supervisada por personal especializado." },
  { icon: I.docCheck, titulo: "Garantía respaldada", texto: "Respaldo técnico y documentación en cada proyecto." },
];

export function Catalogo() {
  const [activo, setActivo] = useState<Categoria | "all">("all");
  const [resaltado, setResaltado] = useState<string | null>(null);
  // ficha técnica desplegada: null = ninguna; slug = la que está abierta
  const [abierta, setAbierta] = useState<string | null>(null);
  const toggleFicha = (slug: string) =>
    setAbierta((v) => (v === slug ? null : slug));
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const items = useMemo(
    () => (activo === "all" ? servicios : servicios.filter((s) => s.categoria === activo)),
    [activo]
  );

  function irAServicio(slug: string) {
    const el = cardRefs.current[slug];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setResaltado(slug);
    setTimeout(() => setResaltado((r) => (r === slug ? null : r)), 1600);
  }

  return (
    <InView className="cv-section relative overflow-hidden bg-[linear-gradient(165deg,var(--navy-900),var(--navy-950))] text-white">
      <div className="blueprint-grid absolute inset-0 opacity-25" aria-hidden="true" />

      <section id="catalogo" className="relative z-2 py-19 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          {/* ---- encabezado + 4 principios ---- */}
          <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-8">
            <Reveal as="div">
              <span className="eyebrow">Catálogo de servicios</span>
              <h2 className="font-display mt-4.5 text-[30px] sm:text-[42px] lg:text-[46px]">
                Diez servicios,
                <br />
                <span className="text-cyan">con un equipo de 10.</span>
              </h2>
              <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-white/62">
                Soluciones especializadas para cada necesidad estructural. Del diagnóstico
                preciso a la ejecución controlada, garantizamos desempeño y durabilidad.
              </p>
            </Reveal>

            <Reveal as="div" index={1} className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 lg:border-l lg:border-white/10 lg:pl-8">
              {PRINCIPIOS.map((p, i) => (
                <div key={p.titulo} className={`${i > 0 ? "sm:border-l sm:border-white/10 sm:pl-5" : ""}`}>
                  <span className="text-cyan">{p.icon}</span>
                  <h4 className="font-display mt-3 text-[12px] uppercase leading-tight tracking-[0.02em] text-white">
                    {p.titulo}
                  </h4>
                  <p className="mt-1.5 max-w-[17ch] text-[12px] leading-snug text-white/50">{p.texto}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* ---- filtros ---- */}
          <Reveal as="div" index={2} className="mb-9 flex min-w-0 flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 gap-2.5 overflow-x-auto pb-1">
              {filtros.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActivo(f.key)}
                  className={`font-mono-adi min-h-[36px] flex-none rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                    activo === f.key
                      ? "border-cyan bg-cyan font-semibold text-navy-950"
                      : "border-white/15 text-white/60 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="font-mono-adi flex flex-none items-center gap-5 text-[12px] uppercase tracking-[0.08em] text-white/45">
              <span>
                <b className="font-semibold text-cyan">{items.length}</b>{" "}
                {items.length === 1 ? "servicio disponible" : "servicios disponibles"}
              </span>
              <a href="#proceso" className="inline-flex items-center gap-1.5 text-white/70 transition-all hover:gap-2.5 hover:text-cyan">
                Ver comparativa {I.arrow}
              </a>
            </div>
          </Reveal>

          {/* ---- sidebar + grid ---- */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
            <Reveal as="div" index={3} className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <div className="font-mono-adi mb-3 hidden text-[12px] uppercase tracking-[0.18em] text-white/40 lg:block">
                Servicios
              </div>
              <nav className="flex min-w-0 gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-white/10 lg:pb-0">
                {servicios.map((s) => {
                  const on = resaltado === s.slug;
                  return (
                    <button
                      key={s.slug}
                      onClick={() => irAServicio(s.slug)}
                      className={`font-mono-adi flex-none rounded-full border px-3.5 py-2 text-left text-[12px] uppercase tracking-[0.03em] transition-colors duration-200 lg:-ml-px lg:w-full lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 lg:py-2.25 ${
                        on
                          ? "border-cyan bg-cyan/10 text-cyan lg:border-l-cyan lg:bg-cyan/[.08]"
                          : "border-white/15 text-white/55 hover:text-white lg:border-l-transparent lg:hover:border-l-white/25 lg:hover:bg-white/[.03]"
                      }`}
                    >
                      <span className="opacity-60">{s.n}</span> <span className="lg:ml-1">{s.titulo}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 hidden rounded-[6px] border border-white/10 bg-white/[.03] p-5 lg:block">
                <span className="text-cyan">{I.bulb}</span>
                <p className="mt-3 text-[13px] leading-relaxed text-white/60">
                  ¿No estás seguro qué servicio necesitas? Hablemos con un especialista.
                </p>
                <a
                  href="#cotizar"
                  className="font-mono-adi mt-3 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.08em] text-cyan transition-all hover:gap-2.5"
                >
                  Contactar asesor {I.arrow}
                </a>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
              {items.map((sv, i) => {
                const on = resaltado === sv.slug;
                const fichaAbierta = abierta === sv.slug;
                return (
                  <div key={sv.slug} className={`col-span-1 flex flex-col overflow-hidden rounded-[6px] border transition-colors duration-300 ${on ? "border-cyan/70" : "border-white/10 hover:border-cyan/40"}`}>
                    <Reveal
                      index={i}
                      as="div"
                      className="group flex flex-col bg-white/[.025]"
                    >
                      <div
                        ref={(node) => { cardRefs.current[sv.slug] = node; }}
                        className="flex flex-col gap-4 p-5.5 lg:flex-row"
                      >
                        <div className="flex min-w-0 flex-1 flex-col">
                          <span className="font-display text-[22px] leading-none text-cyan">{sv.n}</span>
                          <h3 className="font-display mt-2 text-[16px] leading-[1.15] text-white">{sv.titulo}</h3>
                          <p className="mt-3 text-[13px] leading-relaxed text-white/55">{sv.descripcion}</p>
                          <div className="mt-4 grid grid-cols-3 gap-x-2 border-t border-white/10 pt-3.5">
                            {sv.specs.map(([k, v]) => (
                              <div key={k} className="group/spec relative min-w-0 cursor-default">
                                <div className="font-mono-adi truncate text-[11px] uppercase tracking-[0.04em] text-white/40">{k}</div>
                                <div className="truncate text-[11px] font-semibold text-white">{v}</div>
                                <div className="pointer-events-none absolute bottom-full left-0 z-30 mb-1.5 hidden whitespace-nowrap rounded-[4px] border border-white/15 bg-[#0B1533] px-2.5 py-1.5 shadow-lg group-hover/spec:block">
                                  <span className="font-mono-adi block text-[10px] uppercase tracking-[0.08em] text-white/50">{k}</span>
                                  <span className="mt-0.5 block text-[12px] font-semibold text-white">{v}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => toggleFicha(sv.slug)}
                            aria-expanded={fichaAbierta}
                            className="font-mono-adi mt-4 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.08em] text-cyan transition-all group-hover:gap-2.5"
                          >
                            {fichaAbierta ? "Cerrar ficha" : "Ver especificaciones"}{" "}
                            <span className={`inline-block transition-transform duration-300 ${fichaAbierta ? "rotate-90" : ""}`}>{I.arrow}</span>
                          </button>
                        </div>
                        <div className="relative order-first h-[160px] w-full flex-none overflow-hidden lg:order-none lg:h-auto lg:w-[160px] lg:self-stretch xl:w-[190px]">
                          <Image src={sv.img} alt={sv.imgAlt} fill sizes="(max-width: 1023px) 90vw, 200px" className="object-contain object-center transition-transform duration-400 group-hover:scale-[1.06]" />
                        </div>
                      </div>
                    </Reveal>
                    {fichaAbierta && (
                      <div className="border-t border-cyan/30 bg-navy-900/70 px-5.5 py-4">
                        <p className="font-mono-adi mb-3 text-[11px] uppercase tracking-[0.14em] text-cyan">Ficha técnica</p>
                        {sv.specs.length > 0 && (
                          <div className="mb-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                            {sv.specs.map(([k, v]) => (
                              <div key={k} className="min-w-0">
                                <div className="font-mono-adi text-[11px] uppercase tracking-[0.06em] text-white/40">{k}</div>
                                <div className="mt-0.5 text-[13px] font-semibold text-white">{v}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <a
                            href={`/fichas/${sv.slug}.pdf`}
                            target="_blank"
                            rel="noopener"
                            className="font-mono-adi inline-flex items-center gap-1.5 rounded-[4px] border border-cyan/40 px-3.5 py-1.75 text-[11px] uppercase tracking-[0.08em] text-cyan transition-colors hover:bg-cyan/10"
                          >
                            Descargar FT {I.arrow}
                          </a>
                          <a
                            href="#cotizar"
                            className="font-mono-adi inline-flex items-center gap-1.5 rounded-[4px] bg-hivis px-3.5 py-1.75 text-[11px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#ff7d33]"
                          >
                            Cotizar este servicio {I.arrow}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </InView>
  );
}
