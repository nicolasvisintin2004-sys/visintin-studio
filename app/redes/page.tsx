import type { Metadata } from "next";
import { DatosEstructurados } from "@/components/datos-estructurados";
import { ServiciosInstagram } from "@/components/servicios-instagram";
import { SiguientePagina } from "@/components/siguiente-pagina";
import { instagram } from "@/content/instagram";
import { sitio } from "@/content/sitio";
import { paginas } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = metadatosDePagina({
  ruta: "/redes",
  ...paginas.redes,
});

/**
 * Los tres servicios, descriptos para Google, con su precio.
 *
 * Van en esta página y no en el inicio porque es acá donde se lee el precio:
 * Google pide que el marcado describa lo que está en la misma página. Los
 * mensuales lo dicen con la unidad "MON" (mes).
 */
const servicios = instagram.servicios.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.nombre,
  description: s.promesa,
  url: `${sitio.url}/redes`,
  provider: { "@id": `${sitio.url}/#negocio` },
  areaServed: { "@type": "Country", name: "Argentina" },
  offers: {
    "@type": "Offer",
    price: s.precio.valor,
    priceCurrency: "USD",
    ...(s.precio.periodo === "por mes" && {
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: s.precio.valor,
        priceCurrency: "USD",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
    }),
  },
}));

/**
 * Contenido para redes.
 *
 * Antes era el tercer bloque de /servicios, a casi cinco pantallas de celular
 * del principio, y el inicio no lo nombraba. Ahora es una de las tres puertas
 * y tiene página propia, que es también el enlace que se manda desde
 * Instagram a quien pregunta por contenido.
 */
export default function PaginaRedes() {
  return (
    <>
      <main id="contenido">
        <ServiciosInstagram />
        <SiguientePagina actual="/redes" />
      </main>

      <DatosEstructurados datos={servicios} />
    </>
  );
}
