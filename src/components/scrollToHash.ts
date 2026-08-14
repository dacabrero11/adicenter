/**
 * Salta a una sección corrigiendo el destino mientras el layout se asienta.
 *
 * El scroll nativo con `scroll-behavior: smooth` calcula el punto de llegada
 * una sola vez, al empezar. En este sitio las secciones usan
 * `content-visibility` y cargan imágenes de forma diferida, así que sus
 * alturas cambian durante el trayecto y el visitante terminaba a miles de
 * píxeles del destino. Aquí reajustamos hasta que la posición se estabiliza.
 */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return;

  const OFFSET = 72; // alto del header sticky
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Interceptamos el clic, así que el navegador ya no escribe el hash solo.
  // Lo reponemos para que la URL siga reflejando la sección y el enlace se
  // pueda copiar y compartir.
  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, "", `#${id}`);
  }

  const goto = (smooth: boolean) => {
    const y = target.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top: y, behavior: smooth && !reduce ? "smooth" : "auto" });
  };

  goto(true);

  // Corrección: el layout sigue moviéndose mientras cargan imágenes, sobre
  // todo en móvil, donde las secciones son mucho más altas. Revisamos durante
  // ~3.5s y solo paramos cuando la posición se repite estable tres veces.
  let tries = 0;
  let stable = 0;
  const tick = () => {
    if (tries++ > 32) return;
    const off = target.getBoundingClientRect().top - OFFSET;
    if (Math.abs(off) < 4) {
      if (++stable >= 3) return;
    } else {
      stable = 0;
      // tras los primeros ajustes pasamos a saltos instantáneos para no
      // pelear contra el scroll suave que sigue en curso
      goto(tries < 4);
    }
    window.setTimeout(tick, 110);
  };
  window.setTimeout(tick, 120);
}
