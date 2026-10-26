import type { Metadata } from "next";
import Link from "next/link";
import { botonTexto } from "@/components/boton";
import { Pedidos } from "@/components/pedidos";
import { Servicios } from "@/components/servicios";
import { SiguientePagina } from "@/components/siguiente-pagina";
import { paginas } from "@/content/textos";
import { TURNOS_PUBLICADA, turnos } from "@/content/turnos";
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

      {/*
        El producto propio. Va acá y no en el menú: el menú es para PyMEs en
        general, y Visintin Turnos le sirve nada más a consultorios. Sólo
        aparece cuando la página ya se anuncia.
      */}
      {TURNOS_PUBLICADA && (
        <section className="contenedor pb-[var(--espacio-seccion)]">
          <div className="flex flex-col gap-6 rounded-lg border border-borde bg-superficie p-7 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div>
              <p className="t-etiqueta mb-3">Un producto propio</p>
              <p className="t-subtitulo">{turnos.etiqueta}</p>
              <p className="t-cuerpo mt-3 text-[0.9375rem]">
                Sistema de turnos para consultorios, con recordatorio por WhatsApp.
              </p>
            </div>
            <Link href="/turnos" className={`${botonTexto} shrink-0`}>
              Ver el producto            </Link>
          </div>
        </section>
      )}
      <SiguientePagina actual="/servicios" />
    </main>
  );
}
