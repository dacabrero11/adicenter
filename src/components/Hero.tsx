import { Button } from "./Button";
import { CrossSection } from "./CrossSection";
import { StatsCounter } from "./StatsCounter";
import { RevealRepeat } from "./RevealRepeat";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[70px] md:pt-[100px] lg:pt-[120px]">
      <div className="absolute inset-0 z-0">
        <div
          className="animate-mesh absolute -inset-[20%]"
          style={{
            background:
              "radial-gradient(60% 55% at 78% 12%,rgba(1,183,222,.30),transparent 62%),radial-gradient(50% 60% at 8% 78%,rgba(1,35,135,.85),transparent 66%),radial-gradient(40% 40% at 50% 110%,rgba(255,106,19,.14),transparent 70%),linear-gradient(170deg,var(--navy-900),var(--navy-950))",
          }}
        />
        <div className="blueprint-grid absolute inset-0" />
      </div>

      <div className="relative z-2 mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-14 px-6 pb-14 lg:grid-cols-[.86fr_1.14fr] xl:grid-cols-[.8fr_1.2fr]">
        <RevealRepeat>
          <span className="eyebrow hero-line" style={{ animationDelay: "0.05s" }}>Centro de aditivos, epóxicos e impermeabilizantes · Honduras</span>
          <h1 className="font-display mt-5.5 text-[38px] leading-[0.92] sm:text-[52px] lg:text-[72px] xl:text-[80px]">
            <span className="hero-line" style={{ animationDelay: "0.15s" }}>
              El concreto
            </span>
            <br />
            <span className="hero-line text-cyan" style={{ animationDelay: "0.35s" }}>
              no falla solo.
            </span>
            <br />
            <span
              className="hero-line stroke-live text-transparent [-webkit-text-stroke:1.4px_rgba(255,255,255,.32)]"
              style={{ animationDelay: "0.55s, 1.45s" }}
            >
              Falla sin sistema.
            </span>
          </h1>
          <p className="hero-line mt-6 max-w-[53ch] text-base text-white/74 sm:text-[18.5px]" style={{ animationDelay: "0.75s" }}>
            Formulamos, suministramos y supervisamos en sitio los sistemas que impermeabilizan
            techos, endurecen pisos industriales y corrigen el concreto antes de que el problema
            cueste una obra completa.
          </p>
          <div className="hero-line mt-9 flex flex-wrap gap-3.5" style={{ animationDelay: "0.9s" }}>
            <Button href="#cotizar">Cotizar mi proyecto</Button>
            <Button href="#catalogo" variant="ghost">Ver catálogo técnico</Button>
          </div>
          <div className="hero-line font-mono-adi mt-5 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.1em] text-white/50" style={{ animationDelay: "1.05s" }}>
            <span className="dot-live" /> Respuesta a cotizaciones en menos de 2 horas hábiles
          </div>
        </RevealRepeat>

        <CrossSection />
      </div>

      <div className="relative z-2 border-y border-white/10 bg-navy-950/50">
        <StatsCounter />
      </div>
    </section>
  );
}
