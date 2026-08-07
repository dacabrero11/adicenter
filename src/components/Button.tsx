import Link from "next/link";
import { ReactNode } from "react";

type Variant = "hivis" | "ghost" | "solid";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[4px] font-mono-adi text-xs font-semibold uppercase tracking-[0.13em] transition-all duration-300 active:translate-y-px";

const variants: Record<Variant, string> = {
  hivis:
    "bg-hivis text-white shadow-[0_10px_30px_-12px_rgba(255,106,19,0.85)] hover:bg-[#ff7d33] hover:shadow-[0_16px_40px_-12px_rgba(255,106,19,0.95)] hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)] hover:shadow-[inset_0_0_0_1px_var(--cyan)] hover:text-cyan",
  solid: "bg-white text-navy hover:bg-sky hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-6.5 py-4",
  sm: "px-4.5 py-2.75",
};

export function Button({
  href,
  onClick,
  variant = "hivis",
  size = "md",
  children,
  className = "",
  type = "button",
  id,
}: {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  id?: string;
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls} id={id}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} id={id}>
      {children}
    </button>
  );
}
