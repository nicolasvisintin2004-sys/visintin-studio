import type { Metadata } from "next";
import Link, { type LinkProps } from "next/link";
import { Cabecera } from "@/components/cabecera";
import { Cierre } from "@/components/cierre";
import { Metricas } from "@/components/metricas";
import { Revelado } from "@/components/revelado";
import { obtenerProyectos } from "@/content/proyectos";
import { seccion, textos } from "@/content/textos";
import {
  alternativas,
  esIdioma,
  mismoCamino,
  ruta as construirRuta,
} from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/trabajo">): Promise<Metadata> {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return {};

  return {
    title: textos.paginaTrabajo.eyebrow[idioma],
    description: textos.paginaTrabajo.metaDescripcion[idioma],
    alternates: alternativas(idioma, mismoCamino("/trabajo")),
  };
}

export default async function Trabajo({
  params,
}: PageProps<"/[idioma]/trabajo">) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return null;

  const txt = seccion(textos.paginaTrabajo, idioma);
  const comun = seccion(textos.comun, idioma);
  const proyectos = obtenerProyectos(idioma);

  return (
    <>
      <Cabecera
        idioma={idioma}
        etiqueta={txt.eyebrow}
        titulo={txt.titulo}
        bajada={txt.bajada}
        migas={[{ camino: "/trabajo", texto: txt.eyebrow }]}
      />

      <section data-surface="dark" className="bg-surface py-10 md:py-14">
        <div className="contenedor space-y-8">
          {proyectos.map((proyecto) => {
            const enlace = construirRuta(
              idioma,
              `/trabajo/${proyecto.slug}`,
            ) as LinkProps["href"];

            return (
              <Revelado key={proyecto.slug} className="grilla gap-y-4">
                <div className="col-span-12 md:col-span-7">
                  <Link
                    href={enlace}
                    className="border-line bg-raised hover:border-line-strong group block aspect-16/10 overflow-hidden border transition-colors"
                  >
                    <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none">
                      <span className="etiqueta">{comun.capturaPendiente}</span>
                    </div>
                  </Link>
                </div>

                <div className="col-span-12 md:col-span-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-display-m condensada text-fg">
                      <Link href={enlace} className="subrayado">
                        {proyecto.nombre}
                      </Link>
                    </h2>
                    <span className="etiqueta border-line-strong border px-1 py-0.5">
                      {proyecto.estado === "en-desarrollo"
                        ? comun.enDesarrollo
                        : comun.entregado}
                    </span>
                  </div>

                  <p className="etiqueta mt-1">
                    {proyecto.rubro} · {proyecto.anio}
                  </p>

                  <p className="text-body text-fg-muted mt-2">
                    {proyecto.resumen}
                  </p>

                  <div className="mt-4">
                    <Metricas medicion={proyecto.medicion} idioma={idioma} />
                  </div>
                </div>
              </Revelado>
            );
          })}
        </div>
      </section>

      <section className="contenedor py-8 md:py-12">
        <p className="etiqueta">{txt.queSigue}</p>
        <p className="text-body-l text-fg-muted medida mt-2">
          {txt.queSigueTexto}
        </p>
      </section>

      <Cierre idioma={idioma} titulo={txt.cierre} />
    </>
  );
}
