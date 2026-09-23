"use client";

import { useEffect, useRef } from "react";
import { registrarEvento } from "@/lib/analitica";

type Props = {
  /** El nombre del evento: `view_diagnostico`, `view_caso`. */
  evento: string;
  /** Datos que acompañan al evento, por ejemplo el slug del caso. */
  datos?: Record<string, string>;
};

/**
 * Registra que alguien vio una página.
 *
 * Los proveedores ya cuentan las vistas por su cuenta, pero con el nombre de
 * la ruta. Esto agrega un evento con nombre propio, que es lo que permite
 * armar un embudo en el panel: cuántos vieron el diagnóstico contra cuántos
 * enviaron el formulario, sin tener que cruzar informes a mano.
 *
 * Se dispara una sola vez por montaje. El `ref` es necesario porque en
 * desarrollo React monta dos veces a propósito, y sin esto cada visita local
 * contaría doble.
 *
 * No renderiza nada y no tiene estado visible: si la medición está apagada o
 * el script no carga, la página es exactamente la misma.
 */
export function MedirVista({ evento, datos }: Props) {
  const registrado = useRef(false);

  useEffect(() => {
    if (registrado.current) return;
    registrado.current = true;
    registrarEvento(evento, datos);
  }, [evento, datos]);

  return null;
}
