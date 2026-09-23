import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";
import { SiguientePagina } from "@/components/siguiente-pagina";
import { paginas } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = metadatosDePagina({
  ruta: "/proyectos",
  ...paginas.proyectos,
});

export default function PaginaProyectos() {
  return (
    <main id="contenido">
      <Portfolio />
      <SiguientePagina actual="/proyectos" />
    </main>
  );
}
