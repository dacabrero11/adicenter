"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fondo ambiental animado para secciones.
 * Las animaciones (orbes, cuadrícula) se pausan por CSS cuando la sección
 * no está en pantalla — evita gastar GPU/CPU en contenido que no se ve.
 */
export function SectionBg({
  tone = "light",
  grid = true,
}: {
  tone?: "light" | "dark";
  grid?: boolean;
}) {
  const isLight = tone === "light";
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setInView(e.isIntersecting));
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-inview={inView}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* base */}
      <div
        className="absolute inset-0"
        style={{
          background: isLight
            ? "linear-gradient(165deg,#EEF4FB 0%,#F6F9FD 45%,#E9F1FA 100%)"
            : "linear-gradient(165deg,var(--navy-900),var(--navy-950))",
        }}
      />

      {/* orbes de luz en deriva (pausados fuera de pantalla) */}
      <div
        className="orb orb-a"
        style={{
          top: "-14%",
          left: "-8%",
          width: "52%",
          aspectRatio: "1",
          background: isLight
            ? "radial-gradient(circle,rgba(1,183,222,.20),rgba(1,183,222,.06) 40%,transparent 62%)"
            : "radial-gradient(circle,rgba(1,183,222,.17),rgba(1,183,222,.05) 40%,transparent 62%)",
        }}
      />
      <div
        className="orb orb-b"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "58%",
          aspectRatio: "1",
          background: isLight
            ? "radial-gradient(circle,rgba(1,35,135,.13),rgba(1,35,135,.04) 40%,transparent 62%)"
            : "radial-gradient(circle,rgba(1,35,135,.45),rgba(1,35,135,.12) 40%,transparent 62%)",
        }}
      />
      {/* cuadrícula de plano en deriva (pausada fuera de pantalla) */}
      {grid && <div className={isLight ? "blueprint-grid-dark" : "blueprint-grid"} />}
    </div>
  );
}
