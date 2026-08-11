"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  index = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    // el propio IntersectionObserver dispara con el estado actual apenas se
    // observa — si el elemento ya está en pantalla, entrega isIntersecting:true
    // de inmediato. No hace falta chequeo manual ni temporizador de respaldo.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        });
      },
      // margen amplio en ambos sentidos: aunque el usuario haga un salto de
      // scroll grande (PageDown, enlace de ancla), el elemento sigue cayendo
      // dentro de la zona vigilada y no se queda pegado a "oculto"
      { threshold: 0, rootMargin: "160px 0px 160px 0px" }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref}
      className={`${shown ? "reveal-shown" : "reveal-hidden"} ${className}`}
      style={{ animationDelay: shown ? `${Math.min(index, 10) * 80}ms` : undefined }}
    >
      {children}
    </Comp>
  );
}
