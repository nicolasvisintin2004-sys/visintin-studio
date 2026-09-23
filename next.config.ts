import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Export estático: `next build` deja en `out/` un archivo HTML por ruta y
   * Netlify los sirve desde el CDN sin nada corriendo del otro lado. Es lo más
   * rápido que se puede servir y no depende de la versión del plugin de Next
   * que tenga Netlify instalada.
   *
   * La contracara es que no existen las rutas de API que leen el cuerpo de
   * una petición, así que el endpoint del formulario vive en
   * `netlify/functions/leads.mts` y no en `app/api/`. Está explicado ahí.
   */
  output: "export",

  /**
   * En export estático no hay servidor que optimice imágenes al vuelo, así que
   * `next/image` no puede convertir formatos. Las capturas del portfolio ya se
   * generan en AVIF y WebP con `herramientas/procesar-capturas.mjs`, y el
   * `<picture>` de cada una elige el formato en el navegador.
   */
  images: { unoptimized: true },

  /** Las notas se escriben en MDX y se importan como componentes. */
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

/**
 * MDX sin plugins de remark ni de rehype.
 *
 * Es deliberado: cada plugin agrega peso al build y, sobre todo, una forma
 * distinta de escribir que después hay que recordar. Las notas son texto con
 * títulos, listas y enlaces; para eso alcanza el Markdown de siempre. Los
 * estilos los pone `mdx-components.tsx`, con las mismas clases que el resto
 * del sitio.
 */
const conMDX = createMDX({});

export default conMDX(nextConfig);
