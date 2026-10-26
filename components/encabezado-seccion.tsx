import type { ReactNode } from "react";

type Props = {
  titulo: string;
  /** El párrafo de abajo. Puede ser texto o nodos, para casos con enlaces. */
  bajada?: ReactNode;
  /** El nivel del encabezado. Sin valor por defecto: se decide por página. */
  nivel: "h1" | "h2";
  /** Clases extra del título, casi siempre un `max-w-[Nch]`. */
  claseTitulo?: string;
};

/**
 * El encabezado de una sección: título y bajada.
 *
 * Existe porque este bloque estaba escrito casi igual en catorce lugares, con
 * diferencias mínimas y accidentales entre ellos —un `mb-6` acá, un `mt-8`
 * allá— que nadie había decidido.
 *
 * Ya no lleva la etiqueta en mayúsculas espaciadas que iba arriba de cada
 * título, ni entra línea por línea al bajar. Las dos cosas estaban en todas
 * las secciones del sitio, y repetidas en todas dejan de decir algo: la
 * etiqueta casi siempre repetía el menú —"Servicios" arriba de la página de
 * servicios— y la entrada animada en cada bloque es justo lo que hace que un
 * sitio se lea como plantilla. El movimiento quedó concentrado en un solo
 * lugar, la portada, y el título de cada sección se lee de una vez.
 */
export function EncabezadoSeccion({ titulo, bajada, nivel: Encabezado, claseTitulo = "" }: Props) {
  return (
    <>
      <Encabezado className={`t-titulo ${claseTitulo}`}>{titulo}</Encabezado>
      {bajada && <p className="t-cuerpo mt-8">{bajada}</p>}
    </>
  );
}
