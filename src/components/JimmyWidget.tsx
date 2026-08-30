"use client";

import Image from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { preguntasRapidas, respuestaGenerica, responderJimmy, saludoInicial } from "@/data/jimmy-guion";

type Msg = { id: number; rol: "bot" | "user"; texto: string };

export type JimmyWidgetHandle = { abrir: (mensajeInicial?: string) => void };

export const JimmyWidget = forwardRef<JimmyWidgetHandle>(function JimmyWidget(_, ref) {
  const [open, setOpen] = useState(false);
  const [escribiendo, setEscribiendo] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [valor, setValor] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  // ref, no state: no debe disparar un segundo paso del efecto ni cancelar su propio timeout
  const iniciadoRef = useRef(false);
  const [pulse, setPulse] = useState(false);
  const pendienteRef = useRef<string | null>(null);

  // pulso de atención periódico cuando el chat está cerrado
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setOpen((isOpen) => {
        if (!isOpen) {
          setPulse(true);
          setTimeout(() => setPulse(false), 950);
        }
        return isOpen;
      });
    }, 38000);
    return () => clearInterval(interval);
  }, []);

  useImperativeHandle(ref, () => ({
    abrir: (mensajeInicial) => {
      if (mensajeInicial) pendienteRef.current = mensajeInicial;
      setOpen(true);
    },
  }));

  useEffect(() => {
    if (!open) return;
    inputRef.current && setTimeout(() => inputRef.current?.focus(), 350);
    if (iniciadoRef.current) {
      // el widget ya estaba abierto: si llega un mensaje nuevo desde afuera, enviarlo ahora
      if (pendienteRef.current) {
        const msg = pendienteRef.current;
        pendienteRef.current = null;
        enviar(msg);
      }
      return;
    }
    iniciadoRef.current = true;
    const t = setTimeout(() => {
      push("bot", saludoInicial);
      if (pendienteRef.current) {
        const msg = pendienteRef.current;
        pendienteRef.current = null;
        setTimeout(() => enviar(msg), 750);
      }
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, escribiendo]);

  function push(rol: "bot" | "user", texto: string) {
    idRef.current += 1;
    setMsgs((m) => [...m, { id: idRef.current, rol, texto }]);
  }

  async function enviar(texto: string) {
    const t = texto.trim();
    if (!t) return;

    // Historial ANTES de agregar el mensaje nuevo: el servidor lo recibe aparte.
    const historial = msgs.map((m) => ({ rol: m.rol, texto: m.texto }));

    push("user", t);
    setValor("");
    setEscribiendo(true);

    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 22_000);
      const r = await fetch("/api/jimmy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: t, historial }),
        signal: ctrl.signal,
      });
      clearTimeout(timeout);
      const data = await r.json();
      setEscribiendo(false);
      push("bot", data?.texto?.trim() || responderJimmy(t) || respuestaGenerica);
    } catch {
      // Sin conexión o el endpoint no respondió: J1MMY sigue contestando
      // con el guion en vez de quedarse mudo.
      setEscribiendo(false);
      push("bot", responderJimmy(t) ?? respuestaGenerica);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Preguntarle a J1MMY"
        className={`fixed bottom-5.5 right-5.5 z-90 flex flex-col items-end gap-3 transition-all duration-300 ${
          open ? "pointer-events-none scale-90 opacity-0" : ""
        } ${pulse ? "animate-jimmy-attention" : ""}`}
      >
        {/* Rótulo flotante encima del casco */}
        <span className="rounded-full border border-cyan/30 bg-navy/95 px-3.5 py-1.5 text-right shadow-[0_8px_24px_-8px_rgba(1,35,135,.7)] backdrop-blur-sm">
          <strong className="block text-[13px] font-semibold leading-tight">Pregúntele a J1MMY</strong>
          <small className="font-mono-adi block text-[10px] uppercase tracking-[0.13em] text-sky">Técnico en línea</small>
        </span>
        {/* Avatar compacto */}
        <span className="relative h-[50px] w-[50px] flex-none rounded-full border border-cyan/40 bg-navy shadow-[0_18px_44px_-16px_rgba(1,35,135,.95)]">
          <Image src="/images/jimmy-face.png" alt="" fill sizes="50px" className="rounded-full object-cover" />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-navy bg-[#25D07A]" />
        </span>
      </button>

      <div
        role="dialog"
        aria-label="J1MMY, técnico de ADICENTER"
        className={`fixed bottom-5.5 right-5.5 z-95 flex h-[558px] max-h-[calc(100vh-44px)] w-[378px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[10px] border border-cyan/28 bg-navy-900 shadow-[0_40px_90px_-30px_rgba(0,0,0,.85)] transition-all duration-350 max-[560px]:inset-x-3 max-[560px]:bottom-3 max-[560px]:h-[calc(100vh-90px)] max-[560px]:w-auto ${
          open ? "opacity-100" : "pointer-events-none translate-y-5 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-white/12 bg-[linear-gradient(120deg,var(--navy),var(--navy-800))] px-4.5 py-4">
          <span className="relative h-[42px] w-[42px] flex-none rounded-full">
            <Image src="/images/jimmy-face.png" alt="" fill sizes="42px" className="rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-navy bg-[#25D07A]" />
          </span>
          <span className="flex-1 leading-snug">
            <strong className="block text-[15px]">J1MMY · Técnico ADICENTER</strong>
            <small className="font-mono-adi block text-[12px] uppercase tracking-[0.12em] text-[#7DE2AE]">
              En línea · responde al instante
            </small>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Cerrar" className="rounded p-1.5 text-white/55 transition-colors hover:bg-white/9 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div ref={bodyRef} className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-4.5 py-5">
          {msgs.map((m) => (
            <div
              key={m.id}
              className={`animate-msg-in max-w-[86%] rounded-xl px-3.75 py-3 text-sm leading-relaxed [&_b]:font-semibold ${
                m.rol === "user"
                  ? "self-end rounded-br-[3px] bg-cyan font-medium text-navy-950 [&_b]:text-navy"
                  : "self-start rounded-bl-[3px] border border-white/12 bg-white/7 [&_b]:text-sky"
              }`}
              dangerouslySetInnerHTML={{ __html: m.texto }}
            />
          ))}
          {escribiendo && (
            <div className="flex gap-1 self-start rounded-xl rounded-bl-[3px] bg-white/7 px-4 py-3.5">
              <i className="blink-dot h-1.5 w-1.5 rounded-full bg-sky" />
              <i className="blink-dot h-1.5 w-1.5 rounded-full bg-sky [animation-delay:.18s]" />
              <i className="blink-dot h-1.5 w-1.5 rounded-full bg-sky [animation-delay:.36s]" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.75 px-4.5 pb-3.5">
          {preguntasRapidas.map((q) => (
            <button
              key={q.label}
              onClick={() => enviar(q.texto)}
              className="font-mono-adi rounded-full border border-cyan/40 px-3.25 py-1.75 text-[12px] uppercase tracking-[0.1em] text-sky transition-colors hover:bg-cyan hover:text-navy-950"
            >
              {q.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2.25 border-t border-white/12 bg-black/25 px-4 py-3.5">
          <input
            ref={inputRef}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviar(valor)}
            placeholder="Escríbale a J1MMY…"
            aria-label="Mensaje"
            className="flex-1 rounded-full border border-white/12 bg-white/6 px-4 py-2.75 focus:border-cyan focus:outline-none"
          />
          <button
            onClick={() => enviar(valor)}
            aria-label="Enviar"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-cyan text-navy-950 transition-transform hover:-rotate-12 hover:scale-106 hover:bg-white"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
});
