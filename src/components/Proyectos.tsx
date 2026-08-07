import Image from "next/image";
import { proyectos } from "@/data/proyectos";
import { Button } from "./Button";

function ImagePlaceholder({ label, tag, variant }: { label: string; tag: string; variant: "default" | "ba" }) {
  return (
    <div className="blueprint-grid-dark relative flex aspect-[16/10] flex-col items-center justify-center gap-2.5 overflow-hidden border-b border-navy/[.14] bg-[linear-gradient(150deg,#E7EEF7,#D8E6F4)]">
      <span
        className={`absolute left-4.5 top-4.5 rounded-[2px] px-2.5 py-1.25 font-mono-adi text-[8.5px] uppercase tracking-[0.14em] text-white ${
          variant === "ba" ? "bg-hivis" : "bg-navy"
        }`}
      >
        {tag}
      </span>
      <div className="pointer-events-none absolute inset-2.75 rounded-[2px] border-[1.5px] border-dashed border-navy/[.28] transition-colors duration-400 group-hover:border-cyan/70" />
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="relative text-navy-500 opacity-45 transition-all duration-500 group-hover:scale-108 group-hover:opacity-70">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.8" />
        <path d="M22 16l-5.5-5.5L7 20" />
      </svg>
      <span className="font-mono-adi relative text-center text-[9.5px] uppercase leading-loose tracking-[0.16em] text-navy/55">
        <b className="block font-semibold text-navy">Fotografía de obra</b>
        {label} · 1600 × 1000 px
      </span>
    </div>
  );
}

export function Proyectos({ onAskJimmy }: { onAskJimmy: () => void }) {
  return (
    <div className="bg-paper text-ink">
      <section id="proyectos" className="py-19 lg:py-30">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-[620px]">
              <span className="eyebrow on-light">Obras entregadas</span>
              <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[40px] lg:text-[50px]">
                Lo que ya está
                <br />
                aguantando la lluvia.
              </h2>
              <p className="mt-4.5 max-w-[56ch] text-base text-ink-soft">
                Cada proyecto se documenta con registro fotográfico antes, durante y después de
                la aplicación. No mostramos renders: mostramos la obra como quedó y cuánto lleva
                funcionando.
              </p>
            </div>
            <Button href="#cotizar" size="sm">Cotizar un proyecto así</Button>
          </div>

          <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((p) => (
              <article
                key={p.nombre}
                className="group flex flex-col overflow-hidden rounded-[4px] border border-navy/[.14] bg-white transition-all duration-400 hover:-translate-y-1.5 hover:border-cyan/55 hover:shadow-[0_30px_62px_-34px_rgba(1,35,135,.5)]"
              >
                {p.imagen ? (
                  <Image src={p.imagen} alt={p.nombre} width={640} height={400} className="aspect-[16/10] w-full object-cover" />
                ) : (
                  <ImagePlaceholder label={p.placeholderLabel} tag={p.tag} variant={p.tagVariant} />
                )}
                <div className="flex flex-1 flex-col p-5.5">
                  <span className="font-mono-adi text-[9.5px] uppercase tracking-[0.15em] text-cyan-dim">{p.ubicacion}</span>
                  <h4 className="font-display mt-2.75 mb-2.5 text-[17px] tracking-[-0.005em] text-ink">{p.nombre}</h4>
                  <p className="flex-1 text-[13.5px] text-ink-soft">{p.descripcion}</p>
                  <div className="mt-5 flex gap-5.5 border-t border-navy/[.14] pt-4">
                    {p.stats.map(([v, l]) => (
                      <div key={l}>
                        <div className="font-display text-[20px] leading-none text-navy">{v}</div>
                        <div className="font-mono-adi mt-1.5 text-[8.5px] uppercase tracking-[0.14em] text-ink/45">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-9.5 flex flex-wrap items-center gap-4 border-l-2 border-hivis py-1.5 pl-4.5">
            <span className="w-full max-w-[64ch] text-sm text-ink-soft sm:w-auto sm:flex-1">
              ¿Tiene una obra parecida? Jimmy puede decirle qué sistema se aplicó en cada uno de
              estos proyectos y qué haría falta en el suyo.
            </span>
            <button
              onClick={onAskJimmy}
              className="font-mono-adi inline-flex items-center justify-center gap-2.5 rounded-[4px] px-4.5 py-2.75 text-xs font-semibold uppercase tracking-[0.13em] text-navy shadow-[inset_0_0_0_1px_rgba(1,35,135,.3)] transition-all hover:shadow-[inset_0_0_0_1px_var(--cyan)]"
            >
              Consultarlo con Jimmy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
