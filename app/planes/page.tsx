import type { Metadata } from "next";
import { ComoTrabajo } from "@/components/como-trabajo";
import { SiguientePagina } from "@/components/siguiente-pagina";
import { paginas } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = metadatosDePagina({
  ruta: "/planes",
  ...paginas.planes,
});

/**
 * Cómo trabajo.
 *
 * La dirección sigue siendo `/planes` aunque la página se llame "Cómo
 * trabajo": el sitio anterior ya tenía `/es/planes` redirigiendo acá y no
 * vale la pena encadenar otra mudanza por un nombre. La página igual explica
 * los planes; lo que cambió es que ahora los muestra dentro del mapa completo
 * en lugar de como si fueran todo lo que se puede contratar.
 */
export default function PaginaComoTrabajo() {
  return (
    <main id="contenido">
      <ComoTrabajo />
      <SiguientePagina actual="/planes" />
    </main>
  );
}
