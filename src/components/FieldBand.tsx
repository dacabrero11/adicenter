import Image from "next/image";

export function FieldBand() {
  return (
    <section className="cv-section relative overflow-hidden bg-navy-950">
      <Image
        src="/images/obra-hero.jpg"
        alt="Aplicación de membrana impermeabilizante en cubierta"
        width={1672}
        height={941}
        className="h-[340px] w-full object-cover opacity-95 sm:h-[420px] lg:h-[clamp(340px,45vw,660px)]"
        style={{ objectPosition: "55% 8%" }}
      />
      <div
        className="absolute inset-0 flex items-end"
        style={{
          background:
            "linear-gradient(90deg,rgba(3,11,34,.95) 0%,rgba(3,11,34,.78) 34%,rgba(3,11,34,.28) 62%,rgba(3,11,34,0) 86%),linear-gradient(0deg,rgba(3,11,34,.9) 0%,rgba(3,11,34,.35) 38%,transparent 62%)",
        }}
      >
        <div className="mx-auto w-full max-w-[1220px] px-6 pb-13">
          <span className="eyebrow">Aplicación supervisada</span>
          <h3 className="font-display mt-3.5 max-w-[16ch] text-[24px] leading-[.98] sm:text-[32px] lg:text-[40px]">
            Nadie aplica <em className="not-italic text-cyan">solo</em> en una obra de ADICENTER.
          </h3>
          <p className="mt-3.5 max-w-[46ch] text-[15px] text-white/68">
            Cada sistema arranca con un paño de control aplicado junto a su cuadrilla. Si el
            sustrato no está listo, se detiene ahí — no se factura material que va a fallar en la
            primera lluvia.
          </p>
        </div>
      </div>
    </section>
  );
}
