"use client";

/**
 * Los parámetros de campaña.
 *
 * Existen para una sola cosa: poder mandar un enlace en un mensaje de
 * prospección, en una historia de Instagram o en un anuncio, y después saber
 * cuál de los tres trajo la consulta. Sin esto, todas las consultas del
 * formulario se ven iguales en la lista y no hay forma de saber qué sirvió.
 *
 * Se leen de la dirección al aterrizar y se guardan en `sessionStorage`. Ese
 * guardado es el punto: quien entra por /diagnostico?utm_source=instagram y
 * después navega a Servicios y vuelve, pierde los parámetros de la dirección
 * pero no de la sesión, así que el formulario los envía igual. Duran lo que
 * dura la pestaña, que es el tiempo que dura la visita.
 */

export type Utm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

const CLAVE = "vs_utm";
const PARAMETROS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/** Recorta y limita: lo que entra por la dirección lo escribe cualquiera. */
function limpiar(valor: string): string {
  return valor.trim().slice(0, 120);
}

/**
 * Lee la dirección actual y, si trae parámetros de campaña, los guarda.
 *
 * Se llama una vez por carga desde el layout. Una visita sin parámetros no
 * borra los que ya había: si alguien llegó por un anuncio y después entró de
 * nuevo por el historial, la consulta sigue siendo del anuncio.
 */
export function guardarUtm(): void {
  if (typeof window === "undefined") return;

  try {
    const busqueda = new URLSearchParams(window.location.search);
    const encontrados: Utm = {};

    for (const parametro of PARAMETROS) {
      const valor = busqueda.get(parametro);
      if (valor) encontrados[parametro] = limpiar(valor);
    }

    if (Object.keys(encontrados).length === 0) return;
    window.sessionStorage.setItem(CLAVE, JSON.stringify(encontrados));
  } catch {
    // sessionStorage puede no existir —modo privado, cookies bloqueadas— y
    // eso no puede romper la página. Sin campaña, la consulta llega igual.
  }
}

/** Lo guardado en esta sesión. Un objeto vacío si no hay nada o falló. */
export function leerUtm(): Utm {
  if (typeof window === "undefined") return {};

  try {
    const crudo = window.sessionStorage.getItem(CLAVE);
    if (!crudo) return {};

    const dato: unknown = JSON.parse(crudo);
    if (typeof dato !== "object" || dato === null) return {};

    const limpio: Utm = {};
    for (const parametro of PARAMETROS) {
      const valor = (dato as Record<string, unknown>)[parametro];
      if (typeof valor === "string" && valor) limpio[parametro] = limpiar(valor);
    }
    return limpio;
  } catch {
    return {};
  }
}
