"use client";

import type { ReactNode } from "react";
import { useMagnetico } from "@/hooks/use-magnetico";
import { linkWhatsApp } from "@/content/sitio";
import { registrarClicWhatsApp } from "@/lib/analitica";

type Props = {
  /** El mensaje que va precargado. Cada sección manda el suyo. */
  mensaje: string;
  /** Desde dónde se tocó. Viaja como propiedad del evento. */
  origen: string;
  children: ReactNode;
  className?: string;
  /**
   * Hace que el botón se corra hacia el cursor cuando se le acerca.
   *
   * Va nada más en el botón principal de cada página que tiene uno: el hero y
   * el cierre del inicio, y la tarjeta de WhatsApp de contacto. Puesto en
   * todos los enlaces a WhatsApp del sitio, el gesto dejaría de señalar cuál
   * es el importante.
   */
  magnetico?: boolean;
  /** Para lectores de pantalla, cuando el texto visible no alcanza. */
  "aria-label"?: string;
};

/**
 * El único camino a WhatsApp en todo el sitio.
 *
 * Centralizarlo tiene dos motivos: el mensaje precargado siempre sale del
 * archivo de contenido y no de un `href` escrito a mano, y todos los clics
 * se miden sin que haya que acordarse de agregar la llamada en cada botón.
 */
export function EnlaceWhatsApp({
  mensaje,
  origen,
  children,
  className,
  magnetico = false,
  "aria-label": etiqueta,
}: Props) {
  // El hook se llama siempre —las reglas de los hooks no admiten otra cosa— y
  // el ref se cuelga sólo si se pidió el efecto.
  const ref = useMagnetico<HTMLAnchorElement>();

  return (
    <a
      ref={magnetico ? ref : undefined}
      href={linkWhatsApp(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={etiqueta}
      onClick={() => registrarClicWhatsApp(origen)}
    >
      {children}
    </a>
  );
}
