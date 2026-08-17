"use client";

import { useEffect, useRef, useState } from "react";
import { textos } from "@/content/textos";
import type { Idioma } from "@/lib/i18n";
import type { Medicion, Metrica } from "@/lib/tipos";

/** Formateo determinista: nada de toLocaleString, para que servidor y cliente coincidan. */
function formatear(valor: number, decimales: number): string {
  return valor.toFixed(decimales).replace(".", ",");
}

function fechaCorta(iso: string): string {
  const [anio, mes, dia] = iso.split("-");
  return `${dia}.${mes}.${anio}`;
}

const DURACION = 900;

function Numero({
  metrica,
  retraso,
  idioma,
}: {
  metrica: Metrica;
  retraso: number;
  idioma: Idioma;
}) {
  const final = metrica.valor ?? 0;
  const textoFinal = formatear(final, metrica.decimales);

  // Arranca en el valor final: eso es lo que se sirve en el HTML.
  // Sin JS, con un crawler o con reduced-motion, el número correcto ya está.
  const [mostrado, setMostrado] = useState(final);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || metrica.valor === null) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setMostrado(0);

    let cuadro = 0;
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          observador.disconnect();

          const inicio = performance.now() + retraso;
          const animar = (ahora: number) => {
            const t = Math.min(Math.max((ahora - inicio) / DURACION, 0), 1);
            const suavizado = 1 - Math.pow(1 - t, 3);
            setMostrado(final * suavizado);
            if (t < 1) cuadro = requestAnimationFrame(animar);
          };
          cuadro = requestAnimationFrame(animar);
        }
      },
      { threshold: 0.4 },
    );

    observador.observe(el);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, [final, retraso, metrica.valor]);

  if (metrica.valor === null) {
    return (
      <span className="etiqueta block pt-2">
        {textos.metricas.sinDatos[idioma]}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className="font-display text-display-m condensada block text-fg"
    >
      {/* El ancho del valor final queda reservado desde el primer cuadro, y
          va en el span del número (no en el contenedor, que además lleva la
          unidad y ya es más ancho). Un contador que crece de 0 a 85 mueve el
          layout dos veces, justo en el bloque que dice que el CLS es 0,00. */}
      <span
        aria-hidden="true"
        className="inline-block"
        style={{
          fontVariantNumeric: "tabular-nums",
          minWidth: `${textoFinal.length}ch`,
        }}
      >
        {formatear(mostrado, metrica.decimales)}
      </span>
      <span className="sr-only">{textoFinal}</span>
      {metrica.unidad ? (
        <span className="font-mono text-small ml-1 align-baseline text-fg-muted">
          {metrica.unidad}
        </span>
      ) : null}
    </span>
  );
}

export function Metricas({
  medicion,
  idioma,
}: {
  medicion: Medicion;
  idioma: Idioma;
}) {
  return (
    // Un <dl> solo admite dt/dd (o divs que los envuelvan): la cabecera y
    // la nota de procedencia van fuera de la lista, no adentro.
    <div className="border-line border-t">
      <div className="border-line flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 border-b py-1.5">
        <span className="etiqueta">{textos.metricas.titulo[idioma]}</span>
        <span className="etiqueta">
          {medicion.herramienta} · {medicion.dispositivo} ·{" "}
          {fechaCorta(medicion.medidoEl)}
        </span>
      </div>

      <dl className="divide-line grid grid-cols-3 divide-x">
        {medicion.metricas.map((metrica, i) => (
          <div key={metrica.clave} className="px-2 py-2 first:pl-0 last:pr-0">
            <dt className="etiqueta">{metrica.etiqueta}</dt>
            <dd className="mt-1">
              <Numero metrica={metrica} retraso={i * 60} idioma={idioma} />
            </dd>
          </div>
        ))}
      </dl>

      <p className="etiqueta border-line border-t pt-1.5 normal-case">
        {medicion.entorno}
      </p>
    </div>
  );
}
