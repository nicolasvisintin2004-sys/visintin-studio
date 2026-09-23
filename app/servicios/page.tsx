import type { Metadata } from "next";
import { Pedidos } from "@/components/pedidos";
import { Servicios } from "@/components/servicios";
import { SiguientePagina } from "@/components/siguiente-pagina";
import { paginas } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = metadatosDePagina({
  ruta: "/servicios",
  ...paginas.servicios,
});

export default function PaginaServicios() {
  return (
    <main id="contenido">
      {/* Los entregables se arman acá, del lado del servidor, y llegan a
          Servicios —que es de cliente— ya renderizados. */}
      <Servicios pedidos={<Pedidos />} />
      <SiguientePagina actual="/servicios" />
    </main>
  );
}
