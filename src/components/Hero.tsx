"use client";

import { useState } from "react";
import { Button } from "./Button";
import { StatsCounter } from "./StatsCounter";
import { RevealRepeat } from "./RevealRepeat";
import { CAPAS, HeroBlock } from "./HeroBlock";

const PARTICULAS = [
  { l: "12%", t: "22%", s: 2, d: "0s" },
  { l: "28%", t: "68%", s: 1.5, d: "2.4s" },
  { l: "46%", t: "16%", s: 2, d: "5.1s" },
  { l: "63%", t: "78%", s: 1.5, d: "1.2s" },
  { l: "78%", t: "34%", s: 2.5, d: "3.6s" },
  { l: "88%", t: "60%", s: 1.5, d: "6.3s" },
  { l: "36%", t: "45%", s: 1.5, d: "8.1s" },
  { l: "70%", t: "12%", s: 2, d: "4.4s" },
];

export function Hero() {
  const [focus, setFocus] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden pt-[56px] md:pt-[76px]">
      {/* ---- fondo oscuro premium ---- */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 50% at 72% 42%, rgba(1,183,222,.13), transparent 64%)," +
              "radial-gradient(50% 60% at 6% 78%, rgba(1,35,135,.42), transparent 68%)," +
              "linear-gradient(168deg, #061024 0%, #040d1e 46%, #030913 100%)",
          }}
        />
        <div className="blueprint-grid absolute inset-0 opacity-70" />
        {PARTICULAS.map((p, i) => (
          <span
            key={i}
            className="hero-particle"
            style={{
              left: p.l,
              top: p.t,
              width: p.s,
              height: p.s,
              animationDelay: p.d,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div className="relative z-2 mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-10 px-6 pb-16 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-6">
        {/* ---- columna de texto ---- */}
        <RevealRepeat>
          <span className="eyebrow hero-line" style={{ animationDelay: "0.05s" }}>
            Centro de aditivos, epóxicos e impermeabilizantes
          </span>

          <h1 className="font-display mt-5 text-[40px] leading-[0.94] sm:text-[56px] lg:text-[64px] xl:text-[72px]">
            <span className="hero-line" style={{ animationDelay: "0.15s" }}>
              No vendemos
            </span>
            <br />
            <span className="hero-line" style={{ animationDelay: "0.3s" }}>
              materiales.
            </span>
            <br />
            <span className="hero-line" style={{ animationDelay: "0.45s" }}>
              Diseñamos
            </span>
            <br />
            <span className="hero-line text-cyan" style={{ animationDelay: "0.6s" }}>
              sistemas.
            </span>
          </h1>

          <p
            className="hero-line mt-7 max-w-[46ch] text-base text-white/70 sm:text-[17px]"
            style={{ animationDelay: "0.8s" }}
          >
            Diseñamos, suministramos y supervisamos soluciones para impermeabilizar, reparar y
            proteger concreto, desde el diagnóstico hasta la ejecución en obra.
          </p>

          <div className="hero-line mt-9 flex flex-wrap gap-3.5" style={{ animationDelay: "0.95s" }}>
            <Button href="#sistemas">Ver sistemas</Button>
            <Button href="#cotizar" variant="ghost">
              Cotizar proyecto
            </Button>
          </div>

          <div
            className="hero-line font-mono-adi mt-6 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.1em] text-white/45"
            style={{ animationDelay: "1.1s" }}
          >
            <span className="dot-live" /> Respuesta a cotizaciones en menos de 2 horas hábiles
          </div>
        </RevealRepeat>

        {/* ---- bloque + etiquetas de capa ---- */}
        <div className="flex items-center gap-3 lg:gap-5">
          <div className="min-w-0 flex-1">
            <HeroBlock onLayerFocus={setFocus} />
          </div>

          <ul className="hidden w-[170px] flex-none flex-col gap-4 md:flex xl:w-[200px]">
            {CAPAS.map((c, i) => {
              const on = focus === i;
              return (
                <li
                  key={c.n}
                  className="hero-label"
                  style={{ animationDelay: `${2.5 + i * 0.09}s` }}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-mono-adi text-[10px] tracking-[0.16em] transition-colors duration-300 ${
                        on ? "text-cyan" : "text-white/35"
                      }`}
                    >
                      {c.n} /
                    </span>
                    <span
                      className={`font-mono-adi text-[10.5px] uppercase leading-tight tracking-[0.1em] transition-colors duration-300 ${
                        on ? "text-cyan" : "text-white/85"
                      }`}
                    >
                      {c.titulo}
                    </span>
                  </div>
                  <div className="mt-1 text-[11.5px] leading-snug text-white/45">{c.desc}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ---- barra de datos ---- */}
      <div className="relative z-2 border-y border-white/10 bg-navy-950/50">
        <StatsCounter />
      </div>
    </section>
  );
}
