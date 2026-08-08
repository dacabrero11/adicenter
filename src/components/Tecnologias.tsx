import { tecnologias } from "@/data/tecnologias";
import { Reveal } from "./Reveal";
import { SectionBg } from "./SectionBg";

export function Tecnologias() {
  return (
    <div className="relative text-ink">
      <SectionBg tone="light" />
      <section className="relative z-2 py-19 lg:py-30">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="mb-14 max-w-[760px]">
            <span className="eyebrow on-light">Cinco formas de impermeabilizar</span>
            <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[40px] lg:text-[50px]">
              No toda superficie
              <br />
              pide lo mismo.
            </h2>
            <p className="mt-4.5 max-w-[62ch] text-base text-ink-soft">
              Elegimos la tecnología según el sustrato, el tránsito y la exposición — no
              vendemos el mismo sistema para una cisterna que para un estacionamiento.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tecnologias.map((t, i) => (
              <Reveal
                key={t.nombre}
                index={i}
                as="article"
                className="card-live card-live-light group flex flex-col rounded-[4px] border border-navy/[.14] bg-white/85 p-6.5 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-cyan/55 hover:shadow-[0_28px_60px_-34px_rgba(1,35,135,.5)]"
              >
                <span className="font-mono-adi self-start rounded-full bg-navy/[.06] px-3 py-1.25 text-[9.5px] uppercase tracking-[0.14em] text-navy-500">
                  {t.etiqueta}
                </span>
                <h3 className="font-display mt-4 mb-2.5 text-[19px] text-ink">{t.nombre}</h3>
                <p className="flex-1 text-[14px] text-ink-soft">{t.descripcion}</p>
                <div className="mt-5 border-t border-navy/[.14] pt-4">
                  <div className="font-mono-adi text-[9px] uppercase tracking-[0.14em] text-ink/45">
                    Uso típico
                  </div>
                  <div className="mt-1.5 text-[13.5px] font-medium text-ink">{t.usoTipico}</div>
                  <div className="font-mono-adi mt-3 text-[9px] uppercase tracking-[0.12em] text-cyan-dim">
                    {t.referencia}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
