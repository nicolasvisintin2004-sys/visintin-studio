"use client";

import { useEffect, useRef } from "react";
import { useConsultaMedios } from "@/hooks/use-consulta-medios";
import { crearInterpolador, seguirPuntero } from "@/lib/puntero";

/**
 * Hace que un elemento se corra un poco hacia el cursor cuando el cursor se
 * le acerca, y vuelva a su lugar cuando se aleja.
 *
 * Se usa nada más en los dos botones principales —el del hero y el de
 * contacto—, que son los dos que quiero que se toquen. El gesto dice "este
 * botón te está esperando" sin ningún texto, y si estuviera en todos los
 * botones dejaría de decir nada.
 *
 * Sólo con puntero fino y sin movimiento reducido: en touch no hay
 * acercamiento posible, y un elemento que se mueve solo es exactamente lo que
 * la preferencia de movimiento reducido pide evitar.
 */
export function useMagnetico<T extends HTMLElement>(
  /** Distancia en píxeles a la que el elemento empieza a reaccionar. */
  radio = 110,
  /** Cuánto del camino recorre: 0.3 es un empujón, 1 sería pegarse al mouse. */
  fuerza = 0.3,
) {
  const ref = useRef<T>(null);
  const punteroFino = useConsultaMedios("(pointer: fine)");
  const movimientoReducido = useConsultaMedios("(prefers-reduced-motion: reduce)");
  const activo = punteroFino && !movimientoReducido;

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo || !activo) return;

    const interpolador = crearInterpolador((x, y) => {
      nodo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, 0.2);
    interpolador.apuntar(0, 0);

    const dejarDeSeguir = seguirPuntero((punteroX, punteroY) => {
      const caja = nodo.getBoundingClientRect();
      const centroX = caja.left + caja.width / 2;
      const centroY = caja.top + caja.height / 2;
      const distanciaX = punteroX - centroX;
      const distanciaY = punteroY - centroY;

      // El radio se mide desde el borde del botón y no desde su centro: si no,
      // un botón ancho reacciona antes por los costados que por arriba.
      const alcance = radio + Math.min(caja.width, caja.height) / 2;
      const distancia = Math.hypot(distanciaX, distanciaY);

      if (distancia > alcance) {
        interpolador.apuntar(0, 0);
        return;
      }

      // Cerca del borde del radio el efecto es casi nulo y crece hacia adentro,
      // así no hay un salto al entrar en zona.
      const intensidad = (1 - distancia / alcance) * fuerza;
      interpolador.apuntar(distanciaX * intensidad, distanciaY * intensidad);
    });

    return () => {
      dejarDeSeguir();
      interpolador.detener();
      nodo.style.transform = "";
    };
  }, [activo, radio, fuerza]);

  return ref;
}
