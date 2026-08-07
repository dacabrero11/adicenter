# ADICENTER — Sitio web (Next.js)

Sitio web de ADICENTER (Centro de Aditivos, Epóxicos e Impermeabilizantes,
Honduras), desarrollado por BLITZ Digital.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

**Estado:** venta cerrada · migrado de mockup HTML a Next.js · pendiente de
contenido real antes de publicar en el dominio final.

## Estructura

```
src/
  app/
    layout.tsx       fuentes (next/font/local) + metadata
    page.tsx          ensambla todas las secciones
    globals.css        design tokens (colores, tipografía, animaciones)
  components/          un componente por sección del sitio
  data/                 contenido separado del JSX (productos, sistemas,
                          proyectos, guion de Jimmy) — editar aquí, no en JSX
  fonts/                 Archivo Variable + IBM Plex Sans/Mono en local
public/images/           logo, Jimmy, foto de obra — assets reales, no base64
```

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run start
```

`npm run build` debe pasar sin errores antes de cualquier push (regla
estándar de BLITZ).

## Actualización — catálogo con marcas reales (Sika® + Velosit®)

Por indicación directa de Jaime Cabrero (dueño de ADICENTER), el catálogo dejó de usar
productos ficticios y ahora referencia productos reales de dos marcas:

- **Sika®** (mex.sika.com) — especialmente la línea de Reparación y Reforzamiento
- **Velosit® GmbH & Co. KG** (Alemania) — impermeabilizantes cementicios y cristalinos

"Reparación y Reforzamiento" se destacó como línea principal en `Sistemas.tsx` porque
Jaime indicó explícitamente que es lo que más hacen.

**Importante — confirmar con el cliente antes de publicar:**
- Verificar si ADICENTER es distribuidor autorizado de Sika/Velosit o solo utiliza sus
  productos — el sitio usa la frase "trabajamos con productos de", no "distribuidor
  oficial", hasta confirmar el estatus real
- Los specs en `productos.ts` son cualitativos (marca, uso típico) donde no había datos
  numéricos verificados de la ficha técnica oficial — completar con las fichas reales
  de Sika/Velosit antes de publicar cifras de rendimiento exactas

## Pendientes antes de producción real

- [ ] Reemplazar los placeholders de `src/data/proyectos.ts` (campo
      `imagen: null`) con fotografía real de obra. Subir a `public/images/`
      y setear la ruta — el componente `Proyectos` ya soporta ambos casos.
- [ ] Confirmar teléfono, correo y horario reales de ADICENTER
      (`src/components/Header.tsx`, `Footer.tsx`)
- [ ] Revisar y ajustar `src/data/productos.ts` con datos verificados por
      ADICENTER, no placeholders
- [ ] Conectar el formulario de `src/components/Cotizar.tsx` a Web3Forms
      (client-side fetch únicamente — el plan gratuito bloquea proxies de
      servidor). No usar Resend (problemas de verificación DNS).
- [ ] Conectar `src/data/jimmy-guion.ts` a un backend real si se requiere
      IA de verdad; hoy responde con un guion de palabras clave

## Despliegue (GitHub → Vercel)

Los deploys de Vercel se disparan por git push.

```bash
git init
git add .
git commit -m "Sitio ADICENTER — migración a Next.js"
git remote add origin https://github.com/cabrero67/adicenter.git
git branch -M main
git push -u origin main
```

Luego en vercel.com → **Add New → Project → Import Git Repository**.
Next.js se detecta automáticamente, no hace falta configurar build command
ni output directory. Da un subdominio `algo.vercel.app` de inmediato;
el dominio propio se conecta después desde Project → Settings → Domains.

**Nota de seguridad:** nunca pegues un token de GitHub en un chat ni lo
hardcodees en el repo. Si ya expusiste uno, revócalo en
github.com/settings/tokens antes de generar uno nuevo.
