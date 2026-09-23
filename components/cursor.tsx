"use client";

import { useEffect, useRef } from "react";

/**
 * Un círculo que persigue al mouse con retardo y crece sobre lo que se puede
 * tocar.
 *
 * Sólo existe en pantallas con puntero fino: en touch no se monta nada, ni
 * siquiera el nodo. Tampoco con movimiento reducido, donde un elemento que
 * persigue al cursor es exactamente lo que la preferencia pide evitar.
 *
 * La interpolación va en un `requestAnimationFrame` propio y escribe sólo
 * `transform`, que el navegador resuelve en el compositor sin recalcular
 * layout. El bucle se detiene solo cuando el círculo alcanzó al mouse.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fino = window.matchMedia("(pointer: fine)");
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fino.matches || quieto.matches) return;

    const punto = ref.current;
    if (!punto) return;

    punto.style.opacity = "0";

    let destinoX = window.innerWidth / 2;
    let destinoY = window.innerHeight / 2;
    let x = destinoX;
    let y = destinoY;
    let cuadro = 0;
    let visible = false;

    const dibujar = () => {
      // Interpolación: el círculo llega tarde, y ese retardo es el efecto.
      x += (destinoX - x) * 0.18;
      y += (destinoY - y) * 0.18;
      punto.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      const falta = Math.abs(destinoX - x) + Math.abs(destinoY - y);
      // Se apaga el bucle cuando ya no hay nada que mover.
      cuadro = falta < 0.1 ? 0 : requestAnimationFrame(dibujar);
    };

    const arrancar = () => {
      if (!cuadro) cuadro = requestAnimationFrame(dibujar);
    };

    const alMover = (evento: PointerEvent) => {
      destinoX = evento.clientX;
      destinoY = evento.clientY;
      if (!visible) {
        visible = true;
        punto.style.opacity = "1";
      }
      arrancar();
    };

    // Crece sobre cualquier cosa que se pueda tocar, sin tener que marcarlas
    // una por una: se pregunta por el elemento que está debajo del puntero.
    const alEntrar = (evento: PointerEvent) => {
      const objetivo = evento.target as Element | null;
      const interactivo = objetivo?.closest?.(
        "a, button, summary, input, select, textarea, [role='button']",
      );
      punto.dataset.activo = interactivo ? "si" : "no";
    };

    const alSalir = () => {
      visible = false;
      punto.style.opacity = "0";
    };

    window.addEventListener("pointermove", alMover, { passive: true });
    window.addEventListener("pointerover", alEntrar, { passive: true });
    document.addEventListener("pointerleave", alSalir);

    return () => {
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("pointerover", alEntrar);
      document.removeEventListener("pointerleave", alSalir);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <style>{`
        .cursor {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9997;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          border: 1px solid var(--color-acento);
          pointer-events: none;
          opacity: 0;
          transition:
            width 320ms cubic-bezier(.16,1,.3,1),
            height 320ms cubic-bezier(.16,1,.3,1),
            background-color 320ms cubic-bezier(.16,1,.3,1),
            opacity 200ms linear;
        }

        .cursor[data-activo="si"] {
          width: 44px;
          height: 44px;
          background-color: color-mix(in srgb, var(--color-acento) 14%, transparent);
        }

        /* En touch el nodo ni se dibuja: el efecto no tiene sentido sin mouse. */
        @media (pointer: coarse), (prefers-reduced-motion: reduce) {
          .cursor { display: none; }
        }
      `}</style>
    </div>
  );
}
