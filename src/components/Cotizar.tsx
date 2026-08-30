"use client";

import { useState } from "react";

const CHECK = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.75 flex-none text-cyan">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

import { Reveal } from "./Reveal";

type Estado = "idle" | "enviando" | "ok" | "error";

export function Cotizar() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;

    const form = e.currentTarget;
    const datos = new FormData(form);

    // Honeypot: si viene lleno es un bot. Fingimos éxito para no darle pistas.
    if (datos.get("botcheck")) {
      setEstado("ok");
      return;
    }

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      setEstado("error");
      setError("El formulario aún no está configurado. Escríbanos por WhatsApp mientras tanto.");
      return;
    }

    datos.append("access_key", key);
    datos.append("subject", `Nueva cotización — ${datos.get("superficie") || "sin superficie"}`);
    datos.append("from_name", "Sitio web ADICENTER");

    setEstado("enviando");
    setError("");

    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 20000);
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: datos,
        signal: ctrl.signal,
      });
      clearTimeout(t);
      const json = await r.json();
      if (json.success) {
        setEstado("ok");
        form.reset();
      } else {
        setEstado("error");
        setError(json.message || "No pudimos enviar su solicitud.");
      }
    } catch {
      setEstado("error");
      setError("Hubo un problema de conexión. Intente de nuevo o escríbanos por WhatsApp.");
    }
  }

  return (
    <section id="cotizar" className="cv-section relative overflow-hidden bg-navy-900 py-19 lg:py-30">
      <div className="relative z-2 mx-auto max-w-[1220px] px-6">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal as="div">
            <span className="font-mono-adi inline-flex items-center gap-2.5 rounded-full border border-hivis/40 px-3.75 py-2 text-[12px] uppercase tracking-[0.1em] text-hivis-soft">
              <span className="dot-live" /> Respuesta en menos de 24 horas
            </span>
            <span className="eyebrow mt-4.5 block">Cotización rápida</span>
            <h2 className="font-display mt-4 text-[30px] sm:text-[42px] lg:text-[54px]">
              Mándenos
              <br />
              el metraje.
            </h2>
            <p className="mt-5 text-base text-white/66">
              Con la superficie y el área aproximada podemos devolverle un estimado formal el
              mismo día, con el sistema especificado y el consumo por metro cuadrado.
            </p>
            <ul className="mt-7 flex flex-col">
              {[
                "Estimado formal con desglose de material y rendimiento",
                "Visita técnica de diagnóstico sin costo, sin metraje mínimo",
                "Fichas técnicas y hojas de seguridad de todo lo cotizado",
                "Despacho a Tegucigalpa, SPS y zona norte en 24–48 h",
              ].map((t, i) => (
                <Reveal
                  key={t}
                  index={i}
                  as="li"
                  className="flex gap-3.5 border-t border-white/12 py-3.75 text-[15px] text-white/76 first:border-t-0"
                >
                  {CHECK}
                  <span>{t}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div">
            {estado === "ok" ? (
              <div className="rounded-[4px] border border-cyan/40 bg-cyan/8 p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan/18 text-cyan">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display mt-5 text-[24px]">Solicitud recibida.</h3>
                <p className="mt-3 text-[15px] text-white/70">
                  Un asesor técnico le responde con el estimado formal en menos de 24 horas.
                </p>
                <button
                  type="button"
                  onClick={() => setEstado("idle")}
                  className="font-mono-adi mt-7 text-[12px] uppercase tracking-[0.13em] text-cyan underline-offset-4 hover:underline"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
            <form
            className="rounded-[4px] border border-white/12 bg-white/4 p-8.5"
            onSubmit={onSubmit}
          >
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field name="nombre" label="Nombre y apellido" placeholder="Su nombre" required />
              <Field name="empresa" label="Empresa o proyecto" placeholder="Constructora / obra" />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field name="telefono" label="Teléfono / WhatsApp" type="tel" placeholder="Ej. 9999-9999" required />
              <Field name="correo" label="Correo" type="email" placeholder="su.correo@empresa.com" required />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                name="superficie"
                label="Tipo de superficie"
                options={["Techo de lámina", "Losa de concreto", "Piso industrial", "Cisterna, tanque o muro", "Piscina", "Concreto en planta (aditivos)", "Aún no lo tengo claro"]}
              />
              <Field name="area" label="Área aproximada (m²)" type="number" min="1" placeholder="Ej. 1200" />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                name="ubicacion"
                label="Ubicación del proyecto"
                options={["Francisco Morazán", "Cortés", "Atlántida", "Yoro", "Choluteca", "Comayagua", "Otro departamento"]}
              />
              <SelectField name="inicio" label="¿Cuándo inicia?" options={["Este mes", "En 1 a 3 meses", "Solo estoy presupuestando"]} />
            </div>
            <div className="mb-5.5">
              <label htmlFor="mensaje" className="font-mono-adi mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50">
                Describa el problema
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Ej. Bodega de 1,200 m² con lámina filtrando en los traslapes desde la temporada pasada…"
                className="min-h-[96px] w-full resize-y rounded-[4px] border border-white/12 bg-black/28 px-3.5 py-3.25 transition-all focus:border-cyan focus:bg-cyan/7 focus:outline-none focus:shadow-[0_0_0_4px_rgba(1,183,222,.22)]"
              />
            </div>
            {estado === "error" && (
              <p className="mb-4 rounded-[4px] border border-hivis/40 bg-hivis/10 px-4 py-3 text-[13px] text-hivis-soft">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={estado === "enviando"}
              className="font-mono-adi w-full rounded-[4px] bg-hivis px-6.5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white shadow-[0_10px_30px_-12px_rgba(255,106,19,.85)] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d33] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {estado === "enviando" ? "Enviando…" : "Solicitar cotización"}
            </button>
            <p className="font-mono-adi mt-4 text-center text-[12px] uppercase tracking-[0.1em] text-white/38">
              O escríbanos directo al WhatsApp +504 9299-6960
            </p>
          </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, ...props }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="font-mono-adi mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50">{label}</label>
      <input
        id={name}
        name={name}
        {...props}
        className="w-full rounded-[4px] border border-white/12 bg-black/28 px-3.5 py-3.25 transition-all focus:border-cyan focus:bg-cyan/7 focus:outline-none focus:shadow-[0_0_0_4px_rgba(1,183,222,.22)]"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="font-mono-adi mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50">{label}</label>
      <select id={name} name={name} defaultValue="" className="w-full rounded-[4px] border border-white/12 bg-black/28 px-3.5 py-3.25 transition-all focus:border-cyan focus:bg-cyan/7 focus:outline-none focus:shadow-[0_0_0_4px_rgba(1,183,222,.22)]">
        {options.map((o) => (
          <option key={o} className="bg-navy-900">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
