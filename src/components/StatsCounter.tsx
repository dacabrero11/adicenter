"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string };

const STATS: Stat[] = [
  { value: 18, label: "Años en el mercado hondureño" },
  { value: 1.2, decimals: 1, suffix: "M", label: "m² impermeabilizados" },
  { value: 340, suffix: "+", label: "Obras acompañadas en sitio" },
  { value: 72, label: "Servicios con ficha técnica" },
];

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
      <div className="font-display text-[30px] leading-none text-white tabular-nums sm:text-[38px] lg:text-[44px]">
        {s.prefix}
        {display}
        {s.suffix}
      </div>
      <div className="font-mono-adi mt-2.25 text-[9.5px] uppercase tracking-[0.1em] text-white/55 sm:text-[10px]">
        {s.label}
      </div>
    </div>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto grid max-w-[1220px] grid-cols-2 md:grid-cols-4">
      {STATS.map((s, i) => (
        <StatItem key={s.label} s={s} active={active} i={i} />
      ))}
    </div>
  );
}
