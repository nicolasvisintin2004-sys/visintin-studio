import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navegacion } from "@/components/navegacion";
import { Pie } from "@/components/pie";
import { textos } from "@/content/textos";
import { esIdioma, etiquetaHtml, idiomas, type Idioma } from "@/lib/i18n";
import { sitio } from "@/lib/sitio";
import { variablesDeFuente } from "../fuentes";
import "../globals.css";

/**
 * Este es el layout raíz: contiene <html> y <body>. Vive dentro del
 * segmento [idioma] porque el atributo `lang` tiene que cambiar con el
 * idioma, y un layout en app/ no puede leer el parámetro.
 */
export function generateStaticParams() {
  return idiomas.map((idioma) => ({ idioma }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[idioma]">): Promise<Metadata> {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return {};

  return {
    metadataBase: new URL(sitio.url),
    title: {
      default: textos.home.metaTitulo[idioma],
      template: "%s · Visintin Studio",
    },
    description: textos.home.metaDescripcion[idioma],
    authors: [{ name: sitio.autor }],
    openGraph: {
      type: "website",
      locale: idioma === "es" ? "es_AR" : "en_US",
      siteName: sitio.nombre,
      url: `${sitio.url}/${idioma}`,
    },
  };
}

function datosEstructurados(idioma: Idioma) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: sitio.nombre,
    founder: { "@type": "Person", name: sitio.autor },
    url: `${sitio.url}/${idioma}`,
    email: sitio.email,
    telephone: `+${sitio.whatsapp}`,
    areaServed: { "@type": "Country", name: "Argentina" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
    priceRange: "USD 450 – USD 1200",
    serviceType:
      idioma === "es" ? "Desarrollo de sitios web" : "Website development",
    inLanguage: etiquetaHtml[idioma],
  };
}

export default async function LayoutRaiz({
  children,
  params,
}: LayoutProps<"/[idioma]">) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) notFound();

  return (
    <html lang={etiquetaHtml[idioma]} className={variablesDeFuente}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="bg-fg text-surface sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:px-2 focus:py-1"
        >
          {textos.nav.saltar[idioma]}
        </a>

        <Navegacion idioma={idioma} />

        <main id="contenido" className="flex-1 pt-9">
          {children}
        </main>

        <Pie idioma={idioma} />

        {/* Sin cookies ni identificadores persistentes: no requiere banner.
            Solo se monta en Vercel: fuera de ahí el script no existe y el
            404 ensucia la consola y baja el puntaje de buenas prácticas. */}
        {process.env.VERCEL ? <Analytics /> : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(datosEstructurados(idioma)),
          }}
        />
      </body>
    </html>
  );
}
