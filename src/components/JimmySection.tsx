"use client";

import Image from "next/image";
import { SectionBg } from "./SectionBg";
import { InView } from "./InView";
import { Reveal } from "./Reveal";
import { useEffect, useRef } from "react";

/* -------- Componente aislado para la animación de Jimmy -------- */
function JimmyAnimado() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inViewRef = useRef(false);
  const readyRef = useRef(false);
  const saludadoBienvenidaRef = useRef(false);

  function reproducir() {
    const vid = videoRef.current;
    if (!vid || playingRef.current || !readyRef.current) return;
    playingRef.current = true;
    vid.currentTime = 0;
    vid.play().catch(() => {
      playingRef.current = false;
    });
  }

  function programarSiguiente() {
    const delay = 20000 + Math.random() * 20000;
    timerRef.current = setTimeout(() => {
      if (inViewRef.current) reproducir();
      programarSiguiente();
    }, delay);
  }

  useEffect(() => {
    const vid = videoRef.current;
    const container = containerRef.current;
    if (!vid || !container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Precargar y quedarse pausado en el último frame (posición natural)
    function irAlFinal() {
      if (!vid) return;
      vid.currentTime = vid.duration - 0.001;
      readyRef.current = true;
      // Si la sección ya estaba visible cuando terminó de cargar → saludar ahora
      if (inViewRef.current && !saludadoBienvenidaRef.current) {
        saludadoBienvenidaRef.current = true;
        setTimeout(() => reproducir(), 600);
      }
    }

    if (vid.readyState >= 1) {
      irAlFinal();
    } else {
      vid.addEventListener("loadedmetadata", irAlFinal, { once: true });
    }
    // Iniciar precarga
    vid.load();

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        inViewRef.current = e.isIntersecting;
        // Primera vez que el usuario llega a la sección → saludo de bienvenida
        if (e.isIntersecting && !saludadoBienvenidaRef.current && readyRef.current) {
          saludadoBienvenidaRef.current = true;
          setTimeout(() => reproducir(), 600);
        }
      }),
      { threshold: 0.35 }
    );
    io.observe(container);

    // Al terminar el saludo, volver al último frame y pausar
    function onEnded() {
      if (!vid) return;
      vid.currentTime = vid.duration - 0.001;
      setTimeout(() => { playingRef.current = false; }, 200);
    }
    vid.addEventListener("ended", onEnded);

    // Hover — solo puntero fino (desktop)
    function onEnter() {
      if (window.matchMedia("(pointer:fine)").matches) reproducir();
    }
    container.addEventListener("mouseenter", onEnter);

    // Saludos periódicos (después del de bienvenida, cada 20-40 s)
    // El primer saludo ya lo maneja el IntersectionObserver arriba;
    // aquí solo programamos los siguientes.
    timerRef.current = setTimeout(() => {
      programarSiguiente();
    }, 500); // arranca el loop periódico casi de inmediato

    return () => {
      io.disconnect();
      vid.removeEventListener("ended", onEnded);
      container.removeEventListener("mouseenter", onEnter);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex-none h-[300px] sm:h-[360px] lg:h-[clamp(360px,30vw,480px)]"
      style={{ aspectRatio: "534 / 967" }}
    >
      <video
        ref={videoRef}
        src="/images/jimmy/jimmy-saludo.webm"
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center bottom",
          filter: "drop-shadow(0 24px 38px rgba(1,35,135,.3))",
        }}
      />
    </div>
  );
}
/* ---------------------------------------------------------------- */

/* ---------- iconos lineales, mismo lenguaje del resto del sitio ---------- */
const I = {
  target: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  ruler: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 16l5-5 3 3L21 4" /><path d="M14 4h7v7" />
    </svg>
  ),
  layers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  search: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  calc: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </svg>
  ),
  scale: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21c4-2.2 7-5.5 7-10V6l-7-3-7 3v5c0 4.5 3 7.8 7 10z" /><path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  ),
  check: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-4-4 1.4-1.4 2.6 2.6 6-6 1.4 1.4-7.4 7.4z" />
    </svg>
  ),
  clock: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />
    </svg>
  ),
  bolt: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2 4 13h6l-1 9 9-13h-6l1-7z" />
    </svg>
  ),
  arrowCircle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9.5" /><path d="M9.5 8.5l4 3.5-4 3.5" />
    </svg>
  ),
  send: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
};

const INDICADORES = [
  { icon: I.target, titulo: "Diagnóstico", texto: "Sistemas adecuados según la superficie." },
  { icon: I.ruler, titulo: "Metraje", texto: "Cálculos de consumo y rendimiento." },
  { icon: I.layers, titulo: "Sistema", texto: "Recomendaciones técnicas precisas." },
  { icon: I.shield, titulo: "Garantía", texto: "Coberturas y vida útil de cada sistema." },
];

const OPCIONES_RAPIDAS = [
  { label: "Impermeabilizar losa", icon: I.layers, texto: "Necesito impermeabilizar una losa" },
  { label: "Reparar fisura", icon: I.bolt, texto: "Tengo una fisura que reparar" },
  { label: "Cisternas o tanques", icon: I.shield, texto: "Necesito impermeabilizar una cisterna" },
  { label: "Otro problema", icon: I.search, texto: "Tengo otro problema, quiero contarle a Jimmy" },
];

export function JimmySection({ onAskJimmy }: { onAskJimmy: (mensaje?: string) => void }) {
  return (
    <InView as="section" id="jimmy" className="cv-section relative overflow-hidden text-ink">
      <SectionBg tone="light" />

      <div className="relative z-2 mx-auto max-w-[1260px] px-6 py-19 lg:py-24">
        {/* ---- Jimmy + indicadores | encabezado ---- */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-8">
          <Reveal as="div" className="flex items-center justify-center gap-2 sm:gap-5">
            {/* indicadores técnicos — solo desde lg, junto a Jimmy */}
            <ul className="hidden flex-col gap-7 border-r border-navy/[.14] pr-5 lg:flex">
              {INDICADORES.map((ind) => (
                <li key={ind.titulo} className="relative w-[148px] pl-5">
                  <span className="absolute -left-[21px] top-1 h-px w-4 bg-navy/25" />
                  <span className="absolute -left-[3.5px] top-[3px] h-1.5 w-1.5 rounded-full bg-cyan" />
                  <span className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-[8px] border border-navy/[.16] text-navy-500">
                    {ind.icon}
                  </span>
                  <strong className="font-display block text-[11.5px] uppercase tracking-[0.01em] text-ink">
                    {ind.titulo}
                  </strong>
                  <span className="mt-1 block text-[11px] leading-snug text-ink-soft">{ind.texto}</span>
                </li>
              ))}
            </ul>

            <div className="relative flex-none">
              <span
                className="absolute -bottom-1 left-1/2 aspect-[1/.24] w-[46%] -translate-x-1/2 rounded-full"
                style={{ background: "radial-gradient(ellipse,rgba(1,35,135,.3),transparent 70%)" }}
                aria-hidden="true"
              />
              <JimmyAnimado />
              <div className="absolute -right-3 top-2 flex items-center gap-1.5 rounded-full border border-navy/[.14] bg-white px-2.5 py-1.25 shadow-[0_8px_20px_-8px_rgba(1,35,135,.35)] sm:-right-6">
                <span className="dot-live" />
                <span className="font-mono-adi whitespace-nowrap text-[8.5px] uppercase tracking-[0.08em] text-ink-soft">
                  Jimmy en línea
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal as="div" index={1}>
            <span className="eyebrow on-light">El que anda en la obra · y ahora también en el sitio</span>
            <h2 className="font-display mt-4.5 text-[30px] leading-[1.03] text-ink sm:text-[40px] lg:text-[46px]">
              Tu técnico,
              <br />
              <span className="text-navy-500">ahora también en el sitio.</span>
            </h2>
            <p className="mt-5 max-w-[54ch] text-base text-ink-soft sm:text-[17px]">
              Jimmy responde preguntas técnicas, orienta sobre sistemas, calcula consumos y sabe
              cuándo una consulta necesita pasar de la pantalla a una visita en obra.
            </p>
          </Reveal>
        </div>

        {/* ---- tres cards ---- */}
        <div className="mt-11 grid grid-cols-1 gap-4.5 sm:grid-cols-3">
          {/* 01 diagnostica */}
          <Reveal
            as="article"
            index={2}
            className="card-live card-live-light flex flex-col rounded-[8px] border border-navy/[.13] bg-white p-5.5 shadow-[0_20px_40px_-32px_rgba(1,35,135,.4)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan/45"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono-adi text-[10px] text-navy-500/60">01</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-navy/[.06] text-navy-500">
                {I.search}
              </span>
            </div>
            <h3 className="font-display mt-3 text-[15.5px] text-ink">Diagnostica</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              Identifica qué sistema necesita tu superficie según el problema.
            </p>
            <div className="relative mt-3.5 flex flex-1 items-end justify-center overflow-hidden rounded-[6px] bg-[linear-gradient(155deg,#EEF4FB,#E4EDF8)] px-2 pt-3">
              <Image
                src="/images/jimmy/sistema-capas.webp"
                alt="Sistema constructivo por capas"
                width={700}
                height={386}
                className="h-auto w-full max-w-[220px] object-contain"
              />
            </div>
          </Reveal>

          {/* 02 calcula */}
          <Reveal
            as="article"
            index={3}
            className="card-live card-live-light flex flex-col rounded-[8px] border border-navy/[.13] bg-white p-5.5 shadow-[0_20px_40px_-32px_rgba(1,35,135,.4)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan/45"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono-adi text-[10px] text-navy-500/60">02</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-navy/[.06] text-navy-500">
                {I.calc}
              </span>
            </div>
            <h3 className="font-display mt-3 text-[15.5px] text-ink">Calcula</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              Estima consumos, rendimiento y materiales según el metraje de tu proyecto.
            </p>
            <div className="mt-3.5 grid flex-1 grid-cols-2 gap-2.5">
              <div className="flex flex-col justify-center rounded-[6px] bg-[linear-gradient(155deg,#EEF4FB,#E4EDF8)] p-3.5">
                <span className="font-mono-adi text-[8px] uppercase leading-tight tracking-[0.05em] text-ink-soft">
                  Rendimiento aprox.
                </span>
                <span className="font-display mt-1.5 text-[19px] text-navy">1.2 m²/L</span>
              </div>
              <div className="flex flex-col justify-center rounded-[6px] bg-[linear-gradient(155deg,#EEF4FB,#E4EDF8)] p-3.5">
                <span className="font-mono-adi text-[8px] uppercase leading-tight tracking-[0.05em] text-ink-soft">
                  Consumo estimado
                </span>
                <span className="font-display mt-1.5 text-[19px] text-navy">42.5 L</span>
              </div>
            </div>
          </Reveal>

          {/* 03 escala */}
          <Reveal
            as="article"
            index={4}
            className="card-live card-live-light flex flex-col rounded-[8px] border border-navy/[.13] bg-white p-5.5 shadow-[0_20px_40px_-32px_rgba(1,35,135,.4)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan/45"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono-adi text-[10px] text-navy-500/60">03</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-navy/[.06] text-navy-500">
                {I.scale}
              </span>
            </div>
            <h3 className="font-display mt-3 text-[15.5px] text-ink">Escala</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              Cuando hace falta criterio de campo, agenda la visita con un asesor.
            </p>
            <button
              onClick={() => onAskJimmy("Quisiera agendar una visita técnica en obra")}
              className="mt-3.5 flex flex-1 items-center gap-3 rounded-[6px] bg-[linear-gradient(155deg,#EEF4FB,#E4EDF8)] p-3.5 text-left transition-colors hover:bg-[linear-gradient(155deg,#E4EDF8,#D8E6F4)]"
            >
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white text-navy-500 shadow-[0_6px_14px_-6px_rgba(1,35,135,.4)]">
                {I.calendar}
              </span>
              <span>
                <strong className="font-display block text-[12.5px] uppercase tracking-[0.01em] text-ink">
                  Visita en obra
                </strong>
                <span className="text-[11.5px] text-ink-soft">Agendamos por ti</span>
              </span>
            </button>
          </Reveal>
        </div>

        {/* ---- vista previa del chat + CTA ---- */}
        <Reveal as="div" index={5} className="mt-6 grid grid-cols-1 gap-4.5 lg:grid-cols-[1.45fr_1fr]">
          <div className="rounded-[8px] border border-navy/[.13] bg-white p-5.5 shadow-[0_20px_40px_-32px_rgba(1,35,135,.4)]">
            <div className="flex items-center gap-2.5">
              <span className="relative h-9 w-9 flex-none rounded-full">
                <Image src="/images/jimmy-face.png" alt="" fill sizes="36px" className="rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#25D07A]" />
              </span>
              <strong className="font-display flex items-center gap-1.25 text-[14px] text-ink">
                Jimmy <span className="text-cyan">{I.check}</span>
              </strong>
            </div>

            <div className="mt-3.5 inline-block max-w-[92%] rounded-xl rounded-tl-[3px] bg-[linear-gradient(155deg,#EEF4FB,#E4EDF8)] px-4 py-3 text-[13.5px] text-ink">
              ¿Qué necesitas resolver en tu proyecto?
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {OPCIONES_RAPIDAS.map((op) => (
                <button
                  key={op.label}
                  onClick={() => onAskJimmy(op.texto)}
                  className="font-mono-adi inline-flex items-center gap-1.5 rounded-full border border-navy/[.16] px-3.25 py-2 text-[10px] uppercase tracking-[0.05em] text-ink-soft transition-colors hover:border-cyan hover:bg-cyan/[.07] hover:text-navy"
                >
                  <span className="text-navy-500/70">{op.icon}</span>
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onAskJimmy()}
            className="group flex flex-col justify-between rounded-[8px] bg-[linear-gradient(150deg,var(--navy),var(--navy-950))] p-6 text-left shadow-[0_24px_50px_-24px_rgba(1,35,135,.6)] transition-transform hover:-translate-y-1"
          >
            <div>
              <span className="font-display block text-[19px] leading-[1.1] text-white">
                ¿Qué necesita
                <br />
                su obra?
              </span>
              <span className="mt-1.5 block text-[13px] text-sky">Hablar con Jimmy</span>
            </div>
            <span className="mt-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:translate-x-1">
              {I.arrowCircle}
            </span>
          </button>
        </Reveal>

        {/* ---- confianza ---- */}
        <Reveal
          as="div"
          index={6}
          className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono-adi text-[11px] uppercase tracking-[0.08em] text-ink-soft"
        >
          <span className="inline-flex items-center gap-1.75">
            <span className="text-navy-500">{I.clock}</span> Disponible 24/7
          </span>
          <span className="inline-flex items-center gap-1.75">
            <span className="text-navy-500">{I.bolt}</span> Respuestas técnicas en segundos
          </span>
        </Reveal>
      </div>
    </InView>
  );
}
