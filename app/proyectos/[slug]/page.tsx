import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { botonPrimario, botonSecundario, botonTexto, Flecha } from "@/components/boton";
import { CapturaEnmarcada } from "@/components/captura";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { MedirVista } from "@/components/medir-vista";
import { Revelado } from "@/components/revelado";
import { proyectoPorSlug, proyectos, slugsDeProyecto } from "@/content/proyectos";
import { mensajes } from "@/content/sitio";
import { caso } from "@/content/textos";
import { metadatosDePagina } from "@/lib/metadatos";

/** Las tres páginas se generan al compilar: el sitio no tiene servidor. */
export function generateStaticParams() {
  return slugsDeProyecto.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = proyectoPorSlug(slug);
  if (!proyecto) return {};

  return metadatosDePagina({
    ruta: `/proyectos/${proyecto.slug}`,
    titulo: proyecto.nombre,
    // La descripción es el resultado y no el resumen: es lo que se lee en
    // Google y lo que dice qué cambió, en vez de a qué se dedica el cliente.
    descripcion: `Antes: ${proyecto.resultado.antes} Después: ${proyecto.resultado.despues}`,
    tipo: "article",
    imagen: `/proyectos/${proyecto.slug}/opengraph-image`,
  });
}

export default async function PaginaDeProyecto({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proyecto = proyectoPorSlug(slug);
  if (!proyecto) notFound();

  const [portada, ...resto] = proyecto.capturas;
  const siguiente =
    proyectos[(proyectos.findIndex((p) => p.slug === slug) + 1) % proyectos.length];

  return (
    <>
      <main id="contenido">
        <article>
          <header className="contenedor pb-16 pt-36 lg:pt-44">
            <nav aria-label="Migas de pan" className="t-dato mb-10 text-suave">
              <Link href="/" className="transition-colors hover:text-texto">
                {caso.migasInicio}
              </Link>
              <span aria-hidden="true" className="mx-2 opacity-40">
                /
              </span>
              <Link href="/proyectos" className="transition-colors hover:text-texto">
                {caso.migasProyectos}
              </Link>
            </nav>

            <p className="t-etiqueta mb-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>{proyecto.ubicacion}</span>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span>{proyecto.rubro}</span>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span>{proyecto.anio}</span>
            </p>

            <h1 className="t-display text-[clamp(2.75rem,7.5vw,6rem)]">{proyecto.nombre}</h1>

            {/*
              La línea de resultado, antes que cualquier descripción.
              Una descripción cuenta lo que se construyó, que es lo que le
              importa a quien lo construyó. El "antes y después" cuenta qué
              cambió para el negocio, que es lo que mira el que está decidiendo
              si escribirme.
            */}
            <div className="mt-12 grid gap-px border border-borde bg-borde sm:grid-cols-2">
              <div className="bg-fondo p-7 lg:p-8">
                <p className="t-etiqueta">{caso.antesResultado}</p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-suave">
                  {proyecto.resultado.antes}
                </p>
              </div>
              <div className="bg-fondo p-7 lg:p-8">
                <p className="t-etiqueta text-acento">{caso.despuesResultado}</p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed">
                  {proyecto.resultado.despues}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="t-bajada max-w-[46ch]">{proyecto.resumen}</p>

              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={proyecto.urlEnVivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={botonPrimario}
                >
                  {caso.verEnVivo}
                </a>
                <EnlaceWhatsApp
                  mensaje={mensajes.proyecto(proyecto.cliente)}
                  origen={`proyecto_${proyecto.slug}`}
                  className={botonSecundario}
                >
                  {caso.consultarSimilar}
                </EnlaceWhatsApp>
              </div>
            </div>
          </header>

          {/* La portada es la imagen más grande de la página y casi seguro el
              LCP: por eso va con carga prioritaria y sin `lazy`. */}
          <div className="contenedor">
            <CapturaEnmarcada
              captura={portada}
              prioritaria
              sizes="(min-width: 1024px) 82rem, 100vw"
            />
          </div>

          <div className="contenedor grid gap-14 pt-24 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:pt-36">
            <div>
              <EncabezadoSeccion
                nivel="h2"
                titulo={caso.antes}
                claseTitulo="text-[clamp(1.75rem,3.5vw,2.75rem)]"
              />
              <Revelado>
                <span aria-hidden="true" className="mt-7 block h-px w-20 bg-acento" />
              </Revelado>
            </div>
            <Revelado retardo={100}>
              {/* El problema va en varios párrafos y no en uno solo: doscientas
                  palabras seguidas no las lee nadie. */}
              <div className="flex flex-col gap-6">
                {proyecto.problema.map((parrafo) => (
                  <p key={parrafo.slice(0, 40)} className="t-cuerpo text-[1.0625rem]">
                    {parrafo}
                  </p>
                ))}
              </div>
            </Revelado>
          </div>

          {/*
            Las pruebas del problema.
            Valen más que el párrafo de arriba: una captura de lo que devolvía
            Google antes del sitio no se puede discutir. Si el proyecto no
            tiene evidencia cargada, la sección entera no existe.
          */}
          {proyecto.evidencia && proyecto.evidencia.length > 0 && (
            <section className="contenedor pt-20 lg:pt-28">
              <Revelado>
                <h2 className="t-etiqueta">{caso.evidencia}</h2>
              </Revelado>

              <div className="mt-10 flex flex-col gap-16 lg:mt-14 lg:gap-20">
                {proyecto.evidencia.map((captura, i) => (
                  <Revelado key={captura.archivo} retardo={i * 60}>
                    <CapturaEnmarcada
                      captura={captura}
                      sizes={
                        captura.formato === "retrato"
                          ? "460px"
                          : "(min-width: 1024px) 82rem, 100vw"
                      }
                    />
                  </Revelado>
                ))}
              </div>
            </section>
          )}

          <div className="contenedor grid gap-14 pt-24 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:pt-32">
            <Revelado>
              <EncabezadoSeccion
                nivel="h2"
                titulo={caso.construido}
                claseTitulo="text-[clamp(1.75rem,3.5vw,2.75rem)]"
              />
              <span aria-hidden="true" className="mt-7 block h-px w-20 bg-acento" />
              <ul className="mt-10 flex flex-wrap gap-2">
                {proyecto.stack.map((item) => (
                  <li
                    key={item}
                    className="t-dato rounded-full border border-borde px-4 py-2 text-suave"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Revelado>

            <Revelado retardo={100}>
              <ul className="flex flex-col">
                {proyecto.construido.map((item, i) => (
                  <li
                    key={item}
                    className="grid grid-cols-[auto_1fr] gap-6 border-b border-borde py-6 first:pt-0"
                  >
                    <span className="t-dato pt-1 text-suave">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.0625rem] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Revelado>
          </div>

          <section className="contenedor pt-24 lg:pt-36">
            <EncabezadoSeccion
              nivel="h2"
              titulo={caso.porDentro}
              claseTitulo="text-[clamp(1.75rem,3.5vw,2.75rem)]"
            />

            <div className="mt-14 flex flex-col gap-20 lg:gap-28">
              {resto.map((captura, i) => (
                <Revelado key={captura.archivo} retardo={i * 60}>
                  <CapturaEnmarcada
                    captura={captura}
                    sizes={
                      captura.formato === "movil" ? "280px" : "(min-width: 1024px) 82rem, 100vw"
                    }
                  />
                </Revelado>
              ))}
            </div>
          </section>

          <section className="contenedor seccion">
            <Revelado>
              <div className="rounded-xl border border-borde bg-superficie p-10 lg:p-16">
                <p className="t-etiqueta mb-6">{caso.enLineaEtiqueta}</p>
                <h2 className="t-titulo max-w-[16ch] text-[clamp(1.75rem,4vw,3rem)]">
                  {caso.enLineaTitulo}
                </h2>
                <p className="t-dato mt-6 text-suave">{proyecto.urlVisible}</p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href={proyecto.urlEnVivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={botonPrimario}
                  >
                    {caso.verEnVivo}
                  </a>
                  <EnlaceWhatsApp
                    mensaje={mensajes.proyecto(proyecto.cliente)}
                    origen={`proyecto_cierre_${proyecto.slug}`}
                    className={botonSecundario}
                  >
                    {caso.solicitarPropuesta}
                  </EnlaceWhatsApp>
                </div>
              </div>
            </Revelado>
          </section>
        </article>

        <nav
          aria-label={caso.siguiente}
          className="contenedor flex flex-wrap items-baseline justify-between gap-6 border-t border-borde py-14"
        >
          <div>
            <p className="t-etiqueta mb-4">{caso.siguiente}</p>
            <p className="t-subtitulo">{siguiente.nombre}</p>
          </div>
          <Link href={`/proyectos/${siguiente.slug}`} className={botonTexto}>
            {caso.verSiguiente}
            <Flecha />
          </Link>
        </nav>
      </main>

      <MedirVista evento="view_caso" datos={{ caso: proyecto.slug }} />
    </>
  );
}
