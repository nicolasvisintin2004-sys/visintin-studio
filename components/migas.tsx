import Link, { type LinkProps } from "next/link";
import { textos } from "@/content/textos";
import { ruta as construirRuta, type Idioma } from "@/lib/i18n";
import { sitio } from "@/lib/sitio";

/** `camino` es relativo, sin el prefijo de idioma: "/planes". */
export type Miga = { camino: string; texto: string };

/**
 * Migas visibles + BreadcrumbList. Van juntas a propósito: si el dato
 * estructurado no coincide con lo que ve la persona, Google lo ignora.
 */
export function Migas({ ruta, idioma }: { ruta: Miga[]; idioma: Idioma }) {
  const completa: Miga[] = [
    { camino: "", texto: textos.comun.inicio[idioma] },
    ...ruta,
  ];

  const datos = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: completa.map((miga, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: miga.texto,
      item: `${sitio.url}${construirRuta(idioma, miga.camino)}`,
    })),
  };

  return (
    <>
      <nav aria-label={textos.comun.migas[idioma]}>
        <ol className="flex flex-wrap items-center gap-1">
          {completa.map((miga, i) => {
            const ultima = i === completa.length - 1;
            return (
              <li key={miga.camino || "inicio"} className="flex items-center gap-1">
                {ultima ? (
                  <span className="etiqueta text-fg" aria-current="page">
                    {miga.texto}
                  </span>
                ) : (
                  <>
                    <Link
                      href={
                        construirRuta(idioma, miga.camino) as LinkProps["href"]
                      }
                      className="subrayado etiqueta hover:text-fg transition-colors"
                    >
                      {miga.texto}
                    </Link>
                    <span aria-hidden="true" className="etiqueta">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
      />
    </>
  );
}
