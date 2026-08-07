import { Button } from "./Button";
import { CrossSection } from "./CrossSection";

const STATS = [
  ["18", "Años en el mercado hondureño"],
  ["1.2M", "m² impermeabilizados"],
  ["340+", "Obras acompañadas en sitio"],
  ["72", "Productos con ficha técnica"],
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[70px] md:pt-[100px] lg:pt-[120px]">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute -inset-[20%]"
          style={{
            background:
              "radial-gradient(60% 55% at 78% 12%,rgba(1,183,222,.30),transparent 62%),radial-gradient(50% 60% at 8% 78%,rgba(1,35,135,.85),transparent 66%),radial-gradient(40% 40% at 50% 110%,rgba(255,106,19,.14),transparent 70%),linear-gradient(170deg,var(--navy-900),var(--navy-950))",
          }}
        />
        <div className="blueprint-grid absolute inset-0" />
      </div>

      <div className="relative z-2 mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-14 px-6 pb-14 lg:grid-cols-[1.06fr_.94fr]">
        <div>
          <span className="eyebrow">Centro de aditivos, epóxicos e impermeabilizantes · Honduras</span>
          <h1 className="font-display mt-5.5 text-[38px] leading-[0.92] sm:text-[52px] lg:text-[72px] xl:text-[80px]">
            El concreto
            <br />
            <span className="text-cyan">no falla solo.</span>
            <br />
            <span className="text-transparent [-webkit-text-stroke:1.4px_rgba(255,255,255,.45)]">
              Falla sin sistema.
            </span>
          </h1>
          <p className="mt-6 max-w-[53ch] text-base text-white/74 sm:text-[18.5px]">
            Formulamos, suministramos y supervisamos en sitio los sistemas que impermeabilizan
            techos, endurecen pisos industriales y corrigen el concreto antes de que el problema
            cueste una obra completa.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href="#cotizar">Cotizar mi proyecto</Button>
            <Button href="#catalogo" variant="ghost">Ver catálogo técnico</Button>
          </div>
          <div className="font-mono-adi mt-5 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.1em] text-white/50">
            <span className="dot-live" /> Respuesta a cotizaciones en menos de 2 horas hábiles
          </div>
        </div>

        <CrossSection />
      </div>

      <div className="relative z-2 border-y border-white/10 bg-navy-950/50">
        <div className="mx-auto grid max-w-[1220px] grid-cols-2 md:grid-cols-4">
          {STATS.map(([n, l], i) => (
            <div key={l} className={`border-white/10 px-4 py-7.5 md:px-6.5 ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 ? "border-r" : ""} max-[560px]:border-r-0 max-[560px]:border-b`}>
              <div className="font-display text-[30px] leading-none text-white sm:text-[38px] lg:text-[44px]">
                {n}
              </div>
              <div className="font-mono-adi mt-2.25 text-[9.5px] uppercase tracking-[0.1em] text-white/55 sm:text-[10px]">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
