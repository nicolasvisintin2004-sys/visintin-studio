"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * La pista de la cinta, que responde al scroll.
 *
 * Quieta, la cinta avanza sola y muy despacio. Al desplazar la página
 * acelera, y al subir se da vuelta y acompaña el movimiento. Es un detalle
 * chico y es de los que más separan un sitio hecho de uno armado: la página
 * ya sabe dónde está el cursor, y con esto también sabe a qué velocidad vas.
 *
 * ── Por qué la Web Animations API y no cambiar la duración ──
 *
 * Lo intuitivo sería escribir `animation-duration` desde JavaScript. No
 * sirve: una animación CSS calcula su progreso como tiempo transcurrido
 * sobre duración, así que al cambiar la duración el progreso salta y la
 * cinta pega un tirón en cada ajuste.
 *
 * `updatePlaybackRate` existe justamente para esto. Cambia la velocidad
 * conservando la posición actual, sin saltos, y admite valores negativos
 * para ir al revés. Además la animación la sigue corriendo el compositor:
 * el JavaScript toca un número por cuadro y no mueve un píxel, así que esto
 * no puede trabar el scroll.
 *
 * ── Qué pasa si algo falla ──
 *
 * La animación es CSS y ya está andando antes de que este componente se
 * monte. Si el JavaScript no corre, la cinta se desplaza a velocidad
 * constante, que es como estaba. Con movimiento reducido el CSS la apaga y
 * `getAnimations()` no devuelve nada, así que acá no se hace nada tampoco.
 */

/** Velocidad de reposo. 1 es la duración declarada en el CSS. */
const REPOSO = 1;
/** Cuánto suma cada píxel de scroll por cuadro. */
const SENSIBILIDAD = 0.22;
/** Topes, para que un scroll violento no la vuelva ilegible. */
const MAXIMO = 8;
const MINIMO = -6;
/** Suavizado del seguimiento. Más bajo, más inercia. */
const SUAVIZADO = 0.16;

type Props = { children: ReactNode; className?: string };

export function CintaReactiva({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [animacion] = nodo.getAnimations();
    if (!animacion) return;

    let ultimoY = window.scrollY;
    let velocidad = 0;
    let cuadro = 0;
    let tasaAnterior = REPOSO;

    const paso = () => {
      const y = window.scrollY;
      const delta = y - ultimoY;
      ultimoY = y;

      // Suavizado exponencial: la cinta no persigue el scroll cuadro a
      // cuadro sino que lo arrastra, que es lo que se lee como inercia.
      velocidad += (delta - velocidad) * SUAVIZADO;

      const tasa = Math.min(MAXIMO, Math.max(MINIMO, REPOSO + velocidad * SENSIBILIDAD));

      // Sólo se escribe si cambió lo suficiente como para verse.
      if (Math.abs(tasa - tasaAnterior) > 0.01) {
        animacion.updatePlaybackRate(tasa);
        tasaAnterior = tasa;
      }

      // Cuando se frena del todo, se corta el bucle y se vuelve al reposo.
      if (Math.abs(velocidad) > 0.05) {
        cuadro = requestAnimationFrame(paso);
      } else {
        cuadro = 0;
        velocidad = 0;
        if (tasaAnterior !== REPOSO) {
          animacion.updatePlaybackRate(REPOSO);
          tasaAnterior = REPOSO;
        }
      }
    };

    const alDesplazar = () => {
      if (!cuadro) cuadro = requestAnimationFrame(paso);
    };

    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      if (cuadro) cancelAnimationFrame(cuadro);
      animacion.updatePlaybackRate(REPOSO);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
