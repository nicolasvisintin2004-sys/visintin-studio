"use client";

import { useEffect, useRef } from "react";

type Props = {
  valor: number;
  sufijo?: string;
};

/**
 * Un número que cuenta hacia arriba cuando entra en pantalla.
 *
 * El valor final está escrito en el HTML desde el servidor: si el JavaScript
 * no corre, el dato se lee igual. La animación sólo lo reemplaza mientras
 * dura, y con movimiento reducido no se toca nada.
 *
 * Escribe `textContent` directamente en vez de pasar por el estado de React:
 * son sesenta actualizaciones por segundo y ninguna necesita re-renderizar
 * un componente.
 */
export function Contador({ valor, sufijo = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();

        const duracion = 1100;
        const arranque = performance.now();

        const paso = (ahora: number) => {
          const avance = Math.min(1, (ahora - arranque) / duracion);
          // Frena al final en vez de cortar de golpe.
          const suave = 1 - Math.pow(1 - avance, 3);
          nodo.textContent = `${Math.round(valor * suave)}${sufijo}`;
          if (avance < 1) requestAnimationFrame(paso);
        };

        nodo.textContent = `0${sufijo}`;
        requestAnimationFrame(paso);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, [valor, sufijo]);

  return <span ref={ref}>{`${valor}${sufijo}`}</span>;
}
