"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Bienvenida a pantalla completa que se muestra antes del sitio.
 *
 * Reglas de comportamiento, pensadas para que no estorbe:
 * - Se muestra UNA VEZ por sesión. Quien vuelve a la página desde otra
 *   sección no la vuelve a ver.
 * - Siempre se puede saltar: botón, clic, Escape o cualquier tecla.
 * - Con `prefers-reduced-motion` no se muestra nunca.
 * - Si el video no carga en 2.5 s, se cierra sola: nadie se queda mirando
 *   una pantalla negra por culpa de una conexión lenta.
 */
export function Intro() {
  const [visible, setVisible] = useState(false);
  const [saliendo, setSaliendo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cerrado = useRef(false);

  const cerrar = useCallback(() => {
    if (cerrado.current) return;
    cerrado.current = true;
    setSaliendo(true);
    document.documentElement.style.overflow = "";
    window.setTimeout(() => setVisible(false), 620);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let yaVista = false;
    try {
      yaVista = sessionStorage.getItem("adicenter-intro") === "1";
    } catch {
      // navegación privada o almacenamiento bloqueado: se muestra igual
    }
    if (reduce || yaVista) return;

    try {
      sessionStorage.setItem("adicenter-intro", "1");
    } catch {
      /* sin persistencia, no pasa nada */
    }

    setVisible(true);
    document.documentElement.style.overflow = "hidden";

    // red de seguridad: si el video no arranca, no bloqueamos la página
    const limite = window.setTimeout(() => {
      if (!videoRef.current || videoRef.current.readyState < 2) cerrar();
    }, 2500);

    // duración máxima aunque el video se trabe a mitad
    const tope = window.setTimeout(cerrar, 7000);

    const porTecla = () => cerrar();
    window.addEventListener("keydown", porTecla);

    return () => {
      window.clearTimeout(limite);
      window.clearTimeout(tope);
      window.removeEventListener("keydown", porTecla);
      document.documentElement.style.overflow = "";
    };
  }, [cerrar]);

  if (!visible) return null;

  return (
    <div
      onClick={cerrar}
      role="dialog"
      aria-label="Bienvenida de ADICENTER"
      className={`fixed inset-0 z-[200] flex cursor-pointer items-end justify-center overflow-hidden bg-navy-950 transition-opacity duration-[600ms] ${
        saliendo ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/images/jimmy/intro-poster.jpg"
        onEnded={cerrar}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/images/jimmy/intro.webm" type="video/webm" />
        <source src="/images/jimmy/intro.mp4" type="video/mp4" />
      </video>

      {/* velo para que el texto se lea sobre cualquier fotograma */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,34,.55)_0%,rgba(3,11,34,.12)_30%,rgba(3,11,34,.55)_66%,rgba(3,11,34,.93)_100%)]" />

      {/* marca */}
      <div className="pointer-events-none relative z-10 flex w-full max-w-[1180px] flex-col items-center px-6 pb-16 text-center sm:items-start sm:pb-20 sm:text-left">
        <div className="intro-marca flex items-center gap-4">
          <span className="grid place-items-center rounded-[14px] bg-white px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
            <Image
              src="/images/logo.png"
              alt="ADICENTER"
              width={62}
              height={48}
              priority
              className="h-auto w-[46px] sm:w-[58px]"
            />
          </span>
          <span className="text-left">
            <b className="font-display block text-[26px] leading-none text-white sm:text-[36px]">
              ADI<span className="text-cyan">CENTER</span>
            </b>
            <span className="font-mono-adi mt-1.5 block text-[9px] uppercase tracking-[0.2em] text-cyan sm:text-[11px]">
              Centro de aditivos, epóxicos e impermeabilizantes
            </span>
          </span>
        </div>

        <p className="intro-lema font-display mt-5 max-w-[16ch] text-[24px] leading-[1.04] text-white sm:mt-6 sm:max-w-[24ch] sm:text-[38px]">
          No vendemos materiales.
          <br />
          <span className="text-cyan">Diseñamos sistemas.</span>
        </p>
      </div>

      {/* saltar */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          cerrar();
        }}
        className="font-mono-adi absolute bottom-7 right-6 z-10 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan sm:bottom-9 sm:right-9 sm:text-[11px]"
      >
        Saltar intro
      </button>

      {/* barra de progreso: indica cuánto falta */}
      <span className="intro-barra absolute bottom-0 left-0 z-10 h-[3px] bg-cyan" />
    </div>
  );
}
