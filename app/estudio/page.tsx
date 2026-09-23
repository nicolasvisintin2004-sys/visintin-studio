import type { Metadata } from "next";
import { DatosEstructurados } from "@/components/datos-estructurados";
import { Preguntas } from "@/components/preguntas";
import { SiguientePagina } from "@/components/siguiente-pagina";
import { SobreMi } from "@/components/sobre-mi";
import { preguntas } from "@/content/preguntas";
import { paginas } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = metadatosDePagina({
  ruta: "/estudio",
  ...paginas.estudio,
});

/**
 * Las preguntas frecuentes, descriptas para Google.
 *
 * El JSON-LD de `FAQPage` va en esta página y no en el inicio porque es acá
 * donde están las preguntas. Google exige que el marcado describa contenido
 * que esté en la misma página; declararlo en otra dirección es justo lo que
 * penaliza.
 */
const preguntasFrecuentes = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: preguntas.map((p) => ({
    "@type": "Question",
    name: p.pregunta,
    acceptedAnswer: { "@type": "Answer", text: p.respuesta },
  })),
};

/**
 * El estudio: quién hace el trabajo y cómo se trabaja.
 *
 * Las preguntas frecuentes van acá porque casi todas son sobre la forma de
 * trabajar —plazos, propiedad del sitio, pago, qué pasa si se termina la
 * relación— más que sobre un servicio en particular.
 */
export default function PaginaEstudio() {
  return (
    <>
      <main id="contenido">
        <SobreMi />
        <Preguntas />
        <SiguientePagina actual="/estudio" />
      </main>

      <DatosEstructurados datos={preguntasFrecuentes} />
    </>
  );
}
