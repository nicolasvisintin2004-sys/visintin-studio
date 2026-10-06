import type { Metadata } from "next";
import { DatosEstructurados } from "@/components/datos-estructurados";
import { MedirVista } from "@/components/medir-vista";
import { PaginaTurnos } from "@/components/turnos";
import { sitio } from "@/content/sitio";
import { TURNOS_PUBLICADA, metaTurnos, preguntasTurnos } from "@/content/turnos";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = {
  ...metadatosDePagina({
    ruta: "/turnos",
    ...metaTurnos,
    // Tiene miniatura propia: `app/turnos/opengraph-image.tsx`.
    imagen: "/turnos/opengraph-image",
  }),
  /*
   * Mientras la página no se anuncia, tampoco se indexa. Se puede abrir
   * escribiendo la dirección, pero no está en el sitemap ni enlazada, y esto
   * cubre el caso de que alguien la enlace desde afuera antes de tiempo.
   */
  ...(!TURNOS_PUBLICADA && { robots: { index: false, follow: false } }),
};

/**
 * El producto, para Google.
 *
 * `SoftwareApplication` sin `offers` ni `aggregateRating`: no hay precio
 * publicado ni reseñas, y declarar cualquiera de los dos con un valor de
 * relleno es exactamente lo que Google penaliza. Sin ellos el marcado no da
 * resultado enriquecido, pero describe bien qué es la página; cuando haya
 * precio, se agrega acá.
 */
const aplicacion = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${sitio.url}/turnos#aplicacion`,
  name: "Visintin Turnos",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Sistema de turnos para consultorios",
  operatingSystem: "Web",
  description: metaTurnos.descripcion,
  url: `${sitio.url}/turnos`,
  inLanguage: "es-AR",
  provider: { "@id": `${sitio.url}/#negocio` },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Consultorios y centros médicos",
  },
  areaServed: { "@type": "Country", name: "Argentina" },
};

const preguntasFrecuentes = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: preguntasTurnos.map((p) => ({
    "@type": "Question",
    name: p.pregunta,
    acceptedAnswer: { "@type": "Answer", text: p.respuesta },
  })),
};

/**
 * Visintin Turnos.
 *
 * Igual que el diagnóstico, es una página de aterrizaje: no lleva la franja
 * de "sección siguiente" y la barra de arriba se reduce a logotipo y un
 * botón. El único camino hacia adelante es pedir la demo.
 */
export default function Turnos() {
  return (
    <>
      <main id="contenido">
        <PaginaTurnos />
      </main>

      <MedirVista evento="view_turnos" />
      <DatosEstructurados datos={[aplicacion, preguntasFrecuentes]} />
    </>
  );
}
