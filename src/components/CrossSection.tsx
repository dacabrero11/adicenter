"use client";

import { useEffect, useRef, useState } from "react";

type Capa = {
  n: string;
  t: string;
  m: string;
  ct: string; // etiqueta corta (móvil)
  cm: string; // material corto (móvil)
  top: string;
  left: string;
  front: string;
  st: string;
};

const CAPAS: Capa[] = [
  { n: "01", t: "ACABADO REFLECTIVO", m: "Acrílico reflectivo", ct: "ACABADO", cm: "Acrílico", top: "url(#gTop)", left: "#01B7DE", front: "#0089CF", st: "#BDEBFF" },
  { n: "02", t: "MEMBRANA ELASTOMÉRICA", m: "Poliuretano elastomérico", ct: "MEMBRANA", cm: "Poliuretano", top: "url(#gMemb)", left: "#0A3AB0", front: "#012387", st: "#01B7DE" },
  { n: "03", t: "IMPRIMANTE EPÓXICO", m: "Epóxico bicomponente", ct: "IMPRIMANTE", cm: "Epóxico", top: "url(#gPrim)", left: "#012387", front: "#071B47", st: "#0A3AB0" },
  { n: "04", t: "MORTERO DE REPARACIÓN", m: "Cementicio modificado", ct: "MORTERO", cm: "Cementicio", top: "url(#gMort)", left: "#071B47", front: "#04102E", st: "#12388C" },
  { n: "05", t: "SUSTRATO", m: "Concreto existente", ct: "SUSTRATO", cm: "Concreto", top: "url(#gSub)", left: "#04102E", front: "#020814", st: "#0A2461" },
];

const OX = 200, OY = 118, GAP = 50, WX = 330, WY = -40, DX = 38, DY = 30, T = 14, LX = 170, OFFX = -9, OFFY = -6;

function pt(i: number, tw: number, td: number) {
  return {
    x: OX + WX * tw + DX * td + OFFX,
    y: OY + GAP * i + WY * tw + DY * td + OFFY,
  };
}

export function CrossSection() {
  const [active, setActive] = useState(0);
  const [compacto, setCompacto] = useState(false);
  const dropRef = useRef<SVGGElement>(null);
  const stainRef = useRef<SVGEllipseElement>(null);
  const idxRef = useRef(0);
  const reduced = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(true);

  useEffect(() => {
    setCompacto(window.matchMedia("(max-width:780px)").matches);
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    // el ciclo se detiene por completo cuando el diagrama sale de pantalla —
    // sin esto, la animación (y los filtros que dispara) siguen consumiendo
    // recursos para siempre aunque el usuario ya haya scrolleado lejos
    const el = wrapRef.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => (inViewRef.current = e.isIntersecting)),
        { threshold: 0 }
      );
      io.observe(el);
    }

    let timeout: ReturnType<typeof setTimeout>;

    function ciclo() {
      if (!inViewRef.current) {
        timeout = setTimeout(ciclo, 600);
        return;
      }
      const idx = idxRef.current;
      setActive(idx);

      const cae = pt(idx, 0.14, 0.5);
      const sale = pt(idx, 0.88, 0.5);
      const ultima = idx === CAPAS.length - 1;

      const drop = dropRef.current;
      const stain = stainRef.current;
      if (drop) {
        drop.getAnimations().forEach((a) => a.cancel());
        const kf = ultima
          ? [
              { transform: `translate(${cae.x}px,${cae.y - 170}px) scale(.62,1.35)`, opacity: 0, offset: 0, easing: "cubic-bezier(.55,0,.9,.45)" },
              { transform: `translate(${cae.x}px,${cae.y - 10}px) scale(1,1.12)`, opacity: 1, offset: 0.3, easing: "linear" },
              { transform: `translate(${cae.x}px,${cae.y}px) scale(1.45,.5)`, opacity: 1, offset: 0.37, easing: "cubic-bezier(.2,.9,.3,1)" },
              { transform: `translate(${cae.x}px,${cae.y + 1}px) scale(1.2,.34)`, opacity: 0.7, offset: 0.55, easing: "ease-out" },
              { transform: `translate(${cae.x}px,${cae.y + 2}px) scale(.95,.18)`, opacity: 0, offset: 0.78 },
              { transform: `translate(${cae.x}px,${cae.y + 2}px) scale(.95,.18)`, opacity: 0, offset: 1 },
            ]
          : [
              { transform: `translate(${cae.x}px,${cae.y - 170}px) scale(.62,1.35)`, opacity: 0, offset: 0, easing: "cubic-bezier(.55,0,.9,.45)" },
              { transform: `translate(${cae.x}px,${cae.y - 10}px) scale(1,1.12)`, opacity: 1, offset: 0.28, easing: "linear" },
              { transform: `translate(${cae.x}px,${cae.y}px) scale(1.45,.52)`, opacity: 1, offset: 0.35, easing: "cubic-bezier(.2,.9,.3,1)" },
              { transform: `translate(${cae.x + 16}px,${cae.y - 5}px) scale(.95,1.06)`, opacity: 1, offset: 0.45, easing: "cubic-bezier(.4,0,.55,1)" },
              { transform: `translate(${sale.x}px,${sale.y - 2}px) scale(.9,.9)`, opacity: 1, offset: 0.86, easing: "cubic-bezier(.45,0,.9,.5)" },
              { transform: `translate(${sale.x + 28}px,${sale.y + 52}px) scale(.68,1.3)`, opacity: 0, offset: 1 },
            ];
        drop.animate(kf, { duration: 2400, fill: "forwards" });
      }

      if (stain) {
        stain.getAnimations().forEach((a) => a.cancel());
        if (ultima) {
          stain.animate(
            [
              { transform: `translate(${cae.x}px,${cae.y + 2}px) scale(.15,.4)`, opacity: 0 },
              { transform: `translate(${cae.x}px,${cae.y + 2}px) scale(.6,.7)`, opacity: 0.6, offset: 0.45 },
              { transform: `translate(${cae.x}px,${cae.y + 2}px) scale(1.4,1)`, opacity: 0 },
            ],
            { duration: 1600, delay: 880, fill: "forwards" }
          );
        }
      }

      idxRef.current = (idx + 1) % CAPAS.length;
      timeout = setTimeout(ciclo, 3050);
    }

    timeout = setTimeout(ciclo, 1150);
    return () => {
      clearTimeout(timeout);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-[620/468] w-full" aria-hidden="true">
      <svg viewBox="0 0 620 468" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="gTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#9ADFFC" /><stop offset="1" stopColor="#01B7DE" />
          </linearGradient>
          <linearGradient id="gMemb" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#01B7DE" /><stop offset="1" stopColor="#0A3AB0" />
          </linearGradient>
          <linearGradient id="gPrim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0089CF" /><stop offset="1" stopColor="#012387" />
          </linearGradient>
          <linearGradient id="gMort" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0A2461" /><stop offset="1" stopColor="#071B47" />
          </linearGradient>
          <linearGradient id="gSub" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0A1B3E" /><stop offset="1" stopColor="#050F2A" />
          </linearGradient>
          <radialGradient id="gDrop" cx=".35" cy=".3" r=".8">
            <stop offset="0" stopColor="#FFFFFF" /><stop offset=".35" stopColor="#9ADFFC" /><stop offset="1" stopColor="#01B7DE" />
          </radialGradient>
        </defs>

        <g>
          {CAPAS.map((c, i) => {
            const ax = OX, ay = OY + GAP * i;
            const bx = ax + WX, by = ay + WY;
            const cx = bx + DX, cy = by + DY;
            const dx = ax + DX, dy = ay + DY;
            const ly = ay + 7;
            const on = active === i;
            const lift = on ? "translate(-9px,-6px)" : "translate(0,0)";
            return (
              <g key={c.n} style={{ transition: "opacity .8s cubic-bezier(.22,.85,.3,1)" }}>
                <g style={{ transform: lift, transition: "transform .6s cubic-bezier(.22,.85,.3,1)" }}>
                  <line
                    x1={LX + 8} y1={ly - 3.5} x2={ax - 4} y2={ly - 3.5}
                    stroke={on ? "var(--cyan)" : "rgba(255,255,255,.14)"} strokeWidth={1}
                    style={{ transition: "stroke .5s" }}
                  />
                  <circle
                    cx={ax - 4} cy={ly - 3.5} r={on ? 2.2 : 1.6}
                    fill={on ? "var(--cyan)" : "rgba(255,255,255,.2)"}
                    style={{ transition: "fill .5s, r .5s" }}
                  />
                  <g
                    style={{
                      opacity: on ? 1 : 0.26,
                      filter: on ? "drop-shadow(0 6px 26px rgba(1,183,222,.4))" : "none",
                      transition: "opacity .55s, filter .55s",
                    }}
                  >
                    <path d={`M${ax} ${ay} L${bx} ${by} L${cx} ${cy} L${dx} ${dy} Z`} fill={c.top} stroke={c.st} strokeWidth={1} strokeOpacity={0.55} />
                    <path d={`M${ax} ${ay} L${dx} ${dy} L${dx} ${dy + T} L${ax} ${ay + T} Z`} fill={c.left} stroke={c.st} strokeWidth={1} strokeOpacity={0.4} />
                    <path d={`M${dx} ${dy} L${cx} ${cy} L${cx} ${cy + T} L${dx} ${dy + T} Z`} fill={c.front} stroke={c.st} strokeWidth={1} strokeOpacity={0.4} />
                  </g>
                  <text textAnchor="end" x={LX} y={ly}>
                    <tspan
                      className="font-mono-adi"
                      style={{ fontSize: compacto ? 20 : 10, letterSpacing: compacto ? "0.06em" : "0.13em", fill: on ? "var(--cyan)" : "rgba(255,255,255,.28)", transition: "fill .5s" }}
                    >
                      {compacto ? c.n : c.n + " /"}
                    </tspan>
                    <tspan
                      dx={compacto ? 8 : 7}
                      className="font-mono-adi"
                      style={{ fontSize: compacto ? 20 : 10, letterSpacing: compacto ? "0.06em" : "0.13em", fill: on ? "#fff" : "rgba(255,255,255,.4)", transition: "fill .5s" }}
                    >
                      {compacto ? c.ct : c.t}
                    </tspan>
                  </text>
                  <text
                    x={LX} y={ly + (compacto ? 19 : 15)} textAnchor="end"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: compacto ? 18 : 10.5,
                      fill: "var(--hivis-soft)",
                      opacity: on ? 1 : 0,
                      transform: on ? "none" : "translateX(8px)",
                      transition: "opacity .5s, transform .5s",
                    }}
                  >
                    {compacto ? c.cm : c.m}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        <ellipse ref={stainRef} cx={0} cy={0} rx={15} ry={5.5} fill="#020814" opacity={0} />
        <g ref={dropRef} opacity={0}>
          <ellipse cx={0} cy={-9} rx={7.4} ry={9.4} fill="url(#gDrop)" />
          <ellipse cx={-2.5} cy={-12.4} rx={2.2} ry={2.9} fill="#fff" opacity={0.9} />
        </g>
      </svg>
    </div>
  );
}
