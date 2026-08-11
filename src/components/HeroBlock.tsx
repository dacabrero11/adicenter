"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Bloque del hero: 6 capas independientes que se ensamblan.
 *
 * `fy` es la posición vertical final de cada capa, en % de su propia altura.
 * Sale de medir el grosor real de cada asset y acumularlo de abajo hacia
 * arriba, de modo que apiladas reproduzcan el bloque maestro. Al ser
 * porcentaje de la propia imagen, la composición escala sin deformarse.
 *
 * `start` es cuánto más arriba arranca la capa antes de asentarse.
 * `depth` controla cuánto responde al parallax (las de arriba, un poco más).
 */
export const CAPAS = [
  { n: "01", src: "/images/hero/layer-1.webp", fy: -45.9, start: 26, depth: 1.35, titulo: "Acabado", desc: "Protección final" },
  { n: "02", src: "/images/hero/layer-2.webp", fy: -40.6, start: 22, depth: 1.2, titulo: "Impermeabilización", desc: "Barrera contra la humedad" },
  { n: "03", src: "/images/hero/layer-3.webp", fy: -37.4, start: 18, depth: 1.05, titulo: "Membrana elastomérica", desc: "Flexibilidad y resistencia" },
  { n: "04", src: "/images/hero/layer-4.webp", fy: -30.6, start: 14, depth: 0.9, titulo: "Primer", desc: "Adherencia superior" },
  { n: "05", src: "/images/hero/layer-5.webp", fy: -21.2, start: 10, depth: 0.75, titulo: "Reparación", desc: "Corrección estructural" },
  { n: "06", src: "/images/hero/layer-6.webp", fy: 0, start: 6, depth: 0.6, titulo: "Concreto", desc: "Estructura que perdura" },
] as const;

export function HeroBlock({ onLayerFocus }: { onLayerFocus?: (i: number | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0 }
    );
    io.observe(el);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => io.disconnect();
    }
    // el parallax solo se engancha en dispositivos con puntero fino (no táctiles)
    if (!window.matchMedia("(pointer: fine)").matches) {
      return () => io.disconnect();
    }

    let px = 0, py = 0, tx = 0, ty = 0;

    function onMove(ev: MouseEvent) {
      const r = el!.getBoundingClientRect();
      // -1..1 respecto al centro del bloque
      tx = ((ev.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 7;
      ty = ((ev.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 5;
      if (raf.current === null) raf.current = requestAnimationFrame(tick);
    }

    function tick() {
      // interpolación suave: el bloque "sigue" al mouse con inercia
      px += (tx - px) * 0.08;
      py += (ty - py) * 0.08;
      el!.style.setProperty("--px", `${px.toFixed(2)}px`);
      el!.style.setProperty("--py", `${py.toFixed(2)}px`);
      if (Math.abs(tx - px) > 0.05 || Math.abs(ty - py) > 0.05) {
        raf.current = requestAnimationFrame(tick);
      } else {
        raf.current = null;
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-inview={inView}
      className="hero-block relative mx-auto w-full max-w-[1000px]"
      style={{ ["--px" as string]: "0px", ["--py" as string]: "0px" }}
    >
      {/* halo ambiental detrás del bloque */}
      <div className="hero-block-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* el contenedor mantiene el alto total del apilado: imagen + recorrido de la capa 1 */}
      <div className="relative w-full" style={{ aspectRatio: "1536 / 1494" }}>
        {CAPAS.map((c, i) => (
          <div
            key={c.n}
            className="hero-layer absolute bottom-0 left-0 w-full"
            style={{
              ["--fy" as string]: `${c.fy}%`,
              ["--sy" as string]: `${c.start}%`,
              ["--d" as string]: `${c.depth}`,
              animationDelay: `${0.25 + (CAPAS.length - 1 - i) * 0.3}s`,
              zIndex: CAPAS.length - i,
            }}
            onMouseEnter={() => onLayerFocus?.(i)}
            onMouseLeave={() => onLayerFocus?.(null)}
          >
            <div className="hero-layer-parallax">
              <Image
                src={c.src}
                alt=""
                width={1200}
                height={800}
                priority={i < 3}
                sizes="(max-width: 1024px) 92vw, 1000px"
                className="h-auto w-full select-none"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
