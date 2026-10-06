"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { registrarAperturaPregunta } from "@/lib/analitica";

type Props = {
  /** En qué página está el acordeón. Viaja con el evento. */
  pagina: string;
  children: ReactNode;
};

/**
 * Registra qué preguntas frecuentes se abren.
 *
 * Envuelve al acordeón en lugar de meterse adentro: `components/acordeon.tsx`
 * es de servidor y usa `<details>` nativo, y no hay motivo para convertirlo
 * en un componente de cliente sólo para medirlo.
 *
 * El evento `toggle` de `<details>` no burbujea, así que se escucha en la
 * fase de captura desde el contenedor. Se registra sólo al abrir: cerrar una
 * pregunta no dice nada. Qué preguntas se abren más es la lista de lo que la
 * página no dejó claro más arriba.
 */
export function MedirPreguntas({ pagina, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const alAlternar = (evento: Event) => {
      const detalle = evento.target;
      if (!(detalle instanceof HTMLDetailsElement) || !detalle.open) return;
      const pregunta = detalle.querySelector("summary h3, summary h4")?.textContent?.trim();
      if (pregunta) registrarAperturaPregunta(pregunta, pagina);
    };

    nodo.addEventListener("toggle", alAlternar, true);
    return () => nodo.removeEventListener("toggle", alAlternar, true);
  }, [pagina]);

  return <div ref={ref}>{children}</div>;
}
