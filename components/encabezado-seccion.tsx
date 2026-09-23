import type { ReactNode } from "react";
import { Revelado } from "@/components/revelado";
import { TituloRevelado } from "@/components/titulo-revelado";

type Props = {
  /** El renglón en mono que va arriba del título. Opcional. */
  etiqueta?: string;
  titulo: string;
  /** El párrafo de abajo. Puede ser texto o nodos, para casos con enlaces. */
  bajada?: ReactNode;
  /** El nivel del encabezado. Sin valor por defecto: se decide por página. */
  nivel: "h1" | "h2";
  /** Clases extra del título, casi siempre un `max-w-[Nch]`. */
  claseTitulo?: string;
  /** Pinta la etiqueta de bronce. Va en los bloques con borde de acento. */
  acento?: boolean;
};

/**
 * El encabezado de una sección: etiqueta, título y bajada.
 *
 * Existe por dos motivos. El primero es que este bloque estaba escrito casi
 * igual en catorce lugares, con diferencias mínimas y accidentales entre
 * ellos —un `mb-6` acá, un `mt-8` allá— que nadie había decidido.
 *
 * El segundo es el movimiento. El título entra línea por línea con
 * `TituloRevelado`, y para eso tiene que estar FUERA del `Revelado` que mueve
 * la etiqueta y la bajada: si estuviera adentro, se le sumarían el
 * desplazamiento y el desenfoque del padre a la máscara de cada renglón, y el
 * resultado sería dos animaciones peleándose sobre el mismo texto.
 *
 * El escalonado es el de un encabezado bien hecho: primero la etiqueta, a los
 * 60 ms empiezan a subir las líneas del título una tras otra, y la bajada
 * entra última. Se lee de arriba hacia abajo, que es como se lee.
 */
export function EncabezadoSeccion({
  etiqueta,
  titulo,
  bajada,
  nivel,
  claseTitulo = "",
  acento = false,
}: Props) {
  return (
    <>
      {etiqueta && (
        <Revelado>
          <p className={`t-etiqueta mb-6 ${acento ? "text-acento" : ""}`}>{etiqueta}</p>
        </Revelado>
      )}

      <TituloRevelado as={nivel} className={`t-titulo ${claseTitulo}`} retardo={60}>
        {titulo}
      </TituloRevelado>

      {bajada && (
        <Revelado retardo={140}>
          <p className="t-cuerpo mt-8">{bajada}</p>
        </Revelado>
      )}
    </>
  );
}
