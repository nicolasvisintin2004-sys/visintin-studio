import type { Metadata } from "next";
import Link, { type LinkProps } from "next/link";
import { Cabecera } from "@/components/cabecera";
import { Cierre } from "@/components/cierre";
import { Revelado } from "@/components/revelado";
import { formatearFecha, obtenerNotas } from "@/content/notas/registro";
import { seccion, textos } from "@/content/textos";
import {
  alternativas,
  esIdioma,
  mismoCamino,
  ruta as construirRuta,
} from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/notas">): Promise<Metadata> {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return {};

  return {
    title: textos.paginaNotas.eyebrow[idioma],
    description: textos.paginaNotas.metaDescripcion[idioma],
    alternates: alternativas(idioma, mismoCamino("/notas")),
  };
}

export default async function Notas({ params }: PageProps<"/[idioma]/notas">) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return null;

  const txt = seccion(textos.paginaNotas, idioma);
  const comun = seccion(textos.comun, idioma);
  const notas = obtenerNotas(idioma);

  return (
    <>
      <Cabecera
        idioma={idioma}
        etiqueta={txt.eyebrow}
        titulo={txt.titulo}
        bajada={txt.bajada}
        migas={[{ camino: "/notas", texto: txt.eyebrow }]}
      />

      <section className="contenedor pb-8 md:pb-12">
        <ul className="border-line border-t">
          {notas.map((nota, i) => (
            <Revelado
              key={nota.slug}
              como="li"
              retraso={i * 60}
              className="border-line border-b"
            >
              <Link
                href={
                  construirRuta(
                    idioma,
                    `/notas/${nota.slug}`,
                  ) as LinkProps["href"]
                }
                className="group grilla items-baseline gap-y-1 py-3"
              >
                <div className="col-span-12 flex flex-wrap gap-x-2 md:col-span-3">
                  <span className="etiqueta">
                    {formatearFecha(nota.fecha, idioma)}
                  </span>
                  <span className="etiqueta">
                    {nota.tiempoLectura} {comun.minLectura}
                  </span>
                </div>

                <div className="col-span-12 md:col-span-8 md:col-start-5">
                  <h2 className="font-display text-heading text-fg group-hover:underline group-hover:underline-offset-4">
                    {nota.titulo}
                  </h2>
                  <p className="text-body text-fg-muted medida mt-1">
                    {nota.bajada}
                  </p>
                </div>
              </Link>
            </Revelado>
          ))}
        </ul>
      </section>

      <Cierre idioma={idioma} titulo={txt.cierre} />
    </>
  );
}
