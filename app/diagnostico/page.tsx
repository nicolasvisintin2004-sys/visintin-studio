import type { Metadata } from "next";
import { DatosEstructurados } from "@/components/datos-estructurados";
import { PaginaDiagnostico } from "@/components/diagnostico";
import { MedirVista } from "@/components/medir-vista";
import {
  PRECIO_DIAGNOSTICO,
  diagnostico,
  preguntasDiagnostico,
} from "@/content/diagnostico";
import { sitio } from "@/content/sitio";
import { paginas } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = metadatosDePagina({
  ruta: "/diagnostico",
  ...paginas.diagnostico,
  // Tiene miniatura propia: `app/diagnostico/opengraph-image.tsx`.
  imagen: "/diagnostico/opengraph-image",
});

/**
 * El diagnóstico descripto como servicio, para Google.
 *
 * `Service` y no `Product`: no es un objeto que se envía, y el marcado de
 * producto pide datos —disponibilidad, condición, devoluciones— que acá no
 * significan nada. El precio sólo se declara si existe: un `offers` con el
 * precio vacío es peor que no tener `offers`, porque Google lo marca como
 * dato estructurado inválido.
 */
const servicio = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${sitio.url}/diagnostico#servicio`,
  name: "Diagnóstico de procesos para PyMEs",
  serviceType: "Análisis y automatización de procesos",
  description: paginas.diagnostico.descripcion,
  url: `${sitio.url}/diagnostico`,
  provider: { "@id": `${sitio.url}/#negocio` },
  areaServed: { "@type": "Country", name: "Argentina" },
  /** Los cuatro entregables, que es lo que se compra. */
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Entregables del diagnóstico",
    itemListElement: diagnostico.entregables.lista.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item.nombre, description: item.texto },
    })),
  },
  ...(PRECIO_DIAGNOSTICO.trim() !== "" && {
    offers: {
      "@type": "Offer",
      price: PRECIO_DIAGNOSTICO,
      availability: "https://schema.org/InStock",
      url: `${sitio.url}/diagnostico`,
    },
  }),
};

const preguntasFrecuentes = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: preguntasDiagnostico.map((p) => ({
    "@type": "Question",
    name: p.pregunta,
    acceptedAnswer: { "@type": "Answer", text: p.respuesta },
  })),
};

/**
 * El diagnóstico.
 *
 * Es la página a la que apuntan los enlaces de prospección y de anuncios, así
 * que no lleva la franja de "sección siguiente": el único camino hacia
 * adelante es el formulario. La barra de arriba también se reduce a logotipo
 * y un botón; eso lo resuelve `components/navegacion.tsx` según la ruta.
 */
export default function Diagnostico() {
  return (
    <>
      <main id="contenido">
        <PaginaDiagnostico />
      </main>

      <MedirVista evento="view_diagnostico" />
      <DatosEstructurados datos={[servicio, preguntasFrecuentes]} />
    </>
  );
}
