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

## Hero — hover preciso, glow y despliegue idle

**Detección de hover por transparencia real, no por caja rectangular.** Las
placas son diagonales y se solapan; con una caja rectangular, pasar el mouse
por el margen transparente de una capa activaría el hover de la capa
equivocada. `HeroBlock.tsx` precarga cada asset en un canvas oculto, guarda
su canal alfa a baja resolución, y en cada `mousemove` calcula qué capa está
realmente pintada bajo el cursor (probado: 0 falsos positivos en zonas
transparentes, exactamente 1 placa activa en zonas sólidas).

**Glow: opacidad, no `filter: drop-shadow()`.** La primera versión usaba
`drop-shadow` para que el halo siguiera el contorno exacto de cada placa —
visualmente perfecto, pero combinado con las animaciones continuas del hero
(partículas, mesh, cuadrícula, logo) obligaba a recalcular el filtro en cada
repintado de la página: 20 FPS en reposo con el hover activo. Se reemplazó
por una capa de degradado radial con opacidad animada detrás de cada placa —
mismo efecto visual, 36–42 FPS en las mismas condiciones exactas (medido con
Chrome tracing, mismo patrón del problema que ya resolvimos con los orbes de
fondo de las demás secciones).

**Despliegue idle.** Cada 9s, si nadie tiene el mouse sobre el bloque, las 6
capas se separan (proporcional a su offset de ensamblaje) y se iluminan
todas a la vez durante ~1.5s, después vuelven a su lugar. Se cancela si hay
hover activo o si el hero no está en pantalla.

Todo el movimiento (parallax, elevación al hover, despliegue idle) se anima
en un único loop de `requestAnimationFrame` que escribe `transform` directo
por JS — se evitó a propósito mezclar `animation` CSS con transform inline en
el mismo elemento, que ya causó bugs de colisión dos veces antes en este
proyecto.

## Hero — bloque de 6 capas

El hero se reconstruyó con los 6 renders de capa como assets independientes
(`public/images/hero/layer-1..6.webp`), animados para ensamblarse.

**Calibración del apilado.** Las capas comparten escala y perspectiva y están
centradas en el mismo punto, así que apilarlas es solo desplazamiento vertical.
Se midió el grosor real de cada asset y se acumuló de abajo hacia arriba; el
resultado vive en `CAPAS[].fy` (`HeroBlock.tsx`) como porcentaje de la propia
altura de la imagen, de modo que la composición escala sin deformarse.

**Diferencia conocida con `master-block.webp`.** Los 6 renders individuales
tienen una perspectiva algo más ancha y plana que el bloque maestro, que es más
profundo y compacto. Es una diferencia de los assets de origen, no de la
composición: igualarla exigiría deformar las imágenes, cosa que el brief
prohíbe. El apilado sí reproduce el orden, proporción relativa y lectura de
bloque único. `master-block.webp` queda como referencia.

**capa 6 no venía transparente** (llegó renderizada sobre fondo negro). Se
recortó separando el bloque del fondo por varianza local de textura — el fondo
es un degradado liso y el bloque tiene grano — porque el umbral por luminancia
se comía la cara lateral oscura.

**Rendimiento.** Solo se animan `transform` y `opacity`. Nada de `filter: blur`
ni `backdrop-filter` en el bloque: ya costaron caro antes en este proyecto. El
parallax interpola en `requestAnimationFrame` y se apaga en dispositivos
táctiles y con `prefers-reduced-motion`.

## Actualización — servicios reales, proyectos reales, énfasis en Reparación

Segunda ronda de cambios, a partir de 3 presentaciones PPT que Jaime compartió
(AdiCenter_2026_Testimonial, AdiCenter-1, CFRP__2026):

- **"Catálogo Técnico" ahora muestra servicios, no productos.** 8 servicios reales
  (`src/data/servicios.ts`): CFRP, grouting, inyección epóxica, impermeabilización de
  losas/tanques/muros, sello de juntas, pisos.
- **"Tres líneas" volvió a 3 pilares** — se quitó "Aditivos para concreto" de
  `Sistemas.tsx`; Reparación y Reforzamiento sigue destacada como pilar 01.
- **Sección Proyectos con fotos reales de obra**, extraídas de los PPT y optimizadas en
  `public/images/proyectos/`. Nombres genéricos en proyectos privados por pedido
  explícito de Jaime (a los dueños no les gusta que se sepa que su edificio necesitó
  refuerzo — afecta el alquiler). Se mantuvo el nombre real solo en proyectos públicos
  con valor de vitrina (Aeropuerto Internacional Palmerola).
- **El corte transversal del hero se agrandó** — la columna del diagrama pasó de
  `.94fr` a `1.14fr`–`1.2fr` según el ancho de pantalla.

Quedan sin usar en el código: `productos.ts` (catálogo Sika/Velosit de la ronda
anterior) — no se borró por si se quiere volver a usar como página de catálogo técnico
aparte del listado de servicios.

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
