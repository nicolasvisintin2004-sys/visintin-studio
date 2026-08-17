export const idiomas = ["es", "en"] as const;

export type Idioma = (typeof idiomas)[number];

export const idiomaPorDefecto: Idioma = "es";

/** Etiqueta del atributo `lang` y de los `hreflang`. */
export const etiquetaHtml: Record<Idioma, string> = {
  es: "es-AR",
  en: "en",
};

export const nombreIdioma: Record<Idioma, string> = {
  es: "Español",
  en: "English",
};

export function esIdioma(valor: string): valor is Idioma {
  return (idiomas as readonly string[]).includes(valor);
}

/** Texto que existe en los dos idiomas. */
export type Texto = Record<Idioma, string>;
/** readonly porque los diccionarios se declaran con `as const`. */
export type Lista = Record<Idioma, readonly string[]>;

export function t(texto: Texto, idioma: Idioma): string {
  return texto[idioma];
}

/** Antepone el prefijo de idioma a una ruta interna: "/planes" → "/en/planes". */
export function ruta(idioma: Idioma, camino = ""): string {
  return `/${idioma}${camino}`;
}

/**
 * Canonical + hreflang para una página.
 *
 * `caminos` lleva la ruta de cada idioma sin prefijo, porque hay páginas
 * cuyo slug cambia con el idioma (las notas). Para el resto alcanza con
 * pasar el mismo camino dos veces.
 */
export function alternativas(idioma: Idioma, caminos: Record<Idioma, string>) {
  return {
    canonical: ruta(idioma, caminos[idioma]),
    languages: {
      "es-AR": ruta("es", caminos.es),
      en: ruta("en", caminos.en),
      "x-default": ruta(idiomaPorDefecto, caminos[idiomaPorDefecto]),
    },
  };
}

/** Atajo para páginas cuyo camino es igual en los dos idiomas. */
export function mismoCamino(camino: string): Record<Idioma, string> {
  return { es: camino, en: camino };
}

/**
 * Cambia el prefijo de idioma conservando la página actual.
 * "/es/planes" + "en" → "/en/planes"
 */
export function cambiarIdiomaEnRuta(rutaActual: string, destino: Idioma): string {
  const partes = rutaActual.split("/").filter(Boolean);
  if (partes.length > 0 && esIdioma(partes[0])) {
    partes[0] = destino;
    return `/${partes.join("/")}`;
  }
  return `/${destino}${rutaActual === "/" ? "" : rutaActual}`;
}
