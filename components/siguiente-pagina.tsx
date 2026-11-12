import Link from "next/link";
import { botonTexto } from "@/components/boton";
import { inicio, navegacion } from "@/content/textos";

type Props = {
  /** La ruta de la página actual. La siguiente sale del orden del menú. */
  actual: string;
};

/**
 * La franja al pie de cada página que lleva a la siguiente.
 *
 * Con el sitio partido en páginas, el que termina de leer una sección se
 * queda sin el scroll que antes lo llevaba a la próxima. Esta franja devuelve
 * ese recorrido: Sitios web lleva a Redes, Redes a Proyectos, y así en el
 * orden del menú hasta Contacto, que es el final y no la lleva.
 */
export function SiguientePagina({ actual }: Props) {
  const recorrido = [...navegacion.enlaces, navegacion.destacado];
  const indice = recorrido.findIndex((e) => e.href === actual);
  const siguiente = recorrido[indice + 1];
  if (indice === -1 || !siguiente) return null;

  return (
    <nav
      aria-label={navegacion.siguienteEtiqueta}
      className="contenedor flex flex-wrap items-baseline justify-between gap-6 border-t border-borde py-14"
    >
      <div>
        <p className="t-etiqueta mb-4">{navegacion.siguienteEtiqueta}</p>
        <p className="t-subtitulo">{siguiente.texto}</p>
        <p className="mt-2 text-[0.9375rem] text-suave">{inicio.indice[siguiente.href]}</p>
      </div>
      <Link href={siguiente.href} className={botonTexto}>
        {siguiente.texto}
      </Link>
    </nav>
  );
}
