import type { Idioma } from "@/lib/i18n";

/**
 * Índice liviano de slug → nombre legible.
 *
 * Existe para que el hook de WhatsApp pueda armar el mensaje contextual en
 * el cliente sin importar `content/notas/registro.ts`, que arrastra los
 * MDX enteros al paquete del navegador.
 */
export const nombrePorProyecto: Record<string, string> = {
  "garcia-ferrari-motorhomes": "García Ferrari",
};

/**
 * Slug de cada nota en los dos idiomas.
 *
 * Lo necesita el selector de idioma: cambiar solo el prefijo en
 * /en/notas/how-much... llevaría a /es/notas/how-much..., que no existe.
 */
export const slugsDeNota: Record<string, Record<Idioma, string>> = {
  "cuanto-cuesta-una-pagina-web-pyme-argentina": {
    es: "cuanto-cuesta-una-pagina-web-pyme-argentina",
    en: "how-much-does-a-website-cost-argentina",
  },
  "how-much-does-a-website-cost-argentina": {
    es: "cuanto-cuesta-una-pagina-web-pyme-argentina",
    en: "how-much-does-a-website-cost-argentina",
  },
};

/** Traduce una ruta completa al otro idioma, slugs incluidos. */
export function rutaEnIdioma(rutaActual: string, destino: Idioma): string {
  const partes = rutaActual.split("/").filter(Boolean);
  const resto = partes.slice(1);

  if (resto[0] === "notas" && resto[1]) {
    const equivalente = slugsDeNota[resto[1]]?.[destino];
    if (equivalente) resto[1] = equivalente;
  }

  return `/${[destino, ...resto].join("/")}`;
}

export const tituloPorNota: Record<string, Record<Idioma, string>> = {
  "cuanto-cuesta-una-pagina-web-pyme-argentina": {
    es: "cuánto cuesta una página web",
    en: "how much a website costs",
  },
  "how-much-does-a-website-cost-argentina": {
    es: "cuánto cuesta una página web",
    en: "how much a website costs",
  },
};
