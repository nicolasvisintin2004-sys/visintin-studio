import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { botonTexto, Flecha } from "@/components/boton";
import { DatosEstructurados } from "@/components/datos-estructurados";
import { Revelado } from "@/components/revelado";
import { notaPorSlug, slugsDeNota } from "@/content/notas/registro";
import { sitio } from "@/content/sitio";
import { notas as textos } from "@/content/textos";
import { fechaLegible, minutosDeLectura } from "@/lib/lectura";
import { metadatosDePagina } from "@/lib/metadatos";

/** Todas las notas se generan al compilar, incluidos los borradores. */
export function generateStaticParams() {
  return slugsDeNota.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const nota = notaPorSlug(slug);
  if (!nota) return {};

  return {
    ...metadatosDePagina({
      ruta: `/notas/${nota.slug}`,
      titulo: nota.titulo,
      descripcion: nota.descripcion,
      tipo: "article",
    }),
    // Un borrador tiene dirección para poder leerlo y pasárselo a alguien,
    // pero no entra en Google hasta que se publica.
    ...(nota.borrador && { robots: { index: false, follow: false } }),
  };
}

/**
 * Una nota.
 *
 * El cuerpo viene del `.mdx` como componente y se renderiza tal cual: los
 * estilos de cada etiqueta los pone `mdx-components.tsx`, así que el archivo
 * de contenido es Markdown y nada más, sin una sola clase adentro.
 */
export default async function PaginaDeNota({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const nota = notaPorSlug(slug);
  if (!nota) notFound();

  const minutos = await minutosDeLectura(nota.slug);
  const { Cuerpo } = nota;

  const articulo = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: nota.titulo,
    description: nota.descripcion,
    datePublished: nota.fecha,
    author: { "@type": "Person", name: sitio.autor },
    publisher: { "@id": `${sitio.url}/#negocio` },
    mainEntityOfPage: `${sitio.url}/notas/${nota.slug}`,
  };

  return (
    <>
      <main id="contenido">
        <article className="contenedor pb-24 pt-36 lg:pt-44">
          <header className="max-w-[26ch]">
            <p className="t-dato mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-suave">
              <time dateTime={nota.fecha}>{fechaLegible(nota.fecha)}</time>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span>
                {minutos} {textos.lectura}
              </span>
              {nota.borrador && (
                <span className="rounded-full border border-acento px-3 py-1 text-[0.6875rem] uppercase tracking-[0.12em] text-acento">
                  {textos.borrador}
                </span>
              )}
            </p>

            <h1 className="t-titulo">{nota.titulo}</h1>
          </header>

          <p className="t-bajada mt-10 max-w-[46ch]">{nota.descripcion}</p>

          <div className="mt-20 border-t border-borde pt-20">
            <Revelado>
              <Cuerpo />
            </Revelado>
          </div>
        </article>

        <nav className="contenedor border-t border-borde py-14">
          <Link href="/notas" className={botonTexto}>
            {textos.volver}
            <Flecha />
          </Link>
        </nav>
      </main>

      <DatosEstructurados datos={articulo} />
    </>
  );
}
