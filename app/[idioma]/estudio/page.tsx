import type { Metadata } from "next";
import { Cabecera } from "@/components/cabecera";
import { Cierre } from "@/components/cierre";
import { Proceso } from "@/components/proceso";
import { Revelado } from "@/components/revelado";
import { compromisoPorClave } from "@/content/compromisos";
import { seccion, textos } from "@/content/textos";
import {
  alternativas,
  esIdioma,
  etiquetaHtml,
  mismoCamino,
  type Idioma,
} from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/estudio">): Promise<Metadata> {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return {};

  return {
    title: textos.paginaEstudio.eyebrow[idioma],
    description: textos.paginaEstudio.metaDescripcion[idioma],
    alternates: alternativas(idioma, mismoCamino("/estudio")),
  };
}

function preguntasFrecuentes(idioma: Idioma) {
  const base =
    idioma === "es"
      ? [
          {
            pregunta: "¿El sitio es mío?",
            respuesta:
              "Sí. Dominio, código y contenido a tu nombre. Si un día te vas, te llevás todo.",
          },
          {
            pregunta: "¿Qué pasa si dejás de trabajar conmigo?",
            respuesta:
              "Es la pregunta correcta. Está hecho con tecnología estándar y documentada, así que cualquier desarrollador puede continuarlo. Te entrego el repositorio y los accesos desde el día uno, no al final.",
          },
          {
            pregunta: "Tenés 19 años. ¿Por qué te contrataría?",
            respuesta:
              "Por lo mismo por lo que contratarías a cualquiera: porque podés ver lo que hice y medirlo. En la sección Trabajo está el Lighthouse de cada proyecto. Si los números no te convencen, la edad es lo de menos; si te convencen, también.",
          },
          {
            pregunta: "¿Cuánto tarda?",
            respuesta:
              "Entre una y tres semanas desde que están los textos y las fotos. Lo que más demora los proyectos no es el desarrollo: es esperar el contenido.",
          },
          {
            pregunta: "¿Cómo se paga?",
            respuesta:
              "La mitad al arrancar y la mitad al publicar. Cotizo en dólares y cobro en pesos al tipo de cambio MEP del día de pago.",
          },
          {
            pregunta: "¿Trabajás con clientes de todo el país?",
            respuesta:
              "Sí. Estoy en Buenos Aires y trabajo a distancia con todo el país. Todo el proceso funciona por WhatsApp y videollamada.",
          },
        ]
      : [
          {
            pregunta: "Is the site mine?",
            respuesta:
              "Yes. Domain, code and content in your name. If you ever leave, you take everything with you.",
          },
          {
            pregunta: "What happens if you stop working with me?",
            respuesta:
              "That's the right question to ask. It's built with standard, documented technology, so any developer can pick it up. I hand over the repository and the credentials from day one, not at the end.",
          },
          {
            pregunta: "You're 19. Why would I hire you?",
            respuesta:
              "For the same reason you'd hire anyone: because you can see what I've built and measure it. The Work section has the Lighthouse score of every project. If the numbers don't convince you, age is beside the point; if they do, same.",
          },
          {
            pregunta: "How long does it take?",
            respuesta:
              "Between one and three weeks once the copy and photos are ready. What delays projects most isn't the development: it's waiting for the content.",
          },
          {
            pregunta: "How does payment work?",
            respuesta:
              "Half upfront and half on launch. I quote in US dollars and charge in pesos at the MEP exchange rate on the day of payment.",
          },
          {
            pregunta: "Do you work with clients across the country?",
            respuesta:
              "Yes. I'm based in Buenos Aires and work remotely with the whole country. The entire process runs over WhatsApp and video calls.",
          },
        ];

  const claves = ["respuesta", "conformidad", "soporte"] as const;
  const titulos =
    idioma === "es"
      ? [
          "¿En cuánto me contestás?",
          "¿Y si no me gusta cómo queda?",
          "¿Qué incluye el soporte después de la entrega?",
        ]
      : [
          "How quickly do you reply?",
          "What if I don't like how it turns out?",
          "What does support cover after delivery?",
        ];

  const derivadas = claves.map((clave, i) => ({
    pregunta: titulos[i],
    respuesta: compromisoPorClave(clave, idioma)!.texto,
  }));

  return [...base.slice(0, 3), ...derivadas, ...base.slice(3)];
}

export default async function Estudio({
  params,
}: PageProps<"/[idioma]/estudio">) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return null;

  const txt = seccion(textos.paginaEstudio, idioma);
  const preguntas = preguntasFrecuentes(idioma);

  const datosFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: etiquetaHtml[idioma],
    mainEntity: preguntas.map((item) => ({
      "@type": "Question",
      name: item.pregunta,
      acceptedAnswer: { "@type": "Answer", text: item.respuesta },
    })),
  };

  return (
    <>
      <Cabecera
        idioma={idioma}
        etiqueta={txt.eyebrow}
        titulo={txt.titulo}
        bajada={txt.bajada}
        migas={[{ camino: "/estudio", texto: txt.eyebrow }]}
      />

      {/* ─── Sobre mí ─── */}
      <section className="contenedor pb-8 md:pb-12">
        <div className="grilla gap-y-4">
          <div className="col-span-12 md:col-span-4">
            <div className="border-line bg-raised flex aspect-4/5 items-center justify-center border">
              <span className="etiqueta">
                {textos.comun.fotoPendiente[idioma]}
              </span>
            </div>
            <dl className="mt-2 space-y-0.5">
              <div className="flex gap-1">
                <dt className="etiqueta">{txt.edad}</dt>
                <dd className="etiqueta text-fg">19</dd>
              </div>
              <div className="flex gap-1">
                <dt className="etiqueta">{txt.de}</dt>
                <dd className="etiqueta text-fg">Carmen de Patagones</dd>
              </div>
              <div className="flex gap-1">
                <dt className="etiqueta">{txt.estudia}</dt>
                <dd className="etiqueta text-fg">{txt.carrera}</dd>
              </div>
            </dl>
          </div>

          <div className="col-span-12 space-y-3 md:col-span-7 md:col-start-6">
            {txt.bio.map((parrafo, i) => (
              <p
                key={parrafo.slice(0, 24)}
                className={`text-body-l medida ${i === 0 ? "text-fg" : "text-fg-muted"}`}
              >
                {parrafo}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cómo trabajo ─── */}
      <section data-surface="dark" className="bg-surface py-10 md:py-14">
        <div className="contenedor">
          <p className="etiqueta">{txt.comoTrabajo}</p>
          <h2 className="font-display text-display-m condensada text-fg mt-2 max-w-[20ch] text-balance">
            {txt.comoTrabajoTitulo}
          </h2>

          <Proceso idioma={idioma} largo />
        </div>
      </section>

      {/* ─── Preguntas frecuentes ─── */}
      <section className="contenedor py-8 md:py-12">
        <div className="grilla gap-y-4">
          <div className="col-span-12 md:col-span-3">
            <p className="etiqueta">{txt.faqEyebrow}</p>
          </div>

          <dl className="col-span-12 md:col-span-8 md:col-start-5">
            {preguntas.map((item, i) => (
              <Revelado
                key={item.pregunta}
                retraso={i * 60}
                className="border-line border-t py-3 first:border-t-0 first:pt-0"
              >
                <dt className="font-display text-heading text-fg">
                  {item.pregunta}
                </dt>
                <dd className="text-body text-fg-muted medida mt-1.5">
                  {item.respuesta}
                </dd>
              </Revelado>
            ))}
          </dl>
        </div>
      </section>

      <Cierre idioma={idioma} titulo={txt.cierre} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosFAQ) }}
      />
    </>
  );
}
