"use client";

import type { ReactNode } from "react";
import { linkWhatsApp } from "@/content/sitio";
import { registrarClicWhatsApp } from "@/lib/analitica";

type Props = {
  /** El mensaje que va precargado. Cada sección manda el suyo. */
  mensaje: string;
  /** Desde dónde se tocó. Viaja como propiedad del evento. */
  origen: string;
  children: ReactNode;
  className?: string;
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
  "aria-label": etiqueta,
}: Props) {
  return (
    <a
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
