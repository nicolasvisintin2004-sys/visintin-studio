import type { Metadata } from "next";
import { Contacto } from "@/components/contacto";
import { paginas } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = metadatosDePagina({
  ruta: "/contacto",
  ...paginas.contacto,
});

/** Contacto es el final del recorrido: no lleva franja de página siguiente. */
export default function PaginaContacto() {
  return (
    <main id="contenido">
      <Contacto />
    </main>
  );
}
