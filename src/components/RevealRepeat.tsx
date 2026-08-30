"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Revela su contenido una sola vez, la primera que entra en pantalla.
 *
 * Antes repetía la animación en cada reaparición, con la idea de que el hero
 * se sintiera "vivo" al volver arriba. En uso real se leía como un fallo: el
 * bloque desaparecía al salir de pantalla y volvía a animarse en cada scroll.
 * Ahora, una vez revelado, se queda.
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
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setShown(true);
          io.disconnect(); // una sola vez: no revertimos al salir de pantalla
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div className={shown || reducedRef.current ? "" : "opacity-0"}>
        {children}
      </div>
    </div>
  );
}
