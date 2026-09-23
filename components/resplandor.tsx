"use client";

import { useEffect, useRef } from "react";
import { useConsultaMedios } from "@/hooks/use-consulta-medios";
import { crearInterpolador, seguirPuntero } from "@/lib/puntero";

/**
 * Una luz cálida grande y muy tenue, detrás de todo el contenido.
 *
 * Es la respuesta a "falta color" sin agregar un segundo tono. El bronce del
 * sitio aparece en cinco lugares del tamaño de un alfiler, así que el ojo
 * concluye que la página es gris. Esto no pinta ningún elemento: pone una
 * mancha de color de 900px detrás del texto, tan suave que no se percibe como
 * una forma sino como temperatura.
 *
 * Con mouse sigue al puntero, con mucho retardo: no es un reflector que
 * persigue, es una lámpara en una habitación por la que alguien camina. En
 * touch y con movimiento reducido se queda quieta arriba a la izquierda, que
 * es donde está el título del hero, así que el celular igual recibe el color.
 *
 * Se mueve con `transform` sobre un div de tamaño fijo y no cambiando la
 * posición de un gradiente a pantalla completa: lo primero lo resuelve el
 * compositor, lo segundo obliga a repintar en cada cuadro.
 */
export function Resplandor() {
  const ref = useRef<HTMLDivElement>(null);
  const punteroFino = useConsultaMedios("(pointer: fine)");
  const movimientoReducido = useConsultaMedios("(prefers-reduced-motion: reduce)");
  const sigue = punteroFino && !movimientoReducido;

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    if (!sigue) {
      // Quieta sobre el hero. Se escribe igual para que el estado inicial de
      // la versión con mouse y el de la versión sin mouse sean el mismo.
      nodo.style.transform = "translate3d(22vw, 26vh, 0) translate(-50%, -50%)";
      return;
    }

    // 0.045 es muy lento a propósito: a 0.18, que es lo que usa el cursor, la
    // luz se lee como un objeto que persigue y distrae de la lectura.
    const interpolador = crearInterpolador((x, y) => {
      nodo.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }, 0.045);

    interpolador.apuntar(window.innerWidth * 0.22, window.innerHeight * 0.26);
    const dejarDeSeguir = seguirPuntero(interpolador.apuntar);

    return () => {
      dejarDeSeguir();
      interpolador.detener();
    };
  }, [sigue]);

  return (
    <div ref={ref} className="resplandor" aria-hidden="true">
      <style>{`
        .resplandor {
          position: fixed;
          top: 0;
          left: 0;
          /* Detrás del contenido y delante del fondo: el color de fondo lo
             pinta <html> justamente para dejar libre este plano. */
          z-index: -1;
          width: 1100px;
          height: 1100px;
          pointer-events: none;
          /*
           * Las paradas están medidas, no elegidas de ojo.
           *
           * Con 13% en el centro la diferencia contra el fondo era de dos
           * puntos de gris: invisible, no servía para nada. Con 22% sí se
           * veía, pero el fondo llegaba a rgb(52,41,29) y ahí el texto suave
           * caía a 4,41:1, o sea por debajo de AA.
           *
           * 17% es el punto en el que la luz se nota y los tres colores de
           * texto siguen pasando AA en el corazón del resplandor, que es el
           * peor caso: fondo rgb(43,34,26), texto 14,1:1, suave 4,8:1 y
           * acento 5,2:1.
           */
          background: radial-gradient(
            circle closest-side,
            color-mix(in srgb, var(--color-acento) 17%, transparent),
            color-mix(in srgb, var(--color-acento) 9%, transparent) 38%,
            color-mix(in srgb, var(--color-acento) 3%, transparent) 62%,
            transparent 80%
          );
          will-change: transform;
        }

        @media (max-width: 640px) {
          /* En un teléfono, 1100px es casi tres pantallas de ancho. */
          .resplandor { width: 620px; height: 620px; }
        }
      `}</style>
    </div>
  );
}
