import type { MetadataRoute } from "next";
import { sitio } from "@/content/sitio";

/**
 * Con `output: "export"` no hay servidor que regenere nada: Next exige
 * declarar explícitamente que esta ruta se resuelve una sola vez, al
 * compilar, y queda como archivo estático.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Las dos funciones del formulario. No están en el HTML exportado, así
      // que un rastreador no llega solo, pero decirlo acá también cubre el
      // caso de que alguien enlace la dirección desde afuera.
      disallow: "/api/",
    },
    sitemap: `${sitio.url}/sitemap.xml`,
  };
}
