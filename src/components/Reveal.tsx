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

    // si el elemento ya está dentro (o por encima de) la ventana al montar,
    // se muestra de inmediato — evita tarjetas que quedan invisibles para siempre
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // red de seguridad: si por cualquier motivo no disparó, se revela igual
    const fallback = setTimeout(() => setShown(true), 2500);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
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
