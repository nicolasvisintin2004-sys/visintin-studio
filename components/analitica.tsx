"use client";

import { useEffect } from "react";
import { prepararAnalitica } from "@/lib/analitica";

/**
 * Enciende la analítica. No dibuja nada.
 *
 * Existe como componente porque el layout es del servidor y la carga diferida
 * de Google Analytics necesita `window`. Si no hay identificador configurado,
 * `prepararAnalitica` no hace absolutamente nada.
 */
export function Analitica() {
  useEffect(() => {
    prepararAnalitica();
  }, []);

  return null;
}
