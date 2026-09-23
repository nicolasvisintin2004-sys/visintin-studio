"use client";

import { useEffect, useRef } from "react";
import { useConsultaMedios } from "@/hooks/use-consulta-medios";

/**
 * La luz que recorre el borde de una tarjeta siguiendo al cursor.
 *
 * Se mete adentro de una tarjeta con `position: relative` y se encarga sola
 * del resto. Dos capas superpuestas, las dos apagadas hasta que el mouse entra
 * en la tarjeta:
 *
 *  · una mancha suave adentro, que levanta apenas el fondo;
 *  · un recorte de 1px sobre el borde, que es donde se ve el efecto de verdad.
 *
 * El borde iluminado se hace con `mask-composite: exclude`: se dibuja el
 * gradiente sobre todo el rectángulo y después se le descuenta el interior,
 * dejando nada más el marco. Es lo que permite iluminar un borde redondeado
 * sin dibujarlo cuatro veces.
 *
 * Sin mouse no se monta nada, y no tiene ningún contenido: si algo de esto
 * falla, la tarjeta queda exactamente como estaba.
 */
export function LuzEnTarjeta() {
  const ref = useRef<HTMLDivElement>(null);
  const punteroFino = useConsultaMedios("(pointer: fine)");
  const movimientoReducido = useConsultaMedios("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const nodo = ref.current;
    const tarjeta = nodo?.parentElement;
    if (!nodo || !tarjeta) return;

    let cuadro = 0;
    let x = 0;
    let y = 0;

    const escribir = () => {
      cuadro = 0;
      nodo.style.setProperty("--x", `${x}px`);
      nodo.style.setProperty("--y", `${y}px`);
    };

    const alMover = (evento: PointerEvent) => {
      const caja = tarjeta.getBoundingClientRect();
      x = evento.clientX - caja.left;
      y = evento.clientY - caja.top;
      // Se escribe una vez por cuadro y no una vez por evento: un mouse
      // rápido dispara pointermove bastante más seguido que 60 veces por
      // segundo.
      if (!cuadro) cuadro = requestAnimationFrame(escribir);
    };

    const alEntrar = () => nodo.style.setProperty("--visible", "1");
    const alSalir = () => nodo.style.setProperty("--visible", "0");

    tarjeta.addEventListener("pointermove", alMover, { passive: true });
    tarjeta.addEventListener("pointerenter", alEntrar);
    tarjeta.addEventListener("pointerleave", alSalir);

    return () => {
      tarjeta.removeEventListener("pointermove", alMover);
      tarjeta.removeEventListener("pointerenter", alEntrar);
      tarjeta.removeEventListener("pointerleave", alSalir);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  if (!punteroFino || movimientoReducido) return null;

  return (
    <div ref={ref} className="luz-tarjeta" aria-hidden="true">
      <style>{`
        .luz-tarjeta {
          --x: 50%;
          --y: 50%;
          --visible: 0;
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          opacity: var(--visible);
          transition: opacity 400ms cubic-bezier(.16,1,.3,1);
        }

        /* La mancha de adentro. */
        .luz-tarjeta::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            260px circle at var(--x) var(--y),
            color-mix(in srgb, var(--color-acento) 7%, transparent),
            transparent 70%
          );
        }

        /* El filo de 1px. Es lo que de verdad se lee como "luz". */
        .luz-tarjeta::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(
            220px circle at var(--x) var(--y),
            var(--color-acento),
            transparent 65%
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>
    </div>
  );
}
