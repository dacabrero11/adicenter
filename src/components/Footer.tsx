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
                <small className="font-mono-adi block text-[12px] uppercase tracking-[0.15em] text-white/50">
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
              links={["Sistemas", "J1MMY, el técnico", "Programa Obra", "Selector de sistema"]}
              hrefs={["#sistemas", "#jimmy", "#obra", "#selector"]}
            />
          </Reveal>
          <Reveal as="div" index={3}>
            <h6 className="font-mono-adi mb-4.5 text-[12px] font-medium uppercase tracking-[0.18em] text-cyan">Contacto</h6>
            {["Col. El Prado, Calle La Salud #834, Tegucigalpa", "+504 2205-6514", "ventas@adicenterhn.com", "Lun a Vie 8:00 – 17:00"].map((t) => (
              <p key={t} className="py-1.25 text-sm text-white/58">{t}</p>
            ))}
            <p className="py-1.25 text-sm text-white/58">Cobertura en todo Honduras</p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://wa.me/50492996960"
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp de ventas"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 text-white/70 transition-colors hover:border-cyan hover:text-cyan"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.2 1.3-2 1.4-.5.1-1.1.1-3.4-.8-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.3.1.2.1.8-.1 1.3Z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/adicenterhn/"
                target="_blank"
                rel="noopener"
                aria-label="Facebook de ADICENTER"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 text-white/70 transition-colors hover:border-cyan hover:text-cyan"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/adicenterhn"
                target="_blank"
                rel="noopener"
                aria-label="Instagram de ADICENTER"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 text-white/70 transition-colors hover:border-cyan hover:text-cyan"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
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
      <h6 className="font-mono-adi mb-4.5 text-[12px] font-medium uppercase tracking-[0.18em] text-cyan">{title}</h6>
      {links.map((l, i) => (
        <a key={l} href={hrefs ? hrefs[i] : href} className="block py-1.25 text-sm text-white/58 transition-colors hover:text-white">
          {l}
        </a>
      ))}
    </div>
  );
}
