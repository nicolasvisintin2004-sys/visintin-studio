import type { MetadataRoute } from "next";
import { obtenerNotas } from "@/content/notas/registro";
import { slugsDeProyecto } from "@/content/proyectos";
import { idiomas, ruta, type Idioma } from "@/lib/i18n";
import { sitio } from "@/lib/sitio";

const fijas = [
  { camino: "", prioridad: 1, frecuencia: "monthly" },
  { camino: "/trabajo", prioridad: 0.9, frecuencia: "monthly" },
  { camino: "/planes", prioridad: 0.9, frecuencia: "monthly" },
  { camino: "/estudio", prioridad: 0.7, frecuencia: "yearly" },
  { camino: "/notas", prioridad: 0.7, frecuencia: "weekly" },
  { camino: "/contacto", prioridad: 0.6, frecuencia: "yearly" },
] as const;

/**
 * Cada entrada lleva sus alternativas de idioma. Sin eso, Google puede
 * indexar las dos versiones como contenido duplicado en vez de como el
 * mismo contenido en dos idiomas.
 */
function alternativas(caminoPorIdioma: Record<Idioma, string>) {
  return {
    languages: {
      "es-AR": `${sitio.url}${ruta("es", caminoPorIdioma.es)}`,
      en: `${sitio.url}${ruta("en", caminoPorIdioma.en)}`,
    },
  };
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const entradas: MetadataRoute.Sitemap = [];

  for (const idioma of idiomas) {
    for (const { camino, prioridad, frecuencia } of fijas) {
      entradas.push({
        url: `${sitio.url}${ruta(idioma, camino)}`,
        lastModified: ahora,
        changeFrequency: frecuencia,
        priority: prioridad,
        alternates: alternativas({ es: camino, en: camino }),
      });
    }

    for (const slug of slugsDeProyecto) {
      entradas.push({
        url: `${sitio.url}${ruta(idioma, `/trabajo/${slug}`)}`,
        lastModified: ahora,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternativas({
          es: `/trabajo/${slug}`,
          en: `/trabajo/${slug}`,
        }),
      });
    }

    // Las notas tienen slug propio por idioma.
    for (const nota of obtenerNotas(idioma)) {
      const otro = idioma === "es" ? "en" : "es";
      const equivalente = obtenerNotas(otro).find(
        (n) => n.fecha === nota.fecha,
      );

      entradas.push({
        url: `${sitio.url}${ruta(idioma, `/notas/${nota.slug}`)}`,
        lastModified: new Date(nota.fecha),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: alternativas(
          idioma === "es"
            ? {
                es: `/notas/${nota.slug}`,
                en: `/notas/${equivalente?.slug ?? nota.slug}`,
              }
            : {
                es: `/notas/${equivalente?.slug ?? nota.slug}`,
                en: `/notas/${nota.slug}`,
              },
        ),
      });
    }
  }

  return entradas;
}
