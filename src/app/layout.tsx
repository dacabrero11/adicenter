import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const archivo = localFont({
  src: "../fonts/archivo-variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

const plexSans = localFont({
  src: [
    { path: "../fonts/plex-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/plex-sans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/plex-sans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "../fonts/plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/plex-mono-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/plex-mono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADICENTER · Centro de Aditivos, Epóxicos e Impermeabilizantes",
  description:
    "Sistemas de aditivos, epóxicos e impermeabilizantes para construcción en Honduras. Catálogo técnico, selector de sistema por superficie y asesoría en obra.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Las variables de next/font van en <html>: globals.css las consume desde
    // :root (que ES <html>), y las custom properties heredan hacia abajo, no
    // hacia arriba. Declaradas en <body> quedaban fuera del alcance de :root,
    // var(--font-archivo) no resolvía y toda la página caía a la fuente del
    // sistema con las tipografías descargadas pero sin usar.
    <html
      lang="es-HN"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
