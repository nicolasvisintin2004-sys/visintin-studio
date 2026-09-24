import type { Metadata } from "next";
import { BloqueDiagnostico } from "@/components/bloque-diagnostico";
import { CierreInicio } from "@/components/cierre-inicio";
import { Cinta } from "@/components/cinta";
import { DatosEstructurados } from "@/components/datos-estructurados";
import { Hero } from "@/components/hero";
import { Indice } from "@/components/indice";
import { RedesEnInicio } from "@/components/redes";
import { PRECIO_DIAGNOSTICO, diagnostico } from "@/content/diagnostico";
import { pedidos } from "@/content/pedidos";
import { perfilesSociales } from "@/content/social";
import { lineas, servicios } from "@/content/servicios";
import { sitio } from "@/content/sitio";
import { meta } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

// En el inicio el título va entero, sin la plantilla " · Visintin Studio":
// ya empieza con el nombre del estudio.
export const metadata: Metadata = metadatosDePagina({
  ruta: "/",
  titulo: meta.titulo,
  descripcion: meta.descripcion,
  absoluto: true,
});

/**
 * Qué es este negocio, dónde está y qué ofrece, para Google.
 *
 * Va en el inicio porque describe al estudio entero. El catálogo lleva tres
 * listas: las dos líneas de trabajo, las cuatro categorías de servicio y los
 * nueve entregables concretos, que son los que están escritos con las
 * palabras que la gente busca —"tienda online", "turnos y reservas",
 * "cotizador"—. El diagnóstico va primero porque es por donde entran todos.
 */
const negocio = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${sitio.url}/#negocio`,
  name: sitio.nombre,
  description: meta.descripcion,
  url: sitio.url,
  email: sitio.email,
  telephone: `+${sitio.whatsapp}`,
  founder: { "@type": "Person", name: sitio.autor },
  address: {
    "@type": "PostalAddress",
    addressLocality: sitio.ciudad,
    addressCountry: sitio.pais,
  },
  areaServed: { "@type": "Country", name: "Argentina" },
  /*
   * Los perfiles del negocio en otros lados. Es lo que le permite a Google
   * unir este sitio con la cuenta de Instagram en vez de tratarlos como dos
   * entidades distintas que se llaman parecido. Sale de `content/social.ts`,
   * así que cargar una red nueva lo actualiza solo; si no hay ninguna, la
   * propiedad no se declara en lugar de ir vacía.
   */
  ...(perfilesSociales.length > 0 && { sameAs: perfilesSociales }),
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diagnóstico de procesos",
          description: diagnostico.bajada,
          url: `${sitio.url}/diagnostico`,
        },
        // El único precio del sitio, y sólo si está definido.
        ...(PRECIO_DIAGNOSTICO.trim() !== "" && { price: PRECIO_DIAGNOSTICO }),
      },
      ...lineas.map((linea) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: linea.nombre,
          description: linea.promesa,
        },
      })),
      ...servicios.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.nombre, description: s.promesa },
      })),
      ...pedidos.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.nombre, description: p.descripcion },
      })),
    ],
  },
};

/**
 * El inicio.
 *
 * Presenta el estudio y reparte: el hero dice qué se hace, el bloque del
 * diagnóstico ofrece el único camino de entrada con precio, la cinta dice con
 * quién se trabaja y el índice lleva a cada página. No repite el contenido de
 * las secciones —cada una tiene su dirección propia— y cierra con la
 * invitación a escribir.
 *
 * El diagnóstico va segundo, apenas debajo del hero: es el producto de
 * entrada y lo que tiene que ver primero el que llega sin saber qué pedir.
 */
export default function Inicio() {
  return (
    <>
      <main id="contenido">
        <Hero />
        <BloqueDiagnostico />
        <Cinta />
        <Indice />
        {/* No se renderiza si no hay ninguna red cargada. */}
        <RedesEnInicio />
        <CierreInicio />
      </main>

      <DatosEstructurados datos={negocio} />
    </>
  );
}
