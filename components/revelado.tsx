"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Entrada por scroll: desplazamiento corto, opacidad y un desenfoque que se
 * resuelve. El CSS de la transición vive en `globals.css`.
 *
 * Regla que ordena todo esto: el HTML sale del servidor SIN estado oculto.
 * Recién en el cliente, y sólo para lo que todavía no se ve, se aplica
 * `data-revelar="oculto"`. Si el JavaScript no corre, falla o llega tarde,
 * el contenido está visible y legible desde el primer frame — que es lo
 * contrario de lo que pasa cuando un bloque espera a un observer para existir.
 */

/** Un solo observer para todo el sitio en vez de uno por elemento. */
let observador: IntersectionObserver | null = null;

function obtenerObservador() {
  observador ??= new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        (entrada.target as HTMLElement).dataset.revelar = "visible";
        observador?.unobserve(entrada.target);
      }
    },
    // Se dispara cuando el bloque entró de verdad, no cuando asoma un píxel.
    { rootMargin: "0px 0px -12% 0px" },
  );
  return observador;
}

type Props = {
  children: ReactNode;
  /** Milisegundos de espera. Sirve para escalonar hermanos. */
  retardo?: number;
  className?: string;
  /** Por defecto `div`; se puede pedir `li`, `article`, etc. */
  as?: ElementType;
};

export function Revelado({ children, retardo = 0, className, as: Etiqueta = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lo que ya está en pantalla no se esconde para después mostrarlo: eso
    // produce un parpadeo y no una entrada.
    if (elemento.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    elemento.dataset.revelar = "oculto";
    if (retardo) elemento.style.transitionDelay = `${retardo}ms`;

    const obs = obtenerObservador();
    obs.observe(elemento);
    return () => obs.unobserve(elemento);
  }, [retardo]);

  return (
    <Etiqueta ref={ref} className={className}>
      {children}
    </Etiqueta>
  );
}
