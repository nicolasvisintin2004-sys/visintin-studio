import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cierre } from "@/components/cierre";
import { Comparador } from "@/components/comparador";
import { Metricas } from "@/components/metricas";
import { Migas } from "@/components/migas";
import { Revelado } from "@/components/revelado";
import { obtenerProyectos, slugsDeProyecto } from "@/content/proyectos";
import { seccion, textos } from "@/content/textos";
import { alternativas, esIdioma, idiomas, mismoCamino } from "@/lib/i18n";
import { mensajes } from "@/lib/sitio";

export function generateStaticParams() {
  return idiomas.flatMap((idioma) =>
    slugsDeProyecto.map((slug) => ({ idioma, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/trabajo/[slug]">): Promise<Metadata> {
  const { idioma, slug } = await params;
  if (!esIdioma(idioma)) return {};

  const proyecto = obtenerProyectos(idioma).find((p) => p.slug === slug);
  if (!proyecto) return {};

  return {
    title: proyecto.nombre,
    description: proyecto.resumen.slice(0, 158),
    alternates: alternativas(idioma, mismoCamino(`/trabajo/${proyecto.slug}`)),
  };
}

export default async function Caso({
  params,
}: PageProps<"/[idioma]/trabajo/[slug]">) {
  const { idioma, slug } = await params;
  if (!esIdioma(idioma)) notFound();

  const proyecto = obtenerProyectos(idioma).find((p) => p.slug === slug);
  if (!proyecto) notFound();

  const txt = seccion(textos.caso, idioma);
  const comun = seccion(textos.comun, idioma);
  const nav = seccion(textos.nav, idioma);

  const enDesarrollo = proyecto.estado === "en-desarrollo";
  const sinResultados =
    proyecto.consultasPorMes === null && proyecto.impresionesBusqueda === null;

  return (
    <>
      <section className="contenedor pt-6 pb-8 md:pt-8 md:pb-12">
        <Migas
          idioma={idioma}
          ruta={[
            { camino: "/trabajo", texto: nav.trabajo },
            { camino: `/trabajo/${proyecto.slug}`, texto: proyecto.nombre },
          ]}
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="etiqueta">
            {proyecto.rubro} · {proyecto.anio}
          </p>
          <span className="etiqueta border-line-strong border px-1 py-0.5">
            {enDesarrollo ? comun.enDesarrollo : comun.entregado}
          </span>
        </div>

        <h1 className="font-display text-display-l condensada text-fg mt-2 max-w-[20ch] text-balance">
          {proyecto.nombre}
        </h1>

        <p className="text-body-l text-fg-muted medida mt-3">
          {proyecto.resumen}
        </p>

        {enDesarrollo ? (
          <p className="border-line-strong text-small text-fg-muted medida mt-4 border-l-2 pl-2">
            {txt.avisoEnDesarrollo}
          </p>
        ) : null}
      </section>

      {/* ─── Antes / después ─── */}
      {proyecto.imagenes?.despues ? (
        <section className="contenedor pb-8 md:pb-12">
          <Comparador
            idioma={idioma}
            antes={proyecto.imagenes.antes}
            despues={proyecto.imagenes.despues}
            prioridad
          />
        </section>
      ) : null}

      {/* ─── Rendimiento ─── */}
      <section data-surface="dark" className="bg-surface py-8 md:py-12">
        <div className="contenedor grilla gap-y-4">
          <div className="col-span-12 md:col-span-4">
            <p className="etiqueta">{txt.resultado}</p>
            <h2 className="font-display text-display-m condensada text-fg mt-2 max-w-[14ch] text-balance">
              {txt.resultadoTitulo}
            </h2>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Metricas medicion={proyecto.medicion} idioma={idioma} />

            {sinResultados ? (
              <p className="text-small text-fg-muted mt-3">
                {txt.sinResultados}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* ─── La situación ─── */}
      <section className="contenedor py-8 md:py-12">
        <div className="grilla gap-y-3">
          <p className="etiqueta col-span-12 md:col-span-3">{txt.situacion}</p>
          <p className="text-body-l text-fg-muted medida col-span-12 md:col-span-8 md:col-start-5">
            {proyecto.situacion}
          </p>
        </div>
      </section>

      {/* ─── Qué construí ─── */}
      <section className="border-line contenedor border-t py-8 md:py-12">
        <div className="grilla gap-y-3">
          <p className="etiqueta col-span-12 md:col-span-3">{txt.construido}</p>

          <ol className="col-span-12 space-y-3 md:col-span-8 md:col-start-5">
            {proyecto.construido.map((punto, i) => (
              <Revelado
                key={punto}
                como="li"
                retraso={i * 60}
                className="border-line flex gap-2 border-t pt-2"
              >
                <span className="etiqueta shrink-0">0{i + 1}</span>
                <span className="text-body text-fg-muted">{punto}</span>
              </Revelado>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Capturas ─── */}
      <section className="contenedor pb-8 md:pb-12">
        <p className="etiqueta">{txt.capturas}</p>
        <div className="grilla mt-3 gap-y-3">
          {txt.vistas.map((vista) => (
            <div
              key={vista}
              className="border-line bg-raised col-span-12 flex aspect-4/3 items-center justify-center border md:col-span-6"
            >
              <span className="etiqueta">
                {vista} · {txt.pendiente}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Stack ─── */}
      <section className="border-line border-y py-6">
        <div className="contenedor flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="etiqueta">{txt.stack}</p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {proyecto.stack.map((herramienta) => (
              <li key={herramienta} className="etiqueta text-fg">
                {herramienta}
              </li>
            ))}
          </ul>
          {proyecto.urlEnVivo ? (
            <a
              href={proyecto.urlEnVivo}
              className="subrayado text-small text-fg ml-auto font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {txt.verEnVivo} →
            </a>
          ) : (
            <span className="etiqueta ml-auto">{txt.noPublicado}</span>
          )}
        </div>
      </section>

      <Cierre
        idioma={idioma}
        titulo={txt.cierre}
        origen="caso"
        mensaje={mensajes.caso(proyecto.nombre, idioma)}
      />
    </>
  );
}
