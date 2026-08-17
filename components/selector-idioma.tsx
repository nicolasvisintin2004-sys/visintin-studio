"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { registrarEvento } from "@/lib/analitica";
import { rutaEnIdioma } from "@/content/indice";
import { idiomas, nombreIdioma, type Idioma } from "@/lib/i18n";

/**
 * Selector ES / EN.
 *
 * Son enlaces reales, no botones con estado: cambiar de idioma cambia la
 * URL, así que la elección sobrevive a recargar, compartir el link y —lo
 * que importa acá— al robot de Google, que necesita dos direcciones
 * distintas para indexar las dos versiones.
 *
 * Conserva la página actual: desde /es/planes se va a /en/planes.
 */
export function SelectorIdioma({ idioma }: { idioma: Idioma }) {
  const ruta = usePathname();

  return (
    <div className="border-line flex items-center rounded-md border">
      {idiomas.map((opcion, i) => {
        const activo = opcion === idioma;
        return (
          <Link
            key={opcion}
            href={rutaEnIdioma(ruta, opcion) as LinkProps["href"]}
            hrefLang={opcion}
            aria-current={activo ? "true" : undefined}
            aria-label={nombreIdioma[opcion]}
            onClick={() => {
              if (!activo) registrarEvento("cambio_idioma", { a: opcion, ruta });
            }}
            className={`etiqueta px-1 py-0.5 transition-colors ${
              activo ? "bg-fg text-surface" : "text-fg-muted hover:text-fg"
            } ${i === 0 ? "rounded-l-[3px]" : "rounded-r-[3px]"}`}
          >
            {opcion}
          </Link>
        );
      })}
    </div>
  );
}
