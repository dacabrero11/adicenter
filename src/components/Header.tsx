"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { scrollToHash } from "./scrollToHash";

const LINKS = [
  { href: "#sistemas", label: "Sistemas" },
  { href: "#jimmy", label: "J1MMY" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#selector", label: "Selector" },
  { href: "#obra", label: "Obra" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#cotizar", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-navy border-b border-white/10 relative z-[60]">
        <div className="mx-auto flex h-[34px] md:h-[38px] max-w-[1220px] items-center justify-center md:justify-between gap-4 px-6 font-mono-adi text-[12px]">
          <span className="hidden md:inline text-white/70">
            Tegucigalpa · San Pedro Sula · <b className="text-sky font-medium">Cobertura nacional</b>
          </span>
          <div className="flex gap-6">
            <span className="hidden lg:inline text-white/70">Asesoría técnica en obra</span>
            <span className="text-white/70">
              <b className="text-sky font-medium">+504 2205-6514</b>
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900/80 backdrop-blur-xl">
        <div
          className={`mx-auto flex max-w-[1220px] items-center justify-between gap-4.5 px-6 transition-[height] duration-300 ease-out ${
            scrolled ? "h-[60px]" : "h-[78px]"
          }`}
        >
          <Link href="#top" className="flex min-w-0 flex-1 items-center gap-3 min-[1240px]:flex-none">
            <Image
              src="/images/logo.png"
              alt="ADICENTER"
              width={46}
              height={35}
              className={`logo-live h-auto flex-none transition-[width] duration-300 ${
                scrolled ? "w-[34px]" : "w-[46px]"
              }`}
              priority
            />
            <span className="leading-tight min-w-0">
              <strong className="relative block font-display text-[20px] md:text-[22px] whitespace-nowrap">
                ADI<span className="text-cyan">CENTER</span>
                <span className="wordmark-shine" aria-hidden="true">ADICENTER</span>
              </strong>
              <small className="block font-mono-adi text-[11px] tracking-[0.1em] uppercase text-white/50 whitespace-normal min-[1240px]:whitespace-nowrap leading-snug xl:text-[12px] xl:tracking-[0.13em]">
                Aditivos · Epóxicos · Impermeabilizantes
              </small>
            </span>
          </Link>

          <nav
            className={`fixed inset-x-0 top-[78px] z-40 flex-col gap-0 border-b border-white/10 bg-navy-900 px-6 pb-6 pt-3.5 transition-transform duration-400 ease-[cubic-bezier(0.22,0.85,0.3,1)] max-[1100px]:flex ${
              open ? "translate-y-0" : "-translate-y-[120%]"
            } min-[1101px]:static min-[1101px]:flex min-[1101px]:translate-y-0 min-[1101px]:flex-row min-[1101px]:items-center min-[1101px]:gap-[21px] min-[1101px]:border-0 min-[1101px]:bg-transparent min-[1101px]:p-0`}
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  if (l.href.startsWith("#")) {
                    e.preventDefault();
                    scrollToHash(l.href);
                  }
                  setOpen(false);
                }}
                className="relative border-b border-white/10 py-3.75 font-mono-adi text-[13px] uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white min-[1101px]:border-0 min-[1101px]:py-1.5 min-[1101px]:text-[12px] min-[1101px]:tracking-[0.1em] min-[1101px]:whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-cyan after:transition-all after:duration-300 hover:after:w-full min-[1101px]:after:content-['']"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#cotizar"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#cotizar");
                setOpen(false);
              }}
              className="mt-4.5 flex items-center justify-center rounded-[4px] bg-hivis px-4 py-4 font-mono-adi text-xs font-semibold uppercase tracking-[0.1em] text-white shadow-[0_12px_30px_-12px_rgba(255,106,19,0.8)] min-[1101px]:hidden"
            >
              Cotizar proyecto
            </a>

            {/* Botón ver intro — mobile only */}
            <button
              onClick={() => {
                try { sessionStorage.removeItem("adicenter-intro"); } catch {}
                setOpen(false);
                window.location.reload();
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-[4px] border border-white/15 bg-transparent px-4 py-3.5 font-mono-adi text-xs font-semibold uppercase tracking-[0.1em] text-white/60 transition-colors hover:border-cyan/50 hover:text-white min-[1101px]:hidden"
            >
              ▶ Ver intro
            </button>
          </nav>

          <div className="flex flex-none items-center gap-3">
            {/* Botón ver intro — desktop y tablet */}
            <button
              onClick={() => {
                try { sessionStorage.removeItem("adicenter-intro"); } catch {}
                window.location.reload();
              }}
              title="Ver intro de nuevo"
              className="hidden min-[1101px]:flex items-center gap-1.5 rounded-[4px] border border-white/15 bg-transparent px-3 py-1.5 font-mono-adi text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50 transition-colors hover:border-cyan/50 hover:text-white"
            >
              ▶ Intro
            </button>
            <span className="hidden min-[1101px]:inline-flex">
              <Button href="#cotizar" size="sm" className="whitespace-nowrap">
                Cotizar proyecto
              </Button>
            </span>
            <button
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
              className="flex-none p-2 min-[1101px]:hidden"
            >
              <span className={`block h-0.5 w-[22px] bg-white transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`my-1 block h-0.5 w-[22px] bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-[22px] bg-white transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
