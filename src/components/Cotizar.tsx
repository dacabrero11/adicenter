const CHECK = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.75 flex-none text-cyan">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export function Cotizar() {
  return (
    <section id="cotizar" className="relative overflow-hidden bg-navy-900 py-19 lg:py-30">
      <div className="relative z-2 mx-auto max-w-[1220px] px-6">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <span className="font-mono-adi inline-flex items-center gap-2.5 rounded-full border border-hivis/40 px-3.75 py-2 text-[11px] uppercase tracking-[0.1em] text-hivis-soft">
              <span className="dot-live" /> Menos de 2 horas hábiles
            </span>
            <span className="eyebrow mt-4.5 block">Cotización rápida</span>
            <h2 className="font-display mt-4 text-[30px] sm:text-[40px] lg:text-[54px]">
              Mándenos
              <br />
              el metraje.
            </h2>
            <p className="mt-5 text-base text-white/66">
              Con la superficie, el área aproximada y una foto del problema podemos devolverle un
              estimado formal el mismo día, con el sistema especificado y el consumo por metro
              cuadrado.
            </p>
            <ul className="mt-7 flex flex-col">
              {[
                "Estimado formal con desglose de material y rendimiento",
                "Visita técnica sin costo en proyectos desde 300 m²",
                "Fichas técnicas y hojas de seguridad de todo lo cotizado",
                "Despacho a Tegucigalpa, SPS y zona norte en 24–48 h",
              ].map((t) => (
                <li key={t} className="flex gap-3.5 border-t border-white/12 py-3.75 text-[15px] text-white/76 first:border-t-0">
                  {CHECK}
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            className="rounded-[4px] border border-white/12 bg-white/4 p-8.5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nombre y apellido" placeholder="Su nombre" />
              <Field label="Empresa o proyecto" placeholder="Constructora / obra" />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Teléfono / WhatsApp" type="tel" placeholder="+504 0000-0000" />
              <Field label="Correo" type="email" placeholder="correo@empresa.hn" />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                label="Tipo de superficie"
                options={["Techo de lámina", "Losa de concreto", "Piso industrial", "Cisterna, tanque o muro", "Concreto en planta (aditivos)", "Aún no lo tengo claro"]}
              />
              <Field label="Área aproximada (m²)" type="number" placeholder="Ej. 1200" />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                label="Ubicación del proyecto"
                options={["Francisco Morazán", "Cortés", "Atlántida", "Yoro", "Choluteca", "Comayagua", "Otro departamento"]}
              />
              <SelectField label="¿Cuándo inicia?" options={["Este mes", "En 1 a 3 meses", "Solo estoy presupuestando"]} />
            </div>
            <div className="mb-5.5">
              <label className="font-mono-adi mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/50">
                Describa el problema
              </label>
              <textarea
                placeholder="Ej. Bodega de 1,200 m² con lámina filtrando en los traslapes desde la temporada pasada…"
                className="min-h-[96px] w-full resize-y rounded-[4px] border border-white/12 bg-black/28 px-3.5 py-3.25 transition-all focus:border-cyan focus:bg-cyan/7 focus:outline-none focus:shadow-[0_0_0_4px_rgba(1,183,222,.22)]"
              />
            </div>
            <button
              type="submit"
              className="font-mono-adi w-full rounded-[4px] bg-hivis px-6.5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white shadow-[0_10px_30px_-12px_rgba(255,106,19,.85)] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d33]"
            >
              Solicitar cotización
            </button>
            <p className="font-mono-adi mt-4 text-center text-[11px] uppercase tracking-[0.1em] text-white/38">
              O escríbanos directo al WhatsApp +504 9900-0000
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="font-mono-adi mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/50">{label}</label>
      <input
        {...props}
        className="w-full rounded-[4px] border border-white/12 bg-black/28 px-3.5 py-3.25 transition-all focus:border-cyan focus:bg-cyan/7 focus:outline-none focus:shadow-[0_0_0_4px_rgba(1,183,222,.22)]"
      />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="font-mono-adi mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/50">{label}</label>
      <select className="w-full rounded-[4px] border border-white/12 bg-black/28 px-3.5 py-3.25 transition-all focus:border-cyan focus:bg-cyan/7 focus:outline-none focus:shadow-[0_0_0_4px_rgba(1,183,222,.22)]">
        {options.map((o) => (
          <option key={o} className="bg-navy-900">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
