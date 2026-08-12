"use client";

import { useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MarcasStrip } from "@/components/MarcasStrip";
import { Sistemas } from "@/components/Sistemas";
import { JimmySection } from "@/components/JimmySection";
import { Catalogo } from "@/components/Catalogo";
import { Selector } from "@/components/Selector";
import { Tecnologias } from "@/components/Tecnologias";
import { ProgramaObra } from "@/components/ProgramaObra";
import { FieldBand } from "@/components/FieldBand";
import { Proyectos } from "@/components/Proyectos";
import { Proceso } from "@/components/Proceso";
import { Cotizar } from "@/components/Cotizar";
import { Footer } from "@/components/Footer";
import { JimmyWidget, type JimmyWidgetHandle } from "@/components/JimmyWidget";

export default function Home() {
  const jimmyRef = useRef<JimmyWidgetHandle>(null);
  const abrirJimmy = (mensaje?: string) => jimmyRef.current?.abrir(mensaje);

  return (
    <>
      <Header />
      <div id="top" />
      <Hero />
      <MarcasStrip />
      <Sistemas />
      <JimmySection onAskJimmy={abrirJimmy} />
      <Catalogo />
      <Selector />
      <Tecnologias />
      <ProgramaObra />
      <FieldBand />
      <Proyectos onAskJimmy={abrirJimmy} />
      <Proceso />
      <Cotizar />
      <Footer />
      <JimmyWidget ref={jimmyRef} />
    </>
  );
}
