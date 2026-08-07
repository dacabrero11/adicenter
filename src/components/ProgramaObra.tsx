const BENEFICIOS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 17l6-6 4 4 8-8" /><path d="M21 7v6h-6" />
      </svg>
    ),
    titulo: "Escala de precio por volumen",
    texto: "Tabulador por metraje anual proyectado, no por pedido suelto.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
      </svg>
    ),
    titulo: "Crédito a 30 y 60 días",
    texto: "Línea aprobada tras evaluación, sujeta a historial y respaldo.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
    titulo: "Asesor técnico en sitio",
    texto: "Visita de diagnóstico, prueba de adherencia y acta de arranque.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
    titulo: "Capacitación de cuadrillas",
    texto: "Taller de aplicación con su personal antes de iniciar el metraje.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 15l2 2 4-4" />
      </svg>
    ),
    titulo: "Garantía por escrito",
    texto: "Póliza del sistema completo, condicionada a aplicación supervisada.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    titulo: "Entrega programada",
    texto: "Despacho por etapas al frente de obra, sin bodega muerta.",
  },
];

export function ProgramaObra() {
  return (
    <section id="obra" className="relative overflow-hidden bg-[linear-gradient(150deg,var(--navy),var(--navy-950)_72%)] py-19 lg:py-30">
      <div
        className="absolute inset-0 opacity-35"
        style={{ background: "repeating-linear-gradient(115deg,transparent 0 26px,rgba(1,183,222,.055) 26px 27px)" }}
      />
      <div className="relative z-2 mx-auto max-w-[1220px] px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div className="max-w-none">
            <span className="eyebrow">Programa Obra · constructoras y desarrolladores</span>
            <h2 className="font-display mt-4.5 text-[30px] sm:text-[40px] lg:text-[54px]">
              Si maneja
              <br />
              volumen,
              <br />
              no compra
              <br />
              igual.
            </h2>
            <p className="mt-5 max-w-[62ch] text-[17px] text-white/66">
              Condiciones distintas para constructoras, contratistas de mantenimiento y
              desarrolladores con más de un frente abierto a la vez.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
            {BENEFICIOS.map((b) => (
              <div key={b.titulo} className="bg-navy-950 px-6.5 py-7 transition-colors duration-350 hover:bg-navy-800">
                <span className="mb-4 block text-hivis">{b.icon}</span>
                <strong className="font-display block text-[15.5px] tracking-[0.005em]">{b.titulo}</strong>
                <small className="mt-2.25 block text-[13.5px] leading-relaxed text-white/58">{b.texto}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
