"use client";

import { useEffect, useRef, useState } from "react";
import { textos } from "@/content/textos";
import type { Idioma } from "@/lib/i18n";

const DURACION = 400;

function formatear(valor: number): string {
  return valor.toFixed(2).replace(".", ",");
}

/**
 * Mide el tiempo de carga real de esta misma página y lo muestra.
 *
 * Es la versión más literal de lo que dice el sitio: en vez de afirmar que
 * es rápido, mide y publica el número que le tocó a quien está mirando.
 * Si esa persona está en una conexión mala, va a ver un número feo — y así
 * tiene que ser. Ocultarlo cuando no conviene sería la trampa que el resto
 * del sitio dice no hacer.
 *
 * Si la API no está disponible o el valor no tiene sentido, no se
 * renderiza nada: nunca un número inventado ni un valor por defecto.
 */
export function ContadorCarga({ idioma }: { idioma: Idioma }) {
  const [segundos, setSegundos] = useState<number | null>(null);
  const [mostrado, setMostrado] = useState<number | null>(null);
  const medido = useRef<number | null>(null);
  const cuadro = useRef(0);

  useEffect(() => {
    if (typeof performance === "undefined") return;

    let observador: PerformanceObserver | undefined;

    // Fuente principal: el LCP real de esta carga.
    if (typeof PerformanceObserver !== "undefined") {
      try {
        observador = new PerformanceObserver((lista) => {
          const entradas = lista.getEntries();
          const ultima = entradas[entradas.length - 1];
          if (ultima) medido.current = ultima.startTime;
        });
        observador.observe({
          type: "largest-contentful-paint",
          buffered: true,
        });
      } catch {
        observador = undefined;
      }
    }

    const cerrar = () => {
      // Respaldo: si no hubo entrada de LCP, se usa el fin del DOM.
      if (medido.current === null) {
        const [navegacion] = performance.getEntriesByType(
          "navigation",
        ) as PerformanceNavigationTiming[];
        if (navegacion?.domContentLoadedEventEnd) {
          medido.current = navegacion.domContentLoadedEventEnd;
        }
      }

      observador?.disconnect();

      const valor = medido.current;
      // Un valor de 0 o disparatado no se publica.
      if (valor === null || valor <= 0 || valor > 60000) return;

      const total = valor / 1000;
      setSegundos(total);

      // El conteo arranca acá adentro, no en un efecto aparte: así todo
      // ocurre en una devolución de llamada y no hay setState sincrónico
      // en el cuerpo de un efecto.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setMostrado(total);
        return;
      }

      const inicio = performance.now();
      const animar = (ahora: number) => {
        const t = Math.min((ahora - inicio) / DURACION, 1);
        const suavizado = 1 - Math.pow(1 - t, 3);
        setMostrado(total * suavizado);
        if (t < 1) cuadro.current = requestAnimationFrame(animar);
      };
      cuadro.current = requestAnimationFrame(animar);
    };

    // El LCP puede seguir cambiando hasta la primera interacción; se cierra
    // poco después de `load` o al primer toque, lo que ocurra antes.
    const temporizador = window.setTimeout(cerrar, 900);
    const alInteractuar = () => {
      window.clearTimeout(temporizador);
      cerrar();
    };
    window.addEventListener("pointerdown", alInteractuar, { once: true });
    window.addEventListener("keydown", alInteractuar, { once: true });

    return () => {
      window.clearTimeout(temporizador);
      window.removeEventListener("pointerdown", alInteractuar);
      window.removeEventListener("keydown", alInteractuar);
      observador?.disconnect();
      cancelAnimationFrame(cuadro.current);
    };
  }, []);

  if (segundos === null || mostrado === null) return null;

  return (
    <p className="flex flex-col">
      <span className="etiqueta">{textos.contador.etiqueta[idioma]}</span>
      <span
        className="font-display condensada text-fg mt-0.5 text-2xl"
        style={{
          fontVariantNumeric: "tabular-nums",
          // El ancho del valor final queda fijo desde el primer cuadro.
          minWidth: `${formatear(segundos).length}ch`,
        }}
      >
        <span aria-hidden="true">{formatear(mostrado)}</span>
        <span className="sr-only">{formatear(segundos)}</span>
        <span className="font-mono text-small text-fg-muted ml-1">s</span>
      </span>
    </p>
  );
}
