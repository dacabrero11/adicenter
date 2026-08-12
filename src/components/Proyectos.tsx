import Image from "next/image";
import { proyectos } from "@/data/proyectos";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { SectionBg } from "./SectionBg";
import { InView } from "./InView";

export function Proyectos({ onAskJimmy }: { onAskJimmy: (mensaje?: string) => void }) {
  return (
    <InView className="cv-section relative text-ink">
      <SectionBg tone="light" />
      <section id="proyectos" className="relative z-2 py-19 lg:py-30">
        <div className="mx-auto max-w-[1220px] px-6">
          <Reveal as="div" className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-[620px]">
              <span className="eyebrow on-light">Obras entregadas</span>
              <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[40px] lg:text-[50px]">
                Lo que ya está
                <br />
                aguantando la lluvia.
              </h2>
              <p className="mt-4.5 max-w-[56ch] text-base text-ink-soft">
                Fotografía real de obra — no renders. Por confidencialidad de los propietarios,
                algunos proyectos se muestran con nombre genérico en lugar del nombre comercial
                del edificio.
              </p>
            </div>
            <Button href="#cotizar" size="sm">Cotizar un proyecto así</Button>
          </Reveal>

          <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((p, i) => (
              <Reveal
                key={p.nombre}
                index={i}
                as="article"
                className="card-live card-live-light group flex flex-col overflow-hidden rounded-[4px] border border-navy/[.14] bg-white transition-all duration-400 hover:-translate-y-1.5 hover:border-cyan/55 hover:shadow-[0_30px_62px_-34px_rgba(1,35,135,.5)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.imagen}
                    alt={p.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`font-mono-adi absolute left-4 top-4 rounded-[2px] px-2.5 py-1.25 text-[8.5px] uppercase tracking-[0.14em] text-white ${
                      p.tagVariant === "ba" ? "bg-hivis" : "bg-navy"
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>
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
              </Reveal>
            ))}
          </div>

          <div className="mt-9.5 flex flex-wrap items-center gap-4 border-l-2 border-hivis py-1.5 pl-4.5">
            <span className="w-full max-w-[64ch] text-sm text-ink-soft sm:w-auto sm:flex-1">
              ¿Tiene una obra parecida? Jimmy puede decirle qué sistema se aplicó en cada uno de
              estos proyectos y qué haría falta en el suyo.
            </span>
            <button
              onClick={() => onAskJimmy()}
              className="font-mono-adi inline-flex items-center justify-center gap-2.5 rounded-[4px] px-4.5 py-2.75 text-xs font-semibold uppercase tracking-[0.13em] text-navy shadow-[inset_0_0_0_1px_rgba(1,35,135,.3)] transition-all hover:shadow-[inset_0_0_0_1px_var(--cyan)]"
            >
              Consultarlo con Jimmy
            </button>
          </div>
        </div>
      </section>
    </InView>
  );
}
