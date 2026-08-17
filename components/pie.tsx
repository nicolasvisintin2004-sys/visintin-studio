import Link, { type LinkProps } from "next/link";
import { seccion, textos } from "@/content/textos";
import { ruta as construirRuta, type Idioma } from "@/lib/i18n";
import { sitio } from "@/lib/sitio";

export function Pie({ idioma }: { idioma: Idioma }) {
  const nav = seccion(textos.nav, idioma);
  const txt = seccion(textos.pie, idioma);

  const principales = [
    { camino: "/trabajo", texto: nav.trabajo },
    { camino: "/planes", texto: nav.planes },
    { camino: "/estudio", texto: nav.estudio },
    { camino: "/notas", texto: nav.notas },
  ];

  const secundarios = [
    { camino: "/contacto", texto: nav.contacto },
    { camino: "/notas", texto: nav.notas },
  ];

  const claseEnlace =
    "subrayado text-small text-fg-muted hover:text-fg w-fit transition-colors";

  return (
    <footer className="border-line border-t">
      <div className="contenedor grilla gap-y-4 py-6">
        <div className="col-span-12 md:col-span-5">
          <p className="font-display condensada text-heading text-fg font-bold tracking-[0.18em] uppercase">
            Visintin
          </p>
          <p className="etiqueta mt-1">{txt.ciudad}</p>
          <p className="text-small text-fg-muted medida mt-2">
            {txt.descripcion}
          </p>
        </div>

        <nav
          aria-label={txt.pie}
          className="col-span-6 flex flex-col gap-1 md:col-span-3 md:col-start-8"
        >
          {principales.map((item) => (
            <Link
              key={item.camino}
              href={construirRuta(idioma, item.camino) as LinkProps["href"]}
              className={claseEnlace}
            >
              {item.texto}
            </Link>
          ))}
        </nav>

        <div className="col-span-6 flex flex-col gap-1 md:col-span-2">
          {secundarios.map((item) => (
            <Link
              key={`pie-${item.camino}`}
              href={construirRuta(idioma, item.camino) as LinkProps["href"]}
              className={claseEnlace}
            >
              {item.texto}
            </Link>
          ))}
          <a href={`mailto:${sitio.email}`} className={claseEnlace}>
            {sitio.email}
          </a>
        </div>

        <div className="border-line col-span-12 flex flex-wrap justify-between gap-2 border-t pt-2">
          <p className="etiqueta">
            © {new Date().getFullYear()} {sitio.autor}
          </p>
          <p className="etiqueta">Next.js · Vercel</p>
        </div>
      </div>
    </footer>
  );
}
