"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Lee una media query y se mantiene al día si cambia.
 *
 * Va con `useSyncExternalStore` y no con un `useEffect` que llame a
 * `setState`: `matchMedia` es exactamente lo que este hook de React está
 * hecho para leer —una fuente de verdad que vive fuera de React— y así no hay
 * un render de más en el montaje.
 *
 * El valor del servidor es siempre `false`. Es la respuesta correcta para un
 * sitio estático: en el HTML que se genera al compilar no hay pantalla, ni
 * puntero, ni preferencias, y conviene que lo que salga de ahí sea la versión
 * más sencilla, que después el cliente mejora si corresponde.
 */
export function useConsultaMedios(consulta: string): boolean {
  const suscribir = useCallback(
    (avisar: () => void) => {
      const lista = window.matchMedia(consulta);
      lista.addEventListener("change", avisar);
      return () => lista.removeEventListener("change", avisar);
    },
    [consulta],
  );

  const leer = useCallback(() => window.matchMedia(consulta).matches, [consulta]);

  return useSyncExternalStore(suscribir, leer, () => false);
}
