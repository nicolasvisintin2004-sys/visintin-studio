import type { Metadata } from "next";
import { CierreInicio } from "@/components/cierre-inicio";
import { DatosEstructurados } from "@/components/datos-estructurados";
import { Hero } from "@/components/hero";
import { Puertas } from "@/components/puertas";
import { planes } from "@/content/planes";
import { puertas } from "@/content/servicios";
import { perfilesSociales } from "@/content/social";
import { sitio } from "@/content/sitio";
import { meta } from "@/content/textos";
import { TURNOS_PUBLICADA } from "@/content/turnos-acciones";
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
 * Va en el inicio porque describe al estudio entero. El catálogo son las tres
 * puertas y los tres alcances de sitio web. Los precios de contenido para
 * redes no van acá sino en /redes, que es donde se leen: Google pide que el
 * marcado describa lo que está en la misma página. Cada servicio lleva la
 * dirección de su página, salvo el de turnos mientras su página no se
 * anuncia.
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
      ...Object.values(puertas).map((puerta) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: puerta.nombre,
          description: puerta.texto,
          ...((puerta.slug !== "turnos" || TURNOS_PUBLICADA) && {
            url: `${sitio.url}${puerta.href}`,
          }),
        },
      })),
      ...planes.map((plan) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `Sitio web, plan ${plan.nombre}`,
          description: plan.promesa,
          url: `${sitio.url}/sitios-web`,
        },
      })),
    ],
  },
};

/**
 * El inicio.
 *
 * Tres partes: el hero dice qué se hace y para quién, las tres puertas
 * muestran cada cosa con una prueba real y un enlace a su página, y el cierre
 * invita a escribir.
 *
 * Hasta noviembre de 2026 tenía además el bloque del diagnóstico, la cinta de
 * rubros, un índice de seis páginas y la franja de redes. Se sacaron porque
 * entre todos tapaban lo que se vende: el diagnóstico no se vendió nunca, los
 * rubros quedaron dichos en cada puerta, el índice es el menú y las redes
 * están en el pie.
 */
export default function Inicio() {
  return (
    <>
      <main id="contenido">
        <Hero />
        <Puertas />
        <CierreInicio />
      </main>

      <DatosEstructurados datos={negocio} />
    </>
  );
}
