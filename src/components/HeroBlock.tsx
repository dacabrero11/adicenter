"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Bloque del hero: 6 capas independientes que se ensamblan, reaccionan al
 * mouse (parallax + elevación/glow de la placa exacta bajo el cursor,
 * detectada por transparencia real del PNG, no por caja rectangular) y se
 * "despliegan" solas cada cierto tiempo cuando no hay interacción.
 *
 * `fy` = posición final de cada capa, en % de su propia altura (medido a
 * partir del grosor real de cada asset, acumulado de abajo hacia arriba).
 * `start` = cuánto más arriba arranca antes de asentarse en el ensamblaje.
 * `depth` = cuánto responde esa capa al parallax (las de arriba, más).
 */
export const CAPAS = [
  { n: "01", src: "/images/hero/layer-1.webp", fy: -52.9, start: 26, depth: 1.5, titulo: "Acabado", desc: "Protección final" },
  { n: "02", src: "/images/hero/layer-2.webp", fy: -46.2, start: 22, depth: 1.3, titulo: "Impermeabilización", desc: "Barrera contra la humedad" },
  { n: "03", src: "/images/hero/layer-3.webp", fy: -41.6, start: 18, depth: 1.12, titulo: "Membrana elastomérica", desc: "Flexibilidad y resistencia" },
  { n: "04", src: "/images/hero/layer-4.webp", fy: -33.4, start: 14, depth: 0.94, titulo: "Primer", desc: "Adherencia superior" },
  { n: "05", src: "/images/hero/layer-5.webp", fy: -22.6, start: 10, depth: 0.76, titulo: "Reparación", desc: "Corrección estructural" },
  { n: "06", src: "/images/hero/layer-6.webp", fy: 0, start: 6, depth: 0.58, titulo: "Concreto", desc: "Estructura que perdura" },
] as const;

const N = CAPAS.length;
const GRID_W = 160;
const GRID_H = 107; // downsample de la relación 1200x800 de cada asset

/** Precarga cada capa en un canvas oculto y guarda su canal alfa a baja
 *  resolución, para saber exactamente qué parte de qué placa está pintada
 *  bajo el cursor (las placas son diagonales y se solapan; una caja
 *  rectangular daría hovers falsos sobre el margen transparente). */
function useAlphaMasks() {
  const masksRef = useRef<(Uint8ClampedArray | null)[]>(CAPAS.map(() => null));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = document.createElement("canvas");
    canvas.width = GRID_W;
    canvas.height = GRID_H;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let loaded = 0;

    CAPAS.forEach((c, i) => {
      const img = new window.Image();
      img.src = c.src;
      img.onload = () => {
        if (cancelled || !ctx) return;
        ctx.clearRect(0, 0, GRID_W, GRID_H);
        ctx.drawImage(img, 0, 0, GRID_W, GRID_H);
        const data = ctx.getImageData(0, 0, GRID_W, GRID_H).data;
        const alpha = new Uint8ClampedArray(GRID_W * GRID_H);
        for (let p = 0; p < alpha.length; p++) alpha[p] = data[p * 4 + 3];
        masksRef.current[i] = alpha;
        loaded++;
        if (loaded === N && !cancelled) setReady(true);
      };
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { masksRef, ready };
}

export function HeroBlock({ onLayerFocus }: { onLayerFocus?: (i: number | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const raf = useRef<number | null>(null);
  const [inView, setInView] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [idleOpen, setIdleOpen] = useState(false);
  const { masksRef, ready } = useAlphaMasks();

  const px = useRef(0), py = useRef(0), tx = useRef(0), ty = useRef(0);
  const lift = useRef<number[]>(CAPAS.map(() => 0));
  const liftT = useRef<number[]>(CAPAS.map(() => 0));
  const pop = useRef<number[]>(CAPAS.map(() => 0));
  const popT = useRef<number[]>(CAPAS.map(() => 0));
  const idle = useRef<number[]>(CAPAS.map(() => 0));
  const idleT = useRef<number[]>(CAPAS.map(() => 0));
  const hoveredRef = useRef<number | null>(null);
  const readyRef = useRef(ready);
  readyRef.current = ready;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0 }
    );
    io.observe(el);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerFine = window.matchMedia("(pointer: fine)").matches;

    let idleTimer: ReturnType<typeof setInterval> | null = null;
    let idleShowTimeout: ReturnType<typeof setTimeout> | null = null;

    function ensureRaf() {
      if (raf.current === null) raf.current = requestAnimationFrame(tick);
    }

    function tick() {
      px.current += (tx.current - px.current) * 0.08;
      py.current += (ty.current - py.current) * 0.08;
      let settled = Math.abs(tx.current - px.current) < 0.03 && Math.abs(ty.current - py.current) < 0.03;

      for (let i = 0; i < N; i++) {
        lift.current[i] += (liftT.current[i] - lift.current[i]) * 0.16;
        pop.current[i] += (popT.current[i] - pop.current[i]) * 0.16;
        idle.current[i] += (idleT.current[i] - idle.current[i]) * 0.055;
        if (Math.abs(liftT.current[i] - lift.current[i]) > 0.05) settled = false;
        if (Math.abs(popT.current[i] - pop.current[i]) > 0.05) settled = false;
        if (Math.abs(idleT.current[i] - idle.current[i]) > 0.05) settled = false;

        const node = parallaxRefs.current[i];
        if (!node) continue;
        const d = CAPAS[i].depth;
        const liftPx = lift.current[i];
        const popPx = pop.current[i];
        const idlePx = idle.current[i];
        const scale = 1 + liftPx * 0.0013;
        const rot = popPx * 0.11; // grados — acompaña al "sale del bloque" con una leve inclinación
        node.style.transform =
          `translate3d(${(px.current * d + popPx).toFixed(2)}px, ${(py.current * d + idlePx).toFixed(2)}px, 0) ` +
          `translateY(${(-liftPx).toFixed(2)}px) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
      }

      if (!settled) raf.current = requestAnimationFrame(tick);
      else raf.current = null;
    }

    function hitTest(clientX: number, clientY: number): number | null {
      if (!readyRef.current) return null;
      const r = el!.getBoundingClientRect();
      const u = (clientX - r.left) / r.width;
      if (u < 0 || u > 1) return null;
      const layerH = r.width * (800 / 1200);
      for (let i = 0; i < N; i++) {
        const fy = CAPAS[i].fy;
        const top = r.bottom - layerH * (1 - fy / 100);
        const v = (clientY - top) / layerH;
        if (v < 0 || v > 1) continue;
        const mask = masksRef.current[i];
        if (!mask) continue;
        const gx = Math.min(GRID_W - 1, Math.max(0, Math.floor(u * GRID_W)));
        const gy = Math.min(GRID_H - 1, Math.max(0, Math.floor(v * GRID_H)));
        if (mask[gy * GRID_W + gx] > 25) return i;
      }
      return null;
    }

    function setHover(i: number | null) {
      if (i === hoveredRef.current) return;
      hoveredRef.current = i;
      setHoveredIdx(i);
      onLayerFocus?.(i);
      for (let k = 0; k < N; k++) {
        liftT.current[k] = k === i ? 16 : 0;
        // sale del bloque hacia adelante — parejo en las 6 capas, así la
        // seleccionada siempre se distingue aunque esté muy metida (capa 2 y 3)
        popT.current[k] = k === i ? 26 : 0;
      }
      ensureRaf();
    }

    function onMove(ev: MouseEvent) {
      const r = el!.getBoundingClientRect();
      tx.current = ((ev.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 11;
      ty.current = ((ev.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 8;
      setHover(hitTest(ev.clientX, ev.clientY));
      ensureRaf();
    }

    function onLeave() {
      tx.current = 0;
      ty.current = 0;
      setHover(null);
      ensureRaf();
    }

    if (!reduced && pointerFine) {
      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave, { passive: true });
    }

    // despliegue ambiental: solo si nadie está interactuando con el bloque
    // y la sección sigue a la vista
    if (!reduced) {
      idleTimer = setInterval(() => {
        if (hoveredRef.current !== null) return;
        const rectNow = el!.getBoundingClientRect();
        const visible = rectNow.top < window.innerHeight && rectNow.bottom > 0;
        if (!visible) return;

        for (let i = 0; i < N; i++) idleT.current[i] = -(CAPAS[i].start * 3.6);
        setIdleOpen(true);
        ensureRaf();
        idleShowTimeout = setTimeout(() => {
          for (let i = 0; i < N; i++) idleT.current[i] = 0;
          setIdleOpen(false);
          ensureRaf();
        }, 3400);
      }, 9500);
    }

    return () => {
      io.disconnect();
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (idleTimer) clearInterval(idleTimer);
      if (idleShowTimeout) clearTimeout(idleShowTimeout);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [onLayerFocus]);

  return (
    <div ref={ref} data-inview={inView} className="hero-block relative mx-auto w-full max-w-[1000px]">
      <div className="hero-block-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative w-full" style={{ aspectRatio: "1536 / 1494" }}>
        {CAPAS.map((c, i) => (
          <div
            key={c.n}
            className="hero-layer absolute bottom-0 left-0 w-full"
            style={{
              ["--fy" as string]: `${c.fy}%`,
              ["--sy" as string]: `${c.start}%`,
              animationDelay: `${0.25 + (N - 1 - i) * 0.3}s`,
              zIndex: N - i,
            }}
          >
            <div
              ref={(node) => {
                parallaxRefs.current[i] = node;
              }}
              className={`hero-layer-parallax ${hoveredIdx === i || idleOpen ? "hero-layer-glow" : ""}`}
            >
              <div
                className="hero-layer-spin"
                style={{ ["--spin" as string]: `${(i % 2 === 0 ? 1 : -1) * (0.9 + (i % 3) * 0.25)}deg`, animationDelay: `${i * 0.6}s` }}
              >
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
          </div>
        ))}
      </div>
    </div>
  );
}
