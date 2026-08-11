"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Envuelve una sección entera y marca `data-inview="true"` en sí mismo
 * mientras está cerca del viewport. Todo lo que dependa de estar "vivo"
 * (orbes, cuadrícula, barrido de tarjetas, brillo de borde) se activa por
 * CSS con el selector `[data-inview="true"] .lo-que-sea` — así una sola
 * comprobación de visibilidad gobierna todas las animaciones de la sección,
 * y se pausan de verdad cuando el usuario está lejos.
 */
export function InView({
  children,
  className = "",
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inview, setInview] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInview(e.isIntersecting)),
      { rootMargin: "80px 0px 80px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp ref={ref} id={id} data-inview={inview} className={className}>
      {children}
    </Comp>
  );
}
