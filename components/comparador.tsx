"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { textos } from "@/content/textos";
import type { Idioma } from "@/lib/i18n";
import type { Imagen } from "@/lib/tipos";

type Props = {
  idioma: Idioma;
  antes?: Imagen;
  despues?: Imagen;
  /** Fuera del primer viewport se carga diferido; en el hero, con prioridad. */
  prioridad?: boolean;
};

const PASO = 2;
const PASO_GRANDE = 10;

/**
 * Comparador de dos imágenes con divisor arrastrable.
 *
 * Sin librerías: eventos de puntero y estado local. Degrada en dos pasos —
 * sin imagen "antes" muestra sola la captura final; sin "después" no
 * renderiza nada.
 */
export function Comparador({ idioma, antes, despues, prioridad = false }: Props) {
  const txt = textos.caso;
  const [posicion, setPosicion] = useState(50);
  const marco = useRef<HTMLDivElement>(null);
  const arrastrando = useRef(false);

  const actualizar = useCallback((clienteX: number) => {
    const nodo = marco.current;
    if (!nodo) return;
    const caja = nodo.getBoundingClientRect();
    if (caja.width === 0) return;
    const relativo = ((clienteX - caja.left) / caja.width) * 100;
    setPosicion(Math.min(Math.max(relativo, 0), 100));
  }, []);

  if (!despues) return null;

  // Sin el "antes" no hay nada que comparar: se muestra la captura final.
  if (!antes) {
    return (
      <figure>
        <Image
          src={despues.src}
          alt={despues.alt}
          width={despues.ancho}
          height={despues.alto}
          sizes="(min-width: 768px) 1200px, 100vw"
          priority={prioridad}
          className="border-line h-auto w-full border"
        />
        <figcaption className="etiqueta mt-1.5">{txt.sitioNuevo[idioma]}</figcaption>
      </figure>
    );
  }

  const alTeclear = (e: KeyboardEvent<HTMLDivElement>) => {
    const salto = e.shiftKey ? PASO_GRANDE : PASO;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosicion((p) => Math.max(p - salto, 0));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosicion((p) => Math.min(p + salto, 100));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosicion(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosicion(100);
    }
  };

  return (
    <figure>
      <div
        ref={marco}
        className="border-line relative touch-none overflow-hidden border select-none"
        style={{ aspectRatio: `${despues.ancho} / ${despues.alto}` }}
        onPointerDown={(e) => {
          arrastrando.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          actualizar(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!arrastrando.current) return;
          actualizar(e.clientX);
        }}
        onPointerUp={(e) => {
          arrastrando.current = false;
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={() => {
          arrastrando.current = false;
        }}
      >
        {/* Después: capa de fondo, completa */}
        <Image
          src={despues.src}
          alt={despues.alt}
          width={despues.ancho}
          height={despues.alto}
          sizes="(min-width: 768px) 1200px, 100vw"
          priority={prioridad}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Antes: misma caja que la de abajo, recortada desde la derecha.
            Con clip-path y no con un contenedor angosto: así la imagen no
            se deforma ni hace falta medir el ancho del marco en JS. */}
        <Image
          src={antes.src}
          alt={antes.alt}
          width={antes.ancho}
          height={antes.alto}
          sizes="(min-width: 768px) 1200px, 100vw"
          priority={prioridad}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - posicion}% 0 0)` }}
        />

        <span className="etiqueta bg-surface text-fg absolute top-2 left-2 px-1 py-0.5">
          {txt.antes[idioma]}
        </span>
        <span className="etiqueta bg-surface text-fg absolute top-2 right-2 px-1 py-0.5">
          {txt.despues[idioma]}
        </span>

        {/* Divisor + manijo */}
        <div
          role="slider"
          tabIndex={0}
          aria-label={txt.comparadorAria[idioma]}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(posicion)}
          aria-valuetext={`${Math.round(posicion)}%`}
          onKeyDown={alTeclear}
          className="bg-fog absolute inset-y-0 w-px cursor-ew-resize"
          style={{ left: `${posicion}%` }}
        >
          <span className="border-fog bg-surface absolute top-1/2 left-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border">
            <span aria-hidden="true" className="text-fg font-mono text-[10px]">
              ↔
            </span>
          </span>
        </div>
      </div>

      <figcaption className="etiqueta mt-1.5">
        {txt.comparadorAyuda[idioma]}
      </figcaption>
    </figure>
  );
}
