"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string };

/* Cifras confirmadas por ADICENTER. Los años se calculan desde 2017, el año
   de fundación, para que la cifra no quede desactualizada con el tiempo. */
const FUNDACION = 2017;

const STATS: Stat[] = [
  { value: new Date().getFullYear() - FUNDACION, label: "Años en el mercado hondureño" },
  { value: 6000, suffix: "+", label: "m² impermeabilizados" },
  { value: 300, suffix: "+", label: "Proyectos entregados" },
  { value: 5, label: "Líneas de especialización" },
];

// active=true dispara el conteo hasta el valor final. Una vez contado se
// queda en el valor: reiniciarlo al salir de pantalla hacía que el usuario
// viera los números volver a cero y recontar en cada scroll.
function useCountUp(target: number, decimals: number, active: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf: number;
    let start: number | null = null;
    function step(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, target, duration]);
  return val.toFixed(decimals);
}

function StatItem({ s, active, i }: { s: Stat; active: boolean; i: number }) {
  const display = useCountUp(s.value, s.decimals ?? 0, active, 1300 + i * 120);
  return (
    <div
      className={`border-white/10 px-4 py-7.5 md:px-6.5 ${i < 3 ? "md:border-r" : ""} ${
        i % 2 === 0 ? "border-r" : ""
      } max-[560px]:border-r-0 max-[560px]:border-b`}
    >
      <div className="font-display text-[30px] leading-none text-white tabular-nums sm:text-[36px] lg:text-[42px]">
        {s.prefix}
        {display}
        {s.suffix}
      </div>
      <div className="font-mono-adi mt-2.25 text-[12px] uppercase tracking-[0.1em] text-white/55 sm:text-[12px]">
        {s.label}
      </div>
    </div>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Antes el conteo esperaba a que el usuario hiciera scroll, porque la barra
  // vivía bajo el pliegue. Con el hero nuevo puede quedar visible ya al cargar,
  // así que en ese caso arranca sola tras el ensamblaje del bloque.
  useEffect(() => {
    const t = setTimeout(() => setScrolled(true), 2600);
    function onScroll() {
      if (window.scrollY > 10) {
        setScrolled(true);
        clearTimeout(t);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Se dispara una sola vez: al salir de pantalla el estado NO se revierte,
  // así los números quedan en su valor final para el resto de la visita.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setVisible(true);
          io.disconnect();
        }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = visible && scrolled;

  return (
    <div ref={ref} className="mx-auto grid max-w-[1220px] grid-cols-2 md:grid-cols-4">
      {STATS.map((s, i) => (
        <StatItem key={s.label} s={s} active={active} i={i} />
      ))}
    </div>
  );
}
