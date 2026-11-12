import type { Metadata } from "next";
import { botonPrimario } from "@/components/boton";
import { Casos } from "@/components/casos";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { Planes } from "@/components/planes";
import { SiguientePagina } from "@/components/siguiente-pagina";
import { mensajes } from "@/content/sitio";
import { paginas, sitiosWeb as textos } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = metadatosDePagina({
  ruta: "/sitios-web",
  ...paginas.sitiosWeb,
});

/**
 * Sitios web.
 *
 * Reemplaza a /servicios y a /planes, que explicaban la misma oferta dos
 * veces y con vocabularios distintos. El orden es el de la decisión de quien
 * llega: qué es, pruebas de que se hizo, cuánto abarca cada alcance y qué
 * más se puede pedir. Termina en un solo botón.
 *
 * Las dos direcciones viejas redirigen acá desde `netlify.toml`.
 */
export default function PaginaSitiosWeb() {
  return (
    <main id="contenido">
      <div className="seccion">
        <div className="contenedor">
          <EncabezadoSeccion
            nivel="h1"
            titulo={textos.titulo}
            bajada={textos.bajada}
            claseTitulo="max-w-[18ch]"
          />
        </div>

        <Casos />

        {/* Trae su propio contenedor y su encabezado en `h2`. */}
        <Planes />

        <section className="contenedor pt-24 lg:pt-32" aria-labelledby="medida-titulo">
          <div className="grid gap-10 border-t border-borde pt-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pt-16">
            <div>
              <h2
                id="medida-titulo"
                className="t-titulo text-[clamp(1.875rem,4vw,3.25rem)]"
              >
                {textos.medidaTitulo}
              </h2>
              <p className="t-cuerpo mt-6">{textos.medidaBajada}</p>
            </div>

            <div>
              <ul className="flex flex-col gap-3.5">
                {textos.medida.map((item) => (
                  <li key={item} className="flex gap-3 text-[1rem] leading-relaxed text-suave">
                    <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-acento" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <EnlaceWhatsApp
                mensaje={mensajes.sitioWeb}
                origen="sitios_web_cierre"
                className={`${botonPrimario} mt-10`}
              >
                {textos.cierreAccion}
              </EnlaceWhatsApp>
            </div>
          </div>
        </section>
      </div>

      <SiguientePagina actual="/sitios-web" />
    </main>
  );
}
