import { Reveal } from "./Reveal";

export function MarcasStrip() {
  return (
    <div className="border-y border-white/10 bg-navy-950 py-6">
      <Reveal as="div" className="mx-auto flex max-w-[1220px] flex-col items-center justify-center gap-4 px-6 sm:flex-row sm:gap-10">
        <span className="font-mono-adi text-[10px] uppercase tracking-[0.18em] text-white/45">
          Trabajamos con productos de
        </span>
        <div className="flex items-center gap-8 sm:gap-10">
          <span className="font-display text-[22px] tracking-[-0.01em] text-white/85">SIKA®</span>
          <span className="h-5 w-px bg-white/15" />
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-[22px] tracking-[-0.01em] text-white/85">VELOSIT®</span>
            <span className="font-mono-adi text-[9px] uppercase tracking-[0.14em] text-white/40">Alemania</span>
          </span>
        </div>
      </Reveal>
    </div>
  );
}
