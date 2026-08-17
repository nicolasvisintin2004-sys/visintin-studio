"use client";

import type { ReactNode } from "react";
import { clasesBoton } from "@/components/boton";
import { useWhatsAppLink } from "@/hooks/use-whatsapp";
import { registrarEvento } from "@/lib/analitica";
import { linkWhatsApp } from "@/lib/sitio";

type Props = {
  /**
   * Mensaje exacto, cuando la página conoce el contexto (un plan, el
   * resultado de la calculadora, un caso). Si no viene, se arma solo a
   * partir de la ruta.
   */
  mensaje?: string;
  /** Identifica el punto del sitio en la analítica. */
  origen: string;
  variante?: "primario" | "secundario" | "enlace";
  className?: string;
  children: ReactNode;
};

export function BotonWhatsApp({
  mensaje,
  origen,
  variante = "primario",
  className = "",
  children,
}: Props) {
  const porRuta = useWhatsAppLink();
  const href = mensaje ? linkWhatsApp(mensaje) : porRuta.href;

  const alHacerClic = () => {
    if (mensaje) {
      registrarEvento("clic_whatsapp", { origen });
    } else {
      porRuta.alHacerClic(origen);
    }
  };

  const clases =
    variante === "enlace"
      ? `subrayado inline-flex items-baseline gap-0.5 text-small font-medium text-fg ${className}`
      : clasesBoton(variante, className);

  return (
    <a
      href={href}
      onClick={alHacerClic}
      className={clases}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      {variante === "enlace" ? <span aria-hidden="true">→</span> : null}
    </a>
  );
}
