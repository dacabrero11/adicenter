"use client";

import Image from "next/image";
import { Button } from "./Button";
import { SectionBg } from "./SectionBg";
import { InView } from "./InView";

const HACE = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
    titulo: "Diagnostica",
    texto: "Le dice qué sistema necesita su superficie antes de que pida precio.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
    titulo: "Calcula",
    texto: "Rendimiento por m², litros para su metraje y presentaciones disponibles.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    titulo: "Reconoce su límite",
    texto: "Si hace falta criterio de campo, le agenda la visita en vez de inventar.",
  },
];

export function JimmySection({ onAskJimmy }: { onAskJimmy: () => void }) {
  return (
    <InView as="section" id="jimmy" className="cv-section relative overflow-hidden text-ink">
      <SectionBg tone="light" />

      <div className="relative z-2 mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-12 px-6 py-19 lg:grid-cols-[.82fr_1.18fr] lg:py-24">
        <div className="flex flex-col items-center">
          <div className="relative flex w-full justify-center">
            <span
              className="absolute -bottom-1 left-1/2 aspect-[1/.24] w-[46%] -translate-x-1/2 rounded-full"
              style={{ background: "radial-gradient(ellipse,rgba(1,35,135,.3),transparent 70%)" }}
            />
            <Image
              src="/images/jimmy-full.png"
              alt="JIMMY, el técnico de ADICENTER"
              width={510}
              height={1219}
              priority
              className="animate-bob relative h-[360px] w-auto max-w-full drop-shadow-[0_24px_38px_rgba(1,35,135,.3)] sm:h-[420px] lg:h-[clamp(400px,34vw,560px)]"
            />
          </div>
          <div className="mt-6.5 rounded-[3px] bg-navy px-5.5 py-2.75 text-center text-white shadow-[0_18px_36px_-16px_rgba(1,35,135,.85)]">
            <b className="font-display block text-[17px]">Jimmy</b>
            <small className="font-mono-adi block text-[8.5px] uppercase tracking-[0.14em] text-sky">Técnico ADICENTER</small>
          </div>
        </div>

        <div>
          <span className="eyebrow on-light">El que anda en la obra · y ahora también en el sitio</span>
          <h2 className="font-display mt-4.5 text-[30px] text-ink sm:text-[40px] lg:text-[48px]">Jimmy ya conoce su techo.</h2>
          <p className="mt-5 max-w-[56ch] text-base text-ink-soft sm:text-[17px]">
            Jimmy lleva años acompañando a las cuadrillas de ADICENTER en obra. Sabe qué falla en
            un traslape, cuánto rinde cada galón y cuándo un sustrato no está listo para recibir
            la membrana. Ahora está también aquí: en la esquina de esta página, a cualquier hora,
            para responder lo mismo que respondería parado en su losa.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-px border border-navy/[.14] bg-navy/[.14] sm:grid-cols-3">
            {HACE.map((h) => (
              <div key={h.titulo} className="card-live card-live-light relative bg-white px-5 py-5.5">
                <span className="mb-3.5 block text-cyan">{h.icon}</span>
                <strong className="font-display block text-[14px] text-ink">{h.titulo}</strong>
                <small className="mt-2 block text-[13px] leading-relaxed text-ink-soft">{h.texto}</small>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4.5">
            <Button onClick={onAskJimmy}>Preguntarle a Jimmy</Button>
            <span className="font-mono-adi w-full text-[11px] uppercase tracking-[0.11em] text-ink-soft sm:w-auto">
              Disponible 24/7 · sin esperar horario de oficina
            </span>
          </div>
        </div>
      </div>
    </InView>
  );
}
