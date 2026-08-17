import type { ReactNode } from "react";
import { Migas, type Miga } from "@/components/migas";
import type { Idioma } from "@/lib/i18n";

/**
 * Cabecera de página interna. Un solo <h1> por página sale de acá,
 * así que la jerarquía no se puede romper por descuido.
 */
export function Cabecera({
  idioma,
  etiqueta,
  titulo,
  bajada,
  migas,
  children,
}: {
  idioma: Idioma;
  etiqueta: string;
  titulo: string;
  bajada?: string;
  migas?: Miga[];
  children?: ReactNode;
}) {
  return (
    <section className="contenedor pt-6 pb-8 md:pt-8 md:pb-12">
      {migas ? <Migas ruta={migas} idioma={idioma} /> : null}

      <p className={`etiqueta ${migas ? "mt-3" : ""}`}>{etiqueta}</p>

      <h1 className="font-display text-display-l condensada text-fg mt-2 max-w-[24ch] text-balance">
        {titulo}
      </h1>

      {bajada ? (
        <p className="text-body-l text-fg-muted medida mt-3">{bajada}</p>
      ) : null}

      {children}
    </section>
  );
}
