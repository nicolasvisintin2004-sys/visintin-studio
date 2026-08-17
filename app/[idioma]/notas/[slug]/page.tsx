import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cierre } from "@/components/cierre";
import { Migas } from "@/components/migas";
import {
  formatearFecha,
  obtenerNota,
  slugEquivalente,
  todosLosSlugs,
} from "@/content/notas/registro";
import { seccion, textos } from "@/content/textos";
import { alternativas, esIdioma, etiquetaHtml, type Idioma } from "@/lib/i18n";
import { mensajes, sitio } from "@/lib/sitio";

export function generateStaticParams() {
  return todosLosSlugs.map(({ idioma, slug }) => ({ idioma, slug }));
}

/** El slug cambia con el idioma, así que los hreflang se arman por nota. */
function caminosDeNota(idioma: Idioma, slug: string) {
  const otro = idioma === "es" ? "en" : "es";
  const equivalente = slugEquivalente(slug, idioma, otro) ?? slug;
  return idioma === "es"
    ? { es: `/notas/${slug}`, en: `/notas/${equivalente}` }
    : { es: `/notas/${equivalente}`, en: `/notas/${slug}` };
}

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/notas/[slug]">): Promise<Metadata> {
  const { idioma, slug } = await params;
  if (!esIdioma(idioma)) return {};

  const nota = obtenerNota(idioma, slug);
  if (!nota) return {};

  return {
    title: nota.titulo,
    description: nota.bajada,
    alternates: alternativas(idioma, caminosDeNota(idioma, slug)),
    openGraph: {
      type: "article",
      title: nota.titulo,
      description: nota.bajada,
      publishedTime: nota.fecha,
    },
  };
}

export default async function Nota({
  params,
}: PageProps<"/[idioma]/notas/[slug]">) {
  const { idioma, slug } = await params;
  if (!esIdioma(idioma)) notFound();

  const nota = obtenerNota(idioma, slug);
  if (!nota) notFound();

  const txt = seccion(textos.paginaNotas, idioma);
  const comun = seccion(textos.comun, idioma);
  const { Contenido } = nota;

  const datos = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: nota.titulo,
    description: nota.bajada,
    datePublished: nota.fecha,
    dateModified: nota.fecha,
    inLanguage: etiquetaHtml[idioma],
    author: { "@type": "Person", name: sitio.autor, url: sitio.url },
    publisher: { "@type": "Organization", name: sitio.nombre, url: sitio.url },
    mainEntityOfPage: `${sitio.url}/${idioma}/notas/${nota.slug}`,
  };

  return (
    <>
      <article>
        <header className="contenedor pt-6 pb-6 md:pt-8 md:pb-8">
          <Migas
            idioma={idioma}
            ruta={[
              { camino: "/notas", texto: txt.eyebrow },
              { camino: `/notas/${nota.slug}`, texto: nota.titulo },
            ]}
          />

          <div className="mt-3 flex flex-wrap gap-x-2">
            <span className="etiqueta">
              {formatearFecha(nota.fecha, idioma)}
            </span>
            <span className="etiqueta">
              {nota.tiempoLectura} {comun.minLectura}
            </span>
          </div>

          <h1 className="font-display text-display-l condensada text-fg mt-2 max-w-[22ch] text-balance">
            {nota.titulo}
          </h1>

          <p className="text-body-l text-fg-muted medida mt-3">{nota.bajada}</p>
        </header>

        <div className="contenedor border-line border-t pt-6 pb-10 md:pb-14">
          <Contenido />
        </div>
      </article>

      <Cierre
        idioma={idioma}
        titulo={txt.cierreNota}
        origen="nota"
        mensaje={mensajes.nota(nota.titulo, idioma)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
      />
    </>
  );
}
