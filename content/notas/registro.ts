import type { ComponentType } from "react";
import QueTareasAutomatizar from "./que-tareas-conviene-automatizar-primero.mdx";

export type Nota = {
  slug: string;
  titulo: string;
  /** Lo que se lee en el listado y lo que ve Google. Una o dos frases. */
  descripcion: string;
  /** Formato ISO, `AAAA-MM-DD`. De acá sale el `datetime` del `<time>`. */
  fecha: string;
  /**
   * Un borrador no aparece en el listado, ni en el sitemap, ni se indexa,
   * pero su dirección funciona para poder leerlo y pasárselo a alguien.
   * Publicarlo es borrar esta línea.
   */
  borrador?: boolean;
  /** El cuerpo, importado del `.mdx`. */
  Cuerpo: ComponentType;
};

/**
 * Las notas.
 *
 * Los cuerpos se importan de forma estática y no con un `import()` armado con
 * el slug: el sitio se compila entero al publicar y un import dinámico con
 * una ruta variable obliga al empaquetador a adivinar qué archivos incluir.
 * Agregar una nota son dos líneas —el import de arriba y la entrada acá— y el
 * listado, el sitemap y la página se actualizan solos.
 *
 * `/notas` todavía no está en el menú, a propósito: con una sola nota y en
 * borrador, una sección de notas vacía dice más de lo que conviene. Se agrega
 * a `navegacion.enlaces` en `content/textos.ts` cuando haya dos o tres
 * publicadas.
 */
export const notas: readonly Nota[] = [
  {
    slug: "que-tareas-conviene-automatizar-primero",
    titulo: "Qué tareas conviene automatizar primero",
    descripcion:
      "Las tres condiciones que tiene que cumplir una tarea para que valga la pena automatizarla, por qué lo que más molesta casi nunca es lo que más horas consume, y cómo armar la lista sin contratar a nadie.",
    fecha: "2026-09-22",
    borrador: true,
    Cuerpo: QueTareasAutomatizar,
  },
];

/** Las publicadas. Es lo único que aparece en el listado y en el sitemap. */
export const notasPublicadas = notas.filter((nota) => !nota.borrador);

export function notaPorSlug(slug: string): Nota | undefined {
  return notas.find((nota) => nota.slug === slug);
}

export const slugsDeNota = notas.map((nota) => nota.slug);
