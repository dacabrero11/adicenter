"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { InView } from "./InView";
import { SectionBg } from "./SectionBg";
import {
  PROBLEMS,
  SURFACES,
  getResultado,
  type ProblemKey,
  type SurfaceKey,
} from "@/data/selector";

/* ---------- iconos ---------- */
const SURF_ICON: Record<SurfaceKey, React.ReactNode> = {
  losa: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="12" rx="1" /><path d="M2 12h20M12 6v12" />
    </svg>
  ),
  techo: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 18l4-12M8 18l4-12M14 18l4-12M20 18l2-6M2 18h20" />
    </svg>
  ),
  piso: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3h18v18H3z" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  ),
  cisterna: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16v16H4z" /><path d="M4 13c3 0 3 3 6 3s3-3 6-3 3 3 4 3" />
    </svg>
  ),
  piscina: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 20V6a2 2 0 0 1 4 0v14M17 20V6a2 2 0 0 1 4 0v14" />
      <path d="M3 11h4M17 11h4M3 15.5c1.5 0 1.5 1.5 3 1.5s1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5" />
    </svg>
  ),
  muro: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21V9l9-6 9 6v12" /><path d="M3 15h18M9 21v-6M15 21v-6" />
    </svg>
  ),
};

const PROB_ICON: Record<ProblemKey, React.ReactNode> = {
  filtracion: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
    </svg>
  ),
  fisuras: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 3l4 6-3 3 5 4-2 5M15 3l3 5-2 4 4 3-1 6" />
    </svg>
  ),
  desgaste: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="1.4" /><circle cx="12" cy="6" r="1.4" /><circle cx="18" cy="6" r="1.4" />
      <circle cx="6" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="18" cy="12" r="1.4" />
      <circle cx="6" cy="18" r="1.4" /><circle cx="12" cy="18" r="1.4" /><circle cx="18" cy="18" r="1.4" />
    </svg>
  ),
  humedad: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 9c1.5 1.5 3 1.5 4.5 0S9 7.5 10.5 9 13.5 10.5 15 9s3-1.5 4.5 0" />
      <path d="M2 15c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" />
    </svg>
  ),
  otro: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="6" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="18" cy="12" r="1.8" />
    </svg>
  ),
};

const PASO_ICON = [
  <svg key="prep" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="5" width="13" height="6" rx="1.2" /><path d="M7 11v4a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" />
  </svg>,
  <svg key="imp" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
  </svg>,
  <svg key="mem" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" />
  </svg>,
  <svg key="acab" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
  </svg>,
];

const I = {
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  check: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  send: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  arrow: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

function SelectCard({
  activo,
  icon,
  label,
  hint,
  onClick,
}: {
  activo: boolean;
  icon: React.ReactNode;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={activo}
      className={`card-live relative rounded-[4px] border p-4 text-left transition-all duration-250 hover:-translate-y-0.5 ${
        activo
          ? "border-navy-500 bg-navy-500/[.06] shadow-[0_10px_26px_-18px_rgba(1,35,135,.5)]"
          : "card-live-light border-navy/[.14] bg-white hover:border-navy-500/50"
      }`}
    >
      {activo && (
        <span className="absolute right-2.5 top-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-navy-500 text-white">
          {I.check}
        </span>
      )}
      <span className={activo ? "text-navy-500" : "text-ink-soft"}>{icon}</span>
      <strong className="font-display mt-2.5 block text-[13px] uppercase tracking-[0.01em] text-ink">
        {label}
      </strong>
      <span className="mt-1 block text-[12px] leading-snug text-ink-soft">{hint}</span>
    </button>
  );
}

export function Selector() {
  const [surface, setSurface] = useState<SurfaceKey>("losa");
  const [problem, setProblem] = useState<ProblemKey>("filtracion");
  const [analizando, setAnalizando] = useState(false);

  const resultado = useMemo(() => getResultado(surface, problem), [surface, problem]);

  // pulso breve de "análisis" cada vez que cambia una selección — puramente
  // visual, no bloquea nada, el resultado ya está calculado al instante
  useEffect(() => {
    setAnalizando(true);
    const t = setTimeout(() => setAnalizando(false), 550);
    return () => clearTimeout(t);
  }, [surface, problem]);

  const surfLabel = SURFACES.find((s) => s.key === surface)!.label;
  const probLabel = PROBLEMS.find((p) => p.key === problem)!.label.toLowerCase();

  return (
    <InView className="cv-section relative text-ink">
      <SectionBg tone="light" />
      <section id="selector" className="relative z-2 py-19 lg:py-28">
        <div className="mx-auto max-w-[1260px] px-6">
          {/* ---- encabezado ---- */}
          <div className="mb-11 flex flex-wrap items-start justify-between gap-6">
            <Reveal as="div" className="max-w-[640px]">
              <span className="eyebrow on-light">Selector de sistema</span>
              <h2 className="font-display mt-4.5 text-[28px] text-ink sm:text-[36px] lg:text-[42px]">
                Encuentre el sistema
                <br />
                <span className="text-navy-500">que su obra necesita.</span>
              </h2>
              <p className="mt-4.5 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
                Seleccione la superficie y el problema. J1MMY le muestra el sistema recomendado,
                el orden de aplicación y una estimación inicial antes de solicitar una
                cotización.
              </p>
            </Reveal>
          </div>

          {/* ---- dos columnas ---- */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[.92fr_1.08fr]">
            {/* ===== columna izquierda: selector ===== */}
            <div>
              <Reveal as="div" index={2}>
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="font-display flex h-6 w-6 flex-none items-center justify-center rounded-full bg-navy-500 text-[12px] text-white">
                    1
                  </span>
                  <h3 className="font-display text-[14px] uppercase tracking-[0.01em] text-ink">
                    ¿Qué superficie tiene?
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {SURFACES.map((s) => (
                    <SelectCard
                      key={s.key}
                      activo={surface === s.key}
                      icon={SURF_ICON[s.key]}
                      label={s.label}
                      hint={s.hint}
                      onClick={() => setSurface(s.key)}
                    />
                  ))}
                </div>
              </Reveal>

              <Reveal as="div" index={3} className="mt-7">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="font-display flex h-6 w-6 flex-none items-center justify-center rounded-full bg-navy-500 text-[12px] text-white">
                    2
                  </span>
                  <h3 className="font-display text-[14px] uppercase tracking-[0.01em] text-ink">
                    ¿Qué problema presenta?
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {PROBLEMS.map((p) => (
                    <SelectCard
                      key={p.key}
                      activo={problem === p.key}
                      icon={PROB_ICON[p.key]}
                      label={p.label}
                      hint={p.hint}
                      onClick={() => setProblem(p.key)}
                    />
                  ))}
                </div>
              </Reveal>

              {/* ---- mini-widget de J1MMY analizando ---- */}
              <Reveal as="div" index={4} className="mt-7 rounded-[6px] border border-navy/[.13] bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="relative h-9 w-9 flex-none rounded-full">
                    <Image src="/images/jimmy-face.png" alt="" fill sizes="36px" className="rounded-full object-cover" />
                  </span>
                  <span className="font-mono-adi text-[12px] uppercase tracking-[0.06em] text-ink-soft">
                    J1MMY está analizando su caso…
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full bg-[#25D07A] text-white">
                    {I.check}
                  </span>
                  <span className="h-px flex-1 bg-[#25D07A]" />
                  <span className="flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full bg-[#25D07A] text-white">
                    {I.check}
                  </span>
                  <span className={`h-px flex-1 transition-colors duration-300 ${analizando ? "bg-navy/20" : "bg-cyan"}`} />
                  <span
                    className={`flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full text-white transition-colors duration-300 ${
                      analizando ? "bg-navy/25" : "bg-cyan"
                    }`}
                  >
                    {analizando ? (
                      <span className="h-1.5 w-1.5 animate-spin rounded-full border border-white border-t-transparent" />
                    ) : (
                      I.check
                    )}
                  </span>
                </div>
                <div className="font-mono-adi mt-1.5 flex justify-between text-[12px] uppercase tracking-[0.06em] text-ink-soft">
                  <span>Superficie</span>
                  <span>Problema</span>
                  <span>Análisis</span>
                </div>

                <div key={`${surface}-${problem}`} className="animate-panel-fade mt-4 flex gap-2.5 rounded-[5px] bg-[linear-gradient(155deg,#EEF4FB,#E4EDF8)] p-3.5">
                  <span className="relative h-7 w-7 flex-none rounded-full">
                    <Image src="/images/jimmy-face.png" alt="" fill sizes="28px" className="rounded-full object-cover" />
                  </span>
                  <p className="text-[12px] leading-relaxed text-ink">
                    He encontrado el sistema ideal para su <b className="font-semibold">{surfLabel.toLowerCase()}</b> con{" "}
                    <b className="font-semibold">{probLabel}</b>. Este es el sistema que más recomendamos en casos como
                    el suyo.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* ===== columna derecha: panel de resultado ===== */}
            <Reveal as="div" index={5} className="overflow-hidden rounded-[6px] border border-navy/[.13] bg-white shadow-[0_30px_60px_-36px_rgba(1,35,135,.45)]">
              <div className="flex items-center gap-2.5 bg-[linear-gradient(120deg,var(--navy),var(--navy-800))] px-6 py-3.5 text-white">
                <span className="text-cyan">{I.shield}</span>
                <span className="font-mono-adi text-[12px] uppercase tracking-[0.1em]">J1MMY analizó su caso</span>
              </div>

              <div key={`${surface}-${problem}-panel`} className="animate-panel-fade p-6 sm:p-7">
                <span className="eyebrow on-light">Sistema recomendado</span>
                <h4 className="font-display mt-3 text-[22px] uppercase leading-[1.08] text-ink sm:text-[24px]">
                  {resultado.titulo}
                </h4>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{resultado.descripcion}</p>

                {/* imagen + capas */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-[1.1fr_1fr] sm:items-center">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={resultado.img}
                      alt={resultado.imgAlt}
                      fill
                      sizes="(max-width: 640px) 90vw, 380px"
                      className="object-contain"
                    />
                  </div>
                  <ul className="flex flex-col gap-3.5 border-l border-dashed border-navy/[.22] pl-4">
                    {resultado.capas.map(([titulo, texto]) => (
                      <li key={titulo} className="relative">
                        <span className="absolute -left-[21px] top-1 h-1.5 w-1.5 rounded-full bg-cyan" />
                        <strong className="font-display block text-[12px] uppercase tracking-[0.02em] text-navy">
                          {titulo}
                        </strong>
                        <span className="mt-0.5 block text-[12px] leading-snug text-ink-soft">{texto}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* orden de aplicación */}
                <div className="mt-7">
                  <span className="font-mono-adi text-[12px] uppercase tracking-[0.1em] text-navy-500">
                    Orden de aplicación
                  </span>
                  <div className="relative mt-4 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4">
                    <span className="absolute left-[10%] right-[10%] top-[17px] hidden h-px bg-navy/[.14] sm:block" />
                    {resultado.pasos.map((p, i) => (
                      <div key={p.n} className="relative">
                        <span className="relative z-2 flex h-9 w-9 items-center justify-center rounded-full border border-navy/[.16] bg-white text-navy-500">
                          {PASO_ICON[i]}
                        </span>
                        <div className="mt-2">
                          <span className="font-mono-adi text-[12px] text-navy-500/60">{p.n}</span>
                          <strong className="font-display block text-[12px] text-ink">{p.titulo}</strong>
                          <span className="mt-0.5 block text-[12px] leading-snug text-ink-soft">{p.texto}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* métricas */}
                <div className="mt-7 grid grid-cols-1 gap-3.5 border-t border-navy/[.13] pt-5 sm:grid-cols-3 sm:gap-4">
                  <div>
                    <span className="font-mono-adi block text-[12px] uppercase tracking-[0.05em] text-ink-soft">
                      Rendimiento aprox.
                    </span>
                    <span className="font-display mt-1 block text-[16px] text-navy sm:text-[20px]">
                      {resultado.rendimiento}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono-adi block text-[12px] uppercase tracking-[0.05em] text-ink-soft">
                      Comportamiento
                    </span>
                    <span className="font-display mt-1 block whitespace-nowrap text-[16px] uppercase text-navy sm:text-[20px]">
                      {resultado.comportamiento}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono-adi block text-[12px] uppercase tracking-[0.05em] text-ink-soft">
                      Tiempo estimado
                    </span>
                    <span className="font-display mt-1 block whitespace-nowrap text-[16px] text-navy sm:text-[20px]">
                      {resultado.tiempo}
                    </span>
                  </div>
                </div>
                <p className="mt-2.5 text-[12px] text-ink-soft/70">
                  Según ficha técnica y condiciones de la obra.
                </p>

                {/* CTA */}
                <div className="mt-6 flex flex-col items-start gap-3 border-t border-navy/[.13] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href="#cotizar"
                    className="font-mono-adi inline-flex items-center gap-2 rounded-[4px] bg-hivis px-5.5 py-3.25 text-[12px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-14px_rgba(255,106,19,.7)] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d33]"
                  >
                    Quiero cotizar este sistema {I.arrow}
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft">
                    <span className="flex-none text-navy-500/60">{I.send}</span>
                    J1MMY enviará la información técnica seleccionada al equipo de ADICENTER.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </InView>
  );
}
