import type { Metadata } from "next";
import { BotonWhatsApp } from "@/components/boton-whatsapp";
import { Cabecera } from "@/components/cabecera";
import { Formulario } from "@/components/formulario";
import { compromisoPorClave } from "@/content/compromisos";
import { seccion, textos } from "@/content/textos";
import { alternativas, esIdioma, mismoCamino } from "@/lib/i18n";
import { disponibilidad, sitio } from "@/lib/sitio";

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/contacto">): Promise<Metadata> {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return {};

  return {
    title: textos.paginaContacto.eyebrow[idioma],
    description: textos.paginaContacto.metaDescripcion[idioma],
    alternates: alternativas(idioma, mismoCamino("/contacto")),
  };
}

export default async function Contacto({
  params,
}: PageProps<"/[idioma]/contacto">) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return null;

  const txt = seccion(textos.paginaContacto, idioma);
  const comun = seccion(textos.comun, idioma);
  const nav = seccion(textos.nav, idioma);

  return (
    <>
      <Cabecera
        idioma={idioma}
        etiqueta={txt.eyebrow}
        titulo={txt.titulo}
        bajada={txt.bajada}
        migas={[{ camino: "/contacto", texto: txt.eyebrow }]}
      />

      {/* ─── WhatsApp primero: es como decide este cliente ─── */}
      <section className="contenedor pb-8">
        <div className="border-line bg-raised grilla items-center gap-y-3 border p-3 md:p-4">
          <div className="col-span-12 md:col-span-7">
            <p className="etiqueta">{txt.viaRapida}</p>
            <p className="font-display text-display-m condensada text-fg mt-1">
              WhatsApp
            </p>
            <p className="etiqueta text-fg border-line mt-1.5 border-t pt-1.5">
              {compromisoPorClave("respuesta", idioma)!.titulo}
            </p>
            <p className="text-body text-fg-muted medida mt-1.5">
              {txt.viaRapidaTexto}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:justify-self-end">
            <BotonWhatsApp origen="contacto" className="px-4 py-2">
              {nav.escribime}
            </BotonWhatsApp>
          </div>
        </div>
      </section>

      {/* ─── Formulario como alternativa ─── */}
      <section className="contenedor border-line border-t py-8 md:py-12">
        <div className="grilla gap-y-4">
          <div className="col-span-12 md:col-span-4">
            <p className="etiqueta">{txt.otraVia}</p>
            <h2 className="font-display text-heading text-fg mt-2">
              {txt.contameTitulo}
            </h2>
            <p className="text-small text-fg-muted mt-2">{txt.contameTexto}</p>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Formulario idioma={idioma} />
          </div>
        </div>
      </section>

      {/* ─── Datos ─── */}
      <section className="border-line border-t py-6">
        <div className="contenedor grilla gap-y-3">
          <div className="col-span-12 md:col-span-4">
            <p className="etiqueta">{txt.correo}</p>
            <a
              href={`mailto:${sitio.email}`}
              className="subrayado text-body text-fg mt-1 inline-block"
            >
              {sitio.email}
            </a>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="etiqueta">{txt.zona}</p>
            <p className="text-body text-fg mt-1">{txt.zonaValor}</p>
            <p className="text-small text-fg-muted">{txt.zonaTexto}</p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="etiqueta">{txt.horario}</p>
            <p className="text-body text-fg mt-1">{txt.horarioValor}</p>
            <p className="text-small text-fg-muted">{txt.horarioTexto}</p>
          </div>

          <p className="etiqueta border-line col-span-12 border-t pt-2">
            {comun.disponibilidad} · {disponibilidad[idioma]}
          </p>
        </div>
      </section>
    </>
  );
}
