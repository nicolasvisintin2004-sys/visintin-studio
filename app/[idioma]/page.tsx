import type { Metadata } from "next";
import Link, { type LinkProps } from "next/link";
import { Boton, EnlaceFlecha } from "@/components/boton";
import { BotonWhatsApp } from "@/components/boton-whatsapp";
import { Cierre } from "@/components/cierre";
import { ContadorCarga } from "@/components/contador-carga";
import { Metricas } from "@/components/metricas";
import { Proceso } from "@/components/proceso";
import { Revelado } from "@/components/revelado";
import { SimuladorGoogle } from "@/components/simulador-google";
import { obtenerCompromisos } from "@/content/compromisos";
import { obtenerPlanes } from "@/content/planes";
import { proyectoDestacado } from "@/content/proyectos";
import { seccion, textos } from "@/content/textos";
import {
  alternativas,
  esIdioma,
  mismoCamino,
  ruta as construirRuta,
} from "@/lib/i18n";
import { disponibilidad } from "@/lib/sitio";

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]">): Promise<Metadata> {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return {};

  return {
    title: textos.home.metaTitulo[idioma],
    description: textos.home.metaDescripcion[idioma],
    alternates: alternativas(idioma, mismoCamino("")),
  };
}

export default async function Inicio({ params }: PageProps<"/[idioma]">) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return null;

  const txt = seccion(textos.home, idioma);
  const comun = seccion(textos.comun, idioma);
  const nav = seccion(textos.nav, idioma);
  const planes = obtenerPlanes(idioma);
  const compromisos = obtenerCompromisos(idioma);
  const proyecto = proyectoDestacado(idioma);

  // La lista viene aplanada en pares título/texto.
  const problemas = [0, 1, 2].map((i) => ({
    titulo: txt.problemas[i * 2],
    texto: txt.problemas[i * 2 + 1],
  }));

  const enlaceCaso = construirRuta(idioma, `/trabajo/${proyecto.slug}`);

  return (
    <>
      {/* ─────────────── HERO ───────────────
          Sin Revelado a propósito: envolver el primer viewport en una
          animación que arranca en opacity 0 ata el LCP a la hidratación. */}
      <section className="contenedor pt-8 pb-10 md:pt-14 md:pb-16">
        <p className="etiqueta">{txt.eyebrow}</p>

        <h1 className="font-display text-display-xl condensada text-fg mt-3 max-w-[20ch] text-balance">
          {txt.titulo}
        </h1>

        <p className="text-body-l text-fg-muted medida mt-4">{txt.subtitulo}</p>

        <div className="mt-5 flex min-h-11 flex-wrap items-center gap-x-3 gap-y-4">
          <Boton href={construirRuta(idioma, "/trabajo")}>
            {txt.verTrabajos}
          </Boton>
          <BotonWhatsApp origen="hero" variante="enlace">
            {nav.escribime}
          </BotonWhatsApp>

          <div className="ml-auto min-h-11 w-full sm:w-auto">
            <ContadorCarga idioma={idioma} />
          </div>
        </div>
      </section>

      {/* ─────────────── EL PROBLEMA ─────────────── */}
      <section className="border-line border-t py-8 md:py-12">
        <div className="contenedor">
          <p className="etiqueta">{txt.problemaEyebrow}</p>

          <div className="grilla mt-4 gap-y-5">
            {problemas.map((problema, i) => (
              <Revelado
                key={problema.titulo}
                retraso={i * 60}
                className="border-line col-span-12 border-t pt-2 md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-3 md:first:border-l-0 md:first:pl-0"
              >
                <p className="etiqueta">0{i + 1}</p>
                <h2 className="font-display text-heading text-fg mt-1.5">
                  {problema.titulo}
                </h2>
                <p className="text-body text-fg-muted mt-1">{problema.texto}</p>
              </Revelado>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── SIMULADOR DE GOOGLE ───────────────
          Va acá porque es el dibujo de los tres puntos de arriba. */}
      <section className="border-line border-t py-8 md:py-12">
        <div className="contenedor">
          <p className="etiqueta">{txt.simuladorEyebrow}</p>

          <h2 className="font-display text-display-m condensada text-fg mt-2 max-w-[24ch] text-balance">
            {txt.simuladorTitulo}
          </h2>

          <p className="text-body-l text-fg-muted medida mt-3">
            {txt.simuladorBajada}
          </p>

          <Revelado className="mt-5">
            <SimuladorGoogle idioma={idioma} />
            <p className="etiqueta mt-1.5">{txt.simuladorNota}</p>
          </Revelado>
        </div>
      </section>

      {/* ─────────────── TRABAJO SELECCIONADO (invertida 1 de 2) ─────────────── */}
      <section data-surface="dark" className="bg-surface py-10 md:py-14">
        <div className="contenedor">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="etiqueta">{txt.trabajoEyebrow}</p>
            <EnlaceFlecha href={construirRuta(idioma, "/trabajo")}>
              {comun.verTodo}
            </EnlaceFlecha>
          </div>

          <Revelado className="grilla border-line mt-4 gap-y-4 border-t pt-4">
            <div className="col-span-12 md:col-span-7">
              <Link
                href={enlaceCaso as LinkProps["href"]}
                className="border-line bg-raised hover:border-line-strong group block aspect-16/10 overflow-hidden border transition-colors"
              >
                <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none">
                  <span className="etiqueta">{comun.capturaPendiente}</span>
                </div>
              </Link>
            </div>

            <div className="col-span-12 md:col-span-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-display-m condensada text-fg">
                  {proyecto.nombre}
                </h2>
                <span className="etiqueta border-line-strong border px-1 py-0.5">
                  {comun.enDesarrollo}
                </span>
              </div>

              <p className="etiqueta mt-1">
                {proyecto.rubro} · {proyecto.anio}
              </p>

              <p className="text-body text-fg-muted mt-2">{proyecto.resumen}</p>

              <div className="mt-4">
                <Metricas medicion={proyecto.medicion} idioma={idioma} />
              </div>

              <div className="mt-3">
                <EnlaceFlecha href={enlaceCaso}>{txt.verProyecto}</EnlaceFlecha>
              </div>
            </div>
          </Revelado>
        </div>
      </section>

      {/* ─────────────── PLANES (resumen) ─────────────── */}
      <section className="py-8 md:py-12">
        <div className="contenedor">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="etiqueta">{nav.planes}</p>
            <EnlaceFlecha href={construirRuta(idioma, "/planes")}>
              {comun.verDetalle}
            </EnlaceFlecha>
          </div>

          <div className="grilla mt-4 gap-y-3">
            {planes.map((plan, i) => (
              <Revelado
                key={plan.slug}
                retraso={i * 60}
                className="col-span-12 md:col-span-4"
              >
                <div
                  data-surface={plan.recomendado ? "dark" : undefined}
                  className="tarjeta-viva border-line bg-surface flex h-full flex-col border p-3"
                >
                  <div className="flex items-baseline justify-between gap-1">
                    <h2 className="etiqueta">{plan.nombre}</h2>
                    {plan.recomendado ? (
                      <span className="etiqueta">
                        {textos.paginaPlanes.recomendado[idioma]}
                      </span>
                    ) : null}
                  </div>

                  <p className="font-display text-display-m condensada text-fg mt-1.5">
                    <span className="font-mono text-small align-super">USD</span>{" "}
                    {plan.precio.toLocaleString("es-AR")}
                  </p>

                  <p className="text-small text-fg-muted mt-1.5">
                    {plan.promesa}
                  </p>

                  <ul className="border-line mt-2 space-y-1 border-t pt-2">
                    {plan.resumen.map((punto) => (
                      <li
                        key={punto}
                        className="text-small text-fg-muted flex gap-1"
                      >
                        <span aria-hidden="true" className="text-fg">
                          ·
                        </span>
                        {punto}
                      </li>
                    ))}
                  </ul>

                  <p className="etiqueta mt-auto pt-3">
                    {plan.mantenimientoIncluido}
                  </p>
                </div>
              </Revelado>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CÓMO TRABAJO ─────────────── */}
      <section className="border-line border-t py-8 md:py-12">
        <div className="contenedor">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="etiqueta">{txt.procesoEyebrow}</p>
            <EnlaceFlecha href={construirRuta(idioma, "/estudio")}>
              {comun.sobreMi}
            </EnlaceFlecha>
          </div>

          <Proceso idioma={idioma} />
        </div>
      </section>

      {/* ─────────────── QUIÉN ESTÁ ATRÁS ─────────────── */}
      <section className="border-line border-t py-8 md:py-12">
        <div className="contenedor grilla gap-y-4">
          <div className="col-span-12 md:col-span-4">
            <div className="border-line bg-raised flex aspect-4/5 items-center justify-center border">
              <span className="etiqueta">{comun.fotoPendiente}</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="etiqueta">{txt.quienEyebrow}</p>

            <h2 className="font-display text-display-m condensada text-fg mt-2 max-w-[18ch] text-balance">
              {txt.quienTitulo}
            </h2>

            <p className="text-body-l text-fg-muted medida mt-3">
              {txt.quienTexto}
            </p>

            <dl className="mt-5">
              {compromisos.map((compromiso, i) => (
                <Revelado
                  key={compromiso.clave}
                  retraso={i * 60}
                  className="border-line border-t py-2"
                >
                  <dt className="font-display text-heading text-fg">
                    {compromiso.titulo}
                  </dt>
                  <dd className="text-small text-fg-muted medida mt-1">
                    {compromiso.texto}
                  </dd>
                </Revelado>
              ))}
            </dl>

            <div className="mt-4">
              <EnlaceFlecha href={construirRuta(idioma, "/estudio")}>
                {txt.quienEnlace}
              </EnlaceFlecha>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── DISPONIBILIDAD + CIERRE (invertida 2 de 2) ─────────────── */}
      <p className="contenedor etiqueta border-line border-t pt-4 pb-1">
        {comun.disponibilidad} · {disponibilidad[idioma]}
      </p>
      <Cierre idioma={idioma} />
    </>
  );
}
