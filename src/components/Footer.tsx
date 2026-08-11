import Image from "next/image";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="cv-section border-t border-white/12 bg-navy-950 pt-16">
      <div className="mx-auto max-w-[1220px] px-6">
        <div className="grid grid-cols-1 gap-10 pb-13 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <Reveal as="div" index={0}>
            <a href="#top" className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="ADICENTER" width={46} height={35} className="w-[46px] h-auto" />
              <span className="leading-tight">
                <strong className="font-display block text-[22px]">
                  ADI<span className="text-cyan">CENTER</span>
                </strong>
                <small className="font-mono-adi block text-[8.5px] uppercase tracking-[0.15em] text-white/50">
                  Aditivos · Epóxicos · Impermeabilizantes
                </small>
              </span>
            </a>
            <p className="mt-4.5 max-w-[34ch] text-sm text-white/52">
              Centro de aditivos, epóxicos e impermeabilizantes. Suministro técnico y
              acompañamiento en obra para constructoras, industria y mantenimiento en toda
              Honduras.
            </p>
          </Reveal>

          <Reveal as="div" index={1}>
            <FooterCol title="Líneas" links={["Aditivos para concreto", "Epóxicos industriales", "Impermeabilizantes", "Complementos y anclajes"]} href="#catalogo" />
          </Reveal>
          <Reveal as="div" index={2}>
            <FooterCol
              title="Empresa"
              links={["Sistemas", "Jimmy, el técnico", "Programa Obra", "Selector de sistema"]}
              hrefs={["#sistemas", "#jimmy", "#obra", "#selector"]}
            />
          </Reveal>
          <Reveal as="div" index={3}>
            <h6 className="font-mono-adi mb-4.5 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan">Contacto</h6>
            {["Tegucigalpa, Francisco Morazán", "+504 2200-0000", "ventas@adicenter.hn", "Lun a Vie 7:30 – 17:00 · Sáb 8:00 – 12:00"].map((t) => (
              <p key={t} className="py-1.25 text-sm text-white/58">{t}</p>
            ))}
          </Reveal>
        </div>

        <div className="font-mono-adi flex flex-wrap justify-between gap-4.5 border-t border-white/12 py-5.5 text-white/40">
          <span>© 2026 ADICENTER® · Todos los derechos reservados</span>
          <span>Fichas técnicas · Hojas de seguridad · Política de garantía</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, href, hrefs }: { title: string; links: string[]; href?: string; hrefs?: string[] }) {
  return (
    <div>
      <h6 className="font-mono-adi mb-4.5 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan">{title}</h6>
      {links.map((l, i) => (
        <a key={l} href={hrefs ? hrefs[i] : href} className="block py-1.25 text-sm text-white/58 transition-colors hover:text-white">
          {l}
        </a>
      ))}
    </div>
  );
}
