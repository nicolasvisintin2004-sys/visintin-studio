import { track } from "@vercel/analytics";

type Propiedades = Record<string, string | number | boolean | null>;

/**
 * Envoltorio único de analítica. Todo el sitio registra por acá, así el
 * día que cambie el proveedor se toca un solo archivo.
 *
 * Vercel Analytics no usa cookies ni identificadores persistentes, así que
 * no hace falta banner de consentimiento. En desarrollo no envía nada.
 */
export function registrarEvento(nombre: string, propiedades?: Propiedades) {
  try {
    track(nombre, propiedades);
  } catch {
    // La analítica nunca puede romper una interacción del visitante.
  }
}
