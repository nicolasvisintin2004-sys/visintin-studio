import type { MetadataRoute } from "next";
import { notasPublicadas } from "@/content/notas/registro";
import { slugsDeProyecto } from "@/content/proyectos";
import { sitio } from "@/content/sitio";
import { navegacion } from "@/content/textos";

/**
 * El sitemap.
 *
 * Las páginas salen de `navegacion.enlaces` y de `navegacion.destacado`, así
 * que una página nueva en el menú entra sola acá y no hay dos listas que
 * mantener de acuerdo. Lo mismo turnos: entra cuando entra al menú.
 *
 * Lo que está en borrador no entra: los proyectos sin terminar ya vienen
 * filtrados de `content/proyectos.ts`, y las notas se filtran acá con
 * `notasPublicadas`. Declarar en el sitemap una dirección que además está
 * marcada `noindex` es mandarle a Google dos señales opuestas.
 *
 * Con `output: "export"` no hay servidor que regenere nada, así que Next pide
 * declarar explícitamente que la ruta se resuelve una sola vez, al compilar.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();

  return [
    {
      url: sitio.url,
      lastModified: hoy,
      changeFrequency: "monthly",
      priority: 1,
    },
    // El menú, que ya incluye turnos cuando la página se anuncia, y
    // contacto. Mientras turnos no se anuncia está `noindex`, y declararla
    // acá sería mandarle a Google dos señales opuestas.
    ...[...navegacion.enlaces, navegacion.destacado].map(({ href }) => ({
      url: `${sitio.url}${href}`,
      lastModified: hoy,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      // El diagnóstico ya no está en el menú, pero la página sigue
      // existiendo como aterrizaje de prospección.
      url: `${sitio.url}/diagnostico`,
      lastModified: hoy,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...slugsDeProyecto.map((slug) => ({
      url: `${sitio.url}/proyectos/${slug}`,
      lastModified: hoy,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    // El listado de notas sólo entra cuando hay al menos una publicada.
    ...(notasPublicadas.length > 0
      ? [
          {
            url: `${sitio.url}/notas`,
            lastModified: hoy,
            changeFrequency: "weekly" as const,
            priority: 0.5,
          },
        ]
      : []),
    ...notasPublicadas.map((nota) => ({
      url: `${sitio.url}/notas/${nota.slug}`,
      lastModified: new Date(`${nota.fecha}T12:00:00`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
