/**
 * Fondo ambiental animado para secciones.
 * `tone` define la paleta: claro (secciones paper) u oscuro (secciones navy).
 */
export function SectionBg({
  tone = "light",
  grid = true,
}: {
  tone?: "light" | "dark";
  grid?: boolean;
}) {
  const isLight = tone === "light";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* base */}
      <div
        className="absolute inset-0"
        style={{
          background: isLight
            ? "linear-gradient(165deg,#EEF4FB 0%,#F6F9FD 45%,#E9F1FA 100%)"
            : "linear-gradient(165deg,var(--navy-900),var(--navy-950))",
        }}
      />

      {/* orbes de luz en deriva */}
      <div
        className="orb orb-a"
        style={{
          top: "-14%",
          left: "-8%",
          width: "46%",
          aspectRatio: "1",
          filter: "blur(80px)",
          background: isLight
            ? "radial-gradient(circle,rgba(1,183,222,.24),transparent 68%)"
            : "radial-gradient(circle,rgba(1,183,222,.20),transparent 68%)",
        }}
      />
      <div
        className="orb orb-b"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "52%",
          aspectRatio: "1",
          filter: "blur(90px)",
          background: isLight
            ? "radial-gradient(circle,rgba(1,35,135,.16),transparent 66%)"
            : "radial-gradient(circle,rgba(1,35,135,.55),transparent 66%)",
        }}
      />
      <div
        className="orb orb-c"
        style={{
          top: "38%",
          right: "22%",
          width: "30%",
          aspectRatio: "1",
          filter: "blur(75px)",
          background: isLight
            ? "radial-gradient(circle,rgba(255,106,19,.09),transparent 70%)"
            : "radial-gradient(circle,rgba(255,106,19,.13),transparent 70%)",
        }}
      />

      {/* cuadrícula de plano en deriva */}
      {grid && (
        <div className={`absolute inset-0 ${isLight ? "blueprint-grid-dark" : "blueprint-grid"}`} />
      )}
    </div>
  );
}
