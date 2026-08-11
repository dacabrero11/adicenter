"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Como Reveal, pero repite la animación cada vez que el elemento vuelve a
 * entrar en pantalla (no solo la primera vez). Pensado para el Hero: si el
 * usuario baja y vuelve a subir, el titular y las estadísticas se sienten
 * "vivos" otra vez en lugar de quedarse ya reveladas para siempre.
 */
export function RevealRepeat({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true); // visible en la primera carga (está arriba de todo)
  const [playKey, setPlayKey] = useState(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setPlayKey((k) => k + 1); // fuerza a React a remontar y repetir la animación CSS
            setShown(true);
          } else {
            setShown(false);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div key={playKey} className={shown || reducedRef.current ? "" : "opacity-0"}>
        {children}
      </div>
    </div>
  );
}
