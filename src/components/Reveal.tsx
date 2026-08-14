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

    let done = false;
    let raf = 0;

    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    // Red de seguridad: el IntersectionObserver puede no emitir cuando el
    // scroll salta de golpe (enlaces de ancla del menú, PageDown, restauración
    // de posición). Ahí el elemento se quedaba pegado en `reveal-hidden`, o
    // sea invisible para siempre. Este chequeo mide la posición real y lo
    // rescata. Se apaga solo en cuanto el elemento se muestra.
    const check = () => {
      raf = 0;
      if (done || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh + 160 && r.bottom > -160) reveal();
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(check);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && reveal()),
      { threshold: 0, rootMargin: "160px 0px 160px 0px" }
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Las imágenes cargan de forma diferida y empujan el contenido hacia
    // abajo sin que haya un evento de scroll. Sin esto, un elemento podía
    // quedar dentro del viewport y aun así seguir oculto.
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.documentElement);

    check();

    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
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
